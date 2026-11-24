import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { createQualityController, sampleQualityFrame } from './qualityController';
import type { Quality } from './SceneConfiguration';

/** Resolution adapts, never topology. Long windows and asymmetric recovery avoid oscillation. */
export function AdaptiveQuality({ active, quality }: { active: boolean; quality: Quality }) {
  const setDpr = useThree(s => s.setDpr);
  const gl = useThree(s => s.gl);
  const state = useRef(createQualityController());
  useEffect(() => {
    const s = state.current;
    s.sum = 0; s.count = 0; s.elapsed = 0; s.cooldown = 5; s.slow = 0; s.fast = 0;
    const cap = Math.min(window.devicePixelRatio || 1, quality === 'compact' ? 1.25 : 1.5);
    s.target = s.target > 0 ? Math.min(s.target, cap) : cap;
  }, [active, gl, quality]);
  useFrame((_, delta) => {
    if (!active || delta > 0.25) return;
    const s = state.current;
    const cap = Math.min(window.devicePixelRatio || 1, quality === 'compact' ? 1.25 : 1.5);
    if (sampleQualityFrame(s, delta, cap)) {
      gl.domElement.dataset.adaptiveQuality = JSON.stringify({ meanMs: +s.meanMs.toFixed(2), dpr: gl.getPixelRatio(), target: s.target, topology: quality });
    }
    if (s.step >= 1 && Math.abs(gl.getPixelRatio() - s.target) > 0.01) {
      setDpr(gl.getPixelRatio() + Math.sign(s.target - gl.getPixelRatio()) * Math.min(0.05, Math.abs(s.target - gl.getPixelRatio())));
      s.step = 0;
    }
  });
  return null;
}
