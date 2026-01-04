import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { Coins } from 'lucide-react';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHome from '@/components/dashboard/DashboardHome';
import DashboardCourse from '@/components/dashboard/DashboardCourse';
import DashboardProjects from '@/components/dashboard/DashboardProjects';
import DashboardResources from '@/components/dashboard/DashboardResources';
import DashboardSettings from '@/components/dashboard/DashboardSettings';
import ModulePage from '@/components/dashboard/ModulePage';
import AIChatbot from '@/components/dashboard/AIChatbot';

interface Profile {
  name: string;
  learning_path: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [vibeCoins, setVibeCoins] = useState(0);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          navigate('/auth');
        } else {
          setUser(session.user);
        }
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      setUser(session.user);

      // Fetch profile
      supabase
        .from('profiles')
        .select('name, learning_path, created_at')
        .eq('id', session.user.id)
        .single()
        .then(({ data, error }) => {
          if (data) {
            setProfile(data);
          }
          setLoading(false);
        });
    });

    // Load vibecoins
    const loadCoins = () => {
      const saved = localStorage.getItem('vibecoins');
      setVibeCoins(saved ? parseInt(saved, 10) : 0);
    };
    loadCoins();

    // Listen for storage changes
    window.addEventListener('storage', loadCoins);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', loadCoins);
    };
  }, [navigate]);

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
  const createdAt = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'January 2026';

  // Parse current path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const getActivePage = () => {
    if (pathParts[1] === 'course' && pathParts[2]) return 'module';
    if (pathParts[1] === 'course') return 'course';
    if (pathParts[1] === 'projects') return 'projects';
    if (pathParts[1] === 'resources') return 'resources';
    if (pathParts[1] === 'settings') return 'settings';
    return 'home';
  };

  const activePage = getActivePage();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/5 blur-[150px] rounded-full" />
      </div>

      {/* ViobeCoins - Top Right */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0d0d0d] border border-white/10">
        <Coins size={20} className="text-white/50" />
        <div className="text-right">
          <p className="text-lg font-bold text-white">{vibeCoins}</p>
          <p className="text-white/30 text-xs -mt-0.5">ViobeCoins</p>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} userName={userName} />

      {/* Main Content */}
      <main className="ml-[72px] min-h-screen transition-all duration-200">
        <div className="p-6 lg:p-10 max-w-5xl pt-20">
          {activePage === 'home' && (
            <DashboardHome userName={userName} learningPath={learningPath} />
          )}
          {activePage === 'course' && <DashboardCourse learningPath={learningPath} />}
          {activePage === 'module' && <ModulePage />}
          {activePage === 'projects' && <DashboardProjects />}
          {activePage === 'resources' && <DashboardResources />}
          {activePage === 'settings' && (
            <DashboardSettings
              profile={{
                name: userName,
                email: user.email || '',
                learningPath,
                createdAt,
              }}
            />
          )}
        </div>
      </main>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Dashboard;