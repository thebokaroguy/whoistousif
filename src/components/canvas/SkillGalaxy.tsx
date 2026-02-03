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
                <div className="text-4xl font-bold text-center pointer-events-none">
                    <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]">NEURAL</span>
                    <span className="text-white"> SKILL </span>
                    <span className="text-purple-500 drop-shadow-[0_0_10px_rgba(188,19,254,0.8)]">NETWORK</span>
                </div>
            </Html>

            {/* Render Connections (Synapses) */}
            {activeLinks.map((link, i) => {
                const source = SKILL_NODES.find((n) => n.id === link.source)!;
                const target = SKILL_NODES.find((n) => n.id === link.target)!;

                // Determine color: if hovered, use active color, else dim
                const isRelated = hoveredNode && (link.source === hoveredNode || link.target === hoveredNode);
                const color = hoveredNode
                    ? (isRelated ? "#ffffff" : "#333333")
                    : "#4b5563"; // Default gray

                return (
                    <Line
                        key={i}
                        points={[source.position, target.position]}
                        color={color}
                        lineWidth={isRelated ? 2 : 0.5}
                        transparent
                        opacity={hoveredNode ? (isRelated ? 1 : 0.1) : 0.3}
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
                            <sphereGeometry args={[node.group === "core" ? 0.6 : 0.3, 32, 32]} />
                            <meshStandardMaterial
                                color={GROUP_COLORS[node.group]}
                                emissive={GROUP_COLORS[node.group]}
                                emissiveIntensity={isHovered ? 2 : (isDimmed ? 0.1 : 0.5)}
                                transparent
                                opacity={isDimmed ? 0.2 : 1}
                            />
                        </mesh>

                        {/* Hover Label */}
                        {(isHovered || isRelated) && (
                            <Html distanceFactor={10}>
                                <div className={`text-xs md:text-sm font-bold bg-black/80 px-2 py-1 rounded border border-white/20 whitespace-nowrap
                                    ${isHovered ? 'text-white border-cyan-400 scale-125 z-50' : 'text-gray-300 scale-100'}
                                    transition-all duration-200`}>
                                    {node.label}
                                </div>
                            </Html>
                        )}

                        {/* Persistent Label for Core Nodes if not hovering anything */}
                        {!hoveredNode && node.group === 'core' && (
                            <Html distanceFactor={10}>
                                <div className="text-xs font-mono text-gray-400 opacity-50">
                                    {node.label}
                                </div>
                            </Html>
                        )}
                    </group>
                );
            })}
        </group>
    );
}
