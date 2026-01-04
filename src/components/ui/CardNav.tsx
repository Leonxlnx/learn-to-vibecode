import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoArrowUpRight, GoChevronDown } from 'react-icons/go';
import { Menu, X, Sparkles, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

// --- Types ---
interface LinkItem {
    label: string;
    href?: string;
    description?: string;
    icon?: React.ReactNode;
    span?: string;
    color?: string;
}

interface Item {
    label: string;
    links: LinkItem[];
}

interface CardNavProps {
    logo?: string;
    logoAlt?: string;
    items: Item[];
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    ease?: string;
}

/**
 * Premium navigation component with bento-style dropdowns
 * Includes both desktop and mobile responsive layouts
 */
const CardNav = ({
    logo,
    logoAlt = 'Logo',
    items,
}: CardNavProps) => {
    const navigate = useNavigate();
    const [activeIndices, setActiveIndices] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setShowUserMenu(false);
        navigate('/');
    };

    return (
        <>
            {/* --- DESKTOP NAV --- */}
            <motion.nav
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-6 left-1/2 z-50 hidden md:flex items-center gap-2 p-1.5 pl-6 pr-1.5 rounded-full border border-white/10 bg-[#050505]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 mr-4 cursor-pointer group select-none flex-shrink-0">
                    {logo ? (
                        <img src={logo} alt={logoAlt} className="h-6 w-auto" />
                    ) : (
                        <div className="flex items-center gap-2">
                            <img src="/images/vibecode-logo.png" alt="VibeCode" className="w-8 h-8" />
                            <span className="font-bold tracking-tight text-white text-sm uppercase">Learn2Vibecode</span>
                        </div>
                    )}
                </Link>

                {/* Links with Bento Dropdowns */}
                <ul className="flex items-center gap-1">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="relative"
                            onMouseEnter={() => setActiveIndices(index)}
                            onMouseLeave={() => setActiveIndices(null)}
                        >
                            <button
                                className={`
                                    relative px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-full flex items-center gap-1.5
                                    ${activeIndices === index ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white'}
                                `}
                            >
                                {item.label}
                                <motion.span animate={{ rotate: activeIndices === index ? 180 : 0 }}>
                                    <GoChevronDown size={10} />
                                </motion.span>
                            </button>

                            {/* The "Bento" Dropdown Window */}
                            <AnimatePresence>
                                {activeIndices === index && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[400px]">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(10px)" }}
                                            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(8px)", transition: { duration: 0.15 } }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            className="relative p-2 rounded-3xl border border-white/15 bg-[#0d0d0d] backdrop-blur-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] overflow-hidden"
                                        >
                                            {/* Glossy Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                                            {/* Inner Grid */}
                                            <div className="grid grid-cols-2 gap-2 relative z-10">
                                                {item.links.map((link, i) => {
                                                    const isExternal = link.href?.startsWith('http://') || link.href?.startsWith('https://') || link.href?.startsWith('mailto:');
                                                    const linkContent = (
                                                        <>
                                                            {/* Hover Gradient Background */}
                                                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${link.color || 'from-white/5 to-white/10'}`} />

                                                            {/* Icon & Arrow */}
                                                            <div className="flex justify-between items-start z-10">
                                                                <div className="text-white/50 group-hover:text-white transition-colors duration-300">
                                                                    {link.icon || <Sparkles size={16} />}
                                                                </div>
                                                                <GoArrowUpRight className="text-white/20 group-hover:text-white transition-colors duration-300" size={12} />
                                                            </div>

                                                            {/* Text Content */}
                                                            <div className="z-10 mt-auto">
                                                                <div className="text-sm font-bold text-white mb-0.5">{link.label}</div>
                                                                {link.description && (
                                                                    <div className="text-[10px] text-gray-500 font-medium leading-tight group-hover:text-gray-300 transition-colors">
                                                                        {link.description}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </>
                                                    );

                                                    const className = `
                                                        relative group overflow-hidden rounded-xl border border-white/5 p-4 flex flex-col justify-between
                                                        transition-all duration-300 hover:border-white/20 hover:shadow-lg
                                                        ${link.span || 'col-span-1'}
                                                        ${link.span === 'col-span-2' ? 'h-24' : 'h-32'}
                                                    `;

                                                    return isExternal ? (
                                                        <a
                                                            key={i}
                                                            href={link.href || '#'}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={className}
                                                        >
                                                            {linkContent}
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            key={i}
                                                            to={link.href || '/'}
                                                            className={className}
                                                        >
                                                            {linkContent}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>

                {/* CTA / User Menu */}
                <div className="flex items-center ml-2">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="relative overflow-hidden px-4 py-2 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2"
                            >
                                <User size={14} />
                                <span className="max-w-[100px] truncate">{user.email?.split('@')[0]}</span>
                            </button>

                            <AnimatePresence>
                                {showUserMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-2 p-2 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-2xl min-w-[160px]"
                                    >
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setShowUserMenu(false)}
                                            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm"
                                        >
                                            <User size={16} />
                                            <span>Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 text-sm"
                                        >
                                            <LogOut size={16} />
                                            <span>Logout</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link to="/auth">
                            <button className="relative overflow-hidden px-5 py-2 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500 active:scale-95 group whitespace-nowrap">
                                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Start Learning</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                            </button>
                        </Link>
                    )}
                </div>
            </motion.nav>

            {/* --- MOBILE NAV --- */}
            <div className="md:hidden fixed top-4 left-4 right-4 z-50 flex justify-between items-center p-3 px-5 rounded-full border border-white/10 bg-[#050505]/80 backdrop-blur-xl shadow-lg">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/images/vibecode-logo.png" alt="VibeCode" className="w-7 h-7" />
                    <span className="font-bold text-white text-sm tracking-tight uppercase">Learn2Vibecode</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Mobile Fullscreen Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-[60] bg-[#050505] flex flex-col p-6"
                    >
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-8 mt-4 overflow-y-auto flex-1">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-4">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">{item.label}</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {item.links.map((link, i) => {
                                            const isExternal = link.href?.startsWith('http://') || link.href?.startsWith('https://') || link.href?.startsWith('mailto:');
                                            const linkContent = (
                                                <>
                                                    <div className="text-white">
                                                        {link.icon || <Sparkles size={16} />}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-medium text-sm">{link.label}</div>
                                                        {link.description && <div className="text-xs text-gray-500 mt-1">{link.description}</div>}
                                                    </div>
                                                </>
                                            );

                                            const className = `
                                                bg-[#111] border border-white/5 rounded-2xl p-4 flex flex-col gap-4 active:scale-95 transition-transform
                                                ${link.span === 'col-span-2' ? 'col-span-2' : 'col-span-1'}
                                            `;

                                            return isExternal ? (
                                                <a
                                                    key={i}
                                                    href={link.href || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={className}
                                                >
                                                    {linkContent}
                                                </a>
                                            ) : (
                                                <Link
                                                    key={i}
                                                    to={link.href || '/'}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={className}
                                                >
                                                    {linkContent}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {user ? (
                            <div className="mt-6 space-y-3">
                                <div className="w-full py-3 px-4 bg-white/5 text-white/70 font-medium rounded-xl text-center text-sm border border-white/10">
                                    {user.email}
                                </div>
                                <Link 
                                    to="/dashboard" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-4 bg-white text-black font-bold rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform"
                                >
                                    <User size={18} />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full py-4 bg-white/10 text-white font-bold rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                                <button className="mt-6 w-full py-4 bg-white text-black font-bold rounded-xl uppercase tracking-widest active:scale-95 transition-transform">
                                    Start Learning
                                </button>
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CardNav;
