import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText, MagneticText } from "@/components/awwwards/AnimatedText";
import AnimatedLine from "@/components/awwwards/AnimatedLine";

// SECTION 12: Footer - Massive interactive link covering the whole screen bottom
// ~35 animation points: parallax reveal, magnetic CTA, character animations

const FooterSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const links = [
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
  ];

  const footerLinks = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer
      ref={containerRef}
      className="relative min-h-screen bg-foreground text-background flex flex-col justify-end overflow-hidden"
    >
      {/* Main CTA section */}
      <motion.div
        style={{ y, opacity }}
        className="flex-1 flex flex-col items-center justify-center px-6 py-32"
      >
        <span className="font-sans text-sm tracking-[0.3em] uppercase opacity-50 mb-8">
          Ready to Begin?
        </span>

        <MagneticText className="text-center mb-12">
          <AnimatedText
            text="Start Your"
            className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-[-0.03em]"
            type="chars"
            staggerDelay={0.02}
            skew
          />
          <AnimatedText
            text="Journey"
            className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-[-0.03em] italic"
            type="chars"
            staggerDelay={0.02}
            skew
          />
        </MagneticText>

        <MagneticText>
          <motion.button
            className="group relative px-16 py-6 bg-background text-foreground font-sans text-sm tracking-wide uppercase overflow-hidden rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Enroll Now — $299</span>
            <motion.div
              className="absolute inset-0 bg-terracotta"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            />
          </motion.button>
        </MagneticText>

        <p className="mt-8 font-sans text-sm opacity-50 text-center max-w-md">
          30-day money-back guarantee. Lifetime access to all materials.
        </p>
      </motion.div>

      {/* Bottom footer */}
      <div className="px-6 md:px-12 lg:px-24 pb-8">
        <AnimatedLine color="hsl(var(--background) / 0.2)" />
        
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
              <span className="text-foreground font-display text-lg">V</span>
            </div>
            <span className="font-display text-xl italic">
              Vibe Code
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <MagneticText key={link.label}>
                <a
                  href={link.href}
                  className="font-sans text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </a>
              </MagneticText>
            ))}
          </div>

          {/* Footer links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-xs opacity-50 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-4">
          <span className="font-sans text-xs opacity-30">
            © 2024 Learn to Vibe Code. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
