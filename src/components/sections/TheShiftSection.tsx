import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * The Shift Section - REFINED v3
 * Fixes: Scroll Ranges, Overlap, Clarity.
 */
const TheShiftSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 70 });

    // Adjusted Ranges to prevent overlap and ensure smooth transition
    // PHASE 1: The "Bad" (0 - 35%)
    const opacityBefore = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const scaleBefore = useTransform(smoothProgress, [0, 0.3], [1, 0.8]);
    const blurBefore = useTransform(smoothProgress, [0.2, 0.3], [0, 20]);

    // PHASE 2: The "Good" (40% - 100%)
    const opacityAfter = useTransform(smoothProgress, [0.4, 0.5], [0, 1]);
    const scaleAfter = useTransform(smoothProgress, [0.4, 0.6], [0.9, 1]);
    const yAfter = useTransform(smoothProgress, [0.4, 0.6], [100, 0]);

    // Background Elements Parallax
    const yScatter1 = useTransform(smoothProgress, [0, 1], [0, -200]);
    const yScatter2 = useTransform(smoothProgress, [0, 1], [0, -300]);
    const yScatter3 = useTransform(smoothProgress, [0, 1], [0, -150]);

    return (
        <section ref={containerRef} className="relative w-full h-[300vh] bg-[#030303] z-10 font-sans overflow-hidden">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Background: Scattered Terms (Subtle) */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                    <motion.div style={{ y: yScatter1 }} className="absolute top-[15%] left-[10%] text-6xl text-white/5 font-serif italic -rotate-12 whitespace-nowrap">
                        Ugly Colors
                    </motion.div>
                    <motion.div style={{ y: yScatter2 }} className="absolute bottom-[20%] right-[10%] text-8xl text-white/5 font-sans font-black rotate-6 whitespace-nowrap">
                        Bad UX
                    </motion.div>
                    <motion.div style={{ y: yScatter3 }} className="absolute bottom-[25%] left-[15%] text-7xl text-white/5 font-mono -rotate-3 whitespace-nowrap">
                        No Soul
                    </motion.div>

                    {/* Noise & Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                <div className="relative z-10 px-6 max-w-7xl w-full flex flex-col items-center justify-center min-h-screen">

                    {/* BEFORE - The "Bad" Design Traits */}
                    <motion.div
                        style={{ opacity: opacityBefore, scale: scaleBefore, filter: `blur(${blurBefore}px)` }}
                        className="absolute flex flex-col items-center text-center w-full max-w-5xl"
                    >
                        {/* 1. Purple Gradient - ACTUAL Purple Gradient Text */}
                        <div className="mb-16 transform -skew-x-6 hover:skew-x-0 transition-transform duration-500">
                            <h2 className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                Purple Gradient
                            </h2>
                        </div>

                        {/* 2. Wrong Alignment - Visually Misaligned */}
                        <div className="w-full flex justify-start pl-[10%] mb-16">
                            <h2 className="text-5xl md:text-8xl font-black text-white/40 rotate-2 translate-y-4">
                                Wrong Alignment
                            </h2>
                        </div>

                        {/* 3. Too Generic - Generic Font */}
                        <div className="transform translate-x-[5%]">
                            <h2 className="text-6xl md:text-[80px] text-white/30 font-sans tracking-normal uppercase" style={{ fontFamily: 'Arial, sans-serif' }}>
                                Too Generic
                            </h2>
                        </div>
                    </motion.div>


                    {/* AFTER - Vibecoding */}
                    <motion.div
                        style={{ opacity: opacityAfter, scale: scaleAfter, y: yAfter }}
                        className="absolute flex flex-col items-center text-center w-full max-w-4xl"
                    >
                        <span className="text-red-500 text-sm font-mono uppercase tracking-[0.5em] mb-8">
                            With vibecoding...
                        </span>

                        <h2 className="text-5xl md:text-8xl font-black text-white leading-[1] tracking-tight mb-8 font-sans">
                            The perfect taste for<br />
                            every page you build.
                        </h2>

                        <p className="text-white/60 text-xl md:text-2xl font-light max-w-3xl mb-12 leading-relaxed">
                            Go from idea to <span className="text-white font-medium border-b border-red-500">masterpiece</span>.
                        </p>

                        <Link to="/auth">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-10 py-5 bg-white text-black font-bold text-lg uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-3"
                            >
                                Start Creating <ArrowRight size={20} />
                            </motion.button>
                        </Link>

                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TheShiftSection;
