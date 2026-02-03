"use client";

import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export default function PilotProfile() {
    const scrollProgress = useStore((state) => state.scrollProgress);
    // Show only at the very start (Intro)
    const isVisible = scrollProgress < 0.02;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50, transition: { duration: 0.5 } }}
                    className="fixed top-10 left-6 md:left-20 flex items-center gap-4 z-20 pointer-events-none"
                >
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                        <img
                            src="/assets/mypersonalphoto1.jpg"
                            alt="Pilot"
                            className="w-full h-full object-cover object-top scale-110"
                        />
                        <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay" />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs text-cyan-500 tracking-[0.2em] uppercase mb-1">Authenticated Pilot</span>
                        <span className="text-xl md:text-2xl font-bold text-white tracking-tight">Tousif</span>
                        <span className="text-xs text-gray-400 font-mono">STATUS: ONLINE</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
