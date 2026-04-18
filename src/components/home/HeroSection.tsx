"use client";

import React, { useEffect, useState, useRef, Suspense, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Download, Briefcase } from 'lucide-react';
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Float, Sparkles, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import cv from '@/assets/Kehinde-Adigun-Resume.jpg';
import AutoType from '../others/autoType';
import MenuSection from './MenuSection';

// --- Kehad 3D Hero Component ---

function DecorativeBlobs() {
  const meshRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t + i) * 0.002;
      child.rotation.z += 0.01;
    });
  });

  return (
    <group ref={meshRef}>
      {[...Array(10)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 5
          ]}
        >
          <sphereGeometry args={[Math.random() * 0.2, 16, 16]} />
          <meshStandardMaterial 
            color={["#ff0080", "#ff8c00", "#ffea00", "#00ffcc", "#9d00ff"][i % 5]} 
            emissive={["#ff0080", "#ff8c00", "#ffea00", "#00ffcc", "#9d00ff"][i % 5]}
            emissiveIntensity={0.3}
            roughness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function Kehad3DHero({ isPlaying }: { isPlaying: boolean }) {
  const text = "Kehad";
  const groupRef = useRef<THREE.Group>(null!);
  const [analyzer, setAnalyzer] = useState<THREE.AudioAnalyser | null>(null);
  const fontUrl = "/fonts/helvetiker_bold.typeface.json";

  useEffect(() => {
    if (isPlaying) {
      const listener = new THREE.AudioListener();
      const sound = new THREE.Audio(listener);
      const audioLoader = new THREE.AudioLoader();
      
      audioLoader.load("/dance-beat.mp3", (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.3);
        // We assume audio is already started or will start on user interaction
        try {
            sound.play();
        } catch(e) {}
      });

      const analyser = new THREE.AudioAnalyser(sound, 32);
      setAnalyzer(analyser);

      return () => {
        sound.stop();
        sound.disconnect();
      };
    }
  }, [isPlaying]);

  useFrame((state) => {
    let peak = 0;
    if (analyzer) {
      peak = analyzer.getAverageFrequency() / 150; 
    }

    if (groupRef.current) {
      groupRef.current.children.forEach((child: any, i) => {
        const s = 1 + peak * (0.2 + i * 0.05);
        child.scale.set(s, s, s);
        child.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.05;
      });
    }
  });

  const layers = useMemo(() => [
    { height: 0.4, color: "#ff0080", emissive: "#4a00e0", shift: [0, 0, -0.4], bevel: 0.1 }, 
    { height: 0.3, color: "#9d00ff", emissive: "#000000", shift: [0, 0, -0.2], bevel: 0.08 },
    { height: 0.2, color: "#00ffcc", emissive: "#000000", shift: [0, 0, -0.1], bevel: 0.06 },
    { height: 0.1, color: "#ffea00", emissive: "#ff8c00", shift: [0, 0, 0], bevel: 0.05 }
  ], []);

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Center>
          {layers.map((layer, idx) => (
            <Text3D
              key={idx}
              font={fontUrl}
              size={1.6}
              height={layer.height}
              curveSegments={24}
              bevelEnabled
              bevelThickness={layer.bevel}
              bevelSize={layer.bevel}
              bevelOffset={0}
              bevelSegments={10}
              position={layer.shift as any}
            >
              {text}
              <meshPhysicalMaterial 
                color={layer.color}
                emissive={layer.emissive as any}
                emissiveIntensity={0.2}
                roughness={0.1}
                metalness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </Text3D>
          ))}
        </Center>
      </Float>
      <DecorativeBlobs />
      <Sparkles count={40} scale={12} size={2} speed={0.4} color="#ffffff" />
    </group>
  );
}

// --- Main HeroSection ---

export default function HeroSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-start audio or wait for interaction? 
    // Usually browser blocks autoplay, but some users have splash screen which unlocks it.
    setIsPlayingAudio(true);
  }, []);

  const downloadResume = (event: React.MouseEvent) => {
    event.preventDefault();
    const link = document.createElement("a");
    link.download = "Kehinde Gabriel Adigun CV";
    link.href = cv.src;
    link.click();
  };

  return (
    <div className="relative min-h-screen flex flex-col w-full z-10 overflow-hidden bg-[#050505]">
      
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, 5, 5]} intensity={1} color="#ff0080" />
          <pointLight position={[5, -5, 5]} intensity={0.5} color="#00ffcc" />
          
          <Suspense fallback={null}>
            <Kehad3DHero isPlaying={isPlayingAudio} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Header Overlay */}
      <header className="relative z-50 px-6 py-6 flex justify-between items-center w-full max-w-[1600px] mx-auto">
        <div className="text-2xl font-black tracking-tighter text-white hover:text-emerald-400 transition cursor-pointer selection:bg-emerald-500">
          Kehad
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
          >
             {mounted && theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-400" />}
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-6 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-[10px] transition shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
             Menu
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </header>

      {/* Main Content Overlay */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl w-full flex flex-col items-center">
          
          {/* Spacing for the 3D text which is behind */}
          <div className="h-[200px] mb-8" />

          {/* AutoType Component */}
          <div className="mb-10 min-h-[4rem]">
              <AutoType 
                strings={["Innovation.", "Design.", "Kehad Experience."]} 
                className="text-white text-3xl md:text-5xl lg:text-6xl font-black tracking-tight"
                loop={true}
              />
          </div>

          <p className="text-white/40 text-lg md:text-xl font-medium tracking-widest uppercase mb-12 max-w-xl">
            A Full Stack Web Developer & 3D Visual Artist
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button 
              onClick={downloadResume} 
              className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl w-full sm:w-auto justify-center"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
            
            <a 
              href="#contact" 
              className="flex items-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all w-full sm:w-auto justify-center"
            >
              <Briefcase className="w-4 h-4" />
              Hire Me
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-12">
            {[
              { label: 'X', path: 'https://twitter.com', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
              { label: 'Github', path: 'https://github.com/Kehad', icon: <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/> },
              { label: 'LinkedIn', path: 'https://linkedin.com/in/kehinde-adigun', icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.path} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white hover:text-emerald-400"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">{social.icon}</svg>
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* Decorative full-screen menu */}
      <MenuSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}

