"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const EngineFlameShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#00f3ff") },
        uCoreColor: { value: new THREE.Color("#ffffff") },
    },
    vertexShader: `
        varying vec2 vUv;
        varying float vNoise;
        uniform float uTime;

        // Simple noise function
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
            vUv = uv;
            
            // Jitter position for "rumble" effect
            vec3 pos = position;
            float noise = random(vec2(uTime * 10.0, uv.y));
            pos.x += noise * 0.02 * uv.y; 
            pos.z += noise * 0.02 * uv.y;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uCoreColor;

        void main() {
            // Gradient from top (source) to bottom (exhaust)
            float alpha = 1.0 - vUv.y;
            alpha = pow(alpha, 2.0); // Sharp fade

            // Pulse effect
            float pulse = sin(uTime * 20.0 - vUv.y * 10.0) * 0.2 + 0.8;
            
            vec3 finalColor = mix(uColor, uCoreColor, 1.0 - vUv.y * 2.0); // White core at top
            
            gl_FragColor = vec4(finalColor * 2.0, alpha * pulse);
        }
    `
};

export default function EngineFlame({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const materialRef = useRef<THREE.ShaderMaterial>(null!);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
        // Always face camera for "billboard" feel or keep cylindrical?
        // Cylindrical is better for 3D engine.
        if (meshRef.current) {
            meshRef.current.scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime * 30) * 0.05);
        }
    });

    return (
        <mesh ref={meshRef} position={position} rotation={[Math.PI, 0, 0]}>
            {/* Cone geometry for flame shape */}
            <cylinderGeometry args={[0.2, 0, 1.5, 16, 4, true]} />
            <shaderMaterial
                ref={materialRef}
                args={[EngineFlameShader]}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
