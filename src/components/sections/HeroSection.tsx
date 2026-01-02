import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText, MagneticText } from "@/components/awwwards/AnimatedText";
import AnimatedLine from "@/components/awwwards/AnimatedLine";

// SECTION 1: Hero - Fullscreen with massive stagger text + magnetic CTA
// ~50 animation points: character animations, parallax, magnetic buttons, line draws

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-24"
    >
      {/* Background subtle pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--charcoal)) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10">
        {/* Eyebrow text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-6"
        >
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground">
            Learn the Art of Vibe Coding
          </span>
        </motion.div>

        {/* Main headline - character by character reveal with skew */}
        <div className="mb-8">
          <AnimatedText
            text="Create with"
            className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-[-0.03em] text-foreground"
            type="chars"
            staggerDelay={0.02}
            skew
          />
          <AnimatedText
            text="Pure Intuition"
            className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-[-0.03em] text-foreground italic"
            type="chars"
            staggerDelay={0.02}
            skew
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-12"
        >
          A masterclass in building software that feels alive. 
          No frameworks, no rules—just you and the code, dancing.
        </motion.p>

        {/* Magnetic CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-wrap gap-6"
        >
          <MagneticText>
            <button className="group relative px-10 py-5 bg-foreground text-background font-sans text-sm tracking-wide uppercase overflow-hidden rounded-full">
              <span className="relative z-10">Begin Your Journey</span>
              <motion.div
                className="absolute inset-0 bg-terracotta"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              />
            </button>
          </MagneticText>

          <MagneticText>
            <button className="group px-10 py-5 border border-foreground text-foreground font-sans text-sm tracking-wide uppercase rounded-full hover:bg-foreground hover:text-background transition-colors duration-500">
              Watch the Reel
            </button>
          </MagneticText>
        </motion.div>
      </motion.div>

      {/* Animated decorative lines */}
      <div className="absolute bottom-24 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24">
        <AnimatedLine delay={1.8} />
      </div>

      {/* Bottom info row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 flex justify-between items-end text-sm text-muted-foreground font-sans"
      >
        <span className="tracking-wider">Est. 2024</span>
        <span className="tracking-wider">Scroll to Explore</span>
        <span className="tracking-wider">12 Chapters</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
