
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendOrderConfirmation } from '@/lib/mail';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { orderId } = await request.json();

        if (!orderId) {
            return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
        }

        // Fetch Order with Items
        const order = await prisma.shopOrder.findUnique({
            where: { id: orderId },
            include: { items: true } // We need items to list them in the email
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Map DB items to the format expected by our mail template
        // Note: shopOrderItem has 'product' relation ID, name etc might need fetching if not stored on item.
        // Actually, our create route stored 'priceAtPurchase' and connected product.
        // We'd better Include product details or assume we stored enough info.
        // We need product Name. Let's include Product in the query.

        const orderWithProducts = await prisma.shopOrder.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: { product: true }
                }
            }
        });

        if (!orderWithProducts) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

        const itemsFormatted = orderWithProducts.items.map(item => ({
            name: item.product.name,
            quantity: item.quantity,
            price: parseFloat(item.priceAtPurchase.toString()),
        }));

        // Send Email
        await sendOrderConfirmation(orderWithProducts, itemsFormatted);

        // Update status to PAID/CONFIRMED if not already? 
        // Or assume this is called after payment success.
        // Let's just update status to indicate notifications sent or PAID.
        await prisma.shopOrder.update({
            where: { id: orderId },
            data: { status: 'PAID' }
        });

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Notification Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
