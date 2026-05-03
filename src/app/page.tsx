"use client";
import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { AnimatePresence, motion } from "motion/react";
import Scene, { FinalScene } from "@/components/home/Scene";
import SplashScreen from "@/components/others/SplashScreen";
import LandingPage from "@/components/home/LandingPage";

// This variable will reset on page refresh, but persist across React route navigations
let hasShownSplashThisLoad = false;

export default function Home() {
  const [splashDone, setSplashDone] = useState(hasShownSplashThisLoad); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hasShownSplashThisLoad) {
      setSplashDone(true);
    }
    setIsLoading(false);
  }, []);

  // Prevent hydration mismatch by blocking render until we check
  if (isLoading) {
    return <div className="w-full h-screen bg-[#0B0F19]" />;
  }

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#0B0F19] transition-colors duration-500">
      {/* Optional: Add animated subtle noise overlay or extra grid for modern look */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <AnimatePresence mode="wait">
        {!splashDone ? (
          <motion.div
            key="splash-container"
            exit={{ 
              opacity: 0, 
              scale: 1.1, 
              filter: "blur(20px)",
            }}
            transition={{ 
              duration: 1,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="absolute inset-0 z-50"
          >
            <SplashScreen onComplete={() => {
              setSplashDone(true);
              hasShownSplashThisLoad = true;
            }} />
          </motion.div>
        ) : (
          <motion.div
            key="landing-container"
            initial={{ 
              opacity: 0, 
              scale: 0.95,
              filter: "blur(10px)"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: "blur(0px)"
            }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              delay: 0.2
            }}
            className="absolute inset-0 z-50"
          >
            <LandingPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

