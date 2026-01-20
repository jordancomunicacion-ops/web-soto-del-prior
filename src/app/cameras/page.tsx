import Link from 'next/link';

export default function CamerasPortal() {
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
                    VIDEOVIGILANCIA
                </h1>
                <p className="text-gray-400 tracking-[0.2em] font-light">
                    SISTEMA DE SEGURIDAD CCTV
                </p>
            </div>

            {/* CAMERAS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">

                {/* OBRADOR */}
                <div className="group relative block p-8 bg-[#111] border border-[#222] hover:border-[#C59D5F] transition-all duration-300">
                    <div className="absolute top-4 right-4 text-green-500 flex items-center gap-1 text-xs font-mono">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        LIVE
                    </div>
                    <div className="bg-black aspect-video mb-4 rounded border border-[#333] flex items-center justify-center overflow-hidden">
                        {/* Placeholder for video feed */}
                        <div className="text-gray-700 text-xs">NO SIGNAL</div>
                    </div>
                    <h2 className="text-xl font-bold mb-1 font-[family-name:var(--font-heading)] group-hover:text-[#C59D5F]">OBRADOR CENTRAL</h2>
                    <p className="text-gray-500 text-xs">Cámaras 1-4: Elaboración y Envasado</p>
                </div>

                {/* CORRALES */}
                <div className="group relative block p-8 bg-[#111] border border-[#222] hover:border-[#C59D5F] transition-all duration-300">
                    <div className="absolute top-4 right-4 text-green-500 flex items-center gap-1 text-xs font-mono">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        LIVE
                    </div>
                    <div className="bg-black aspect-video mb-4 rounded border border-[#333] flex items-center justify-center overflow-hidden">
                        <div className="text-gray-700 text-xs">NO SIGNAL</div>
                    </div>
                    <h2 className="text-xl font-bold mb-1 font-[family-name:var(--font-heading)] group-hover:text-[#C59D5F]">CORRALES</h2>
                    <p className="text-gray-500 text-xs">Cámaras 5-8: Patio y Comederos</p>
                </div>

                {/* ENTRADA */}
                <div className="group relative block p-8 bg-[#111] border border-[#222] hover:border-[#C59D5F] transition-all duration-300">
                    <div className="absolute top-4 right-4 text-red-500 flex items-center gap-1 text-xs font-mono">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        OFFLINE
                    </div>
                    <div className="bg-black aspect-video mb-4 rounded border border-[#333] flex items-center justify-center overflow-hidden">
                        <div className="text-gray-700 text-xs">NO SIGNAL</div>
                    </div>
                    <h2 className="text-xl font-bold mb-1 font-[family-name:var(--font-heading)] group-hover:text-[#C59D5F]">ACCESO FINCA</h2>
                    <p className="text-gray-500 text-xs">Cámara 9: Portón Principal</p>
                </div>

            </div>
        </main>
    );
}
