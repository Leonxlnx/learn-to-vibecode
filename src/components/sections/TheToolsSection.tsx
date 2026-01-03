import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * The Tools Section
 * - 3 Horizontal Images
 * - Tool names spread full width with premium typography
 */
const TheToolsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const rows = [
        {
            img: "/images/6ai1.png",
            tools: ["Qwen", "ChatGPT", "Claude", "Grok", "Deepseek", "Z.ai"]
        },
        {
            img: "/images/6ai2.png",
            tools: ["Gemini", "Kimi", "Minimax", "Cursor", "VSCode", "Windsurf"]
        },
        {
            img: "/images/6ai3.png",
            tools: ["Base44", "Bolt.new", "Lovable", "Antigravity", "v0", "Copilot"]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate each row on scroll
            const rowElements = sectionRef.current?.querySelectorAll('.tool-row');
            rowElements?.forEach((row, i) => {
                gsap.fromTo(row,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-32 bg-[#030303] overflow-hidden">

            {/* Header */}
            <div className="text-center mb-20 px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase"
                >
                    The Tools
                </motion.h2>
            </div>

            {/* Images + Tool Names */}
            <div className="w-full space-y-20">
                {rows.map((row, i) => (
                    <div key={i} className="tool-row space-y-8">
                        {/* Image - Full Width */}
                        <div className="w-full px-4 md:px-8">
                            <div className="relative w-full aspect-[5/1] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-[#080808]">
                                <img
                                    src={row.img}
                                    alt={`AI Tools Interface ${i + 1}`}
                                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>
                        </div>

                        {/* Tool Names - Full Width Spread */}
                        <div className="w-full px-4 md:px-16 lg:px-32">
                            <div className="flex justify-between items-center">
                                {row.tools.map((tool, j) => (
                                    <span
                                        key={j}
                                        className="text-white/50 hover:text-white text-sm md:text-xl lg:text-2xl font-semibold tracking-tight transition-colors cursor-default"
                                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default TheToolsSection;
