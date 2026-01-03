import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import CardNav from '@/components/ui/CardNav';

/**
 * Pricing Page - Free forever model
 */
const Pricing = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <CardNav items={[]} logoAlt="Learn2Vibecode" />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">

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
                            Learn2Vibecode is completely free. No hidden fees, no premium tiers, no credit card required.
                        </p>
                    </motion.div>

                    {/* Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-md mx-auto"
                    >
                        <div className="relative p-10 rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                            {/* Glow */}
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-red-600/20 blur-[100px] rounded-full" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Sparkles className="text-red-500" />
                                    <span className="text-sm font-mono uppercase tracking-widest text-white/40">Full Access</span>
                                </div>

                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-6xl font-black">$0</span>
                                    <span className="text-white/40">/forever</span>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Full curriculum access",
                                        "All 12 modules",
                                        "Project templates",
                                        "Discord community",
                                        "Lifetime updates"
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
                        </div>
                    </motion.div>

                    {/* Why Free */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-20"
                    >
                        <h3 className="text-2xl font-bold mb-4">Why is it free?</h3>
                        <p className="text-white/40 max-w-xl mx-auto">
                            We believe vibecoding should be accessible to everyone. Our mission is to democratize software development, not to profit from it.
                        </p>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Pricing;
