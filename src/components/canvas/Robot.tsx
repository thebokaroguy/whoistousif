"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import { createTrackCurve } from "@/lib/curve";

export default function Robot() {
    const { scene } = useGLTF("/assets/Lamborginhi Aventador_test.glb");
    const robotRef = useRef<THREE.Group>(null!);
    const curve = useMemo(() => createTrackCurve(), []);

    // Connect to global scroll state
    const scrollProgress = useStore((state) => state.scrollProgress);

    useFrame((state) => {
        if (robotRef.current) {
            // Calculate position on curve
            const point = curve.getPointAt(scrollProgress);
            // Calculate lookAt target (slightly ahead)
            // Clamp to 0.99 to avoid tangent errors at end
            const lookAtPoint = curve.getPointAt(Math.min(scrollProgress + 0.01, 0.999));

            // Soft floating sine wave
            const floatY = Math.sin(state.clock.elapsedTime) * 0.1;

            // Apply position with lerp for smoothness (optional, strict follow for now)
            robotRef.current.position.copy(point);
            robotRef.current.position.y += floatY;

            robotRef.current.lookAt(lookAtPoint);
        }
    });

    return (
        <group ref={robotRef} dispose={null}>
            {/* Scale might need adjustment depending on the model's native size */}
            <primitive object={scene} scale={0.5} rotation={[0, 0, 0]} />
        </group>
    );
}
