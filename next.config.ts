import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            { source: "/cart", destination: "/checkout", permanent: true },
            { source: "/checkout-old", destination: "/checkout", permanent: true },
            { source: "/pedido-online", destination: "/checkout", permanent: true },
            { source: "/producto/:slug*", destination: "/#obrador", permanent: true },
            { source: "/tienda", destination: "/#obrador", permanent: true },
            { source: "/tienda/:path*", destination: "/#obrador", permanent: true },
            { source: "/hamburgueseria", destination: "/", permanent: true },
            { source: "/mi-cuenta", destination: "/login", permanent: true },
            { source: "/mi-cuenta/:path*", destination: "/login", permanent: true },
            { source: "/wp-admin", destination: "/login", permanent: true },
            { source: "/wp-admin/:path*", destination: "/login", permanent: true },
            { source: "/wp-login.php", destination: "/login", permanent: true },
        ];
    },
};

export default nextConfig;
