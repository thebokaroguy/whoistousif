"use client";

import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroOverlay() {
    const scrollProgress = useStore((state) => state.scrollProgress);
    const isVisible = scrollProgress < 0.05; // Fade out quickly

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 leading-none">
                            ENGINEERING<br />FUTURE
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-6 text-sm md:text-2xl text-cyan-500/80 tracking-[0.3em] md:tracking-[0.5em] uppercase font-mono text-center px-4"
                    >
                        Interactive Career Journey
                    </motion.p>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-20 flex flex-col items-center gap-2"
                    >
                        <span className="text-xs uppercase tracking-[0.2em] text-cyan-500 animate-pulse">
                            Scroll to Initialize
                        </span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
