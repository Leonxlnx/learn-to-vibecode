import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHome from '@/components/dashboard/DashboardHome';
import DashboardCourse from '@/components/dashboard/DashboardCourse';
import DashboardProjects from '@/components/dashboard/DashboardProjects';
import DashboardResources from '@/components/dashboard/DashboardResources';
import DashboardSettings from '@/components/dashboard/DashboardSettings';
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-red-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const userName = profile?.name || user.user_metadata?.name || user.email?.split('@')[0] || 'Builder';
  const learningPath = profile?.learning_path || 'beginner';
  const createdAt = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'January 2026';

  // Determine which page to show
  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/dashboard/course') return 'course';
    if (path === '/dashboard/projects') return 'projects';
    if (path === '/dashboard/resources') return 'resources';
    if (path === '/dashboard/settings') return 'settings';
    return 'home';
  };

  const activePage = getActivePage();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/5 blur-[150px] rounded-full" />
      </div>

      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} userName={userName} />

      {/* Main Content - responsive margin */}
      <main className="ml-[72px] lg:ml-[240px] min-h-screen transition-all duration-200">
        <div className="p-6 lg:p-10 max-w-5xl">
          {activePage === 'home' && (
            <DashboardHome userName={userName} learningPath={learningPath} />
          )}
          {activePage === 'course' && <DashboardCourse learningPath={learningPath} />}
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