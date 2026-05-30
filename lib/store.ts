import { create } from "zustand";

interface ScrollStore {
  progress: number;        // 0–1 normalized scroll progress
  zone: string;            // current zone name
  contactVisible: boolean;
  landingVisible: boolean;
  setProgress: (p: number) => void;
  setZone: (z: string) => void;
  setContactVisible: (v: boolean) => void;
  setLandingVisible: (v: boolean) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  progress: 0,
  zone: "LAUNCH",
  contactVisible: false,
  landingVisible: true,
  setProgress: (progress) => set({ progress }),
  setZone: (zone) => set({ zone }),
  setContactVisible: (contactVisible) => set({ contactVisible }),
  setLandingVisible: (landingVisible) => set({ landingVisible }),
}));

// Zone config: [start, end] normalized (0–1)
export const ZONES = [
  { id: "LAUNCH",           label: "INITIALIZING",              range: [0.00, 0.08] as [number, number] },
  { id: "ZONE_01 :: FRONTEND",  label: "FRONTEND FRONTIER",    range: [0.08, 0.28] as [number, number] },
  { id: "ZONE_02 :: BACKEND",   label: "BACKEND CITADEL",      range: [0.28, 0.48] as [number, number] },
  { id: "ZONE_03 :: REACTIVE",  label: "REACTIVE LAYER",       range: [0.48, 0.63] as [number, number] },
  { id: "ZONE_04 :: DEVOPS",    label: "DEVOPS ENGINE",        range: [0.63, 0.82] as [number, number] },
  { id: "ZONE_05 :: CONTACT",   label: "COMMAND CENTER",       range: [0.82, 1.00] as [number, number] },
];

export function getZoneForProgress(p: number) {
  return ZONES.find((z) => p >= z.range[0] && p <= z.range[1]) ?? ZONES[0];
}
