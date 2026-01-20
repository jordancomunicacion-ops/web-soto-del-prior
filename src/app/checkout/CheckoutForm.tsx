'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

export default function CheckoutForm({ total, items }: { total: number, items: any[] }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        try {
            // 1. Create Order in DB
            const orderRes = await fetch('/api/orders/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items,
                    total,
                    customerDetails: formData
                })
            });

            if (!orderRes.ok) throw new Error('Error al crear el pedido');

            const { orderId } = await orderRes.json();

            // 2. Confirm Payment with Stripe
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/web?payment_success=true&order_id=${orderId}`,
                    payment_method_data: {
                        billing_details: {
                            name: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                            address: {
                                line1: formData.address,
                                city: formData.city,
                                postal_code: formData.zip,
                                country: 'ES', // Defaulting to Spain
                            }
                        }
                    }
                },
            });

            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message || "Error desconocido");
            } else {
                setMessage("Ha ocurrido un error inesperado.");
            }

        } catch (err: any) {
            setMessage(err.message || "Error procesando el pedido");
        }

        setIsLoading(false);
    };

    const inputStyle = "w-full bg-white border border-gray-300 p-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#C59D5F] transition-colors";
    const labelStyle = "block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* SHIPPING DETAILS */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold uppercase border-b border-gray-200 pb-2 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    Dirección de Envío
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelStyle}>Nombre Completo</label>
                        <input required name="name" type="text" placeholder="Juan Pérez" className={inputStyle} value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className={labelStyle}>Email</label>
                        <input required name="email" type="email" placeholder="hola@ejemplo.com" className={inputStyle} value={formData.email} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelStyle}>Teléfono</label>
                        <input required name="phone" type="tel" placeholder="+34 600 000 000" className={inputStyle} value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className={labelStyle}>Código Postal</label>
                        <input required name="zip" type="text" placeholder="28001" className={inputStyle} value={formData.zip} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className={labelStyle}>Dirección</label>
                        <input required name="address" type="text" placeholder="Calle Ejemplo, 123, 1ºA" className={inputStyle} value={formData.address} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className={labelStyle}>Ciudad</label>
                        <input required name="city" type="text" placeholder="Madrid" className={inputStyle} value={formData.city} onChange={handleInputChange} />
                    </div>
                </div>
            </div>

            {/* STRIPE PAYMENT ELEMENT */}
            <div>
                <h3 className="text-lg font-bold uppercase border-b border-gray-200 pb-2 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    Pago Seguro
                </h3>
                <div className="bg-white p-4 border border-gray-200 rounded">
                    <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
                </div>
            </div>

            {message && <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded">{message}</div>}

            <button
                type="submit"
                disabled={isLoading || !stripe || !elements}
                className="w-full bg-[#C59D5F] text-white py-4 font-bold uppercase text-lg hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-8 shadow-lg"
                style={{ fontFamily: 'var(--font-heading)' }}
            >
                {isLoading ? 'Procesando...' : `Pagar ${total.toFixed(2)}€`}
            </button>

            <div className="text-xs text-gray-400 text-center mt-2 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z" /></svg>
                <p>Pagos procesados de forma segura por Stripe</p>
            </div>
        </form>
    );
}
