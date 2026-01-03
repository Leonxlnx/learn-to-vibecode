import { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ArrowRight, Zap, Code, Rocket } from 'lucide-react';
import WireframeWave from '@/components/3d/WireframeWave';

/**
 * The Shift Section - Before/After Comparison
 * Shows the transformation from traditional coding to vibe coding
 */
const TheShiftSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 70 });

    // Before state animations
    const opacityBefore = useTransform(smoothProgress, [0.05, 0.2, 0.35], [0, 1, 0]);
    const yBefore = useTransform(smoothProgress, [0.05, 0.35], [80, -80]);
    const scaleBefore = useTransform(smoothProgress, [0.05, 0.2, 0.35], [0.9, 1, 0.95]);

    // Transition text
    const opacityTransition = useTransform(smoothProgress, [0.4, 0.5, 0.6], [0, 1, 0]);

    // After state animations
    const opacityAfter = useTransform(smoothProgress, [0.65, 0.8, 0.9], [0, 1, 0]);
    const yAfter = useTransform(smoothProgress, [0.65, 0.9], [60, -40]);
    const scaleAfter = useTransform(smoothProgress, [0.65, 0.8], [0.95, 1]);

    // Final CTA
    const opacityFinal = useTransform(smoothProgress, [0.88, 0.98], [0, 1]);
    const scaleFinal = useTransform(smoothProgress, [0.88, 1], [0.9, 1]);

    return (
        <section ref={containerRef} className="relative w-full h-[500vh] bg-[#050505] z-10">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Three.js Particle Background */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
                        <Suspense fallback={null}>
                            <WireframeWave />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-6">

                    {/* BEFORE - The Old Way */}
                    <motion.div
                        style={{ opacity: opacityBefore, y: yBefore, scale: scaleBefore }}
                        className="absolute text-center max-w-5xl"
                    >
                        <div className="inline-block px-4 py-2 mb-8 rounded-full border border-red-500/30 bg-red-500/10">
                            <span className="text-red-400 text-sm font-mono uppercase tracking-widest">The Old Way</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white/90 leading-[0.9] tracking-tight mb-8">
                            Months learning<br />
                            <span className="text-white/40">frameworks.</span>
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 text-white/50 font-mono text-sm">
                            <span className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">6+ months bootcamp</span>
                            <span className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">$15k+ courses</span>
                            <span className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">Tutorial hell</span>
                        </div>
                    </motion.div>

                    {/* TRANSITION - The Shift */}
                    <motion.div
                        style={{ opacity: opacityTransition }}
                        className="absolute text-center"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-32 h-32 mx-auto mb-8 rounded-full border border-white/20 flex items-center justify-center"
                        >
                            <Zap className="w-12 h-12 text-white" />
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 uppercase tracking-tight">
                            The Shift
                        </h2>
                    </motion.div>

                    {/* AFTER - The New Way */}
                    <motion.div
                        style={{ opacity: opacityAfter, y: yAfter, scale: scaleAfter }}
                        className="absolute text-center max-w-5xl"
                    >
                        <div className="inline-block px-4 py-2 mb-8 rounded-full border border-emerald-500/30 bg-emerald-500/10">
                            <span className="text-emerald-400 text-sm font-mono uppercase tracking-widest">The New Way</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8">
                            Ship your MVP<br />
                            <span className="text-emerald-400">in 48 hours.</span>
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 text-white/70 font-mono text-sm">
                            <span className="px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/30 text-emerald-400">AI-powered</span>
                            <span className="px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/30 text-emerald-400">Free course</span>
                            <span className="px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/30 text-emerald-400">Real projects</span>
                        </div>
                    </motion.div>

                    {/* FINAL CTA */}
                    <motion.div
                        style={{ opacity: opacityFinal, scale: scaleFinal }}
                        className="absolute text-center max-w-3xl w-full pointer-events-auto px-4"
                    >
                        <div className="group relative rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl p-1">
                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                            <div className="relative bg-[#0a0a0a] rounded-[1.8rem] p-12 md:p-16">
                                <Rocket className="w-16 h-16 text-white/80 mx-auto mb-8" />
                                <h3 className="text-3xl md:text-5xl text-white font-bold leading-tight mb-6 tracking-tight">
                                    Ready to make the shift?
                                </h3>
                                <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">
                                    Join thousands of creators who've already transformed how they build.
                                </p>
                                <button className="group/btn relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black text-lg font-bold uppercase tracking-wider rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                    <span className="relative z-10">Start Learning</span>
                                    <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
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
