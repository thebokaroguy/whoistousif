"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { MODEL_PATHS } from "./assets/AssetConfig";

interface AstronautProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    action?: "idle" | "work" | "float";
}

export default function Astronaut({
    position,
    rotation = [0, 0, 0],
    scale = 1,
    action = "idle"
}: AstronautProps) {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF(MODEL_PATHS.astronaut);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        // Play animation if available
        // Note: Actual animation names depend on the GLB file.
        // We'll attempt to play the first available one or match names if known.
        if (actions) {
            const actionName = Object.keys(actions)[0]; // Default to first
            if (actionName) {
                actions[actionName]?.reset().fadeIn(0.5).play();
            }
        }
    }, [actions, action]);

    useFrame((state) => {
        if (!group.current) return;

        // Add subtle floating motion if idle
        if (action === "idle" || action === "float") {
            group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <group ref={group} position={position} rotation={rotation} scale={scale}>
            <primitive object={scene} />

            {/* Welding Light Effect (Only if working) */}
            {action === "work" && (
                <pointLight
                    position={[0, 1, 0.5]}
                    color="#00f3ff"
                    intensity={2}
                    distance={3}
                    decay={2}
                >
                    {/* Flicker animation logic could go here */}
                </pointLight>
            )}
        </group>
    );
}
