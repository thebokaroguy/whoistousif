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
                    >
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500">
                            ENGINEERING<br />FUTURE
                        </h1>
                    </motion.div>
                    {/* Title Section */}
                    <div className="relative z-10 max-w-4xl w-full px-6 md:px-0 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <h2 className="text-cyan-400 tracking-[0.3em] text-sm md:text-lg mb-4 font-mono">
                                ENGINEERING FUTURE
                            </h2>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
                                INTERACTIVE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                    CAREER JOURNEY
                                </span>
                            </h1>
                            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed font-light">
                                Explore the evolution of a Robotics & AI Engineer through a cinematic 3D timeline.
                            </p>
                        </motion.div>
                    </div>

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
