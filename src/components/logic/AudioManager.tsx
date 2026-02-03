"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";

export default function AudioManager() {
    const [interacted, setInteracted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const scrollProgress = useStore((state) => state.scrollProgress);

    useEffect(() => {
        const handleInteract = () => {
            setInteracted(true);
            if (audioRef.current) {
                audioRef.current.play().catch(() => { });
                audioRef.current.volume = 0.2;
            }
        };

        window.addEventListener("click", handleInteract);
        window.addEventListener("scroll", handleInteract);

        return () => {
            window.removeEventListener("click", handleInteract);
            window.removeEventListener("scroll", handleInteract);
        };
    }, []);

    // Dynamic volume based on speed/progress could go here

    return (
        <audio
            ref={audioRef}
            loop
            src="/assets/ambient-space.mp3" // Placeholder - user would need to provide this
            className="hidden"
        />
    );
}
