import Link from 'next/link';
import '../../web_main.css'; // Re-use web styles

export default function PurchasePolicy() {
    return (
        <main className="min-h-screen bg-[#F4F4F4] font-sans">
            <div className="bg-black text-white p-4 px-8">
                <Link href="/" className="text-sm font-bold opacity-70 hover:opacity-100">← VOLVER A LA TIENDA</Link>
            </div>

            <div className="max-w-4xl mx-auto p-8 py-16 bg-white shadow-xl my-12">
                <h1 className="text-4xl font-[family-name:var(--font-heading)] uppercase mb-8 text-[#C59D5F] border-b pb-4">
                    Política de Compras y Devoluciones
                </h1>

                <div className="space-y-8 text-gray-700 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold uppercase mb-4 text-black">1. Envíos y Entregas</h2>
                        <p className="mb-2">
                            En <strong>SOTO DEL PRIOR</strong>, nos tomamos muy en serio la calidad de nuestros productos.
                            Los envíos de productos frescos (carne) se realizan mediante transporte refrigerado garantizado.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Península:</strong> Entrega en 24-48 horas laborables.</li>
                            <li><strong>Coste de Envío:</strong> Gratuito para pedidos superiores a 150€. Para pedidos inferiores, tarifa plana de 12€.</li>
                            <li><strong>Embalaje:</strong> Cajas isotermas con acumuladores de frío para garantizar la cadena de temperatura.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase mb-4 text-black">2. Devoluciones</h2>
                        <p>
                            Al tratarse de productos perecederos, no se admiten devoluciones salvo en los siguientes casos:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>El producto ha llegado en mal estado o el embalaje está roto.</li>
                            <li>El producto recibido no corresponde con el pedido.</li>
                        </ul>
                        <p className="mt-2">
                            En cualquiera de estos casos, debe notificarlo en un plazo máximo de <strong>12 horas</strong> tras la recepción, enviando fotos del producto a <em>incidencias@sotodelprior.com</em>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase mb-4 text-black">3. Pagos Seguros</h2>
                        <p>
                            Todas las transacciones se realizan a través de la pasarela de pago segura de <strong>Stripe</strong>.
                            SOTO DEL PRIOR no almacena ni tiene acceso a los datos de su tarjeta de crédito.
                            La conexión está encriptada mediante SSL (candado verde) para su total seguridad.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase mb-4 text-black">4. Reservas de Experiencias</h2>
                        <p>
                            Las visitas a la granja y reservas de restaurante pueden cancelarse con hasta 48 horas de antelación para recibir el reembolso completo.
                            Cancelaciones con menos de 48 horas no serán reembolsadas.
                        </p>
                    </section>

                </div>
            </div>
            <div className="text-center pb-12">
                <Link href="/checkout" className="text-[#C59D5F] font-bold underline uppercase">Volver al Checkout</Link>
            </div>
        </main>
    );
}
