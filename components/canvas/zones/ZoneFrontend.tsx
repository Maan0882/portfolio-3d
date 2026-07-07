"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { Group, Vector3, MathUtils } from "three";

const FONT = "/fonts/SpaceMono-Regular.woff";

// ─── Tech Node — floating orb for each skill ─────────────────────────────────
interface TechNodeProps {
  position: [number, number, number];
  label: string;
  color: string;
  radius?: number;
  speed?: number;
  phaseOffset?: number;
}

function TechNode({ position, label, color, radius = 0.55, speed = 0.7, phaseOffset = 0 }: TechNodeProps) {
  const ref = useRef<any>(null!);
  const baseY = position[1];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = baseY + Math.sin(t * speed + phaseOffset) * 0.25;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Outer glow ring */}
      <mesh>
        <torusGeometry args={[radius * 1.35, 0.03, 8, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.5} />
      </mesh>
      {/* Main orb */}
      <mesh>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive={color}
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      {/* Point light for glow effect */}
      <pointLight color={color} intensity={1.2} distance={4} />
      {/* Label */}
      <Billboard>
        <Text
          position={[0, radius + 0.45, 0]}
          fontSize={0.2}
          font={FONT}
          color={color}
          anchorX="center"
          anchorY="bottom"
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}

// ─── Category header panel ────────────────────────────────────────────────────
function CategoryLabel({
  position,
  text,
  color,
}: {
  position: [number, number, number];
  text: string;
  color: string;
}) {
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[5.5, 0.6]} />
        <meshBasicMaterial color="#060d1e" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[5.55, 0.65]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      <Text position={[0, 0, 0.01]} fontSize={0.24} font={FONT} color={color} anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  );
}

// ─── Skill bar panel ──────────────────────────────────────────────────────────
function SkillBar({
  label,
  level,
  color,
  yOffset,
  panelWidth = 6,
}: {
  label: string;
  level: number; // 0–1
  color: string;
  yOffset: number;
  panelWidth?: number;
}) {
  const trackW = panelWidth - 2.6;
  const fillW = trackW * level;

  return (
    <group position={[0, yOffset, 0.01]}>
      {/* Label */}
      <Text
        position={[-(panelWidth / 2 - 0.2), 0, 0]}
        fontSize={0.17}
        font={FONT}
        color="#cbd5e1"
        anchorX="left"
        anchorY="middle"
      >
        {label}
      </Text>
      {/* Track background */}
      <mesh position={[(panelWidth / 2 - trackW / 2 - 0.3), 0, 0]}>
        <planeGeometry args={[trackW, 0.12]} />
        <meshBasicMaterial color="#1e293b" transparent opacity={0.8} />
      </mesh>
      {/* Fill */}
      <mesh position={[(panelWidth / 2 - trackW + fillW / 2 - 0.3), 0, 0.001]}>
        <planeGeometry args={[fillW, 0.12]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      {/* Percent */}
      <Text
        position={[(panelWidth / 2 - 0.1), 0, 0.002]}
        fontSize={0.14}
        font={FONT}
        color={color}
        anchorX="right"
        anchorY="middle"
      >
        {`${Math.round(level * 100)}%`}
      </Text>
    </group>
  );
}

// ─── Floating skill-bar card ──────────────────────────────────────────────────
interface SkillCardProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  accentColor: string;
  skills: { label: string; level: number }[];
  width?: number;
}

function SkillCard({ position, rotation, title, accentColor, skills, width = 6 }: SkillCardProps) {
  const ref = useRef<Group>(null!);
  const baseY = position[1];

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = baseY + Math.sin(clock.getElapsedTime() * 0.5 + position[0] * 0.3) * 0.18;
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2 + position[2] * 0.1) * 0.04;
    }
  });

  const rowH = 0.42;
  const totalH = skills.length * rowH + 1.4;

  return (
    <group ref={ref} position={position} rotation={rotation ?? [0, 0, 0]}>
      <mesh>
        <planeGeometry args={[width, totalH]} />
        <meshBasicMaterial color="#05091c" transparent opacity={0.72} />
      </mesh>
      <mesh position={[0, 0, -0.004]}>
        <planeGeometry args={[width + 0.06, totalH + 0.06]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.22} />
      </mesh>
      {/* Header bar */}
      <mesh position={[0, totalH / 2 - 0.06, 0.01]}>
        <planeGeometry args={[width, 0.12]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.8} />
      </mesh>
      <Text
        position={[0, totalH / 2 - 0.45, 0.01]}
        fontSize={0.26}
        font={FONT}
        color={accentColor}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      {skills.map((s, i) => (
        <SkillBar
          key={s.label}
          label={s.label}
          level={s.level}
          color={accentColor}
          yOffset={totalH / 2 - 1.0 - i * rowH}
          panelWidth={width}
        />
      ))}
    </group>
  );
}

