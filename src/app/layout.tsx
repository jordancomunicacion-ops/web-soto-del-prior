import type { Metadata } from "next";
import { Oswald, Lato } from "next/font/google";
import "./globals.css";
import "./web_main.css"; // Moved from web/layout.tsx
import { CartProvider } from './CartContext'; // Planning to move this file to root
import Script from "next/script";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-heading",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "SOTO del PRIOR | Ganadería & Restaurante",
    template: "%s | SOTO del PRIOR"
  },
  description: "Antes que cocineros, somos ganaderos. Carne de buey y vaca de pasto, restaurante km0 y alojamiento rural en un entorno único.",
  keywords: ["ganadería", "restaurante", "carne de buey", "alojamiento rural", "soto del prior", "eventos", "km0"],
  authors: [{ name: "SOTO del PRIOR" }],
  creator: "SOTO del PRIOR",
  metadataBase: new URL("https://www.sotodelprior.com"),
  openGraph: {
    title: "SOTO del PRIOR | Ganadería & Restaurante",
    description: "Antes que cocineros, somos ganaderos. Vive la experiencia del origen.",
    url: "https://www.sotodelprior.com",
    siteName: "SOTO del PRIOR",
    images: [
      {
        url: "/web/assets/hero_landscape_clean.png", // Using an existing high-quality image
        width: 1200,
        height: 630,
        alt: "Paisaje Soto del Prior",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOTO del PRIOR",
    description: "Antes que cocineros, somos ganaderos.",
    images: ["/web/assets/hero_landscape_clean.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: "/",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect not strictly needed with Next/Font but kept for consistency if external assets load */}
      </head>
      <body
        className={`${oswald.variable} ${lato.variable}`}
      >
        <CartProvider>
          {children}
        </CartProvider>

        <Script id="analytics-tracker" strategy="afterInteractive">
          {`
            (function() {
              var siteId = "6de8b4c4-21db-4d2b-9fa6-58c3af39f77c";
              var endpoint = "https://crm.sotodelprior.com/api/analytics/track"; 

              // Helper to get/create ID
              function getId(key, storage) {
                  if(!storage) return "";
                  var id = storage.getItem(key);
                  if(!id) {
                      id = Math.random().toString(36).substring(2) + Date.now().toString(36);
                      storage.setItem(key, id);
                  }
                  return id;
              }

              function track(url) {
                if(!url) url = window.location.pathname;
                
                var vid = getId('ana_visitor_id', localStorage);
                var sid = getId('ana_session_id', sessionStorage);

                var data = { 
                    websiteId: siteId, 
                    url: url, 
                    referrer: document.referrer, 
                    userAgent: navigator.userAgent,
                    visitorId: vid,
                    sessionId: sid
                };
                fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(console.error);
              }
              track();

              var pushState = history.pushState;
              history.pushState = function() { pushState.apply(history, arguments); track(window.location.pathname); };
              window.addEventListener('popstate', function() { track(window.location.pathname); });

              // Auto-Tracker
              window.trackEvent = function(t, d) {
                  var vid = getId('ana_visitor_id', localStorage);
                  var sid = getId('ana_session_id', sessionStorage);
                  
                  var data = { 
                      websiteId: siteId, 
                      url: window.location.pathname, 
                      type: 'EVENT', 
                      eventType: t, 
                      eventData: d || {}, 
                      userAgent: navigator.userAgent,
                      visitorId: vid,
                      sessionId: sid
                  };
                  if (navigator.sendBeacon) navigator.sendBeacon(endpoint, new Blob([JSON.stringify(data)], {type:'application/json'}));
                  else fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(console.error);
              };

              document.addEventListener('click', function(e) {
                  var t = e.target.closest('a, button');
                  if (t) {
                      var text = (t.innerText || t.textContent || '').trim().substring(0,50);
                      if(!text && !t.id && !t.className) return;
                      window.trackEvent('CLICK', { element: t.tagName, text: text, id: t.id, class: t.className, href: t.href });
                  }
              }, true);
            })();
          `}
        </Script>

      </body>
    </html>
  );
}
