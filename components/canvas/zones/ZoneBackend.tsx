"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Group } from "three";

// Laravel "L" arch — grand archway
function LaravelArch({ position }: { position: [number, number, number] }) {
  const archRef = useRef<Group>(null!);

  useFrame(({ clock }) => {
    if (archRef.current) {
      // Gentle glow pulse
      const t = clock.getElapsedTime();
      archRef.current.children.forEach((child: any, i) => {
        if (child.material?.emissiveIntensity !== undefined) {
          child.material.emissiveIntensity = 0.3 + 0.1 * Math.sin(t * 0.6 + i);
        }
      });
    }
  });

  return (
    <group ref={archRef} position={position}>
      {/* Left pillar */}
      <mesh position={[-5, 6, 0]}>
        <boxGeometry args={[2, 12, 1.5]} />
        <meshStandardMaterial color="#1a0f1e" emissive="#ff2d20" emissiveIntensity={0.3} roughness={0.6} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[5, 6, 0]}>
        <boxGeometry args={[2, 12, 1.5]} />
        <meshStandardMaterial color="#1a0f1e" emissive="#ff2d20" emissiveIntensity={0.3} roughness={0.6} />
      </mesh>
      {/* Arch span top */}
      <mesh position={[0, 12.5, 0]}>
        <boxGeometry args={[12, 1.5, 1.5]} />
        <meshStandardMaterial color="#1a0f1e" emissive="#ff2d20" emissiveIntensity={0.4} roughness={0.5} />
      </mesh>
      {/* Arch crown (Laravel flame shape using cones) */}
      <mesh position={[0, 14.5, 0]}>
        <coneGeometry args={[1.5, 3, 4]} />
        <meshStandardMaterial color="#ff2d20" emissive="#ff2d20" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-1.2, 13.8, 0]} rotation={[0, 0, 0.4]}>
        <coneGeometry args={[0.8, 2, 4]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[1.2, 13.8, 0]} rotation={[0, 0, -0.4]}>
        <coneGeometry args={[0.8, 2, 4]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={1.2} />
      </mesh>

      {/* Laravel label */}
      <Text
        position={[0, 17, 0]}
        fontSize={1}
        font="/fonts/SpaceMono-Regular.woff"
        color="#ff2d20"
        anchorX="center"
      >
        LARAVEL
      </Text>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.4}
        font="/fonts/SpaceMono-Regular.woff"
        color="#f97316"
        anchorX="center"
      >
        BACKEND CITADEL
      </Text>

      {/* Glow light from arch */}
      <pointLight color="#ff2d20" intensity={3} distance={30} position={[0, 10, 0]} />
    </group>
  );
}

// Floating database table panel
function DBTable({
  position,
  tableName,
  columns,
}: {
  position: [number, number, number];
  tableName: string;
  columns: string[];
}) {
  const ref = useRef<Group>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3 + position[0]) * 0.2;
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5 + position[2]) * 0.3;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Table background */}
      <mesh>
        <planeGeometry args={[3.5, columns.length * 0.6 + 1.2]} />
        <meshBasicMaterial color="#0d0810" transparent opacity={0.85} />
      </mesh>
      {/* Table border */}
      <mesh position={[0, 0, -0.001]}>
        <planeGeometry args={[3.52, columns.length * 0.6 + 1.22]} />
        <meshBasicMaterial color="#ff2d20" transparent opacity={0.3} />
      </mesh>
      {/* Table name */}
      <Text
        position={[0, (columns.length * 0.6) / 2 + 0.2, 0.01]}
        fontSize={0.22}
        font="/fonts/SpaceMono-Regular.woff"
        color="#ff2d20"
        anchorX="center"
        anchorY="middle"
      >
        📋 {tableName}
      </Text>
      {/* Column rows */}
      {columns.map((col, i) => (
        <Text
          key={col}
          position={[0, (columns.length * 0.6) / 2 - 0.55 - i * 0.5, 0.01]}
          fontSize={0.16}
          font="/fonts/SpaceMono-Regular.woff"
          color="#f8fafc"
          anchorX="center"
          anchorY="middle"
        >
          {col}
        </Text>
      ))}
    </group>
  );
}

// Eloquent model cube
function EloquentCube({ position, label }: { position: [number, number, number]; label: string }) {
  const ref = useRef<Group>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.6;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#1a0f1e" emissive="#f97316" emissiveIntensity={0.4} roughness={0.3} metalness={0.6} transparent opacity={0.9} />
      </mesh>
      <Text
        position={[0, 0, 0.76]}
        fontSize={0.22}
        font="/fonts/SpaceMono-Regular.woff"
        color="#f97316"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
      >
        {label}
      </Text>
    </group>
  );
}

export default function ZoneBackend() {
  return (
    <group position={[0, 0, -240]}>
      {/* Grand Laravel Arch */}
      <LaravelArch position={[20, 0, -30]} />

      {/* Floating DB tables */}
      <DBTable
        position={[-10, 6, -10]}
        tableName="users"
        columns={["id  INT PRIMARY", "name  VARCHAR(255)", "email  UNIQUE", "role  ENUM"]}
      />
      <DBTable
        position={[-10, 5, -60]}
        tableName="projects"
        columns={["id  INT", "user_id  FK", "name  VARCHAR", "status  ENUM"]}
      />
      <DBTable
        position={[5, 7, -80]}
        tableName="iapes_reports"
        columns={["id  INT", "generated_at", "pdf_path  TEXT", "status"]}
      />

      {/* Eloquent model cubes */}
      <EloquentCube position={[2, 5, -20]} label={"User::\nfind(1)"} />
      <EloquentCube position={[-4, 4, -40]} label={"Post::\nwith('user')"} />
      <EloquentCube position={[8, 6, -55]} label={"Report::\ncreate()"} />

      {/* Route cables (line geometry approximated as thin boxes) */}
      {[
        { from: [-8, 3, -25] as [number,number,number], label: "GET /api/users" },
        { from: [5, 3, -45] as [number,number,number], label: "POST /api/report" },
        { from: [-5, 3, -65] as [number,number,number], label: "GET /api/projects" },
      ].map(({ from, label }) => (
        <group key={label} position={from}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 8, 4]} />
            <meshBasicMaterial color="#f97316" transparent opacity={0.5} />
          </mesh>
          <Text position={[4.5, 0.3, 0]} fontSize={0.2} font="/fonts/SpaceMono-Regular.woff" color="#f97316" anchorX="left">
            {label}
          </Text>
        </group>
      ))}

      {/* Zone label */}
      <Text
        position={[20, 20, -30]}
        fontSize={0.7}
        font="/fonts/SpaceMono-Regular.woff"
        color="#ff2d20"
        anchorX="center"
      >
        {"{ ZONE_02 :: BACKEND }"}
      </Text>
    </group>
  );
}
