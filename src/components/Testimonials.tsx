import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Frontend Developer @ Startup",
    content: "This course changed my career. The vibe is immaculate and the projects are actually fun to build. Landed my first dev job 3 months after finishing!",
    rating: 5,
    avatar: "A",
  },
  {
    name: "Maya Patel",
    role: "Career Switcher",
    content: "Coming from a non-tech background, I was intimidated. But the chill teaching style made everything click. Now I'm building apps confidently!",
    rating: 5,
    avatar: "M",
  },
  {
    name: "Jordan Rivera",
    role: "Freelance Developer",
    content: "The community is 🔥. Got help whenever I was stuck, made friends, and even found my first freelance client through the Discord.",
    rating: 5,
    avatar: "J",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Students Are <span className="gradient-text">Saying</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real vibers who transformed their careers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="h-full p-6 rounded-xl glass">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                
                <p className="text-foreground mb-6">{testimonial.content}</p>
                
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-primary-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
