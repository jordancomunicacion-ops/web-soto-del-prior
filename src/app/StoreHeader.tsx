'use client';

import { useCart } from './CartContext';
import { useState } from 'react';

export default function StoreHeader() {
    const { toggleCart, items } = useCart();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="site-header">
            {/* --- DESKTOP LOGO (Center/Left) --- */}
            <a href="#" className="logo-link hidden md:block">
                <img
                    src="/web/assets/logo_horizontal.png"
                    alt="SOTO del PRIOR Logo"
                    className="site-logo"
                />
            </a>

            {/* --- MOBILE COW MENU TRIGGER (LEFT) --- */}
            <div className="md:hidden flex items-center">
                <button
                    className="p-2 z-50 relative -ml-2" // Negative margin to align with edge visually if needed, p-2 for touch target
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                >
                    <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden">
                        {/* ICON: COW HEAD (Visible when Closed) */}
                        <img
                            src="/web/assets/mobile_cow_head.png"
                            alt="Menu"
                            className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out transform ${isMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-125'}`}
                        />

                        {/* ICON: CLOSE X (Visible when Open) */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1}
                            className={`absolute inset-0 w-full h-full text-black p-1 transition-all duration-500 ease-in-out transform ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'}`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </button>
            </div>

            {/* --- DESKTOP NAV (Center) --- */}
            <nav className="main-nav hidden md:block">
                <ul className="nav-list">
                    <li><a href="#restaurante">RESTAURANTE</a></li>
                    <li><a href="#eventos">EVENTOS</a></li>
                    <li><a href="#alojamiento">ESTANCIA</a></li>
                    <li><a href="#obrador">OBRADOR</a></li>
                    <li><a href="#origen">ORIGEN</a></li>
                </ul>
            </nav>

            {/* --- ICONS (RIGHT): CONTACT + CART --- */}
            <div className="header-cta flex items-center gap-4 md:gap-6 ml-auto md:ml-0">

                {/* 1. CONTACTO (Desktop Text / Mobile Icon) */}
                <a href="#contacto" className="p-1 hover:text-[#C59D5F] transition-colors md:hidden" aria-label="Contacto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </a>

                {/* Desktop Text Version */}
                <a href="#contacto" className="hidden md:block header-contact-link text-black font-black text-sm uppercase tracking-widest hover:text-[#C59D5F] transition-colors">
                    CONTACTO
                </a>

                {/* 2. CARRITO (Icono) */}
                <button onClick={toggleCart} className="relative group p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-black group-hover:text-[#C59D5F] transition-colors">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#C59D5F] text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                            {itemCount}
                        </span>
                    )}
                </button>

            </div>

            {/* --- MOBILE MENU OVERLAY (Transparent) --- */}
            {isMenuOpen && (
                <div className="absolute top-[var(--header-height)] left-0 w-full bg-white/80 backdrop-blur-md shadow-xl border-t border-white/20 p-6 flex flex-col md:hidden animate-in slide-in-from-top-2">
                    <nav className="flex flex-col gap-6 text-center py-8">
                        <a href="#restaurante" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold uppercase tracking-widest hover:text-[#C59D5F]">RESTAURANTE</a>
                        <a href="#eventos" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold uppercase tracking-widest hover:text-[#C59D5F]">EVENTOS</a>
                        <a href="#alojamiento" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold uppercase tracking-widest hover:text-[#C59D5F]">ESTANCIA</a>
                        <a href="#obrador" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold uppercase tracking-widest hover:text-[#C59D5F]">OBRADOR</a>
                        <a href="#origen" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold uppercase tracking-widest hover:text-[#C59D5F]">ORIGEN</a>
                        <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold uppercase tracking-widest hover:text-[#C59D5F]">CONTACTO</a>
                    </nav>
                </div>
            )}
        </header>
    );
}
