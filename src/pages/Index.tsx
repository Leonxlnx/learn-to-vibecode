import CustomCursor from "@/components/awwwards/CustomCursor";
import NoiseOverlay from "@/components/awwwards/NoiseOverlay";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import CollageGridSection from "@/components/sections/CollageGridSection";
import DetailFocusSection from "@/components/sections/DetailFocusSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import VideoReelSection from "@/components/sections/VideoReelSection";
import MaterialsSection from "@/components/sections/MaterialsSection";
import SelectedWorksSection from "@/components/sections/SelectedWorksSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FooterSection from "@/components/sections/FooterSection";

// AWWWARDS MAXIMALIST LANDING PAGE
// Total animation points: 200+ across 12 sections
// - Hero: ~50 (char animations, parallax, magnetic buttons)
// - Manifesto: ~80 (word-by-word scroll reveal)
// - Marquee: ~20 (infinite scroll loops)
// - Collage Grid: ~40 (parallax images, hover effects)
// - Detail Focus: ~30 (sticky scroll, reveals)
// - Philosophy: ~25 (line draws, text reveals)
// - Video Reel: ~20 (scroll scale, play button)
// - Materials: ~45 (3D tilt cards)
// - Selected Works: ~35 (horizontal scroll, hovers)
// - Process: ~40 (accordion physics)
// - Reviews: ~30 (magnetic hovers, stagger)
// - Footer: ~35 (parallax CTA, char animations)

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Global overlays - cursor and noise */}
      <CustomCursor />
      <NoiseOverlay />

      {/* The 12-section odyssey */}
      <main>
        {/* 1. Hero - Fullscreen, massive stagger text, magnetic CTA */}
        <HeroSection />

        {/* 2. Manifesto - Big text, word-by-word reveal on scroll */}
        <ManifestoSection />

        {/* 3. The Marquee - Infinite scrolling text loop */}
        <MarqueeSection />

        {/* 4. Collage Grid - Overlapping images with parallax */}
        <CollageGridSection />

        {/* 5. Detail Focus - Macro shot with sticky floating text */}
        <DetailFocusSection />

        {/* 6. Philosophy - Centered text with animated lines */}
        <PhilosophySection />

        {/* 7. Video Reel - Full width, expands on scroll */}
        <VideoReelSection />

        {/* 8. Materials - 3-column 3D tilt cards */}
        <MaterialsSection />

        {/* 9. Selected Works - Horizontal scroll section */}
        <SelectedWorksSection />

        {/* 10. The Process - Hover-reveal accordion */}
        <ProcessSection />

        {/* 11. Reviews - Staggered list with magnetic hovers */}
        <ReviewsSection />

        {/* 12. Footer - Massive interactive CTA */}
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
