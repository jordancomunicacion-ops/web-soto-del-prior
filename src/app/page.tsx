import { prisma } from '@/lib/prisma';
import WebInteractions from './WebInteractions';
import BuyButton from './BuyButton';
import StoreHeader from './StoreHeader';
import CartSidebar from './CartSidebarFinal'; // UPDATED to Final Version

async function getProducts() {
  try {
    const products = await prisma.shopProduct.findMany();
    // Serialize Decimal to number/string for Client Components
    return products.map(p => ({
      ...p,
      price: parseFloat(p.price.toString())
    }));
  } catch (error) {
    console.error("DB Error:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  // Helper to find specific products by name (fuzzy match)
  const menuProduct = products.find(p => p.name.includes("Menú"));
  const packProduct = products.find(p => p.name.includes("Pack"));
  const visitProduct = products.find(p => p.name.includes("Visita"));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SOTO del PRIOR",
    "url": "https://www.sotodelprior.com",
    "logo": "https://www.sotodelprior.com/web/assets/logo_full.png",
    "sameAs": [
      "https://www.instagram.com/sotodelprior/",
      "https://www.tiktok.com/@sotodelprior"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+34 (Tu Número)",
      "contactType": "customer service",
      "areaServed": "ES",
      "availableLanguage": "Spanish"
    },
    "description": "Ganadería propia y restaurante Km0. Venta de carne de buey online."
  };

  return (
    <main className="web-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Dynamic Header with Cart State */}
      <StoreHeader />
      <CartSidebar />

      {/* HORIZONTAL SCROLL CONTAINER */}
      <div className="horizontal-scroller">

        {/* 1. HERO */}
        <section className="h-section hero-section" id="inicio">
          <div className="hero-bg">
            <img src="/web/assets/hero_landscape_clean.png" alt="Paisaje Soto del Prior" />
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">ANTES QUE COCINEROS,<br />SOMOS GANADEROS.</h1>
          </div>
        </section>

        {/* 2. RESTAURANTE (Split Alt) */}
        <section className="h-section split-layout" id="restaurante">
          <div className="split-text">
            <h2 className="big-lead">HIERRO &amp; CIERZO.</h2>
            <p className="description">
              Producto de temporada. De nuestra huerta al plato.
              Sabores puros, sin artificios. La esencia de la tierra.
            </p>
            {/* Booking Trigger Link */}
            <div className="booking-widget-container" style={{ marginTop: '2rem' }}>
              <a href="#" className="btn-link soto-widget-trigger" style={{ width: 'fit-content', padding: '1rem 2rem' }}>
                RESERVAR MESA
              </a>
            </div>
          </div>
          <div className="split-visual">
            <img src="/web/assets/img_restaurante.png" alt="Tomate Confitado Soto del Prior" />
          </div>
        </section>

        {/* 3. EVENTOS (Formerly Granja) */}
        <section className="h-section split-layout" id="eventos">
          <div className="split-text">
            <h2 className="big-lead">EVENTOS.</h2>
            <p className="description">
              Celebraciones privadas. Rodajes. Presentaciones de marca.
              Un entorno único para momentos que exigen distinción y privacidad absoluta.
            </p>
            <a href="#" className="btn-link" id="trigger-event-modal" style={{ width: 'fit-content', padding: '1rem 2rem' }}>ORGANIZAR EVENTO</a>
          </div>
          <div className="split-visual">
            <img src="/web/assets/img_eventos.png" alt="Eventos y Bodas Soto del Prior" />
          </div>
        </section>

        {/* 4. ALOJAMIENTO (Split) */}
        <section className="h-section split-layout" id="alojamiento">
          <div className="split-visual">
            <img src="/web/assets/bedroom.png" alt="Habitación Rural" />
          </div>
          <div className="split-text">
            <h2 className="big-lead">SILENCIO.</h2>
            <p className="description">
              Desconectar para reconectar. Madera, piedra y vistas a la sierra.
              Una estancia de lujo rural donde el único ruido es el viento.
            </p>
            {/* Avirato Booking Engine */}
            <div className="booking-widget-container">
              <iframe src="http://localhost:3001/widget" frameBorder="0" height="600"
                width="100%" title="Reserva tu estancia"></iframe>
            </div>
          </div>
        </section>

        {/* 5. OBRADOR (Split) - DYNAMIC PRODUCTS */}
        <section className="h-section split-layout" id="obrador">
          <div className="split-visual">
            <img src="/web/assets/bread.png" alt="Pan Artesano" />
          </div>
          <div className="split-text">
            <h2 className="big-lead">REGALA.</h2>
            <p className="description">
              Porque lo auténtico se comparte. Sorprende con una experiencia gastronómica inolvidable o con el
              sabor puro de nuestra tierra.
            </p>
            <div className="product-grid">
              {/* DYNAMIC PRODUCT 1: MENU */}
              <div className="product-card">
                <h3>{menuProduct?.name || "MENÚ DEGUSTACIÓN"}</h3>
                <p className="product-detail">{menuProduct?.description || "6 Pases"}</p>
                <p className="product-price">{menuProduct ? menuProduct.price + '€' : "70€"}</p>
                {/* Image passed via spread or explicit prop if BuyButton supports it. BuyButton takes 'product'. 
                    I'll construct a synthetic product object with the image. 
                */}
                <BuyButton product={{
                  ...(menuProduct || { id: 'menu-degustacion', name: 'MENÚ DEGUSTACIÓN', price: 70 }),
                  image: '/web/assets/menu_degustacion.png'
                }} />
              </div>
              {/* DYNAMIC PRODUCT 2: PACK */}
              <div className="product-card">
                <h3>{packProduct?.name || "PACK ARTESANAL"}</h3>
                <p className="product-detail">{packProduct?.description || "Chorizo, salchichón y cecina..."}</p>
                <p className="product-price">{packProduct ? packProduct.price + '€' : "50€"}</p>
                <BuyButton product={{
                  ...(packProduct || { id: 'pack-artesanal', name: 'PACK ARTESANAL', price: 50 }),
                  image: '/web/assets/pack_artesanal.png'
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* 6. ORIGEN (Formerly Filosofía) - DYNAMIC PRODUCT 3 */}
        <section className="h-section philosophy-section" id="origen">
          <div className="flex flex-col items-center justify-center w-full h-full relative z-10 px-4">
            <h2 className="big-lead text-center mb-8">NO BUSCAMOS LA PERFECCIÓN. <br />BUSCAMOS EL ORIGEN.</h2>

            {/* Product Card: Text + Price + Button (No Image) */}
            <div className="product-card product-card--horizontal max-w-xl mx-auto w-full border border-white/20 p-6">
              <div className="card-info text-center md:text-left flex-1">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{visitProduct?.name || "VISITA A LA GRANJA"}</h3>
                <p className="product-detail text-gray-300 text-sm md:text-base">{visitProduct?.description || "Experiencia guiada"}</p>
              </div>
              <div className="card-actions flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 md:ml-8">
                <p className="product-price text-[#C59D5F] text-3xl font-bold m-0">{visitProduct ? visitProduct.price + '€' : "20€"}</p>
                <BuyButton product={{
                  ...(visitProduct || { id: 'visita-granja', name: 'VISITA A LA GRANJA', price: 20 }),
                  image: '/web/assets/visita_granja.png'
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* 7. FOOTER / END */}
        <section className="h-section end-section" id="contacto">
          <img src="/web/assets/logo_text.png" alt="SOTO DEL PRIOR" className="footer-logo" />
          <div className="end-links">
            <a href="https://www.instagram.com/sotodelprior/" target="_blank"><img src="/web/assets/icon_instagram.svg"
              alt="Instagram" className="social-icon" /></a>
            <a href="https://www.tiktok.com/@sotodelprior" target="_blank"><img src="/web/assets/icon_tiktok.svg"
              alt="TikTok" className="social-icon" /></a>
            <a href="#" id="trigger-contact-modal"><img src="/web/assets/icon_mail.svg" alt="Contacto"
              className="social-icon" /></a>
            <a href="#"><img src="/web/assets/icon_phone.svg" alt="Teléfono" className="social-icon" /></a>
          </div>
          <p style={{ marginTop: '2rem', opacity: 0.7 }}>© 2024 TODOS LOS DERECHOS RESERVADOS</p>
        </section>

      </div>

      {/* Client Interaction Logic (Scroll, Modals) */}
      <WebInteractions />
    </main>
  );
}
