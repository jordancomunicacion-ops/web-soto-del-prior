import type { Metadata } from "next";
import { Oswald, Lato } from "next/font/google";
import "./globals.css";
import "./web_main.css"; // Moved from web/layout.tsx
import { CartProvider } from './CartContext'; // Planning to move this file to root
import AnalyticsTracker from "../components/AnalyticsTracker";
import { Suspense } from "react";

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
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
      </body>
    </html>
  );
}
