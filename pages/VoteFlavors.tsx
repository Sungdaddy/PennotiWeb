import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JarVisual } from '../components/JarVisual';

interface FlavorCandidate {
    id: string;
    name: string;
    colors: [string, string];
    votes: number;
    percentage: number;
    image: string;
}

export const VoteFlavors: React.FC = () => {
    const [flavors, setFlavors] = useState<FlavorCandidate[]>([
        {
            id: '1',
            name: 'Karamel Zeezout',
            colors: ['#D84315', '#FFF8E1'],
            votes: 120,
            percentage: 30,
            image: '/salted-caramel-popcorn.png'
        },
        {
            id: '2',
            name: 'Bosvruchten Swirl',
            colors: ['#880E4F', '#F8BBD0'],
            votes: 85,
            percentage: 21,
            image: '/white-choco-raspberry.png'
        },
        {
            id: '3',
            name: 'Banana Toffee',
            colors: ['#FBC02D', '#5D4037'],
            votes: 95,
            percentage: 24,
            image: '/banana-toffee-choco.png'
        },
        {
            id: '4',
            name: 'Double Dark Espresso',
            colors: ['#3E2723', '#212121'],
            votes: 100,
            percentage: 25,
            image: '/double-dark-espresso.png'
        },
    ]);

    const [hasVoted, setHasVoted] = useState(false);

    const handleVote = (id: string) => {
        if (hasVoted) return;

        setFlavors(prev => {
            const updated = prev.map(f => f.id === id ? { ...f, votes: f.votes + 1 } : f);
            const total = updated.reduce((acc, curr) => acc + curr.votes, 0);
            return updated.map(f => ({
                ...f,
                percentage: Math.round((f.votes / total) * 100)
            }));
        });
        setHasVoted(true);
    };

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
                <div className="text-center mb-12 flex flex-col items-center">
                    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-3xl border-2 border-white/20 shadow-xl inline-block max-w-4xl">
                        <h1
                            className="text-4xl md:text-6xl font-playful font-bold text-white mb-4"
                            style={{ textShadow: '4px 4px 0px #000000' }}
                        >
                            Duo Penotti: <span className="text-brandPink">Kies de Nieuwe Smaak!</span>
                        </h1>
                        <p
                            className="text-xl text-white font-body mx-auto font-bold"
                            style={{ textShadow: '2px 2px 0px #000000' }}
                        >
                            Stem op jouw favoriet! De smaak met de meeste stemmen komt tijdelijk in de winkels.
                        </p>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-[3rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 max-w-7xl mx-auto">

                    <h2 className="text-4xl font-playful font-bold text-center mb-12 text-chocolate">Nieuwe Smaken</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

                        {flavors.map((flavor) => (
                            <div key={flavor.id} className="flex flex-col items-center">
                                {/* Jar Visual */}
                                <div className="mb-8 transform hover:scale-105 transition-transform duration-300 h-64 flex items-end">
                                    <img
                                        src={flavor.image}
                                        alt={flavor.name}
                                        className="w-48 object-contain drop-shadow-xl"
                                    />
                                </div>

                                <h3 className="text-xl font-playful font-bold text-chocolate mb-6 text-center h-14 flex items-center">{flavor.name}</h3>

                                {/* Vote Button */}
                                <button
                                    onClick={() => handleVote(flavor.id)}
                                    disabled={hasVoted}
                                    className={`
                                        w-full py-3 rounded-full font-playful font-bold text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 transition-all
                                        ${hasVoted
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none translate-y-1'
                                            : flavor.id === '1' ? 'bg-[#D7CCC8] hover:bg-[#BCAAA4] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'bg-brandTeal hover:bg-[#4DD0E1] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                                        }
                                    `}
                                >
                                    {hasVoted ? 'Bedankt!' : 'Stem Nu!'}
                                </button>

                                {/* Progress Bar */}
                                <div className="w-full h-10 bg-gray-100 rounded-full border-4 border-black overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${flavor.percentage}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className={`h-full ${flavor.id === '1' ? 'bg-brandTeal' :
                                            flavor.id === '2' ? 'bg-brandPink' :
                                                flavor.id === '3' ? 'bg-brandYellow' : 'bg-chocolate'
                                            }`}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-end px-4 font-bold text-chocolate text-sm">
                                        {flavor.percentage}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
};
