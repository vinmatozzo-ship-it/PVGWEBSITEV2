import { useEffect, useLayoutEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { KnowledgeGraph } from './KnowledgeGraph';
import { SCENE, type Quality } from './SceneConfiguration';
import { AdaptiveQuality } from './AdaptiveQuality';
import { SceneDiagnostics } from './SceneDiagnostics';
import { LABELS } from './SpatialLabels';
import type { ClusterControls } from './useHeroInteraction';
import { BUSINESS_CLUSTERS } from './businessClusters';

type SceneStatus = 'ready' | 'lost' | 'restoring';

function ContextGuard({ onStatus }: { onStatus: (status: SceneStatus) => void }) {
  const gl = useThree(state => state.gl);
  const scene = useThree(state => state.scene);
  const entrance = useRef(0);
  const revealed = useRef(false);
  useFrame((_, delta) => {
    if (!revealed.current) entrance.current += delta < 0.5 ? delta : 0;
  });
  useLayoutEffect(() => {
    const canvas = gl.domElement;
    const previousAfterRender = scene.onAfterRender;
    // onAfterRender runs after the renderer has submitted the actual graph draw calls.
    // At 0.6s the existing reveal envelopes contain visible nodes, while core/lines/
    // labels still have their original cinematic entrance ahead of them.
    const afterRender: typeof scene.onAfterRender = (...args) => {
      previousAfterRender.apply(scene, args);
      if (!revealed.current && entrance.current >= 0.6 && gl.info.render.points > 0 && !gl.getContext().isContextLost()) {
        revealed.current = true;
        onStatus('ready');
      }
    };
    scene.onAfterRender = afterRender;
    const onLost = (event: Event) => {
      event.preventDefault();
      revealed.current = false;
      onStatus('lost');
    };
    // Resume the loop, but retain fallback until a restored frame has actually drawn.
    const onRestored = () => onStatus('restoring');
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);
    return () => {
      if (scene.onAfterRender === afterRender) scene.onAfterRender = previousAfterRender;
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
    };
  }, [gl, scene, onStatus]);
  return null;
}
function InitializationProbe({ fail }: { fail: boolean }) {
  if (fail) throw new Error('Intentional hero initialization resilience test');
  return null;
}

export default function HeroScene({ ready, active, quality, onStatus, controls, fail = false }: {
  ready: boolean; active: boolean; quality: Quality; onStatus: (status: SceneStatus) => void; fail?: boolean; controls: ClusterControls;
}) {
  const boxes = useRef<(HTMLElement | null)[]>([]);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  useEffect(() => {
    if (active) for (let i = 0; i < 6; i++) controls.triggers.current[i] = boxes.current[i] as HTMLButtonElement | null;
  }, [active, controls.triggers]);
  return <div className="friday-scene-root" inert={!ready}><Canvas
    aria-hidden="true"
    camera={{ position: [0, 0.55, SCENE.camera.distance], fov: SCENE.camera.fov, near: SCENE.camera.near, far: SCENE.camera.far }}
    dpr={[1, SCENE[quality].maxDpr]}
    frameloop={active ? 'always' : 'never'}
    gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
    fallback={null}
    events={() => ({ enabled: false, priority: 0 })}
    style={{ pointerEvents: 'none' }}
  >
    <fogExp2 attach="fog" args={[SCENE.colors.background, 0.026]} />
    <ContextGuard onStatus={onStatus} />
    {(import.meta as ImportMeta & { env: { DEV: boolean } }).env.DEV && <InitializationProbe fail={fail} />}
    <AdaptiveQuality active={active} quality={quality} />
    <CameraRig active={active} interaction={controls.interaction} />
    <KnowledgeGraph quality={quality} active={active} labels={{ boxes, lines }} interaction={controls.interaction} />
    {(import.meta as ImportMeta & { env: { DEV: boolean } }).env.DEV && <SceneDiagnostics active={active} />}
  </Canvas>
    <div className="friday-spatial-labels" role="group" aria-label="Business clusters">
      <svg className="friday-label-connectors" aria-hidden="true">{LABELS.map((label, i) => <line key={label} ref={el => { lines.current[i] = el; }} />)}</svg>
      {BUSINESS_CLUSTERS.map((cluster, i) => <button type="button" key={cluster.name} data-cluster={i}
        ref={el => { boxes.current[i] = el; controls.triggers.current[i] = el; }}
        className="friday-spatial-label" data-active={controls.activeCluster === i}
        aria-expanded={controls.activeCluster === i} aria-controls="friday-cluster-panel"
        aria-describedby={`friday-cluster-description-${i}`}
        onPointerEnter={event => { if (event.pointerType !== 'touch') controls.hover(i); }}
        onPointerLeave={event => { if (event.pointerType !== 'touch') controls.hover(-1); }}
        onFocus={event => controls.focus(i, event)} onBlur={controls.blur}
        onClick={event => controls.click(i, event)}><span aria-hidden="true" />{cluster.name}</button>)}
      <div ref={el => { boxes.current[6] = el; }} className="friday-spatial-label friday-spatial-label--core"><span />FRIDAY OS</div>
    </div>
  </div>;
}
