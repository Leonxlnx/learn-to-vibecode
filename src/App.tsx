import { Box, Layers, Zap, Code, Cpu, Globe, MessageCircle, Twitter, Mail, DollarSign, BookOpen, Users } from 'lucide-react';
import CardNav from '@/components/ui/CardNav';
import Hero from '@/components/sections/Hero';
import WhatIsVibecodingSection from '@/components/sections/WhatIsVibecodingSection';
import TheShiftSection from '@/components/sections/TheShiftSection';
import ProphetSection from '@/components/sections/ProphetSection';
import TheToolsSection from '@/components/sections/TheToolsSection';
import ProblemSection from '@/components/sections/ProblemSection';
import CommunitySection from '@/components/sections/CommunitySection';
import CurriculumSection from '@/components/sections/CurriculumSection';
import CTASection from '@/components/sections/CTASection';
import FooterSection from '@/components/sections/FooterSection';
import RedAurora from '@/components/effects/RedAurora';

/**
 * Main App component for Learn2Vibecode landing page
 */
const App = () => {
  const navItems = [
    {
      label: "Mission",
      links: [
        {
          label: "Our Vision",
          description: "Redefining digital education.",
          href: "/vision",
          span: "col-span-2",
          icon: <Globe size={18} />,
          color: "from-red-500/10 to-white/5"
        },
        {
          label: "The Team",
          description: "Leon & Ulrik.",
          href: "/team",
          span: "col-span-1",
          icon: <Users size={18} />,
          color: "from-white/10 to-white/5"
        },
        {
          label: "Content",
          description: "How we teach.",
          href: "/content",
          span: "col-span-1",
          icon: <Cpu size={18} />,
          color: "from-white/10 to-white/5"
        }
      ]
    },
    {
      label: "Products",
      links: [
        {
          label: "Curriculum",
          description: "The complete course.",
          href: "/curriculum",
          span: "col-span-2",
          icon: <Layers size={18} />,
          color: "from-red-500/10 to-white/5"
        },
        {
          label: "Pricing",
          description: "Free & Pro plans.",
          href: "/pricing",
          span: "col-span-1",
          icon: <DollarSign size={18} />,
          color: "from-white/10 to-white/5"
        },
        {
          label: "Resources",
          description: "Tools & inspiration.",
          href: "/resources",
          span: "col-span-1",
          icon: <BookOpen size={18} />,
          color: "from-white/10 to-white/5"
        }
      ]
    },
    {
      label: "Connect",
      links: [
        {
          label: "Discord",
          description: "Join 20,000+ builders.",
          href: "https://discord.gg/xrCufejEa3",
          span: "col-span-2",
          icon: <MessageCircle size={18} />,
          color: "from-red-500/10 to-white/5"
        },
        {
          label: "Twitter",
          description: "Latest updates.",
          href: "https://x.com/LexnL89916",
          span: "col-span-1",
          icon: <Twitter size={18} />,
          color: "from-white/10 to-white/5"
        },
        {
          label: "Email",
          description: "Get in touch.",
          href: "mailto:leon.lin.privat@gmail.com",
          span: "col-span-1",
          icon: <Mail size={18} />,
          color: "from-white/10 to-white/5"
        }
      ]
    }
  ];

  return (
    <div className="relative w-full bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden selection:bg-red-500/30">
      {/* Global Aurora Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <RedAurora />
      </div>

      <CardNav
        logoAlt="Learn2Vibecode"
        items={navItems}
        baseColor="#ffffff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <main className="relative z-10">
        <Hero />
        <WhatIsVibecodingSection />
        <TheShiftSection />
        <ProphetSection />
        <TheToolsSection />
        <ProblemSection />
        <CommunitySection />
        <CurriculumSection />
        <CTASection />
        <FooterSection />
      </main>
    </div>
  );
};

export default App;
