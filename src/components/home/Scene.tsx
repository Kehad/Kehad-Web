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
      <color attach="background" args={['#010101']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 20, 10]} intensity={1200} color="#ffffff" />
      <Environment preset="city" />

      <ModernComputer />

      {/* Ground soft shadow moved lower for the cabinet */}
      <ContactShadows ref={shadowRef} position={[0, -3.5, 0]} opacity={0.4} scale={40} blur={2.5} far={10} color="#000" />
    </>
  );  
}
