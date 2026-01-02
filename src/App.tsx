import { Box, Layers, Zap, Code, Cpu, Globe, MessageCircle, Twitter, Mail } from 'lucide-react';
import CardNav from '@/components/ui/CardNav';
import Hero from '@/components/sections/Hero';
import ProblemSection from '@/components/sections/ProblemSection';
import ContentSection from '@/components/sections/ContentSection';

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
          description: "Redefining digital education through motion.",
          span: "col-span-2",
          icon: <Globe size={18} />,
          color: "from-white/10 to-white/5"
        },
        {
          label: "The Team",
          description: "Creators & Engineers.",
          span: "col-span-1",
          icon: <Cpu size={18} />,
          color: "from-white/10 to-white/5"
        },
        {
          label: "Careers",
          description: "Join the movement.",
          span: "col-span-1",
          icon: <Zap size={18} />,
          color: "from-white/10 to-white/5"
        }
      ]
    },
    {
      label: "Products",
      links: [
        {
          label: "Vibecode Pro",
          description: "The ultimate creative development course.",
          span: "col-span-2",
          icon: <Layers size={18} />,
          color: "from-white/10 to-white/5"
        },
        {
          label: "Components",
          description: "Copy-paste magic.",
          span: "col-span-1",
          icon: <Box size={18} />,
          color: "from-white/10 to-white/5"
        },
        {
          label: "Templates",
          description: "Start faster.",
          span: "col-span-1",
          icon: <Code size={18} />,
          color: "from-white/10 to-white/5"
        }
      ]
    },
    {
      label: "Connect",
      links: [
        {
          label: "Community",
          description: "Join 10k+ developers.",
          span: "col-span-2",
          icon: <MessageCircle size={18} />,
          color: "from-white/10 to-white/5"
        },
        {
          label: "Twitter",
          description: "Updates.",
          span: "col-span-1",
          icon: <Twitter size={18} />,
          color: "from-white/10 to-white/5"
        },
        {
          label: "Email",
          description: "Contact us.",
          span: "col-span-1",
          icon: <Mail size={18} />,
          color: "from-white/10 to-white/5"
        }
      ]
    }
  ];

  return (
    <main className="bg-[#050505] text-primary selection:bg-white selection:text-black antialiased">
      <CardNav
        logoAlt="Learn2Vibecode"
        items={navItems}
        baseColor="#ffffff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <Hero />
      <ProblemSection />
      <ContentSection />
    </main>
  );
};

export default App;
