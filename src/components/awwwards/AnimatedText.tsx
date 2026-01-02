import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Split text into characters/words with staggered animation
// Each text component = ~15-50 animation points depending on text length

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: "chars" | "words" | "lines";
  staggerDelay?: number;
  once?: boolean;
  skew?: boolean;
}

export const AnimatedText = ({
  text,
  className = "",
  type = "chars",
  staggerDelay = 0.03,
  once = true,
  skew = false,
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, margin: "-10%" });

  const splitText = () => {
    if (type === "words") {
      return text.split(" ").map((word, i) => ({ text: word, key: i }));
    }
    if (type === "lines") {
      return text.split("\n").map((line, i) => ({ text: line, key: i }));
    }
    return text.split("").map((char, i) => ({ text: char === " " ? "\u00A0" : char, key: i }));
  };

  const items = splitText();

  // Animation variants with skewX and rotateZ for editorial feel
  const charVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateZ: skew ? -5 : 0,
      skewX: skew ? 10 : 0,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateZ: 0,
      skewX: 0,
      transition: {
        delay: i * staggerDelay,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const, // out-expo
      },
    }),
  };

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <span className="inline-flex flex-wrap">
        {items.map((item, i) => (
          <motion.span
            key={item.key}
            custom={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={charVariants}
            className="inline-block origin-bottom-left"
            style={{ willChange: "transform, opacity" }}
          >
            {item.text}
            {type === "words" && i < items.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </span>
    </div>
  );
};

// Word-by-word reveal on scroll (for Manifesto section)
interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export const ScrollRevealText = ({ text, className = "" }: ScrollRevealTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <p className="flex flex-wrap gap-x-3 gap-y-2">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;

          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
};

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block transition-colors duration-300"
    >
      {children}
    </motion.span>
  );
};

// Magnetic text that responds to cursor
interface MagneticTextProps {
  children: React.ReactNode;
  className?: string;
}

export const MagneticText = ({ children, className = "" }: MagneticTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      data-magnetic
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedText;
