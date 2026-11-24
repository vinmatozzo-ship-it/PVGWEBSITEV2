import { Mesh, ShaderMaterial } from 'three';
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

/** Development-only frame cadence sampling; no overlay, production cost or global state. */
export function SceneDiagnostics({ active }: { active: boolean }) {
  const gl = useThree(state => state.gl);
  const samples = useRef(new Float32Array(180));
  const sorted = useRef(new Float32Array(180));
  const count = useRef(0);
  const warmup = useRef(0);
  const ticks = useRef(0);
  useEffect(() => { count.current = 0; warmup.current = 0; }, [active]);
  useEffect(() => () => { delete gl.domElement.dataset.sceneStats; }, [gl]);
  useFrame(({ scene }, delta) => {
    if (!active) return;
    if (delta > 0.5) { count.current = 0; return; }
    warmup.current += delta;
    if (++ticks.current % 12 === 0) gl.domElement.dataset.sceneTime = warmup.current.toFixed(2);
    if (warmup.current < 2) return;
    samples.current[count.current++] = delta * 1000;
    if (count.current === samples.current.length) {
      sorted.current.set(samples.current); sorted.current.sort();
      let total = 0;
      for (const ms of samples.current) total += ms;
      const shaderTimes: number[] = [];
      scene.traverse(object => {
        const material = (object as Mesh).material;
        if (material instanceof ShaderMaterial && material.uniforms.uTime) shaderTimes.push(+material.uniforms.uTime.value.toFixed(2));
      });
      gl.domElement.dataset.sceneStats = JSON.stringify({
        shaderTimes, sampleFrames: count.current, fps: +(1000 * count.current / total).toFixed(1),
        medianMs: +sorted.current[90].toFixed(2), p95Ms: +sorted.current[171].toFixed(2),
        drawCalls: gl.info.render.calls, points: gl.info.render.points,
        geometries: gl.info.memory.geometries, textures: gl.info.memory.textures,
        dpr: gl.getPixelRatio(), width: gl.domElement.width, height: gl.domElement.height,
      });
      count.current = 0;
    }
  });
  return null;
}
