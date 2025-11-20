import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoyalty } from '../context/LoyaltyContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useLoyalty();
    const { user, updatePoints } = useAuth();
    const navigate = useNavigate();

    const totalPoints = cart.reduce((sum, item) => sum + item.pointsCost * item.quantity, 0);

    const handleCheckout = () => {
        if (!user) return alert('Please login first');
        if (user.points < totalPoints) return alert('Not enough points!');

        if (confirm(`Confirm purchase for ${totalPoints} points?`)) {
            updatePoints(-totalPoints);
            clearCart();
            alert('Order placed successfully! You will receive an email shortly.');
        }
    };

    return (
        <div className="min-h-screen bg-vanillaCream pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-5xl font-playful font-bold text-chocolate mb-8 text-center">Your Stash</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20">
                        <ShoppingBag size={64} className="mx-auto mb-6 text-chocolate/20" />
                        <p className="text-2xl font-naughty text-chocolate/50 mb-8">Your cart is empty... sad.</p>
                        <button onClick={() => navigate('/rewards')} className="bg-brandTeal text-chocolate px-8 py-4 rounded-full font-playful font-bold text-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
                            Go Shopping!
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <div className="p-8 space-y-6">
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    className="flex items-center justify-between p-4 bg-vanillaCream rounded-xl border-2 border-chocolate/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl border-2 border-black shadow-sm">
                                            🎁
                                        </div>
                                        <div>
                                            <h3 className="font-playful font-bold text-xl text-chocolate">{item.name}</h3>
                                            <p className="text-brandTeal font-naughty">{item.pointsCost} pts</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full border-2 border-black">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center font-bold text-chocolate hover:text-brandRed">-</button>
                                            <span className="font-playful font-bold text-lg w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center font-bold text-chocolate hover:text-brandTeal">+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-brandRed hover:scale-110 transition-transform">
                                            <Trash2 size={24} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="bg-chocolate p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <p className="text-chocolateLight font-bold mb-1">Total Points</p>
                                <p className="text-4xl font-playful font-bold text-brandYellow">{totalPoints} pts</p>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={user && user.points < totalPoints}
                                className={`px-8 py-4 rounded-xl font-playful font-bold text-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${user && user.points >= totalPoints
                                    ? 'bg-brandPink text-white hover:translate-y-1 hover:shadow-none'
                                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                    }`}
                            >
                                {user && user.points < totalPoints ? 'Not enough points' : 'Checkout Now!'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
