"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);

    // Responsive particle count
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const count = isMobile ? 500 : 2000;

    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Spread particles in a large cylinder around the track
            const angle = Math.random() * Math.PI * 2;
            const radius = 20 + Math.random() * 60;
            const x = Math.cos(angle) * radius;
            const y = (Math.random() - 0.5) * 40;
            const z = -Math.random() * 100; // Along the track

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            // Slow drift velocities
            vel[i * 3] = (Math.random() - 0.5) * 0.02;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            vel[i * 3 + 2] = 0;
        }

        return [pos, vel];
    }, [count]);

    useFrame(() => {
        if (!pointsRef.current) return;

        const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            posArray[i * 3] += velocities[i * 3];
            posArray[i * 3 + 1] += velocities[i * 3 + 1];

            // Wrap around if too far
            if (Math.abs(posArray[i * 3]) > 80) {
                posArray[i * 3] *= -0.9;
            }
            if (Math.abs(posArray[i * 3 + 1]) > 25) {
                posArray[i * 3 + 1] *= -0.9;
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#00F3FF"
                transparent
                opacity={0.4}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
