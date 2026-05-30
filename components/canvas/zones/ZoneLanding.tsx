"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Matrix4, Color } from "three";

// Hexagonal ambient particles for the launch zone
function HexParticles({ count = 40 }: { count?: number }) {
  const ref = useRef<InstancedMesh>(null!);
  const dummy = useMemo(() => new Matrix4(), []);
  const data = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 30,
      y: 1 + Math.random() * 10,
      z: (Math.random() - 0.5) * 15 - 5,
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      scale: 0.1 + Math.random() * 0.25,
    })), [count]);

  useEffect(() => {
    if (!ref.current) return;
    const color = new Color("#818cf8");
    data.forEach((d, i) => {
      dummy.setPosition(d.x, d.y, d.z);
      dummy.elements[0] = d.scale;
      dummy.elements[5] = d.scale;
      dummy.elements[10] = d.scale;
      ref.current.setMatrixAt(i, dummy);
      ref.current.setColorAt(i, color);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    data.forEach((d, i) => {
      const y = d.y + Math.sin(t * d.speed + d.phase) * 0.4;
      dummy.makeScale(d.scale, d.scale, d.scale);
      dummy.setPosition(d.x, y, d.z);
      ref.current.setMatrixAt(i, dummy);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.5, 0.5, 0.1, 6]} />
      <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.4} transparent opacity={0.5} />
    </instancedMesh>
  );
}

export default function ZoneLanding() {
  const ringRef = useRef<any>(null!);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <HexParticles />

      {/* Central glow ring */}
      <mesh ref={ringRef} position={[0, 1.5, -5]}>
        <torusGeometry args={[4, 0.04, 8, 80]} />
        <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0, 1.5, -5]} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[6, 0.02, 8, 80]} />
        <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={1.0} transparent opacity={0.6} />
      </mesh>

      {/* Floor accent lines */}
      {[-4, -2, 0, 2, 4].map((x) => (
        <mesh key={x} position={[x, 0.01, -10]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, 20]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}
