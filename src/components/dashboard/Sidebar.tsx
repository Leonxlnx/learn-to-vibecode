import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, FolderOpen, Bookmark, Settings, LogOut, Menu } from 'lucide-react';

interface SidebarProps {
    onLogout: () => void;
    userName: string;
    vibeCoins?: number;
}

const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Course', path: '/dashboard/course' },
    { icon: FolderOpen, label: 'Projects', path: '/dashboard/projects' },
    { icon: Bookmark, label: 'Resources', path: '/dashboard/resources' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const Sidebar = ({ onLogout, userName, vibeCoins = 0 }: SidebarProps) => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const showExpanded = !isCollapsed || isHovered;

    return (
        <motion.aside
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{ width: showExpanded ? 260 : 72 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-0 h-screen bg-[#0a0a0a] border-r border-white/5 flex flex-col z-40"
        >
            {/* Header with Logo */}
            <div className="p-4 flex items-center justify-between h-16">
                <Link to="/" className="flex items-center gap-3">
                    {/* Show Menu icon on hover when collapsed, otherwise logo */}
                    {isCollapsed && isHovered ? (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={(e) => { e.preventDefault(); setIsCollapsed(false); }}
                            className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                        >
                            <Menu size={18} />
                        </motion.button>
                    ) : (
                        <img src="/images/vibecode-logo.png" alt="V" className="w-10 h-10 rounded-2xl" />
                    )}
                    <AnimatePresence>
                        {showExpanded && !isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.15 }}
                                className="font-bold text-white text-lg whitespace-nowrap"
                            >
                                Vibecode
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
                {/* Collapse button - only when expanded */}
                <AnimatePresence>
                    {showExpanded && !isCollapsed && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCollapsed(true)}
                            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all"
                        >
                            <Menu size={14} />
                        </motion.button>
                    )}
                </AnimatePresence>
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
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${active
                                            ? 'bg-white/10 text-white'
                                            : 'text-white/40 hover:text-white hover:bg-white/5'
                                        }`}
                                    title={!showExpanded ? item.label : undefined}
                                >
                                    <item.icon size={20} className="flex-shrink-0" />
                                    <AnimatePresence>
                                        {showExpanded && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.1 }}
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
                <div className={`flex items-center gap-3 px-4 py-3 mb-1 ${!showExpanded ? 'justify-center' : ''}`}>
                    <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <AnimatePresence>
                        {showExpanded && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex-1 min-w-0"
                            >
                                <p className="text-sm text-white truncate">{userName}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <button
                    onClick={onLogout}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-white/30 hover:text-white hover:bg-white/5 transition-all duration-200 ${!showExpanded ? 'justify-center' : ''}`}
                    title={!showExpanded ? 'Logout' : undefined}
                >
                    <LogOut size={20} className="flex-shrink-0" />
                    <AnimatePresence>
                        {showExpanded && (
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
