import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with Secret Key
export async function POST(request: Request) {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error("Stripe key missing");
        return NextResponse.json({ error: 'Internal Server Error: Stripe Config' }, { status: 500 });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-12-15.clover', // Latest API version
    });

    try {
        const { items, amount } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects cents
            currency: 'eur',
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                // Store simple summary in metadata
                items: JSON.stringify(items.map((i: any) => `${i.quantity}x ${i.name}`)),
            }
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error: any) {
        console.error("Stripe Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
