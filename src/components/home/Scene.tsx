"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useScroll, Html } from "@react-three/drei";
import ModernComputer from "./ModernComputer";

// Overlay removed, handled securely outside Canvas for true fixed positioning

export default function Scene() {
  const scroll = useScroll();
  const shadowRef = useRef<any>(null);

  // Fade out the shadow and external scroll indicator
  useFrame(() => {
    if (shadowRef.current) {
      shadowRef.current.opacity = Math.max(0, 0.65 - scroll.offset);
    }
    const indicatorEl = document.getElementById('scroll-indicator');
    if (indicatorEl) {
      indicatorEl.style.opacity = Math.max(0, 1 - scroll.offset * 6).toString();
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} castShadow />
      <directionalLight position={[-10, -5, -10]} intensity={0.5} />
      <Environment preset="city" />

      <ModernComputer />

      {/* Ground soft shadow */}
      <ContactShadows ref={shadowRef} position={[0, -1.2, 0]} opacity={0.65} scale={20} blur={3} far={5} color="#000" />
    </>
  );  
}
