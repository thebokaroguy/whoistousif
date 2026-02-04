"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { MODEL_PATHS } from "./assets/AssetConfig";

function SingleShip({ path, offset, scale = 1, radius = 150 }: { path: string, offset: number, scale?: number, radius?: number }) {
    const shipRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(path);

    useFrame((state) => {
        if (!shipRef.current) return;

        const time = state.clock.getElapsedTime() * 0.05 + offset; // Slower orbit

        // Simple orbit logic
        shipRef.current.position.x = Math.sin(time) * radius;
        shipRef.current.position.z = Math.cos(time) * radius - 100; // Push back further
        shipRef.current.position.y = Math.sin(time * 0.5) * 20; // Reduce vertical sway

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
            {/* Spaceship: Medium distance */}
            <SingleShip path={MODEL_PATHS.spaceship} offset={0} scale={0.2} radius={200} />

            {/* X-Wing: Faster, closer */}
            <SingleShip path={MODEL_PATHS.xwing} offset={2} scale={0.15} radius={180} />

            {/* Giant Robot: Needs to be HUGE but far away, or smaller if it's just a prop */}
            {/* User reported "weird thing", likely this one scaling too big. Reducing scale significantly. */}
            <SingleShip path={MODEL_PATHS.giantRobot} offset={4} scale={0.05} radius={250} />
        </group>
    );
}
