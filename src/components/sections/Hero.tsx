import { Suspense } from 'react';
import { motion, Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { ArrowRight } from 'lucide-react';
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

                {/* WAITLIST BUTTON */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-auto mt-12 group relative flex items-center gap-4 px-9 py-4 bg-black/20 hover:bg-white/5 border border-white/10 rounded-full backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
                >
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors duration-300">
                        Join Early Access
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />

                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/5 group-hover:ring-white/20 transition-all duration-500" />

                    {/* Inner gradient for glass feel */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>

            </motion.div>
        </section>
    );
};

export default Hero;
