'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function StripeWrapper({ total, items }: { total: number, items: any[] }) {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (total > 0) {
            fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, amount: total }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [items, total]);

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#C59D5F',
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    if (!clientSecret) {
        return <div className="p-4 text-center">Cargando pasarela de pago segura...</div>;
    }

    return (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm total={total} items={items} />
        </Elements>
    );
}
