import { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ArrowRight } from 'lucide-react';
import WireframeWave from '@/components/3d/WireframeWave';

/**
 * Problem section with scroll-driven animations
 * Features parallax text reveals and particle background
 */
const ProblemSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 70 });

    // SLOWED DOWN ANIMATIONS (Wider Ranges)
    // Text 1: Purple Gradient
    const opacity1 = useTransform(smoothProgress, [0.05, 0.25, 0.3], [0, 1, 0]);
    const y1 = useTransform(smoothProgress, [0.05, 0.3], [100, -100]);

    // Text 2: Wrong Alignment (Appears later, stays longer)
    const opacity2 = useTransform(smoothProgress, [0.35, 0.5, 0.55], [0, 1, 0]);
    const y2 = useTransform(smoothProgress, [0.35, 0.55], [100, 0]);

    // Text 3: Too Generic
    const opacity3 = useTransform(smoothProgress, [0.6, 0.75, 0.8], [0, 1, 0]);
    const y3 = useTransform(smoothProgress, [0.6, 0.8], [50, -50]);

    // Final Card Reveal
    const opacityFinal = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
    const scaleFinal = useTransform(smoothProgress, [0.85, 1], [0.9, 1]);

    return (
        <section ref={containerRef} className="relative w-full h-[450vh] bg-[#050505] z-10">

            {/* --- STICKY BACKGROUND --- */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Three.js Layer */}
                <div className="absolute inset-0 z-10">
                    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
                        <Suspense fallback={null}>
                            <WireframeWave />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6">

                    {/* QUESTION 1: ACTUAL PURPLE GRADIENT */}
                    <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center">
                        <h2 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#6d28d9] via-[#d946ef] to-[#4c1d95] uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                            Purple Gradient?
                        </h2>
                    </motion.div>

                    {/* QUESTION 2: WRONG ALIGNMENT (Extreme skew/rotate) */}
                    <motion.div
                        style={{ opacity: opacity2, y: y2 }}
                        className="absolute right-0 md:right-[15%] top-[20%] rotate-[-5deg]"
                    >
                        <h2 className="text-6xl md:text-[8rem] font-serif italic text-white/90 translate-x-12 skew-x-12 origin-bottom-right">
                            Wrong Alignment?
                        </h2>
                    </motion.div>

                    {/* QUESTION 3: TOO GENERIC (Boring, Standard, Grey) */}
                    <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute text-center">
                        <h2 className="text-6xl md:text-8xl font-[Arial,sans-serif] font-normal text-[#555] tracking-tight">
                            Too Generic?
                        </h2>
                    </motion.div>

                    {/* FINAL PITCH - PREMIUM LIQUID METAL GLASS */}
                    <motion.div style={{ opacity: opacityFinal, scale: scaleFinal }} className="absolute text-center max-w-4xl w-full pointer-events-auto px-4">

                        <div className="group relative rounded-[2rem] bg-black/60 backdrop-blur-3xl transition-all duration-700">

                            {/* LIQUID METAL BORDER */}
                            <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50 group-hover:opacity-100 blur-sm transition-all duration-500" />
                            <div className="absolute -inset-[1px] rounded-[2rem] bg-[conic-gradient(from_0deg,transparent_0_300deg,white_360deg)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ maskImage: 'linear-gradient(black, black), linear-gradient(black, black)', maskClip: 'content-box, border-box', maskComposite: 'exclude', padding: '1px' }} />

                            {/* Inner Content Layer */}
                            <div className="relative z-10 p-12 md:p-24 bg-[#080808]/90 rounded-[2rem] border border-white/5 shadow-2xl">

                                <h3 className="text-3xl md:text-5xl text-white font-medium leading-tight mb-16 tracking-tight">
                                    This free course is perfect for you if you are new, if you have experience, or if you just want to refresh and get better.
                                </h3>

                                <button className="relative inline-flex items-center justify-center px-12 py-6 bg-white text-black text-lg font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                                    <span className="relative z-10 flex items-center gap-4">
                                        Visit
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                                    </span>
                                    {/* Liquid Fill Effect on Hover */}
                                    <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)]" />
                                </button>

                            </div>
                        </div>

                    </motion.div>

                </div>
            </div>

        </section>
    );
};

export default ProblemSection;
