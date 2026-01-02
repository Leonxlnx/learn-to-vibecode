import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const features = [
  "Lifetime access to all modules",
  "50+ hours of HD video content",
  "10+ real-world projects",
  "Certificate of completion",
  "Private Discord community",
  "Monthly live Q&A sessions",
  "Future course updates included",
  "AI mentor access",
];

const Pricing = () => {
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
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            One price. Full access. No subscriptions. No hidden fees.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-xl mx-auto"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl" />
          
          <div className="relative glass rounded-2xl p-8 sm:p-10">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Most Popular
              </div>
            </div>

            <div className="text-center mb-8 pt-4">
              <div className="text-muted-foreground mb-2">Complete Bundle</div>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl sm:text-6xl font-bold">$149</span>
                <span className="text-muted-foreground line-through">$299</span>
              </div>
              <div className="text-primary text-sm mt-2">50% off — Limited time offer</div>
            </div>

            <div className="space-y-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="xl" className="w-full">
              Get Started Now
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
