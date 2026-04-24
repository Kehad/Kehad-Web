"use client";
import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Scene, { FinalScene } from "@/components/home/Scene";
import SplashScreen from "@/components/others/SplashScreen";
import LandingPage from "@/components/home/LandingPage";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false); 
  const [entered, setEntered] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user has already visited the site in this session
    const hasVisited = sessionStorage.getItem("kehad_has_visited");
    if (hasVisited) {
      setSplashDone(true);
      setEntered(true);
    }
    setIsLoading(false);
  }, []);

  const handleEnter = (val: boolean) => {
    setEntered(val);
    if (val) {
      sessionStorage.setItem("kehad_has_visited", "true");
    }
  };

  // Prevent hydration mismatch by blocking render until we check sessionStorage
  if (isLoading) {
    return <div className="w-full h-screen bg-[#0B0F19]" />;
  }

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-500">
      {/* Optional: Add animated subtle noise overlay or extra grid for modern look */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      {/* 3D Modern Computer Application (Phase 3) */}
      {!entered && splashDone && (
         <div className="relative w-full h-screen overflow-hidden">
            <FinalScene setEntered={handleEnter} />
         </div>
      )}

      {/* True Fixed Scroll Indicator outside Canvas bounds */}
      {!entered && splashDone && (
        <div id="scroll-indicator" className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none animate-pulse z-50 transition-opacity duration-75" style={{ color: "rgba(255,176,0,0.8)" }}>
          <span className="text-sm tracking-widest uppercase mb-3 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Scroll to Enter</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-[rgba(255,176,0,0.8)] to-transparent rounded-full shadow-[0_0_8px_rgba(255,176,0,0.5)]"></div>
        </div>
      )}

      {/* Phase 4: Final Landing Page */}
      {entered && (
        <div className="absolute inset-0 z-50">
          <LandingPage />
        </div>
      )}
      
      {/* The 2-step Loading Flow Container */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
    </div>
  );
}
