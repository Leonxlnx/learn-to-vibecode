import { Suspense } from 'react';
import { motion, Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Bubble from '@/components/3d/Bubble';

/**
 * Hero section with animated 3D bubble background
 * Features staggered text animations and CTA button
 */
const Hero = () => {

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

    const letterVars: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.5 + i * 0.05,
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <>
            <section className="relative h-screen w-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                        <Suspense fallback={null}>
                            <Bubble />
                            <Environment preset="night" />
                            {/* @ts-ignore */}
                            <ambientLight intensity={0.5} />
                        </Suspense>
                    </Canvas>
                </div>

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

                        <div className="text-[14vw] flex">
                            {"VIBECODE".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVars}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, letterSpacing: "1em" }}
                            animate={{ opacity: 0.6, letterSpacing: "0.3em" }}
                            transition={{ duration: 2, delay: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                            className="font-sans text-[5vw] font-light mt-4"
                        >
                            PROPERLY
                        </motion.div>
                    </h1>

                    {/* CTA BUTTON */}
                    <div className="flex flex-col items-center gap-4 mt-12 pointer-events-auto">
                        <Link to="/auth">
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative flex items-center gap-4 px-12 py-5 bg-white text-black rounded-full overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(255,255,255,0.25)] transition-shadow duration-500"
                            >
                                <span className="relative z-10 text-sm font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-500">
                                    Start Learning
                                </span>
                                <ArrowRight className="relative z-10 w-4 h-4 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />

                                {/* Smooth Red Fill Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                            </motion.button>
                        </Link>

                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 3, duration: 1 }}
                            className="text-xs font-mono uppercase tracking-widest text-white/50"
                        >
                            Free Course
                        </motion.span>
                    </div>

                </motion.div>
            </section>
        </>
    );
};

export default Hero;
