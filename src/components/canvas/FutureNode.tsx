"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Html } from "@react-three/drei";
import * as THREE from "three";

export default function FutureNode() {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Slow pulsing scale
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            meshRef.current.scale.setScalar(pulse);
        }
        if (glowRef.current) {
            // Pulsing light intensity
            glowRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
        }
    });

    return (
        <group position={[0, 5, -80]}>
            {/* Core Sphere */}
            <Sphere ref={meshRef} args={[2, 64, 64]}>
                <MeshDistortMaterial
                    color="#FFD700"
                    emissive="#FFD700"
                    emissiveIntensity={0.5}
                    roughness={0.2}
                    metalness={0.8}
                    distort={0.3}
                    speed={2}
                    transparent
                    opacity={0.9}
                />
            </Sphere>

            {/* Outer Glow Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3.5, 0.05, 16, 100]} />
                <meshBasicMaterial color="#FFD700" transparent opacity={0.6} />
            </mesh>

            {/* Second Ring */}
            <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                <torusGeometry args={[4, 0.03, 16, 100]} />
                <meshBasicMaterial color="#00F3FF" transparent opacity={0.4} />
            </mesh>

            {/* Point Light Glow */}
            <pointLight ref={glowRef} color="#FFD700" intensity={2} distance={30} decay={2} />

            {/* HTML Label */}
            <Html position={[0, 4, 0]} center distanceFactor={20}>
                <div className="text-center pointer-events-none">
                    <div className="text-xs tracking-[0.3em] text-yellow-400 uppercase animate-pulse mb-1">
                        FUTURE NODE
                    </div>
                    <div className="text-4xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">
                        2026
                    </div>
                    <div className="text-sm text-yellow-300/80 mt-1">
                        M.Tech AI & ML — BITS Pilani
                    </div>
                </div>
            </Html>
        </group>
    );
}
