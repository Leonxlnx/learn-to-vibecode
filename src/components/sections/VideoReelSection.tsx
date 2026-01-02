import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { MagneticText } from "@/components/awwwards/AnimatedText";

// SECTION 7: Video Reel - Full width, expands on scroll interaction
// ~20 animation points: scroll-based scale, play button hover, video controls

const VideoReelSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [48, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      <motion.div
        style={{ scale, borderRadius }}
        className="relative aspect-video md:aspect-[21/9] overflow-hidden bg-charcoal mx-4 md:mx-0"
      >
        {/* Video placeholder with poster */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=1600&q=80"
            alt="Video poster"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <MagneticText>
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="group relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-cream flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-cream"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {isPlaying ? (
                <Pause className="w-8 h-8 text-charcoal ml-0" />
              ) : (
                <Play className="w-8 h-8 text-charcoal ml-1" />
              )}
            </motion.button>
          </MagneticText>
        </div>

        {/* Video info overlay */}
        <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex justify-between items-end text-cream">
          <div>
            <span className="font-sans text-xs tracking-[0.2em] uppercase opacity-70">
              The Journey
            </span>
            <h3 className="font-display text-2xl md:text-4xl italic mt-1">
              A Film by Vibe Studios
            </h3>
          </div>
          <span className="font-sans text-sm opacity-70">2:45</span>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoReelSection;
