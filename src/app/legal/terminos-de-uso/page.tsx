import Link from 'next/link';
import type { Metadata } from 'next';
import '../../web_main.css';

export const metadata: Metadata = {
    title: 'Términos de Uso | SOTO DEL PRIOR',
    description: 'Términos de uso y condiciones legales de SOTO DEL PRIOR (JORDAZOLA SL).',
};

export default function TermsOfUse() {
    return (
        <main className="min-h-screen bg-[#FDFCFB] font-sans text-[#2D2D2D]">
            {/* Header / Nav mimic */}
            <div className="bg-[#1A1A1A] text-white p-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-md">
                <Link href="/" className="text-xs tracking-widest font-bold opacity-80 hover:opacity-100 transition-opacity uppercase">
                    ← Volver a la web
                </Link>
                <span className="text-[10px] tracking-[0.2em] uppercase opacity-50">SOTO DEL PRIOR / LEGAL</span>
            </div>

            <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-16 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] my-8 md:my-16 rounded-sm border border-gray-100">
                <header className="mb-12 border-b border-gray-100 pb-8">
                    <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] uppercase mb-4 text-[#B38B4D] tracking-tight">
                        Términos de Uso
                    </h1>
                    <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-gray-400">
                        <span>Entidad: JORDAZOLA SL</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>Actualizada: Abril 2026</span>
                    </div>
                </header>

                <div className="space-y-10 text-[15px] leading-relaxed text-[#4A4A4A]">
                    
                    <section className="group">
                        <h2 className="text-lg font-bold uppercase mb-4 text-black flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#B38B4D]"></span>
                            1. Información General
                        </h2>
                        <p>
                            El presente documento establece las condiciones por las que se rige el uso de esta página web y de nuestras aplicaciones (en adelante, los "Términos de Uso"). Le rogamos que lea atentamente estos Términos, nuestra Política de Privacidad y nuestra Política de Cookies antes de usar nuestra web o nuestros servicios.
                        </p>
                        <div className="mt-4 p-5 bg-[#F9F7F4] border-l-4 border-[#B38B4D] text-sm">
                            <ul className="space-y-2">
                                <li><strong>Titular:</strong> JORDAZOLA SL</li>
                                <li><strong>NIF:</strong> B71480958</li>
                                <li><strong>Domicilio Social:</strong> Calle San Nicolás, 72, Bajo, 31001, Pamplona (Navarra), España</li>
                                <li><strong>Contacto:</strong> <a href="mailto:info@sotodelprior.com" className="text-[#B38B4D] hover:underline">info@sotodelprior.com</a></li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold uppercase mb-4 text-black flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#B38B4D]"></span>
                            2. Acceso y Uso de la Web
                        </h2>
                        <p className="mb-4">
                            Al utilizar esta página web y realizar pedidos o reservas a través de la misma, usted se compromete a:
                        </p>
                        <ul className="list-none space-y-3 pl-0">
                            <li className="flex gap-3"><span className="text-[#B38B4D] font-bold">›</span> Hacer uso de la web únicamente para realizar consultas, pedidos o reservas legalmente válidas.</li>
                            <li className="flex gap-3"><span className="text-[#B38B4D] font-bold">›</span> No realizar ningún pedido falso o fraudulento.</li>
                            <li className="flex gap-3"><span className="text-[#B38B4D] font-bold">›</span> Facilitarnos su dirección de correo electrónico, dirección postal y/u otros datos de contacto de forma veraz y exacta.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold uppercase mb-4 text-black flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#B38B4D]"></span>
                            3. Propiedad Intelectual e Industrial
                        </h2>
                        <p className="mb-4">
                            Todos los contenidos de la página web (textos, fotografías, gráficos, imágenes, tecnología, software, links y demás contenidos audiovisuales o sonoros), así como su diseño gráfico y códigos fuente, son propiedad intelectual de JORDAZOLA SL o de terceros, sin que puedan entenderse cedidos al Usuario ninguno de los derechos de explotación sobre los mismos.
                        </p>
                        <p>
                            Queda expresamente prohibida la reproducción, distribución y comunicación pública, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de JORDAZOLA SL.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold uppercase mb-4 text-black flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#B38B4D]"></span>
                            4. Exclusión de Responsabilidades
                        </h2>
                        <p className="mb-4">
                            JORDAZOLA SL no garantiza la disponibilidad y continuidad del funcionamiento de la página web y de sus servicios. Cuando sea razonablemente posible, se advertirá previamente de las interrupciones en el funcionamiento.
                        </p>
                        <p>
                            Asimismo, JORDAZOLA SL excluye, con toda la extensión permitida por el ordenamiento jurídico, cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a la falta de disponibilidad o de continuidad del funcionamiento del sitio web o a la presencia de virus en el sistema.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold uppercase mb-4 text-black flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#B38B4D]"></span>
                            5. Modificación de los Términos
                        </h2>
                        <p>
                            Nos reservamos el derecho a revisar y modificar los presentes Términos de Uso en cualquier momento. Usted estará sujeto a las políticas y Términos vigentes en el momento en que use la presente página web, salvo que por ley o decisión de organismos gubernamentales debamos hacer cambios con carácter retroactivo.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold uppercase mb-4 text-black flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#B38B4D]"></span>
                            6. Legislación Aplicable y Jurisdicción
                        </h2>
                        <p>
                            El uso de nuestra página web y los contratos de compra de productos o reservas a través de dicha página web se regirán por la legislación española. Cualquier controversia que surja o guarde relación con el uso de la página web o con dichos contratos será sometida a la jurisdicción exclusiva de los juzgados y tribunales de Pamplona (Navarra).
                        </p>
                    </section>

                </div>

                <footer className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400">© 2026 JORDAZOLA SL</p>
                        <p className="text-[10px] uppercase tracking-widest text-[#B38B4D] font-bold">SOTO DEL PRIOR</p>
                    </div>
                    <Link href="/" className="px-8 py-3 bg-black text-white text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-[#B38B4D] transition-colors rounded-sm shadow-lg">
                        Cerrar y Volver
                    </Link>
                </footer>
            </div>

            <div className="text-center pb-20 opacity-30 hover:opacity-100 transition-opacity flex justify-center gap-6">
                <Link href="/legal/privacidad" className="text-[10px] uppercase tracking-widest text-black border-b border-black pb-1">
                    Política de Privacidad
                </Link>
                <Link href="/legal/politica-compras" className="text-[10px] uppercase tracking-widest text-black border-b border-black pb-1">
                    Política de Compras
                </Link>
            </div>
        </main>
    );
}
