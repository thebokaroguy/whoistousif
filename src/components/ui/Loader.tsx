"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
                >
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

                    {/* Logo / Brand Mark */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative mb-8"
                    >
                        <div className="relative w-[90vw] md:w-[60vw] max-w-6xl">
                            <motion.img
                                src="/assets/trobotix-logo.png"
                                alt="TROBOTIX"
                                className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]"
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>


                    {/* Loading Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xs tracking-[0.5em] text-cyan-500 uppercase mb-8 font-mono"
                    >
                        INITIALIZING SYSTEMS
                    </motion.div>

                    {/* Progress Bar */}
                    <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ ease: "easeOut" }}
                        />
                    </div>

                    {/* Percentage */}
                    <motion.div
                        className="mt-4 font-mono text-sm text-white/50"
                    >
                        {Math.min(Math.round(progress), 100)}%
                    </motion.div>

                    {/* Status Messages */}
                    <motion.div
                        className="absolute bottom-10 text-xs text-white/30 font-mono"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {progress < 30 && "Loading 3D assets..."}
                        {progress >= 30 && progress < 60 && "Compiling shaders..."}
                        {progress >= 60 && progress < 90 && "Initializing camera systems..."}
                        {progress >= 90 && "Ready for launch."}
                    </motion.div>
                </motion.div>
            )
            }
        </AnimatePresence >
    );
}
