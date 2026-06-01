"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import CameraRig from "./CameraRig";
import Environment from "./Environment";
import Character from "./Character";
import ZoneLanding from "./zones/ZoneLanding";
import ZoneFrontend from "./zones/ZoneFrontend";
import ZoneBackend from "./zones/ZoneBackend";
import ZoneReactive from "./zones/ZoneReactive";
import ZoneDevOps from "./zones/ZoneDevOps";
import ZoneContact from "./zones/ZoneContact";
import SceneBackground from "./SceneBackground";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 4, 30], fov: 60, near: 0.1, far: 1000 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      dpr={[0.8, 1.2]}
      shadows={false}
    >
      <Suspense fallback={null}>
        <SceneBackground />
        <CameraRig />
        <Environment />
        <Character />

        {/* Zones */}
        <ZoneLanding />
        <ZoneFrontend />
        <ZoneBackend />
        <ZoneReactive />
        <ZoneDevOps />
        <ZoneContact />

        {/* Post-processing (Disabled temporarily for React 19 / Turbopack stability)
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            offset={[0.0008, 0.0008]}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
        */}

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        {/* <Preload all /> */}
      </Suspense>
    </Canvas>
  );
}

