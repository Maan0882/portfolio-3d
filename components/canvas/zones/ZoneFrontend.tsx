"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { Group, Vector3, MathUtils } from "three";

const CODE_SNIPPETS = [
  `export default function Hero() {\n  return (\n    <section className="hero">\n      <h1>Build. <span>Ship.</span></h1>\n    </section>\n  )\n}`,
  `interface Project {\n  name: string\n  stack: string[]\n  live: URL\n}`,
  `const [data, setData] =\n  useState<Project[]>([])`,
  `// Next.js App Router\nexport default async\nfunction Page() {\n  const data = await fetch(...)\n  return <Layout>{data}</Layout>\n}`,
  `// TypeScript strict mode\ntype ApiResponse<T> = {\n  data: T\n  status: number\n  message: string\n}`,
  `// SSM Future Innovation\nimport { NextPage } from 'next'\nconst Home: NextPage = () =>\n  <main>...</main>`,
];

interface CodeBillboardProps {
  position: [number, number, number];
  text: string;
  baseOpacity: number;
  color: string;
}

function CodeBillboard({ position, text, baseOpacity, color }: CodeBillboardProps) {
  const ref = useRef<Group>(null!);
  const pos = useMemo(() => new Vector3(...position), [position]);

  useFrame(({ camera }) => {
    if (!ref.current) return;
    const dist = camera.position.distanceTo(pos);
    const alpha = MathUtils.clamp(MathUtils.mapLinear(dist, 5, 35, 1, 0), 0, 1);
    ref.current.children.forEach((child: any) => {
      if (child.material) child.material.opacity = alpha * baseOpacity;
    });
  });

  return (
    <Billboard ref={ref} position={position}>
      {/* Background panel */}
      <mesh>
        <planeGeometry args={[3.2, 1.8]} />
        <meshBasicMaterial
          color="#0a1628"
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Border */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[3.22, 1.82]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      {/* Code text */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.13}
        font="/fonts/SpaceMono-Regular.woff"
        color={color}
        maxWidth={3}
        lineHeight={1.5}
        anchorX="center"
        anchorY="middle"
        fillOpacity={1}
      >
        {text}
      </Text>
    </Billboard>
  );
}

// React atom logo — 3 elliptical orbits
function ReactLogo({ position }: { position: [number, number, number] }) {
  const ref = useRef<Group>(null!);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <group ref={ref} position={position}>
      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={1.2} />
      </mesh>
      {/* 3 orbital rings */}
      {[0, Math.PI / 3, (2 * Math.PI) / 3].map((angle, i) => (
        <group key={i} rotation={[Math.PI / 2, 0, angle]}>
          <mesh>
            <torusGeometry args={[2.5, 0.06, 8, 64]} />
            <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={0.8} transparent opacity={0.85} />
          </mesh>
          {/* Electron */}
          <mesh position={[2.5, 0, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#00d9ff" emissiveIntensity={2} />
          </mesh>
        </group>
      ))}
      {/* "Next.js" label below */}
      <Text
        position={[0, -3.5, 0]}
        fontSize={0.7}
        font="/fonts/SpaceMono-Regular.woff"
        color="#00d9ff"
        anchorX="center"
        anchorY="middle"
      >
        NEXT.JS
      </Text>
    </group>
  );
}

// Glass tower buildings
function GlassTower({ position, height, color }: { position: [number, number, number]; height: number; color: string }) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.emissiveIntensity = 0.15 + 0.05 * Math.sin(clock.getElapsedTime() * 0.8 + position[0]);
    }
  });
  return (
    <mesh ref={ref} position={[position[0], height / 2, position[2]]}>
      <boxGeometry args={[3, height, 3]} />
      <meshStandardMaterial
        color="#0c1a2e"
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.75}
        roughness={0.1}
        metalness={0.5}
      />
    </mesh>
  );
}


export default function ZoneFrontend() {
  return (
    <group position={[0, 0, -80]}>
      {/* Giant React/Next.js Logo */}
      <ReactLogo position={[-18, 7, -30]} />

      {/* Glass tower skyline */}
      <GlassTower position={[-30, 0, -20]} height={18} color="#0ea5e9" />
      <GlassTower position={[-24, 0, -45]} height={28} color="#818cf8" />
      <GlassTower position={[-35, 0, -55]} height={14} color="#0ea5e9" />
      <GlassTower position={[25, 0, -30]} height={22} color="#0070f3" />
      <GlassTower position={[32, 0, -50]} height={16} color="#818cf8" />

      {/* Floating code billboards — 3 depth layers */}
      {/* Foreground (readable) */}
      <CodeBillboard position={[-8, 5, -20]} text={CODE_SNIPPETS[0]} baseOpacity={0.95} color="#00d9ff" />
      <CodeBillboard position={[6, 4, -35]} text={CODE_SNIPPETS[2]} baseOpacity={0.9} color="#818cf8" />

      {/* Mid-depth */}
      <CodeBillboard position={[-20, 6, -50]} text={CODE_SNIPPETS[1]} baseOpacity={0.65} color="#0ea5e9" />
      <CodeBillboard position={[16, 8, -60]} text={CODE_SNIPPETS[3]} baseOpacity={0.6} color="#818cf8" />

      {/* Background (atmospheric) */}
      <CodeBillboard position={[-30, 10, -90]} text={CODE_SNIPPETS[4]} baseOpacity={0.3} color="#0ea5e9" />
      <CodeBillboard position={[28, 5, -100]} text={CODE_SNIPPETS[5]} baseOpacity={0.25} color="#818cf8" />

      {/* Neon ground lines */}
      {[-18, -12, 12, 18].map((x) => (
        <mesh key={x} position={[x, 0.01, -50]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.03, 120]} />
          <meshBasicMaterial color="#00d9ff" transparent opacity={0.2} />
        </mesh>
      ))}

      {/* Zone label floating text */}
      <Text
        position={[-18, 14, -30]}
        fontSize={0.6}
        font="/fonts/SpaceMono-Regular.woff"
        color="#00d9ff"
        anchorX="center"
      >
        {"{ ZONE_01 :: FRONTEND }"}
      </Text>
    </group>
  );
}
