import { useMemo, useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Color, type Group } from 'three';
import { generateGraph } from './generateGraph';
import { ParticleSystem } from './ParticleSystem';
import { SCENE, type Quality } from './SceneConfiguration';
import { filamentVertex, filamentFragment, type GraphUniforms } from './graphShaders';
import { createChoreography } from './signalChoreography';
import { SignalFlow } from './SignalFlow';
import { SpatialLabels, type LabelBindings } from './SpatialLabels';
import { CoreAtmosphere } from './CoreAtmosphere';
import type { HeroInteraction } from './useHeroInteraction';

export function KnowledgeGraph({ quality, active, labels, interaction }: { quality: Quality; active: boolean; labels: LabelBindings; interaction: RefObject<HeroInteraction> }) {
  const group = useRef<Group>(null);
  const graph = useMemo(() => generateGraph(quality), [quality]);
  const choreography = useMemo(() => createChoreography(graph, quality), [graph, quality]);
  const responseRoutes = useMemo(() => Array.from({length:6}, (_, i) => choreography.signals.filter(s => s.interactiveCluster === i)), [choreography]);
  const revision = useMemo(() => ({ current: -1 }), [choreography]);
  const timeline = useRef(0);
  const uniforms = useMemo<GraphUniforms>(() => ({ uMobile: { value: window.innerWidth <= 900 ? 1 : 0 }, uTime: { value: timeline.current }, uProjectionScale: { value: 1000 },
    uCoreSignals: { value: choreography.coreSignals }, uClusterWeights: { value: new Float32Array(6) },
    uInteractionStarts: { value: new Float32Array(6).fill(-1000) }, uFocusEnergy: { value: 0 }, uCoreResponse: { value: 0 } }), [choreography]);
  const lines = useMemo(() => {
    const positions: number[] = [], colors: number[] = [], clusters: number[] = [], strengths: number[] = [], others: number[] = [];
    const cyan = new Color(SCENE.colors.cyan), ice = new Color(SCENE.colors.ice);
    const palette = SCENE.clusterColors.map(color => new Color(color));
    graph.edges.forEach(({ a, b, strength }) => {
      [a, b].forEach((id, end) => {
        const node = graph.nodes[id];
        const base = node.cluster < 6 ? palette[node.cluster] : cyan;
        const color = base.clone().lerp(strength > 0.7 ? ice : cyan, end === 0 ? 0.12 : 0.38);
        positions.push(...node.position); colors.push(color.r, color.g, color.b);
        clusters.push(node.cluster); strengths.push(strength * (strength > 0.5 ? 1.35 : 0.85) * (end === 0 ? 0.65 : 1));
        others.push(graph.nodes[end === 0 ? b : a].cluster);
      });
    });
    return { positions: new Float32Array(positions), colors: new Float32Array(colors),
      clusters: new Float32Array(clusters), strengths: new Float32Array(strengths), others: new Float32Array(others) };
  }, [graph]);
  useFrame(({ size, gl, camera }, delta) => {
    uniforms.uProjectionScale.value = size.height * gl.getPixelRatio() / (2 * Math.tan((camera as import('three').PerspectiveCamera).fov * Math.PI / 360));
    if (!active || !group.current) return;
    timeline.current += delta < 0.5 ? delta : 0;
    uniforms.uTime.value = timeline.current;
    const t = uniforms.uTime.value;
    uniforms.uMobile.value += ((window.innerWidth <= 900 ? 1 : 0) - uniforms.uMobile.value) * (1 - Math.exp(-Math.min(delta, 0.1) * 5));
    group.current.position.x = 3.8 * (1 - uniforms.uMobile.value);
    group.current.scale.setScalar(1.12 - uniforms.uMobile.value * 0.07);
    const selected = interaction.current.cluster;
    if (revision.current !== interaction.current.revision) {
      revision.current = interaction.current.revision;
      if (selected >= 0) uniforms.uInteractionStarts.value[selected] = t;
    }
    const blend = 1 - Math.exp(-Math.min(delta, 0.1) * 3.5);
    for (let i = 0; i < 6; i++) uniforms.uClusterWeights.value[i] += ((selected === i ? 1 : 0) - uniforms.uClusterWeights.value[i]) * blend;
    uniforms.uFocusEnergy.value += ((selected >= 0 ? 1 : 0) - uniforms.uFocusEnergy.value) * blend;
    let response = 0;
    // Accumulation begins just before an incoming wave reaches the core; release
    // follows the same arrival schedule used by the GPU particle shader.
    for (let i = 0; i < choreography.coreSignals.length; i += 4) {
      const arrival = choreography.coreSignals[i], period = choreography.coreSignals[i + 1];
      if (period <= 0 || t < arrival - 0.55) continue;
      const age = ((t - arrival + 0.55) % period) - 0.55;
      const energy = age < 0 ? (1 + age / 0.55) * 0.25 : Math.exp(-age * 2.4) * 0.45;
      response += energy * (1 - uniforms.uFocusEnergy.value * 0.8);
    }
    if (selected >= 0) for (const route of responseRoutes[selected]) {
      const elapsed = t - uniforms.uInteractionStarts.value[selected] - route.start - route.duration;
      if (elapsed >= 0) { const age = elapsed % route.period; response += Math.min(age / 0.12, 1) * Math.exp(-age * 2.4); }
    }
    uniforms.uCoreResponse.value += (Math.min(response, 1.5) - uniforms.uCoreResponse.value) * blend;
    group.current.rotation.y = Math.sin(t * 0.055) * 0.08;
    group.current.rotation.x = Math.sin(t * 0.08) * 0.045;
  }, -2);
  return <group ref={group} position={[window.innerWidth <= 900 ? 0 : 3.8, 0, 0]} scale={1.12}>
    <CoreAtmosphere uniforms={uniforms} />
    <SpatialLabels bindings={labels} group={group} uniforms={uniforms} interaction={interaction} />
    <ParticleSystem graph={graph} uniforms={uniforms} choreography={choreography} />
    <SignalFlow graph={graph} choreography={choreography} uniforms={uniforms} />
    <lineSegments frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[lines.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[lines.colors, 3]} />
        <bufferAttribute attach="attributes-aCluster" args={[lines.clusters, 1]} />
        <bufferAttribute attach="attributes-aStrength" args={[lines.strengths, 1]} />
        <bufferAttribute attach="attributes-aOtherCluster" args={[lines.others, 1]} />
      </bufferGeometry>
      {/* R3F copies uniform containers: explicitly share the animated clock and envelopes. */}
      <shaderMaterial uniforms={uniforms} onUpdate={material => { material.uniforms = uniforms; }} vertexShader={filamentVertex} fragmentShader={filamentFragment}
        transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
    </lineSegments>
  </group>;
}
