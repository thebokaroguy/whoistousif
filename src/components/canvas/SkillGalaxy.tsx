"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Instance, Instances, Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { SKILL_NODES, SKILL_LINKS, GROUP_COLORS } from "@/lib/skills";

export default function SkillGalaxy() {
    const groupRef = useRef<THREE.Group>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Filter links based on hover state
    const activeLinks = useMemo(() => {
        if (!hoveredNode) return SKILL_LINKS;
        return SKILL_LINKS.filter(
            (link) => link.source === hoveredNode || link.target === hoveredNode
        );
    }, [hoveredNode]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Slow ambient rotation
            groupRef.current.rotation.y += delta * 0.1;
            groupRef.current.rotation.z += delta * 0.05;
        }
    });

    return (
        <group position={[0, 8, -80]} ref={groupRef}>
            {/* Title */}
            <Html position={[0, 8, 0]} center distanceFactor={15} transform>
                <div className="flex flex-col items-center pointer-events-none select-none">
                    <div className="text-5xl md:text-7xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)] font-[family-name:var(--font-rajdhani)]">
                        NEURAL NETWORK
                    </div>
                    <div className="text-sm md:text-base tracking-[0.5em] text-cyan-300/80 mt-2 font-mono">
                        SKILL DATABASE_V2.0
                    </div>
                </div>
            </Html>

            {/* Render Connections (Synapses) */}
            {activeLinks.map((link, i) => {
                const source = SKILL_NODES.find((n) => n.id === link.source)!;
                const target = SKILL_NODES.find((n) => n.id === link.target)!;
                const isRelated = hoveredNode && (link.source === hoveredNode || link.target === hoveredNode);

                return (
                    <Line
                        key={i}
                        points={[source.position, target.position]}
                        color={isRelated ? "#00f3ff" : "#2a2a2a"}
                        lineWidth={isRelated ? 1.5 : 0.5}
                        transparent
                        opacity={hoveredNode ? (isRelated ? 0.8 : 0.05) : 0.15}
                    />
                );
            })}

            {/* Render Nodes */}
            {SKILL_NODES.map((node) => {
                const isHovered = hoveredNode === node.id;
                const isRelated = hoveredNode && SKILL_LINKS.some(
                    l => (l.source === hoveredNode && l.target === node.id) ||
                        (l.target === hoveredNode && l.source === node.id)
                );
                const isCore = node.group === 'core';

                // Dimming logic
                const isDimmed = hoveredNode && !isHovered && !isRelated;

                return (
                    <group key={node.id} position={node.position}>
                        {/* The Sphere Node */}
                        <mesh
                            onPointerOver={(e) => {
                                e.stopPropagation();
                                setHoveredNode(node.id);
                                document.body.style.cursor = "pointer";
                            }}
                            onPointerOut={() => {
                                setHoveredNode(null);
                                document.body.style.cursor = "auto";
                            }}
                        >
                            <sphereGeometry args={[isCore ? 0.6 : 0.3, 32, 32]} />
                            <meshStandardMaterial
                                color={GROUP_COLORS[node.group]}
                                emissive={GROUP_COLORS[node.group]}
                                emissiveIntensity={isHovered ? 3 : (isCore ? 1.5 : 0.8)}
                                toneMapped={false}
                                transparent
                                opacity={isDimmed ? 0.1 : 1}
                            />
                        </mesh>

                        {/* Point Light for Core Nodes */}
                        {isCore && !isDimmed && (
                            <pointLight
                                color={GROUP_COLORS[node.group]}
                                intensity={2}
                                distance={3}
                                decay={2}
                            />
                        )}

                        {/* HUD Label - Always Visible */}
                        <Html
                            center
                            distanceFactor={isCore ? 12 : 15}
                            zIndexRange={[100, 0]}
                            style={{
                                opacity: isDimmed ? 0.1 : 1,
                                transition: 'opacity 0.3s ease-in-out',
                                pointerEvents: 'none'
                            }}
                        >
                            <div className={`
                                relative flex items-center justify-center px-3 py-1.5 rounded-sm
                                transition-all duration-300 ease-out font-[family-name:var(--font-rajdhani)]
                                ${isHovered ? 'scale-110 z-50 bg-black/80 border border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.4)]' : ''}
                                ${isCore && !isHovered ? 'bg-black/40 border border-white/10 backdrop-blur-[2px]' : ''}
                                ${!isCore && !isHovered ? 'opacity-80' : ''}
                            `}>
                                {/* Decoration Lines for Core Nodes */}
                                {isCore && !isHovered && (
                                    <>
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />
                                    </>
                                )}

                                <span className={`
                                    whitespace-nowrap uppercase tracking-wider
                                    ${isHovered ? 'text-cyan-100 font-bold drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] text-base' : ''}
                                    ${isCore && !isHovered ? 'text-white font-semibold text-sm drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]' : ''}
                                    ${!isCore && !isHovered ? 'text-gray-300 font-normal text-xs drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]' : ''}
                                `}>
                                    {node.label}
                                </span>
                            </div>
                        </Html>
                    </group>
                );
            })}
        </group>
    );
}
