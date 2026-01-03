import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Prophet Section - Andrej Karpathy Quote
 * Features liquid hover effect revealing glitch image
 */
const ProphetSection = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    return (
        <section className="relative w-full min-h-screen bg-[#030303] py-32 px-4 md:px-12 overflow-hidden">

            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#030303] to-[#050505]" />

            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">
                        The Prophet
                    </span>
                </motion.div>

                {/* Main content grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Image with liquid hover effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative aspect-square max-w-md mx-auto lg:mx-0"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-full blur-3xl opacity-50" />

                        {/* Container with mask */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">

                            {/* Base image - Normal */}
                            <img
                                src="/images/karpathy-normal.png"
                                alt="Andrej Karpathy"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Overlay image - Glitch (revealed on hover with liquid mask) */}
                            <div
                                className="absolute inset-0 transition-opacity duration-300"
                                style={{
                                    opacity: isHovering ? 1 : 0,
                                    maskImage: isHovering
                                        ? `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent 100%)`
                                        : 'none',
                                    WebkitMaskImage: isHovering
                                        ? `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent 100%)`
                                        : 'none',
                                }}
                            >
                                <img
                                    src="/images/karpathy-glitch.png"
                                    alt="Andrej Karpathy Glitch"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Liquid border effect on hover */}
                            <motion.div
                                className="absolute inset-0 rounded-full pointer-events-none"
                                animate={{
                                    boxShadow: isHovering
                                        ? `0 0 60px rgba(168, 85, 247, 0.4), inset 0 0 60px rgba(168, 85, 247, 0.1)`
                                        : `0 0 0px rgba(168, 85, 247, 0), inset 0 0 0px rgba(168, 85, 247, 0)`
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {/* Floating particles around image */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white/30 rounded-full"
                                style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${20 + Math.random() * 60}%`,
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.3, 0.8, 0.3],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Quote content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center lg:text-left"
                    >
                        {/* Quote mark */}
                        <div className="text-8xl font-serif text-white/10 leading-none mb-4">"</div>

                        {/* Quote text */}
                        <blockquote className="text-3xl md:text-5xl font-medium text-white leading-tight mb-8 tracking-tight">
                            The hottest new programming language is{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                                English.
                            </span>
                        </blockquote>

                        {/* Attribution */}
                        <div className="flex items-center gap-4 justify-center lg:justify-start">
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                            <div>
                                <p className="text-white font-semibold">Andrej Karpathy</p>
                                <p className="text-white/50 text-sm">Former Director of AI at Tesla, OpenAI</p>
                            </div>
                        </div>

                        {/* Additional context */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 text-white/40 text-lg leading-relaxed max-w-lg"
                        >
                            The era of vibe coding is here. No more gatekeeping.
                            No more years of syntax memorization. Just describe what you want to build.
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProphetSection;
