import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHome from '@/components/dashboard/DashboardHome';
import DashboardCourse from '@/components/dashboard/DashboardCourse';
import DashboardProjects from '@/components/dashboard/DashboardProjects';
import DashboardResources from '@/components/dashboard/DashboardResources';
import DashboardSettings from '@/components/dashboard/DashboardSettings';
import ModulePage from '@/components/dashboard/ModulePage';
import ChapterPage from '@/components/dashboard/ChapterPage';
import AIChatbot from '@/components/dashboard/AIChatbot';

interface Profile {
  name: string;
  learning_path: string;
  created_at: string;
  vibe_coins: number;
  completed_chapters: Record<string, string[]>;
  show_coins: boolean;
  show_leaderboard: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [vibeCoins, setVibeCoins] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile and auto-close sidebar
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        .select('name, learning_path, created_at, vibe_coins, completed_chapters, show_coins, show_leaderboard')
        .eq('id', session.user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setProfile({
              name: data.name || '',
              learning_path: data.learning_path || 'beginner',
              created_at: data.created_at || '',
              vibe_coins: data.vibe_coins || 0,
              completed_chapters: (data.completed_chapters as Record<string, string[]>) || {},
              show_coins: data.show_coins ?? true,
              show_leaderboard: data.show_leaderboard ?? true,
            });
            setVibeCoins(data.vibe_coins || 0);
          }
          setLoading(false);
        });
    });

    // Listen for custom progress update events
    const handleProgressUpdate = () => {
      if (user) {
        supabase
          .from('profiles')
          .select('vibe_coins, completed_chapters, show_coins, show_leaderboard')
          .eq('id', user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setVibeCoins(data.vibe_coins || 0);
              setProfile(prev => prev ? {
                ...prev,
                vibe_coins: data.vibe_coins || 0,
                completed_chapters: (data.completed_chapters as Record<string, string[]>) || {},
                show_coins: data.show_coins ?? true,
                show_leaderboard: data.show_leaderboard ?? true,
              } : null);
            }
          });
      }
    };
    
    window.addEventListener('progressUpdate', handleProgressUpdate);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('progressUpdate', handleProgressUpdate);
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
    if (pathParts[1] === 'course' && pathParts[2] && pathParts[3]) return 'chapter';
    if (pathParts[1] === 'course' && pathParts[2]) return 'module';
    if (pathParts[1] === 'course') return 'course';
    if (pathParts[1] === 'projects') return 'projects';
    if (pathParts[1] === 'resources') return 'resources';
    if (pathParts[1] === 'settings') return 'settings';
    return 'home';
  };

  const activePage = getActivePage();

  // Sidebar width for content margin (0 on mobile)
  const sidebarWidth = isMobile ? 0 : (sidebarOpen ? 260 : 72);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/5 blur-[150px] rounded-full" />
      </div>

      {/* Sidebar */}
      <Sidebar
        onLogout={handleLogout}
        userName={userName}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        vibeCoins={vibeCoins}
        showCoins={profile?.show_coins ?? true}
      />

      {/* Main Content - responds to sidebar width */}
      <motion.main
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-screen"
      >
        <div className={`p-4 sm:p-6 lg:p-10 max-w-6xl ${isMobile ? 'pt-20' : 'pt-20'}`}>
          {activePage === 'home' && (
            <DashboardHome userName={userName} learningPath={learningPath} completedChapters={profile?.completed_chapters || {}} userId={user.id} />
          )}
          {activePage === 'course' && <DashboardCourse learningPath={learningPath} completedChapters={profile?.completed_chapters || {}} />}
          {activePage === 'module' && <ModulePage userId={user.id} />}
          {activePage === 'chapter' && <ChapterPage userId={user.id} />}
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
              userId={user.id}
              onProfileUpdate={() => {
                supabase
                  .from('profiles')
                  .select('name, learning_path, created_at, vibe_coins, completed_chapters, show_coins, show_leaderboard')
                  .eq('id', user.id)
                  .single()
                  .then(({ data }) => {
                    if (data) {
                      setProfile({
                        name: data.name || '',
                        learning_path: data.learning_path || 'beginner',
                        created_at: data.created_at || '',
                        vibe_coins: data.vibe_coins || 0,
                        completed_chapters: (data.completed_chapters as Record<string, string[]>) || {},
                        show_coins: data.show_coins ?? true,
                        show_leaderboard: data.show_leaderboard ?? true,
                      });
                    }
                  });
              }}
            />
          )}
        </div>
      </motion.main>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Dashboard;
