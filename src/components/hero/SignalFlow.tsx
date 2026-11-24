import { useMemo } from 'react';
import { AdditiveBlending } from 'three';
import type { GraphData } from './generateGraph';
import type { Choreography } from './signalChoreography';
import { signalVertex, signalFragment, type GraphUniforms } from './graphShaders';

export function SignalFlow({ graph, choreography, uniforms }: {
  graph: GraphData; choreography: Choreography; uniforms: GraphUniforms;
}) {
  const attributes = useMemo(() => {
    const from: number[] = [], to: number[] = [], clusters: number[] = [], schedules: number[] = [], tails: number[] = [], interactive: number[] = [];
    choreography.signals.forEach(signal => {
      for (let tail = 0; tail < 12; tail++) {
        from.push(...graph.nodes[signal.from].position); to.push(...graph.nodes[signal.to].position);
        clusters.push(graph.nodes[signal.from].cluster, graph.nodes[signal.to].cluster);
        schedules.push(signal.start, signal.duration, signal.period, signal.intensity);
        tails.push(tail / 11);
        interactive.push(signal.interactiveCluster ?? -1);
      }
    });
    return { from: new Float32Array(from), to: new Float32Array(to), clusters: new Float32Array(clusters),
      schedules: new Float32Array(schedules), tails: new Float32Array(tails), interactive: new Float32Array(interactive) };
  }, [graph, choreography]);
  return <points frustumCulled={false} renderOrder={2}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[attributes.from, 3]} />
      <bufferAttribute attach="attributes-aDestination" args={[attributes.to, 3]} />
      <bufferAttribute attach="attributes-aClusters" args={[attributes.clusters, 2]} />
      <bufferAttribute attach="attributes-aSchedule" args={[attributes.schedules, 4]} />
      <bufferAttribute attach="attributes-aTail" args={[attributes.tails, 1]} />
      <bufferAttribute attach="attributes-aInteractive" args={[attributes.interactive, 1]} />
    </bufferGeometry>
    <shaderMaterial uniforms={uniforms} onUpdate={material => { material.uniforms = uniforms; }} vertexShader={signalVertex} fragmentShader={signalFragment}
      transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
  </points>;
}
