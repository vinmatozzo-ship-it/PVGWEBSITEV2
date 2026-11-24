import { useEffect, useMemo, type RefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, type Group } from 'three';
import { CLUSTERS, MOBILE_CENTERS } from './SceneConfiguration';
import type { GraphUniforms } from './graphShaders';
import type { HeroInteraction } from './useHeroInteraction';
import { BUSINESS_CLUSTERS } from './businessClusters';

export const LABELS = [...BUSINESS_CLUSTERS.map(cluster => cluster.name.toUpperCase()), 'FRIDAY OS'];
export type LabelBindings = {
  boxes: RefObject<(HTMLElement | null)[]>;
  lines: RefObject<(SVGLineElement | null)[]>;
};

/** Project real hub positions into a lightweight, camera-facing HTML annotation layer. */
export function SpatialLabels({ bindings, group, uniforms, interaction }: {
  bindings: LabelBindings; group: RefObject<Group>; uniforms: GraphUniforms; interaction: RefObject<HeroInteraction>;
}) {
  const gl = useThree(state => state.gl);
  useEffect(() => { interaction.current.canvas = gl.domElement; return () => { interaction.current.canvas = null; }; }, [gl, interaction]);
  const scratch = useMemo(() => ({ point: new Vector3(), boxes: Array.from({ length: 7 }, () => ({ x: 0, y: 0, w: 0, h: 0 })),
    history: Array.from({ length: 7 }, () => ({ x: 0, y: 0, valid: false })), viewportWidth: 0, viewportHeight: 0, contentBottom: 0,
    positions: [...CLUSTERS.map(c => c.center), [0, 0, 0]] }), []);
  useFrame(({ camera, size }) => {
    if (!group.current) return;
    const mobile = window.innerWidth <= 900;
    const crop = Math.max(0, (size.width - window.innerWidth) / 2);
    const left = mobile ? crop + 10 : size.width * 0.43;
    const right = mobile ? size.width - crop - 10 : size.width - 18;
    if (scratch.viewportWidth !== size.width || scratch.viewportHeight !== size.height) {
      scratch.viewportWidth = size.width;
      scratch.viewportHeight = size.height;
      const content = gl.domElement.closest('.friday-hero')?.querySelector('.friday-hero__content');
      scratch.contentBottom = content ? content.getBoundingClientRect().bottom - gl.domElement.getBoundingClientRect().top : 0;
      for (const previous of scratch.history) previous.valid = false;
    }
    const top = mobile ? 30 : 145;
    const bottom = mobile ? size.height - 190 : Math.max(420, Math.min(size.height, window.innerHeight) - 190);
    const t = uniforms.uTime.value;
    group.current.updateWorldMatrix(true, false); camera.updateMatrixWorld();
    // Core has first placement priority; the remaining labels reserve non-overlapping slots.
    for (let order = 0; order < 7; order++) {
      const i = order === 0 ? 6 : order - 1;
      const box = bindings.boxes.current[i], line = bindings.lines.current[i];
      if (!box || !line) continue;
      const original = scratch.positions[i];
      const m = uniforms.uMobile.value, target = i < 6 ? MOBILE_CENTERS[i] : original;
      const [x, y, z] = original.map((v, axis) => v + (target[axis] - v) * m);
      const c = i * 1.73, core = i === 6, breath = core ? Math.sin(t * 0.7) * 0.025 : 0;
      const width = mobile ? (core ? 120 : 110) : (core ? 144 : 127);
      const height = mobile ? (core ? 32 : 44) : (core ? 32 : 36);
      const motion = core ? 0.025 : 0.15;
      // CPU mirror of graphShaders.driftAt, only for these seven semantic anchors.
      scratch.point.set(x * (1 + breath) + Math.sin(t * 0.21 + c) * motion + 0.035 * Math.sin(y * 2 + t * 0.3),
        y * (1 + breath) + Math.cos(t * 0.17 + c) * motion + 0.035 * Math.sin(z + t * 0.24),
        z * (1 + breath) + Math.sin(t * 0.19 + c * 0.7) * motion + 0.035 * Math.cos(x + t * 0.2));
      scratch.point.applyMatrix4(group.current.matrixWorld).project(camera);
      const ax = (scratch.point.x * 0.5 + 0.5) * size.width;
      const ay = (-scratch.point.y * 0.5 + 0.5) * size.height;
      if (i < 6) { interaction.current.hubs[i * 2] = ax; interaction.current.hubs[i * 2 + 1] = ay; }
      let bestX = left, bestY = top, bestScore = Infinity;
      // Stable preferred directions plus a bounded screen-space collision search.
      const baseAngle = core ? -Math.PI / 2 : [-2.5, -1.9, -0.9, 0.1, 0.9, 2.4][i];
      for (let ring = 0; ring < (mobile ? 0 : 9); ring++) for (let k = 0; k < 12; k++) {
        const angle = baseAngle + k * Math.PI / 6;
        const radius = (core ? 55 : 36) + ring * 25;
        const px = Math.max(left, Math.min(right - width, ax + Math.cos(angle) * radius - width / 2));
        const py = Math.max(top, Math.min(bottom - height, ay + Math.sin(angle) * radius - height / 2));
        let overlap = false;
        for (let previous = 0; previous < order; previous++) {
          const b = scratch.boxes[previous];
          if (px < b.x + b.w + 9 && px + width + 9 > b.x && py < b.y + b.h + 9 && py + height + 9 > b.y) { overlap = true; break; }
        }
        if (overlap) continue;
        const previous = scratch.history[i];
        const stability = previous.valid ? Math.hypot(px - previous.x, py - previous.y) * 0.8 : 0;
        const score = Math.hypot(px + width / 2 - ax, py + height / 2 - ay) + k * 2.5 + stability;
        if (score < bestScore) { bestScore = score; bestX = px; bestY = py; }
      }
      // A short laptop can project a hub far beyond its reserved label area.
      // Search that bounded area before ever hiding an interactive category.
      if (!mobile && !Number.isFinite(bestScore)) {
        for (let py = top; py <= bottom - height; py += 12) for (let px = left; px <= right - width; px += 12) {
          let blocked = false;
          for (let previous = 0; previous < order; previous++) {
            const b = scratch.boxes[previous];
            if (px < b.x + b.w + 9 && px + width + 9 > b.x && py < b.y + b.h + 9 && py + height + 9 > b.y) { blocked = true; break; }
          }
          if (blocked) continue;
          const score = Math.hypot(px + width / 2 - ax, py + height / 2 - ay);
          if (score < bestScore) { bestScore = score; bestX = px; bestY = py; }
        }
      }
      // Stable touch lanes keep all six targets reachable throughout the orbit.
      // Their leader lines still track the actual animated hubs.
      if (mobile) {
        bestX = core ? (left + right - width) / 2 : i % 2 === 0 ? left : right - width;
        bestY = core ? size.height * 0.51 : size.height * [0.13, 0.13, 0.36, 0.36, 0.79, 0.79][i];
        bestScore = 0;
      }
      const placed = scratch.boxes[order];
      placed.x = bestX; placed.y = bestY; placed.w = width; placed.h = height;
      scratch.history[i].x = bestX; scratch.history[i].y = bestY; scratch.history[i].valid = true;
      const visible = Number.isFinite(bestScore) && scratch.point.z < 1;
      const entrance = Math.max(0, Math.min(1, (t - (core ? 1.1 : 2.05 + i * 0.16)) / 0.85));
      // Focus/selection immediately exposes its label, even during the opening.
      const opacity = interaction.current.cluster === i ? 1 : entrance * entrance * (3 - 2 * entrance);
      box.style.opacity = visible ? String(opacity) : '0'; line.style.opacity = visible ? String(opacity * (interaction.current.cluster === i ? 0.85 : 0.5)) : '0';
      box.style.visibility = visible ? 'visible' : 'hidden';
      box.style.transform = `translate3d(${bestX.toFixed(1)}px,${bestY.toFixed(1)}px,0)`;
      line.setAttribute('x1', ax.toFixed(1)); line.setAttribute('y1', ay.toFixed(1));
      line.setAttribute('x2', Math.max(bestX, Math.min(bestX + width, ax)).toFixed(1));
      line.setAttribute('y2', Math.max(bestY, Math.min(bestY + height, ay)).toFixed(1));
    }
  }, -1);
  return null;
}
