"use client";

import { useStore } from "@/lib/store";
import { CAREER_MILESTONES } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { CircuitBoard } from "lucide-react";
import MediaCard from "./MediaCard";

export default function Dashboard() {
    const currentMilestoneIndex = useStore((state) => state.currentMilestoneIndex);
    const scrollProgress = useStore((state) => state.scrollProgress);
    const milestone = CAREER_MILESTONES[currentMilestoneIndex];

    // Only show dashboard if we have started scrolling (and not at end)
    const isVisible = scrollProgress > 0.05 && scrollProgress < 0.95;

    // Determine alignment (default to 'right' if not specified)
    const alignment = milestone?.alignment || "right";
    const isLeft = alignment === "left";

    return (
        <div className="fixed inset-0 z-20 pointer-events-none">
            <AnimatePresence>
                {isVisible && milestone && (
                    <motion.div
                        key={milestone.year}
                        initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isLeft ? -100 : 100 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className={`pointer-events-auto absolute 
                            /* MOBILE: Bottom Sheet */
                            bottom-0 left-0 w-full max-w-full h-[60vh] md:h-[45vh] border-t border-white/10
                            /* TABLET: Narrower Sidebar */
                            md:top-0 md:bottom-auto md:w-[45vw] md:h-full md:border-t-0
                            /* DESKTOP: Optimal Width */
                            lg:w-[35vw] xl:w-[30vw]
                            ${isLeft ? 'md:left-0 md:right-auto md:border-r' : 'md:right-0 md:left-auto md:border-l'}
                            
                            bg-black/80 backdrop-blur-xl flex flex-col overflow-hidden`}
                    >
                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 space-y-4 md:space-y-6 touch-pan-y">

                            {/* Header Section */}
                            <div className="space-y-2">
                                <h2 className="text-xs md:text-sm font-mono text-cyan-400 tracking-widest flex items-center gap-2">
                                    <CircuitBoard size={16} />
                                    SYSTEM_NODE_{2021 + currentMilestoneIndex}
                                </h2>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                                        {milestone.year}
                                    </span>
                                    <span className="text-xl md:text-2xl text-gray-400 font-light">
                                        {milestone.title}
                                    </span>
                                </div>
                            </div>

                            {/* Description - Enhanced Visibility */}
                            <div className="relative">
                                <p className="text-sm md:text-xl text-gray-200 leading-relaxed font-light border-l-2 border-cyan-500/50 pl-4 break-words hyphens-auto pr-2">
                                    {milestone.description}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full bg-gradient-to-r from-cyan-500/30 to-transparent" />

                            {/* Media Gallery - Responsive Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 pb-20">
                                {milestone.assets.map((asset, i) => (
                                    <MediaCard
                                        key={i}
                                        type={asset.type as "image" | "video"}
                                        path={asset.path}
                                        label={asset.label}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Mobile Drag Indicator (Visual Only) */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent md:hidden" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Persistent Progress Bar - Fixed to very bottom */}
            <div className="fixed bottom-0 left-0 w-full h-1 bg-white/10 z-50">
                <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>
        </div>
    );
}
