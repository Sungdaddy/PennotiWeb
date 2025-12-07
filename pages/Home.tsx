import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { JarVisual } from '../components/JarVisual';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);
    const { t } = useTranslation();

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
                    />
                    {/* Middle Swirl Accent */}
                    <path
                        d="M720 0 C 900 200, 500 400, 720 900"
                        stroke="#D7CCC8"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.2"
                    />
                </svg>
            </div>

            {/* HERO SECTION */}
            <header id="about" className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden z-10">
                {/* Content Container */}
                <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row h-screen items-center">
                    {/* Left Side - Text */}
                    <div className="w-full md:w-1/2 text-white pt-32 md:pt-0 md:pr-12">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl md:text-8xl font-playful font-bold leading-tight mb-2">
                                Duo Penotti
                            </h1>
                            <h2 className="text-5xl md:text-7xl font-playful font-bold text-brandPink leading-tight mb-6 drop-shadow-md">
                                Dubbel Lekker <br /> in één Potti!
                            </h2>
                            <p className="text-lg md:text-xl font-body text-gray-200 mb-8 max-w-md leading-relaxed">
                                Geniet van de perfecte combinatie van rijk en romig. Een feest voor jong en oud!
                            </p>

                            <button className="bg-brandTeal text-chocolate font-playful font-bold text-xl px-8 py-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all border-2 border-black flex items-center gap-2">
                                Proef de Swirl <ArrowRight size={24} />
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Side - Jar */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-start relative mt-12 md:mt-0">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Splash Effect behind jar (CSS/SVG representation) */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/30 blur-3xl rounded-full"></div>

                            {!imageError ? (
                                <img
                                    src="/duo-penotti-jar.png"
                                    alt="Duo Penotti Original Jar"
                                    className="w-64 md:w-[600px] h-auto drop-shadow-2xl object-contain relative z-10 transform hover:scale-105 transition-transform duration-500"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <JarVisual colorLeft="#2D1B15" colorRight="#FFFFFF" label="Original" className="w-64 md:w-[500px] h-auto" />
                            )}
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* BOTTOM SECTION - TWO CARDS */}
            <section id="features" className="relative z-20 -mt-12 md:-mt-24 pb-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">

                        {/* Left Card - Kids */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 bg-white rounded-[40px] border-4 border-brandYellow shadow-[8px_8px_0px_0px_rgba(45,27,21,1)] overflow-hidden relative"
                        >
                            {/* Wavy Top Decoration */}
                            <div className="absolute top-0 left-0 right-0 h-20 bg-brandYellow/20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 15%, 0 100%)' }}></div>

                            <div className="p-8 md:p-12 relative z-10">
                                <div className="flex flex-col md:flex-row items-center justify-between mb-8 mt-4">
                                    <h3 className="text-5xl font-naughty font-bold text-chocolate leading-tight transform -rotate-2">
                                        Plezier voor <br /> de Kids
                                    </h3>
                                    {/* Cookie Illustration */}
                                    <div className="text-6xl animate-bounce drop-shadow-md">🍪</div>
                                </div>

                                <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar justify-center md:justify-start relative z-20">
                                    {/* Product Mini Card 1 */}
                                    <div
                                        className="min-w-[220px] bg-vanillaCream rounded-3xl p-6 border-4 border-chocolate shadow-[4px_4px_0px_0px_rgba(45,27,21,0.2)] flex flex-col items-center cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(45,27,21,0.2)] transition-all"
                                        onClick={() => navigate('/product/cookie-crunchy')}
                                    >
                                        <h4 className="font-naughty font-bold text-chocolate text-lg mb-2 text-center">Cookie Penotti Crunchy</h4>
                                        <img src="/products/cookie-crunchy.png" alt="Cookie" className="h-32 object-contain mb-4" />
                                        <button className="bg-brandRed text-white text-lg font-naughty font-bold px-6 py-2 rounded-full border-2 border-chocolate hover:bg-brandRed/80 shadow-[2px_2px_0px_0px_rgba(45,27,21,1)]">
                                            Bekijk het!
                                        </button>
                                    </div>
                                    {/* Product Mini Card 2 */}
                                    <div
                                        className="min-w-[220px] bg-vanillaCream rounded-3xl p-6 border-4 border-chocolate shadow-[4px_4px_0px_0px_rgba(45,27,21,0.2)] flex flex-col items-center cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(45,27,21,0.2)] transition-all"
                                        onClick={() => navigate('/product/uno-praline')}
                                    >
                                        <h4 className="font-naughty font-bold text-chocolate text-lg mb-2 text-center">Uno Penotti Praliné</h4>
                                        <img src="/products/uno-praline.png" alt="Praline" className="h-32 object-contain mb-4" />
                                        <button className="bg-brandRed text-white text-lg font-naughty font-bold px-6 py-2 rounded-full border-2 border-chocolate hover:bg-brandRed/80 shadow-[2px_2px_0px_0px_rgba(45,27,21,1)]">
                                            Bekijk het!
                                        </button>
                                    </div>
                                </div>

                                {/* Toast Illustration */}
                                <div className="absolute bottom-4 right-4 text-6xl opacity-20 transform rotate-12">🍞</div>
                            </div>
                        </motion.div>

                        {/* Right Card - Luxury */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex-1 bg-chocolate rounded-[40px] border-4 border-brandYellow shadow-[8px_8px_0px_0px_rgba(45,27,21,1)] overflow-hidden relative text-white"
                        >
                            <div className="p-8 md:p-12 relative z-10">
                                <h3 className="text-5xl font-naughty font-bold text-brandYellow mb-4 leading-tight">
                                    Een Luxe <br /> Verwenmoment
                                </h3>
                                <button className="bg-brandYellow text-chocolate font-naughty font-bold text-xl px-8 py-3 rounded-full mb-10 hover:bg-white transition-colors shadow-lg border-2 border-chocolate">
                                    Ontdek Meer
                                </button>

                                <div className="grid grid-cols-3 gap-4">
                                    {/* Luxury Product 1 */}
                                    <div
                                        className="bg-chocolateLight rounded-2xl p-4 border border-brandYellow/20 flex flex-col items-center text-center cursor-pointer hover:bg-chocolateLight/80 transition-colors shadow-inner"
                                        onClick={() => navigate('/product/uno-white')}
                                    >
                                        <img src="/products/uno-white.png" alt="Uno Wit" className="h-24 object-contain mb-3" />
                                        <span className="text-xs font-bold text-brandYellow mb-2">Uno Penotti Wit</span>
                                        <button className="text-[10px] bg-brandYellow text-chocolate font-bold px-3 py-1 rounded-full">Ontdek Meer</button>
                                    </div>
                                    {/* Luxury Product 2 */}
                                    <div
                                        className="bg-chocolateLight rounded-2xl p-4 border border-brandYellow/20 flex flex-col items-center text-center cursor-pointer hover:bg-chocolateLight/80 transition-colors shadow-inner"
                                        onClick={() => navigate('/product/duo-hazelnut-vanilla')}
                                    >
                                        <img src="/products/duo-vanilla.png" alt="Duo" className="h-24 object-contain mb-3" />
                                        <span className="text-xs font-bold text-brandYellow mb-2">Duo Penotti Hazelnoot</span>
                                        <button className="text-[10px] bg-brandYellow text-chocolate font-bold px-3 py-1 rounded-full">Ontdek Meer</button>
                                    </div>
                                    {/* Luxury Product 3 */}
                                    <div
                                        className="bg-chocolateLight rounded-2xl p-4 border border-brandYellow/20 flex flex-col items-center text-center cursor-pointer hover:bg-chocolateLight/80 transition-colors shadow-inner"
                                        onClick={() => navigate('/product/duo-hazelnut-caramel')}
                                    >
                                        <img src="/products/duo-caramel.png" alt="Caramel" className="h-24 object-contain mb-3" />
                                        <span className="text-xs font-bold text-brandYellow mb-2">Duo Penotti Caramel</span>
                                        <button className="text-[10px] bg-brandYellow text-chocolate font-bold px-3 py-1 rounded-full">Ontdek Meer</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ALL PRODUCTS SECTION */}
            <section id="products" className="py-24 relative z-20">

                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-naughty text-brandRed mb-4 transform -rotate-2">
                            WELKE SWIRL IS JOUW FAVORIET?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {[
                            {
                                id: 'duo-hazelnut-vanilla',
                                name: 'Duo Penotti Hazelnoot & Vanille',
                                image: '/products/duo-vanilla.png',
                                desc: 'De originele tweekleuren hazelnoot- en vanillepasta.',
                                sticker: 'Originale',
                                stickerColor: 'bg-brandPink',
                                stickerRotate: '-rotate-12'
                            },
                            {
                                id: 'duo-hazelnut-caramel',
                                name: 'Duo Penotti Hazelnoot & Karamel',
                                image: '/products/duo-caramel.png',
                                desc: 'Hazelnootpasta gecombineerd met rijke karamel.',
                                sticker: 'Karamel',
                                stickerColor: 'bg-brandTeal',
                                stickerRotate: 'rotate-12'
                            },
                            {
                                id: 'uno-white',
                                name: 'Uno Penotti Wit',
                                image: '/products/uno-white.png',
                                desc: 'Romige witte chocoladepasta met amandelen. Zonder palmolie!',
                                sticker: 'Zonder Palmolie',
                                stickerColor: 'bg-brandYellow',
                                stickerRotate: 'rotate-6'
                            },
                            {
                                id: 'uno-praline',
                                name: 'Uno Penotti Praliné',
                                image: '/products/uno-praline.png',
                                desc: 'Rijke hazelnoot praliné pasta. Zonder palmolie!',
                                sticker: 'Zonder Palmolie',
                                stickerColor: 'bg-brandPink',
                                stickerRotate: '-rotate-6'
                            },
                            {
                                id: 'cookie-crunchy',
                                name: 'Cookie Penotti Crunchy',
                                image: '/products/cookie-crunchy.png',
                                desc: 'Knapperige koekjespasta met echte Belgische speculoos.',
                                sticker: 'Knapperig',
                                stickerColor: 'bg-brandTeal',
                                stickerRotate: 'rotate-12'
                            },
                            {
                                id: 'cookie-original',
                                name: 'Cookie Penotti Original',
                                image: '/products/cookie-original.png',
                                desc: 'Gladde koekjespasta met echte Belgische speculoos.',
                                sticker: 'Origineel',
                                stickerColor: 'bg-brandYellow',
                                stickerRotate: '-rotate-12'
                            },
                        ].map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[40px] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col items-center relative group hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                {/* Sticker */}
                                <div className={`absolute -top-6 -right-6 ${product.stickerColor} text-white font-naughty text-sm md:text-base px-4 py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform ${product.stickerRotate} z-10`}>
                                    {product.sticker}
                                </div>

                                <div className="h-56 w-full flex items-center justify-center mb-6">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                <h3 className="text-xl md:text-2xl font-playful font-bold text-chocolate text-center mb-3 leading-tight">
                                    {product.name}
                                </h3>

                                <p className="text-center font-body text-chocolate/80 mb-6 text-sm md:text-base font-bold">
                                    {product.desc}
                                </p>

                                <button className="mt-auto font-naughty text-brandRed text-xl hover:scale-110 transition-transform flex items-center gap-2">
                                    BEKIJK HET! <ArrowRight size={20} strokeWidth={3} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#2D1B15] text-[#FFF8E1] py-8 border-t-4 border-brandYellow">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-6 text-sm font-bold">
                        <a href="#" className="hover:text-brandYellow">Contact</a>
                        <a href="#" className="hover:text-brandYellow">Veelgestelde Vragen</a>
                        <a href="#" className="hover:text-brandYellow">Privacybeleid</a>
                    </div>
                    <div className="flex gap-4">
                        {/* Social Icons Placeholder */}
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-chocolate font-bold">f</div>
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-chocolate font-bold">in</div>
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-chocolate font-bold">yt</div>
                    </div>
                    <div className="text-xs opacity-50">
                        © {new Date().getFullYear()} Duo Penotti. Alle rechten voorbehouden.
                    </div>
                </div>
            </footer>

        </div>
    );
};
