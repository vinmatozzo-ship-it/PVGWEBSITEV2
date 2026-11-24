/** All artistic/performance controls are local to the homepage scene. */
export const SCENE = {
  seed: 73129,
  colors: {
    background: '#03060C', navy: '#071322', blue: '#009DD6',
    cyan: '#55D9FF', ice: '#E7F5FF',
  },
  clusterColors: ['#009DD6', '#6878FF', '#22D6C5', '#55D9FF', '#2399FF', '#596BCB'],
  desktop: { clusterNodes: 420, coreNodes: 320, dustNodes: 120, maxDpr: 1.5 },
  compact: { clusterNodes: 160, coreNodes: 160, dustNodes: 60, maxDpr: 1.25 },
  camera: { fov: 43, near: 0.1, far: 70, distance: 16.8 },
  neighbors: 2,
  connectionRadius: 1.05,
  // World-space sprite diameters: ambient, network node, information hub.
  particleSizes: [0.065, 0.3, 1.05, 0, 1.1],
} as const;

export type Quality = 'desktop' | 'compact';
export type Vec3 = [number, number, number];

// Deliberately asymmetric: stretched lobes at different depths, not a globe.
export const CLUSTERS: { center: Vec3; spread: Vec3; angle: number }[] = [
  { center: [-3.6, 0.35, 1.4], spread: [1.25, 0.65, 0.8], angle: -0.25 },
  { center: [-1.8, 2.35, -2.5], spread: [1.0, 0.7, 0.9], angle: 0.65 },
  { center: [2.5, 2.2, -0.9], spread: [1.2, 0.65, 0.7], angle: -0.3 },
  { center: [4.35, -0.15, -1.2], spread: [1.1, 0.85, 0.8], angle: 0.3 },
  { center: [1.6, -2.3, 2.5], spread: [1.3, 0.55, 0.65], angle: 0.35 },
  { center: [-2.8, -1.8, -2.2], spread: [1.05, 0.75, 0.9], angle: -0.65 },
];

// Dedicated portrait composition; connectivity and seeded branch geometry stay intact.
export const MOBILE_CENTERS: Vec3[] = [
  [-1.45, 2.6, 0.9], [1.1, 3, -1.7], [-1.65, 0.25, -0.7],
  [1.6, 0.55, 0.4], [-1, -2.7, 1.8], [1.4, -2.6, -1.4],
];
