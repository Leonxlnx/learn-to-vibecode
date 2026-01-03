import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Prophet Section - Andrej Karpathy Quote
 * Refined Liquid Glitch on Hover (Cleaner implementation)
 */
const ProphetSection = () => {
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [maskPos, setMaskPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMaskPos({ x, y });
    };

    return (
        <section className="relative w-full py-32 px-6 bg-[#050505] flex items-center justify-center overflow-hidden">

            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center">

                {/* IMAGE SIDE */}
                <div className="flex justify-center lg:justify-end">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        ref={containerRef}
                        className="relative w-[400px] h-[400px] rounded-full cursor-none"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onMouseMove={handleMouseMove}
                    >
                        {/* Main Image Container */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#111]">

                            {/* Normal Image */}
                            <img
                                src="/images/karpathy-normal.png"
                                alt="Andrej Karpathy"
                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 transition-opacity duration-500"
                            />

                            {/* Glitch Overlay (Revealed by Mask) */}
                            <div
                                className="absolute inset-0 w-full h-full bg-red-900/20 mix-blend-overlay"
                                style={{
                                    opacity: isHovering ? 1 : 0,
                                    maskImage: `radial-gradient(circle 120px at ${maskPos.x}% ${maskPos.y}%, black, transparent)`,
                                    WebkitMaskImage: `radial-gradient(circle 120px at ${maskPos.x}% ${maskPos.y}%, black, transparent)`,
                                    transition: 'opacity 0.2s ease-out'
                                }}
                            >
                                <img
                                    src="/images/karpathy-glitch.png"
                                    alt="Karpathy Glitch"
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-hard-light scale-105"
                                />
                            </div>
                        </div>

                        {/* Hover Ring */}
                        <div
                            className="absolute inset-0 rounded-full border border-red-500/50 transition-all duration-300 pointer-events-none"
                            style={{
                                opacity: isHovering ? 1 : 0,
                                transform: isHovering ? 'scale(1.02)' : 'scale(1)'
                            }}
                        />
                    </motion.div>
                </div>

                {/* CONTENT SIDE */}
                <div className="text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-red-500 font-mono text-sm uppercase tracking-[0.2em] mb-6 block">
                            The Prophet
                        </span>

                        <blockquote className="text-4xl md:text-6xl font-medium text-white leading-tight mb-8 tracking-tighter">
                            "The hottest new programming language is <span className="text-white bg-red-600/20 px-2 italic">English</span>."
                        </blockquote>

                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                            <div className="h-[1px] w-12 bg-white/20 mt-3 hidden lg:block" />
                            <div>
                                <p className="text-white text-lg font-bold">Andrej Karpathy</p>
                                <p className="text-white/40 text-sm font-mono mt-1">Founding Member, OpenAI</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default ProphetSection;
