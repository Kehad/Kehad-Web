"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useScroll, Html } from "@react-three/drei";
import ModernComputer from "./ModernComputer";

function Overlay() {
  const scroll = useScroll();
  const indicatorRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (indicatorRef.current) {
      indicatorRef.current.style.opacity = Math.max(0, 1 - scroll.offset * 4).toString();
    }
  });

  return (
    <Html fullscreen style={{ pointerEvents: "none" }}>
      <div className="w-full h-full relative">
        <div ref={indicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-pulse" style={{ color: "rgba(255,176,0,0.8)" }}>
          <span className="text-sm tracking-widest uppercase mb-3 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Scroll to Enter</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-[rgba(255,176,0,0.8)] to-transparent rounded-full shadow-[0_0_8px_rgba(255,176,0,0.5)]"></div>
        </div>
      </div>
    </Html>
  );
}

export default function Scene() {
  const scroll = useScroll();
  const shadowRef = useRef<any>(null);

  // Fade out the shadow as the computer comes closer/scales up
  useFrame(() => {
    if (shadowRef.current) {
      shadowRef.current.opacity = Math.max(0, 0.65 - scroll.offset);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} castShadow />
      <directionalLight position={[-10, -5, -10]} intensity={0.5} />
      <Environment preset="city" />

      <ModernComputer />
      <Overlay />

      {/* Ground soft shadow */}
      <ContactShadows ref={shadowRef} position={[0, -1.2, 0]} opacity={0.65} scale={20} blur={3} far={5} color="#000" />
    </>
  );
}
