'use client';

import { useCart } from '../CartContext';
import CheckoutForm from './CheckoutForm';
import StripeWrapper from './StripeWrapper';
import Link from 'next/link';

export default function CheckoutPage() {
    const { items, total } = useCart();

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-[#F4F4F4] flex flex-col font-sans">
                {/* Header Empty */}
                <div className="bg-black text-white h-[80px] px-[5%] flex items-center">
                    <Link href="/">
                        <img src="/web/assets/logo_text.png" alt="SOTO DEL PRIOR" className="h-[40px] filter invert brightness-0 invert-[1]" />
                    </Link>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                        TU CESTA ESTÁ VACÍA
                    </h1>
                    <p className="text-gray-500 mb-10 text-lg font-light tracking-wide">
                        Parece que no has añadido nada todavía.
                    </p>
                    <Link
                        href="/"
                        className="bg-black text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-[#C59D5F] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Volver al Catálogo
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F4F4F4] font-sans text-black">

            {/* BRAND HEADER */}
            <header className="bg-black text-white h-[70px] px-[5%] flex justify-between items-center sticky top-0 z-50 shadow-md">
                <Link href="/" className="text-sm font-bold tracking-[0.2em] text-white hover:text-[#C59D5F] transition-colors flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span>←</span> SEGUIR COMPRANDO
                </Link>
            </header>

            <div className="max-w-7xl mx-auto p-6 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* LEFT COLUMN: FORM (Span 7) */}
                <div className="lg:col-span-7">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase mb-10 pb-4 border-b-2 border-black" style={{ fontFamily: 'var(--font-heading)' }}>
                        Datos de Pago
                    </h2>

                    {/* STRIPE ELEMENT CONTAINER */}
                    <StripeWrapper total={total} items={items} />
                </div>

                {/* RIGHT COLUMN: SUMMARY (Span 5) */}
                <div className="lg:col-span-5">
                    <div className="bg-white p-8 md:p-10 shadow-[-20px_20px_60px_rgba(0,0,0,0.05)] border-t-[6px] border-[#C59D5F] sticky top-[100px]">
                        <h2 className="text-2xl font-bold uppercase mb-8 tracking-wide text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                            Resumen del Pedido
                        </h2>

                        <div className="space-y-4 mb-10">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-start text-sm border-b border-gray-100 pb-4 last:border-0 rounded">
                                    <div className="flex items-start gap-4">
                                        {/* Product Image (64px) */}
                                        <div className="w-[64px] h-[64px] bg-[#F4F4F4] relative flex-none border border-gray-100">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex flex-col pt-1">
                                            <span className="font-medium text-base uppercase leading-tight mb-1 text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                                                {item.name}
                                            </span>
                                            <span className="text-gray-500 text-xs tracking-wider uppercase mt-1">
                                                Cantidad: {item.quantity}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Line Price */}
                                    <span className="font-bold text-[#C59D5F] text-lg whitespace-nowrap pt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {(item.price * item.quantity).toFixed(2)}€
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL ROW */}
                        <div className="flex justify-between items-center text-2xl font-bold border-t-2 border-black pt-6 mb-8">
                            <span className="uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>Total a Pagar</span>
                            <span className="text-[#C59D5F]" style={{ fontFamily: 'var(--font-heading)' }}>{total.toFixed(2)}€</span>
                        </div>

                        {/* TRUST BADGES */}
                        <div className="text-[11px] uppercase tracking-wider text-gray-400 text-center space-y-3 font-medium">
                            <div className="flex justify-center items-center gap-2 mb-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z" /></svg>
                                <span>Pagos encriptados SSL 256-bit</span>
                            </div>
                            <p>
                                Al completar el pedido aceptas nuestra <a href="/legal/politica-compras" target="_blank" className="underline hover:text-[#C59D5F] transition-colors">Política de Privacidad</a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
