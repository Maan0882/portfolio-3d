"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { InstancedMesh, Matrix4, Color, Group } from "three";

const FONT = "/fonts/SpaceMono-Regular.woff";

// ─── Floating hex ambient particles ─────────────────────────────────────────
function HexParticles({ count = 20 }: { count?: number }) {
  const ref = useRef<InstancedMesh>(null!);
  const dummy = useMemo(() => new Matrix4(), []);
  const data = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 40,
      y: 1 + Math.random() * 12,
      z: (Math.random() - 0.5) * 20 - 5,
      speed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      scale: 0.08 + Math.random() * 0.2,
    })), [count]);

  useEffect(() => {
    if (!ref.current) return;
    const color = new Color("#818cf8");
    data.forEach((d, i) => {
      dummy.makeScale(d.scale, d.scale, d.scale);
      dummy.setPosition(d.x, d.y, d.z);
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
      <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.4} transparent opacity={0.45} />
    </instancedMesh>
  );
}

// ─── Holographic info panel ──────────────────────────────────────────────────
function InfoPanel({
  position,
  rotation,
  title,
  lines,
  accentColor,
  width = 7,
  height = 3.5,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  lines: string[];
  accentColor: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.55 + 0.08 * Math.sin(clock.getElapsedTime() * 0.9 + position[0]);
    }
  });

  const lineHeight = 0.48;
  const startY = (lines.length * lineHeight) / 2 - 0.2;

  return (
    <group position={position} rotation={rotation ?? [0, 0, 0]}>
      {/* Background */}
      <mesh ref={ref}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#06091a" transparent opacity={0.6} />
      </mesh>
      {/* Border glow */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[width + 0.05, height + 0.05]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.2} />
      </mesh>
      {/* Top accent bar */}
      <mesh position={[0, height / 2 - 0.06, 0.01]}>
        <planeGeometry args={[width, 0.12]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.7} />
      </mesh>
      {/* Title */}
      <Text
        position={[0, height / 2 - 0.45, 0.02]}
        fontSize={0.28}
        font={FONT}
        color={accentColor}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      {/* Lines */}
      {lines.map((line, i) => (
        <Text
          key={i}
          position={[-width / 2 + 0.35, startY - i * lineHeight, 0.02]}
          fontSize={0.19}
          font={FONT}
          color="#cbd5e1"
          anchorX="left"
          anchorY="middle"
          maxWidth={width - 0.6}
        >
          {line}
        </Text>
      ))}
    </group>
  );
}

// ─── Education card ──────────────────────────────────────────────────────────
function EduCard({
  position,
  degree,
  school,
  year,
  grade,
  color,
}: {
  position: [number, number, number];
  degree: string;
  school: string;
  year: string;
  grade: string;
  color: string;
}) {
  const ref = useRef<Group>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.6 + position[0]) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Card body */}
      <mesh>
        <planeGeometry args={[5.5, 2.4]} />
        <meshBasicMaterial color="#080e20" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[5.55, 2.45]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      {/* Left accent bar */}
      <mesh position={[-2.72, 0, 0.01]}>
        <planeGeometry args={[0.08, 2.4]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      {/* Degree */}
      <Text position={[-2.6, 0.72, 0.02]} fontSize={0.22} font={FONT} color={color} anchorX="left" anchorY="middle" maxWidth={5}>
        {degree}
      </Text>
      {/* School */}
      <Text position={[-2.6, 0.28, 0.02]} fontSize={0.17} font={FONT} color="#94a3b8" anchorX="left" anchorY="middle" maxWidth={5}>
        {school}
      </Text>
      {/* Year tag */}
      <Text position={[-2.6, -0.18, 0.02]} fontSize={0.15} font={FONT} color="#64748b" anchorX="left" anchorY="middle">
        {year}
      </Text>
      {/* Grade */}
      <Text position={[-2.6, -0.6, 0.02]} fontSize={0.17} font={FONT} color="#e2e8f0" anchorX="left" anchorY="middle">
        {grade}
      </Text>
    </group>
  );
}

// ─── Orbiting language tags ──────────────────────────────────────────────────
const SPOKEN_LANGS = ["English", "Gujarati", "Hindi"];

