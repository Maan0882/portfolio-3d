"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";
import { CAMERA_PATH } from "@/lib/cameraPath";
import { useScrollStore } from "@/lib/store";

// Low-poly character built from geometric primitives
function CharacterMesh() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.38, 0.48, 0.22]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.42, 0]}>
        <boxGeometry args={[0.28, 0.28, 0.28]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Visor glow */}
      <mesh position={[0, 1.42, 0.145]}>
        <boxGeometry args={[0.22, 0.1, 0.02]} />
        <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={1.2} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.28, 0.88, 0]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.1, 0.38, 0.12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.28, 0.88, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.1, 0.38, 0.12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.1, 0.42, 0]}>
        <boxGeometry args={[0.14, 0.32, 0.14]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0.1, 0.42, 0]}>
        <boxGeometry args={[0.14, 0.32, 0.14]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.5} />
      </mesh>
    </group>
  );
}

// Hover-bike — geometric low-poly design
function HoverBike() {
  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.5, 0.2, 1.1]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Front fairing */}
      <mesh position={[0, 0.28, 0.5]}>
        <boxGeometry args={[0.36, 0.14, 0.3]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Engine core glow */}
      <mesh position={[0, 0.18, -0.25]}>
        <boxGeometry args={[0.28, 0.1, 0.4]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Left hover pod */}
      <mesh position={[-0.38, 0.06, 0]}>
        <capsuleGeometry args={[0.06, 0.7, 4, 8]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
      </mesh>
      {/* Right hover pod */}
      <mesh position={[0.38, 0.06, 0]}>
        <capsuleGeometry args={[0.06, 0.7, 4, 8]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
      </mesh>
      {/* Thrust glow underneath */}
      <mesh position={[0, -0.05, 0]}>
        <planeGeometry args={[0.7, 1.0]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

export default function Character() {
  const groupRef = useRef<Group>(null!);
  const smoothP = useRef(0);
  const progress = useScrollStore((s) => s.progress);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    smoothP.current = MathUtils.lerp(smoothP.current, progress, 0.055);

    // Sample position slightly ahead of camera on path
    const charT = MathUtils.clamp(smoothP.current - 0.012, 0, 0.98);
    CAMERA_PATH.getPoint(charT, groupRef.current.position);

    // Offset character below camera line
    groupRef.current.position.y -= 2.5;
    groupRef.current.position.z += 4;

    // Gentle hover bob
    groupRef.current.position.y += Math.sin(t * 1.8) * 0.06;

    // Lean into curves based on lateral velocity
    const p1 = CAMERA_PATH.getPoint(Math.max(charT - 0.005, 0));
    const p2 = CAMERA_PATH.getPoint(Math.min(charT + 0.005, 1));
    const dx = p2.x - p1.x;
    groupRef.current.rotation.z = MathUtils.lerp(
      groupRef.current.rotation.z,
      -dx * 4,
      0.08
    );

    // Face direction of travel
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      Math.atan2(dx, Math.abs(p2.z - p1.z) + 0.001),
      0.06
    );
  });

  return (
    <group ref={groupRef}>
      <HoverBike />
      <CharacterMesh />
      {/* Under-glow point light */}
      <pointLight color="#00d9ff" intensity={1.5} distance={5} position={[0, -0.5, 0]} />
    </group>
  );
}
