import { motion } from "framer-motion";
import { Code2, Zap, Users, Trophy, Video, BookOpen } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "HD Video Lessons",
    description: "Crystal clear, bite-sized videos you can watch anywhere. No fluff, just the good stuff.",
  },
  {
    icon: Code2,
    title: "Hands-On Projects",
    description: "Build real apps from day one. Learn by doing, not just watching.",
  },
  {
    icon: Zap,
    title: "AI-Powered Help",
    description: "Stuck? Our AI mentor is available 24/7 to guide you through any challenge.",
  },
  {
    icon: Users,
    title: "Vibe Community",
    description: "Join a supportive community of learners. Code together, grow together.",
  },
  {
    icon: BookOpen,
    title: "Updated Content",
    description: "Always learning the latest tech. We update our curriculum monthly.",
  },
  {
    icon: Trophy,
    title: "Certificates",
    description: "Earn recognized certificates to showcase your skills to employers.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Learn with{" "}
            <span className="gradient-text">Vibe Code</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We've reimagined how coding should be taught. Less stress, more success.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
