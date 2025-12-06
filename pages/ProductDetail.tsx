import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Leaf, Info, Utensils } from 'lucide-react';
import { JarVisual } from '../components/JarVisual';
import { Product } from '../types';
import { useTranslation } from 'react-i18next';

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();


    const [activeTab, setActiveTab] = useState<'info' | 'nutrition'>('info');
    const [imageError, setImageError] = useState(false);

    // Scroll to top when component mounts or product changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Build products object using translations
    const product = useMemo(() => {
        if (!id) return null;

        const productData: Record<string, {
            key: string;
            colors: [string, string];
            image: string;
            ingredients: string;
            nutrition: { energy: string; fat: string; carbs: string; protein: string; salt: string };
            price: string;
            weight: string;
        }> = {
            'duo-hazelnut-vanilla': {
                key: 'duoHazelnutVanilla',
                colors: ['#3E2723', '#FFF8E1'],
                image: '/products/duo-vanilla.png',
                ingredients: 'Sugar, vegetable oils (rapeseed, palm), hazelnuts (7%), low fat cocoa powder (4%), whole milk powder (2%), skimmed milk powder, calcium carbonate, emulsifier (lecithins), natural vanilla flavor.',
                nutrition: { energy: '2350 kJ / 563 kcal', fat: '35g', carbs: '59g', protein: '2.4g', salt: '0.11g' },
                price: '€3,49',
                weight: '400g'
            },
            'duo-hazelnut-caramel': {
                key: 'duoHazelnutCaramel',
                colors: ['#5D4037', '#D84315'],
                image: '/products/duo-caramel.png',
                ingredients: 'Sugar, vegetable oils, hazelnuts (7%), caramel powder, cocoa powder, milk powder, emulsifier, flavorings.',
                nutrition: { energy: '2360 kJ / 565 kcal', fat: '36g', carbs: '58g', protein: '2.5g', salt: '0.15g' },
                price: '€3,49',
                weight: '400g'
            },
            'uno-white': {
                key: 'unoWhite',
                colors: ['#FFF8E1', '#FFF8E1'],
                image: '/products/uno-white.png',
                ingredients: 'Sugar, vegetable oils (sunflower, rapeseed), skimmed milk powder, roasted almonds, cocoa butter, emulsifier.',
                nutrition: { energy: '2400 kJ / 575 kcal', fat: '38g', carbs: '55g', protein: '4.0g', salt: '0.10g' },
                price: '€3,29',
                weight: '350g'
            },
            'uno-praline': {
                key: 'unoPraline',
                colors: ['#8D6E63', '#8D6E63'],
                image: '/products/uno-praline.png',
                ingredients: 'Sugar, hazelnuts (15%), vegetable oils, cocoa powder, milk powder, emulsifier, flavorings.',
                nutrition: { energy: '2380 kJ / 570 kcal', fat: '37g', carbs: '54g', protein: '5.0g', salt: '0.08g' },
                price: '€3,69',
                weight: '350g'
            },
            'cookie-crunchy': {
                key: 'cookieCrunchy',
                colors: ['#D84315', '#D84315'],
                image: '/products/cookie-crunchy.png',
                ingredients: 'Speculoos biscuits (57%), vegetable oils, sugar, emulsifier (soy lecithin), acid (citric acid).',
                nutrition: { energy: '2340 kJ / 560 kcal', fat: '34g', carbs: '60g', protein: '3.0g', salt: '0.50g' },
                price: '€3,99',
                weight: '380g'
            },
            'cookie-original': {
                key: 'cookieOriginal',
                colors: ['#D84315', '#D84315'],
                image: '/products/cookie-original.png',
                ingredients: 'Speculoos biscuits (57%), vegetable oils, sugar, emulsifier (soy lecithin), acid (citric acid).',
                nutrition: { energy: '2340 kJ / 560 kcal', fat: '34g', carbs: '60g', protein: '3.0g', salt: '0.50g' },
                price: '€3,99',
                weight: '380g'
            }
        };

        const data = productData[id];
        if (!data) return null;

        return {
            id,
            name: t(`products.${data.key}.name`),
            description: t(`products.${data.key}.description`),
            image: data.image,
            colors: data.colors,
            tagline: t(`products.${data.key}.tagline`),
            ingredients: data.ingredients,
            nutrition: data.nutrition,
            price: data.price,
            weight: data.weight
        };
    }, [id, t]);

    if (!product) {
        return <div>Product not found</div>;
    }

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

                {/* Back Button */}
                <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-white font-bold hover:text-brandYellow mb-8 group font-playful text-lg"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Terug naar Home
                </motion.button>

                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* Left Column - Image */}
                    <div className="w-full md:w-1/2 flex justify-center relative">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="relative"
                        >
                            {/* Glow/Splash behind jar */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/20 blur-3xl rounded-full"></div>

                            {!imageError ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full max-w-[400px] drop-shadow-2xl object-contain relative z-10"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <JarVisual colorLeft={product.colors[0]} colorRight={product.colors[1]} label={product.tagline} className="w-full max-w-md h-[500px]" />
                            )}
                        </motion.div>
                    </div>

                    {/* Right Column - Info */}
                    <div className="w-full md:w-1/2">
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-playful font-bold text-chocolate mb-2 leading-tight">
                                {product.name}
                            </h1>
                            <h2 className="text-2xl font-playful font-bold text-brandPink mb-6">
                                {product.id === 'cookie-crunchy' ? 'Dubbel Crunchy in één Potti!' : 'Dubbel Lekker in één Potti!'}
                            </h2>
                            <p className="text-lg font-body font-bold text-chocolateLight mb-8 leading-relaxed max-w-lg">
                                {product.description}
                            </p>

                            {/* Purchase Card */}
                            <div className="bg-[#880E4F] text-white p-4 rounded-3xl shadow-lg border-2 border-black mb-8 flex flex-col md:flex-row items-center justify-between gap-4 max-w-xl">
                                <div className="flex items-center gap-6 px-4 w-full justify-between md:justify-start">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold opacity-80">Inhoud:</span>
                                        <span className="text-xl font-playful font-bold">{product.weight}</span>
                                    </div>
                                    <div className="w-px h-10 bg-white/20"></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold opacity-80">Prijs:</span>
                                        <span className="text-2xl font-playful font-bold">{product.price}</span>
                                    </div>
                                    <div className="hidden md:block w-px h-10 bg-white/20 ml-auto"></div>
                                    <div className="hidden md:block text-sm font-bold opacity-80 italic">
                                        Verkrijgbaar in de supermarkt
                                    </div>
                                </div>
                            </div>

                            {/* Tabs Section */}
                            <div className="max-w-xl">
                                <div className="flex gap-2 mb-0">
                                    <button
                                        onClick={() => setActiveTab('info')}
                                        className={`px-6 py-2 rounded-t-xl font-bold border-2 border-black border-b-0 transition-all ${activeTab === 'info' ? 'bg-white text-chocolate' : 'bg-brandYellow text-chocolate hover:bg-brandYellow/80'}`}
                                    >
                                        Productinformatie
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('nutrition')}
                                        className={`px-6 py-2 rounded-t-xl font-bold border-2 border-black border-b-0 transition-all ${activeTab === 'nutrition' ? 'bg-white text-chocolate' : 'bg-brandYellow text-chocolate hover:bg-brandYellow/80'}`}
                                    >
                                        Voedingswaarden
                                    </button>
                                </div>

                                <div className="bg-white border-2 border-black rounded-b-xl rounded-tr-xl p-6 shadow-lg min-h-[200px]">
                                    <AnimatePresence mode="wait">
                                        {activeTab === 'info' ? (
                                            <motion.div
                                                key="info"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <h4 className="font-bold text-lg mb-2">Ingrediënten</h4>
                                                <p className="text-chocolateLight leading-relaxed">
                                                    {product.ingredients}
                                                </p>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="nutrition"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <div className="grid grid-cols-2 gap-y-2">
                                                    <div className="font-bold text-chocolate">Energie</div>
                                                    <div className="text-right text-chocolateLight">{product.nutrition.energy}</div>

                                                    <div className="font-bold text-chocolate">Vetten</div>
                                                    <div className="text-right text-chocolateLight">{product.nutrition.fat}</div>

                                                    <div className="font-bold text-chocolate">Koolhydraten</div>
                                                    <div className="text-right text-chocolateLight">{product.nutrition.carbs}</div>

                                                    <div className="font-bold text-chocolate">Eiwitten</div>
                                                    <div className="text-right text-chocolateLight">{product.nutrition.protein}</div>

                                                    <div className="font-bold text-chocolate">Zout</div>
                                                    <div className="text-right text-chocolateLight">{product.nutrition.salt}</div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};
