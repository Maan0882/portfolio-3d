"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Group, MathUtils } from "three";

// Docker whale — geometric low-poly
function DockerWhale({ position }: { position: [number, number, number] }) {
  const ref = useRef<Group>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      // Gentle rocking
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.06;
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8) * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Whale body */}
      <mesh>
        <capsuleGeometry args={[2, 5, 8, 16]} />
        <meshStandardMaterial color="#0db7ed" emissive="#0db7ed" emissiveIntensity={0.3} roughness={0.4} />
      </mesh>
      {/* Whale head */}
      <mesh position={[0, 0, 3.5]}>
        <sphereGeometry args={[2, 12, 12]} />
        <meshStandardMaterial color="#0db7ed" emissive="#0db7ed" emissiveIntensity={0.3} />
      </mesh>
      {/* Eye */}
      <mesh position={[0.8, 0.8, 5.2]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.5, -4]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[4.5, 0.5, 2]} />
        <meshStandardMaterial color="#0891b2" emissive="#0db7ed" emissiveIntensity={0.2} />
      </mesh>
      {/* Tail fins */}
      <mesh position={[2.5, 0.5, -5]} rotation={[0.4, 0.2, 0.3]}>
        <boxGeometry args={[1.5, 0.3, 1.5]} />
        <meshStandardMaterial color="#0891b2" />
      </mesh>
      <mesh position={[-2.5, 0.5, -5]} rotation={[0.4, -0.2, -0.3]}>
        <boxGeometry args={[1.5, 0.3, 1.5]} />
        <meshStandardMaterial color="#0891b2" />
      </mesh>

      {/* Water spout particles */}
      <mesh position={[0, 3, 4]}>
        <cylinderGeometry args={[0.15, 0.4, 2.5, 6]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#0db7ed" emissiveIntensity={0.8} transparent opacity={0.5} />
      </mesh>

      {/* Glow */}
      <pointLight color="#0db7ed" intensity={4} distance={25} />
    </group>
  );
}

// Shipping container
function Container({
  position,
  color,
  label,
}: {
  position: [number, number, number];
  color: string;
  label: string;
}) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[2.5, 1.4, 5]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Container stripes */}
      {[-1.5, 0, 1.5].map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <boxGeometry args={[2.52, 1.41, 0.08]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
      ))}
      <Text
        position={[0, 0, 2.51]}
        fontSize={0.25}
        font="/fonts/SpaceMono-Regular.woff"
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// Animated PDF document ejection
function PDFEngine({ position }: { position: [number, number, number] }) {
  const ref = useRef<any>(null!);
  const pageRef = useRef<any>(null!);
  const elapsed = useRef(0);
  const clock2 = useRef({ prev: 0 });

  useFrame(({ clock }) => {
    const now = clock.getElapsedTime();
    const delta = now - clock2.current.prev;
    clock2.current.prev = now;
    elapsed.current += delta;
    if (ref.current) {
      // Machine rumble
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 8) * 0.005;
    }
    if (pageRef.current) {
      // Page rises then resets
      pageRef.current.position.y = position[1] + 3.5 + ((elapsed.current * 0.8) % 3);
      pageRef.current.material.opacity = MathUtils.clamp(
        1 - ((elapsed.current * 0.8) % 3) / 3,
        0,
        1
      );
    }
  });

  return (
    <group>
      {/* Engine body */}
      <group ref={ref} position={position}>
        <mesh>
          <boxGeometry args={[3, 2.5, 2]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Input slot */}
        <mesh position={[0, 0.9, 1.01]}>
          <boxGeometry args={[1.2, 0.12, 0.05]} />
          <meshStandardMaterial color="#0db7ed" emissive="#0db7ed" emissiveIntensity={1} />
        </mesh>
        {/* Output slot */}
        <mesh position={[0, 1.35, 1.01]}>
          <boxGeometry args={[1.2, 0.12, 0.05]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} />
        </mesh>
        <Text
          position={[0, -0.5, 1.02]}
          fontSize={0.2}
          font="/fonts/SpaceMono-Regular.woff"
          color="#0db7ed"
          anchorX="center"
        >
          PDF ENGINE
        </Text>
        <Text
          position={[0, -0.8, 1.02]}
          fontSize={0.15}
          font="/fonts/SpaceMono-Regular.woff"
          color="#94a3b8"
          anchorX="center"
        >
          Auto-Generate
        </Text>
        <pointLight color="#0db7ed" intensity={2} distance={10} position={[0, 0, 0]} />
      </group>

      {/* Ejected PDF page */}
      <mesh ref={pageRef} position={[position[0], position[1] + 3.5, position[2] + 1]}>
        <planeGeometry args={[0.85, 1.1]} />
        <meshBasicMaterial color="#fff8e7" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

// Conveyor belt
function ConveyorBelt({ position }: { position: [number, number, number] }) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (ref.current?.material) {
      ref.current.material.map.offset.x = clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4, 15]} />
      <meshStandardMaterial color="#1e293b" roughness={0.8} />
    </mesh>
  );
}

export default function ZoneDevOps() {
  return (
    <group position={[0, 0, -480]}>
      {/* Docker Whale */}
      <DockerWhale position={[-14, 4, -20]} />

      {/* Stacked shipping containers */}
      <Container position={[6, 0.7, -10]} color="#0369a1" label="Next.js" />
      <Container position={[6, 2.1, -10]} color="#1e3a5f" label="Laravel" />
      <Container position={[6, 3.5, -10]} color="#134e4a" label="MySQL" />
      <Container position={[9, 0.7, -10]} color="#0f172a" label="Docker" />
      <Container position={[9, 2.1, -10]} color="#1c1917" label="Git" />

      {/* PDF document engine */}
      <PDFEngine position={[-4, 1.25, -40]} />

      {/* CI/CD pipeline tubes */}
      {[
        { from: [8, 1.5, 0] as [number,number,number], label: "BUILD", color: "#0db7ed" },
        { from: [8, 1.5, -20] as [number,number,number], label: "TEST", color: "#10b981" },
        { from: [8, 1.5, -40] as [number,number,number], label: "DEPLOY", color: "#f59e0b" },
      ].map(({ from, label, color }) => (
        <group key={label} position={from}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
          </mesh>
          <Text
            position={[0, 0.7, 0]}
            fontSize={0.28}
            font="/fonts/SpaceMono-Regular.woff"
            color={color}
            anchorX="center"
          >
            {label}
          </Text>
          {from[2] > -40 && (
            <mesh position={[0, 0, -10]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 20, 8]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.6} />
            </mesh>
          )}
        </group>
      ))}

      {/* Zone label */}
      <Text
        position={[-14, 12, -20]}
        fontSize={0.65}
        font="/fonts/SpaceMono-Regular.woff"
        color="#0db7ed"
        anchorX="center"
      >
        {"{ ZONE_04 :: DEVOPS }"}
      </Text>
    </group>
  );
}
