import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedText } from "@/components/awwwards/AnimatedText";
import AnimatedLine from "@/components/awwwards/AnimatedLine";
import { Plus, Minus } from "lucide-react";

// SECTION 10: The Team/Process - Hover-reveal accordion with physics
// ~40 animation points: accordion expand/collapse, content reveals, icon rotations

const ProcessSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const processes = [
    {
      number: "01",
      title: "Foundation",
      duration: "Week 1-2",
      description: "Master the fundamentals of React, TypeScript, and modern tooling. Build a solid mental model of how components think and breathe.",
      details: ["Component Architecture", "State Management Patterns", "Type-Safe Development"],
    },
    {
      number: "02",
      title: "Motion",
      duration: "Week 3-4",
      description: "Learn to choreograph motion that feels natural. From micro-interactions to full page transitions, every movement has meaning.",
      details: ["Framer Motion Deep Dive", "Scroll-Based Animations", "Gesture Recognition"],
    },
    {
      number: "03",
      title: "Systems",
      duration: "Week 5-6",
      description: "Build design systems that scale. Create reusable patterns that maintain consistency across any project size.",
      details: ["Design Token Architecture", "Component Libraries", "Documentation Practices"],
    },
    {
      number: "04",
      title: "Polish",
      duration: "Week 7-8",
      description: "The final 10% that makes all the difference. Accessibility, performance, and the subtle touches that separate good from exceptional.",
      details: ["Performance Optimization", "Accessibility Deep Dive", "Production Deployment"],
    },
  ];

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            06 / The Process
          </span>
          <AnimatedText
            text="Your Journey"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em]"
            type="words"
            staggerDelay={0.1}
          />
        </div>

        {/* Accordion items */}
        <div className="space-y-0">
          {processes.map((process, i) => (
            <motion.div
              key={process.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <AnimatedLine delay={i * 0.1} />
              
              <motion.button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex items-center gap-8">
                  <span className="font-sans text-sm tracking-wider text-muted-foreground">
                    {process.number}
                  </span>
                  <span className="font-display text-3xl md:text-4xl italic group-hover:text-terracotta transition-colors duration-300">
                    {process.title}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="hidden md:block font-sans text-sm text-muted-foreground">
                    {process.duration}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center"
                  >
                    {openIndex === i ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      height: { type: "spring", stiffness: 300, damping: 35 },
                      opacity: { duration: 0.2 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-[4.5rem] md:pl-[5.5rem] pr-12">
                      <p className="text-muted-foreground font-sans leading-relaxed mb-6 max-w-2xl">
                        {process.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {process.details.map((detail, j) => (
                          <motion.span
                            key={detail}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: j * 0.1 }}
                            className="px-4 py-2 bg-card rounded-full font-sans text-sm"
                          >
                            {detail}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <AnimatedLine delay={0.4} />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
