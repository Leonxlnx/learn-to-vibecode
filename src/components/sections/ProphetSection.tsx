import { motion } from 'framer-motion';
import LiquidGlitchImage from '../animations/LiquidGlitchImage';

/**
 * Prophet Section
 * Refactored to use LiquidGlitchImage with "elastic" physics as requested.
 */
const ProphetSection = () => {
    return (
        <section className="relative w-full py-48 px-6 bg-[#030303] flex items-center justify-center overflow-hidden border-t border-white/5">

            {/* Decorative Top Line */}
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-red-900/40 to-transparent" />

            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-24 items-center">

                {/* IMAGE SIDE - USING LIQUID GLITCH */}
                <div className="flex justify-center lg:justify-end">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <LiquidGlitchImage
                            imgNormal="/images/karpathy-normal.png"
                            imgGlitch="/images/karpathy-glitch.png"
                            alt="Andrej Karpathy - The Prophet"
                            width={500}
                            mode="hover"
                            physics="elastic"
                            intensity="medium"
                            baseRadius={0.48} // Almost full circle for the base mask if we want it round-ish
                        />

                        {/* Glow Behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 bg-red-600/20 blur-[100px] opacity-40 pointer-events-none" />
                    </motion.div>
                </div>

                {/* CONTENT SIDE */}
                <div className="text-center lg:text-left relative z-20 font-sans">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block border-b border-red-500 pb-1 text-red-500 font-mono text-sm uppercase tracking-[0.3em] mb-8">
                            The Prophet
                        </span>

                        <blockquote className="text-4xl md:text-6xl font-medium text-white leading-[1.1] mb-10 tracking-tight">
                            "The hottest new programming language is <span className="relative inline-block">
                                <span className="relative z-10 font-serif italic pr-4">English</span>
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-red-600 z-0 opacity-80 -rotate-1 mix-blend-multiply" />
                            </span>."
                        </blockquote>

                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5">
                            <div className="w-16 h-1 bg-white/10 mt-3 rounded-full overflow-hidden">
                                <div className="w-1/2 h-full bg-red-500" />
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-white text-xl font-bold tracking-wide">Andrej Karpathy</p>
                                <p className="text-white/40 text-sm font-mono mt-1 uppercase tracking-wider">Founding Member, OpenAI</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default ProphetSection;
