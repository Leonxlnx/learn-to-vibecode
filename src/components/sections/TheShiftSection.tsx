import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, XCircle, LayoutGrid, Palette } from 'lucide-react';

/**
 * The Shift Section - The Evolution
 * REFINED: Sans-Serif, Specific "Bad" Design Traits, focus on Perfection.
 */
const TheShiftSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 70 });

    // Adjusted ranges
    const opacityBefore = useTransform(smoothProgress, [0, 0.2, 0.35], [1, 1, 0]);
    const scaleBefore = useTransform(smoothProgress, [0, 0.3], [1, 0.9]);
    const blurBefore = useTransform(smoothProgress, [0.2, 0.35], [0, 10]);

    const opacityTransition = useTransform(smoothProgress, [0.35, 0.45, 0.55], [0, 1, 0]);

    const opacityAfter = useTransform(smoothProgress, [0.55, 0.7, 0.9], [0, 1, 1]); // Stays visible longer
    const scaleAfter = useTransform(smoothProgress, [0.55, 0.8], [0.95, 1]);
    const yAfter = useTransform(smoothProgress, [0.55, 0.8], [50, 0]); // Moves up into place

    return (
        <section ref={containerRef} className="relative w-full h-[350vh] bg-[#030303] z-10 font-sans">

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

                    {/* BEFORE - The "Bad" Design Traits */}
                    <motion.div
                        style={{ opacity: opacityBefore, scale: scaleBefore, filter: `blur(${blurBefore}px)` }}
                        className="absolute flex flex-col items-center text-center"
                    >
                        <div className="mb-6 px-4 py-1 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em]">The Old Way</span>
                        </div>

                        <h2 className="text-5xl md:text-8xl font-bold text-white/20 leading-[1.1] tracking-tighter mb-12">
                            <span className="line-through decoration-red-500/50 decoration-4">Purple Gradient</span><br />
                            <span className="line-through decoration-red-500/50 decoration-4">Wrong Alignment</span><br />
                            <span className="line-through decoration-red-500/50 decoration-4">Too Generic</span>
                        </h2>

                        <div className="flex gap-12 text-white/20 font-mono text-sm uppercase tracking-widest">
                            <div className="flex flex-col items-center gap-3">
                                <Palette size={24} />
                                <span>Ugly Colors</span>
                            </div>
                            <div className="w-[1px] h-12 bg-white/10" />
                            <div className="flex flex-col items-center gap-3">
                                <LayoutGrid size={24} />
                                <span>Bad UX</span>
                            </div>
                            <div className="w-[1px] h-12 bg-white/10" />
                            <div className="flex flex-col items-center gap-3">
                                <XCircle size={24} />
                                <span>No Soul</span>
                            </div>
                        </div>
                    </motion.div>


                    {/* TRANSITION - The Shift Icon */}
                    <motion.div
                        style={{ opacity: opacityTransition }}
                        className="absolute text-center"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full"
                            />
                            <div className="relative flex flex-col items-center">
                                <span className="text-6xl md:text-8xl font-black text-white tracking-tighter">THE SHIFT</span>
                                <span className="text-red-500 font-mono text-sm tracking-[0.5em] mt-2">UPGRADING...</span>
                            </div>
                        </div>
                    </motion.div>


                    {/* AFTER - Perfection */}
                    <motion.div
                        style={{ opacity: opacityAfter, scale: scaleAfter, y: yAfter }}
                        className="absolute flex flex-col items-center text-center w-full"
                    >
                        <div className="mb-8 px-4 py-1 border border-red-500/30 rounded-full bg-red-500/10 backdrop-blur-sm">
                            <span className="text-red-500 text-[10px] font-mono uppercase tracking-[0.3em]">Vibe Code Protocol</span>
                        </div>

                        <h2 className="text-6xl md:text-[100px] font-black text-white leading-[0.9] tracking-tighter mb-8 font-sans">
                            PERFECT<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">AESTHETICS.</span>
                        </h2>

                        <p className="text-white/50 text-xl md:text-2xl font-light max-w-2xl mb-12">
                            From beginners to pros.<br />
                            <span className="text-white font-normal">Go from idea to masterpiece.</span>
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-10 py-5 bg-white text-black font-bold text-lg uppercase tracking-widest rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                        >
                            <div className="absolute inset-0 bg-red-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                                Get the Course <ArrowRight size={20} />
                            </span>
                        </motion.button>
                        <span className="mt-4 text-xs text-white/30 font-mono uppercase tracking-widest">100% Free • Open Source</span>

                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TheShiftSection;
