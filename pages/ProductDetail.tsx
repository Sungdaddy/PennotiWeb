import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Info, Utensils } from 'lucide-react';
import { JarVisual } from '../components/JarVisual';
import { Product } from '../types';
import { useTranslation } from 'react-i18next';

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Scroll to top when component mounts or product changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Build products object using translations
    const product = useMemo((): Product | null => {
        if (!id) return null;

        const productData: Record<string, {
            key: string;
            colors: [string, string];
            image: string;
            ingredients: string;
            nutrition: { energy: string; fat: string; carbs: string; protein: string; salt: string };
            recipes: Array<{ id: string; title: string; image: string; prepTime: string }>;
        }> = {
            'duo-hazelnut-vanilla': {
                key: 'duoHazelnutVanilla',
                colors: ['#3E2723', '#FFF8E1'],
                image: '/products/duo-vanilla.png',
                ingredients: 'Sugar, vegetable oils (rapeseed, palm), hazelnuts (7%), low fat cocoa powder (4%), whole milk powder (2%), skimmed milk powder, calcium carbonate, emulsifier (lecithins), natural vanilla flavor.',
                nutrition: {
                    energy: '2350 kJ / 563 kcal',
                    fat: '35g',
                    carbs: '59g',
                    protein: '2.4g',
                    salt: '0.11g'
                },
                recipes: [
                    {
                        id: 'r_duo_1',
                        title: 'Duo Swirl Brownies',
                        image: 'https://picsum.photos/600/400?random=20',
                        prepTime: '40'
                    },
                    {
                        id: 'r_duo_2',
                        title: 'Hazelnut Vanilla Crepes',
                        image: 'https://picsum.photos/600/400?random=21',
                        prepTime: '20'
                    }
                ]
            },
            'duo-hazelnut-caramel': {
                key: 'duoHazelnutCaramel',
                colors: ['#5D4037', '#D84315'],
                image: '/products/duo-caramel.png',
                ingredients: 'Sugar, vegetable oils, hazelnuts (7%), caramel powder, cocoa powder, milk powder, emulsifier, flavorings.',
                nutrition: {
                    energy: '2360 kJ / 565 kcal',
                    fat: '36g',
                    carbs: '58g',
                    protein: '2.5g',
                    salt: '0.15g'
                },
                recipes: [
                    {
                        id: 'r_caramel_1',
                        title: 'Caramel Hazelnut Tart',
                        image: 'https://picsum.photos/600/400?random=22',
                        prepTime: '55'
                    },
                    {
                        id: 'r_caramel_2',
                        title: 'Duo Caramel Popcorn',
                        image: 'https://picsum.photos/600/400?random=23',
                        prepTime: '10'
                    }
                ]
            },
            'uno-white': {
                key: 'unoWhite',
                colors: ['#FFF8E1', '#FFF8E1'],
                image: '/products/uno-white.png',
                ingredients: 'Sugar, vegetable oils (sunflower, rapeseed), skimmed milk powder, roasted almonds, cocoa butter, emulsifier.',
                nutrition: {
                    energy: '2400 kJ / 575 kcal',
                    fat: '38g',
                    carbs: '55g',
                    protein: '4.0g',
                    salt: '0.10g'
                },
                recipes: [
                    {
                        id: 'r_white_1',
                        title: 'White Chocolate Raspberry Toast',
                        image: 'https://picsum.photos/600/400?random=24',
                        prepTime: '5'
                    },
                    {
                        id: 'r_white_2',
                        title: 'Almond White Blondies',
                        image: 'https://picsum.photos/600/400?random=25',
                        prepTime: '35'
                    }
                ]
            },
            'uno-praline': {
                key: 'unoPraline',
                colors: ['#8D6E63', '#8D6E63'],
                image: '/products/uno-praline.png',
                ingredients: 'Sugar, hazelnuts (15%), vegetable oils, cocoa powder, milk powder, emulsifier, flavorings.',
                nutrition: {
                    energy: '2380 kJ / 570 kcal',
                    fat: '37g',
                    carbs: '54g',
                    protein: '5.0g',
                    salt: '0.08g'
                },
                recipes: [
                    {
                        id: 'r_praline_1',
                        title: 'Praline Stuffed Cookies',
                        image: 'https://picsum.photos/600/400?random=26',
                        prepTime: '25'
                    },
                    {
                        id: 'r_praline_2',
                        title: 'Hazelnut Praline Latte',
                        image: 'https://picsum.photos/600/400?random=27',
                        prepTime: '5'
                    }
                ]
            },
            'cookie-crunchy': {
                key: 'cookieCrunchy',
                colors: ['#D84315', '#D84315'],
                image: '/products/cookie-crunchy.png',
                ingredients: 'Speculoos biscuits (57%), vegetable oils, sugar, emulsifier (soy lecithin), acid (citric acid).',
                nutrition: {
                    energy: '2340 kJ / 560 kcal',
                    fat: '34g',
                    carbs: '60g',
                    protein: '3.0g',
                    salt: '0.50g'
                },
                recipes: [
                    {
                        id: 'r_crunchy_1',
                        title: 'Crunchy Speculoos Parfait',
                        image: 'https://picsum.photos/600/400?random=28',
                        prepTime: '15'
                    },
                    {
                        id: 'r_crunchy_2',
                        title: 'Speculoos Truffles',
                        image: 'https://picsum.photos/600/400?random=29',
                        prepTime: '30'
                    }
                ]
            },
            'cookie-original': {
                key: 'cookieOriginal',
                colors: ['#D84315', '#D84315'],
                image: '/products/cookie-original.png',
                ingredients: 'Speculoos biscuits (57%), vegetable oils, sugar, emulsifier (soy lecithin), acid (citric acid).',
                nutrition: {
                    energy: '2340 kJ / 560 kcal',
                    fat: '34g',
                    carbs: '60g',
                    protein: '3.0g',
                    salt: '0.50g'
                },
                recipes: [
                    {
                        id: 'r1',
                        title: 'Speculoos Cheesecake',
                        image: 'https://picsum.photos/600/400?random=10',
                        prepTime: '45'
                    },
                    {
                        id: 'r2',
                        title: 'Cookie Penotti Milkshake',
                        image: 'https://picsum.photos/600/400?random=11',
                        prepTime: '5'
                    }
                ]
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
            recipes: data.recipes
        };
    }, [id, t]);

    if (!product) {
        return (
            <div className="min-h-screen bg-vanillaCream flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-playful font-bold text-chocolate mb-4">{t('productDetail.notFound')}</h2>
                    <div className="font-naughty text-2xl text-brandRed mb-6">{t('productDetail.notFoundMsg')}</div>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-brandTeal text-white px-6 py-3 rounded-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
                    >
                        {t('productDetail.backToHome')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-vanillaCream text-chocolate selection:bg-brandPink selection:text-white overflow-x-hidden">
            <div className="container mx-auto px-6 pt-24 pb-12">
                <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-chocolate font-bold hover:text-brandRed mb-8 group font-playful text-lg"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    {t('productDetail.back')}
                </motion.button>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Product Image - Floating & Playful */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="relative flex justify-center"
                    >
                        <div className="absolute inset-0 bg-white rounded-full blur-3xl opacity-50 scale-90" />

                        {/* Sticker Badge */}
                        <motion.div
                            initial={{ scale: 0, rotate: 20 }}
                            animate={{ scale: 1, rotate: 12 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="absolute -top-4 right-10 bg-brandYellow text-chocolate px-6 py-3 rounded-full font-naughty text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 border-2 border-black"
                        >
                            {product.tagline}
                        </motion.div>

                        {product.image.startsWith('/') ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-md drop-shadow-2xl object-contain z-10 hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <JarVisual colorLeft={product.colors[0]} colorRight={product.colors[1]} label={product.tagline} className="w-full max-w-md h-[500px]" />
                        )}
                    </motion.div>

                    {/* Product Info - Card Style */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 md:p-12 rounded-[3rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative"
                    >
                        <h1 className="text-4xl md:text-5xl font-playful font-bold mb-4 text-chocolate leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-xl font-body font-bold text-chocolateLight mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="space-y-8">
                            {/* Ingredients */}
                            <div className="bg-vanillaCream p-6 rounded-2xl border-2 border-chocolate/10">
                                <h3 className="flex items-center gap-2 text-2xl font-playful font-bold text-chocolate mb-3">
                                    <Leaf size={24} className="text-brandTeal" /> {t('productDetail.ingredients')}
                                </h3>
                                <p className="text-chocolate/80 font-body leading-relaxed">
                                    {product.ingredients}
                                </p>
                            </div>

                            {/* Nutrition */}
                            <div>
                                <h3 className="flex items-center gap-2 text-2xl font-playful font-bold text-chocolate mb-4">
                                    <Info size={24} className="text-brandRed" /> {t('productDetail.nutrition')} <span className="text-sm font-body opacity-60">{t('productDetail.per100g')}</span>
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {Object.entries(product.nutrition).map(([key, value], idx) => (
                                        <motion.div
                                            key={key}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + (idx * 0.1) }}
                                            className="bg-white border-2 border-black p-3 rounded-xl text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
                                        >
                                            <div className="text-xs text-chocolateLight uppercase font-bold mb-1 tracking-wider">
                                                {key === 'energy' ? t('productDetail.energy') :
                                                    key === 'fat' ? t('productDetail.fat') :
                                                        key === 'carbs' ? t('productDetail.carbs') :
                                                            key === 'protein' ? t('productDetail.protein') :
                                                                key === 'salt' ? t('productDetail.salt') : key}
                                            </div>
                                            <div className="text-chocolate font-playful font-bold text-lg">{value}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Recipes */}
                            {product.recipes && (
                                <div>
                                    <h3 className="flex items-center gap-2 text-2xl font-playful font-bold text-chocolate mb-4">
                                        <Utensils size={24} className="text-brandPink" /> {t('productDetail.recipes')}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {product.recipes.map((recipe) => (
                                            <div key={recipe.id} className="group bg-white rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer">
                                                <div className="h-40 overflow-hidden relative">
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                                                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div className="p-4">
                                                    <h4 className="font-playful font-bold text-lg text-chocolate mb-1 group-hover:text-brandRed transition-colors">{recipe.title}</h4>
                                                    <div className="text-xs font-bold text-chocolateLight flex items-center gap-1 bg-vanillaCream inline-block px-2 py-1 rounded-full">
                                                        <Utensils size={12} /> {recipe.prepTime} {t('productDetail.prepTime')}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
