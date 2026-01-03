import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * The Shift Section - GSAP PIN FIX
 * Using GSAP's native pin for reliable sticky scroll
 */
const TheShiftSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const beforeRef = useRef<HTMLDivElement>(null);
    const afterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const container = containerRef.current;
            const before = beforeRef.current;
            const after = afterRef.current;

            if (!section || !container || !before || !after) return;

            // Pin the container
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: '+=200%',
                pin: container,
                pinSpacing: true,
                scrub: 1
            });

            // Before -> Fade out
            gsap.to(before, {
                opacity: 0,
                scale: 0.8,
                filter: 'blur(20px)',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=50%',
                    scrub: 1
                }
            });

            // After -> Fade in
            gsap.fromTo(after,
                { opacity: 0, scale: 0.9, y: 80 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: section,
                        start: '40% top',
                        end: '+=60%',
                        scrub: 1
                    }
                }
            );

            // Background parallax
            const scatterElements = section.querySelectorAll('.scatter-text');
            scatterElements.forEach((el, i) => {
                gsap.to(el, {
                    y: -150 * (i + 1) * 0.5,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full min-h-[300vh] bg-[#030303] z-10 font-sans">

            {/* Pinned Container */}
            <div ref={containerRef} className="h-screen w-full overflow-hidden flex items-center justify-center relative">

                {/* Background: Scattered Terms */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
                    <div className="scatter-text absolute top-[20%] left-[8%] text-6xl text-white/10 font-serif italic -rotate-12 whitespace-nowrap">
                        Ugly Colors
                    </div>
                    <div className="scatter-text absolute bottom-[25%] right-[8%] text-7xl text-white/10 font-sans font-black rotate-6 whitespace-nowrap">
                        Bad UX
                    </div>
                    <div className="scatter-text absolute bottom-[30%] left-[12%] text-5xl text-white/10 font-mono -rotate-3 whitespace-nowrap">
                        No Soul
                    </div>

                    {/* Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
                </div>

                <div className="relative z-10 px-6 max-w-6xl w-full">

                    {/* BEFORE - The "Bad" Design */}
                    <div ref={beforeRef} className="absolute inset-0 flex flex-col items-center justify-center text-center gap-12">
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
                    </div>


                    {/* AFTER - Vibecoding */}
                    <div ref={afterRef} className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0">
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
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TheShiftSection;
