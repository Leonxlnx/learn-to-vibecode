import { Suspense, lazy, useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Lazy load heavy Three.js components - only load when visible
const Canvas = lazy(() => import('@react-three/fiber').then(mod => ({ default: mod.Canvas })));
const Bubble = lazy(() => import('@/components/3d/Bubble'));

// Static placeholder while 3D loads
const BubblePlaceholder = () => (
    <div className="absolute inset-0 bg-gradient-radial from-red-900/20 via-transparent to-transparent" />
);

/**
 * Hero section with lazy-loaded 3D bubble background
 * Text renders immediately, 3D loads after initial paint
 */
const Hero = () => {
    const [show3D, setShow3D] = useState(false);

    // Defer 3D loading until after LCP
    useEffect(() => {
        // Wait for first paint, then load 3D
        const timer = requestIdleCallback(() => {
            setShow3D(true);
        }, { timeout: 2000 });

        return () => cancelIdleCallback(timer);
    }, []);

    const containerVars: Variants = {
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVars: Variants = {
        hidden: { y: 40, opacity: 0, filter: 'blur(10px)' },
        visible: {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        },
    };

    return (
        <>
            <section className="relative h-screen w-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
                {/* Static gradient placeholder - renders immediately for LCP */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-radial from-red-900/30 via-red-900/5 to-transparent" />
                </div>

                {/* 3D Canvas - lazy loaded after initial paint */}
                {show3D && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 z-0"
                    >
                        <Suspense fallback={<BubblePlaceholder />}>
                            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: false, powerPreference: 'high-performance' }}>
                                <Suspense fallback={null}>
                                    <Bubble />
                                    <ambientLight intensity={0.5} />
                                </Suspense>
                            </Canvas>
                        </Suspense>
                    </motion.div>
                )}

                {/* Text content - renders immediately */}
                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    animate="visible"
                    className="z-10 text-center mix-blend-exclusion pointer-events-none select-none px-4 flex flex-col items-center"
                >
                    <h1 className="leading-[0.85] font-black tracking-tighter flex flex-col items-center uppercase text-white">
                        <div className="flex items-baseline mb-[-1vw]">
                            <motion.span variants={itemVars} className="text-[12vw] font-sans">
                                LEARN
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, delay: 0.3 }}
                                className="font-serif italic font-normal lowercase text-[8vw] px-4"
                            >
                                to
                            </motion.span>
                        </div>

                        <div className="flex flex-wrap justify-center">
                            {'VIBECODE'.split('').map((letter, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: (idx: number) => ({
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                delay: 0.5 + idx * 0.05,
                                                duration: 0.8,
                                                ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
                                            },
                                        }),
                                    }}
                                    className="text-[18vw] md:text-[16vw]"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                    </h1>

                    <motion.p
                        variants={itemVars}
                        className="text-[clamp(1rem,2vw,1.5rem)] text-white/50 mt-8 max-w-xl font-light"
                    >
                        Master AI-assisted development. Build real projects.
                    </motion.p>

                    <motion.div
                        variants={itemVars}
                        className="mt-12 pointer-events-auto"
                    >
                        <Link
                            to="/auth"
                            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium text-lg hover:bg-white/90 transition-all"
                        >
                            Start Learning
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </>
    );
};

export default Hero;
