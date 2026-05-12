/**
 * @deprecated
 * Este endpoint se sustituye por POST /api/checkout, que crea el ShopOrder
 * y el PaymentIntent en una sola transacción con validación de precio en
 * servidor. Se conserva el archivo solo para compatibilidad por si algún
 * cliente legacy lo invoca; siempre responde 410 Gone.
 */
import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json(
        {
            error:
                'Este endpoint ha sido reemplazado por /api/checkout. ' +
                'El pedido y el PaymentIntent se crean ahí en una única llamada.',
        },
        { status: 410 }
    );
}
