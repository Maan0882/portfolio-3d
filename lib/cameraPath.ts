import { CatmullRomCurve3, Vector3 } from "three";

/**
 * The main camera path — a smooth spline the camera follows
 * as scroll progress goes 0 → 1.
 * The scene extends ~600 units along the -Z axis.
 */
export const CAMERA_PATH = new CatmullRomCurve3(
  [
    new Vector3(0,   4,   30),   // LAUNCH      — looking at character spawn
    new Vector3(0,   4,   10),   // fly forward
    new Vector3(0,   4,  -20),   // transition
    new Vector3(-12, 5,  -90),   // FRONTEND    — swoop left, React logo in view
    new Vector3(-8,  4.5,-140),  // deeper into frontend
    new Vector3(0,   4,  -190),  // corridor
    new Vector3(14,  4,  -260),  // BACKEND     — swoop right, arch ahead
    new Vector3(10,  3.5,-310),  // under the arch
    new Vector3(0,   3.5,-360),  // exit backend
    new Vector3(0,   3,  -400),  // REACTIVE    — straight through gear field
    new Vector3(0,   3,  -440),  // mid reactive
    new Vector3(-8,  5,  -490),  // DEVOPS      — elevated factory view
    new Vector3(-4,  3.5,-540),  // dock approach
    new Vector3(0,   3,  -580),  // CONTACT     — park inside command center
    new Vector3(0,   3.5,-590),  // final rest
  ],
  false,
  "catmullrom",
  0.5
);

/**
 * Camera look-at targets along the path (same t parameter as path)
 */
export const LOOKAT_PATH = new CatmullRomCurve3(
  [
    new Vector3(0,   2,    0),   // look at character
    new Vector3(0,   2,  -10),
    new Vector3(-5,  2,  -60),
    new Vector3(-15, 3,  -110),  // look at React logo
    new Vector3(-10, 2,  -160),
    new Vector3(0,   2,  -210),
    new Vector3(16,  3,  -280),  // look at Laravel arch
    new Vector3(12,  2,  -330),
    new Vector3(0,   2,  -380),
    new Vector3(0,   2,  -420),  // look through gears
    new Vector3(0,   2,  -460),
    new Vector3(-10, 2,  -510),  // look at docker whale
    new Vector3(0,   2,  -560),
    new Vector3(0,   3,  -600),  // look at command center
    new Vector3(0,   3,  -610),
  ],
  false,
  "catmullrom",
  0.5
);
