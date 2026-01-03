import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Zap, Rocket } from 'lucide-react';

/**
 * The Shift Section - Before/After Comparison
 * Refined Minimalist Design (Red/Black/White)
 */
const TheShiftSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 70 });

    // Animations
    const opacityBefore = useTransform(smoothProgress, [0.05, 0.2, 0.35], [0, 1, 0]);
    const yBefore = useTransform(smoothProgress, [0.05, 0.35], [80, -80]);
    const scaleBefore = useTransform(smoothProgress, [0.05, 0.2, 0.35], [0.9, 1, 0.95]);

    const opacityTransition = useTransform(smoothProgress, [0.4, 0.5, 0.6], [0, 1, 0]);

    const opacityAfter = useTransform(smoothProgress, [0.65, 0.8, 0.9], [0, 1, 0]);
    const yAfter = useTransform(smoothProgress, [0.65, 0.9], [60, -40]);
    const scaleAfter = useTransform(smoothProgress, [0.65, 0.8], [0.95, 1]);

    const opacityFinal = useTransform(smoothProgress, [0.88, 0.98], [0, 1]);
    const scaleFinal = useTransform(smoothProgress, [0.88, 1], [0.9, 1]);

    return (
        <section ref={containerRef} className="relative w-full h-[500vh] bg-[#050505] z-10 selection:bg-red-500/30">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Minimal Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

                <div className="relative z-10 px-6 max-w-7xl w-full flex flex-col items-center">

                    {/* BEFORE */}
                    <motion.div
                        style={{ opacity: opacityBefore, y: yBefore, scale: scaleBefore }}
                        className="absolute text-center"
                    >
                        <div className="inline-block px-4 py-1.5 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                            <span className="text-white/40 text-xs font-mono uppercase tracking-[0.2em]">The Old Way</span>
                        </div>

                        <h2 className="text-5xl md:text-8xl font-black text-white/20 leading-[0.9] tracking-tighter mb-8 font-display">
                            Months <br />
                            learning <br />
                            syntax.
                        </h2>

                        <div className="flex flex-wrap justify-center gap-3 text-white/30 font-mono text-xs uppercase tracking-wider">
                            <span className="border-b border-white/10 pb-1">Tutorial Hell</span>
                            <span className="text-white/10">•</span>
                            <span className="border-b border-white/10 pb-1">Expensive Bootcamps</span>
                            <span className="text-white/10">•</span>
                            <span className="border-b border-white/10 pb-1">Burnout</span>
                        </div>
                    </motion.div>

                    {/* TRANSITION */}
                    <motion.div
                        style={{ opacity: opacityTransition }}
                        className="absolute text-center"
                    >
                        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-red-500 to-transparent mx-auto mb-8" />
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Zap className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                            The Shift
                        </h2>
                    </motion.div>

                    {/* AFTER */}
                    <motion.div
                        style={{ opacity: opacityAfter, y: yAfter, scale: scaleAfter }}
                        className="absolute text-center"
                    >
                        <div className="inline-block px-4 py-1.5 mb-8 border border-red-500/30 rounded-full bg-red-500/10 backdrop-blur-sm">
                            <span className="text-red-500 text-xs font-mono uppercase tracking-[0.2em] animate-pulse">The New Way</span>
                        </div>

                        <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 font-display">
                            Ship in <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">48 hours.</span>
                        </h2>

                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="px-4 py-2 bg-[#111] border border-white/10 rounded text-sm text-white/80">AI-First</span>
                            <span className="px-4 py-2 bg-[#111] border border-white/10 rounded text-sm text-white/80">Natural Language</span>
                            <span className="px-4 py-2 bg-[#111] border border-white/10 rounded text-sm text-white/80">Production Ready</span>
                        </div>
                    </motion.div>

                    {/* FINAL CTA */}
                    <motion.div
                        style={{ opacity: opacityFinal, scale: scaleFinal }}
                        className="absolute text-center max-w-4xl w-full"
                    >
                        <div className="relative bg-[#080808] border border-white/10 rounded-3xl p-12 md:p-20 overflow-hidden group">

                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,50,50,0.1),transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10 flex flex-col items-center">
                                <Rocket className="w-12 h-12 text-white mb-8" />
                                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                    Stop studying. <br /> Start building.
                                </h3>

                                <button className="mt-8 group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
                                    <span className="relative z-10">Start Learning Free</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TheShiftSection;
