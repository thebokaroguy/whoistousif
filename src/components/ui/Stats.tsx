"use client";

import { useStore } from "@/lib/store";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

function AnimatedNumber({ value }: { value: number }) {
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
}

export default function Stats() {
    const scrollProgress = useStore((state) => state.scrollProgress);
    const [showStats, setShowStats] = useState(false);

    // Trigger stats when we are deep into the journey (e.g. > 50% or near end)
    // Or maybe always visible but tucked away? 
    // Requirement: "Data Storytelling" -> Animated statistics.
    // Let's make it a section that appears at the end (2025/2026).

    useEffect(() => {
        if (scrollProgress > 0.8) {
            setShowStats(true);
        } else {
            setShowStats(false);
        }
    }, [scrollProgress]);

    if (!showStats) return null;

    return (
        <div className="fixed top-20 right-6 md:right-20 flex flex-col gap-6 items-end pointer-events-none z-20">
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                className="text-right"
            >
                <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-white">
                    <AnimatedNumber value={600} />+
                </div>
                <div className="text-xs tracking-[0.3em] text-cyan-500 uppercase">Students Mentored</div>
            </motion.div>

            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-right"
            >
                <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-purple-400 to-white">
                    <AnimatedNumber value={1000} />+
                </div>
                <div className="text-xs tracking-[0.3em] text-purple-500 uppercase">Projects Built</div>
            </motion.div>
        </div>
    );
}
