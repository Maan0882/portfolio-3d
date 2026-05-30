"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Color, MathUtils } from "three";
import { useScrollStore } from "@/lib/store";

// Zone background colors
const ZONE_COLORS = [
  { at: 0.00, color: new Color("#070b14") },  // Launch — deep void
  { at: 0.08, color: new Color("#080e1e") },  // entering frontend
  { at: 0.20, color: new Color("#060c1a") },  // deep frontend
  { at: 0.28, color: new Color("#0d0810") },  // entering backend
  { at: 0.40, color: new Color("#120a08") },  // deep backend (warm tint)
  { at: 0.48, color: new Color("#060e0e") },  // entering reactive (teal tint)
  { at: 0.60, color: new Color("#050c10") },  // deep reactive
  { at: 0.63, color: new Color("#060a12") },  // entering devops
  { at: 0.80, color: new Color("#07080e") },  // entering contact
  { at: 1.00, color: new Color("#0a0814") },  // contact — golden void
];

function sampleBgColor(t: number): Color {
  let prev = ZONE_COLORS[0];
  let next = ZONE_COLORS[ZONE_COLORS.length - 1];

  for (let i = 0; i < ZONE_COLORS.length - 1; i++) {
    if (t >= ZONE_COLORS[i].at && t <= ZONE_COLORS[i + 1].at) {
      prev = ZONE_COLORS[i];
      next = ZONE_COLORS[i + 1];
      break;
    }
  }

  const alpha =
    prev.at === next.at
      ? 0
      : (t - prev.at) / (next.at - prev.at);
  return prev.color.clone().lerp(next.color, MathUtils.clamp(alpha, 0, 1));
}

export default function SceneBackground() {
  const { gl, scene } = useThree();
  const progress = useScrollStore((s) => s.progress);
  const targetColor = useRef(new Color("#070b14"));
  const currentColor = useRef(new Color("#070b14"));

  useFrame(() => {
    const desired = sampleBgColor(progress);
    targetColor.current.copy(desired);
    currentColor.current.lerp(targetColor.current, 0.04);
    gl.setClearColor(currentColor.current, 1);
    scene.background = currentColor.current.clone();
  });

  return null;
}
