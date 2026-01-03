import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useTime, useAnimationFrame } from 'framer-motion';

export type InteractionMode = 'hover' | 'click' | 'scroll' | 'auto';
export type PhysicsPreset = 'standard' | 'heavy' | 'elastic' | 'nervous';
export type IntensityPreset = 'subtle' | 'medium' | 'extreme';

interface LiquidGlitchImageProps {
    imgNormal: string;
    imgGlitch: string;
    alt: string;
    width?: number;
    mode?: InteractionMode;
    physics?: PhysicsPreset;
    intensity?: IntensityPreset;
    baseRadius?: number;
    inverted?: boolean;
}

const PHYSICS_CONFIG = {
    standard: { damping: 25, stiffness: 120, mass: 0.8 },
    heavy: { damping: 60, stiffness: 80, mass: 3.0 },
    elastic: { damping: 10, stiffness: 150, mass: 0.6 }, // Das ist die Einstellung für den Bounce
    nervous: { damping: 10, stiffness: 400, mass: 0.2 },
};

const INTENSITY_CONFIG = {
    subtle: { scale: 30, freq: 0.004 },
    medium: { scale: 60, freq: 0.008 },
    extreme: { scale: 120, freq: 0.05 },
};

const LiquidGlitchImage: React.FC<LiquidGlitchImageProps> = ({
    imgNormal,
    imgGlitch,
    alt,
    width = 500,
    mode = 'hover',
    physics = 'standard',
    intensity = 'medium',
    baseRadius = 0.2,
    inverted = false,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isClicked, setIsClicked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const targetX = useMotionValue(0.5);
    const targetY = useMotionValue(0.5);
    const revealProgress = useMotionValue(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const time = useTime();

    useAnimationFrame(() => {
        if (mode === 'scroll') {
            const y = scrollYProgress.get();
            targetX.set(0.5 + Math.sin(y * 10) * 0.1);
            targetY.set(y);
            revealProgress.set(y > 0 && y < 1 ? 1 : 0);
        }
        else if (mode === 'auto') {
            const t = time.get() / 1000;
            const x = 0.5 + Math.sin(t * 0.8) * 0.35;
            const y = 0.5 + Math.cos(t * 0.6) * 0.35;
            targetX.set(x);
            targetY.set(y);
            revealProgress.set(1);
        }
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (mode === 'auto' || mode === 'scroll') return;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        targetX.set(x);
        targetY.set(y);
    };

    const handleMouseEnter = () => {
        if (mode === 'hover') {
            setIsHovered(true);
            revealProgress.set(1);
        }
    };

    const handleMouseLeave = () => {
        if (mode === 'hover') {
            setIsHovered(false);
            revealProgress.set(0);
        }
    };

    const handleClick = () => {
        if (mode === 'click') {
            const nextState = !isClicked;
            setIsClicked(nextState);
            revealProgress.set(nextState ? 1 : 0);
        }
    };

    const config = PHYSICS_CONFIG[physics];

    const headX = useSpring(targetX, { ...config, damping: config.damping * 1.0 });
    const headY = useSpring(targetY, { ...config, damping: config.damping * 1.0 });

    const bodyX = useSpring(targetX, { ...config, damping: config.damping * 1.4 });
    const bodyY = useSpring(targetY, { ...config, damping: config.damping * 1.4 });

    const tailX = useSpring(targetX, { ...config, damping: config.damping * 1.8 });
    const tailY = useSpring(targetY, { ...config, damping: config.damping * 1.8 });

    const smoothReveal = useSpring(revealProgress, { damping: 20, stiffness: 60 });

    const headCx = useTransform(headX, v => `${v * 100}%`);
    const headCy = useTransform(headY, v => `${v * 100}%`);
    const bodyCx = useTransform(bodyX, v => `${v * 100}%`);
    const bodyCy = useTransform(bodyY, v => `${v * 100}%`);
    const tailCx = useTransform(tailX, v => `${v * 100}%`);
    const tailCy = useTransform(tailY, v => `${v * 100}%`);

    const maxR = width * baseRadius;
    const rHead = useTransform(smoothReveal, [0, 1], [0, maxR]);
    const rBody = useTransform(smoothReveal, [0, 1], [0, maxR * 0.8]);
    const rTail = useTransform(smoothReveal, [0, 1], [0, maxR * 0.6]);

    const bgImage = inverted ? imgGlitch : imgNormal;
    const topImage = inverted ? imgNormal : imgGlitch;

    const idSuffix = React.useId();

    return (
        <div
            ref={containerRef}
            className={`relative rounded-lg overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-800/50 group select-none ${mode === 'click' ? 'cursor-pointer' : 'cursor-crosshair'}`}
            style={{
                maxWidth: '100%',
                width: width,
                aspectRatio: '4 / 5'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <svg
                className="absolute inset-0 w-full h-full block pointer-events-none"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id={`blobFilter-${idSuffix}`} colorInterpolationFilters="sRGB">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency={INTENSITY_CONFIG[intensity].freq}
                            numOctaves="2"
                            result="noise"
                        >
                            <animate
                                attributeName="baseFrequency"
                                values={`${INTENSITY_CONFIG[intensity].freq};${INTENSITY_CONFIG[intensity].freq * 2};${INTENSITY_CONFIG[intensity].freq}`}
                                dur="8s"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>

                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={INTENSITY_CONFIG[intensity].scale}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />

                        <feGaussianBlur stdDeviation="10" />
                        <feColorMatrix
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
                        />
                    </filter>

                    <mask id={`blobMask-${idSuffix}`}>
                        <rect x="0" y="0" width="100%" height="100%" fill="black" />
                        <g filter={`url(#blobFilter-${idSuffix})`}>
                            <motion.circle cx={headCx} cy={headCy} r={rHead} fill="white" />
                            <motion.circle cx={bodyCx} cy={bodyCy} r={rBody} fill="white" />
                            <motion.circle cx={tailCx} cy={tailCy} r={rTail} fill="white" />
                        </g>
                    </mask>
                </defs>

                <image
                    href={bgImage}
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                />

                <image
                    href={topImage}
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    mask={`url(#blobMask-${idSuffix})`}
                />

                {mode === 'click' && !isClicked && (
                    <text x="50%" y="90%" textAnchor="middle" fill="white" opacity="0.5" fontFamily="sans-serif" fontSize="14">
                        CLICK TO REVEAL
                    </text>
                )}
            </svg>
        </div>
    );
};

export default LiquidGlitchImage;
