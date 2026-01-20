'use client';

import Link from 'next/link';

export default function TPVPortal() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-8 font-sans">
            {/* BACK BUTTON */}
            <div className="w-full max-w-6xl mb-8">
                <Link href="/" className="text-[#C59D5F] hover:text-[#e0b470] flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Volver al Dashboard
                </Link>
            </div>

            {/* HEADER */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-[#C59D5F] font-[family-name:var(--font-heading)] uppercase mb-4">
                    PUNTOS DE VENTA (TPV)
                </h1>
                <p className="text-gray-400 tracking-[0.2em] font-light">
                    SELECCIONE EL TERMINAL
                </p>
            </div>

            {/* TPV GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">

                {/* TPV OBRADOR */}
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Abrir software TPV (Agora) manualmente'); }} className="group relative block p-12 bg-[#151515] border border-[#333] hover:border-[#C59D5F] transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                        <div className="mb-6 inline-block p-4 rounded-full bg-[#C59D5F]/10 text-[#C59D5F]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72l1.189-1.19A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-heading)] group-hover:text-[#C59D5F]">TPV OBRADOR</h2>
                        <p className="text-gray-500">Software Externo (Agora)</p>
                    </div>
                </a>

                {/* TPV RESTAURANTE */}
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Abrir software TPV (Agora) manualmente'); }} className="group relative block p-12 bg-[#151515] border border-[#333] hover:border-[#C59D5F] transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                        <div className="mb-6 inline-block p-4 rounded-full bg-[#C59D5F]/10 text-[#C59D5F]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-1.23-7.57-1.23-1.01 0-1.926-.256-2.585-.823C.566 18.007.822 16.4 1.758 15.488L3 14.25" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-heading)] group-hover:text-[#C59D5F]">TPV RESTAURANTE</h2>
                        <p className="text-gray-500">Comandas de mesa, barra y reservas.</p>
                    </div>
                </a>

            </div>
        </main>
    );
}
