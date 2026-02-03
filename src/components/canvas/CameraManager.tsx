"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { createTrackCurve } from "@/lib/curve";
import { useScroll } from "framer-motion";

export default function CameraManager() {
    const { camera, size } = useThree();
    const scrollProgress = useStore((state) => state.scrollProgress);
    const curve = createTrackCurve();
    const { scrollY } = useScroll();

    // Intro state
    const [introFinished, setIntroFinished] = useState(false);
    const vec = new THREE.Vector3();

    useEffect(() => {
        // Initial camera position for "Outer Space" view
        camera.position.set(0, 50, 100);
        camera.lookAt(0, 0, 0);

        // Animate to start position
        // In a real app we might use a proper spring or tween here
        // For now, we rely on the user "Init" action or pure time
        const timer = setTimeout(() => {
            setIntroFinished(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, [camera]);

    useFrame((state, delta) => {
        if (!introFinished) {
            // Intro Animation: Fly down to the track start
            const targetPos = new THREE.Vector3(0, 5, 20); // Behind the car
            camera.position.lerp(targetPos, delta * 2);
            camera.lookAt(0, 0, 0);
        } else {
            // Follow Logic

            // 1. Get Robot Position (Point on curve)
            // We use scrollProgress directly. 
            // Note: Robot uses scrollProgress, so camera should follow that.

            const followOffset = 0.02; // Camera lags slightly behind or is positioned relatively
            const lookAtOffset = 0.04; // Look ahead

            // Calculate points
            const camPosIndex = Math.max(0, scrollProgress - followOffset);
            const lookAtIndex = Math.min(1, scrollProgress + lookAtOffset);

            const p1 = curve.getPointAt(camPosIndex);
            const p2 = curve.getPointAt(lookAtIndex);

            // Offset camera position relative to the curve point
            // We want a "Chase Cam" feel: Up and Behind
            // Simple approach: Place camera at p1, but offset by some vector?
            // Better: Use tangents.

            const tangent = curve.getTangentAt(camPosIndex).normalize();
            const up = new THREE.Vector3(0, 1, 0);
            const side = new THREE.Vector3().crossVectors(up, tangent).normalize();
            const normal = new THREE.Vector3().crossVectors(tangent, side).normalize();

            // RESPONSIVE OFFSET LOGIC
            // Use state.size to ensure we have the fresh dimensions every frame
            const isMobile = state.size.width < 1024; // Treat Tablets (<1024px) as mobile to keep camera further back

            const sideOffset = 0; // Centered Camera
            const heightOffset = isMobile ? 6 : 3; // Mobile/Tablet: Lower height for closer feel
            const distanceOffset = isMobile ? 10 : 6; // Mobile/Tablet: Keep distance 10 to prevent zooming in too much

            // Target Camera Position
            const targetPos = p1.clone()
                .sub(tangent.clone().multiplyScalar(distanceOffset)) // Distance behind
                .add(up.clone().multiplyScalar(heightOffset)) // Height up
                .add(side.clone().multiplyScalar(sideOffset)); // Side offset

            // Look At: The car / future point
            // On desktop, we still look at the car, but since we are to the right, it appears to the left.
            const targetLook = p2;

            // Smoothly interpolate
            camera.position.lerp(targetPos, delta * 3);
            camera.lookAt(targetLook);
        }
    });

    return null;
}
