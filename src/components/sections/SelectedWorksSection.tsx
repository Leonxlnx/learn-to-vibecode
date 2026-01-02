import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText } from "@/components/awwwards/AnimatedText";
import { ArrowRight } from "lucide-react";

// SECTION 9: Selected Works - Horizontal scroll section with sticky container
// ~35 animation points: horizontal scroll, image parallax, hover effects

const SelectedWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Convert vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const works = [
    {
      title: "E-Commerce Platform",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      year: "2024",
    },
    {
      title: "Portfolio Experience",
      category: "Creative Site",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      year: "2024",
    },
    {
      title: "SaaS Dashboard",
      category: "Product Design",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      year: "2023",
    },
    {
      title: "Mobile Experience",
      category: "App Design",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      year: "2023",
    },
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      {/* Sticky horizontal scroll container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Section header */}
        <div className="px-6 md:px-12 lg:px-24 mb-12">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            05 / Student Works
          </span>
          <AnimatedText
            text="What They Built"
            className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em]"
            type="words"
            staggerDelay={0.08}
          />
        </div>

        {/* Horizontal scrolling works */}
        <motion.div
          style={{ x }}
          className="flex gap-8 px-6 md:px-12 lg:px-24"
        >
          {works.map((work, i) => (
            <motion.div
              key={work.title}
              className="group relative flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Work image */}
              <div className="aspect-[4/3] overflow-hidden rounded-3xl organic-shadow-lg mb-6">
                <motion.img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                />
              </div>

              {/* Work info */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    {work.category}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl italic group-hover:text-terracotta transition-colors duration-300">
                    {work.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-sans text-sm text-muted-foreground">
                    {work.year}
                  </span>
                  <motion.div
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--foreground))" }}
                  >
                    <ArrowRight className="w-4 h-4 group-hover:text-background transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24">
          <div className="h-[1px] bg-border">
            <motion.div
              className="h-full bg-foreground origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorksSection;
