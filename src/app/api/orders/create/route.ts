
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, total, customerDetails } = body;

        // Validate required fields
        if (!items || !total || !customerDetails) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create Order in DB
        const order = await prisma.shopOrder.create({
            data: {
                total: total,
                status: 'PENDING',
                customerName: customerDetails.name,
                customerEmail: customerDetails.email,
                phone: customerDetails.phone,
                address: customerDetails.address,
                city: customerDetails.city,
                zipCode: customerDetails.zip,
                items: {
                    create: items.map((item: any) => ({
                        product: {
                            connectOrCreate: {
                                where: { id: item.id },
                                create: {
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    image: item.image,
                                    category: 'GENERAL'
                                }
                            }
                        },
                        quantity: item.quantity,
                        priceAtPurchase: item.price
                    }))
                }
            }
        });

        return NextResponse.json({ success: true, orderId: order.id });

    } catch (error: any) {
        console.error("Order Creation Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
