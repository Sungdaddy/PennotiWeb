import React, { useState } from 'react';
import { useLoyalty } from '../context/LoyaltyContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const AdminPanel: React.FC = () => {
    const { user } = useAuth();
    const { availableRewards, addReward } = useLoyalty();
    const [newReward, setNewReward] = useState({ name: '', pointsCost: 0, category: '', image: 'https://placehold.co/400' });

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" />;
    }

    const handleAddReward = (e: React.FormEvent) => {
        e.preventDefault();
        addReward({ ...newReward, id: Math.random().toString(), pointsCost: Number(newReward.pointsCost) });
        setNewReward({ name: '', pointsCost: 0, category: '', image: 'https://placehold.co/400' });
        alert('Reward added!');
    };

    return (
        <div className="min-h-screen bg-vanillaCream pt-32 pb-20">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl font-playful font-bold text-chocolate mb-8 text-center">Admin Dashboard 🛠️</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Add Product Form */}
                    <div className="bg-white p-8 rounded-[2rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-3xl font-playful font-bold text-chocolate mb-6">Add New Reward</h2>
                        <form onSubmit={handleAddReward} className="space-y-6">
                            <div>
                                <label className="block text-chocolate font-bold mb-2 font-playful">Reward Name</label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl border-2 border-chocolate/20 focus:border-brandTeal focus:ring-0 outline-none font-bold text-chocolate transition-colors bg-vanillaCream"
                                    placeholder="e.g. Super Swirly T-Shirt"
                                    value={newReward.name}
                                    onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-chocolate font-bold mb-2 font-playful">Points Cost</label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl border-2 border-chocolate/20 focus:border-brandTeal focus:ring-0 outline-none font-bold text-chocolate transition-colors bg-vanillaCream"
                                    placeholder="e.g. 500"
                                    type="number"
                                    value={newReward.pointsCost || ''}
                                    onChange={(e) => setNewReward({ ...newReward, pointsCost: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-chocolate font-bold mb-2 font-playful">Category</label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl border-2 border-chocolate/20 focus:border-brandTeal focus:ring-0 outline-none font-bold text-chocolate transition-colors bg-vanillaCream"
                                    placeholder="e.g. Merchandise"
                                    value={newReward.category}
                                    onChange={(e) => setNewReward({ ...newReward, category: e.target.value })}
                                    required
                                />
                            </div>
                            <button className="w-full bg-brandRed text-white font-playful font-bold text-xl py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
                                Add Reward ➕
                            </button>
                        </form>
                    </div>

                    {/* Stats / Overview */}
                    <div className="bg-white p-8 rounded-[2rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-3xl font-playful font-bold text-chocolate mb-6">Overview</h2>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-6 bg-vanillaCream rounded-xl border-2 border-chocolate/10">
                                <span className="font-playful font-bold text-xl text-chocolate">Total Rewards Active</span>
                                <span className="font-naughty text-3xl text-brandTeal">{availableRewards.length}</span>
                            </div>
                            <div className="flex justify-between items-center p-6 bg-vanillaCream rounded-xl border-2 border-chocolate/10">
                                <span className="font-playful font-bold text-xl text-chocolate">Registered Users (Mock)</span>
                                <span className="font-naughty text-3xl text-brandPink">1</span>
                            </div>
                            <div className="p-6 bg-brandYellow/20 rounded-xl border-2 border-brandYellow border-dashed text-center">
                                <p className="font-naughty text-chocolate text-xl">More stats coming soon!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
