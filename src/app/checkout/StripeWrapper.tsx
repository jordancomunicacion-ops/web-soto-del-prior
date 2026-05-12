'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type Stripe as StripeJs } from '@stripe/stripe-js';
import { useMemo } from 'react';
import CheckoutForm from './CheckoutForm';

// loadStripe debe llamarse fuera del componente para no recrear el objeto.
const stripePromise: Promise<StripeJs | null> = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

export default function StripeWrapper({
    total,
    items,
}: {
    total: number;
    items: any[];
}) {
    /**
     * Modo deferred PaymentIntent: declaramos el "look & feel" y el modo (payment),
     * el clientSecret se inyecta luego dinámicamente cuando se confirme el pago
     * vía elements.submit() + stripe.confirmPayment({ elements, clientSecret }).
     *
     * Esto permite recoger los datos del cliente ANTES de crear el PaymentIntent
     * (necesario para guardar el ShopOrder con dirección y email correctos).
     *
     * Doc: https://docs.stripe.com/payments/accept-a-payment-deferred
     */
    const options = useMemo(
        () => ({
            mode: 'payment' as const,
            amount: Math.round(total * 100), // céntimos
            currency: 'eur',
            appearance: {
                theme: 'stripe' as const,
                variables: { colorPrimary: '#C59D5F' },
            },
        }),
        [total]
    );

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        return (
            <div className="p-4 border border-red-200 bg-red-50 text-red-700 text-sm">
                Falta configurar <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> en{' '}
                <code>.env</code>.
            </div>
        );
    }

    if (total <= 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                El total del carrito debe ser mayor que 0.
            </div>
        );
    }

    return (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm total={total} items={items} />
        </Elements>
    );
}
