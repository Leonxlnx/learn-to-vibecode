import { ScrollRevealText } from "@/components/awwwards/AnimatedText";
import AnimatedLine from "@/components/awwwards/AnimatedLine";

// SECTION 2: Manifesto - Big text with word-by-word reveal on scroll
// ~80 animation points: each word animates independently based on scroll

const ManifestoSection = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-6 mb-16">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground">
            01 / Manifesto
          </span>
          <AnimatedLine className="flex-1 max-w-[100px]" />
        </div>

        {/* Big manifesto text with scroll reveal */}
        <ScrollRevealText
          text="We believe code should breathe. Every function should feel intentional. Every component should respond to the rhythm of human interaction. This is not about following patterns. This is about creating them. Vibe coding is the art of building software that connects, that resonates, that lives."
          className="font-display text-[clamp(1.5rem,5vw,4rem)] leading-[1.3] tracking-[-0.02em] text-foreground"
        />

        {/* Author attribution */}
        <div className="mt-20 flex items-center gap-6">
          <AnimatedLine className="flex-1 max-w-[60px]" direction="right" delay={0.5} />
          <span className="font-sans text-sm tracking-wider text-muted-foreground">
            — The Philosophy
          </span>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
