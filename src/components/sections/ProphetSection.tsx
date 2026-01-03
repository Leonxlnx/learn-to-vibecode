import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Prophet Section
 * Refined Glitch: Stronger, clear distortion effects on hover.
 */
const ProphetSection = () => {
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setCoords({ x, y });
    };

    return (
        <section className="relative w-full py-40 px-6 bg-[#030303] flex items-center justify-center overflow-hidden border-t border-white/5">

            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-red-900/40 to-transparent" />

            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-24 items-center">

                {/* IMAGE SIDE */}
                <div className="flex justify-center lg:justify-end">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        ref={containerRef}
                        className="relative w-[500px] h-[500px] rounded-full cursor-none group"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onMouseMove={handleMouseMove}
                    >
                        {/* Main Image Container */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#080808] z-10 transition-transform duration-100 ease-out"
                            style={{
                                transform: isHovering
                                    ? `perspective(1000px) rotateY(${(coords.x - 0.5) * 10}deg) rotateX(${(coords.y - 0.5) * -10}deg)`
                                    : 'none'
                            }}
                        >

                            {/* Normal Image */}
                            <img
                                src="/images/karpathy-normal.png"
                                alt="Karpathy"
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${isHovering ? 'opacity-0' : 'opacity-100 grayscale'}`}
                            />

                            {/* Glitch Image - Revealed INSTANTLY on Hover */}
                            <div
                                className={`absolute inset-0 bg-transparent transition-opacity duration-75 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                            >
                                {/* Red Channel Shift */}
                                <img
                                    src="/images/karpathy-glitch.png"
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80"
                                    style={{ left: '-2px', filter: 'hue-rotate(90deg)' }}
                                />
                                {/* Cyan Channel Shift */}
                                <img
                                    src="/images/karpathy-glitch.png"
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80"
                                    style={{ left: '2px', filter: 'hue-rotate(-90deg)' }}
                                />
                                {/* Main Glitch */}
                                <img
                                    src="/images/karpathy-glitch.png"
                                    alt="Glitch"
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-normal opacity-100 scale-105"
                                />
                                {/* Scanlines */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50" />

                                {/* Flash */}
                                <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay animate-pulse" />
                            </div>
                        </div>

                        {/* Glow Behind */}
                        <div className={`absolute inset-0 rounded-full blur-[100px] transition-all duration-500 ${isHovering ? 'bg-red-600/20 scale-125' : 'bg-transparent scale-100'}`} />

                    </motion.div>
                </div>

                {/* CONTENT SIDE */}
                <div className="text-center lg:text-left relative z-20">
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
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-red-600 z-0 opacity-80 -rotate-1" />
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
