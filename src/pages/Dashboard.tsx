import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { LogOut, BookOpen, Zap, Trophy, ArrowRight, Settings, MessageCircle } from 'lucide-react';

type Profile = {
  name: string | null;
  age_range: string | null;
  exp_general: number;
  exp_webdev: number;
  exp_appdev: number;
  exp_gamedev: number;
  vibecode_level: number;
  dream_project: string | null;
  learning_path: string;
  onboarding_completed: boolean;
};

const pathInfo: Record<string, { color: string; bgColor: string; label: string }> = {
  speedrunner: { color: 'text-orange-400', bgColor: 'bg-orange-500/10', label: 'Speedrunner' },
  builder: { color: 'text-blue-400', bgColor: 'bg-blue-500/10', label: 'Builder' },
  developer: { color: 'text-cyan-400', bgColor: 'bg-cyan-500/10', label: 'Developer' },
  beginner: { color: 'text-green-400', bgColor: 'bg-green-500/10', label: 'Beginner' },
  expert: { color: 'text-purple-400', bgColor: 'bg-purple-500/10', label: 'Expert' }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        setLoading(false);
        navigate('/auth');
      } else {
        // Fetch profile after getting session
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
      return;
    }

    if (data) {
      setProfile(data as Profile);
      // Redirect to onboarding if not completed
      if (!data.onboarding_completed) {
        navigate('/onboarding');
        return;
      }
    } else {
      // No profile exists, redirect to onboarding
      navigate('/onboarding');
      return;
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const userName = profile?.name || user.user_metadata?.name || user.email?.split('@')[0] || 'Builder';
  const learningPath = profile?.learning_path || 'beginner';
  const pathData = pathInfo[learningPath] || pathInfo.beginner;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/vibecode-logo.png" alt="VibeCode" className="w-8 h-8" />
            <span className="font-bold text-lg">Learn2Vibecode</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <Settings size={20} className="text-white/50" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            Welcome back, <span className="text-red-500">{userName}</span>
          </h1>
          <p className="text-white/50 text-lg">Continue your vibecoding journey.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Zap className="text-red-500" size={24} />
              </div>
              <div>
                <p className="text-2xl font-black">0</p>
                <p className="text-white/40 text-sm">Lessons Completed</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Trophy className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-2xl font-black">0</p>
                <p className="text-white/40 text-sm">Projects Built</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl ${pathData.bgColor} flex items-center justify-center`}>
                <BookOpen className={pathData.color} size={24} />
              </div>
              <div>
                <p className={`text-2xl font-black ${pathData.color}`}>{pathData.label}</p>
                <p className="text-white/40 text-sm">Learning Path</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Course</h2>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-red-500 font-mono text-xs uppercase tracking-widest mb-2 block">Module 1</span>
                <h3 className="text-2xl font-bold mb-2">Welcome to Vibecoding</h3>
                <p className="text-white/50 mb-4">Introduction to AI-assisted development and your first steps.</p>
                <div className="flex items-center gap-4">
                  <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-red-500 rounded-full" />
                  </div>
                  <span className="text-white/40 text-sm">0% Complete</span>
                </div>
              </div>
              <Link to="/curriculum">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-6 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider"
                >
                  Start Learning <ArrowRight size={18} />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="https://discord.gg/bQW2YtNB6G"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <MessageCircle className="text-purple-500" size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-1">Join Discord</h4>
              <p className="text-white/40 text-sm">Connect with 20,000+ builders</p>
            </div>
          </a>
          <Link
            to="/resources"
            className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <BookOpen className="text-orange-500" size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-1">Resources</h4>
              <p className="text-white/40 text-sm">Tools, templates, and inspiration</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;