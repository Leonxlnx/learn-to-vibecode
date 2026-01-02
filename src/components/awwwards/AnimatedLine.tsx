import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Animated line that draws itself when scrolling into view
// ~3 animation points per line: width, opacity, transform

interface AnimatedLineProps {
  className?: string;
  direction?: "left" | "right" | "center";
  delay?: number;
  duration?: number;
  color?: string;
  thickness?: number;
}

const AnimatedLine = ({
  className = "",
  direction = "left",
  delay = 0,
  duration = 0.8,
  color = "hsl(var(--charcoal))",
  thickness = 1,
}: AnimatedLineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const variants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const originMap = {
    left: "left",
    right: "right",
    center: "center",
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={`w-full ${className}`}
      style={{
        height: thickness,
        backgroundColor: color,
        transformOrigin: originMap[direction],
      }}
    />
  );
};

// Vertical animated line
export const AnimatedLineVertical = ({
  className = "",
  delay = 0,
  duration = 0.8,
  color = "hsl(var(--charcoal))",
  thickness = 1,
}: AnimatedLineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{
        width: thickness,
        backgroundColor: color,
        transformOrigin: "top",
      }}
    />
  );
};

export default AnimatedLine;
