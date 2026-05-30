"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Group } from "three";

const FONT = "/fonts/SpaceMono-Regular.woff";

// ─── Project showcase card ────────────────────────────────────────────────────
interface ProjectCardProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  tagline: string;
  stack: string;
  highlights: string[];
  accentColor: string;
}

function ProjectCard({
  position,
  rotation,
  title,
  tagline,
  stack,
  highlights,
  accentColor,
}: ProjectCardProps) {
  const ref = useRef<Group>(null!);
  const baseY = position[1];

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = baseY + Math.sin(clock.getElapsedTime() * 0.5 + position[0] * 0.2) * 0.2;
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.18 + position[2] * 0.05) * 0.05;
    }
  });

  const lineH = 0.44;
  const cardH = highlights.length * lineH + 3.0;
  const cardW = 8.5;

  return (
    <group ref={ref} position={position} rotation={rotation ?? [0, 0, 0]}>
      {/* Card body */}
      <mesh>
        <planeGeometry args={[cardW, cardH]} />
        <meshBasicMaterial color="#060c1e" transparent opacity={0.78} />
      </mesh>
      {/* Border glow */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[cardW + 0.06, cardH + 0.06]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.25} />
      </mesh>
      {/* Top accent strip */}
      <mesh position={[0, cardH / 2 - 0.06, 0.01]}>
        <planeGeometry args={[cardW, 0.14]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.85} />
      </mesh>

      {/* Project title */}
      <Text
        position={[0, cardH / 2 - 0.5, 0.01]}
        fontSize={0.3}
        font={FONT}
        color={accentColor}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* Tagline */}
      <Text
        position={[0, cardH / 2 - 0.95, 0.01]}
        fontSize={0.17}
        font={FONT}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        maxWidth={cardW - 0.6}
      >
        {tagline}
      </Text>

      {/* Stack tag */}
      <Text
        position={[0, cardH / 2 - 1.35, 0.01]}
        fontSize={0.15}
        font={FONT}
        color={accentColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={cardW - 0.6}
      >
        {stack}
      </Text>

      {/* Divider */}
      <mesh position={[0, cardH / 2 - 1.6, 0.01]}>
        <planeGeometry args={[cardW - 0.5, 0.015]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.35} />
      </mesh>

      {/* Highlights */}
      {highlights.map((line, i) => (
        <Text
          key={i}
          position={[-(cardW / 2 - 0.4), cardH / 2 - 1.95 - i * lineH, 0.01]}
          fontSize={0.17}
          font={FONT}
          color="#cbd5e1"
          anchorX="left"
          anchorY="middle"
          maxWidth={cardW - 0.7}
        >
          {line}
        </Text>
      ))}
    </group>
  );
}

// ─── Experience timeline entry ────────────────────────────────────────────────
function ExperienceEntry({
  position,
  role,
  company,
  period,
  lines,
  color,
}: {
  position: [number, number, number];
  role: string;
  company: string;
  period: string;
  lines: string[];
  color: string;
}) {
  const ref = useRef<Group>(null!);
  const baseY = position[1];
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = baseY + Math.sin(clock.getElapsedTime() * 0.4 + position[0]) * 0.12;
    }
  });

  const lineH = 0.42;
  const cardH = lines.length * lineH + 2.2;
  const cardW = 7.5;

  return (
    <group ref={ref} position={position}>
      {/* Background */}
      <mesh>
        <planeGeometry args={[cardW, cardH]} />
        <meshBasicMaterial color="#05091b" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[cardW + 0.05, cardH + 0.05]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} />
      </mesh>
      {/* Left accent */}
      <mesh position={[-(cardW / 2 - 0.05), 0, 0.01]}>
        <planeGeometry args={[0.1, cardH]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      {/* Role */}
      <Text
        position={[-(cardW / 2 - 0.35), cardH / 2 - 0.45, 0.01]}
        fontSize={0.24}
        font={FONT}
        color={color}
        anchorX="left"
        anchorY="middle"
      >
        {role}
      </Text>
      {/* Company */}
      <Text
        position={[-(cardW / 2 - 0.35), cardH / 2 - 0.85, 0.01]}
        fontSize={0.17}
        font={FONT}
        color="#e2e8f0"
        anchorX="left"
        anchorY="middle"
      >
        {company}
      </Text>
      {/* Period */}
      <Text
        position={[-(cardW / 2 - 0.35), cardH / 2 - 1.2, 0.01]}
        fontSize={0.15}
        font={FONT}
        color="#64748b"
        anchorX="left"
        anchorY="middle"
      >
        {period}
      </Text>
      {/* Divider */}
      <mesh position={[0, cardH / 2 - 1.45, 0.01]}>
        <planeGeometry args={[cardW - 0.4, 0.015]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      {/* Lines */}
      {lines.map((line, i) => (
        <Text
          key={i}
          position={[-(cardW / 2 - 0.35), cardH / 2 - 1.75 - i * lineH, 0.01]}
          fontSize={0.16}
          font={FONT}
          color="#94a3b8"
          anchorX="left"
          anchorY="middle"
          maxWidth={cardW - 0.65}
        >
          {line}
        </Text>
      ))}
    </group>
  );
}

// ─── Spinning tech badge ──────────────────────────────────────────────────────
function SpinBadge({ position, label, color }: { position: [number, number, number]; label: string; color: string }) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.8;
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#0f172a" emissive={color} emissiveIntensity={0.7} metalness={0.7} roughness={0.2} />
      </mesh>
      <pointLight color={color} intensity={1.5} distance={6} />
      <Text position={[0, 0.85, 0]} fontSize={0.18} font={FONT} color={color} anchorX="center">
        {label}
      </Text>
    </group>
  );
}

