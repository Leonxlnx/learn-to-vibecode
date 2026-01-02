import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AnimatedText } from "@/components/awwwards/AnimatedText";
import AnimatedLine from "@/components/awwwards/AnimatedLine";

// SECTION 8: Materials - 3-column layout with 3D tilt cards based on mouse position
// ~45 animation points: 3D tilt per card (rotateX, rotateY, scale), hover states

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const MaterialsSection = () => {
  const materials = [
    {
      title: "Video Lessons",
      count: "48",
      description: "Deep-dive tutorials covering every aspect of intuitive development",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
    },
    {
      title: "Code Templates",
      count: "120+",
      description: "Production-ready components and patterns you can use immediately",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    },
    {
      title: "Live Sessions",
      count: "Weekly",
      description: "Real-time coding sessions where we build together as a community",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    },
  ];

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              04 / Materials
            </span>
            <AnimatedText
              text="What You Get"
              className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em]"
              type="words"
              staggerDelay={0.1}
            />
          </div>
          <p className="max-w-md text-muted-foreground font-sans leading-relaxed">
            Everything you need to master the art of building software that feels alive.
          </p>
        </div>

        {/* 3-column tilt cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {materials.map((material, i) => (
            <TiltCard key={material.title}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: i * 0.1, 
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1] as const
                }}
                viewport={{ once: true }}
                className="group bg-background rounded-3xl overflow-hidden organic-shadow"
              >
                {/* Card image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={material.image}
                    alt={material.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Card content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-5xl text-terracotta">
                      {material.count}
                    </span>
                    <AnimatedLine className="flex-1 mx-6" delay={i * 0.1} />
                  </div>
                  <h3 className="font-display text-2xl italic mb-3">
                    {material.title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                    {material.description}
                  </p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;
