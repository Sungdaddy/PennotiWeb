import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';
import { useAuth } from '../context/AuthContext';
import { useLoyalty } from '../context/LoyaltyContext';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { cart } = useLoyalty();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight - 100;
      setIsScrolled(scrollY > threshold);

      // Calculate opacity: 0 at top, 0.95 at threshold
      const newOpacity = Math.min(scrollY / threshold, 0.95);
      setHeaderOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.products'), href: '/#products' },
    { name: 'Rewards', href: '/rewards' },
    { name: 'Redeem', href: '/redeem' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{ backgroundColor: `rgba(255, 255, 255, ${headerOpacity})` }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'backdrop-blur-md shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] border-b-2 border-black py-2'
          : 'py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-12 h-12 bg-chocolate rounded-xl border-2 border-black flex items-center justify-center text-white font-bold font-playful text-2xl group-hover:rotate-12 transition-transform ${isScrolled ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'shadow-none'}`}>
              P
            </div>
            <span className={`font-playful text-3xl font-bold ${isScrolled ? 'text-chocolate' : 'text-white'} drop-shadow-sm transition-colors`}>
              Duo Penotti
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-playful font-bold text-lg text-chocolate hover:text-brandRed transition-colors hover:-rotate-2 transform inline-block whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
            <LanguageSelector />

            <Link to="/cart" className="relative text-chocolate hover:text-brandRed transform hover:scale-110 transition-transform">
              <ShoppingBag size={28} strokeWidth={2.5} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brandPink text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2 lg:gap-4">
                <Link to={user.role === 'admin' ? '/admin' : '/rewards'} className="flex items-center gap-2 font-bold text-chocolate bg-brandYellow/20 px-3 py-2 lg:px-4 lg:py-2 rounded-full border-2 border-transparent hover:border-brandYellow transition-all whitespace-nowrap">
                  <User size={20} />
                  <span className="font-naughty hidden lg:inline">{user.points} pts</span>
                  <span className="font-naughty lg:hidden">{user.points}</span>
                </Link>
                <button onClick={handleLogout} className="text-sm font-bold text-chocolate/60 hover:text-brandRed hover:underline decoration-wavy whitespace-nowrap">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="bg-brandTeal text-chocolate px-6 py-2 rounded-full font-playful font-bold text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all whitespace-nowrap">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative text-chocolate">
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brandPink text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {cart.length}
                </span>
              )}
            </Link>
            <button
              className="text-chocolate bg-white p-2 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

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
                className="font-playful text-4xl text-vanilla font-bold hover:text-brandYellow transition-colors transform hover:rotate-2"
              >
                {link.name}
              </a>
            ))}
            {user ? (
              <button onClick={handleLogout} className="font-naughty text-3xl text-brandPink font-bold transform -rotate-2">Logout</button>
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