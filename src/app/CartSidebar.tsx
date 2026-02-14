'use client';

import { useCart } from './CartContext';
import Link from 'next/link';

// Strict recreation of El Corte Inglés cart sidebar with OSWALD typography.
// PATCH: Pixel Perfect Adjustments (28px padding, full width button, new dimensions).
// REFINEMENTS: Header 'PEDIDO', Remove DUSTIN/Attrs, Smart Minus/Trash button.

export default function CartSidebar() {
    const { isCartOpen, toggleCart, items, removeFromCart, updateQuantity, total } = useCart();

    // NO return null here, to allow exit animations.

    return (
        <div className={`fixed inset-0 z-[5000] transition-all duration-500 ${isCartOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible delay-[800ms]'}`}>
            {/* Backdrop: Fade in/out */}
            <div
                className={`absolute inset-0 bg-black/25 backdrop-blur-[1px] transition-opacity duration-[700ms] ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={toggleCart}
            ></div>

            {/* Panel: Slide in/out with custom bezier for fluid "ECI" feel */}
            <div
                className={`absolute right-0 top-0 h-full w-full md:w-[460px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.05)] flex flex-col transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ fontFamily: 'var(--font-heading)' }}
            >

                {/* HEADER (PATCHED & REFINED) */}
                <div className="flex-none h-[56px] px-[28px] relative flex justify-center items-center">
                    <h2 className="text-[26px] font-bold text-black tracking-[0.5px] uppercase">PEDIDO</h2>

                    <button
                        onClick={toggleCart}
                        className="absolute right-[28px] top-[16px] text-[#333] hover:text-black transition-colors cursor-pointer z-50 p-2"
                        aria-label="Cerrar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                {/* BODY - Items (PATCHED Padding) */}
                <div className="flex-1 overflow-y-auto px-[28px] py-2">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <p className="text-[15px] font-normal">Tu pedido está vacío</p>
                            <button onClick={toggleCart} className="border-b border-black pb-0.5 text-[14px]">SEGUIR COMPRANDO</button>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {items.map((item, index) => (
                                <div key={item.id}>
                                    {/* Separator */}
                                    {index > 0 && <div className="border-t border-[#E5E5E5] my-6"></div>}

                                    {/* PRODUCT CARD */}
                                    <div className="flex gap-4 items-start">

                                        {/* Image */}
                                        <div className="w-[92px] h-[92px] bg-[#F4F4F4] flex-none relative">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col min-h-[92px] justify-between">

                                            {/* Text Block (Refined: Spacing Balanced) */}
                                            <div className="flex flex-col gap-1 !mt-5">
                                                <h3 className="text-[15px] font-normal text-black leading-tight">
                                                    {item.name}
                                                </h3>
                                            </div>

                                            {/* Controls & Price Row */}
                                            <div className="flex justify-between items-end mt-4">

                                                {/* Quantity Selector (Smart Logic) */}
                                                <div className="flex items-center w-[150px] h-[42px] border border-[#CCCCCC]">
                                                    {/* Button Left: Trash if qty=1, Minus if qty>1 */}
                                                    <button
                                                        onClick={() => item.quantity === 1 ? removeFromCart(item.id) : updateQuantity(item.id, -1)}
                                                        className={`w-[44px] h-full flex items-center justify-center transition-colors text-[18px] font-normal ${item.quantity === 1 ? 'text-gray-400 hover:text-red-500' : 'text-black hover:bg-gray-50'}`}
                                                    >
                                                        {item.quantity === 1 ? (
                                                            // Trash Icon for Remove
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                                        ) : (
                                                            // Minus Icon for Decrease
                                                            '-'
                                                        )}
                                                    </button>

                                                    <div className="flex-1 h-full flex items-center justify-center text-[15px] text-black font-normal">
                                                        {item.quantity}
                                                    </div>

                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-[44px] h-full flex items-center justify-center text-black hover:bg-gray-50 transition-colors text-[18px] font-normal"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Price (Calculated: Unit * Qty) */}
                                                <div className="text-[15px] font-medium text-[#C59D5F]">
                                                    {(item.price * item.quantity).toFixed(2)} €
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* FOOTER (PATCHED) */}
                <div className="flex-none border-t border-[#E5E5E5] bg-white">
                    {/* Total con padding */}
                    <div className="px-[28px] py-4">
                        <div className="flex justify-between items-end text-[15px] font-normal text-black">
                            <span>Total</span>
                            <span className="text-[#C59D5F] font-bold text-[18px]">{total.toFixed(2)} €</span>
                        </div>
                    </div>

                    {/* Botón a borde completo (sin padding) */}
                    <Link
                        href="/checkout"
                        onClick={toggleCart}
                        className="flex items-center justify-center w-full h-[64px] bg-black text-white text-[18px] font-medium hover:bg-[#C59D5F] transition-colors uppercase tracking-wide"
                    >
                        IR A LA CESTA
                    </Link>
                </div>
            </div>
        </div>
    );
}
