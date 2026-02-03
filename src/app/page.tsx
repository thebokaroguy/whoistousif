"use client";

import ScrollLogic from "@/components/logic/ScrollLogic";
import AudioManager from "@/components/logic/AudioManager";
import Dashboard from "@/components/ui/Dashboard";
import HeroOverlay from "@/components/ui/HeroOverlay";
import Stats from "@/components/ui/Stats";
import PilotProfile from "@/components/ui/PilotProfile";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";
import ViewToggle from "@/components/ui/ViewToggle";
import ResumeView from "@/components/ui/ResumeView";
import Loader from "@/components/ui/Loader";
import ContactSection from "@/components/ui/ContactSection";
import SceneWrapper from "@/components/canvas/SceneWrapper";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export default function Home() {
  const viewMode = useStore((state) => state.viewMode);

  return (
    <main className="relative w-full bg-black text-white">
      {/* Visual Toggle for Modes */}
      <ViewToggle />

      <AnimatePresence mode="wait">
        {viewMode === 'cinematic' ? (
          <motion.div
            key="cinematic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Premium Loader */}
            <Loader />

            {/* 500vh height to enable long scrolling */}
            <div className="h-[500vh]">
              <ScrollLogic />
              <AudioManager />
              {/* 3D Background - Fixed with Error Recovery */}
              <div className="fixed inset-0 z-0">
                <ErrorBoundary>
                  <SceneWrapper />
                </ErrorBoundary>
              </div>

              {/* UI Overlay */}
              <Dashboard />
              <HeroOverlay />
              <PilotProfile />
              <Stats />
              <ContactSection />
            </div>
          </motion.div>
        ) : (
          <ResumeView key="resume" />
        )}
      </AnimatePresence>
    </main>
  );
}
