import Link from 'next/link';

export default function SistemasPage() {
    const domains = [
        { name: 'sotodelprior.com', provider: 'IONOS', expiry: '12/10/2026', status: 'Activo' },
        { name: 'sotodelprior.es', provider: 'IONOS', expiry: '12/10/2026', status: 'Redirección' },
    ];

    const emails = [
        { address: 'info@sotodelprior.com', user: 'General', type: 'IMAP' },
        { address: 'reservas@sotodelprior.com', user: 'Motor Reservas', type: 'SMTP' },
        { address: 'gerencia@sotodelprior.com', user: 'Carlos', type: 'Exchange' },
        { address: 'cocina@sotodelprior.com', user: 'Chef', type: 'IMAP' },
    ];

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white font-sans p-8">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <header className="flex items-center justify-between mb-12 border-b border-[#333] pb-6">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="group p-2 rounded-lg hover:bg-[#151515] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400 group-hover:text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">INFRAESTRUCTURA</h1>
                            <p className="text-gray-500 text-sm font-mono">DOMINIOS &middot; CORREO &middot; HOSTING</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <a href="https://mail.ionos.es" target="_blank" className="px-4 py-2 bg-[#151515] hover:bg-[#222] border border-[#333] rounded-md text-sm font-medium transition-colors text-[#C59D5F] flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            Acceso Webmail
                        </a>
                        <button className="px-4 py-2 bg-[#C59D5F] hover:bg-[#b08c50] text-black font-bold rounded-md text-sm transition-colors">
                            Nuevo Recurso
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* DOMAINS SECTION */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-[#1A1A1A] rounded-lg border border-[#333] text-[#C59D5F]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                            </div>
                            <h2 className="text-xl font-bold">Dominios</h2>
                        </div>

                        <div className="bg-[#111] border border-[#333] rounded-xl overflow-hidden">
                            {domains.map((domain, i) => (
                                <div key={i} className="p-4 flex items-center justify-between border-b border-[#222] last:border-0 hover:bg-[#151515] transition-colors">
                                    <div>
                                        <div className="font-mono font-medium text-lg">{domain.name}</div>
                                        <div className="text-xs text-gray-500 mt-1 flex gap-2">
                                            <span>{domain.provider}</span>
                                            <span>&bull;</span>
                                            <span>Expira: {domain.expiry}</span>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-bold rounded ${domain.status === 'Activo' ? 'bg-green-900/30 text-green-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
                                        {domain.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* EMAILS SECTION */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-[#1A1A1A] rounded-lg border border-[#333] text-[#C59D5F]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <h2 className="text-xl font-bold">Cuentas de Correo</h2>
                        </div>

                        <div className="bg-[#111] border border-[#333] rounded-xl overflow-hidden">
                            {emails.map((email, i) => (
                                <div key={i} className="p-4 flex items-center justify-between border-b border-[#222] last:border-0 hover:bg-[#151515] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-xs font-bold text-gray-400">
                                            {email.user.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-200">{email.address}</div>
                                            <div className="text-xs text-gray-500">{email.user}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-gray-600 border border-[#333] px-1 rounded">{email.type}</span>
                                        <button className="text-gray-500 hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.356a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.356 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.356a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
