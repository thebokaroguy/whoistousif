"use client";

import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { FileText, Clapperboard } from "lucide-react";

export default function ViewToggle() {
    const viewMode = useStore((state) => state.viewMode);
    const setViewMode = useStore((state) => state.setViewMode);

    return (
        <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={() => setViewMode(viewMode === 'cinematic' ? 'resume' : 'cinematic')}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 pr-4 hover:bg-white/10 transition-colors group"
        >
            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-colors
                ${viewMode === 'cinematic' ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}
            `}>
                {viewMode === 'cinematic' ? <Clapperboard size={18} /> : <FileText size={18} />}
            </div>
            <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase text-gray-400 font-mono tracking-widest">View Mode</span>
                <span className="text-xs font-bold text-white uppercase">
                    {viewMode === 'cinematic' ? 'Cinematic' : 'Resume'}
                </span>
            </div>
        </motion.button>
    );
}
