"use client";
import React, { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useScroll, Html, ScrollControls } from "@react-three/drei";
import ModernComputer from "./ModernComputer";
import { Canvas } from "@react-three/fiber";

// Overlay removed, handled securely outside Canvas for true fixed positioning

export default function Scene({ onEnter }: { onEnter?: () => void }) {
  const scroll = useScroll();
  const shadowRef = useRef<any>(null);
  const maxScrollRef = useRef(0);
  const enteredRef = useRef(false);

  // Fade out the shadow and external scroll indicator
  useFrame(() => {
    if (scroll.offset > maxScrollRef.current) {
      maxScrollRef.current = scroll.offset;
    }
    const safeOffset = maxScrollRef.current;

    if (shadowRef.current) {
      shadowRef.current.opacity = Math.max(0, 0.65 - safeOffset);
    }
    const indicatorEl = document.getElementById('scroll-indicator');
    if (indicatorEl) {
      indicatorEl.style.opacity = Math.max(0, 1 - safeOffset * 6).toString();
    }

    if (safeOffset >= 0.99 && !enteredRef.current) {
      enteredRef.current = true;
      if (onEnter) {
        setTimeout(() => {
          onEnter();
        }, 300);
      }
    }
  });

  return (
    <>
      <color attach="background" args={["#020202"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 20, 10]} intensity={1200} color="#ffffff" />
      <pointLight position={[-10, 5, 5]} intensity={400} color="#3b82f6" />
      <Environment preset="night" />

      {/* <div></div> */}
      
      <ModernComputer />
    </>
  );  
}
export const FinalScene = ({setEntered}: {setEntered: (value: boolean) => void}) => (
  <div className="relative w-full h-screen overflow-hidden">
    {/* The Background Image */}
    <div 
      className="absolute inset-0 z-0"
      style={{
        // backgroundImage: 'url("/your-background-image.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: "red",
      }}
    />
  
    {/* Your Canvas */}
    <Canvas camera={{ position: [0, 0.5, 8], fov: 45 }} className="relative z-10">
      <Suspense fallback={null}>
        <ScrollControls pages={3} damping={0.25}>
          <Scene onEnter={() => setEntered(true)} />
        </ScrollControls>
      </Suspense>
    </Canvas>
  </div>
)