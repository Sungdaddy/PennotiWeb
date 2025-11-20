import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Leaf, Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SwirlBackground } from '../components/SwirlBackground';
import { JarVisual } from '../components/JarVisual';
import { Product, Recipe, TimelineEvent } from '../types';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const { t } = useTranslation();

    const products: Product[] = [
        {
            id: 'duo-hazelnut-vanilla',
            name: t('products.duoHazelnutVanilla.name'),
            description: t('products.duoHazelnutVanilla.description'),
            image: '/products/duo-vanilla.png',
            colors: ['#3E2723', '#FFF8E1'],
            tagline: t('products.duoHazelnutVanilla.tagline'),
            ingredients: 'Sugar, vegetable oils, hazelnuts, cocoa, milk, vanilla.',
            nutrition: { energy: '563 kcal', fat: '35g', carbs: '59g', protein: '2.4g', salt: '0.11g' }
        },
        {
            id: 'duo-hazelnut-caramel',
            name: t('products.duoHazelnutCaramel.name'),
            description: t('products.duoHazelnutCaramel.description'),
            image: '/products/duo-caramel.png',
            colors: ['#5D4037', '#D84315'],
            tagline: t('products.duoHazelnutCaramel.tagline'),
            ingredients: 'Sugar, vegetable oils, hazelnuts, caramel, cocoa, milk.',
            nutrition: { energy: '565 kcal', fat: '36g', carbs: '58g', protein: '2.5g', salt: '0.15g' }
        },
        {
            id: 'uno-white',
            name: t('products.unoWhite.name'),
            description: t('products.unoWhite.description'),
            image: '/products/uno-white.png',
            colors: ['#FFF8E1', '#FFF8E1'],
            tagline: t('products.unoWhite.tagline'),
            ingredients: 'Sugar, oils, milk, almonds, cocoa butter.',
            nutrition: { energy: '575 kcal', fat: '38g', carbs: '55g', protein: '4.0g', salt: '0.10g' }
        },
        {
            id: 'uno-praline',
            name: t('products.unoPraline.name'),
            description: t('products.unoPraline.description'),
            image: '/products/uno-praline.png',
            colors: ['#8D6E63', '#8D6E63'],
            tagline: t('products.unoPraline.tagline'),
            ingredients: 'Sugar, hazelnuts, oils, cocoa, milk.',
            nutrition: { energy: '570 kcal', fat: '37g', carbs: '54g', protein: '5.0g', salt: '0.08g' }
        },
        {
            id: 'cookie-crunchy',
            name: t('products.cookieCrunchy.name'),
            description: t('products.cookieCrunchy.description'),
            image: '/products/cookie-crunchy.png',
            colors: ['#D84315', '#D84315'],
            tagline: t('products.cookieCrunchy.tagline'),
            ingredients: 'Speculoos biscuits, oils, sugar.',
            nutrition: { energy: '560 kcal', fat: '34g', carbs: '60g', protein: '3.0g', salt: '0.50g' }
        },
        {
            id: 'cookie-original',
            name: t('products.cookieOriginal.name'),
            description: t('products.cookieOriginal.description'),
            image: '/products/cookie-original.png',
            colors: ['#D84315', '#D84315'],
            tagline: t('products.cookieOriginal.tagline'),
            ingredients: 'Speculoos biscuits, oils, sugar.',
            nutrition: { energy: '560 kcal', fat: '34g', carbs: '60g', protein: '3.0g', salt: '0.50g' }
        }
    ];

    const recipes: Recipe[] = [
        {
            id: 'r1',
            title: t('recipes.r1'),
            image: 'https://picsum.photos/600/400?random=1',
            prepTime: '15 min'
        },
        {
            id: 'r2',
            title: t('recipes.r2'),
            image: 'https://picsum.photos/600/400?random=2',
            prepTime: '25 min'
        },
        {
            id: 'r3',
            title: t('recipes.r3'),
            image: 'https://picsum.photos/600/400?random=3',
            prepTime: '5 min'
        },
    ];

    const history: TimelineEvent[] = [
        { year: '1970', title: t('history.events.e1970.title'), description: t('history.events.e1970.description') },
        { year: '1979', title: t('history.events.e1979.title'), description: t('history.events.e1979.description') },
        { year: '1990', title: t('history.events.e1990.title'), description: t('history.events.e1990.description') },
        { year: '2000', title: t('history.events.e2000.title'), description: t('history.events.e2000.description') },
        { year: '2011', title: t('history.events.e2011.title'), description: t('history.events.e2011.description') },
        { year: '2015', title: t('history.events.e2015.title'), description: t('history.events.e2015.description') },
        { year: '2019', title: t('history.events.e2019.title'), description: t('history.events.e2019.description') },
        { year: '2022', title: t('history.events.e2022.title'), description: t('history.events.e2022.description') },
        { year: '2023', title: t('history.events.e2023.title'), description: t('history.events.e2023.description') },
    ];

    return (
        <div className="min-h-screen bg-vanilla text-chocolate selection:bg-brandRed selection:text-white overflow-hidden relative">
            <SwirlBackground />

            {/* HERO SECTION - SPLIT SCREEN */}
            <header className="relative h-screen min-h-[600px] flex flex-col md:flex-row overflow-hidden">
                {/* Left Side - Chocolate */}
                <div className="w-full md:w-1/2 bg-chocolate flex items-center justify-center md:justify-end p-8 md:pr-2 relative z-10 h-1/2 md:h-full">
                    <div className="text-right md:text-right text-white max-w-md mt-12 md:mt-24">
                        <motion.h1
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "backOut" }}
                            className="text-6xl md:text-8xl font-playful font-bold leading-none mb-2"
                        >
                            Duo
                        </motion.h1>
                        <motion.p
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-2xl md:text-3xl font-naughty text-brandPink transform -rotate-2"
                        >
                            Dubbel Lekker!
                        </motion.p>
                    </div>
                </div>

                {/* Right Side - Vanilla */}
                <div className="w-full md:w-1/2 bg-vanilla flex items-center justify-center md:justify-start p-8 md:pl-2 relative z-10 h-1/2 md:h-full">
                    <div className="text-left md:text-left text-chocolate max-w-md mt-12 md:mt-24">
                        <motion.h1
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "backOut" }}
                            className="text-6xl md:text-8xl font-playful font-bold leading-none mb-2"
                        >
                            Penotti
                        </motion.h1>
                        <motion.p
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-xl md:text-2xl font-body font-bold text-chocolateLight"
                        >
                            {t('hero.subtitle')}
                        </motion.p>
                    </div>
                </div>

                {/* Center Jar - Above Text */}
                <div className="absolute top-24 md:top-24 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
                    <motion.div
                        animate={{
                            rotate: isSpinning ? 360 : 0,
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            rotate: { repeat: Infinity, duration: 1, ease: "linear" },
                            scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                        }}
                        className="cursor-pointer pointer-events-auto"
                        onClick={() => setIsSpinning(!isSpinning)}
                    >
                        {!imageError ? (
                            <img
                                src="/duo-penotti-jar.png"
                                alt="Duo Penotti Original Jar"
                                className="w-48 md:w-[340px] h-auto drop-shadow-2xl object-contain transform hover:scale-110 transition-transform duration-300"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <JarVisual colorLeft="#2D1B15" colorRight="#FFFFFF" label="Original" className="w-56 h-72 md:w-80 md:h-[400px]" />
                        )}
                    </motion.div>
                </div>

                {/* CTA Button - Floating */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30"
                >
                    <button className="bg-brandTeal text-chocolate font-playful font-bold text-xl px-8 py-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all border-2 border-black flex items-center gap-2">
                        {t('hero.cta')} <ArrowRight size={24} />
                    </button>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 text-brandYellow animate-wiggle z-20">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor"><path d="M25 0L31 19L50 25L31 31L25 50L19 31L0 25L19 19L25 0Z" /></svg>
                </div>
                <div className="absolute bottom-20 right-10 text-brandPink animate-bounce z-20">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor"><circle cx="20" cy="20" r="20" /></svg>
                </div>
            </header>

            {/* ABOUT / THE SWIRL SECTION */}
            <section id="about" className="relative py-24 z-10">
                {/* Wave Divider Top */}
                <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFFFFF" fillOpacity="0.5"></path>
                    </svg>
                </div>

                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-lg rounded-3xl p-12 shadow-xl text-center border border-white/50">
                        <h2 className="text-4xl md:text-5xl font-playful font-bold mb-6 text-chocolate">{t('about.title')}</h2>
                        <p className="text-lg md:text-xl font-body leading-relaxed text-chocolateLight mb-8">
                            {t('about.description')}
                        </p>
                        <div className="flex justify-center gap-8">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-chocolate mb-4 flex items-center justify-center text-white text-2xl shadow-lg">🌰</div>
                                <span className="font-bold font-playful">{t('about.hazelnuts')}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-vanilla border-2 border-chocolate mb-4 flex items-center justify-center text-2xl shadow-lg">🥛</div>
                                <span className="font-bold font-playful">{t('about.vanilla')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCTS SECTION - PLAYFUL GRID */}
            <section id="products" className="py-24 bg-vanillaCream relative z-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 relative">
                        <h2 className="text-6xl font-playful font-bold mb-4 text-chocolate relative z-10 inline-block transform -rotate-2">
                            {t('products.title')}
                            <span className="absolute -top-6 -right-8 text-brandPink animate-pulse">✨</span>
                        </h2>
                        <p className="text-2xl font-naughty text-brandRed transform rotate-1">{t('products.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -15, rotate: index % 2 === 0 ? 2 : -2 }}
                                className={`
                                relative bg-white rounded-3xl p-8 flex flex-col items-center 
                                border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                                hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer
                                ${index % 2 === 0 ? 'md:translate-y-8' : ''}
                            `}
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                {/* Sticker Tag */}
                                <div className={`
                                absolute -top-4 -right-4 px-4 py-2 rounded-full font-bold font-naughty text-white transform rotate-12 shadow-md
                                ${index % 3 === 0 ? 'bg-brandPink' : index % 3 === 1 ? 'bg-brandTeal' : 'bg-brandYellow text-chocolate'}
                            `}>
                                    {product.tagline}
                                </div>

                                <motion.div
                                    className="mb-6 w-full flex justify-center"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-48 h-auto drop-shadow-xl object-contain"
                                    />
                                </motion.div>

                                <h3 className="text-2xl font-playful font-bold mb-2 text-center text-chocolate">{product.name}</h3>
                                <p className="text-center font-body font-bold text-chocolateLight mb-4">{product.description}</p>

                                <button className="mt-auto text-brandRed font-naughty text-lg hover:underline decoration-wavy flex items-center gap-2">
                                    {t('products.cta')} <ArrowRight size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HISTORY SECTION */}
            <section id="history" className="py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-playful font-bold text-center mb-16 text-chocolate bg-white/50 backdrop-blur-sm inline-block px-8 py-2 rounded-full mx-auto">{t('history.title')}</h2>
                    <div className="relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-chocolate/20 hidden md:block"></div>

                        <div className="space-y-12">
                            {history.map((event, index) => (
                                <motion.div
                                    key={event.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="flex-1 w-full"></div>
                                    <div className="w-12 h-12 bg-brandRed rounded-full flex items-center justify-center text-white font-bold z-10 border-4 border-vanilla shadow-md my-4 md:my-0">
                                        {index + 1}
                                    </div>
                                    <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:pr-12 text-center md:text-right' : 'md:pl-12 text-center md:text-left'}`}>
                                        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-chocolate/5 hover:bg-white transition-colors">
                                            <span className="text-brandRed font-bold font-playful text-xl">{event.year}</span>
                                            <h3 className="text-2xl font-bold text-chocolate mb-2">{event.title}</h3>
                                            <p className="text-chocolateLight font-body">{event.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SUSTAINABILITY - Green tint with transparency */}
            <section className="py-24 bg-[#F1F8E9]/90 backdrop-blur-sm relative z-10">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl"></div>
                            <Leaf size={200} className="text-green-600 mx-auto relative z-10 drop-shadow-xl" />
                        </motion.div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full font-bold text-sm mb-4 shadow-sm">{t('sustainability.tag')}</span>
                        <h2 className="text-4xl font-playful font-bold text-green-900 mb-6">{t('sustainability.title')}</h2>
                        <p className="text-lg text-green-800/80 font-body mb-8 leading-relaxed">
                            {t('sustainability.description')}
                        </p>
                        <button className="border-2 border-green-600 text-green-700 px-8 py-3 rounded-full font-playful font-bold hover:bg-green-600 hover:text-white transition-all shadow-md">
                            {t('sustainability.cta')}
                        </button>
                    </div>
                </div>
            </section>

            {/* RECIPES */}
            <section id="recipes" className="py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-playful font-bold text-chocolate mb-4 bg-white/50 backdrop-blur-sm inline-block px-6 py-2 rounded-full">{t('recipes.title')}</h2>
                        <p className="text-chocolateLight font-body mt-2">{t('recipes.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {recipes.map((recipe) => (
                            <motion.div
                                key={recipe.id}
                                whileHover={{ y: -10 }}
                                className="bg-white/90 backdrop-blur rounded-3xl overflow-hidden shadow-lg group cursor-pointer border border-white/20"
                            >
                                <div className="h-48 overflow-hidden relative bg-gray-200">
                                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-chocolate flex items-center gap-1 shadow-sm">
                                        <Utensils size={12} /> {recipe.prepTime}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold font-playful text-chocolate mb-2">{recipe.title}</h3>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-brandRed font-bold text-sm group-hover:underline">{t('recipes.view')}</span>
                                        <Heart size={20} className="text-gray-300 group-hover:text-brandRed transition-colors" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
