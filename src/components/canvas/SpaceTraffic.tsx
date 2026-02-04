"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { MODEL_PATHS } from "./assets/AssetConfig";

function SingleShip({ path, offset }: { path: string, offset: number }) {
    const shipRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(path);

    useFrame((state) => {
        if (!shipRef.current) return;

        const time = state.clock.getElapsedTime() * 0.1 + offset;
        const radius = 150; // Far background

        // Simple orbit logic
        shipRef.current.position.x = Math.sin(time) * radius;
        shipRef.current.position.z = Math.cos(time) * radius - 50; // Push back
        shipRef.current.position.y = Math.sin(time * 0.5) * 50;

        shipRef.current.rotation.y = time + Math.PI / 2;
    });

    return (
        <primitive
            ref={shipRef}
            object={scene.clone()}
            scale={5}
        />
    );
}

export default function SpaceTraffic() {
    return (
        <group>
            <SingleShip path={MODEL_PATHS.spaceship} offset={0} />
            <SingleShip path={MODEL_PATHS.xwing} offset={2} />
            <SingleShip path={MODEL_PATHS.giantRobot} offset={4} />
        </group>
    );
}
