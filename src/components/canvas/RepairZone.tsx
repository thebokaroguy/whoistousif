"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import Astronaut from "./Astronaut";
import { MODEL_PATHS } from "./assets/AssetConfig";
import { Instances, Instance, useGLTF } from "@react-three/drei";

interface RepairZoneProps {
    curve: THREE.CatmullRomCurve3;
}

export default function RepairZone({ curve }: RepairZoneProps) {
    // Generate repair spots along the curve
    const repairSpots = useMemo(() => {
        const spots = [];
        const count = 15; // Number of repair crews

        for (let i = 0; i < count; i++) {
            // Pick a random point on the curve (avoiding start/end extremes)
            const t = 0.1 + (Math.random() * 0.8);
            const position = curve.getPointAt(t);
            const tangent = curve.getTangentAt(t);

            // Offset from track slightly
            const offset = new THREE.Vector3(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                0
            );
            position.add(offset);

            // Rotation to face track or random
            const rotation = new THREE.Euler(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                0
            );

            // Weighted random selection for asset type
            const rand = Math.random();
            let type = 'astronaut';
            if (rand > 0.6) type = 'robot'; // 20%
            if (rand > 0.8) type = 'grabbot'; // 10%

            // Occasionally add heavy machinery (Bulldozer/Forklift)
            if (Math.random() > 0.9) {
                spots.push({
                    position: position.clone().add(new THREE.Vector3(0, -3, 0)),
                    rotation,
                    type: Math.random() > 0.5 ? 'bulldozer' : 'forklift',
                    scale: 2
                });
            }

            // Occasionally add floating tools (Gear/Ladder/Drill)
            if (Math.random() > 0.8) {
                spots.push({
                    position: position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2)),
                    rotation: new THREE.Euler(Math.random(), Math.random(), Math.random()),
                    type: 'tool',
                    scale: 0.5
                });
            }

            spots.push({ position, rotation, type, scale: 1 });
        }
        return spots;
    }, [curve]);

    return (
        <group>
            {repairSpots.map((spot, i) => (
                <group key={i}>
                    {spot.type === 'astronaut' && (
                        <Astronaut
                            position={[spot.position.x, spot.position.y, spot.position.z]}
                            rotation={[spot.rotation.x, spot.rotation.y, spot.rotation.z]}
                            scale={1.2}
                            action="work"
                        />
                    )}
                    {spot.type === 'robot' && (
                        <Astronaut // Re-using logic for basic robot
                            position={[spot.position.x, spot.position.y, spot.position.z]}
                            rotation={[spot.rotation.x, spot.rotation.y, spot.rotation.z]}
                            scale={0.8}
                            action="idle"
                        />
                    )}
                    {spot.type === 'grabbot' && (
                        <primitive
                            object={useGLTF(MODEL_PATHS.grabbot).scene.clone()}
                            position={[spot.position.x, spot.position.y, spot.position.z]}
                            rotation={[spot.rotation.x, spot.rotation.y, spot.rotation.z]}
                            scale={1}
                        />
                    )}
                    {(spot.type === 'bulldozer' || spot.type === 'forklift') && (
                        <primitive
                            object={useGLTF(spot.type === 'bulldozer' ? MODEL_PATHS.bulldozer : MODEL_PATHS.forklift).scene.clone()}
                            position={[spot.position.x, spot.position.y, spot.position.z]}
                            rotation={[spot.rotation.x + 0.5, spot.rotation.y, spot.rotation.z]}
                            scale={spot.scale}
                        />
                    )}
                    {spot.type === 'tool' && (
                        <primitive
                            object={useGLTF(
                                // Random tool selection
                                [MODEL_PATHS.drill, MODEL_PATHS.saw, MODEL_PATHS.gear, MODEL_PATHS.ladder][i % 4]
                            ).scene.clone()}
                            position={[spot.position.x, spot.position.y, spot.position.z]}
                            rotation={[spot.rotation.x, spot.rotation.y, spot.rotation.z]}
                            scale={0.5}
                        />
                    )}
                </group>
            ))}
        </group>
    );
}
