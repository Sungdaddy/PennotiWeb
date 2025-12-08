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

    const popularRecipes = [
        {
            name: 'Duo Pannenkoeken Toren',
            image: '/pancakes-illustration.png',
            prompt: 'Ik wil graag een recept voor een toren van pannenkoeken met Duo Penotti.'
        },
        {
            name: 'Choco-Karamel IJsjes',
            image: '/ice-cream-illustration.png',
            prompt: 'Ik wil graag zelf ijsjes maken met chocolade en karamel á la Duo Penotti.'
        },
        {
            name: 'Gouden Wentelteefjes',
            image: '/french-toast-illustration.png',
            prompt: 'Heb je een recept voor wentelteefjes met een Duo Penotti twist?'
        }
    ];

    const handlePopularClick = (promptText: string) => {
        setPrompt(promptText);
        // We can't immediately submit because the state update is async, 
        // but for now let's just pre-fill. 
        // Or we could trigger a submit in a useEffect or separate handler.
        // Let's just set it and let the user click send, OR call logic directly.
        // Calling logic directly requires extracting handleSubmit logic.
        // For simplicity and interaction, let's just prefill.
        // Actually, user expects "Bekijk Recept" to specificially fetch it.
        // Let's extract fetch logic.
        fetchRecipe(promptText);
    };

    const fetchRecipe = async (inputPrompt: string) => {
        if (!inputPrompt.trim()) return;

        if (!apiKey) {
            setError('Configuratie fout: API Key ontbreekt in .env settings.');
            return;
        }

        setIsLoading(true);
        setResponse(null);
        setError(null);
        // Update prompt state for visibility
        setPrompt(inputPrompt);

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
                            content: inputPrompt
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
        <div className="min-h-screen pt-24 pb-12 relative overflow-hidden text-chocolate">

            {/* STANDARD SITE BACKGROUND */}
            <div className="fixed inset-0 flex z-0 pointer-events-none">
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
                    />
                </svg>
            </div>

            {/* Top Dripping Chocolate Decoration - Kept as layer on top */}
            <div className="absolute top-0 left-0 right-0 z-0 select-none pointer-events-none">
                <svg className="w-full h-32 md:h-48" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#3E2723" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                    {/* Extra drips */}
                    <path fill="#3E2723" d="M100,0 L100,150 C100,200 150,200 150,150 L150,0 Z" />
                    <path fill="#3E2723" d="M300,0 L300,120 C300,160 340,160 340,120 L340,0 Z" />
                    <path fill="#3E2723" d="M600,0 L600,180 C600,230 650,230 650,180 L650,0 Z" />
                    <path fill="#3E2723" d="M900,0 L900,140 C900,180 940,180 940,140 L940,0 Z" />
                    <path fill="#3E2723" d="M1200,0 L1200,160 C1200,210 1250,210 1250,160 L1250,0 Z" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">

                {/* Header Section */}
                <div className="text-center mb-10 pt-8 relative">
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex flex-col items-center bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border-4 border-chocolate shadow-xl w-fit mx-auto max-w-2xl"
                    >
                        <div className="bg-white p-3 rounded-full border-4 border-chocolate shadow-lg mb-2 transform -rotate-6">
                            <ChefHat size={40} className="text-brandRed" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-playful font-bold text-chocolate mb-2 drop-shadow-sm tracking-tight">
                            De Duo Chef
                        </h1>
                        <p className="text-base md:text-lg font-body font-medium text-chocolate/80 max-w-md mx-auto leading-relaxed">
                            Heb je zin in iets lekkers? Vertel onze AI Chef wat je in huis hebt of waar je zin in hebt,
                            en krijg direct een uniek <span className="font-bold text-brandRed">Duo Penotti</span> recept!
                        </p>
                    </motion.div>
                </div>

                {/* Input Area - Redesigned */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mx-auto mb-16 relative z-20"
                >
                    <div className="bg-chocolate p-3 rounded-full shadow-[0px_10px_20px_rgba(62,39,35,0.4)] border-4 border-[#5D4037]">
                        <form onSubmit={(e) => { e.preventDefault(); fetchRecipe(prompt); }} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Bijv: 'Ik wil pannenkoeken maken' of 'Iets met banaan'..."
                                className="flex-1 bg-white rounded-full px-8 py-4 text-chocolate font-body font-bold text-lg placeholder:text-chocolate/40 focus:outline-none shadow-inner"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!prompt.trim() || isLoading}
                                className="bg-brandYellow text-chocolate p-4 rounded-full hover:bg-brandYellow/90 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-md border-2 border-chocolate"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={28} strokeWidth={3} /> : <Send size={28} strokeWidth={2.5} className="ml-1" />}
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Response Section (If active) */}
                <AnimatePresence>
                    {response && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            className="bg-white rounded-[3rem] border-4 border-chocolate shadow-xl p-8 md:p-12 mb-16 relative"
                        >
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brandRed text-white font-naughty text-xl px-8 py-2 rounded-full border-4 border-white shadow-md">
                                Recept van de Chef
                            </div>
                            <div className="prose prose-lg prose-headings:font-naughty prose-headings:text-chocolate prose-p:font-body prose-li:font-body max-w-none text-chocolate whitespace-pre-wrap">
                                {response}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={() => setResponse(null)}
                                    className="bg-brandTeal text-white font-bold px-8 py-3 rounded-full hover:bg-brandTeal/80 transition-colors shadow-md"
                                >
                                    Nog een recept?
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Popular Recipes Section */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <h3 className="text-3xl font-naughty font-bold text-chocolate mb-8">Populaire Recepten</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularRecipes.map((recipe, index) => (
                            <motion.div
                                key={recipe.name}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-3xl overflow-hidden border-4 border-chocolate shadow-[8px_8px_0px_0px_rgba(62,39,35,0.8)] flex flex-col"
                            >
                                <div className="h-48 bg-vanillaCream overflow-hidden relative">
                                    {/* Drip overlay on image top */}
                                    <div className="absolute top-0 left-0 right-0 h-4 bg-chocolate" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 10%, 90% 30%, 80% 10%, 70% 40%, 60% 10%, 50% 50%, 40% 10%, 30% 30%, 20% 10%, 10% 40%, 0 10%)' }}></div>
                                    <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col items-center">
                                    <h4 className="font-playful font-bold text-xl text-chocolate mb-4 leading-tight">{recipe.name}</h4>
                                    <button
                                        onClick={() => handlePopularClick(recipe.prompt)}
                                        className="mt-auto bg-[#D4AF37] text-white font-bold text-sm px-6 py-2 rounded-full border-2 border-chocolate hover:bg-[#C5A028] shadow-[2px_2px_0px_0px_rgba(62,39,35,1)] uppercase tracking-wide"
                                    >
                                        Bekijk Recept
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {error && (
                    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-100 border-2 border-red-400 text-red-800 px-6 py-4 rounded-xl shadow-lg z-50">
                        {error}
                    </div>
                )}

            </div>
        </div>
    );
};
