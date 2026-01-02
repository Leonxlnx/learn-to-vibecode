import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, Zap, Users, Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

// Validation schema
const signupSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email is too long'),
});

const EarlyAccess = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const result = signupSchema.safeParse({ name, email });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { error: dbError } = await supabase
        .from('early_access')
        .insert([{ name: result.data.name, email: result.data.email }]);

      if (dbError) {
        if (dbError.code === '23505') {
          toast.error('This email is already on the waitlist!', {
            description: "You're already in. We'll notify you when we launch.",
          });
        } else {
          toast.error('Something went wrong', {
            description: 'Please try again later.',
          });
        }
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      toast.success("You're in! 🎉", {
        description: "Welcome to the Learn2Vibecode family.",
      });
      setIsLoading(false);
    } catch (err) {
      toast.error('Network error', {
        description: 'Please check your connection and try again.',
      });
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Sparkles, text: 'Exclusive early bird pricing' },
    { icon: Zap, text: 'First access to all modules' },
    { icon: Users, text: 'Private community access' },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[40vh] -right-[20vw] w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-purple-500/10 via-transparent to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-[40vh] -left-[20vw] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent blur-3xl"
        />
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 md:top-10 md:left-10 z-20"
      >
        <Link
          to="/"
          className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </motion.div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Branding */}
        <div className="flex-1 flex flex-col justify-center px-6 py-20 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider">
                Limited spots available
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
              <span className="block">JOIN THE</span>
              <span className="block bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
                WAITLIST
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-md mb-12 leading-relaxed">
              Be among the first to master the art of vibe coding. 
              Early access members get exclusive benefits.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white/70" />
                  </div>
                  <span className="text-white/60">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-20 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
          >
            {!isSuccess ? (
              <div className="relative">
                {/* Glow effect behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-[2rem] blur-xl opacity-50" />
                
                <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Get Early Access
                  </h2>
                  <p className="text-white/40 text-sm mb-8">
                    Enter your details below and we'll notify you when we launch.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all duration-300 text-base"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all duration-300 text-base"
                        disabled={isLoading}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-6 group relative flex items-center justify-center gap-3 px-6 py-4 bg-white text-black font-bold text-sm tracking-wide uppercase rounded-2xl hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <span>Join the Waitlist</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  <p className="mt-6 text-center text-xs text-white/30">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-400/30 flex items-center justify-center"
                >
                  <Check className="w-12 h-12 text-green-400" />
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  You're In! 🎉
                </h2>

                <p className="text-white/50 text-lg mb-8 max-w-sm mx-auto">
                  Welcome to the Learn2Vibecode family. We'll reach out soon with exclusive updates.
                </p>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl text-white text-sm font-medium transition-all duration-300 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to Home
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </main>
  );
};

export default EarlyAccess;
