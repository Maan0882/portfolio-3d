"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Matrix4, Color, Vector3 } from "three";

// ─── Star Field ─────────────────────────────────────────────────────────────
function StarField({ count = 600 }: { count?: number }) {
  const ref = useRef<InstancedMesh>(null!);
  const dummy = useMemo(() => new Matrix4(), []);

  useEffect(() => {
    if (!ref.current) return;
    const color = new Color();
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 300;
      const y = Math.random() * 60 + 5;
      const z = Math.random() * -620;
      dummy.setPosition(x, y, z);
      ref.current.setMatrixAt(i, dummy);
      // Slightly varied color (white → blue-white)
      const bw = 0.8 + Math.random() * 0.2;
      color.setRGB(bw * 0.85, bw * 0.9, bw);
      ref.current.setColorAt(i, color);
    }
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useFrame(({ clock }) => {
    // Subtle twinkle via scale pulse
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i += 8) {
      ref.current.getMatrixAt(i, dummy);
      const s = 0.9 + 0.1 * Math.sin(t * 1.5 + i);
      dummy.elements[0] = s;
      dummy.elements[5] = s;
      dummy.elements[10] = s;
      ref.current.setMatrixAt(i, dummy);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.06, 4, 4]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
}

// ─── Digital Ground Grid ─────────────────────────────────────────────────────
function GroundGrid() {
  return (
    <gridHelper
      args={[600, 75, "#0ea5e9", "#0369a1"]}
      position={[0, 0, -300]}
    />
  );
}

// ─── Ambient Floating Particles ───────────────────────────────────────────────
function AmbientParticles({ count = 300 }: { count?: number }) {
  const ref = useRef<InstancedMesh>(null!);
  const positions = useMemo(() => {
    const pos: Vector3[] = [];
    for (let i = 0; i < count; i++) {
      pos.push(
        new Vector3(
          (Math.random() - 0.5) * 80,
          Math.random() * 25,
          Math.random() * -600
        )
      );
    }
    return pos;
  }, [count]);

  const dummy = useMemo(() => new Matrix4(), []);
  const speeds = useMemo(
    () => Array.from({ length: count }, () => 0.2 + Math.random() * 0.6),
    [count]
  );

  useEffect(() => {
    if (!ref.current) return;
    positions.forEach((pos, i) => {
      dummy.setPosition(pos);
      ref.current.setMatrixAt(i, dummy);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    positions.forEach((pos, i) => {
      // Gentle up-down bob
      const yOffset = Math.sin(t * speeds[i] + i) * 0.3;
      dummy.setPosition(pos.x, pos.y + yOffset, pos.z);
      ref.current.setMatrixAt(i, dummy);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.04, 0.04, 0.04]} />
      <meshBasicMaterial color="#0ea5e9" transparent opacity={0.4} />
    </instancedMesh>
  );
}

export default function Environment() {
  return (
    <group>
      {/* Ambient scene lighting */}
      <ambientLight intensity={0.15} color="#0f1e3a" />
      <pointLight position={[0, 20, 0]} intensity={0.3} color="#0ea5e9" distance={200} />
      <pointLight position={[-20, 10, -150]} intensity={0.5} color="#818cf8" distance={300} />
      <pointLight position={[20, 10, -300]} intensity={0.5} color="#14b8a6" distance={300} />
      <pointLight position={[-20, 10, -450]} intensity={0.5} color="#0db7ed" distance={300} />
      <pointLight position={[0, 10, -580]} intensity={0.6} color="#f59e0b" distance={200} />

      <StarField />
      <GroundGrid />
      <AmbientParticles />
    </group>
  );
}
