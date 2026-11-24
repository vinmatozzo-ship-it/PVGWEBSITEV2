import { useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import type { PerspectiveCamera } from 'three';
import { SCENE } from './SceneConfiguration';
import type { HeroInteraction } from './useHeroInteraction';

export function CameraRig({ active, interaction }: { active: boolean; interaction: RefObject<HeroInteraction> }) {
  const time = useRef(0);
  const entrance = useRef(0);
  const inertia = useRef({ x: 0, y: 0, presence: 0 });
  useFrame(({ camera, size }, delta) => {
    if (!active) return;
    const dt = delta < 0.5 ? delta : 0;
    const state = interaction.current, motion = inertia.current;
    const damping = 1 - Math.exp(-dt * 2.8);
    motion.x += ((state.pointerInside ? state.pointerX : 0) - motion.x) * damping;
    motion.y += ((state.pointerInside ? state.pointerY : 0) - motion.y) * damping;
    motion.presence += ((state.pointerInside ? 1 : 0) - motion.presence) * damping;
    time.current += dt * (1 - motion.presence * 0.5);
    const t = time.current;
    entrance.current += dt;
    const progress = Math.min(entrance.current / 4.5, 1);
    const settle = 1 - progress * progress * progress * (progress * (progress * 6 - 15) + 10);
    const mobile = window.innerWidth <= 900;
    const orbit = Math.sin(t * 0.105 - 0.65) * 0.29 + Math.sin(t * 0.041 + 0.4) * 0.075 - settle * 0.065 + motion.x * 0.065;
    const distance = (mobile ? Math.max(12.8, 7.2 / (size.width / size.height)) : SCENE.camera.distance) + Math.sin(t * 0.13 + 0.6) * 0.8 + Math.sin(t * 0.037) * 0.35 + settle * 1.35;
    camera.position.set(Math.sin(orbit * (mobile ? 0.6 : 1)) * distance, 0.55 + Math.sin(t * 0.093) * 0.65 + settle * 0.35 - motion.y * 0.65,
      Math.cos(orbit * (mobile ? 0.6 : 1)) * distance);
    const perspective = camera as PerspectiveCamera;
    const fov = mobile ? 47 : SCENE.camera.fov;
    if (perspective.fov !== fov) { perspective.fov = fov; perspective.updateProjectionMatrix(); }
    camera.lookAt((mobile ? 0 : 0.7) + Math.sin(t * 0.07) * 0.15, Math.sin(t * 0.09) * 0.2, 0);
  }, -3);
  return null;
}
