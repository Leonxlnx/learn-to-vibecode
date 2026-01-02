import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoArrowUpRight, GoChevronDown } from 'react-icons/go';
import { Menu, X, Sparkles } from 'lucide-react';

// --- Types ---
interface Link {
    label: string;
    href?: string;
    description?: string;
    icon?: React.ReactNode;
    span?: string; // 'col-span-1' | 'col-span-2'
    color?: string; // specific gradient or color for the bento card
}

interface Item {
    label: string;
    links: Link[];
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
    const [activeIndices, setActiveIndices] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                <div className="flex items-center gap-2 mr-4 cursor-pointer group select-none flex-shrink-0">
                    {logo ? (
                        <img src={logo} alt={logoAlt} className="h-6 w-auto" />
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="relative w-3 h-3 flex items-center justify-center">
                                <div className="absolute inset-0 bg-white rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500" />
                                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                            </div>
                            <span className="font-bold tracking-tight text-white text-sm uppercase">Learn2Vibecode</span>
                        </div>
                    )}
                </div>

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
                                            className="relative p-2 rounded-3xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] overflow-hidden"
                                        >
                                            {/* Glossy Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                                            {/* Inner Grid */}
                                            <div className="grid grid-cols-2 gap-2 relative z-10">
                                                {item.links.map((link, i) => (
                                                    <a
                                                        key={i}
                                                        href={link.href || '#'}
                                                        className={`
                                        relative group overflow-hidden rounded-xl border border-white/5 p-4 flex flex-col justify-between
                                        transition-all duration-300 hover:border-white/20 hover:shadow-lg
                                        ${link.span || 'col-span-1'}
                                        ${link.span === 'col-span-2' ? 'h-24' : 'h-32'}
                                    `}
                                                    >
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
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center ml-2">
                    <button className="relative overflow-hidden px-5 py-2 rounded-full bg-[#111] text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:border-white/30 transition-all active:scale-95 group whitespace-nowrap">
                        <span className="relative z-10">Start Learning</span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </div>
            </motion.nav>

            {/* --- MOBILE NAV --- */}
            <div className="md:hidden fixed top-4 left-4 right-4 z-50 flex justify-between items-center p-3 px-5 rounded-full border border-white/10 bg-[#050505]/80 backdrop-blur-xl shadow-lg">
                <span className="font-bold text-white text-sm tracking-tight uppercase">Learn2Vibecode</span>
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
                                className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-8 mt-4 overflow-y-auto">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-4">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">{item.label}</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {item.links.map((link, i) => (
                                            <a
                                                key={i}
                                                href="#"
                                                className={`
                            bg-[#111] border border-white/5 rounded-2xl p-4 flex flex-col gap-4 active:scale-95 transition-transform
                            ${link.span === 'col-span-2' ? 'col-span-2' : 'col-span-1'}
                        `}
                                            >
                                                <div className="text-white">
                                                    {link.icon || <Sparkles size={16} />}
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium text-sm">{link.label}</div>
                                                    {link.description && <div className="text-xs text-gray-500 mt-1">{link.description}</div>}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="mt-auto w-full py-4 bg-white text-black font-bold rounded-xl uppercase tracking-widest">
                            Get Started
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CardNav;
