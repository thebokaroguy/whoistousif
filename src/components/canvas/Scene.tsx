"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Stars, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { Suspense, useMemo } from "react";

import Track from "./Track";
import Robot from "./Robot";
import CameraManager from "./CameraManager";
import SkillGalaxy from "./SkillGalaxy";
import ParticleField from "./ParticleField";

// Responsive Post-Processing
function ResponsiveEffects() {
    const { size } = useThree();
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;

    return (
        <EffectComposer enabled={!isMobile}>
            <Bloom
                luminanceThreshold={isMobile ? 0.6 : 0.4}
                luminanceSmoothing={0.9}
                height={isMobile ? 150 : 300}
                intensity={isMobile ? 0.8 : 1.2}
            />
            <Noise opacity={isMobile ? 0 : 0.03} />
            <Vignette eskil={false} offset={0.1} darkness={isMobile ? 0.8 : 1.1} />
        </EffectComposer>
    );
}

// Responsive Stars
function ResponsiveStars() {
    const { size } = useThree();
    const isMobile = size.width < 768;

    return (
        <Stars
            radius={100}
            depth={50}
            count={isMobile ? 1500 : 5000}
            factor={isMobile ? 3 : 4}
            saturation={0}
            fade
            speed={1}
        />
    );
}

export default function Scene() {
    return (
        <div className="w-full h-screen absolute top-0 left-0 -z-10 bg-black touch-none">
            <Canvas
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                dpr={[1, 1.5]} // Reduced max DPR for mobile performance
            >
                <AdaptiveDpr pixelated />
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <ResponsiveStars />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                    <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#bc13fe" />

                    {/* Scene Elements */}
                    <Track />
                    <Robot />
                    <SkillGalaxy />
                    <ParticleField />

                    {/* Camera Logic */}
                    <CameraManager />

                    {/* Responsive Post Processing */}
                    <ResponsiveEffects />
                </Suspense>
            </Canvas>

            {/* Cinematic Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
        </div>
    );
}