// ─── Zone export ─────────────────────────────────────────────────────────────
export default function ZoneBackend() {
  return (
    <group position={[0, 0, -240]}>

      {/* === Zone header === */}
      <Text position={[0, 17, -5]} fontSize={0.7} font={FONT} color="#ff2d20" anchorX="center">
        {"{ ZONE_03 :: PROJECTS & EXPERIENCE }"}
      </Text>

      {/* ─────────── PROJECT CARDS ─────────── */}

      {/* Project 1 — IAPES */}
      <ProjectCard
        position={[-12, 11, -10]}
        rotation={[0, 0.25, 0]}
        title="IAPES — Report Portal"
        tagline="Intelligent Automated PDF Engine System"
        stack="Laravel | MySQL | Livewire | Filament PHP | DomPDF"
        highlights={[
          "> Automated PDF generation for academic reports",
          "> Role-based access for admin / staff / students",
          "> Dynamic form builder with Livewire components",
          "> Filament PHP admin panel with CRUD",
          "> Deployed on shared hosting with CI pipeline",
        ]}
        accentColor="#ff2d20"
      />

      {/* Project 2 — 3D Portfolio */}
      <ProjectCard
        position={[10, 10, -25]}
        rotation={[0, -0.2, 0]}
        title="3D Developer Portfolio"
        tagline="Immersive scroll-driven WebGL experience"
        stack="Next.js 16 | React Three Fiber | Three.js | Zustand | TypeScript"
        highlights={[
          "> 6 interactive 3D zones driven by scroll",
          "> Custom camera spline path with smooth lerp",
          "> Low-poly hover-bike character with animation",
          "> Dynamic background color per zone",
          "> Post-processing: Bloom + Chromatic Aberration",
        ]}
        accentColor="#818cf8"
      />

      {/* Project 3 — Task Manager */}
      <ProjectCard
        position={[-10, 5, -40]}
        rotation={[0, 0.18, 0]}
        title="Task Manager App"
        tagline="Full-stack project & task management system"
        stack="React | Node.js | Express | PostgreSQL | JWT Auth"
        highlights={[
          "> JWT-based auth with refresh tokens",
          "> Drag-and-drop Kanban board UI",
          "> Real-time updates via WebSocket",
          "> REST API with pagination & filtering",
          "> Docker Compose for local dev environment",
        ]}
        accentColor="#14b8a6"
      />

      {/* Project 4 — E-Commerce */}
      <ProjectCard
        position={[12, 4, -55]}
        rotation={[0, -0.15, 0]}
        title="E-Commerce Platform"
        tagline="Laravel-powered multi-vendor marketplace"
        stack="Laravel | Alpine.js | MySQL | Stripe API | Blade"
        highlights={[
          "> Multi-vendor product catalog system",
          "> Stripe payment gateway integration",
          "> Advanced filtering with Alpine.js reactivity",
          "> Admin panel: analytics, inventory, orders",
          "> Email notifications with Laravel Mail + Queue",
        ]}
        accentColor="#f59e0b"
      />

      {/* ─────────── EXPERIENCE CARDS ─────────── */}

      <Text position={[0, 16, -65]} fontSize={0.5} font={FONT} color="#94a3b8" anchorX="center">
        -- WORK EXPERIENCE --
      </Text>

      {/* Experience 1 */}
      <ExperienceEntry
        position={[-10, 10, -70]}
        role="Full Stack Developer Intern"
        company="Tech Company — Ahmedabad, India"
        period="Jun 2023 – Nov 2023  |  6 Months"
        lines={[
          "> Built Laravel APIs consumed by React frontend",
          "> Developed Livewire components for admin tools",
          "> Integrated DomPDF for automated reporting",
          "> Wrote unit tests with PHPUnit, coverage > 80%",
          "> Collaborated in Agile sprints with Git flow",
        ]}
        color="#ff2d20"
      />

      {/* Experience 2 */}
      <ExperienceEntry
        position={[9, 9, -80]}
        role="Freelance Web Developer"
        company="Self-employed / Upwork"
        period="2022 – Present"
        lines={[
          "> Delivered 5+ client projects end-to-end",
          "> Built custom Laravel + Blade CMS sites",
          "> Created React SPAs with REST API backends",
          "> Handled deployment, DNS, and hosting setup",
        ]}
        color="#818cf8"
      />

      {/* ─────────── Spinning tech badges (decoration) ─────────── */}
      <SpinBadge position={[-5, 14, -15]} label="Laravel" color="#ff2d20" />
      <SpinBadge position={[4, 14, -20]} label="React" color="#00d9ff" />
      <SpinBadge position={[-3, 13, -30]} label="Python" color="#3776ab" />
      <SpinBadge position={[5, 12, -45]} label="Docker" color="#0db7ed" />
      <SpinBadge position={[-4, 11, -60]} label="Next.js" color="#ffffff" />
      <SpinBadge position={[4, 10, -75]} label="Node.js" color="#339933" />

      {/* ─────────── Ground neon lines ─────────── */}
      {[-16, -8, 0, 8, 16].map((x) => (
        <mesh key={x} position={[x, 0.01, -45]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.03, 110]} />
          <meshBasicMaterial color="#ff2d20" transparent opacity={0.1} />
        </mesh>
      ))}

      {/* Zone lights */}
      <pointLight position={[-12, 14, -10]} color="#ff2d20" intensity={4} distance={35} />
      <pointLight position={[10, 12, -25]} color="#818cf8" intensity={3} distance={25} />
      <pointLight position={[-10, 8, -40]} color="#14b8a6" intensity={2.5} distance={22} />
      <pointLight position={[12, 6, -55]} color="#f59e0b" intensity={2.5} distance={22} />
      <pointLight position={[0, 10, -75]} color="#ff2d20" intensity={2} distance={20} />
    </group>
  );
}
