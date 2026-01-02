import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedLine from "@/components/awwwards/AnimatedLine";
import { AnimatedText } from "@/components/awwwards/AnimatedText";

// SECTION 6: Philosophy - Centered text with animated line separators
// ~25 animation points: text reveals, line draws, staggered items

const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const principles = [
    { number: "01", title: "Listen First", text: "Code responds to intention" },
    { number: "02", title: "Move Naturally", text: "Animation as expression" },
    { number: "03", title: "Build with Soul", text: "Craft over convention" },
  ];

  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-8"
        >
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground">
            03 / Philosophy
          </span>
        </motion.div>

        <AnimatedText
          text="Three Pillars"
          className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] tracking-[-0.03em] mb-4"
          type="chars"
          staggerDelay={0.03}
        />
        <AnimatedText
          text="of Vibe Coding"
          className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] tracking-[-0.03em] italic text-terracotta"
          type="chars"
          staggerDelay={0.03}
        />

        {/* Principles list */}
        <div className="mt-24 space-y-0">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
              className="group"
            >
              <AnimatedLine delay={0.4 + i * 0.15} direction="center" />
              
              <div className="py-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
                <span className="font-sans text-xs tracking-[0.2em] text-muted-foreground">
                  {principle.number}
                </span>
                <span className="font-display text-3xl md:text-4xl italic">
                  {principle.title}
                </span>
                <span className="hidden md:block text-muted-foreground">—</span>
                <span className="font-sans text-muted-foreground">
                  {principle.text}
                </span>
              </div>
            </motion.div>
          ))}
          <AnimatedLine delay={0.85} direction="center" />
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
