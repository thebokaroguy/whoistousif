import * as THREE from "three";
import { CAREER_MILESTONES } from "@/lib/constants";

export const createTrackCurve = () => {
    // Create points from milestones
    const points = CAREER_MILESTONES.map((m) => new THREE.Vector3(...m.position));

    // Add a smooth lead-in
    const start = new THREE.Vector3(0, 0, 10);
    // Add a smooth lead-out
    const end = new THREE.Vector3(0, 10, -100);

    return new THREE.CatmullRomCurve3(
        [start, ...points, end],
        false, // Closed
        "catmullrom",
        0.5 // Tension
    );
};
