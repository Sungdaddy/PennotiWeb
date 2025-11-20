import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

export interface Reward {
    id: string;
    name: string;
    image: string;
    pointsCost: number;
    category: string;
}

export interface CartItem extends Reward {
    quantity: number;
}

interface LoyaltyContextType {
    cart: CartItem[];
    addToCart: (reward: Reward) => void;
    removeFromCart: (rewardId: string) => void;
    updateQuantity: (rewardId: string, quantity: number) => void;
    clearCart: () => void;
    redeemCode: (code: string) => { success: boolean; message: string; points?: number };
    availableRewards: Reward[];
    addReward: (reward: Reward) => void; // Admin only
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

// Mock initial rewards
const INITIAL_REWARDS: Reward[] = [
    { id: '1', name: 'Duo Penotti Lunchbox', image: 'https://placehold.co/400x400/3E2723/FFF?text=Lunchbox', pointsCost: 500, category: 'Merchandise' },
    { id: '2', name: 'Beach Towel', image: 'https://placehold.co/400x400/D32F2F/FFF?text=Towel', pointsCost: 1200, category: 'Merchandise' },
    { id: '3', name: 'Gym Bag', image: 'https://placehold.co/400x400/3E2723/FFF?text=Gym+Bag', pointsCost: 1500, category: 'Accessories' },
    { id: '4', name: 'Swirly Socks', image: 'https://placehold.co/400x400/FFF8E1/3E2723?text=Socks', pointsCost: 300, category: 'Clothing' },
    { id: '5', name: 'Boxer Shorts', image: 'https://placehold.co/400x400/D32F2F/FFF?text=Boxers', pointsCost: 400, category: 'Clothing' },
];

// Mock valid codes
const VALID_CODES: Record<string, number> = {
    'DUO2024': 100,
    'SWIRL50': 50,
    'HAZELNUT': 25,
    'VANILLA': 25,
    'ADMIN1000': 1000,
    'SUPERSWIRL': 9999,
};

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, updatePoints } = useAuth();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [availableRewards, setAvailableRewards] = useState<Reward[]>(INITIAL_REWARDS);
    const [redeemedCodes, setRedeemedCodes] = useState<string[]>([]);

    const addToCart = (reward: Reward) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === reward.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === reward.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...reward, quantity: 1 }];
        });
    };

    const removeFromCart = (rewardId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== rewardId));
    };

    const clearCart = () => setCart([]);

    const redeemCode = (code: string) => {
        if (!user) return { success: false, message: 'Please login to redeem codes.' };

        const normalizedCode = code.toUpperCase();

        if (redeemedCodes.includes(normalizedCode)) {
            return { success: false, message: 'Code already redeemed.' };
        }

        const points = VALID_CODES[normalizedCode];
        if (points) {
            updatePoints(points);
            setRedeemedCodes((prev) => [...prev, normalizedCode]);
            return { success: true, message: `Success! You earned ${points} points.`, points };
        }

        return { success: false, message: 'Invalid code.' };
    };

    const addReward = (reward: Reward) => {
        setAvailableRewards((prev) => [...prev, reward]);
    };

    const updateQuantity = (rewardId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(rewardId);
            return;
        }
        setCart((prev) =>
            prev.map((item) =>
                item.id === rewardId ? { ...item, quantity } : item
            )
        );
    };

    return (
        <LoyaltyContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, redeemCode, availableRewards, addReward }}>
            {children}
        </LoyaltyContext.Provider>
    );
};

export const useLoyalty = () => {
    const context = useContext(LoyaltyContext);
    if (context === undefined) {
        throw new Error('useLoyalty must be used within a LoyaltyProvider');
    }
    return context;
};
