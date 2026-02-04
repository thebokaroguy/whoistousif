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

export default function SpaceTraffic() {
    return (
        <group>
            {/* Spaceship: Deep background */}
            <SingleShip path={MODEL_PATHS.spaceship} offset={0} scale={ASSET_SCALES.spaceship} radius={350} />

            {/* X-Wing: Slightly closer */}
            <SingleShip path={MODEL_PATHS.xwing} offset={2} scale={ASSET_SCALES.xwing} radius={300} />

            {/* Giant Robot: Extreme background, tiny scale */}
            <SingleShip path={MODEL_PATHS.giantRobot} offset={4} scale={ASSET_SCALES.giantRobot} radius={400} />
        </group>
    );
}

