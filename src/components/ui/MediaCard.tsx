"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface MediaCardProps {
    type: "image" | "video";
    path: string;
    label: string;
    index: number;
}

export default function MediaCard({ type, path, label, index }: MediaCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group overflow-hidden rounded-xl cursor-pointer"
            style={{
                perspective: "1000px",
            }}
        >
            {/* Holographic Border */}
            <motion.div
                className="absolute -inset-[1px] rounded-xl z-0"
                style={{
                    background: "linear-gradient(135deg, #00F3FF, #BC13FE, #00F3FF)",
                    backgroundSize: "200% 200%",
                }}
                animate={{
                    backgroundPosition: isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner Container */}
            <motion.div
                className="relative bg-black rounded-xl overflow-hidden z-10"
                animate={{
                    rotateY: isHovered ? 5 : 0,
                    rotateX: isHovered ? -5 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Media Content */}
                {type === "video" ? (
                    <video
                        src={path}
                        autoPlay
                        muted={!isHovered} // Sound plays only on hover
                        loop
                        playsInline
                        onLoadedData={() => setIsLoaded(true)}
                        className="w-full h-64 object-cover"
                    />
                ) : (
                    <motion.img
                        src={path}
                        alt={label}
                        onLoad={() => setIsLoaded(true)}
                        initial={{ scale: 1.2, filter: "blur(10px)" }}
                        animate={{
                            scale: isLoaded ? (isHovered ? 1.1 : 1) : 1.2,
                            filter: isLoaded ? "blur(0px)" : "blur(10px)"
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-64 object-cover"
                    />
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Scanline Effect */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,243,255,0.03) 2px, rgba(0,243,255,0.03) 4px)",
                    }}
                />

                {/* Label */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
                    className="absolute bottom-0 left-0 w-full p-3"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full" />
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white font-medium truncate">
                            {label}
                        </span>
                    </div>
                </motion.div>

                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-cyan-500/50 rounded-tl-md" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-purple-500/50 rounded-tr-md" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-purple-500/50 rounded-bl-md" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-cyan-500/50 rounded-br-md" />
            </motion.div>
        </motion.div>
    );
}
