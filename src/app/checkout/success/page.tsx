'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../CartContext';

type OrderItem = {
    name: string;
    image?: string | null;
    quantity: number;
    price: number;
};

type Order = {
    id: string;
    status: string;
    total: number;
    customerName: string | null;
    customerEmail: string;
    address: string | null;
    city: string | null;
    zipCode: string | null;
    createdAt: string;
    items: OrderItem[];
};

function CheckoutSuccessContent() {
    const params = useSearchParams();
    const { clearCart } = useCart();

    const orderId = params.get('order_id');
    const paymentIntent = params.get('payment_intent');
    const redirectStatus = params.get('redirect_status');

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Limpiar carrito una sola vez en cuanto cargamos en éxito
    useEffect(() => {
        if (redirectStatus === 'succeeded' || redirectStatus === 'processing') {
            clearCart();
        }
        // clearCart es estable; intencionadamente sin dependencia para que
        // se ejecute solo en el primer render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Cargar datos del pedido
    useEffect(() => {
        if (!orderId) {
            setError('Falta el identificador del pedido en la URL.');
            setLoading(false);
            return;
        }

        let cancelled = false;
        const load = async () => {
            try {
                const res = await fetch(`/api/orders/${orderId}`);
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    throw new Error(data.error || 'No se pudo cargar el pedido');
                }
                const data = await res.json();
                if (!cancelled) setOrder(data);
            } catch (err: any) {
                if (!cancelled) setError(err.message || 'Error cargando pedido');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, [orderId]);

    const isFailed = redirectStatus === 'failed';

    return (
        <div className="max-w-3xl mx-auto p-6 md:p-16">
            {loading && (
                <div className="text-center py-20">
                    <p className="text-gray-500 uppercase tracking-widest text-sm">
                        Cargando confirmación...
                    </p>
                </div>
            )}

            {!loading && error && (
                <div className="bg-white p-10 border-t-[6px] border-red-500 shadow-lg text-center">
                    <h1
                        className="text-3xl font-bold uppercase mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        No hemos podido recuperar tu pedido
                    </h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    {paymentIntent && (
                        <p className="text-xs text-gray-400">
                            Referencia de pago: {paymentIntent}
                        </p>
                    )}
                    <Link
                        href="/"
                        className="inline-block mt-6 bg-black text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-[#C59D5F] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Volver al catálogo
                    </Link>
                </div>
            )}

            {!loading && !error && order && (
                <div className="bg-white p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border-t-[6px] border-[#C59D5F]">
                    {isFailed ? (
                        <>
                            <h1
                                className="text-3xl md:text-4xl font-bold uppercase mb-4 text-red-600"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Pago no completado
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Tu pago no se ha podido procesar. No te hemos cobrado nada.
                                Puedes intentarlo de nuevo desde tu carrito.
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-[#C59D5F] flex items-center justify-center text-white text-2xl">
                                    ✓
                                </div>
                                <div>
                                    <h1
                                        className="text-3xl md:text-4xl font-bold uppercase leading-none"
                                        style={{ fontFamily: 'var(--font-heading)' }}
                                    >
                                        ¡Gracias por tu pedido!
                                    </h1>
                                    <p className="text-gray-500 text-sm mt-2">
                                        Pedido #{order.id.slice(-6).toUpperCase()} ·{' '}
                                        {new Date(order.createdAt).toLocaleString('es-ES')}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-8">
                                Hola <strong>{order.customerName || 'cliente'}</strong>,
                                hemos recibido tu pedido correctamente. Te enviaremos un email
                                de confirmación a <strong>{order.customerEmail}</strong> en
                                cuanto se confirme el pago.
                            </p>
                        </>
                    )}

                    <div className="border-t border-gray-200 pt-6">
                        <h2
                            className="text-lg font-bold uppercase mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Resumen
                        </h2>
                        <ul className="space-y-3 mb-6">
                            {order.items.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium uppercase">
                                            {item.name}
                                        </span>
                                        <span className="text-gray-400 text-xs">
                                            × {item.quantity}
                                        </span>
                                    </div>
                                    <span className="font-bold text-[#C59D5F]">
                                        {(item.price * item.quantity).toFixed(2)}€
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-between items-center text-xl font-bold border-t-2 border-black pt-4">
                            <span
                                className="uppercase tracking-wide"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Total
                            </span>
                            <span
                                className="text-[#C59D5F]"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {order.total.toFixed(2)}€
                            </span>
                        </div>

                        {order.address && (
                            <div className="mt-8 text-sm text-gray-600">
                                <h3
                                    className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    Dirección de envío
                                </h3>
                                <p>
                                    {order.customerName}
                                    <br />
                                    {order.address}
                                    <br />
                                    {order.city} {order.zipCode}
                                </p>
                            </div>
                        )}

                        <div className="mt-10 flex flex-col md:flex-row gap-3">
                            <Link
                                href="/"
                                className="flex-1 text-center bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#C59D5F] transition-colors"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Volver al catálogo
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <main className="min-h-screen bg-[#F4F4F4] font-sans text-black">
            {/* Header */}
            <header className="bg-black text-white h-[70px] px-[5%] flex justify-between items-center">
                <Link
                    href="/"
                    className="text-sm font-bold tracking-[0.2em] text-white hover:text-[#C59D5F] transition-colors flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    <span>←</span> VOLVER A LA TIENDA
                </Link>
            </header>

            <Suspense fallback={
                <div className="text-center py-20">
                    <p className="text-gray-500 uppercase tracking-widest text-sm">
                        Cargando...
                    </p>
                </div>
            }>
                <CheckoutSuccessContent />
            </Suspense>
        </main>
    );
}
