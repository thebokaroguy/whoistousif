"use client";

import { useGLTF } from "@react-three/drei";

export const MODEL_PATHS = {
    astronaut: "/models/astronaut.glb",
    robot: "/models/robot.glb",
    giantRobot: "/models/giant_robot.glb",
    spaceship: "/models/spaceship.glb",
    xwing: "/models/xwing.glb",
    drill: "/models/drill.glb",
    saw: "/models/saw.glb",
    grabbot: "/models/grabbot.glb",
    gear: "/models/gear.glb",
    ladder: "/models/ladder.glb",
    bulldozer: "/models/bulldozer.glb",
    forklift: "/models/forklift.glb",
    wrench: "/models/wrench.glb",
};

/**
 * Centralized Scale Registry
 * All GLB files have inconsistent native scales (exported in cm/inches).
 * These values normalize them to a consistent 1 unit = 1 meter world scale.
 */
export const ASSET_SCALES: Record<keyof typeof MODEL_PATHS, number> = {
    astronaut: 1.0,      // Native ~1.8m, target 1.8m (human scale)
    robot: 0.8,          // Slightly smaller than human
    grabbot: 0.08,       // Native ~30m, target ~2.4m
    giantRobot: 0.005,   // Native ~500m, target ~2.5m (Reduced 10x again)
    spaceship: 0.02,     // Native ~25m, target ~0.5m (Reduced 7x again)
    xwing: 0.02,         // Native ~50m, target ~1m
    drill: 0.015,        // Native ~20m, target ~0.3m (handheld)
    saw: 0.015,
    gear: 0.015,
    ladder: 0.02,        // Native ~15m, target ~0.3m
    forklift: 0.08,      // Native ~40m, target ~3.2m
    bulldozer: 0.08,     // Removed from scene but kept for reference
    wrench: 0.015,
};

// Preload all models to prevent stutter
Object.values(MODEL_PATHS).forEach((path) => {
    useGLTF.preload(path);
});

export function usePortfolioAssets() {
    return MODEL_PATHS;
}
