"use client";
import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Text } from "@react-three/drei";
import * as THREE from "three";

export default function ModernComputer() {
  const group = useRef<THREE.Group>(null);
  const blurPlaneMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [inputText, setInputText] = useState("");
  const terminalInputRef = useRef<any>(null);
  const scroll = useScroll();
  const { viewport } = useThree();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setInputText((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        if (inputText.trim().toLowerCase() === "help") {
          setInputText("");
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

  const kehadTextRef = useRef<any>(null);
  const extraText1Ref = useRef<any>(null);
  const extraText2Ref = useRef<any>(null);
  const extraText3Ref = useRef<any>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      // Calculate target scale to exactly fit/cover the viewport at Z=0
      // Monitor screen is ~3.45 width and 2.05 height. We give a tiny 2% bleed so no edges show.
      const targetScale = Math.max(viewport.width / 3.4, viewport.height / 2.0) * 1.02;
      
      const scale = THREE.MathUtils.lerp(0.3, targetScale, scroll.offset);
      group.current.scale.set(scale, scale, scale);

      // Start rotated so we see its side, then face directly forward
      group.current.rotation.y = THREE.MathUtils.lerp(Math.PI / 4, 0, scroll.offset);
      group.current.rotation.x = THREE.MathUtils.lerp(0.15, 0, scroll.offset);

      // Adjust Y so the center of the screen accurately aligns with the camera lookAt center
      // Camera looks at Y=0. The inner screen is offset by Y=0.4 natively in the group.
      const targetY = -0.4 * targetScale;
      group.current.position.y = THREE.MathUtils.lerp(-0.5, targetY, scroll.offset);
      group.current.position.z = THREE.MathUtils.lerp(0, 0, scroll.offset); // kept at 0 to easily map viewport
    }
    
    if (blurPlaneMaterialRef.current) {
      blurPlaneMaterialRef.current.opacity = THREE.MathUtils.lerp(0.98, 0, Math.min(1, scroll.offset * 1.5));
    }
    
    if (kehadTextRef.current) {
      // kehadTextRef.current.scale.x = THREE.MathUtils.lerp(1, 15, Math.pow(scroll.offset, 3));
      kehadTextRef.current.fillOpacity = Math.max(0, Math.min(1, (scroll.offset - 0.4) * 4));
    }

    if (extraText1Ref.current) {
      extraText1Ref.current.fillOpacity = Math.max(0, Math.min(1, (scroll.offset - 0.4) * 4));
    }
    if (extraText2Ref.current) {
      extraText2Ref.current.fillOpacity = Math.max(0, Math.min(1, (scroll.offset - 0.6) * 4));
    }
    if (extraText3Ref.current) {
      extraText3Ref.current.fillOpacity = Math.max(0, Math.min(1, (scroll.offset - 0.8) * 4));
    }

    if (terminalInputRef.current) {
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
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[3.45, 2.05]} />
            <meshBasicMaterial color="#050505" />
          </mesh>

          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[3.45, 2.05]} />
            <meshBasicMaterial ref={blurPlaneMaterialRef} color="#050505" transparent opacity={0.98} />
          </mesh>

          {/* Terminal Text Renderings placed in front of blur plane */}
          <group position={[0, 0, 0.02]}>
            <Text ref={kehadTextRef} position={[0, 0.4, 0]} color="#10b981" fontSize={0.6} anchorX="center" anchorY="middle">
              KEHAD
            </Text>
            
            <Text ref={extraText1Ref} position={[0, -0.1, 0]} color="#f1f5f9" fontSize={0.15} anchorX="center" anchorY="middle">
              System Initializing...
            </Text>
            
            <Text ref={extraText2Ref} position={[0, -0.3, 0]} color="#38bdf8" fontSize={0.12} anchorX="center" anchorY="middle">
              Loading Modules...
            </Text>

            <Text ref={extraText3Ref} position={[0, -0.5, 0]} color="#f43f5e" fontSize={0.12} anchorX="center" anchorY="middle">
              Welcome to the New Era.
            </Text>

            <Text ref={terminalInputRef} position={[-1.6, -0.85, 0]} color="#10b981" fontSize={0.1} anchorX="left" anchorY="top">
              user: ~& _
            </Text>
          </group>
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
