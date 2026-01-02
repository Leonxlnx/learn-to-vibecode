import { useEffect } from 'react';
import { Float, MeshDistortMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { IMG_URL } from '@/lib/constants';

/**
 * Animated 3D bubble sphere with distortion effect
 * Used in the Hero section background
 */
const Bubble = () => {
    const texture = useTexture(IMG_URL);

    useEffect(() => {
        if (texture) {
            texture.anisotropy = 16;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.needsUpdate = true;
        }
    }, [texture]);

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            {/* @ts-ignore */}
            <mesh scale={2.4}>
                {/* @ts-ignore */}
                <sphereGeometry args={[1, 128, 128]} />
                <MeshDistortMaterial
                    map={texture}
                    distort={0.25}
                    speed={1.8}
                    roughness={0.05}
                    metalness={0.9}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
                {/* @ts-ignore */}
            </mesh>
        </Float>
    );
};

export default Bubble;
