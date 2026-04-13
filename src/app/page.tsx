"use client";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Environment, ContactShadows, useScroll, Html, Text } from "@react-three/drei";
import * as THREE from "three";

function ModernComputer() {
  const group = useRef<THREE.Group>(null);
  const blurPlaneMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [inputText, setInputText] = useState("");
  const terminalInputRef = useRef<any>(null);
  const scroll = useScroll();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow user to type in the terminal interactively
      if (e.key === "Backspace") {
        setInputText((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        if (inputText.trim().toLowerCase() === "help") {
          setInputText(""); // Could add help logic here, but for now just clear
        } else {
          setInputText("");
        }
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setInputText((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputText]);

  useFrame(({ clock }) => {
    if (group.current) {
      // Scale interpolates from small to large
      const scale = THREE.MathUtils.lerp(0.3, 3.2, scroll.offset);
      group.current.scale.set(scale, scale, scale);

      // Start slightly rotated right and tilted back, end up facing absolute center
      group.current.rotation.y = THREE.MathUtils.lerp(Math.PI / 6, 0, scroll.offset);
      group.current.rotation.x = THREE.MathUtils.lerp(0.1, 0, scroll.offset);

      // Move computer structurally down and closer
      group.current.position.y = THREE.MathUtils.lerp(0, -1.8, scroll.offset);
      group.current.position.z = THREE.MathUtils.lerp(0, 2, scroll.offset);
    }
    
    if (blurPlaneMaterialRef.current) {
      // Starts nearly opaque, then fades to completely transparent as system stretches out
      blurPlaneMaterialRef.current.opacity = THREE.MathUtils.lerp(0.98, 0, scroll.offset);
    }
    
    if (terminalInputRef.current) {
      // Blink the cursor exactly twice a second
      const blink = Math.floor(clock.getElapsedTime() * 2) % 2 === 0;
      terminalInputRef.current.text = `user: ~& ${inputText}${blink ? "_" : ""}`;
    }
  });

  return (
    <group ref={group}>
      {/* Stand Base */}
      <mesh position={[0, -1.0, -0.5]}>
        <boxGeometry args={[1.5, 0.05, 1]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Stand Pillar */}
      <mesh position={[0, -0.4, -0.8]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[0.2, 1.2, 0.1]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main Monitor Chassis */}
      <group position={[0, 0.4, -0.6]} rotation={[-0.05, 0, 0]}>
        {/* Back panel */}
        <mesh>
          <boxGeometry args={[3.6, 2.2, 0.1]} />
          <meshStandardMaterial color="#d0d0d0" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Screen Bezel (thin black) */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[3.5, 2.1, 0.02]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>

        {/* Display Glass Surface */}
        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[3.45, 2.05]} />
          <meshPhysicalMaterial color="#000000" metalness={0.9} roughness={0.1} transparent opacity={0.65} clearcoat={1.0} clearcoatRoughness={0.1} />
        </mesh>

        {/* Terminal Screen & Content */}
        <group position={[0, 0, 0.07]}>
          {/* Black Screen Background */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[3.45, 2.05]} />
            <meshBasicMaterial color="#050505" />
          </mesh>

          {/* Fog/Blur Screen covering text initially */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[3.45, 2.05]} />
            <meshBasicMaterial ref={blurPlaneMaterialRef} color="#050505" transparent opacity={0.98} />
          </mesh>

          {/* Terminal Text Renderings */}
          <Text position={[-1.6, 0.8, 0]} color="#f1f5f9" fontSize={0.14} anchorX="left" anchorY="top">
            Hi there,
          </Text>
          <Text position={[-1.6, 0.6, 0]} color="#f1f5f9" fontSize={0.14} anchorX="left" anchorY="top">
            I’m Kehad
          </Text>
          <Text position={[-1.6, 0.3, 0]} color="#f1f5f9" fontSize={0.12} anchorX="left" anchorY="top">
            Welcome to Kehad LINUS 1.0 LTS
          </Text>
          <Text position={[-1.6, 0.1, 0]} color="#94a3b8" fontSize={0.1} anchorX="left" anchorY="top">
            ** scroll or type help to get started
          </Text>
          {/* The interactive input line */}
          <Text ref={terminalInputRef} position={[-1.6, -0.1, 0]} color="#10b981" fontSize={0.12} anchorX="left" anchorY="top">
            user: ~& _
          </Text>
        </group>
      </group>

      {/* Sleek Magic Keyboard */}
      <mesh position={[0, -0.98, 0.5]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[2.0, 0.04, 0.8]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.95, 0.5]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[1.9, 0.02, 0.7]} />
        <meshStandardMaterial color="#222222" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Scene() {
  const scroll = useScroll();
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Fade out the scroll indicator as the user scrolls down
  useFrame(() => {
    if (indicatorRef.current) {
      indicatorRef.current.style.opacity = Math.max(0, 1 - scroll.offset * 4).toString();
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
      <ContactShadows position={[0, -1.2, 0]} opacity={0.65} scale={20} blur={3} far={5} color="#000" />

      {/* Animated Scroll Indicator */}
      <Html position={[0, 0.5, 4]} center>
        <div ref={indicatorRef} className="animate-pulse fixed flex flex-col items-center pointer-events-none" style={{ color: "rgba(255,176,0,0.8)" }}>
          <span className="text-sm tracking-widest uppercase mb-3 font-semibold pb-10">Scroll to Enter</span>
          <div className="w-[2px] h-20 bg-[rgba(255,176,0,0.8)]"></div>
        </div>
      </Html>
    </>
  );
}

export default function Home() {
  return (
    <div className="w-full h-screen bg-[#0a0a0a]">
      <Canvas camera={{ position: [0, 0.5, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={3.5} damping={0.25}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
