import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * The Shift Section - FIXED SCROLL v4
 * Uses pin-like sticky behavior with proper scroll ranges
 */
const TheShiftSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

    // PHASE 1: Before (0% - 40%)
    const opacityBefore = useTransform(smoothProgress, [0, 0.15, 0.35], [1, 1, 0]);
    const scaleBefore = useTransform(smoothProgress, [0, 0.35], [1, 0.85]);

    // PHASE 2: After (45% - 100%)
    const opacityAfter = useTransform(smoothProgress, [0.45, 0.55], [0, 1]);
    const scaleAfter = useTransform(smoothProgress, [0.45, 0.65], [0.95, 1]);
    const yAfter = useTransform(smoothProgress, [0.45, 0.65], [50, 0]);

    // Background Elements Parallax
    const yScatter1 = useTransform(smoothProgress, [0, 1], [0, -150]);
    const yScatter2 = useTransform(smoothProgress, [0, 1], [0, -250]);

    return (
        <section ref={containerRef} className="relative w-full h-[250vh] bg-[#030303] z-10 font-sans overflow-clip">

            {/* Sticky Container - This stays fixed while user scrolls */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Background: Scattered Terms */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
                    <motion.div style={{ y: yScatter1 }} className="absolute top-[20%] left-[8%] text-6xl text-white/10 font-serif italic -rotate-12 whitespace-nowrap">
                        Ugly Colors
                    </motion.div>
                    <motion.div style={{ y: yScatter2 }} className="absolute bottom-[25%] right-[8%] text-7xl text-white/10 font-sans font-black rotate-6 whitespace-nowrap">
                        Bad UX
                    </motion.div>
                    <motion.div style={{ y: yScatter1 }} className="absolute bottom-[30%] left-[12%] text-5xl text-white/10 font-mono -rotate-3 whitespace-nowrap">
                        No Soul
                    </motion.div>

                    {/* Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
                </div>

                <div className="relative z-10 px-6 max-w-6xl w-full flex flex-col items-center justify-center min-h-screen">

                    {/* BEFORE - The "Bad" Design */}
                    <motion.div
                        style={{ opacity: opacityBefore, scale: scaleBefore }}
                        className="absolute flex flex-col items-center text-center w-full max-w-5xl gap-12"
                    >
                        {/* Purple Gradient */}
                        <div className="transform -skew-x-3">
                            <h2 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                Purple Gradient
                            </h2>
                        </div>

                        {/* Wrong Alignment */}
                        <div className="w-full flex justify-start pl-[5%] md:pl-[15%]">
                            <h2 className="text-4xl md:text-7xl font-black text-white/30 rotate-1">
                                Wrong Alignment
                            </h2>
                        </div>

                        {/* Too Generic */}
                        <div className="transform translate-x-[3%]">
                            <h2 className="text-5xl md:text-7xl text-white/20 uppercase" style={{ fontFamily: 'Arial, sans-serif' }}>
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

                        <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8 font-sans">
                            The perfect taste for<br />
                            every page you build.
                        </h2>

                        <p className="text-white/50 text-lg md:text-xl font-light max-w-2xl mb-12 leading-relaxed">
                            Go from idea to <span className="text-white font-medium border-b border-red-500">masterpiece</span>.
                        </p>

                        <Link to="/auth">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-10 py-5 bg-white text-black font-bold text-base uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-3"
                            >
                                Start Creating <ArrowRight size={18} />
                            </motion.button>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TheShiftSection;
