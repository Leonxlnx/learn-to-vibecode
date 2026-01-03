import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Zap, Rocket, Terminal, Box } from 'lucide-react';

/**
 * The Shift Section - Before/After Comparison
 * REFINED: Better alignment, Noise/Grid Background, Stronger Typo
 */
const TheShiftSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 70 });

    // Adjusted ranges to keep content more centered/higher
    const opacityBefore = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const scaleBefore = useTransform(smoothProgress, [0, 0.3], [1, 0.9]);
    const blurBefore = useTransform(smoothProgress, [0.2, 0.3], [0, 10]);

    const opacityTransition = useTransform(smoothProgress, [0.35, 0.45, 0.55], [0, 1, 0]);

    const opacityAfter = useTransform(smoothProgress, [0.6, 0.7, 0.9], [0, 1, 0]);
    const scaleAfter = useTransform(smoothProgress, [0.6, 0.8], [0.95, 1]);
    const yAfter = useTransform(smoothProgress, [0.6, 0.8], [50, 0]);

    const opacityFinal = useTransform(smoothProgress, [0.9, 0.95], [0, 1]);

    return (
        <section ref={containerRef} className="relative w-full h-[400vh] bg-[#030303] z-10">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Background: Subtle Grid & Noise */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

                    {/* Noise */}
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    {/* Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)]" />
                </div>

                <div className="relative z-10 px-6 max-w-7xl w-full flex flex-col items-center justify-center min-h-screen">

                    {/* BEFORE - The Old Way */}
                    <motion.div
                        style={{ opacity: opacityBefore, scale: scaleBefore, filter: `blur(${blurBefore}px)` }}
                        className="absolute flex flex-col items-center"
                    >
                        <div className="mb-6 px-4 py-1 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em]">Status Quo</span>
                        </div>

                        <h2 className="text-6xl md:text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-white/5 leading-[0.85] tracking-tighter text-center mb-10 font-display">
                            SYNTAX<br />
                            ERROR
                        </h2>

                        <div className="flex gap-12 text-white/20 font-mono text-sm uppercase tracking-widest">
                            <div className="flex flex-col items-center gap-2">
                                <Terminal size={24} />
                                <span>Config Hell</span>
                            </div>
                            <div className="w-[1px] h-12 bg-white/10" />
                            <div className="flex flex-col items-center gap-2">
                                <Box size={24} />
                                <span>Dep. Cycle</span>
                            </div>
                        </div>
                    </motion.div>


                    {/* TRANSITION - The Shift */}
                    <motion.div
                        style={{ opacity: opacityTransition }}
                        className="absolute text-center"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-tr from-red-500/0 via-red-500/20 to-red-500/0 blur-xl rounded-full"
                            />
                            <Zap className="relative w-24 h-24 text-red-500 fill-red-500" />
                        </div>
                        <h2 className="mt-8 text-4xl font-bold text-white tracking-[0.5em] uppercase">The Shift</h2>
                    </motion.div>


                    {/* AFTER - The new Way */}
                    <motion.div
                        style={{ opacity: opacityAfter, scale: scaleAfter, y: yAfter }}
                        className="absolute flex flex-col items-center text-center"
                    >
                        <div className="mb-8 px-4 py-1 border border-red-500/30 rounded-full bg-red-500/10 backdrop-blur-sm">
                            <span className="text-red-500 text-[10px] font-mono uppercase tracking-[0.3em]">Vibecode Protocol</span>
                        </div>

                        <h2 className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8 font-display">
                            FROM IDEA<br />
                            TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">URL.</span>
                        </h2>

                        <p className="text-white/50 text-xl font-light italic max-w-2xl">
                            "It's not about writing code anymore.<br />It's about orchestrating intelligence."
                        </p>
                    </motion.div>


                    {/* FINAL CTA In-Flow */}
                    <motion.div
                        style={{ opacity: opacityFinal }}
                        className="absolute text-center w-full max-w-screen-md"
                    >
                        <button className="group relative px-12 py-6 bg-white text-black font-bold text-xl uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                            <span className="relative z-10 flex items-center gap-4">
                                Start Building <ArrowRight size={24} />
                            </span>
                            <div className="absolute inset-0 bg-red-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                            <span className="absolute inset-0 z-10 flex items-center justify-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Start Building <ArrowRight size={24} />
                            </span>
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TheShiftSection;
