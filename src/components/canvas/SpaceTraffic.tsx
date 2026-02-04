"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { MODEL_PATHS, ASSET_SCALES } from "./assets/AssetConfig";

function SingleShip({ path, offset, scale = 1, radius = 150 }: { path: string, offset: number, scale?: number, radius?: number }) {
    const shipRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(path);

    useFrame((state) => {
        if (!shipRef.current) return;

        const time = state.clock.getElapsedTime() * 0.03 + offset; // Even slower orbit

        // Simple orbit logic - pushed way back
        shipRef.current.position.x = Math.sin(time) * radius;
        shipRef.current.position.z = Math.cos(time) * radius - 150; // Push back further
        shipRef.current.position.y = Math.sin(time * 0.5) * 15; // Reduced vertical sway

        shipRef.current.rotation.y = time + Math.PI / 2;
    });

    return (
        <primitive
            ref={shipRef}
            object={scene.clone()}
            scale={scale}
        />
    );
}

function LinearShip({ path, scale, speed = 1, y = 0, z = -100 }: { path: string, scale: number, speed?: number, y?: number, z?: number }) {
    const shipRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(path);

    useFrame((state) => {
        if (!shipRef.current) return;
        const time = state.clock.getElapsedTime();
        // Move left to right (negative x to positive x)
        // Reset when it goes off screen (e.g., x > 200 -> x = -200)
        const range = 400;
        const x = ((time * speed * 20) % range) - (range / 2);

        shipRef.current.position.set(x, y, z);
        shipRef.current.rotation.set(0, Math.PI / 2, 0); // Face Right
    });

    return <primitive object={scene.clone()} scale={scale} ref={shipRef} />;
}

export default function SpaceTraffic() {
    return (
        <group>
            {/* Spaceship: Deep background */}
            <SingleShip path={MODEL_PATHS.spaceship} offset={0} scale={ASSET_SCALES.spaceship} radius={350} />

            {/* X-Wing: Linear Flight (Left to Right background) */}
            <LinearShip path={MODEL_PATHS.xwing} scale={ASSET_SCALES.xwing} speed={2} y={20} z={-250} />

            {/* Giant Robot: Extreme background, tiny scale */}
            <SingleShip path={MODEL_PATHS.giantRobot} offset={4} scale={ASSET_SCALES.giantRobot} radius={400} />
        </group>
    );
}
