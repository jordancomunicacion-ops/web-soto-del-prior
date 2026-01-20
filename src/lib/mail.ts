
import nodemailer from 'nodemailer';

// Email Configuration (Ensure these ENV vars are set)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendOrderConfirmation = async (order: any, items: any[]) => {
    try {
        // 1. Customer Email
        const customerMailOptions = {
            from: '"SOTO DEL PRIOR" <info@sotodelprior.com>', // Sender address
            to: order.customerEmail, // List of receivers
            subject: `Confirmación de Pedido #${order.id.slice(-6).toUpperCase()}`, // Subject line
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h1 style="color: #C59D5F;">¡GRACIAS POR TU PEDIDO!</h1>
                    <p>Hola ${order.customerName},</p>
                    <p>Hemos recibido tu pedido correctamente. A continuación te mostramos los detalles:</p>
                    
                    <h3>Detalles del Pedido (#${order.id.slice(-6).toUpperCase()})</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${items.map((item: any) => `
                            <li style="border-bottom: 1px solid #eee; padding: 10px 0;">
                                <strong>${item.name}</strong> x ${item.quantity} - ${(item.price * item.quantity).toFixed(2)}€
                            </li>
                        `).join('')}
                    </ul>
                    
                    <p style="font-size: 1.2em; font-weight: bold;">TOTAL: ${order.total}€</p>
                    
                    <hr />
                    <h3>Dirección de Envío</h3>
                    <p>
                        ${order.customerName}<br/>
                        ${order.address}<br/>
                        ${order.city}, ${order.zipCode}<br/>
                        Tel: ${order.phone}
                    </p>
                    
                    <p>Te avisaremos cuando tu pedido salga de nuestras instalaciones.</p>
                </div>
            `,
        };

        // 2. Admin Preparation Order Email (PENDING: Future Notification System)
        /*
        const adminMailOptions = {
            from: '"TIENDA ONLINE" <noreply@sotodelprior.com>',
            to: process.env.ADMIN_EMAIL || 'pedidos@sotodelprior.com', // Admin email
            subject: `[NUEVO PEDIDO] Preparar #${order.id.slice(-6).toUpperCase()}`,
            html: `
                <div style="font-family: Courier New, monospace; color: #000;">
                    <h2 style="border-bottom: 2px solid #000; padding-bottom: 10px;">ORDEN DE PREPARACIÓN</h2>
                    <p><strong>ID:</strong> ${order.id}</p>
                    <p><strong>CLIENTE:</strong> ${order.customerName}</p>
                    <p><strong>FECHA:</strong> ${new Date().toLocaleString()}</p>
                    
                    <h3 style="background: #000; color: #FFF; padding: 5px;">ARTÍCULOS A PREPARAR</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${items.map((item: any) => `
                            <li style="margin-bottom: 10px; font-size: 1.1em;">
                                [ ] <strong>${item.quantity}x</strong> ${item.name.toUpperCase()}
                            </li>
                        `).join('')}
                    </ul>
                    
                    <div style="margin-top: 20px; border: 1px solid #000; padding: 10px;">
                        <strong>DATOS DE ENVÍO:</strong><br/>
                        ${order.address}<br/>
                        ${order.city} (${order.zipCode})<br/>
                        ${order.phone}<br/>
                        ${order.customerEmail}
                    </div>
                </div>
            `,
        };
        */

        // Send both emails
        if (process.env.SMTP_USER) {
            await transporter.sendMail(customerMailOptions);
            // await transporter.sendMail(adminMailOptions); // TODO: Re-enable when dedicated address/system is ready
            console.log("Customer email sent successfully.");
        } else {
            console.log("SMTP credentials missing. Logging emails to console instead:");
            console.log("--- Customer Email ---", JSON.stringify(customerMailOptions, null, 2));
            // console.log("--- Admin Email ---", JSON.stringify(adminMailOptions, null, 2));
        }

        return true;
    } catch (error) {
        console.error("Error sending emails:", error);
        return false;
    }
};
