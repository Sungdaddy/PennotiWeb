import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const role = email === 'admin@duopenotti.com' ? 'admin' : 'user';
        login(email, role);
        navigate(role === 'admin' ? '/admin' : '/rewards');
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side - Visual */}
            <div className="w-full md:w-1/2 bg-chocolate flex items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="text-center relative z-10">
                    <h1 className="text-6xl font-playful font-bold text-white mb-4">Welcome Back!</h1>
                    <p className="text-2xl font-naughty text-brandYellow transform -rotate-2">Ready for more goodness?</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 bg-vanillaCream flex items-center justify-center p-8 md:p-12">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-8 rounded-[2rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-md"
                >
                    <h2 className="text-4xl font-playful font-bold text-chocolate mb-8 text-center">Login</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-chocolate font-bold mb-2 font-playful">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-chocolate/20 focus:border-brandTeal focus:ring-0 outline-none font-bold text-chocolate transition-colors bg-vanillaCream"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-chocolate font-bold mb-2 font-playful">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-chocolate/20 focus:border-brandTeal focus:ring-0 outline-none font-bold text-chocolate transition-colors bg-vanillaCream"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brandRed text-white font-playful font-bold text-xl py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
                        >
                            Let's Go! 🚀
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-chocolate font-bold">
                            New here? <Link to="/signup" className="text-brandTeal font-naughty text-lg hover:underline decoration-wavy">Join the fun!</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
