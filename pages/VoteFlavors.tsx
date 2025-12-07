import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Star } from 'lucide-react';

interface FlavorCandidate {
    id: string;
    name: string;
    votes: number;
    percentage: number;
    image: string; // Using existing images for now, effectively "texture" placeholders
    color: string;
    badgeColor: string;
}

export const VoteFlavors: React.FC = () => {
    const [flavors, setFlavors] = useState<FlavorCandidate[]>([
        {
            id: '1',
            name: 'Karamel Zeezout',
            votes: 120,
            percentage: 30, // Updated dummy percentages to roughly sum to 100
            image: '/salted-caramel-popcorn.png',
            color: 'bg-[#4DD0E1]', // Cyan/Teal
            badgeColor: 'text-brandYellow'
        },
        {
            id: '2',
            name: 'Bosvruchten Swirl',
            votes: 80,
            percentage: 20,
            image: '/white-choco-raspberry.png',
            color: 'bg-[#F06292]', // Pink
            badgeColor: 'text-brandRed'
        },
        {
            id: '3',
            name: 'Banana Toffee',
            votes: 95,
            percentage: 24,
            image: '/banana-toffee-choco.png',
            color: 'bg-[#FBC02D]', // Yellow
            badgeColor: 'text-chocolate'
        },
        {
            id: '4',
            name: 'Double Dark Espresso',
            votes: 105,
            percentage: 26,
            image: '/double-dark-espresso.png',
            color: 'bg-[#3E2723]', // Dark
            badgeColor: 'text-white'
        },
    ]);

    // Countdown logic
    const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45 });

    // Sort flavors for leaderboard
    const sortedFlavors = [...flavors].sort((a, b) => b.votes - a.votes);

    return (
        <div className="min-h-screen text-chocolate overflow-x-hidden relative">

            {/* FIXED BACKGROUND */}
            <div className="fixed inset-0 flex z-0">
                <div className="w-1/2 h-full bg-[#3E2723]"></div> {/* Dark Chocolate */}
                <div className="w-1/2 h-full bg-[#FFF8E1]"></div> {/* Vanilla Cream */}
            </div>

            {/* FIXED SWIRL OVERLAY */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
                    <path
                        d="M720 0 C 900 200, 500 400, 720 900 L 0 900 L 0 0 Z"
                        fill="#3E2723"
                    />
                    <path
                        d="M720 0 C 900 200, 500 400, 720 900 L 1440 900 L 1440 0 Z"
                        fill="#FFF8E1"
                        opacity="0.9" // Slight opacity to blend
                    />
                    {/* Swirl Line */}
                    <path
                        d="M720 0 C 900 200, 500 400, 720 900"
                        stroke="#D7CCC8"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.2"
                    />
                </svg>
            </div>


            {/* --- CONTENT CONTAINER --- */}
            <div className="relative z-10 container mx-auto px-4 py-6 pt-32 flex flex-col items-center">

                {/* --- HEADER SECTION --- */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <span className="inline-block bg-brandYellow text-chocolate font-bold px-4 py-1 rounded-full border-2 border-black mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide text-sm">
                        Stem & Win
                    </span>
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-7xl font-playful font-extrabold text-brandPink drop-shadow-sm mb-4 leading-tight"
                    >
                        De <span className="text-brandPink">Smaak</span> Stemming
                    </motion.h1>
                    <p className="text-brandPink text-xl font-bold max-w-2xl mx-auto mb-8">
                        Welke nieuwe Duo Penotti smaak moeten wij gaan maken? Jouw stem telt!
                    </p>

                    {/* COUNTDOWN */}
                    <div className="inline-flex flex-wrap justify-center gap-4 bg-white/50 backdrop-blur-md p-4 rounded-3xl border-2 border-black/10">
                        <div className="flex flex-col items-center px-4">
                            <span className="text-4xl font-black text-brandRed font-playful">{timeLeft.days}</span>
                            <span className="text-xs font-bold uppercase tracking-wider">Dagen</span>
                        </div>
                        <div className="w-px h-12 bg-black/10 self-center"></div>
                        <div className="flex flex-col items-center px-4">
                            <span className="text-4xl font-black text-brandRed font-playful">{timeLeft.hours}</span>
                            <span className="text-xs font-bold uppercase tracking-wider">Uur</span>
                        </div>
                        <div className="w-px h-12 bg-black/10 self-center"></div>
                        <div className="flex flex-col items-center px-4">
                            <span className="text-4xl font-black text-brandRed font-playful">{timeLeft.minutes}</span>
                            <span className="text-xs font-bold uppercase tracking-wider">Min</span>
                        </div>
                    </div>
                </div>

                {/* --- VOTING CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl mb-24">
                    {flavors.map((flavor, idx) => (
                        <motion.div
                            key={flavor.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[40px] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col relative group hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            {/* Badge */}
                            <div className={`absolute -top-4 -right-4 ${flavor.badgeColor.replace('text-', 'bg-')} text-white font-naughty text-sm px-4 py-2 rounded-full border-2 border-black shadow-sm z-10 transform rotate-12`}>
                                Nieuw!
                            </div>

                            {/* Image Window */}
                            <div className="h-48 bg-[#FFF8E1] rounded-3xl border-2 border-black/10 mb-6 overflow-hidden relative flex items-center justify-center">
                                <img
                                    src={flavor.image}
                                    alt={flavor.name}
                                    className="w-40 h-40 object-contain drop-shadow-xl transform group-hover:scale-110 transition duration-500"
                                />
                            </div>

                            {/* Info */}
                            <div className="text-center mb-6 flex-grow">
                                <h3 className="text-2xl font-playful font-bold text-chocolate mb-2 leading-tight">{flavor.name}</h3>
                                <div className="h-1 w-12 bg-brandYellow mx-auto rounded-full mb-3"></div>
                                <p className="text-sm font-bold text-chocolate/60">
                                    Unieke combinatie
                                </p>
                            </div>

                            {/* Button */}
                            <button className={`w-full py-3 rounded-full font-naughty font-bold text-xl border-2 border-black mb-4 flex items-center justify-center gap-2 transition-all active:scale-95 ${idx % 2 === 0 ? 'bg-brandTeal text-chocolate shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-brandTeal/80' : 'bg-brandPink text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-brandPink/80'}`}>
                                Stem Nu <Star size={20} fill="currentColor" />
                            </button>

                            {/* Progress Bar */}
                            <div className="w-full h-6 bg-gray-100 rounded-full border-2 border-black overflow-hidden relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${flavor.percentage}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className={`h-full ${idx % 2 === 0 ? 'bg-brandTeal' : 'bg-brandPink'}`} // simplified colors
                                ></motion.div>
                                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-chocolate lowercase">
                                    {flavor.percentage}% van de stemmen
                                </span>
                            </div>

                        </motion.div>
                    ))}
                </div>


                {/* --- LEADERBOARD SECTION --- */}
                <div className="w-full max-w-3xl">
                    <div className="bg-chocolate rounded-[40px] border-4 border-brandYellow shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 relative overflow-hidden text-white">

                        {/* Wavy decoration */}
                        <div className="absolute top-0 left-0 right-0 h-4 bg-brandYellow/20"></div>

                        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                            <h2 className="text-4xl font-playful font-bold text-brandYellow">
                                Live Tussenstand
                            </h2>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-xs font-bold uppercase tracking-wider">Real-time</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {sortedFlavors.map((flavor, index) => (
                                <div key={flavor.id} className="bg-white/10 rounded-2xl p-4 flex items-center border border-white/5 hover:bg-white/20 transition-colors">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-playful font-bold text-xl mr-4 border-2 ${index === 0 ? 'bg-brandYellow text-chocolate border-brandYellow' : 'bg-transparent text-white border-white/30'}`}>
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg leading-none">{flavor.name}</h4>
                                        <div className="w-full h-1.5 bg-black/20 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full bg-brandYellow" style={{ width: `${flavor.percentage}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="text-right pl-4">
                                        <span className="block font-playful font-bold text-xl text-brandYellow">{flavor.votes}</span>
                                        <span className="text-[10px] opacity-60 uppercase font-bold">Stemmen</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};
