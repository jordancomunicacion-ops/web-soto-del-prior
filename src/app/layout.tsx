import type { Metadata } from "next";
import { Oswald, Lato } from "next/font/google";
import "./globals.css";
import "./web_main.css"; // Moved from web/layout.tsx
import { CartProvider } from './CartContext'; // Planning to move this file to root

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
  title: "SOTO del PRIOR",
  description: "Antes que cocineros, somos ganaderos.",
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
      </body>
    </html>
  );
}
