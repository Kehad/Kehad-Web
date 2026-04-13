"use client";
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Scene from "@/components/home/Scene";
import SplashScreen from "@/components/others/SplashScreen";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black">
      {/* Optional: Add animated subtle noise overlay or extra grid for modern look */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <Canvas camera={{ position: [0, 0.5, 8], fov: 45 }} className="relative z-10">
        <Suspense fallback={null}>
          <ScrollControls pages={3.5} damping={0.25}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>
      
      {/* The 2-step Loading Flow Container */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
    </div>
  );
}