function SpokenLangs({ position }: { position: [number, number, number] }) {
  const ref = useRef<Group>(null!);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.25;
  });

  return (
    <group position={position}>
      <Text position={[0, 2.6, 0]} fontSize={0.28} font={FONT} color="#818cf8" anchorX="center">
        LANGUAGES SPOKEN
      </Text>
      <group ref={ref}>
        {SPOKEN_LANGS.map((lang, i) => {
          const angle = (i / SPOKEN_LANGS.length) * Math.PI * 2;
          const r = 2.2;
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r;
          return (
            <group key={lang} position={[x, 0, z]}>
              <mesh>
                <sphereGeometry args={[0.45, 12, 12]} />
                <meshStandardMaterial color="#1e1b4b" emissive="#818cf8" emissiveIntensity={0.5} roughness={0.3} />
              </mesh>
              <Billboard>
                <Text position={[0, 0.7, 0]} fontSize={0.22} font={FONT} color="#c7d2fe" anchorX="center">
                  {lang}
                </Text>
              </Billboard>
            </group>
          );
        })}
        {/* Center orb */}
        <mesh>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshStandardMaterial color="#0f172a" emissive="#818cf8" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function ZoneLanding() {
  const ring1Ref = useRef<any>(null!);
  const ring2Ref = useRef<any>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.y = t * 0.15;
    if (ring2Ref.current) ring2Ref.current.rotation.z = t * 0.08;
  });

  return (
    <group position={[0, 0, 0]}>
      <HexParticles />

      {/* Glow rings */}
      <mesh ref={ring1Ref} position={[0, 1.5, -5]}>
        <torusGeometry args={[4, 0.04, 8, 80]} />
        <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={1.5} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 1.5, -5]}>
        <torusGeometry args={[6, 0.02, 8, 80]} />
        <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={1.0} transparent opacity={0.55} />
      </mesh>

      {/* Zone header */}
      <Text position={[0, 13, -10]} fontSize={0.7} font={FONT} color="#818cf8" anchorX="center">
        {"{ ZONE_01 :: ABOUT ME + EDUCATION }"}
      </Text>

      {/* === ABOUT ME PANEL === */}
      <InfoPanel
        position={[-7, 9, -12]}
        rotation={[0, 0.18, 0]}
        title="--- ABOUT ME ---"
        accentColor="#00d9ff"
        width={7.5}
        height={4.2}
        lines={[
          "> Software Developer",
          "> 6+ mos: Hands-on project &",
          "  internship experience",
          "> Clean, efficient, maintainable code",
          "> Full-stack ecosystems",
          "> Based in Gujarat, India",
        ]}
      />

      {/* === EDUCATION CARDS === */}
      <Text position={[5, 13, -15]} fontSize={0.28} font={FONT} color="#94a3b8" anchorX="center">
        -- EDUCATION --
      </Text>

      <EduCard
        position={[6, 10.5, -15]}
        degree="M.Sc. in IT"
        school="Sardar Patel University"
        year="2024 – 2026"
        grade="CGPA: 7.89"
        color="#00d9ff"
      />

      <EduCard
        position={[6, 7.5, -18]}
        degree="BCA"
        school="Sardar Patel University"
        year="2021 – 2024"
        grade="CGPA: 8.32"
        color="#818cf8"
      />

      {/* === SPOKEN LANGUAGES === */}
      <SpokenLangs position={[-8, 5, -20]} />

      {/* === PROGRAMMING LANGUAGES KNOWN count === */}
      <InfoPanel
        position={[0, 4, -25]}
        title="--- AT A GLANCE ---"
        accentColor="#f59e0b"
        width={6.5}
        height={3.2}
        lines={[
          "> 6+ Months of Experience",
          "> 8 Programming Languages",
          "> Python · C++ · TS · React",
          "> 3 Spoken Languages",
          "> 4 Key Projects Delivered",
        ]}
      />

      {/* Floor accent lines */}
      {[-4, -2, 0, 2, 4].map((x) => (
        <mesh key={x} position={[x, 0.01, -10]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, 20]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Scene lights for this zone */}
      <pointLight position={[-8, 10, -15]} color="#818cf8" intensity={3} distance={30} />
      <pointLight position={[6, 10, -15]} color="#00d9ff" intensity={2} distance={25} />
    </group>
  );
}
