import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, FolderOpen, Bookmark, Settings, LogOut, MessageCircle } from 'lucide-react';

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

    return (
        <aside className="fixed left-0 top-0 h-screen w-[240px] bg-[#0d0d0d] border-r border-white/5 flex flex-col z-40">
            {/* Logo */}
            <div className="p-6 border-b border-white/5">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/images/vibecode-logo.png" alt="VibeCode" className="w-8 h-8" />
                    <span className="font-bold text-white text-lg">Vibecode</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                        const isExactDashboard = item.path === '/dashboard' && location.pathname === '/dashboard';
                        const active = isExactDashboard || (item.path !== '/dashboard' && isActive);

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
                                            ? 'bg-white/10 text-white'
                                            : 'text-white/50 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-sm font-bold">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-white/70 truncate">{userName}</span>
                </div>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
