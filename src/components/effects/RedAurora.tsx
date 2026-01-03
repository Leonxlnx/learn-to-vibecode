import { motion } from 'framer-motion';

/**
 * Red aurora/gradient background effect
 * Subtle animated glow for premium feel
 */
const RedAurora = ({ className = '' }: { className?: string }) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Main gradient blob */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-red-800/15 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-red-700/10 rounded-full blur-[100px]" />
            </motion.div>

            {/* Subtle noise overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    );
};

export default RedAurora;
