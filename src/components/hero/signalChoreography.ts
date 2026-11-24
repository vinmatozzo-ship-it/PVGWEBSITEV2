import type { GraphData } from './generateGraph';
import type { Quality } from './SceneConfiguration';

export type Signal = { from: number; to: number; start: number; duration: number; period: number; intensity: number; interactiveCluster?: number };
export type Arrival = [number, number, number];
export type Choreography = { signals: Signal[]; arrivals: Arrival[][]; coreSignals: Float32Array };

/** Sparse deterministic waves. Every leg is an existing edge; durations vary with distance. */
export function createChoreography(graph: GraphData, quality: Quality): Choreography {
  const signals: Signal[] = [];
  const arrivals: Arrival[][] = graph.nodes.map(() => []);
  const coreSignals = new Float32Array(24);
  // Disabled slots have zero intensity, never a phantom arrival.
  const gateways = Array.from({ length: 6 }, (_, cluster) => graph.edges.find(e =>
    graph.nodes[e.a].cluster === cluster && graph.nodes[e.b].cluster === 6 && e.strength > 0.8)!);
  const add = (from: number, to: number, start: number, period: number, intensity = 1) => {
    const a = graph.nodes[from].position, b = graph.nodes[to].position;
    const distance = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
    const duration = 0.8 + distance * 0.24;
    signals.push({ from, to, start, duration, period, intensity });
    arrivals[to].push([start + duration, period, intensity]);
    return start + duration;
  };
  const branchFrom = (node: number, previous: number, start: number, period: number) => {
    const edge = graph.edges.find(e => e.strength >= 0.8 && (e.a === node || e.b === node)
      && e.a !== previous && e.b !== previous
      && graph.nodes[e.a].cluster === graph.nodes[e.b].cluster);
    if (!edge) return;
    const next = edge.a === node ? edge.b : edge.a;
    const end = add(node, next, start + 0.18, period, 0.8);
    const onward = graph.edges.find(e => e.strength >= 0.8 && (e.a === next || e.b === next)
      && e.a !== node && e.b !== node && graph.nodes[e.a].cluster === graph.nodes[e.b].cluster);
    if (onward) add(next, onward.a === next ? onward.b : onward.a, end + 0.12, period, 0.65);
  };
  const count = quality === 'desktop' ? 6 : 3;
  for (let i = 0; i < count; i++) {
    const period = 23.7 + i * 0.73;
    const incoming = gateways[i];
    const arrival = add(incoming.a, incoming.b, 6.2 + i * 0.32, period, 1.25);
    coreSignals.set([arrival, period, 1, 0], i * 4);
    // The core responds through another real gateway, followed by a two-hop cascade.
    const outgoing = gateways[(i + 2) % 6];
    const departure = add(outgoing.b, outgoing.a, arrival + 0.3, period, 1.05);
    branchFrom(outgoing.a, outgoing.b, departure, period);
  }
  const cross = graph.edges.filter(e => e.strength >= 0.5 && graph.nodes[e.a].cluster !== graph.nodes[e.b].cluster
    && graph.nodes[e.a].cluster < 6 && graph.nodes[e.b].cluster < 6);
  cross.slice(0, count).forEach((edge, i) => {
    const period = 26.3 + i * 0.43;
    const end = add(edge.a, edge.b, 13.6 + i * 0.85, period, 1.1);
    branchFrom(edge.b, edge.a, end, period);
  });
  // One opening release along the six existing core gateways. A long period keeps
  // the entrance out of the recurring narrative; all six communities appear on mobile too.
  for (let i = 0; i < 6; i++) {
    const edge = gateways[i];
    const start = 1.25 + i * 0.12, duration = 0.95 + i * 0.06;
    signals.push({ from: edge.b, to: edge.a, start, duration, period: 1e9, intensity: 0.95 });
    arrivals[edge.a].push([start + duration, 1e9, 0.9]);
  }
  // A fixed GPU batch of three real incoming edges per cluster, enabled on interaction.
  for (let cluster = 0; cluster < 6; cluster++) {
    graph.edges.filter(edge => graph.nodes[edge.a].cluster === cluster && graph.nodes[edge.b].cluster === 6)
      .slice(0, 3).forEach((edge, i) => {
        const a = graph.nodes[edge.a].position, b = graph.nodes[edge.b].position;
        signals.push({ from: edge.a, to: edge.b, start: i * 0.28,
          duration: 0.8 + Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]) * 0.24,
          period: 5.7, intensity: 1.2, interactiveCluster: cluster });
      });
  }
  return { signals, arrivals, coreSignals };
}
