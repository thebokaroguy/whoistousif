"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useStore } from "@/lib/store";
import { CAREER_MILESTONES } from "@/lib/constants";

export default function ScrollLogic() {
    const { scrollYProgress } = useScroll();
    const setScrollProgress = useStore((state) => state.setScrollProgress);
    const setCurrentMilestoneIndex = useStore((state) => state.setCurrentMilestoneIndex);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrollProgress(latest);

        // simple logic to determine current milestone based on scroll segments
        const total = CAREER_MILESTONES.length;
        // Map 0-1 to 0-(total-1)
        const index = Math.min(
            Math.floor(latest * total),
            total - 1
        );
        setCurrentMilestoneIndex(index);
    });

    return null; // Logic only, no UI
}
