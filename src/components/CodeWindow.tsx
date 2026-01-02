import { motion } from "framer-motion";

const CodeWindow = () => {
  const codeLines = [
    { text: "const", class: "text-accent" },
    { text: " learnToVibe", class: "text-primary" },
    { text: " = () => {", class: "text-foreground" },
  ];

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="relative"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl" />
      
      <div className="relative glass rounded-xl overflow-hidden">
        {/* Window header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-destructive/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-success/70" />
          <span className="ml-4 text-xs text-muted-foreground font-mono">vibe-code.tsx</span>
        </div>

        {/* Code content */}
        <div className="p-6 font-mono text-sm">
          <div className="flex gap-4">
            <div className="text-muted-foreground/50 select-none">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <div key={n}>{n}</div>
              ))}
            </div>
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-accent">const</span>
                <span className="text-primary"> learnToVibe</span>
                <span className="text-foreground"> = () =&gt; {"{"}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="pl-4"
              >
                <span className="text-accent">const</span>
                <span className="text-foreground"> [</span>
                <span className="text-primary">skills</span>
                <span className="text-foreground">, </span>
                <span className="text-primary">setSkills</span>
                <span className="text-foreground">] = </span>
                <span className="text-accent">useState</span>
                <span className="text-foreground">([])</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="pl-4 mt-2"
              >
                <span className="text-accent">useEffect</span>
                <span className="text-foreground">(() =&gt; {"{"}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="pl-8"
              >
                <span className="text-muted-foreground">{"// Level up daily 🚀"}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="pl-8"
              >
                <span className="text-primary">setSkills</span>
                <span className="text-foreground">(</span>
                <span className="text-primary">prev</span>
                <span className="text-foreground"> =&gt; [...</span>
                <span className="text-primary">prev</span>
                <span className="text-foreground">, </span>
                <span className="text-success">'new skill'</span>
                <span className="text-foreground">])</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="pl-4"
              >
                <span className="text-foreground">{"}"},</span>
                <span className="text-foreground"> [])</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="mt-2"
              >
                <span className="text-accent">  return</span>
                <span className="text-foreground"> &lt;</span>
                <span className="text-primary">Vibes</span>
                <span className="text-foreground"> /&gt;</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9 }}
              >
                <span className="text-foreground">{"}"}</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeWindow;
