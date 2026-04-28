import Link from 'next/link';
import type { Metadata } from 'next';
import '../../web_main.css';

export const metadata: Metadata = {
    title: 'Política de Privacidad | SOTO DEL PRIOR',
    description: 'Política de privacidad y protección de datos de SOTO DEL PRIOR (JORDAZOLA SL).',
};

export default function PrivacyPolicy() {
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
                        Política de Privacidad
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
                            1. Identidad del Responsable
                        </h2>
                        <p>
                            En cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos y Garantía de Derechos Digitales (LOPDGDD), se informa que el responsable del tratamiento de los datos personales es:
                        </p>
                        <div className="mt-4 p-5 bg-[#F9F7F4] border-l-4 border-[#B38B4D] text-sm">
                            <ul className="space-y-2">
                                <li><strong>Titular:</strong> JORDAZOLA SL</li>
                                <li><strong>NIF:</strong> B71480958</li>
                                <li><strong>Domicilio Social:</strong> Calle San Nicolás, 72, Bajo, 31001, Pamplona (Navarra), España</li>
                                <li><strong>Email de Protección de Datos:</strong> <a href="mailto:info@sotodelprior.com" className="text-[#B38B4D] hover:underline">info@sotodelprior.com</a></li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold uppercase mb-4 text-black flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#B38B4D]"></span>
                            2. Datos Objeto de Tratamiento
                        </h2>
                        <p className="mb-4">
                            Recopilamos y tratamos los datos estrictamente necesarios para ofrecer nuestros servicios y mejorar su experiencia:
                        </p>
                        <ul className="list-none space-y-3 pl-0">
                            <li className="flex gap-3"><span className="text-[#B38B4D] font-bold">›</span> <strong>Identificativos:</strong> Nombre, apellidos, DNI/NIE (en caso de facturación).</li>
                            <li className="flex gap-3"><span className="text-[#B38B4D] font-bold">›</span> <strong>Contacto:</strong> Correo electrónico, teléfono, dirección de envío.</li>
                            <li className="flex gap-3"><span className="text-[#B38B4D] font-bold">›</span> <strong>Interacciones en Plataformas (Meta):</strong> Contenido de mensajes directos, comentarios y perfiles públicos de Facebook e Instagram cuando se comunica con nosotros a través de nuestras apps y perfiles oficiales.</li>
                            <li className="flex gap-3"><span className="text-[#B38B4D] font-bold">›</span> <strong>Navegación:</strong> IP, cookies técnicas y analíticas (vía Google Analytics).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold uppercase mb-4 text-black flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#B38B4D]"></span>
                            3. Finalidades y Legitimación
                        </h2>
                        <p className="mb-4">Sus datos son tratados con las siguientes bases legales:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 border border-gray-100 rounded-sm">
                                <h3 className="font-bold text-xs uppercase mb-2 text-[#B38B4D]">Gestión Contractual</h3>
                                <p className="text-xs">Procesamiento de pedidos en la tienda online, reservas en el restaurante y gestión de clientes.</p>
                            </div>
                            <div className="p-4 border border-gray-100 rounded-sm">
                                <h3 className="font-bold text-xs uppercase mb-2 text-[#B38B4D]">Atención al Cliente</h3>
                                <p className="text-xs">Gestión de consultas y mensajes recibidos por web, email o redes sociales (Facebook/Instagram Messenger).</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-[#FAF9F6] p-6 rounded-sm border border-[#E9E4DB]">
                        <h2 className="text-lg font-bold uppercase mb-4 text-black flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#B38B4D]"></span>
                            4. Integración con Meta Platforms
                        </h2>
                        <p className="mb-4">
                            Nuestras aplicaciones utilizan las APIs oficiales de <strong>Meta Platforms, Inc.</strong> (Facebook e Instagram) para centralizar la comunicación con nuestros clientes:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm italic">
                            <li>Solo accedemos a los mensajes directos y comentarios que usted inicia voluntariamente con nuestros perfiles oficiales.</li>
                            <li>Los datos se procesan en nuestro servidor seguro (CRM) con el único fin de responder a sus solicitudes.</li>
                            <li>No utilizamos los datos de Meta para perfiles publicitarios externos ni los compartimos con terceros ajenos a la operación de servicio al cliente.</li>
                        </ul>
                    </section>

                    <section id="data-deletion">
                        <h2 className="text-lg font-bold uppercase mb-4 text-black flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#B38B4D]"></span>
                            5. Eliminación de Datos (Meta Compliance)
                        </h2>
                        <p className="mb-4">
                            Usted tiene el control total sobre sus datos. Si desea que eliminemos la información sincronizada de sus perfiles de Facebook o Instagram en nuestro sistema, puede solicitarlo de las siguientes formas:
                        </p>
                        <div className="bg-white border border-gray-200 p-5 space-y-4 shadow-sm">
                            <p className="text-sm">
                                <strong>Vía Email:</strong> Envíe un correo a <a href="mailto:info@sotodelprior.com" className="font-bold text-[#B38B4D]">info@sotodelprior.com</a> con el asunto "Solicitud de Eliminación de Datos Meta", indicando su nombre de usuario.
                            </p>
                            <p className="text-sm">
                                <strong>Plazo:</strong> Procederemos a la eliminación completa de su historial de mensajes en nuestro CRM en un plazo máximo de 72 horas laborales desde la recepción de la solicitud.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold uppercase mb-4 text-black flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#B38B4D]"></span>
                            6. Sus Derechos (ARCO-POL)
                        </h2>
                        <p className="mb-4">
                            Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación enviando un correo a <strong>info@sotodelprior.com</strong> adjuntando copia de su DNI o documento equivalente para verificar su identidad.
                        </p>
                        <p className="text-sm text-gray-500">
                            Si considera que sus derechos no han sido atendidos, puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).
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

            <div className="text-center pb-20 opacity-30 hover:opacity-100 transition-opacity">
                <Link href="/legal/politica-compras" className="text-[10px] uppercase tracking-widest text-black border-b border-black pb-1">
                    Política de Compras y Devoluciones
                </Link>
            </div>
        </main>
    );
}
