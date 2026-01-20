'use client';

import { useCart } from './CartContext';

export default function BuyButton({ product }: { product: any }) {
    const { addToCart } = useCart();

    const handleBuy = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price.toString()),
            image: product.image
        });
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
