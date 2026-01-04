import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, FolderOpen, Bookmark, Settings, LogOut, Menu, X, PanelLeftOpen, Coins } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface SidebarProps {
  onLogout: () => void;
  userName: string;
  isOpen: boolean;
  onToggle: () => void;
  vibeCoins?: number;
}

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: BookOpen, label: 'Course', path: '/dashboard/course' },
  { icon: FolderOpen, label: 'Projects', path: '/dashboard/projects' },
  { icon: Bookmark, label: 'Resources', path: '/dashboard/resources' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const Sidebar = ({ onLogout, userName, isOpen, onToggle, vibeCoins = 0 }: SidebarProps) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavClick = () => {
    if (isMobile) {
      onToggle();
    }
  };

  // Mobile: Hamburger menu with drawer
  if (isMobile) {
    return (
      <>
        {/* Hamburger Button - Always visible */}
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-3 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-lg"
        >
          {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>

        {/* Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={onToggle}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="fixed left-0 top-0 h-full w-72 bg-[#0d0d0d] border-r border-white/5 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3" onClick={handleNavClick}>
                  <img src="/images/vibecode-logo.png" alt="Logo" className="w-10 h-10 rounded-xl" />
                  <span className="text-lg font-bold text-white">Vibecode</span>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                  const isExactDashboard = item.path === '/dashboard' && location.pathname === '/dashboard';
                  const isSubPage = item.path !== '/dashboard' && location.pathname.startsWith(item.path);
                  const active = isExactDashboard || isSubPage;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleNavClick}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                        active
                          ? 'bg-white/10 text-white'
                          : 'text-white/40 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* User Section */}
              <div className="p-4 border-t border-white/5">
                {/* VibeCoins */}
                <div className="flex items-center gap-2 px-4 py-3 mb-2 rounded-xl bg-white/5">
                  <Coins size={16} className="text-yellow-500/80" />
                  <span className="font-bold text-white text-sm">{vibeCoins}</span>
                  <span className="text-white/30 text-xs">VibeCoins</span>
                </div>
                
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold">
                    {userName?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="font-medium text-white">{userName || 'User'}</span>
                </div>
                <button
                  onClick={() => { handleNavClick(); onLogout(); }}
                  className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <motion.aside
      animate={{ width: isOpen ? 260 : 72 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen bg-[#0d0d0d] border-r border-white/5 flex flex-col z-40"
      onMouseEnter={() => !isOpen && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="p-4 flex items-center h-16">
        {isOpen ? (
          // Open state: Logo + text + close button
          <div className="flex items-center justify-between w-full">
            <Link to="/" className="flex items-center gap-3 overflow-hidden">
              <img src="/images/vibecode-logo.png" alt="Logo" className="w-10 h-10 rounded-xl flex-shrink-0" />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-white text-lg whitespace-nowrap"
              >
                Vibecode
              </motion.span>
            </Link>
            <button
              onClick={onToggle}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          // Closed state: Just logo, or expand icon on hover
          <div className="flex items-center justify-center w-full">
            <button
              onClick={onToggle}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                {isHovered ? (
                  <motion.div
                    key="expand"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"
                  >
                    <PanelLeftOpen size={18} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.img
                    key="logo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    src="/images/vibecode-logo.png"
                    alt="Logo"
                    className="w-10 h-10 rounded-xl"
                  />
                )}
              </AnimatePresence>
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 mt-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isExactDashboard = item.path === '/dashboard' && location.pathname === '/dashboard';
            const isSubPage = item.path !== '/dashboard' && location.pathname.startsWith(item.path);
            const active = isExactDashboard || isSubPage;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  } ${!isOpen ? 'justify-center' : ''}`}
                  title={!isOpen ? item.label : undefined}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-white/5">
        {/* VibeCoins */}
        <div className={`flex items-center gap-2 px-3 py-2.5 mb-2 rounded-xl bg-white/5 ${!isOpen ? 'justify-center' : ''}`}>
          <Coins size={16} className="text-yellow-500/80 flex-shrink-0" />
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 overflow-hidden"
              >
                <span className="font-bold text-white text-sm">{vibeCoins}</span>
                <span className="text-white/30 text-xs whitespace-nowrap">VibeCoins</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className={`flex items-center gap-3 px-4 py-3 mb-1 ${!isOpen ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0 overflow-hidden"
              >
                <p className="text-sm text-white truncate">{userName}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 ${!isOpen ? 'justify-center' : ''}`}
          title={!isOpen ? 'Logout' : undefined}
        >
          <LogOut size={20} className="flex-shrink-0" />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
