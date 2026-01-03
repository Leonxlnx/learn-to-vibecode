import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="relative w-full py-48 bg-[#030303] flex flex-col items-center justify-center overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
            </div>

            <div className="relative z-10 text-center max-w-4xl px-6">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-500 text-xs font-mono uppercase tracking-widest mb-8">
                        Ready to Ship?
                    </span>

                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                        Build the future <span className="text-white/40">today.</span>
                    </h2>

                    <p className="text-xl text-white/50 font-light max-w-2xl mx-auto">
                        No more waiting. Join the revolution and start building software that feels like magic.
                    </p>
                </motion.div>

                <Link to="/auth">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-12 py-6 bg-white text-black text-lg font-bold uppercase tracking-widest rounded-full overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(255,255,255,0.3)] transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        <span className="relative z-10 flex items-center gap-4 group-hover:text-white transition-colors duration-300">
                            Start Learning Free <ArrowRight className="w-5 h-5" />
                        </span>
                    </motion.button>
                </Link>

                {/* Footer Links - Minimal */}
                <div className="mt-32 border-t border-white/5 pt-12 text-sm text-white/30 flex flex-col md:flex-row gap-8 justify-between items-center w-full max-w-7xl mx-auto px-6">
                    <div>
                        © 2026 Learn to Vibecode. All rights reserved.
                    </div>
                    <div className="flex gap-8 font-mono uppercase text-xs tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="hover:text-white transition-colors">Discord</a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CTASection;
