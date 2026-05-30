"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Matrix4 } from "three";

// Holographic screen panel
function HoloScreen({
  position,
  rotation,
  label,
  sublabel,
  color,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  label: string;
  sublabel: string;
  color: string;
}) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.55 + 0.1 * Math.sin(clock.getElapsedTime() * 1.2 + position[0]);
    }
  });
  return (
    <group position={position} rotation={rotation ?? [0, 0, 0]}>
      <mesh ref={ref}>
        <planeGeometry args={[4, 2.5]} />
        <meshBasicMaterial color="#0a1628" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[4.04, 2.54]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      <Text
        position={[0, 0.5, 0.01]}
        fontSize={0.35}
        font="/fonts/SpaceMono-Regular.woff"
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[0, -0.1, 0.01]}
        fontSize={0.2}
        font="/fonts/SpaceMono-Regular.woff"
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
      >
        {sublabel}
      </Text>
    </group>
  );
}

// Command desk
function CommandDesk() {
  return (
    <group position={[0, 0, -595]}>
      {/* Curved desk surface */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[12, 0.3, 3]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Desk edge glow */}
      <mesh position={[0, 0.66, 1.5]}>
        <boxGeometry args={[12.2, 0.04, 0.04]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2} />
      </mesh>
      {/* Desk legs */}
      {[-5, 5].map((x) => (
        <mesh key={x} position={[x, -1.5, 0]}>
          <boxGeometry args={[0.3, 3, 0.3]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
      ))}
      {/* Chair */}
      <group position={[0, -0.5, -2]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.2, 1.8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        <mesh position={[0, 1, -0.8]}>
          <boxGeometry args={[1.8, 2, 0.2]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        {/* Chair glow trim */}
        <mesh position={[0, 0.11, 0]}>
          <boxGeometry args={[1.82, 0.02, 1.82]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.5} />
        </mesh>
      </group>
      {/* Floor accent circle */}
      <mesh position={[0, -1.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5, 5.1, 64]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.25} />
      </mesh>
      <mesh position={[0, -1.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8, 8.1, 64]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

// Ambient golden dust particles — uses InstancedMesh for perf (no hook-in-loop)
function GoldDust({ count = 80 }: { count?: number }) {
  const ref = useRef<any>(null!);
  const dummy = useMemo(() => new Matrix4(), []);
  const data = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 12,
      z: -580 - Math.random() * 30,
      speed: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
    })), [count]);

  useEffect(() => {
    if (!ref.current) return;
    data.forEach((p, i) => {
      dummy.setPosition(p.x, p.y, p.z);
      ref.current.setMatrixAt(i, dummy);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    data.forEach((p, i) => {
      const y = p.y + Math.sin(t * p.speed + p.phase) * 0.5;
      dummy.setPosition(p.x, y, p.z);
      ref.current.setMatrixAt(i, dummy);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 4, 4]} />
      <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} />
    </instancedMesh>
  );
}

export default function ZoneContact() {
  return (
    <group>
      <CommandDesk />
      <GoldDust />

      {/* Holographic screens above the desk */}
      <HoloScreen
        position={[-4, 4, -595]}
        rotation={[0, 0.2, 0]}
        label="GitHub"
        sublabel="github.com/MG2808"
        color="#f59e0b"
      />
      <HoloScreen
        position={[0, 5, -598]}
        label="LinkedIn"
        sublabel="2808-mansi-gajjar"
        color="#f59e0b"
      />
      <HoloScreen
        position={[4, 4, -595]}
        rotation={[0, -0.2, 0]}
        label="Portfolio"
        sublabel="portfolio-mansi-gajjar.vercel.app"
        color="#f59e0b"
      />

      {/* Zone ambient light */}
      <pointLight position={[0, 8, -590]} color="#f59e0b" intensity={3} distance={40} />
      <pointLight position={[0, 2, -590]} color="#f59e0b" intensity={1.5} distance={20} />

      {/* Welcome text */}
      <Text
        position={[0, 10, -590]}
        fontSize={1}
        font="/fonts/SpaceMono-Regular.woff"
        color="#f59e0b"
        anchorX="center"
      >
        COMMAND CENTER
      </Text>
      <Text
        position={[0, 8.5, -590]}
        fontSize={0.4}
        font="/fonts/SpaceMono-Regular.woff"
        color="#94a3b8"
        anchorX="center"
      >
        {"{ ZONE_05 :: MISSION COMPLETE }"}
      </Text>
    </group>
  );
}
