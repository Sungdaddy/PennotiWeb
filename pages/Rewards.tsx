import React from 'react';
import { useLoyalty } from '../context/LoyaltyContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';

export const Rewards: React.FC = () => {
    const { availableRewards, addToCart } = useLoyalty();
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-vanilla pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-playful font-bold text-chocolate mb-4">Rewards Shop</h1>
                    <p className="text-xl text-chocolateLight">Spend your points on exclusive Duo Penotti merchandise!</p>
                    {user && (
                        <div className="mt-8 inline-flex items-center gap-2 bg-brandRed text-white px-6 py-3 rounded-full font-bold shadow-lg">
                            <Star fill="white" />
                            <span>Your Balance: {user.points} Points</span>
                        </div>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {availableRewards.map((reward) => (
                        <motion.div
                            key={reward.id}
                            whileHover={{ y: -10, rotate: 1 }}
                            className="bg-white rounded-[2rem] overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
                        >
                            <div className="h-48 bg-chocolate/5 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                                <span className="text-6xl">🎁</span>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-playful font-bold text-chocolate mb-2">{reward.name}</h3>
                                <p className="text-chocolateLight font-bold mb-6 flex-1">{reward.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-2xl font-naughty text-brandTeal">{reward.pointsCost} pts</span>
                                    <button
                                        onClick={() => addToCart(reward)}
                                        className="bg-brandRed text-white px-6 py-3 rounded-xl font-playful font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
