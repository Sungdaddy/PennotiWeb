import React, { useState } from 'react';
import { useLoyalty } from '../context/LoyaltyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';

export const Redeem: React.FC = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const { redeemCode } = useLoyalty();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = redeemCode(code);
        setMessage(result.message); // Updated setMessage call
        if (result.success) setCode('');
    };

    return (
        <div className="min-h-screen bg-vanillaCream flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-playful font-bold text-chocolate mb-4">Got a Code?</h1>
                    <p className="text-2xl font-naughty text-brandTeal transform -rotate-2">Unlock sweet rewards!</p>
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-8 md:p-12 rounded-[3rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Gift size={120} className="text-chocolate" />
                    </div>

                    <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                        <div>
                            <label className="block text-chocolate font-bold mb-4 font-playful text-xl">Enter your code below:</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value.toUpperCase())}
                                className="w-full px-8 py-6 rounded-2xl border-4 border-chocolate/20 focus:border-brandTeal focus:ring-0 outline-none font-naughty text-4xl text-center tracking-widest text-chocolate transition-colors bg-vanillaCream placeholder-chocolate/20 uppercase"
                                placeholder="CODE123"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-brandTeal text-white font-playful font-bold text-2xl py-5 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
                        >
                            Claim Points! 🎁
                        </button>
                    </form>

                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`mt-8 p-6 rounded-xl border-2 border-black text-center font-bold text-xl ${message.type === 'success' ? 'bg-brandGreen/20 text-green-800' : 'bg-brandRed/20 text-brandRed'
                                    }`}
                            >
                                {message.text}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-12 text-center">
                    <p className="text-chocolate/60 font-bold">
                        Find codes inside specially marked Duo Penotti jars!
                    </p>
                </div>
            </div>
        </div>
    );
};
