import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedText, MagneticText } from "@/components/awwwards/AnimatedText";
import AnimatedLine from "@/components/awwwards/AnimatedLine";

// SECTION 11: Reviews/Press - Staggered list with magnetic hover states
// ~30 animation points: staggered reveals, magnetic hovers, line draws

const ReviewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const reviews = [
    {
      quote: "This course fundamentally changed how I approach building interfaces. The motion principles alone were worth 10x the price.",
      author: "Sarah Chen",
      role: "Senior Developer at Stripe",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    {
      quote: "I've taken dozens of courses. This is the only one that taught me to feel the code, not just write it.",
      author: "Marcus Rivera",
      role: "Founding Engineer at Arc",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    {
      quote: "The difference in my portfolio before and after is night and day. I landed my dream job within weeks of finishing.",
      author: "Yuki Tanaka",
      role: "Design Engineer at Vercel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
  ];

  const press = [
    { name: "TechCrunch", text: "The future of developer education" },
    { name: "Awwwards", text: "Award-winning curriculum design" },
    { name: "Smashing Magazine", text: "Essential for modern developers" },
  ];

  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            07 / Testimonials
          </span>
          <AnimatedText
            text="What They Say"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em]"
            type="words"
            staggerDelay={0.1}
          />
        </div>

        {/* Reviews list */}
        <div className="space-y-0 mb-24">
          {reviews.map((review, i) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: i * 0.15, 
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] as const
              }}
            >
              <AnimatedLine delay={i * 0.15} />
              
              <MagneticText className="py-10 md:py-14">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                  {/* Avatar */}
                  <motion.img
                    src={review.avatar}
                    alt={review.author}
                    className="w-16 h-16 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    whileHover={{ scale: 1.1 }}
                  />

                  {/* Quote */}
                  <div className="flex-1">
                    <p className="font-display text-xl md:text-2xl italic leading-relaxed mb-6">
                      "{review.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="font-sans text-sm font-medium">
                        {review.author}
                      </span>
                      <span className="text-muted-foreground">—</span>
                      <span className="font-sans text-sm text-muted-foreground">
                        {review.role}
                      </span>
                    </div>
                  </div>
                </div>
              </MagneticText>
            </motion.div>
          ))}
          <AnimatedLine delay={0.45} />
        </div>

        {/* Press mentions */}
        <div className="text-center">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground mb-12 block">
            Featured In
          </span>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {press.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <MagneticText>
                  <span className="font-display text-2xl md:text-3xl italic group-hover:text-terracotta transition-colors duration-300">
                    {item.name}
                  </span>
                </MagneticText>
                <p className="font-sans text-xs text-muted-foreground mt-2">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
