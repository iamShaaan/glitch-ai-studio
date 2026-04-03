"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

// Floating wireframe icosahedron
function FloatingIcosahedron({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.003;
    ref.current.rotation.y += 0.005;
    // Subtle mouse follow
    ref.current.position.x = position[0] + pointer.x * 0.3;
    ref.current.position.y = position[1] + pointer.y * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#34d399"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

// Floating torus knot
function FloatingTorusKnot({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.002;
    ref.current.rotation.z += 0.004;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={0.6}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </Float>
  );
}

// Floating octahedron
function FloatingOctahedron({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.006;
    ref.current.rotation.z += 0.003;
    ref.current.position.x = position[0] - pointer.x * 0.15;
    ref.current.position.y = position[1] - pointer.y * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={1.2}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Floating ring
function FloatingRing({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.004;
    ref.current.rotation.y += 0.002;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={1}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshBasicMaterial
          color="#34d399"
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

// Orbital particles using points
function OrbitalParticles() {
  const ref = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 8;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0005;
    ref.current.rotation.x += 0.0002;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#34d399"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main scene content
function Scene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.15} color="#34d399" />
      <directionalLight position={[5, 5, 5]} intensity={0.1} color="#22d3ee" />
      <pointLight position={[-3, 2, -3]} intensity={0.3} color="#a78bfa" distance={15} />

      {/* Floating geometry */}
      <FloatingIcosahedron position={[2.5, 0.5, -2]} />
      <FloatingTorusKnot position={[-3, -0.5, -3]} />
      <FloatingOctahedron position={[-1.5, 1.5, -4]} />
      <FloatingRing position={[0, -1, -2]} />
      <FloatingRing position={[3, 2, -5]} />

      {/* Sparkle particles */}
      <Sparkles
        count={120}
        scale={14}
        size={1.5}
        speed={0.3}
        opacity={0.4}
        color="#34d399"
      />

      {/* Orbital particle field */}
      <OrbitalParticles />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
