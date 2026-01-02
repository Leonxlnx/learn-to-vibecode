import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated particle field with wave motion
 * Used in the Problem section background
 */
const WireframeWave = () => {
    const ref = useRef<THREE.Points>(null);

    // Generate a field of particles
    const particles = useMemo(() => {
        const count = 4000;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Spread wide on X, tall on Y, deep on Z
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.getElapsedTime();

        // Constant subtle rotation
        ref.current.rotation.y = time * 0.05;

        // Slight wave movement on Y to make it feel "alive"
        ref.current.position.y = Math.sin(time * 0.1) * 0.2;
    });

    return (
        <>
            {/* @ts-ignore */}
            <ambientLight intensity={2} />
            <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </>
    );
};

export default WireframeWave;
