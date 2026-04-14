"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useScroll, Html } from "@react-three/drei";
import ModernComputer from "./ModernComputer";

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
