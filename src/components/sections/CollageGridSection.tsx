import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParallaxImage from "@/components/awwwards/ParallaxImage";
import { AnimatedText } from "@/components/awwwards/AnimatedText";

// SECTION 4: Collage Grid - Overlapping images with different parallax speeds
// ~40 animation points: each image has parallax, scale, saturation transforms

const CollageGridSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      alt: "Modern architecture",
    },
    {
      src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&q=80",
      alt: "Abstract light",
    },
    {
      src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&q=80",
      alt: "Fabric texture",
    },
    {
      src: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=800&q=80",
      alt: "Stone surface",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-20">
        <AnimatedText
          text="Visual"
          className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[-0.03em]"
          type="chars"
          staggerDelay={0.03}
        />
        <AnimatedText
          text="Exploration"
          className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[-0.03em] italic text-muted-foreground"
          type="chars"
          staggerDelay={0.03}
        />
      </div>

      {/* Collage grid with overlapping images */}
      <div className="max-w-7xl mx-auto relative h-[120vh]">
        {/* Image 1 - Large left */}
        <motion.div
          style={{ y: y1 }}
          className="absolute left-0 top-0 w-[55%] z-10"
        >
          <ParallaxImage
            src={images[0].src}
            alt={images[0].alt}
            className="aspect-[3/4] rounded-3xl overflow-hidden organic-shadow-lg"
            parallaxSpeed={0.3}
          />
        </motion.div>

        {/* Image 2 - Medium right top */}
        <motion.div
          style={{ y: y2, rotate }}
          className="absolute right-0 top-[15%] w-[40%] z-20"
        >
          <ParallaxImage
            src={images[1].src}
            alt={images[1].alt}
            className="aspect-[4/5] rounded-3xl overflow-hidden organic-shadow-lg"
            parallaxSpeed={-0.2}
          />
        </motion.div>

        {/* Image 3 - Small center */}
        <motion.div
          style={{ y: y3 }}
          className="absolute left-[30%] top-[50%] w-[35%] z-30"
        >
          <ParallaxImage
            src={images[2].src}
            alt={images[2].alt}
            className="aspect-square rounded-3xl overflow-hidden organic-shadow-lg"
            parallaxSpeed={0.4}
          />
        </motion.div>

        {/* Image 4 - Large right bottom */}
        <motion.div
          style={{ y: y1 }}
          className="absolute right-[5%] top-[60%] w-[45%] z-10"
        >
          <ParallaxImage
            src={images[3].src}
            alt={images[3].alt}
            className="aspect-[4/3] rounded-3xl overflow-hidden organic-shadow-lg"
            parallaxSpeed={-0.15}
          />
        </motion.div>

        {/* Floating text element */}
        <motion.div
          style={{ y: y2 }}
          className="absolute left-[10%] top-[75%] z-40"
        >
          <span className="font-display text-8xl md:text-9xl italic text-terracotta opacity-20">
            &
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default CollageGridSection;
