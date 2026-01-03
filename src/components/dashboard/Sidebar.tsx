import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, FolderOpen, Bookmark, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
    onLogout: () => void;
    userName: string;
}

const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Course', path: '/dashboard/course' },
    { icon: FolderOpen, label: 'Projects', path: '/dashboard/projects' },
    { icon: Bookmark, label: 'Resources', path: '/dashboard/resources' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const Sidebar = ({ onLogout, userName }: SidebarProps) => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 72 : 240 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-screen bg-[#0a0a0a] border-r border-white/5 flex flex-col z-40"
        >
            {/* Logo */}
            <div className="p-4 border-b border-white/5">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                        <img src="/images/vibecode-logo.png" alt="V" className="w-5 h-5" />
                    </div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="font-bold text-white text-lg whitespace-nowrap"
                            >
                                Vibecode
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 w-6 h-6 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all z-50"
            >
                {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>

            {/* Navigation */}
            <nav className="flex-1 p-3">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isExactDashboard = item.path === '/dashboard' && location.pathname === '/dashboard';
                        const isSubPage = item.path !== '/dashboard' && location.pathname === item.path;
                        const active = isExactDashboard || isSubPage;

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${active
                                            ? 'bg-white/10 text-white'
                                            : 'text-white/40 hover:text-white hover:bg-white/5'
                                        }`}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <item.icon size={20} className="flex-shrink-0" />
                                    <AnimatePresence>
                                        {!isCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-sm font-medium whitespace-nowrap"
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
                <div className={`flex items-center gap-3 px-3 py-3 mb-1 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center text-red-500 text-sm font-bold flex-shrink-0">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm text-white/60 truncate"
                            >
                                {userName}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
                <button
                    onClick={onLogout}
                    className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-white/30 hover:text-white hover:bg-white/5 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? 'Logout' : undefined}
                >
                    <LogOut size={20} className="flex-shrink-0" />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm font-medium"
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
