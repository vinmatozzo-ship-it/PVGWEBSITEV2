import { CLUSTERS, SCENE, type Quality, type Vec3 } from './SceneConfiguration';

export type GraphNode = { position: Vec3; cluster: number; size: number; brightness: number };
export type GraphEdge = { a: number; b: number; strength: number };
export type GraphData = { nodes: GraphNode[]; edges: GraphEdge[] };

function seededRandom(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const distanceSquared = (a: Vec3, b: Vec3) =>
  (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;

/** Seeded branching communities, with a sparse backbone and local neighborhoods. */
export function generateGraph(quality: Quality): GraphData {
  const random = seededRandom(SCENE.seed);
  const normal = () => Math.max(-2.5, Math.min(2.5,
    Math.sqrt(-2 * Math.log(Math.max(random(), 1e-8))) * Math.cos(2 * Math.PI * random())));
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const seen = new Map<string, GraphEdge>();
  const groups: number[][] = [];
  const hubs: number[][] = [];
  const budget = SCENE[quality];
  const add = (position: Vec3, cluster: number, size = random() < 0.25 ? 0 : 1) => {
    nodes.push({ position, cluster, size, brightness: 0.5 + random() * 0.8 });
    return nodes.length - 1;
  };
  const connect = (a: number, b: number, strength: number) => {
    if (a === b) return;
    const key = `${Math.min(a, b)}:${Math.max(a, b)}`;
    const existing = seen.get(key);
    if (existing) existing.strength = Math.max(existing.strength, strength);
    else { const edge = { a, b, strength }; seen.set(key, edge); edges.push(edge); }
  };

  CLUSTERS.forEach(({ center, spread, angle }, cluster) => {
    const root = add([...center], cluster, 2);
    const ids = [root];
    const anchors = [root];
    const segments: [number, number][] = [];
    // Three unequal branches with bent spines, in different depth planes.
    for (let branch = 0; branch < 3; branch++) {
      let previous = root;
      const direction = angle + [-0.35, 1.65, 3.4][branch] + random() * 0.55;
      const length = (0.65 + random() * 0.6) * spread[0];
      for (let step = 1; step <= 3; step++) {
        const turn = direction + Math.sin(step * 1.3 + cluster) * 0.3;
        const id = add([
          center[0] + Math.cos(turn) * step * length * 0.64,
          center[1] + Math.sin(turn) * step * length * 0.48,
          center[2] + Math.sin(step * 0.95 + branch) * spread[2] + (branch - 1) * 0.5,
        ], cluster, step === 2 || branch === 0 ? 2 : 1);
        ids.push(id); anchors.push(id); segments.push([previous, id]);
        connect(previous, id, 0.85); previous = id;
      }
    }
    for (let i = ids.length; i < budget.clusterNodes; i++) {
      const [a, b] = segments[Math.floor(random() * segments.length)];
      // Mix concentrated neighborhoods and thin tributaries along each branch.
      const t = random() < 0.6 ? 1 + normal() * 0.13 : random();
      const width = (i % 3 === 0 ? 0.62 : i % 5 === 0 ? 0.36 : 0.21) * (0.65 + random());
      const p = nodes[a].position.map((v, axis) =>
        v + (nodes[b].position[axis] - v) * t + normal() * width,
      ) as Vec3;
      const id = add(p, cluster);
      // Distinct bright secondary junctions within the populated volumes.
      if (i % 23 === 0) { nodes[id].size = 2; nodes[id].brightness *= 1.25; }
      ids.push(id);
      if (i % 9 === 0) connect(id, b, 0.28 + random() * 0.18);
    }
    groups.push(ids); hubs.push(anchors);
  });

  const core: number[] = [];
  // Three interleaved, tapered filaments form an open luminous nucleus, not a sphere.
  for (let i = 0; i < budget.coreNodes; i++) {
    const layer = i % 3;
    const t = (random() - 0.5) * 3;
    const width = layer === 0 ? 0.035 : layer === 1 ? 0.07 : 0.14;
    const id = add([
      t * (0.62 + layer * 0.1),
      Math.sin(t * 2.8 + layer * 2.1) * (0.24 + t * 0.07) + normal() * width,
      Math.cos(t * 2.8 + layer * 2.1) * 0.36 + normal() * width,
    ], 6, i % 35 === 0 ? 2 : 1);
    nodes[id].brightness *= layer === 0 ? 1.25 : 0.85;
    core.push(id);
  }
  groups.push(core);

  // Spatial hash bounds neighbor searches. Local edges are secondary to the backbone.
  const radius = SCENE.connectionRadius * (quality === 'compact' ? 1.2 : 1);
  groups.forEach((ids) => {
    const cells = new Map<string, number[]>();
    const cell = (p: Vec3) => p.map((v) => Math.floor(v / radius));
    ids.forEach((id) => {
      const key = cell(nodes[id].position).join(',');
      const bucket = cells.get(key) ?? []; bucket.push(id); cells.set(key, bucket);
    });
    ids.forEach((id) => {
      const [x, y, z] = cell(nodes[id].position);
      const candidates: { id: number; d: number }[] = [];
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
        for (const candidate of cells.get(`${x + dx},${y + dy},${z + dz}`) ?? []) {
          const d = distanceSquared(nodes[id].position, nodes[candidate].position);
          if (candidate !== id && d < radius * radius) candidates.push({ id: candidate, d });
        }
      }
      candidates.sort((a, b) => a.d - b.d || a.id - b.id);
      candidates.slice(0, SCENE.neighbors).forEach((n) => connect(id, n.id, 0.14 + random() * 0.17));
    });
  });

  // Each community has several gateways into different layers of the core.
  hubs.forEach((anchors, cluster) => {
    [0, 2, 5, 8].forEach((index, i) => {
      connect(anchors[index], core[(cluster * 41 + i * 23) % core.length], i === 0 ? 0.9 : 0.42);
    });
  });
  // Selected non-neighbor communities share long-range backbone routes.
  for (const [a, b] of [[0, 2], [0, 4], [1, 3], [1, 5], [2, 4], [3, 5], [0, 3], [2, 5]]) {
    connect(hubs[a][2], hubs[b][5], 0.68);
    connect(hubs[a][0], hubs[b][8], 0.34);
  }

  for (let i = 0; i < budget.dustNodes; i++) {
    const foreground = i < (quality === 'desktop' ? 9 : 4);
    const position: Vec3 = foreground
      ? [-3.5 + random() * 12, (random() - 0.5) * 10, 6 + random() * 3]
      : [(random() - 0.5) * 19, (random() - 0.5) * 11, -3 - random() * 7];
    const id = add(position, -1, foreground ? 4 : 0);
    nodes[id].brightness *= foreground ? 0.5 : 0.17;
  }
  return { nodes, edges };
}
