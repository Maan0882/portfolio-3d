"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, MathUtils, PerspectiveCamera } from "three";
import { CAMERA_PATH, LOOKAT_PATH } from "@/lib/cameraPath";
import { useScrollStore } from "@/lib/store";

const _camPos = new Vector3();
const _lookAt = new Vector3();
const _currentLookAt = new Vector3();

export default function CameraRig() {
  const { camera, size } = useThree();
  const smoothProgress = useRef(0);
  const rawProgress = useScrollStore((s) => s.progress);

  // ── Responsive FOV: widen on portrait/mobile so scene fills screen ──
  useEffect(() => {
    const cam = camera as PerspectiveCamera;
    if (!cam.isPerspectiveCamera) return;

    const isPortrait = size.height > size.width;
    const isMobile   = size.width < 768;

    if (isMobile && isPortrait) {
      // Wide FOV on portrait phone — matches desktop spatial coverage
      cam.fov = 85;
    } else if (isMobile) {
      // Landscape phone
      cam.fov = 70;
    } else if (size.width < 1024) {
      // Tablet
      cam.fov = 65;
    } else {
      // Desktop
      cam.fov = 60;
    }
    cam.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

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
