

"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Text, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

export default function ModernComputer() {
  const group = useRef<THREE.Group>(null);
  const laptopGripRef = useRef<THREE.Group>(null);
  const blurPlaneMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [inputText, setInputText] = useState("");
  const terminalInputRef = useRef<any>(null);
  const scroll = useScroll();
  const { viewport } = useThree();
  const maxScrollRef = useRef(0);

  const { resolvedTheme } = useTheme();
  // const isLight = resolvedTheme === "light";
  const isLight = false;

  // Color palettes tuned for Light vs Dark
  const Colors = {
    concreteDeep: isLight ? "#ebe2e2" : "#0B0F19", // The requested background hexes
    concreteTop: isLight ? "#fdfbfb" : "#121a2f",  // Soft top offset
    laptopMetal: isLight ? "#333333" : "#1a1a1a",
    screenBezel: isLight ? "#111111" : "#000000",
    accentGold: isLight ? "#9c6031" : "#eab308",
    frameMetal: isLight ? "#ffffff" : "#ffd700",           // White vs Polished Solid Gold
    glassColor: isLight ? "#ebe2e2" : "#ffffff",
    glassOpacity: isLight ? 0.15 : 0.08,
    speakerCone: isLight ? "#ffffff" : "#080808",
    speakerBox: isLight ? "#fdfbfb" : "#b8860b", 
    text: isLight ? "#333333" : "#eab308",
    toolbarBg: isLight ? "#f4f4f5" : "#111827",
    toolbarActive: isLight ? "#e4e4e7" : "#1e2937",
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") setInputText((prev) => prev.slice(0, -1));
      else if (e.key === "Enter") setInputText("");
      else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setInputText((prev) => prev + e.key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useFrame(({ clock }) => {
    if (scroll.offset > maxScrollRef.current) maxScrollRef.current = scroll.offset;
    const safeOffset = maxScrollRef.current;

    if (group.current) {
      const targetScale = Math.max(viewport.width / 4.2, viewport.height / 2.6) * 1.08;
      const initialScale = 0.18;
      const scale = THREE.MathUtils.lerp(initialScale, targetScale, safeOffset);

      group.current.scale.set(scale, scale, scale);
      group.current.rotation.y = THREE.MathUtils.lerp(0.38, 0.05, safeOffset);
      group.current.rotation.x = THREE.MathUtils.lerp(0.15, 0, safeOffset);
      group.current.position.y = THREE.MathUtils.lerp(-1.35, -1.05 * targetScale, safeOffset);
      group.current.position.z = THREE.MathUtils.lerp(-2.0, -0.4, safeOffset);
    }

    if (laptopGripRef.current) {
      laptopGripRef.current.rotation.x = THREE.MathUtils.lerp(-0.1, -0.02, safeOffset);
    }

    if (blurPlaneMaterialRef.current) {
      blurPlaneMaterialRef.current.opacity = THREE.MathUtils.lerp(0.97, 0, Math.min(1, safeOffset * 1.3));
    }

    if (terminalInputRef.current) {
      const blink = Math.floor(clock.getElapsedTime() * 2) % 2 === 0;
      terminalInputRef.current.text = `admin:~$ ${inputText}${blink ? "_" : ""}`;
    }
  });

  return (
    <group ref={group}>
      {/* Environment */}
      <group position={[0, -0.6, -7]}>
        {/* Backdrop wall with subtle gradient feel */}
        <mesh position={[0, 9, -8]}>
          <planeGeometry args={[140, 90]} />
          <meshStandardMaterial 
            color={isLight ? "#0a0a0aff" : "#1a0f2e"} 
            roughness={0.9} 
          />
        </mesh>

        {/* Main platform (white in light mode, warm in dark) */}
        <mesh position={[0, -5.2, 3]} rotation={[0.04, 0, 0]}>
          <boxGeometry args={[48, 9, 22]} />
          <meshStandardMaterial 
            color={Colors.concreteDeep} 
            roughness={isLight ? 0.8 : 0.6} 
          />
        </mesh>
      </group>

      {/* === SPEAKERS IN GLASS CASES (styled after your images) === */}
      {/* Left taller speaker on raised block - Light: clean white | Dark: warm gold */}
      <group position={[-4.8, 0.8, -2.2]} rotation={[0, 0.18, 0]}>
        <GlassSpeakerCase colors={Colors} isLight={isLight} height={7.8} />
      </group>

      {/* Right speaker - slightly smaller */}
      <group position={[4.2, 0.4, -2.8]} rotation={[0, -0.22, 0]}>
        <GlassSpeakerCase colors={Colors} isLight={isLight} height={6.4} />
      </group>

      {/* === LAPTOP (centered, floating style) === */}
      <group position={[0, -0.85, 0]}>
        {/* Base */}
        <RoundedBox args={[3.9, 0.11, 2.75]} radius={0.14} position={[0, 0.05, 0]}>
          <meshStandardMaterial 
            color={Colors.laptopMetal} 
            metalness={isLight ? 0.7 : 0.95} 
            roughness={isLight ? 0.25 : 0.08} 
          />
        </RoundedBox>

        {/* Screen */}
        <group position={[0, 0.18, -1.42]} ref={laptopGripRef}>
          <group position={[0, 1.22, 0]}>
            <RoundedBox args={[3.95, 2.38, 0.07]} radius={0.11}>
              <meshStandardMaterial 
                color={Colors.laptopMetal} 
                metalness={isLight ? 0.7 : 0.95} 
                roughness={isLight ? 0.25 : 0.08} 
              />
            </RoundedBox>

            <group position={[0, 0, 0.05]}>
              <mesh>
                <planeGeometry args={[3.82, 2.18]} />
                <meshStandardMaterial color={Colors.screenBezel} />
              </mesh>

              <group position={[0, -0.02, 0.06]}>
                <Suspense fallback={null}>
                  <ScreenContent isLight={isLight} colors={Colors} />
                </Suspense>

                <mesh position={[0, 0, 0.07]}>
                  <planeGeometry args={[3.82, 2.18]} />
                  <meshBasicMaterial 
                    ref={blurPlaneMaterialRef} 
                    color={isLight ? "#f8fafc" : "#02040a"} 
                    transparent 
                    opacity={0.96} 
                  />
                </mesh>

                <Text
                  ref={terminalInputRef}
                  position={[-1.78, -0.92, 0.08]}
                  color={isLight ? "#0ea5e9" : "#22c55e"}
                  fontSize={0.052}
                  anchorX="left"
                >
                  admin:~$
                </Text>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Lighting - tuned per mode */}
      {isLight ? (
        // Bright clean light mode
        <>
          <ambientLight intensity={1.8} color="#171718ff" />
          <spotLight position={[-20, 35, 30]} intensity={12000} angle={0.4} penumbra={0.6} color="#0f0c0cff" castShadow />
          <pointLight position={[18, 15, 12]} intensity={4200} color="#0e1011ff" />
        </>
      ) : (
        // Warm dramatic dark mode
        <>
          <ambientLight intensity={0.65} color="#1e2937" />
          <spotLight position={[-18, 32, 28]} intensity={10500} angle={0.38} penumbra={0.7} color="#0e0e0dff" castShadow />
          <spotLight position={[16, 22, 18]} intensity={6800} angle={0.42} penumbra={0.65} color="#0a0a09ff" />
          <pointLight position={[12, 14, 8]} intensity={3200} color="#0b0b0bff" />
        </>   
      )}
    </group>
  );
}

/* ====================== GLASS SPEAKER CASE ====================== */
function GlassSpeakerCase({ colors, isLight, height = 7.0 }: { colors: any; isLight: boolean; height?: number }) {
  return (
    <group>
      {/* Metal/Gold Frame */}
      <BoxFrame 
        width={4.2} 
        height={height} 
        depth={2.8} 
        thickness={0.22} 
        color={colors.frameMetal} 
      />

      {/* Transparent Glass */}
      <mesh>
        <boxGeometry args={[3.9, height - 0.3, 2.6]} />
        <meshPhysicalMaterial 
          color={colors.glassColor} 
          transparent 
          opacity={colors.glassOpacity} 
          transmission={0.93} 
          roughness={0} 
          metalness={isLight ? 0.1 : 0.3}
        />
      </mesh>

      {/* Speaker inside */}
      <group position={[0, 0, -0.6]}>
        <ModernSpeakerDriver colors={colors} isLight={isLight} scale={height / 7} />
      </group>
    </group>
  );
}

function ModernSpeakerDriver({ colors, isLight, scale = 1 }: any) {
  return (
    <group scale={scale}>
      {/* Woofer */}
      <mesh position={[0, -0.6, 0]}>
        <torusGeometry args={[1.35, 0.18, 32, 64]} />
        <meshStandardMaterial color={isLight ? "#cbd5e1" : "#334155"} roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.6, 0.1]}>
        <circleGeometry args={[1.1]} />
        <meshStandardMaterial color={colors.speakerCone} roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Tweeter */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.55]} />
        <meshStandardMaterial color={isLight ? "#e2e8f0" : "#475569"} roughness={0.4} />
      </mesh>

      {/* Center dust cap */}
      <mesh position={[0, -0.6, 0.3]}>
        <circleGeometry args={[0.45]} />
        <meshStandardMaterial color="#1e2937" />
      </mesh>
    </group>
  );
}

