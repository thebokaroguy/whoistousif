"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CAREER_MILESTONES } from "@/lib/constants";
import { createTrackCurve } from "@/lib/curve";
import MilestoneMarker from "./MilestoneMarker";

export default function Track() {
    const curve = useMemo(() => createTrackCurve(), []);

    const tubeRef = useRef<THREE.Mesh>(null!);

    return (
        <group>
            {/* The visible glowing track */}
            <mesh ref={tubeRef}>
                <tubeGeometry args={[curve, 64, 0.5, 8, false]} />
                <meshStandardMaterial
                    color="#00f3ff"
                    emissive="#00f3ff"
                    emissiveIntensity={0.5}
                    roughness={0.4}
                    metalness={0.8}
                    wireframe={true} // Sci-fi grid look
                />
            </mesh>

            {/* Helper visible nodes for milestones */}
            {CAREER_MILESTONES.map((milestone, index) => (
                <MilestoneMarker
                    key={index}
                    index={index}
                    position={new THREE.Vector3(...milestone.position)}
                    title={milestone.title}
                />
            ))}
        </group>
    );
}
