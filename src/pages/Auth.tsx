import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) navigate('/');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) navigate('/');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      if (isLogin) {
        // LOGIN LOGIC
        const result = loginSchema.safeParse({ email: formData.email, password: formData.password });
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach(err => { if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; });
          setErrors(fieldErrors); setIsLoading(false); return;
        }

        const { error } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
        if (error) throw error;
        toast.success('Welcome back!');
        navigate('/');
      } else {
        // SIGNUP LOGIC
        const result = signupSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach(err => { if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; });
          setErrors(fieldErrors); setIsLoading(false); return;
        }

        // Explicitly passing name to metadata
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
              name: formData.name
            }
          },
        });

        if (error) throw error;
        toast.success('Account created! Please check your email.');
        // Don't navigate immediately on signup if email confirm is needed, but assuming auto-login or simple flow:
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex font-sans selection:bg-red-500/30">

      {/* LEFT SIDE - VISUALS */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black items-center justify-center p-12"
      >
        {/* Animated Background - No Weird Gradients, just subtle red ambient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-900/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
        </div>

        <div className="relative z-10 max-w-lg">
          <Link to="/" className="inline-flex items-center gap-2 mb-12 text-white/50 hover:text-white transition-colors group px-4 py-2 rounded-full hover:bg-white/5">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">Back</span>
          </Link>

          {/* Logo */}
          <img src="/images/VibeCode LOGO.png" alt="VibeCode Logo" className="w-16 mb-8 opacity-80" />

          <h1 className="text-6xl font-black text-white leading-[0.95] tracking-tighter mb-8">
            JOIN THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">REVOLUTION.</span>
          </h1>

          <div className="space-y-6">
            {['Ship 10x Faster', 'Zero Tech Debt', 'Focus on Logic'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-4 text-white/70"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-red-500">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-lg font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE - FORM */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-24 relative"
      >
        <div className="w-full max-w-md relative z-10">

          {/* Mobile Logo & Back */}
          <div className="lg:hidden mb-8 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors">
              <ArrowLeft size={16} /> Back
            </Link>
            <img src="/images/VibeCode LOGO.png" alt="VibeCode Logo" className="w-8" />
          </div>

          {/* Form Header */}
          <div className="text-center mb-10">
            <div className="inline-block p-1 rounded-full bg-white/5 border border-white/5 p-1 mb-8">
              <div className="flex relative">
                {/* Slider Backdrop */}
                <motion.div
                  layoutId="auth-toggle"
                  className="absolute inset-y-0 w-1/2 bg-white rounded-full shadow-lg"
                  initial={false}
                  animate={{ x: isLogin ? 0 : '100%' }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button onClick={() => setIsLogin(true)} className={`relative z-10 px-10 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${isLogin ? 'text-black' : 'text-white/50 hover:text-white'}`}>Login</button>
                <button onClick={() => setIsLogin(false)} className={`relative z-10 px-10 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${!isLogin ? 'text-black' : 'text-white/50 hover:text-white'}`}>Sign Up</button>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Start Building'}</h2>
            <p className="text-white/40">{isLogin ? 'Continue your journey.' : 'Join 20,000+ builders.'}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={20} />
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Username" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all font-medium" />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={20} />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all font-medium" />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={20} />
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all font-medium" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full py-4 mt-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              {isLoading ? <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <>{isLogin ? 'Login' : 'Begin'} <ArrowRight size={18} /></>}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-xs text-white/20">
            By joining, you agree to our <a href="#" className="underline hover:text-white">Terms</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>.
          </p>

        </div>
      </motion.div>

    </div>
  );
};

export default Auth;
