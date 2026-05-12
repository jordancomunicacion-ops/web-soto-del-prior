import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmation } from '@/lib/mail';
import type Stripe from 'stripe';

// Necesario en Next.js App Router para acceder al body crudo y verificar la firma.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/webhooks/stripe
 *
 * Endpoint que Stripe llama tras eventos del PaymentIntent.
 * - payment_intent.succeeded -> marca el pedido PAID y envía email
 * - payment_intent.payment_failed -> marca el pedido CANCELLED
 *
 * Configuración:
 * 1. dashboard.stripe.com/test/webhooks -> "Add endpoint"
 *    URL: https://TU_DOMINIO/api/webhooks/stripe
 *    Eventos: payment_intent.succeeded, payment_intent.payment_failed
 * 2. Copia el "Signing secret" en STRIPE_WEBHOOK_SECRET (.env)
 *
 * Para desarrollo local:
 *   stripe listen --forward-to localhost:3000/api/webhooks/stripe
 */
export async function POST(request: Request) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET missing');
        return NextResponse.json(
            { error: 'Webhook no configurado' },
            { status: 500 }
        );
    }

    const signature = request.headers.get('stripe-signature');
    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Body crudo (texto) para verificar firma
    const payload = await request.text();

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
        console.error('[stripe-webhook] Firma inválida:', err.message);
        return NextResponse.json(
            { error: `Webhook signature invalid: ${err.message}` },
            { status: 400 }
        );
    }

    try {
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const pi = event.data.object as Stripe.PaymentIntent;
                const orderId = pi.metadata?.orderId;
                if (!orderId) {
                    console.warn('[stripe-webhook] payment_intent.succeeded sin orderId');
                    break;
                }

                // Idempotencia: si ya está PAID, no hacemos nada
                const existing = await prisma.shopOrder.findUnique({
                    where: { id: orderId },
                });
                if (!existing) {
                    console.warn(`[stripe-webhook] Orden ${orderId} no encontrada`);
                    break;
                }
                if (existing.status === 'PAID' || existing.status === 'DELIVERED') {
                    console.log(`[stripe-webhook] Orden ${orderId} ya estaba ${existing.status}`);
                    break;
                }

                // Marcar PAID y enviar email
                const order = await prisma.shopOrder.update({
                    where: { id: orderId },
                    data: { status: 'PAID' },
                    include: { items: { include: { product: true } } },
                });

                const itemsFormatted = order.items.map((it) => ({
                    name: it.product.name,
                    quantity: it.quantity,
                    price: parseFloat(it.priceAtPurchase.toString()),
                }));

                try {
                    await sendOrderConfirmation(order, itemsFormatted);
                } catch (mailErr) {
                    console.error('[stripe-webhook] Email error (no bloquea):', mailErr);
                }

                console.log(`[stripe-webhook] Orden ${orderId} marcada PAID`);
                break;
            }

            case 'payment_intent.payment_failed': {
                const pi = event.data.object as Stripe.PaymentIntent;
                const orderId = pi.metadata?.orderId;
                if (!orderId) break;

                await prisma.shopOrder.updateMany({
                    where: { id: orderId, status: 'PENDING' },
                    data: { status: 'CANCELLED' },
                });
                console.log(`[stripe-webhook] Orden ${orderId} marcada CANCELLED`);
                break;
            }

            default:
                // Ignoramos otros eventos
                console.log(`[stripe-webhook] Evento ignorado: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('[stripe-webhook] Error procesando evento:', error);
        return NextResponse.json(
            { error: error.message || 'Webhook handler error' },
            { status: 500 }
        );
    }
}