/* ====================== SCREEN CONTENT ====================== */
function ScreenContent({ isLight, colors }: { isLight: boolean; colors: any }) {
  const texture = useTexture("/images/kookie-bg.png");

  return (
    <group>
      <mesh>
        <planeGeometry args={[3.82, 2.18]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <Text
        position={[0, 0.32, 0.03]}
        color={colors.text}
        fontSize={0.98}
        fontWeight={900}
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.085}
      >
        KOOKIE
      </Text>

      {/* Browser header */}
      <group position={[0, 1.0, 0.04]}>
        <mesh>
          <planeGeometry args={[3.82, 0.17]} />
          <meshBasicMaterial color={isLight ? "#f1f5f9" : "#0f172a"} transparent opacity={0.9} />
        </mesh>
        {/* Traffic lights */}
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((col, i) => (
          <mesh key={i} position={[-1.75 + i * 0.085, 0, 0.02]}>
            <circleGeometry args={[0.021]} />
            <meshBasicMaterial color={col} />
          </mesh>
        ))}
        <Text position={[-0.1, 0, 0.03]} color={isLight ? "#64748b" : "#94a3b8"} fontSize={0.046}>
          https://www.kookie-kollective.com
        </Text>
      </group>

      {/* Toolbar */}
      <group position={[0, -0.89, 0.05]}>
        <mesh>
          <planeGeometry args={[3.35, 0.31]} />
          <meshBasicMaterial color={colors.toolbarBg} transparent opacity={0.96} />
        </mesh>
        <group position={[0, 0, 0.02]}>
          <ToolbarButton label="W." x={-1.45} width={0.18} colors={colors} isLight={isLight} />
          <ToolbarButton label="Creator" x={-1.05} active width={0.39} colors={colors} isLight={isLight} />
          <ToolbarButton label="Font & Color" x={-0.45} width={0.52} colors={colors} isLight={isLight} />
          <ToolbarButton label="Details" x={0.22} width={0.31} colors={colors} isLight={isLight} />
          <ToolbarButton label="Elements" x={0.65} width={0.37} colors={colors} isLight={isLight} />
          <ToolbarButton label="Score" x={1.08} width={0.29} colors={colors} isLight={isLight} />
          <ToolbarButton label="Visit Site" x={1.48} width={0.46} color={colors.accentGold} labelColor={isLight ? "#fff" : "#000"} colors={colors} isLight={isLight} />
        </group>
      </group>
    </group>
  );
}

