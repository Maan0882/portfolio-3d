"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, MathUtils } from "three";
import { CAMERA_PATH, LOOKAT_PATH } from "@/lib/cameraPath";
import { useScrollStore } from "@/lib/store";

const _camPos = new Vector3();
const _lookAt = new Vector3();
const _currentLookAt = new Vector3();

export default function CameraRig() {
  const { camera } = useThree();
  const smoothProgress = useRef(0);
  const rawProgress = useScrollStore((s) => s.progress);

  useFrame(() => {
    // Smooth the scroll value for buttery camera motion
    smoothProgress.current = MathUtils.lerp(
      smoothProgress.current,
      rawProgress,
      0.055
    );

    const t = smoothProgress.current;

    // Sample positions from spline
    CAMERA_PATH.getPoint(t, _camPos);
    LOOKAT_PATH.getPoint(t, _lookAt);

    // Smoothly interpolate camera position
    camera.position.lerp(_camPos, 0.08);

    // Smooth look-at
    _currentLookAt.lerp(_lookAt, 0.06);
    camera.lookAt(_currentLookAt);
  });

  return null;
}
