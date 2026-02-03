"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

interface MilestoneMarkerProps {
    position: THREE.Vector3;
    index: number;
    title: string;
}

export default function MilestoneMarker({ position, index, title }: MilestoneMarkerProps) {
    const ringRef = useRef<THREE.Mesh>(null!);
    const innerRingRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        // Rotate rings
        if (ringRef.current) ringRef.current.rotation.z += 0.01;
        if (innerRingRef.current) innerRingRef.current.rotation.z -= 0.02;
    });

    return (
        <group position={position}>
            {/* Outer Glowing Ring */}
            <mesh ref={ringRef} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[1.5, 0.05, 16, 100]} />
                <meshStandardMaterial
                    color="#00f3ff"
                    emissive="#00f3ff"
                    emissiveIntensity={2}
                />
            </mesh>

            {/* Inner Ring */}
            <mesh ref={innerRingRef} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[1.2, 0.02, 16, 100]} />
                <meshStandardMaterial
                    color="#bc13fe"
                    emissive="#bc13fe"
                    emissiveIntensity={2}
                />
            </mesh>

            {/* Floating Label */}
            <Html position={[0, 2.5, 0]} center distanceFactor={15}>
                <div className="bg-black/80 border border-cyan-500/50 px-4 py-2 rounded-lg backdrop-blur-md">
                    <span className="text-cyan-400 font-bold tracking-widest text-sm whitespace-nowrap">
                        {2021 + index} // {title}
                    </span>
                </div>
            </Html>
        </group>
    );
}
