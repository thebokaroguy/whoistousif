"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF, Trail } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import { createTrackCurve } from "@/lib/curve";
import { MODEL_PATHS, ASSET_SCALES } from "./assets/AssetConfig";
import EngineFlame from "./EngineFlame";

export default function SpiralSpaceship() {
    const shipRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(MODEL_PATHS.spaceship);
    const scrollProgress = useStore((state) => state.scrollProgress);
    const curve = useMemo(() => createTrackCurve(), []);

    // Motion parameters
    const SPIRAL_RADIUS = 6;
    const FREQUENCY = 8; // How many loops around the track

    useFrame((state, delta) => {
        if (!shipRef.current) return;

        // 1. Calculate base position on curve
        // ship follows slightly behind camera usually, or independent?
        // Let's make it independent: smooth, constant forward motion + scroll influence?
        // Requirement: "Locked to scroll"

        // Add an offset so it leads/trails the camera
        const t = Math.min(1, Math.max(0, scrollProgress + 0.05));
        const tNext = Math.min(1, Math.max(0, t + 0.01)); // Look ahead point

        const pos = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();
        const normal = new THREE.Vector3(0, 1, 0).cross(tangent).normalize();
        const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

        // 2. Calculate Spiral Offset
        const angle = t * Math.PI * 2 * FREQUENCY;
        const spiralOffset = new THREE.Vector3()
            .addScaledVector(normal, Math.cos(angle) * SPIRAL_RADIUS)
            .addScaledVector(binormal, Math.sin(angle) * SPIRAL_RADIUS);

        const finalPos = pos.add(spiralOffset);

        // 3. Orientation: Look at next point in spiral
        // We repeat calcs for tNext to get the "future" position
        const posNext = curve.getPointAt(tNext);
        const tangentNext = curve.getTangentAt(tNext).normalize();
        const normalNext = new THREE.Vector3(0, 1, 0).cross(tangentNext).normalize();
        const binormalNext = new THREE.Vector3().crossVectors(tangentNext, normalNext).normalize();
        const angleNext = tNext * Math.PI * 2 * FREQUENCY;
        const offsetNext = new THREE.Vector3()
            .addScaledVector(normalNext, Math.cos(angleNext) * SPIRAL_RADIUS)
            .addScaledVector(binormalNext, Math.sin(angleNext) * SPIRAL_RADIUS);
        const lookAtTarget = posNext.add(offsetNext);

        // Standard lerp for smooth motion (dampening)
        shipRef.current.position.lerp(finalPos, delta * 5);

        // Smooth rotation
        const dummy = new THREE.Object3D();
        dummy.position.copy(shipRef.current.position);
        dummy.lookAt(lookAtTarget);

        // Bank into the turn (Roll)
        // Simple approximation: Roll based on helix angle
        const roll = Math.PI / 4; // Constant energetic bank? Or dynamic?
        // Dynamic banking is hard without robust frenet frames. 
        // Let's rely on lookAt which naturally banks if target is spiral.
        // We add manual roll:
        shipRef.current.quaternion.slerp(dummy.quaternion, delta * 5);
        shipRef.current.rotateZ(delta * 2); // Slow barrel roll just for fun? No, strict spiral.

        // Banking logic: The spiral naturally creates up-vector changes. 
        // We'll trust lookAt for now.
    });

    return (
        <group>
            {/* Trail Effect */}
            <Trail
                width={2}
                length={8}
                color={new THREE.Color("#00f3ff")}
                attenuation={(t) => t * t}
            >
                <group ref={shipRef}>
                    <primitive object={scene} scale={ASSET_SCALES.spaceship} rotation={[0, Math.PI, 0]} />

                    {/* Engine Viz */}
                    <EngineFlame position={[0, 0, -0.3]} /> {/* Adjusted for 0.2 scale */}

                    {/* Dynamic Light */}
                    <pointLight color="#00f3ff" intensity={2} distance={10} decay={2} position={[0, 0, -2]} />
                </group>
            </Trail>
        </group>
    );
}
