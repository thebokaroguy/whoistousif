"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import Astronaut from "./Astronaut";
import { MODEL_PATHS, ASSET_SCALES } from "./assets/AssetConfig";
import { Instances, Instance, useGLTF } from "@react-three/drei";

interface RepairZoneProps {
    curve: THREE.CatmullRomCurve3;
}

export default function RepairZone({ curve }: RepairZoneProps) {
    // Generate repair spots along the curve
    const repairSpots = useMemo(() => {
        const spots: { position: THREE.Vector3; rotation: THREE.Euler; type: string; scale: number }[] = [];
        const count = 8; // Reduced from 15 for cleaner scene

        for (let i = 0; i < count; i++) {
            const t = 0.1 + (Math.random() * 0.8);
            const position = curve.getPointAt(t);

            const offset = new THREE.Vector3(
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 4,
                0
            );
            position.add(offset);

            const rotation = new THREE.Euler(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                0
            );

            const rand = Math.random();
            let type = 'astronaut';
            if (rand > 0.6) type = 'robot';
            if (rand > 0.85) type = 'grabbot';

            // Heavy machinery (5% chance, pushed far out)
            if (Math.random() > 0.95) {
                spots.push({
                    position: position.clone().add(new THREE.Vector3(0, -10, 0)),
                    rotation,
                    type: 'forklift',
                    scale: ASSET_SCALES.forklift
                });
            }

            // Floating tools (5% chance)
            if (Math.random() > 0.95) {
                spots.push({
                    position: position.clone().add(new THREE.Vector3(
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 4,
                        (Math.random() - 0.5) * 4
                    )),
                    rotation: new THREE.Euler(Math.random(), Math.random(), Math.random()),
                    type: 'tool',
                    scale: ASSET_SCALES.drill // All tools use similar scale
                });
            }

            spots.push({
                position,
                rotation,
                type,
                scale: type === 'grabbot' ? ASSET_SCALES.grabbot : ASSET_SCALES.astronaut
            });
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
                            scale={spot.scale}
                        />
                    )}
                    {spot.type === 'forklift' && (
                        <primitive
                            object={useGLTF(MODEL_PATHS.forklift).scene.clone()}
                            position={[spot.position.x, spot.position.y, spot.position.z]}
                            rotation={[0, spot.rotation.y + Math.PI / 2, 0]}
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
                            scale={spot.scale}
                        />
                    )}
                </group>
            ))}
        </group>
    );
}
