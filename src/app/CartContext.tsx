'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export type CartItem = {
    id: string; // Product ID
    name: string;
    price: number;
    quantity: number;
    image?: string;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: { id: string; name: string; price: number; image?: string }) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    toggleCart: () => void;
    total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('soto_cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Cart load error", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('soto_cart', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = (product: { id: string; name: string; price: number; image?: string }) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                // Update quantity AND refresh product details (like image) in case they changed
                return prev.map(i => i.id === product.id ? { ...i, ...product, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true); // Open cart when adding
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setItems(prev => prev.map(i => {
            if (i.id === id) {
                const newQty = Math.max(1, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }));
    };

    const clearCart = () => setItems([]);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, toggleCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
