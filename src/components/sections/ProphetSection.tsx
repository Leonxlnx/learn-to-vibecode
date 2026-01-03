import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidGlitchImage from '@/components/animations/LiquidGlitchImage';

gsap.registerPlugin(ScrollTrigger);

/**
 * Prophet Section - Enhanced with GSAP animations
 * Features: Underline animation, text reveals, professional scroll effects
 */
const ProphetSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const quoteRef = useRef<HTMLQuoteElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Quote animation - word by word
            if (quoteRef.current) {
                const words = quoteRef.current.querySelectorAll('.word');
                gsap.fromTo(words,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.05,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: quoteRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }

            // Name underline animation
            if (nameRef.current) {
                const underline = nameRef.current.querySelector('.underline-anim');
                gsap.fromTo(underline,
                    { scaleX: 0, transformOrigin: 'left center' },
                    {
                        scaleX: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: nameRef.current,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );

                gsap.fromTo(nameRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        scrollTrigger: {
                            trigger: nameRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const wrapWords = (text: string) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
        ));
    };

    return (
        <section ref={sectionRef} className="relative w-full py-40 bg-[#0a0a0a] overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-red-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
                        The Prophet
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        A NEW ERA
                    </h2>
                </motion.div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Image with Glitch */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-square rounded-3xl overflow-hidden border border-white/10"
                    >
                        <LiquidGlitchImage
                            imgNormal="/images/karpathy-normal.png"
                            imgGlitch="/images/karpathy-glitch.png"
                            alt="Andrej Karpathy"
                            physics="elastic"
                        />
                    </motion.div>

                    {/* Quote */}
                    <div className="flex flex-col justify-center">
                        <blockquote ref={quoteRef} className="text-2xl md:text-4xl font-medium text-white leading-relaxed mb-12">
                            "{wrapWords("There's a new kind of coding emerging. It requires a radically different mindset. And it will define the next generation of builders.")}"
                        </blockquote>

                        <div ref={nameRef} className="relative inline-block">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[2px] bg-red-500" />
                                <div>
                                    <p className="text-white font-bold text-lg relative inline-block">
                                        Andrej Karpathy
                                        <span className="underline-anim absolute bottom-0 left-0 w-full h-[2px] bg-red-500" />
                                    </p>
                                    <p className="text-white/40 text-sm font-mono uppercase tracking-wider mt-1">
                                        OpenAI Co-Founder • Former Tesla AI
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProphetSection;