// ─── Tech orbit cluster ───────────────────────────────────────────────────────
function TechOrbitCluster({
  center,
  techs,
  orbitRadius,
  speed,
}: {
  center: [number, number, number];
  techs: { label: string; color: string }[];
  orbitRadius: number;
  speed: number;
}) {
  const groupRef = useRef<Group>(null!);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  return (
    <group position={center}>
      <group ref={groupRef}>
        {techs.map((tech, i) => {
          const angle = (i / techs.length) * Math.PI * 2;
          const x = Math.cos(angle) * orbitRadius;
          const z = Math.sin(angle) * orbitRadius;
          return (
            <TechNode
              key={tech.label}
              position={[x, 0, z]}
              label={tech.label}
              color={tech.color}
              radius={0.5}
              speed={0.5}
              phaseOffset={i * 1.2}
            />
          );
        })}
      </group>
      {/* Center hub */}
      <mesh>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#0f172a" emissive="#00d9ff" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ─── Zone export ─────────────────────────────────────────────────────────────
export default function ZoneFrontend() {
  return (
    <group position={[0, 0, -80]}>

      {/* === Zone header === */}
      <Text position={[0, 15, -10]} fontSize={0.7} font={FONT} color="#00d9ff" anchorX="center">
        {"{ ZONE_02 :: SKILLS & TECHNOLOGIES }"}
      </Text>

      {/* ── PROGRAMMING LANGUAGES orbit cluster ── */}
      <CategoryLabel position={[-16, 13, -5]} text="-- PROGRAMMING LANGUAGES --" color="#00d9ff" />
      <TechOrbitCluster
        center={[-16, 8, -10]}
        orbitRadius={5.5}
        speed={0.12}
        techs={[
          { label: "Python",     color: "#3776ab" },
          { label: "C++",        color: "#00599c" },
          { label: "C",          color: "#555555" },
          { label: "Java",       color: "#f89820" },
          { label: "JavaScript", color: "#f7df1e" },
          { label: "TypeScript", color: "#3178c6" },
          { label: "PHP",        color: "#8892be" },
          { label: "SQL",        color: "#00d9ff" },
        ]}
      />

      {/* ── WEB & FRAMEWORKS skill bars ── */}
      <SkillCard
        position={[8, 10, -20]}
        rotation={[0, -0.2, 0]}
        title="-- WEB & FRAMEWORKS --"
        accentColor="#00d9ff"
        skills={[
          { label: "Next.js",     level: 0.90 },
          { label: "React",       level: 0.88 },
          { label: "Laravel",     level: 0.85 },
          { label: "ASP.NET Core",level: 0.80 },
          { label: "FastAPI",     level: 0.80 },
          { label: "HTML5 & CSS3",level: 0.95 },
        ]}
      />

      {/* ── BACKEND / LANGUAGES skill bars ── */}
      <SkillCard
        position={[-6, 10, -40]}
        rotation={[0, 0.15, 0]}
        title="-- LANGUAGES --"
        accentColor="#ff2d20"
        skills={[
          { label: "Python",     level: 0.88 },
          { label: "C++",        level: 0.85 },
          { label: "JavaScript", level: 0.90 },
          { label: "TypeScript", level: 0.88 },
          { label: "PHP",        level: 0.80 },
          { label: "SQL",        level: 0.85 },
        ]}
      />

      {/* ── DATABASES skill bars ── */}
      <SkillCard
        position={[10, 5, -50]}
        rotation={[0, -0.1, 0]}
        title="-- DATABASES --"
        accentColor="#14b8a6"
        skills={[
          { label: "MySQL",      level: 0.90 },
          { label: "SQL Server", level: 0.85 },
          { label: "PostgreSQL", level: 0.80 },
        ]}
      />

      {/* ── TOOLS skill bars ── */}
      <SkillCard
        position={[-8, 4, -65]}
        rotation={[0, 0.12, 0]}
        title="-- TOOLS --"
        accentColor="#f59e0b"
        skills={[
          { label: "Git / GitHub",    level: 0.92 },
          { label: "VS Code",         level: 0.95 },
          { label: "SDLC",            level: 0.85 },
          { label: "OOP",             level: 0.88 },
          { label: "Testing",         level: 0.85 },
        ]}
      />

      {/* ── Individual floating tech nodes (resume tools) ── */}
      <TechNode position={[18, 7, -15]} label="FastAPI" color="#009688" speed={0.6} phaseOffset={0.5} />
      <TechNode position={[20, 4, -30]} label="React"  color="#61dafb" speed={0.55} phaseOffset={1.2} />
      <TechNode position={[16, 9, -45]} label="PostgreSQL" color="#336791" speed={0.7} phaseOffset={0.8} />
      <TechNode position={[-20, 8, -20]} label="GitHub"  color="#ffffff" speed={0.5} phaseOffset={2.0} />
      <TechNode position={[-18, 5, -55]} label="Git"    color="#f05032" speed={0.65} phaseOffset={1.5} />

      {/* ── Neon ground lines ── */}
      {[-18, -12, -6, 6, 12, 18].map((x) => (
        <mesh key={x} position={[x, 0.01, -40]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.03, 100]} />
          <meshBasicMaterial color="#00d9ff" transparent opacity={0.12} />
        </mesh>
      ))}

      {/* Zone lights */}
      <pointLight position={[-16, 12, -10]} color="#00d9ff" intensity={4} distance={30} />
      <pointLight position={[8, 12, -20]} color="#3178c6" intensity={2} distance={20} />
      <pointLight position={[-6, 10, -40]} color="#ff2d20" intensity={2} distance={20} />
      <pointLight position={[10, 5, -50]} color="#14b8a6" intensity={2} distance={20} />
    </group>
  );
}
