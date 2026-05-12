import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/orders/:id
 *
 * Devuelve los datos públicos de un pedido (los necesarios para la página
 * de confirmación tras el pago). Solo expone los campos seguros.
 */
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 });
        }

        const order = await prisma.shopOrder.findUnique({
            where: { id },
            include: { items: { include: { product: true } } },
        });

        if (!order) {
            return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
        }

        // Exponemos solo lo necesario (no datos sensibles de pago)
        return NextResponse.json({
            id: order.id,
            status: order.status,
            total: parseFloat(order.total.toString()),
            customerName: order.customerName,
            customerEmail: order.customerEmail,
            address: order.address,
            city: order.city,
            zipCode: order.zipCode,
            createdAt: order.createdAt,
            items: order.items.map((it) => ({
                name: it.product.name,
                image: it.product.image,
                quantity: it.quantity,
                price: parseFloat(it.priceAtPurchase.toString()),
            })),
        });
    } catch (error: any) {
        console.error('[orders/:id] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Error fetching order' },
            { status: 500 }
        );
    }
}
