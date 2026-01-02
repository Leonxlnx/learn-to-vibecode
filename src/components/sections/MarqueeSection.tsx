import { motion } from "framer-motion";

// SECTION 3: The Marquee - Infinite scrolling text loop at high speed
// ~20 animation points: continuous infinite scroll animations

const MarqueeSection = () => {
  const marqueeItems = [
    "React",
    "TypeScript",
    "Motion",
    "Intuition",
    "Flow State",
    "Clean Code",
    "Beautiful UI",
    "User Experience",
    "Animation",
    "Design Systems",
  ];

  const MarqueeContent = () => (
    <>
      {marqueeItems.map((item, i) => (
        <span key={i} className="flex items-center mx-8">
          <span className="font-display text-[clamp(2rem,8vw,6rem)] italic whitespace-nowrap">
            {item}
          </span>
          <span className="mx-8 text-terracotta text-4xl">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <section className="py-16 overflow-hidden border-y border-border">
      {/* Top marquee - moves left */}
      <div className="flex">
        <motion.div
          className="flex"
          animate={{ x: [0, "-50%"] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <MarqueeContent />
          <MarqueeContent />
        </motion.div>
      </div>

      {/* Bottom marquee - moves right (outline text) */}
      <div className="flex mt-6">
        <motion.div
          className="flex"
          animate={{ x: ["-50%", 0] }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {[...Array(2)].map((_, setIndex) => (
            <span key={setIndex} className="flex">
              {marqueeItems.map((item, i) => (
                <span key={i} className="flex items-center mx-8">
                  <span 
                    className="font-display text-[clamp(2rem,8vw,6rem)] italic whitespace-nowrap"
                    style={{
                      WebkitTextStroke: "1px hsl(var(--foreground))",
                      color: "transparent",
                    }}
                  >
                    {item}
                  </span>
                  <span className="mx-8 text-stone text-4xl">◇</span>
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueeSection;
