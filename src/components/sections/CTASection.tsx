import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * CTA Section - Clean, no duplicate footer elements
 */
const CTASection = () => {
    return (
        <section className="relative w-full py-40 px-6 bg-[#030303]">
            <div className="max-w-4xl mx-auto text-center">

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8"
                >
                    READY TO <span className="text-red-500">BUILD?</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-white/50 mb-12 max-w-xl mx-auto"
                >
                    Join thousands of builders who are shipping faster with AI.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Link to="/auth">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-bold text-lg uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                        >
                            Start Learning <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>

                    <p className="mt-8 text-white/30 text-sm">
                        Free • No credit card required
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default CTASection;
