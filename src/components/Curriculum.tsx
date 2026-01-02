import { motion } from "framer-motion";
import { Check, Lock, ChevronRight } from "lucide-react";

const modules = [
  {
    number: "01",
    title: "Foundations",
    lessons: 12,
    duration: "4 hours",
    topics: ["HTML & CSS Basics", "JavaScript Fundamentals", "Developer Tools"],
    unlocked: true,
  },
  {
    number: "02",
    title: "React Essentials",
    lessons: 18,
    duration: "6 hours",
    topics: ["Components & Props", "State Management", "Hooks Deep Dive"],
    unlocked: true,
  },
  {
    number: "03",
    title: "Styling Like a Pro",
    lessons: 10,
    duration: "3 hours",
    topics: ["Tailwind CSS", "Animations", "Responsive Design"],
    unlocked: true,
  },
  {
    number: "04",
    title: "Full-Stack Vibes",
    lessons: 20,
    duration: "8 hours",
    topics: ["APIs & Data Fetching", "Database Basics", "Authentication"],
    unlocked: false,
  },
  {
    number: "05",
    title: "Ship It!",
    lessons: 8,
    duration: "3 hours",
    topics: ["Deployment", "Performance", "Real-World Project"],
    unlocked: false,
  },
];

const Curriculum = () => {
  return (
    <section className="py-24 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The <span className="gradient-text">Curriculum</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A carefully crafted learning path from beginner to job-ready developer.
          </p>
        </motion.div>

        <div className="space-y-4">
          {modules.map((module, index) => (
            <motion.div
              key={module.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                module.unlocked
                  ? "bg-card border-border hover:border-primary/50 cursor-pointer"
                  : "bg-muted/30 border-border/50"
              }`}
            >
              <div className="p-6 flex items-center gap-6">
                {/* Module number */}
                <div className={`text-4xl font-bold ${module.unlocked ? "text-primary/30" : "text-muted-foreground/20"}`}>
                  {module.number}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-xl font-semibold ${!module.unlocked && "text-muted-foreground"}`}>
                      {module.title}
                    </h3>
                    {!module.unlocked && (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
                  <div>
                    <span className="font-semibold text-foreground">{module.lessons}</span> lessons
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{module.duration}</span>
                  </div>
                  {module.unlocked ? (
                    <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <Lock className="w-5 h-5 text-muted-foreground/50" />
                  )}
                </div>
              </div>

              {/* Progress bar for unlocked modules */}
              {module.unlocked && (
                <div className="h-1 bg-secondary">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: "0%" }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
