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

// Preload all models to prevent stutter
Object.values(MODEL_PATHS).forEach((path) => {
    useGLTF.preload(path);
});

export function usePortfolioAssets() {
    return MODEL_PATHS;
}
