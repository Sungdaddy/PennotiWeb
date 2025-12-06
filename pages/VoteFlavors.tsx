import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SwirlBackground } from '../components/SwirlBackground';
import { JarVisual } from '../components/JarVisual';

interface FlavorCandidate {
    id: string;
    key: string; // Translation key suffix
    colors: [string, string];
    votes: number;
    image?: string; // Optional custom image path
}

export const VoteFlavors: React.FC = () => {
    const { t } = useTranslation();
    const [flavors, setFlavors] = useState<FlavorCandidate[]>([
        { id: '1', key: 'f1', colors: ['#D84315', '#FFF8E1'], votes: 120, image: '/salted-caramel-popcorn.png' },
        { id: '2', key: 'f2', colors: ['#E91E63', '#FFFFFF'], votes: 85, image: '/white-choco-raspberry.png' },
        { id: '3', key: 'f3', colors: ['#FBC02D', '#5D4037'], votes: 95, image: '/banana-toffee-choco.png' },
        { id: '4', key: 'f4', colors: ['#3E2723', '#212121'], votes: 60, image: '/double-dark-espresso.png' },
    ]);

    const [hasVoted, setHasVoted] = useState(false);

    const handleVote = (id: string) => {
        if (hasVoted) return;
        setFlavors(prev => prev.map(f => f.id === id ? { ...f, votes: f.votes + 1 } : f));
        setHasVoted(true);
    };

    const totalVotes = flavors.reduce((acc, curr) => acc + curr.votes, 0);
    const maxVotes = Math.max(...flavors.map(f => f.votes));

    return (
        <div className="min-h-screen bg-vanilla text-chocolate selection:bg-brandRed selection:text-white overflow-hidden relative pt-24">
            <SwirlBackground />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-7xl font-playful font-bold text-chocolate mb-4"
                    >
                        {t('vote.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl font-body text-chocolateLight max-w-2xl mx-auto"
                    >
                        {t('vote.subtitle')}
                    </motion.p>
                </div>

                {/* Vertical Bars & Voting Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 h-[600px] items-end mb-24">
                    {flavors.map((flavor, index) => {
                        const percentage = totalVotes > 0 ? (flavor.votes / totalVotes) * 100 : 0;
                        const heightPercentage = maxVotes > 0 ? (flavor.votes / maxVotes) * 100 : 0;
                        // Ensure a minimum height for visibility
                        const displayHeight = Math.max(heightPercentage, 10);

                        return (
                            <div key={flavor.id} className="flex flex-col items-center justify-end h-full group">
                                {/* Jar Visual on top */}
                                <div className={`mb-4 relative z-20 transform transition-transform group-hover:scale-110 duration-300 flex items-end justify-center h-52 ${index % 2 === 0 ? '-rotate-3' : 'rotate-3'}`}>
                                    {flavor.image ? (
                                        <img
                                            src={flavor.image}
                                            alt={t(`vote.flavors.${flavor.key}.name`)}
                                            className="w-32 md:w-40 object-contain drop-shadow-xl"
                                        />
                                    ) : (
                                        <JarVisual
                                            colorLeft={flavor.colors[0]}
                                            colorRight={flavor.colors[1]}
                                            className="w-32 h-40 md:w-40 md:h-52"
                                        />
                                    )}
                                    {/* Leader Badge */}
                                    {flavor.votes === maxVotes && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-4 -right-4 bg-brandYellow text-chocolate text-xs font-bold px-3 py-1 rounded-full border-2 border-black shadow-sm flex items-center gap-1 z-30 rotate-12"
                                        >
                                            <Sparkles size={14} /> {t('vote.leader')}
                                        </motion.div>
                                    )}
                                </div>

                                {/* Vertical Bar */}
                                <div className="w-full max-w-[100px] h-[300px] bg-white/50 rounded-t-2xl rounded-b-lg relative flex items-end justify-center border-2 border-black/10 overflow-hidden">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${displayHeight}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="w-full absolute bottom-0 left-0 rounded-t-xl"
                                        style={{ backgroundColor: flavor.colors[0] }}
                                    >
                                        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMTBMMTAgMFYyTDAgMTJaIiBmaWxsPSIjMDAwIi8+PC9zdmc+')]"></div>
                                    </motion.div>

                                    {/* Percentage Text inside bar */}
                                    <div className="relative z-10 mb-2 text-center">
                                        <div className="font-naughty text-white text-xl drop-shadow-md">{Math.round(percentage)}%</div>
                                        <div className="font-body text-white text-sm font-bold opacity-90 drop-shadow-sm">{flavor.votes} votes</div>
                                    </div>
                                </div>

                                {/* Info & Vote Button */}
                                <div className="mt-4 text-center w-full">
                                    <h3 className="font-playful font-bold text-lg md:text-xl leading-tight mb-1 h-12 flex items-center justify-center">{t(`vote.flavors.${flavor.key}.name`)}</h3>
                                    <button
                                        onClick={() => handleVote(flavor.id)}
                                        disabled={hasVoted}
                                        className={`
                                            mt-2 px-6 py-2 rounded-full font-bold border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 mx-auto
                                            ${hasVoted
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-400 shadow-none'
                                                : 'bg-brandTeal text-chocolate hover:bg-brandYellow'
                                            }
                                        `}
                                    >
                                        <ThumbsUp size={18} /> {t('vote.voteBtn')}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
