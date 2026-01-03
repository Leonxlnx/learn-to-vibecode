import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

/**
 * Prophet Section
 * FIXED: Glitch bug on edge entry.
 * ADDED: Continuous subtle liquid effect + stronger glitch on hover.
 */
const ProphetSection = () => {
    // We use a manual hover state tracking via mouse coordinates relative to center
    // to avoid the flickering that happens when styled elements interact with onMouseEnter
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });

    // For the continuous liquid effect
    const liquidControls = useAnimation();

    useEffect(() => {
        liquidControls.start({
            filter: [
                "hue-rotate(0deg) contrast(100%)",
                "hue-rotate(5deg) contrast(110%)",
                "hue-rotate(0deg) contrast(100%)"
            ],
            transition: { duration: 5, repeat: Infinity, ease: "linear" }
        });
    }, [liquidControls]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Calculate normalized coordinates (0 to 1)
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setCoords({ x, y });

        // Simple distance check from center to ensure we only trigger "hover" when actually inside the circle visually
        const centerX = 0.5;
        const centerY = 0.5;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

        // Radius is 0.5 (half width). We give a tiny buffer.
        if (distance < 0.48) {
            if (!isHovering) setIsHovering(true);
        } else {
            if (isHovering) setIsHovering(false);
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setCoords({ x: 0.5, y: 0.5 });
    };

    return (
        <section className="relative w-full py-48 px-6 bg-[#030303] flex items-center justify-center overflow-hidden border-t border-white/5">

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
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Main Image Container */}
                        <motion.div
                            animate={liquidControls}
                            className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#080808] z-10"
                            style={{
                                transform: isHovering
                                    ? `perspective(1000px) rotateY(${(coords.x - 0.5) * 15}deg) rotateX(${(coords.y - 0.5) * -15}deg) scale(1.02)`
                                    : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
                                transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                            }}
                        >

                            {/* Normal Image (Always present, fades out on hover) */}
                            <img
                                src="/images/karpathy-normal.png"
                                alt="Karpathy"
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${isHovering ? 'opacity-0 scale-105' : 'opacity-100 grayscale scale-100'}`}
                            />

                            {/* Seamless Liquid/Subtle Distortion Layer (Always animating slightly) */}
                            <div className={`absolute inset-0 bg-transparent pointer-events-none opacity-20 mix-blend-overlay transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-20'}`}>
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse" />
                            </div>

                            {/* Glitch Image - Revealed on Hover */}
                            <div
                                className={`absolute inset-0 bg-black transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                            >
                                {/* Red Channel Shift with Animation */}
                                <motion.img
                                    animate={isHovering ? { x: [-2, 2, -1], y: [1, -1, 0] } : {}}
                                    transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                                    src="/images/karpathy-glitch.png"
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80"
                                    style={{ filter: 'hue-rotate(90deg) contrast(1.2)' }}
                                />

                                {/* Cyan Channel Shift with Animation */}
                                <motion.img
                                    animate={isHovering ? { x: [2, -2, 1], y: [-1, 1, 0] } : {}}
                                    transition={{ duration: 0.25, repeat: Infinity, repeatType: "mirror" }}
                                    src="/images/karpathy-glitch.png"
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80"
                                    style={{ filter: 'hue-rotate(-90deg) contrast(1.2)' }}
                                />

                                {/* Main Glitch Image */}
                                <img
                                    src="/images/karpathy-glitch.png"
                                    alt="Glitch"
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-normal opacity-100 scale-105"
                                />

                                {/* Scanlines & Noise */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[size:100%_3px] pointer-events-none opacity-40" />
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 hover:opacity-40 transition-opacity" />

                                {/* Digital Artifacts */}
                                <div className="absolute top-1/4 left-0 w-full h-1 bg-red-500/50 blur-[2px] animate-pulse" />
                            </div>
                        </motion.div>

                        {/* Glow Behind */}
                        <div className={`absolute inset-0 rounded-full blur-[80px] transition-all duration-500 ${isHovering ? 'bg-red-600/30 scale-110' : 'bg-white/5 scale-90'}`} />

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
