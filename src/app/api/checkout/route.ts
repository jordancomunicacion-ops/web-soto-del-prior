import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/checkout
 *
 * Recibe el carrito + datos del cliente, valida los precios consultando la BD,
 * crea un ShopOrder en estado PENDING y devuelve el clientSecret de Stripe.
 *
 * IMPORTANTE: El total se calcula en servidor con los precios de BD.
 * El "total" que llegue del cliente solo se usa como sanity check.
 */
export async function POST(request: Request) {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error('[checkout] STRIPE_SECRET_KEY missing');
        return NextResponse.json(
            { error: 'Pasarela de pago no configurada' },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const { items, customerDetails } = body as {
            items: Array<{ id: string; quantity: number }>;
            customerDetails: {
                name: string;
                email: string;
                phone: string;
                address: string;
                city: string;
                zip: string;
            };
        };

        // Validación básica
        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 });
        }
        if (!customerDetails?.email || !customerDetails?.name) {
            return NextResponse.json(
                { error: 'Faltan datos del cliente' },
                { status: 400 }
            );
        }

        // 1. Cargar productos reales de BD para validar precios
        const productIds = items.map((i) => i.id);
        const products = await prisma.shopProduct.findMany({
            where: { id: { in: productIds } },
        });

        if (products.length !== items.length) {
            return NextResponse.json(
                { error: 'Alguno de los productos ya no está disponible' },
                { status: 400 }
            );
        }

        // 2. Calcular total en servidor (céntimos para Stripe)
        let amountInCents = 0;
        const lineItems = items.map((item) => {
            const product = products.find((p) => p.id === item.id);
            if (!product) throw new Error(`Producto ${item.id} no encontrado`);
            const qty = Math.max(1, Math.floor(item.quantity));
            const unitCents = Math.round(parseFloat(product.price.toString()) * 100);
            amountInCents += unitCents * qty;
            return {
                product,
                quantity: qty,
                unitPriceEuros: parseFloat(product.price.toString()),
            };
        });

        if (amountInCents <= 0) {
            return NextResponse.json({ error: 'Total inválido' }, { status: 400 });
        }

        // 3. Crear pedido en BD en estado PENDING
        const order = await prisma.shopOrder.create({
            data: {
                total: amountInCents / 100,
                status: 'PENDING',
                customerName: customerDetails.name,
                customerEmail: customerDetails.email,
                phone: customerDetails.phone,
                address: customerDetails.address,
                city: customerDetails.city,
                zipCode: customerDetails.zip,
                items: {
                    create: lineItems.map((li) => ({
                        product: { connect: { id: li.product.id } },
                        quantity: li.quantity,
                        priceAtPurchase: li.unitPriceEuros,
                    })),
                },
            },
        });

        // 4. Crear PaymentIntent con orderId en metadata
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'eur',
            automatic_payment_methods: { enabled: true },
            receipt_email: customerDetails.email,
            metadata: {
                orderId: order.id,
                customerEmail: customerDetails.email,
            },
            description: `Pedido SOTO del PRIOR ${order.id.slice(-6).toUpperCase()}`,
        });

        // Guardamos el paymentIntentId en el pedido para poder reconciliar
        await prisma.shopOrder.update({
            where: { id: order.id },
            data: {
                // Reutilizamos el campo status; no añadimos columna nueva para no migrar.
                // El paymentIntentId se identifica por metadata.orderId.
                status: 'PENDING',
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            orderId: order.id,
            amount: amountInCents,
        });
    } catch (error: any) {
        console.error('[checkout] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Error procesando el pago' },
            { status: 500 }
        );
    }
}
