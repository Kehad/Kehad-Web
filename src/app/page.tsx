"use client";
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Scene, { FinalScene } from "@/components/home/Scene";
import SplashScreen from "@/components/others/SplashScreen";
import LandingPage from "@/components/home/LandingPage";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false); // normaly false
  const [entered, setEntered] = useState(false); // normaly false
  
  // const [splashDone, setSplashDone] = useState(true); 
  // const [entered, setEntered] = useState(false); 
  return (
    <div className="w-full h-screen relative overflow-hidden bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-500">
      {/* Optional: Add animated subtle noise overlay or extra grid for modern look */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      {/* 3D Modern Computer Application (Phase 3) */}
      {!entered && splashDone && (
         <div className="relative w-full h-screen overflow-hidden">
            <FinalScene setEntered={setEntered} />
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
      {/* <LandingPage /> */}
      
      {/* The 2-step Loading Flow Container */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
       {/* <SplashScreen onComplete={() => setSplashDone(false)} /> */}
    </div>
  );
}
