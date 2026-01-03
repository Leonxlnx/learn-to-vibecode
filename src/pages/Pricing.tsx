import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles, Zap, Crown } from 'lucide-react';
import CardNav from '@/components/ui/CardNav';

/**
 * Pricing Page - Free forever + Pro (coming soon)
 */
const Pricing = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <CardNav items={[]} logoAlt="Learn2Vibecode" />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto">

                    {/* Back Link */}
                    <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12">
                        <ArrowLeft size={16} /> Back
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                            SIMPLE <span className="text-red-500">PRICING</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-xl mx-auto">
                            Start free. Upgrade when you're ready to go pro.
                        </p>
                    </motion.div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                        {/* Free Plan */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative p-10 rounded-3xl bg-white/5 border border-white/10 overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Sparkles className="text-white/50" size={20} />
                                    <span className="text-sm font-mono uppercase tracking-widest text-white/40">Free</span>
                                </div>

                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-5xl font-black">$0</span>
                                    <span className="text-white/40">/forever</span>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Full curriculum access",
                                        "12 core modules",
                                        "Community Discord",
                                        "Basic templates",
                                        "Email support"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white/70">
                                            <Check size={18} className="text-green-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/auth">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-white text-black font-bold rounded-full uppercase tracking-wider"
                                    >
                                        Get Started Free
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Pro Plan - Coming Soon */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative p-10 rounded-3xl bg-gradient-to-br from-red-950/20 to-black/40 border border-red-500/20 overflow-hidden opacity-80"
                        >
                            {/* Coming Soon Badge */}
                            <div className="absolute top-6 right-6">
                                <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-xs font-mono uppercase tracking-widest">
                                    Coming Soon
                                </span>
                            </div>

                            {/* Glow */}
                            <div className="absolute -top-20 right-0 w-40 h-40 bg-red-600/10 blur-[80px] rounded-full" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Crown className="text-red-500" size={20} />
                                    <span className="text-sm font-mono uppercase tracking-widest text-red-400">Pro</span>
                                </div>

                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-5xl font-black">$29</span>
                                    <span className="text-white/40">/month</span>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Everything in Free",
                                        "50+ Premium projects",
                                        "Pro templates library",
                                        "Live chat support",
                                        "Priority AI assistant",
                                        "Extended resources",
                                        "1-on-1 office hours",
                                        "Pro community access"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white/60">
                                            <Zap size={18} className="text-red-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    disabled
                                    className="w-full py-4 bg-white/10 text-white/50 font-bold rounded-full uppercase tracking-wider cursor-not-allowed border border-white/10"
                                >
                                    Coming Soon
                                </button>
                            </div>
                        </motion.div>

                    </div>

                    {/* Why Free */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-20"
                    >
                        <h3 className="text-2xl font-bold mb-4">Why start free?</h3>
                        <p className="text-white/40 max-w-xl mx-auto">
                            We believe vibecoding should be accessible to everyone. Master the fundamentals for free, then go pro when you're ready to build at scale.
                        </p>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Pricing;
