import { useMemo } from 'react';
import { AdditiveBlending, Color } from 'three';
import type { GraphData } from './generateGraph';
import { SCENE } from './SceneConfiguration';
import { particleVertex, particleFragment, type GraphUniforms } from './graphShaders';
import type { Choreography } from './signalChoreography';

export function ParticleSystem({ graph, uniforms, choreography }: { graph: GraphData; uniforms: GraphUniforms; choreography: Choreography }) {
  const attributes = useMemo(() => {
    const positions: number[] = [], colors: number[] = [], sizes: number[] = [];
    const brightness: number[] = [], clusters: number[] = [], kinds: number[] = [];
    const arrivals = Array.from({ length: 4 }, () => [] as number[]);
    const cyan = new Color(SCENE.colors.cyan), ice = new Color(SCENE.colors.ice);
    const palette = SCENE.clusterColors.map(color => new Color(color));
    graph.nodes.forEach((node, index) => {
      const core = node.cluster === 6;
      const base = node.cluster >= 0 && node.cluster < 6 ? palette[node.cluster] : cyan;
      const color = base.clone().lerp(ice, core ? 0.4 : node.size === 2 ? 0.3 : 0.04 + node.brightness * 0.08);
      positions.push(...node.position); colors.push(color.r, color.g, color.b);
      sizes.push(SCENE.particleSizes[node.size] * (0.65 + node.brightness * 0.55) * (core ? 0.90 : 1));
      brightness.push(node.brightness * (core ? 1.06 : node.size === 2 ? 1.8 : 1.35));
      clusters.push(node.cluster); kinds.push(node.size);
      arrivals.forEach((track, slot) => track.push(...(choreography.arrivals[index][slot] ?? [0, 1, 0])));
    });
    // Three soft, overlapping elliptical light volumes, behind the open core filaments.
    for (const [x, y, z, size, intensity] of [[0, 0, 0, 4.2, 0.8], [-0.35, 0.1, -0.2, 2.3, 0.9], [0.45, -0.12, 0.25, 1.6, 0.8]]) {
      positions.push(x, y, z); colors.push(0.015, 0.38, 0.9);
      sizes.push(size); brightness.push(intensity); clusters.push(6); kinds.push(3);
      arrivals.forEach(track => track.push(0, 1, 0));
    }
    return { positions: new Float32Array(positions), colors: new Float32Array(colors),
      sizes: new Float32Array(sizes), brightness: new Float32Array(brightness),
      clusters: new Float32Array(clusters), kinds: new Float32Array(kinds), arrivals: arrivals.map(a => new Float32Array(a)) };
  }, [graph, choreography]);
  return <points frustumCulled={false}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[attributes.positions, 3]} />
      <bufferAttribute attach="attributes-aColor" args={[attributes.colors, 3]} />
      <bufferAttribute attach="attributes-aSize" args={[attributes.sizes, 1]} />
      <bufferAttribute attach="attributes-aBrightness" args={[attributes.brightness, 1]} />
      <bufferAttribute attach="attributes-aCluster" args={[attributes.clusters, 1]} />
      <bufferAttribute attach="attributes-aKind" args={[attributes.kinds, 1]} />
      {attributes.arrivals.map((track, i) => <bufferAttribute key={i} attach={`attributes-aArrival${i}`} args={[track, 3]} />)}
    </bufferGeometry>
    <shaderMaterial uniforms={uniforms} onUpdate={material => { material.uniforms = uniforms; }} vertexShader={particleVertex} fragmentShader={particleFragment}
      transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
  </points>;
}
