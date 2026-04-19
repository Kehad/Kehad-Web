"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Text, RoundedBox, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Scene from "./Scene";


export default function ModernComputer() {
  const group = useRef<THREE.Group>(null);
  const blurPlaneMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [inputText, setInputText] = useState("");
  const terminalInputRef = useRef<any>(null);
  const scroll = useScroll();
  const { viewport } = useThree();
  const maxScrollRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setInputText((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        setInputText("");
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setInputText((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputText]);

  const mainTextRef = useRef<any>(null);
  const subText1Ref = useRef<any>(null);
  const subText2Ref = useRef<any>(null);
  const subText3Ref = useRef<any>(null);

  useFrame(({ clock }) => {
    if (scroll.offset > maxScrollRef.current) {
      maxScrollRef.current = scroll.offset;
    }
    const safeOffset = maxScrollRef.current;

    if (group.current) {
      const targetScale = Math.max(viewport.width / 3.4, viewport.height / 2.0) * 1.02;
      const scale = THREE.MathUtils.lerp(0.3, targetScale, safeOffset);
      group.current.scale.set(scale, scale, scale);

      group.current.rotation.y = THREE.MathUtils.lerp(Math.PI / 4, 0, safeOffset);
      group.current.rotation.x = THREE.MathUtils.lerp(0.15, 0, safeOffset);

      const targetY = -0.4 * targetScale;
      group.current.position.y = THREE.MathUtils.lerp(-0.5, targetY, safeOffset);
      group.current.position.z = THREE.MathUtils.lerp(0, 0, safeOffset);
    }

    if (blurPlaneMaterialRef.current) {
      blurPlaneMaterialRef.current.opacity = THREE.MathUtils.lerp(0.98, 0, Math.min(1, safeOffset * 1.5));
    }

    if (mainTextRef.current) {
      mainTextRef.current.fillOpacity = Math.max(0, Math.min(1, (safeOffset - 0.3) * 4));
    }

    if (subText1Ref.current) {
      subText1Ref.current.fillOpacity = Math.max(0, Math.min(1, (safeOffset - 0.5) * 4));
    }
    if (subText2Ref.current) {
      subText2Ref.current.fillOpacity = Math.max(0, Math.min(1, (safeOffset - 0.65) * 4));
    }
    if (subText3Ref.current) {
      subText3Ref.current.fillOpacity = Math.max(0, Math.min(1, (safeOffset - 0.8) * 4));
    }

    if (terminalInputRef.current) {
      const blink = Math.floor(clock.getElapsedTime() * 2) % 2 === 0;
      terminalInputRef.current.text = `user@terminal:~$ ${inputText}${blink ? "_" : ""}`;
    }
  });

  return (
    <group ref={group}>

      {/* Stand Base */}
      <mesh position={[0, -1.0, -0.5]}>
        <boxGeometry args={[1.5, 0.05, 1]} />
        <meshStandardMaterial color="#a0a0a0" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Stand Pillar */}
      <mesh position={[0, -0.4, -0.8]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[0.2, 1.2, 0.1]} />
        <meshStandardMaterial color="#a0a0a0" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Main Monitor Chassis */}
      <group position={[0, 0.4, -0.6]} rotation={[-0.05, 0, 0]}>
        {/* Back panel */}
        <mesh>
          <boxGeometry args={[3.6, 2.2, 0.1]} />
          <meshStandardMaterial color="#c8c8c8" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Screen Bezel (thin black) */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[3.5, 2.1, 0.02]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>

        {/* Display Glass Surface */}
        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[3.45, 2.05]} />
          <meshPhysicalMaterial
            color="#000000"
            metalness={0.95}
            roughness={0.05}
            transparent
            opacity={0.7}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Screen Content */}
        <group position={[0, 0, 0.07]}>
          {/* Dark background */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[3.45, 2.05]} />
            <meshBasicMaterial color="#030712" />
          </mesh>

          {/* Blur overlay */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[3.45, 2.05]} />
            <meshBasicMaterial
              ref={blurPlaneMaterialRef}
              color="#030712"
              transparent
              opacity={0.98}
            />
          </mesh>

          {/* Content Layer */}
          <group position={[0, 0, 0.02]}>
            {/* Main Brand Text */}
            <Text
              ref={mainTextRef}
              position={[0, 0.3, 0]}
              color="#ffffff"
              fontSize={0.7}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.05}
            >
              KOOKIE
            </Text>

            {/* Subtitle */}
            <Text
              ref={subText1Ref}
              position={[0, -0.15, 0]}
              color="#94a3b8"
              fontSize={0.13}
              anchorX="center"
              anchorY="middle"
            >
              Next Generation Experience
            </Text>

            {/* Feature text */}
            <Text
              ref={subText2Ref}
              position={[0, -0.4, 0]}
              color="#60a5fa"
              fontSize={0.11}
              anchorX="center"
              anchorY="middle"
            >
              Powered by Advanced Technology
            </Text>

            {/* Call to action */}
            <Text
              ref={subText3Ref}
              position={[0, -0.6, 0]}
              color="#f59e0b"
              fontSize={0.11}
              anchorX="center"
              anchorY="middle"
            >
              Scroll to Explore
            </Text>

            {/* Terminal Input */}
            <Text
              ref={terminalInputRef}
              position={[-1.6, -0.88, 0]}
              color="#22c55e"
              fontSize={0.09}
              anchorX="left"
              anchorY="top"
            >
              user@terminal:~$ _
            </Text>
          </group>
        </group>
      </group>

      {/* Keyboard */}
      <mesh position={[0, -0.98, 0.5]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[2.2, 0.04, 0.85]} />
        <meshStandardMaterial color="#c8c8c8" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.95, 0.5]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[2.1, 0.02, 0.75]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
    </group>
  );
}


