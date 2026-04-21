"use client";
import { Environment, ContactShadows, useScroll, ScrollControls } from "@react-three/drei";
import ModernComputer from "./ModernComputer";
import { Canvas } from "@react-three/fiber";
import React, { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";

export default function Scene({ onEnter }: { onEnter?: () => void }) {
  const { resolvedTheme } = useTheme();
  const shadowRef = useRef<any>(null);
  const maxScrollRef = useRef(0);
  const enteredRef = useRef(false);
  const scroll = useScroll();

  useFrame(() => {
    if (scroll.offset > maxScrollRef.current) {
      maxScrollRef.current = scroll.offset;
    }
    const safeOffset = maxScrollRef.current;

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
      <color attach="background" args={[resolvedTheme === "light" ? "#ebe2e2" : "#0B0F19"]} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 20, 10]} intensity={1200} color="#ffffff" />
      <pointLight position={[-10, 5, 5]} intensity={400} color="#3b82f6" />
      <Environment preset="night" />
      
      <ModernComputer />
      <ContactShadows position={[0, -4.5, 0]} opacity={0.7} scale={50} blur={3} far={15} color="#000" />
    </>
  );  
}

export const FinalScene = ({setEntered}: {setEntered: (value: boolean) => void}) => (
  <div className="relative w-full h-screen overflow-hidden bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-500">
    {/* Your Canvas with Integrated 3D Background */}
    <Canvas camera={{ position: [0, 0.5, 8], fov: 45 }} className="relative z-10" shadows>
      <Suspense fallback={null}>
        <ScrollControls pages={3} damping={0.25}>
          <Scene onEnter={() => setEntered(true)} />
        </ScrollControls>
      </Suspense>
    </Canvas>
  </div>
)