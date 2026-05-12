'use client';

import { useCart } from './CartContext';

export default function BuyButton({ product }: { product: any }) {
    const { addToCart } = useCart();

    const handleBuy = () => {
        const price = parseFloat(product.price.toString());
        addToCart({
            id: product.id,
            name: product.name,
            price,
            image: product.image
        });

        const w = window as unknown as { trackEvent?: (t: string, d: Record<string, unknown>) => void };
        if (typeof window !== 'undefined' && typeof w.trackEvent === 'function') {
            w.trackEvent('PRODUCT_CLICK', {
                productId: product.id,
                productName: product.name,
                price,
                section: window.location.hash || '#obrador'
            });
        }
    };

    return (
        <button
            onClick={handleBuy}
            className="btn-product relative z-10 hover:bg-[#C59D5F] hover:text-white transition-colors cursor-pointer"
        >
            COMPRAR
        </button>
    );
}
