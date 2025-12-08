import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLoyalty } from '../context/LoyaltyContext';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { cart } = useLoyalty();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Over Ons', href: '/#about' },
    { name: 'Producten', href: '/#products' },
    { name: 'Rewards', href: '/rewards' },
    { name: 'Stem', href: '/vote' },
    { name: 'Recepten', href: '/recepten' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'nl' ? 'en' : 'nl';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6`}>
        <div className="container mx-auto px-6 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            <div className="flex flex-col leading-none">
              <span className="font-playful font-bold text-white text-3xl drop-shadow-md">Duo</span>
              <span className="font-playful font-bold text-white text-3xl drop-shadow-md -mt-2">Penotti</span>
              <div className="absolute -top-2 -right-4 text-brandYellow text-2xl animate-spin-slow">★</div>
            </div>
          </Link>

          {/* Center Pill - Desktop */}
          <div className="hidden md:flex items-center bg-white rounded-full px-2 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body font-bold text-chocolate px-5 py-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 font-bold text-chocolate px-4 py-2 ml-2 border-l-2 border-gray-200 hover:text-brandRed"
            >
              <img
                src={i18n.language === 'nl'
                  ? "https://flagcdn.com/w40/nl.png"
                  : "https://flagcdn.com/w40/gb.png"}
                alt="Language"
                className="w-6 h-4 object-cover rounded-sm shadow-sm"
              />
              {i18n.language.toUpperCase()}
            </button>
          </div>

          {/* Right Side - Cart & User */}
          <div className="hidden md:flex items-center gap-4">

            {/* Cart */}
            <Link
              to="/cart"
              className="bg-white w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-chocolate hover:scale-110 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative"
            >
              <ShoppingBag size={20} strokeWidth={2.5} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brandRed text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-black">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* User Pill */}
            {user ? (
              <div className="flex items-center bg-white rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] pl-1 pr-4 py-1 gap-3">
                <div className="w-8 h-8 bg-chocolate rounded-full flex items-center justify-center text-brandYellow">
                  <User size={16} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-xs text-chocolate">{user.points} PTS</span>
                  <button onClick={handleLogout} className="text-[10px] font-bold text-gray-500 hover:text-brandRed text-left">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-brandYellow text-chocolate px-6 py-2 rounded-full font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
                Login
              </Link>
            )}

          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4 z-50">
            <Link to="/cart" className="relative text-white drop-shadow-md">
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brandRed text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {cart.length}
                </span>
              )}
            </Link>
            <button
              className="text-chocolate bg-white p-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-chocolate flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="font-playful text-4xl text-vanilla font-bold hover:text-brandYellow transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 font-bold text-vanilla text-2xl border-2 border-vanilla px-6 py-2 rounded-full"
            >
              <img
                src={i18n.language === 'nl'
                  ? "https://flagcdn.com/w40/nl.png"
                  : "https://flagcdn.com/w40/gb.png"}
                alt="Language"
                className="w-8 h-6 object-cover rounded-sm"
              />
              {i18n.language.toUpperCase()}
            </button>
            {user ? (
              <button onClick={handleLogout} className="font-naughty text-3xl text-brandPink font-bold">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setIsMobileOpen(false)} className="bg-brandTeal text-chocolate px-8 py-3 rounded-full font-playful font-bold text-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};