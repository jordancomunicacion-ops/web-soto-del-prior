import Stripe from 'stripe';

/**
 * Singleton Stripe (servidor).
 * Usa una versión de API estable. Si quieres fijar otra, cámbiala aquí en un único sitio.
 *
 * IMPORTANTE: Esta variable solo está disponible en el lado del servidor.
 * NUNCA importes este archivo desde un componente cliente.
 */

if (!process.env.STRIPE_SECRET_KEY) {
    // No lanzamos en import-time para no romper builds; lo validamos al usarlo.
    console.warn('[stripe] STRIPE_SECRET_KEY no está definida en .env');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    // La versión por defecto de stripe-node@20 es '2025-12-15.clover'.
    // Si la omitiéramos, Stripe usaría la versión asociada a la cuenta;
    // la fijamos explícitamente para que el comportamiento sea reproducible.
    apiVersion: '2025-12-15.clover',
    typescript: true,
    appInfo: {
        name: 'SOTO del PRIOR Web',
    },
});
