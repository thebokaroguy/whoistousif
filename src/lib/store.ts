import { create } from 'zustand';

interface GameState {
    scrollProgress: number;
    currentMilestoneIndex: number;
    viewMode: 'cinematic' | 'resume';
    setScrollProgress: (progress: number) => void;
    setCurrentMilestoneIndex: (index: number) => void;
    setViewMode: (mode: 'cinematic' | 'resume') => void;
}

export const useStore = create<GameState>((set) => ({
    scrollProgress: 0,
    currentMilestoneIndex: 0,
    viewMode: 'cinematic',
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setCurrentMilestoneIndex: (index) => set({ currentMilestoneIndex: index }),
    setViewMode: (mode) => set({ viewMode: mode }),
}));
