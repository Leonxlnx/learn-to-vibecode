import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Image with parallax, Ken Burns idle animation, and hover effects
// ~10 animation points per image: parallax, scale, saturation, border-radius

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  parallaxSpeed?: number; // -1 to 1, negative = slower than scroll
  kenBurns?: boolean;
  hoverEffect?: boolean;
}

const ParallaxImage = ({
  src,
  alt,
  className = "",
  parallaxSpeed = 0.2,
  kenBurns = true,
  hoverEffect = true,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax movement
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-50 * parallaxSpeed}%`, `${50 * parallaxSpeed}%`]
  );

  const ySpring = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        style={{ y: ySpring }}
        className="w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${kenBurns ? "ken-burns" : ""}`}
          animate={{
            scale: hoverEffect && isHovered ? 1.05 : 1,
            filter: hoverEffect && isHovered ? "saturate(0.3)" : "saturate(1)",
            borderRadius: hoverEffect && isHovered ? "2rem" : "0",
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

// Fixed aspect ratio parallax image container
export const ParallaxImageContainer = ({
  src,
  alt,
  aspectRatio = "4/3",
  className = "",
  parallaxSpeed = 0.2,
}: ParallaxImageProps & { aspectRatio?: string }) => {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio }}>
      <ParallaxImage
        src={src}
        alt={alt}
        className="absolute inset-0"
        parallaxSpeed={parallaxSpeed}
      />
    </div>
  );
};

export default ParallaxImage;
