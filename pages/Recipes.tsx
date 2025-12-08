import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChefHat, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Recipes: React.FC = () => {
    const { t } = useTranslation();
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get API key and Model from environment variables
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const model = import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-5-nano';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        if (!apiKey) {
            setError('Configuratie fout: API Key ontbreekt in .env settings.');
            return;
        }

        setIsLoading(true);
        setResponse(null);
        setError(null);

        try {
            const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Duo Penotti Experience',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: 'system',
                            content: `Je bent een enthousiaste en creatieve chef-kok gespecialiseerd in desserts en lekkernijen. 
                            Jouw DOEL is om recepten te genereren die SPECIFIEK "Duo Penotti" gebruiken als ingrediënt.
                            
                            REGELS:
                            1. Geef NOOIT antwoord op vragen die niet over eten of recepten gaan.
                            2. Als de gebruiker vraagt om een recept ZONDER Duo Penotti, vertel ze dan vriendelijk dat je alleen Duo Penotti recepten maakt en suggereer hoe je Duo Penotti kunt toevoegen.
                            3. Geef PER KEER MAAR 1 RECEPT.
                            4. Gebruik een leuke, energieke toon die past bij het merk Duo Penotti ("Dubbel Lekker!").
                            5. Het recept moet structureel duidelijk zijn: Ingrediëntenlijst, en dan Bereidingswijze.
                            6. Antwoord altijd in het Nederlands, tenzij expliciet anders gevraagd.`
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ]
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error?.message || 'Er ging iets mis met het ophalen van het recept.');
            }

            const data = await res.json();
            const reply = data.choices?.[0]?.message?.content;

            if (reply) {
                setResponse(reply);
            } else {
                throw new Error('Geen recept ontvangen. Probeer het opnieuw!');
            }

        } catch (err: any) {
            setError(err.message || 'Kon geen verbinding maken met de chef.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
            {/* Background elements derived from Home */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
                    <path d="M0 0 L 1440 0 L 1440 900 L 0 900 Z" fill="#FFF8E1" />
                    <path d="M0 0 C 400 300, 900 100, 1440 400 L 1440 0 Z" fill="#3E2723" opacity="0.1" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-4xl">

                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block p-4 bg-white rounded-full border-4 border-chocolate shadow-lg mb-4"
                    >
                        <ChefHat size={48} className="text-brandRed" />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-playful font-bold text-chocolate mb-4 drop-shadow-sm">
                        De Duo Chef
                    </h1>
                    <p className="text-xl font-body text-chocolate/80 max-w-2xl mx-auto">
                        Heb je zin in iets lekkers? Vertel onze AI Chef wat je in huis hebt of waar je zin in hebt,
                        en krijg direct een uniek <span className="font-bold text-brandRed">Duo Penotti</span> recept!
                    </p>
                </div>

                {/* Main Chat Area */}
                <div className="grid gap-8">

                    {/* Input Section */}
                    <div className="bg-white p-2 rounded-[30px] border-4 border-chocolate shadow-[8px_8px_0px_0px_rgba(45,27,21,1)]">
                        <form onSubmit={handleSubmit} className="flex gap-2 items-center p-2">
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Bijv: 'Ik wil pannenkoeken maken' of 'Iets met banaan'..."
                                className="flex-1 bg-transparent px-4 py-3 text-lg font-body font-bold text-chocolate placeholder:text-chocolate/40 focus:outline-none"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!prompt.trim() || isLoading}
                                className="bg-brandRed text-white p-4 rounded-full border-2 border-chocolate hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[2px_2px_0px_0px_rgba(45,27,21,1)]"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Send size={24} />}
                            </button>
                        </form>
                    </div>

                    {/* Response Section */}
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="p-6 bg-red-50 border-4 border-red-200 rounded-3xl text-center text-red-800"
                            >
                                <p className="font-bold">{error}</p>
                            </motion.div>
                        )}

                        {response && (
                            <motion.div
                                key="response"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white rounded-[40px] border-4 border-brandTeal shadow-[12px_12px_0px_0px_rgba(45,27,21,0.15)] overflow-hidden"
                            >
                                <div className="bg-brandTeal p-4 border-b-4 border-chocolate flex justify-between items-center">
                                    <h2 className="text-2xl font-naughty font-bold text-white pl-4">Recept van de Chef</h2>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setResponse(null)}
                                            className="bg-white/20 hover:bg-white/40 text-white px-4 py-1 rounded-full text-sm font-bold transition-colors"
                                        >
                                            Nieuw Recept
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8 md:p-12 prose prose-lg prose-headings:font-naughty prose-headings:text-chocolate prose-p:font-body prose-li:font-body max-w-none text-chocolate">
                                    {/* Simple rendering of text with whitespace preservation */}
                                    <div className="whitespace-pre-wrap leading-relaxed">
                                        {response}
                                    </div>
                                </div>
                                <div className="bg-vanillaCream p-4 text-center border-t-2 border-dashed border-chocolate/20">
                                    <p className="text-sm font-bold text-chocolate/60">Eet smakelijk! 🍫</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
};
