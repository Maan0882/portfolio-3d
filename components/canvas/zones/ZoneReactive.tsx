"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Group, CatmullRomCurve3, Vector3, TubeGeometry, BufferGeometry, LineSegments } from "three";

// Interlocking gear mesh
function Gear({
  position,
  speed,
  direction = 1,
  radius = 2,
  color = "#14b8a6",
}: {
  position: [number, number, number];
  speed: number;
  direction?: number;
  radius?: number;
  color?: string;
}) {
  const ref = useRef<Group>(null!);
  const teeth = 10;

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed * direction;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Main disk */}
      <mesh>
        <cylinderGeometry args={[radius, radius, 0.5, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Center hole */}
      <mesh>
        <cylinderGeometry args={[radius * 0.25, radius * 0.25, 0.52, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Teeth */}
      {Array.from({ length: teeth }).map((_, i) => {
        const angle = (i / teeth) * Math.PI * 2;
        const tx = Math.cos(angle) * (radius + 0.35);
        const ty = Math.sin(angle) * (radius + 0.35);
        return (
          <mesh key={i} position={[tx, ty, 0]} rotation={[0, 0, angle]}>
            <boxGeometry args={[0.4, 0.7, 0.5]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} metalness={0.7} roughness={0.3} />
          </mesh>
        );
      })}
      {/* Spokes */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
          <boxGeometry args={[radius * 1.6, 0.15, 0.3]} />
          <meshStandardMaterial color="#0f2e2a" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// Pulsing data cable
function DataCable({
  points,
  color = "#14b8a6",
}: {
  points: [number, number, number][];
  color?: string;
}) {
  const ref = useRef<any>(null!);

  useFrame(({ clock }) => {
    if (ref.current?.material) {
      ref.current.material.dashOffset = -clock.getElapsedTime() * 1.5;
    }
  });

  const curve = useMemo(
    () => new CatmullRomCurve3(points.map(([x, y, z]) => new Vector3(x, y, z))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const geometry = useMemo(() => {
    const tube = new TubeGeometry(curve, 32, 0.06, 6, false);
    return tube;
  }, [curve]);

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Livewire node — pulsing sphere
function LivewireNode({ position, color = "#14b8a6" }: { position: [number, number, number]; color?: string }) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 0.85 + 0.15 * Math.sin(clock.getElapsedTime() * 2.5 + position[0]);
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.4, 12, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      <pointLight color={color} intensity={2} distance={8} />
    </mesh>
  );
}

export default function ZoneReactive() {
  return (
    <group position={[0, 0, -400]}>
      {/* Interlocking gears — two sets */}
      <Gear position={[-8, 5, -10]} speed={0.4} direction={1} radius={2.5} color="#14b8a6" />
      <Gear position={[-3.2, 5, -10]} speed={0.55} direction={-1} radius={1.7} color="#10b981" />
      <Gear position={[8, 4, -30]} speed={0.35} direction={-1} radius={3} color="#14b8a6" />
      <Gear position={[2.5, 4, -30]} speed={0.5} direction={1} radius={2} color="#0d9488" />
      <Gear position={[-6, 3, -50]} speed={0.6} direction={1} radius={1.5} color="#10b981" />

      {/* Data cables weaving through */}
      <DataCable
        points={[[-20, 2, 0], [-10, 5, -15], [0, 3, -25], [10, 6, -40], [20, 2, -55]]}
        color="#14b8a6"
      />
      <DataCable
        points={[[15, 3, -5], [5, 7, -20], [-5, 4, -35], [-15, 3, -50]]}
        color="#10b981"
      />
      <DataCable
        points={[[-18, 1.5, -10], [-8, 2, -30], [2, 1.5, -50]]}
        color="#0ea5e9"
      />

      {/* Livewire junction nodes */}
      <LivewireNode position={[-10, 5, -15]} color="#14b8a6" />
      <LivewireNode position={[0, 3, -25]} color="#10b981" />
      <LivewireNode position={[10, 6, -40]} color="#14b8a6" />
      <LivewireNode position={[-5, 4, -35]} color="#0ea5e9" />

      {/* Alpine.js label */}
      <Text
        position={[-8, 9, -10]}
        fontSize={0.5}
        font="/fonts/SpaceMono-Regular.woff"
        color="#14b8a6"
        anchorX="center"
      >
        Alpine.js
      </Text>
      {/* Livewire label */}
      <Text
        position={[8, 9, -30]}
        fontSize={0.5}
        font="/fonts/SpaceMono-Regular.woff"
        color="#10b981"
        anchorX="center"
      >
        Livewire
      </Text>
      {/* Filament label */}
      <Text
        position={[0, 8, -50]}
        fontSize={0.4}
        font="/fonts/SpaceMono-Regular.woff"
        color="#0ea5e9"
        anchorX="center"
      >
        Filament
      </Text>

      {/* Zone label */}
      <Text
        position={[0, 12, -25]}
        fontSize={0.65}
        font="/fonts/SpaceMono-Regular.woff"
        color="#14b8a6"
        anchorX="center"
      >
        {"{ ZONE_03 :: REACTIVE }"}
      </Text>
    </group>
  );
}
