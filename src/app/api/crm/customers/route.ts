import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const customers = await prisma.customerProfile.findMany({
            orderBy: { updatedAt: 'desc' }
        });

        // Transform Decimal to number/string for JSON safety if needed (Prisma usually handles this but good to be safe)
        const formatted = customers.map(c => ({
            ...c,
            totalSpend: Number(c.totalSpend)
        }));

        return NextResponse.json(formatted, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    } catch (error) {
        console.error('Failed to fetch customers:', error);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}
