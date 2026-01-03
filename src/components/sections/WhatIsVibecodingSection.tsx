import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Layout, Code2, GraduationCap, Lightbulb } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TargetCard = ({ title, subtitle, desc, icon: Icon, index }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", backgroundBlendMode: 'overlay', backgroundSize: '200px' }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-white">
                <Icon size={24} strokeWidth={1.5} />
            </div>

            <span className="text-red-500 font-mono text-xs uppercase tracking-widest mb-2 block">
                {subtitle}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {title}
            </h3>
            <p className="text-white/50 leading-relaxed font-light">
                {desc}
            </p>
        </div>
    </motion.div>
);

const WhatIsVibecodingSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            if (headerRef.current) {
                const words = headerRef.current.querySelectorAll('.word');
                gsap.fromTo(words,
                    { opacity: 0, y: 30, filter: 'blur(10px)' },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        stagger: 0.08,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }

            // Description animation
            if (descRef.current) {
                const words = descRef.current.querySelectorAll('.word');
                gsap.fromTo(words,
                    { opacity: 0, filter: 'blur(4px)' },
                    {
                        opacity: 1,
                        filter: 'blur(0px)',
                        stagger: 0.02,
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: descRef.current,
                            start: 'top 75%',
                            end: 'bottom 60%',
                            scrub: 1
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

            {/* Background Ambience - positioned lower */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-red-900/15 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* What is Vibecoding Header */}
                <div className="text-center mb-16">
                    <div ref={headerRef}>
                        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                            {wrapWords("WHAT IS")} <span className="word inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">VIBECODING?</span>
                        </h2>
                    </div>
                </div>

                {/* Description with ScrollReveal effect */}
                <div className="text-center mb-32 max-w-4xl mx-auto">
                    <p ref={descRef} className="text-xl md:text-2xl text-white/60 leading-relaxed font-light mb-8">
                        {wrapWords("Vibecoding is the art of building software by orchestrating AI. Instead of writing every line, you think in logic, describe what you need, and let AI handle the syntax. It's faster, cleaner, and way more fun.")}
                    </p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-lg text-white/30"
                    >
                        No more getting stuck on semicolons or CSS grids. Focus on what matters: the product.
                    </motion.p>
                </div>


                {/* Made for Builders Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 satisfies number }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        MADE FOR <span className="text-red-500">BUILDERS.</span>
                    </h3>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TargetCard
                        title="Entrepreneurs"
                        subtitle="Idea to App in 48h"
                        desc="Stop funding agencies. Build your own MVP this weekend and iterate instantly based on feedback."
                        icon={Sparkles}
                        index={0}
                    />
                    <TargetCard
                        title="Junior Devs"
                        subtitle="Skip Junior Hell"
                        desc="Don't just write functions. Architect systems. Become the developer that everyone wants to hire."
                        icon={Code2}
                        index={1}
                    />
                    <TargetCard
                        title="Designers & PMs"
                        subtitle="Make it Real"
                        desc="Stop handing off Figma files. Build the actual product and show them exactly how it should work."
                        icon={Layout}
                        index={2}
                    />
                    <TargetCard
                        title="Teachers"
                        subtitle="Teach the Future"
                        desc="Prepare your students for the real world. Show them how modern software is actually built."
                        icon={GraduationCap}
                        index={3}
                    />
                    <TargetCard
                        title="Learners"
                        subtitle="Start from Zero"
                        desc="No coding background? No problem. If you can think logically, you can build software."
                        icon={Lightbulb}
                        index={4}
                    />
                    <TargetCard
                        title="Creators"
                        subtitle="Ship Your Ideas"
                        desc="Turn your creative vision into real products. No more waiting for developers."
                        icon={Zap}
                        index={5}
                    />
                </div>

            </div>
        </section>
    );
};

export default WhatIsVibecodingSection;
