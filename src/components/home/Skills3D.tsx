"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Shape({ position, color, speed, distort, radius, type }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2} position={position}>
      <mesh ref={meshRef}>
        {type === 'sphere' ? (
          <sphereGeometry args={[radius, 32, 32]} />
        ) : type === 'icosahedron' ? (
          <icosahedronGeometry args={[radius, 1]} />
        ) : (
          <torusGeometry args={[radius, 0.1, 16, 100]} />
        )}
        
        {distort ? (
          <MeshDistortMaterial
            color={color}
            speed={speed}
            distort={0.4}
            radius={radius}
          />
        ) : (
          <MeshWobbleMaterial
            color={color}
            speed={speed}
            factor={0.4}
          />
        )}
      </mesh>
    </Float>
  );
}

function FloatingShapes() {
  const shapes = useMemo(() => {
    const items = [];
    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
    const types = ['sphere', 'icosahedron', 'torus'];
    
    for (let i = 0; i < 20; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10 - 5,
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.5 + Math.random() * 1.5,
        distort: Math.random() > 0.5,
        radius: 0.1 + Math.random() * 0.4,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }
    return items;
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 10,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 10,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((props, i) => (
        <Shape key={i} {...props} />
      ))}
    </group>
  );
}

export default function Skills3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-40 dark:opacity-20 w-full h-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.8} />
        <FloatingShapes />
        {/* Subtle noise/stars effect in the distance */}
        <Stars count={500} />
      </Canvas>
    </div>
  );
}

function Stars({ count }: { count: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 20;
        p[i * 3 + 1] = (Math.random() - 0.5) * 20;
        p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="position"
          count={points.length / 3}
          array={points}
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.5} sizeAttenuation={true} />
    </points>
  );
}