function ToolbarButton({ label, x, width, active = false, color, labelColor, colors, isLight }: any) {
  return (
    <group position={[x, 0, 0]}>
      <mesh>
        <planeGeometry args={[width, 0.21]} />
        <meshBasicMaterial color={active ? colors.toolbarActive : (color || colors.toolbarBg)} />
      </mesh>
      {active && (
        <mesh position={[0, -0.115, 0.01]}>
          <planeGeometry args={[width * 0.95, 0.016]} />
          <meshBasicMaterial color={colors.accentGold} />
        </mesh>
      )}
      <Text 
        color={labelColor || (isLight ? "#475569" : "#e2e8f0")} 
        fontSize={0.066} 
        fontWeight={600} 
        position={[0, 0, 0.02]}
      >
        {label}
      </Text>
    </group>
  );
}

/* Keep your existing BoxFrame and ProDriver if you prefer, or use the simplified ModernSpeakerDriver above */

function BoxFrame({ width, height, depth, thickness = 0.2, color }: any) {
  const w = width / 2; const h = height / 2; const d = depth / 2;
  return (
    <group>
      {/* Simplified frame - vertical + horizontal bars */}
      {[[-w,0,-d],[w,0,-d],[-w,0,d],[w,0,d]].map((p,i) => (
        <mesh key={i} position={p as [number,number,number]}>
          <boxGeometry args={[thickness, height, thickness]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {/* Add more bars as needed from your original BoxFrame */}
    </group>
  );
}