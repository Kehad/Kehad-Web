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
    const hasVisited = localStorage.getItem("kehad_has_visited");
    if (hasVisited) {
      setSplashDone(true);
      setEntered(true);
    }
    setIsLoading(false);
  }, []);

  const handleEnter = (val: boolean) => {
    setEntered(val);
    if (val) {
      localStorage.setItem("kehad_has_visited", "true");
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
      


      {/* Phase 4: Final Landing Page */}
      {splashDone && (
        <div className="absolute inset-0 z-50">
          <LandingPage />
        </div>
      )}
      
      {/* The 2-step Loading Flow Container */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
    </div>
  );
}
