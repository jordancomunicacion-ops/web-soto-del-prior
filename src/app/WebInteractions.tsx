'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function WebInteractionsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Captcha Logic
    const [captchaAnswer, setCaptchaAnswer] = useState(0);
    const [captchaQuestion, setCaptchaQuestion] = useState('2 + 3');

    // Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    // Check for payment success
    useEffect(() => {
        const isSuccess = searchParams.get('payment_success') === 'true';
        const oid = searchParams.get('order_id');

        if (isSuccess && oid) {
            setIsSuccessModalOpen(true);
            setOrderId(oid);

            // Trigger Email Notification (Idempotency check ideally needed server side, or trust client state for now)
            // To avoid double sending on re-renders, we could use a ref, but useEffect dependency on params handles it mostly.
            // Better: remove param immediately? No, we need it for modal.
            // Let's just fire it.
            fetch('/api/orders/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: oid })
            }).catch(console.error);
        }
    }, [searchParams]);

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
        // Clear params
        router.replace('/');
    };

    // ... (Existing Scroll Logic) ...
    useEffect(() => {
        // --- 1. Vertical to Horizontal Scroll Mapping ---
        const scroller = document.querySelector('.horizontal-scroller');

        if (!scroller) return;

        const handleWheel = (evt: WheelEvent) => {
            if (window.innerWidth <= 900) return; // DISABLE ON MOBILE

            if (Math.abs(evt.deltaX) > Math.abs(evt.deltaY)) {
                return;
            }

            if (Math.abs(evt.deltaY) > 0) {
                evt.preventDefault();
                scroller.scrollBy({
                    left: evt.deltaY * 3,
                    behavior: 'auto'
                });
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        // --- 2. Navigation Handling ---
        const scrollToPosition = (leftPosition: number) => {
            scroller.scrollTo({
                left: leftPosition,
                behavior: 'smooth'
            });
        };

        const logoLink = document.querySelector('.logo-link');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 900) return; // Native behavior on mobile
                e.preventDefault();
                scrollToPosition(0);
            });
        }

        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (!href) return;

                // Native behavior on mobile (let it jump to ID)
                if (window.innerWidth <= 900) {
                    // Optionally close menu handled in StoreHeader
                    return;
                }

                if (href === '#') return; // Ignore empty anchor if any

                const targetId = href.substring(1);
                if (!targetId) return;

                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    e.preventDefault();
                    scrollToPosition(targetSection.offsetLeft);
                }
            });
        });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCaptchaAnswer(num1 + num2);
        setCaptchaQuestion(`${num1} + ${num2}`);
    };

    const openModal = (e: Event) => {
        e.preventDefault();
        generateCaptcha();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Load Restaurant Widget Script
    useEffect(() => {
        const scriptId = 'soto-widget-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = '/scripts/soto-widget.js';
            script.async = true;
            document.body.appendChild(script);
        }

        // Cleanup if needed
        return () => {
            // Optional: remove script on unmount
        };
    }, []);

    // Attach listeners for Contact Modal
    useEffect(() => {
        const contactTrigger = document.getElementById('trigger-contact-modal');
        const eventTrigger = document.getElementById('trigger-event-modal');

        if (contactTrigger) contactTrigger.addEventListener('click', openModal);
        if (eventTrigger) eventTrigger.addEventListener('click', openModal);

        return () => {
            if (contactTrigger) contactTrigger.removeEventListener('click', openModal);
            if (eventTrigger) eventTrigger.removeEventListener('click', openModal);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userAnswer = parseInt(formData.get('captcha')?.toString() || '0');

        if (userAnswer !== captchaAnswer) {
            alert('Captcha incorrecto. Por favor, inténtalo de nuevo.');
            generateCaptcha();
            return;
        }

        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const subject = `Nuevo mensaje de contacto de ${name}`;
        const body = `Nombre: ${name}%0D%0ACorreo: ${email}%0D%0AMensaje:%0D%0A${message}`;

        window.location.href = `mailto:info@sotodelprior.com?subject=${subject}&body=${body}`;
        closeModal();
        (e.target as HTMLFormElement).reset();
    };

    return (
        <>
            {/* CONTACT MODAL */}
            <div id="contact-modal" className={`modal-overlay ${isModalOpen ? '' : 'modal-hidden'}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
                <div className="modal-content">
                    <button id="close-modal" className="close-btn" onClick={closeModal}>&times;</button>
                    <h2 className="modal-title">CONTACTO</h2>
                    <form id="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="contact-name">NOMBRE</label>
                            <input type="text" id="contact-name" name="name" required placeholder="Tu nombre" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-email">CORREO DE CONTACTO</label>
                            <input type="email" id="contact-email" name="email" required placeholder="tucorreo@ejemplo.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-message">MENSAJE</label>
                            <textarea id="contact-message" name="message" rows={4} required placeholder="¿En qué podemos ayudarte?"></textarea>
                        </div>
                        <div className="form-group captcha-group">
                            <label htmlFor="captcha-input">¿Cuánto es <span id="captcha-question">{captchaQuestion}</span>?</label>
                            <input type="number" id="captcha-input" name="captcha" required placeholder="Respuesta" />
                        </div>
                        <button type="submit" className="btn-submit">ENVIAR</button>
                    </form>
                </div>
            </div>

            {/* SUCCESS MODAL */}
            <div className={`modal-overlay ${isSuccessModalOpen ? '' : 'modal-hidden'}`} onClick={(e) => { if (e.target === e.currentTarget) closeSuccessModal(); }} style={{ zIndex: 3000 }}>
                <div className="modal-content text-center">
                    <button className="close-btn" onClick={closeSuccessModal}>&times;</button>
                    <h2 className="modal-title" style={{ color: '#C59D5F' }}>¡PEDIDO CONFIRMADO!</h2>
                    <p className="description" style={{ margin: '2rem 0', color: '#000' }}>
                        Muchas gracias por tu compra. Hemos recibido tu pedido correctamente.
                    </p>
                    {orderId && (
                        <div className="bg-gray-100 p-4 rounded mb-6">
                            <p className="text-xs text-gray-500 uppercase tracking-widest">ID del Pedido</p>
                            <p className="text-xl font-bold font-mono text-black">{orderId}</p>
                        </div>
                    )}
                    <button className="btn-submit" onClick={closeSuccessModal}>VOLVER AL INICIO</button>
                </div>
            </div>
        </>
    );
}

export default function WebInteractions() {
    return (
        <Suspense fallback={null}>
            <WebInteractionsContent />
        </Suspense>
    );
}
