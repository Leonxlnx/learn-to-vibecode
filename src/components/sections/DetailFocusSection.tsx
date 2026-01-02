import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParallaxImage from "@/components/awwwards/ParallaxImage";
import AnimatedLine from "@/components/awwwards/AnimatedLine";
import { AnimatedText } from "@/components/awwwards/AnimatedText";

// SECTION 5: Detail Focus - Huge macro shot with sticky floating text descriptions
// ~30 animation points: sticky positioning, parallax, text reveals

const DetailFocusSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

  const details = [
    { title: "Precision", description: "Every pixel intentional" },
    { title: "Rhythm", description: "Flow that feels natural" },
    { title: "Depth", description: "Layers that breathe" },
  ];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-card">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Full-bleed macro image */}
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
            alt="Abstract macro detail"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </motion.div>

        {/* Floating text descriptions */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex items-center"
        >
          <div className="px-6 md:px-12 lg:px-24 max-w-2xl">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8 block">
              02 / The Details
            </span>

            <AnimatedText
              text="In the Details"
              className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] tracking-[-0.03em] mb-12"
              type="words"
              staggerDelay={0.08}
            />

            <div className="space-y-8">
              {details.map((detail, i) => (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: i * 0.15, 
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1] as const
                  }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-sans text-xs tracking-wider text-muted-foreground">
                      0{i + 1}
                    </span>
                    <AnimatedLine className="w-12" delay={i * 0.2} />
                    <span className="font-display text-2xl md:text-3xl italic">
                      {detail.title}
                    </span>
                  </div>
                  <p className="mt-2 ml-[4.5rem] text-muted-foreground font-sans">
                    {detail.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DetailFocusSection;
