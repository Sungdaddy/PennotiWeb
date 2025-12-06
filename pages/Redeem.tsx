import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';

interface Reward {
    id: string;
    title: string;
    points: number;
    image: string; // URL or emoji for now
    color: string; // Tailwind class or hex
    category: string;
}

export const Redeem: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Alle Beloningen');

    const rewards: Reward[] = [
        {
            id: '1',
            title: 'Duo Penotti Knuffelbeer',
            points: 1500,
            image: '🧸',
            color: 'bg-brandTeal',
            category: 'Voor Kinderen'
        },
        {
            id: '2',
            title: 'Exclusief Schort & Koksmuts Set',
            points: 2500,
            image: '👨‍🍳',
            color: 'bg-brandPink',
            category: 'Keukenhulpjes'
        },
        {
            id: '3',
            title: 'Gepersonaliseerde Mok',
            points: 1000,
            image: '☕',
            color: 'bg-brandGreen', // Need to ensure this color exists or use hex
            category: 'Keukenhulpjes'
        },
        {
            id: '4',
            title: 'Dagje Pretpark Entree',
            points: 5000,
            image: '🎢',
            color: 'bg-brandTeal', // Using Teal as Blue proxy or custom hex
            category: 'Ervaringen'
        },
        {
            id: '5',
            title: 'Luxe Ontbijtset',
            points: 3500,
            image: '🥞',
            color: 'bg-brandPink',
            category: 'Voor Ouders'
        }
    ];

    const categories = ['Alle Beloningen', 'Voor Kinderen', 'Voor Ouders', 'Keukenhulpjes', 'Ervaringen'];

    const filteredRewards = rewards.filter(reward => {
        const matchesSearch = reward.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'Alle Beloningen' || reward.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-vanilla text-chocolate overflow-x-hidden relative">

            {/* Backgrounds */}
            <div className="fixed inset-0 flex z-0">
                <div className="w-1/2 h-full bg-[#3E2723]"></div> {/* Dark Chocolate */}
                <div className="w-1/2 h-full bg-[#FFF8E1]"></div> {/* Vanilla Cream */}
            </div>

            {/* Swirl Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
                    <path
                        d="M720 0 C 900 200, 500 400, 720 900 L 0 900 L 0 0 Z"
                        fill="#3E2723"
                    />
                    <path
                        d="M720 0 C 900 200, 500 400, 720 900 L 1440 900 L 1440 0 Z"
                        fill="#FFF8E1"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 pt-32 pb-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-playful font-bold text-white drop-shadow-md mb-4">
                        Duo Penotti Rewards Shop: <span className="text-brandPink">Spaar voor Plezier!</span>
                    </h1>
                    <p className="text-xl text-white/90 font-body max-w-2xl mx-auto">
                        Wissel jouw punten in voor exclusieve cadeaus en ervaringen voor jong en oud.
                    </p>
                </div>

                {/* Controls */}
                <div className="max-w-4xl mx-auto mb-12 space-y-6">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-chocolate/50" size={24} />
                        <input
                            type="text"
                            placeholder="Zoek naar beloningen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-6 py-4 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-y-1 focus:shadow-none transition-all font-playful text-lg"
                        />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full font-bold border-2 border-black transition-all ${activeCategory === category
                                        ? 'bg-[#D7CCC8] text-chocolate shadow-none translate-y-1'
                                        : 'bg-white text-chocolate shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rewards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {filteredRewards.map((reward) => (
                        <motion.div
                            key={reward.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`${reward.color === 'bg-brandGreen' ? 'bg-[#AED581]' : reward.color} rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col`}
                        >
                            <div className="bg-white/50 h-48 flex items-center justify-center text-8xl relative overflow-hidden">
                                {/* Decorative elements could go here */}
                                <div className="z-10">{reward.image}</div>
                            </div>

                            <div className="p-6 text-center flex-1 flex flex-col">
                                <h3 className="text-2xl font-playful font-bold text-chocolate mb-2 leading-tight">
                                    {reward.title}
                                </h3>
                                <div className="text-xl font-bold text-chocolate/80 mb-6">
                                    {reward.points} PTS
                                </div>

                                <button className="mt-auto bg-[#D7CCC8] text-chocolate font-bold py-3 px-8 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-all">
                                    Inwisselen
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};
