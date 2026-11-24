import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Quality } from './SceneConfiguration';
import './home-hero.css';
import { useHeroInteraction } from './useHeroInteraction';
import { StaticGraph } from './StaticGraph';
import { ClusterPanel, ClusterFallback } from './ClusterPanel';

const HeroScene = lazy(() => import('./HeroScene'));

class SceneBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function HomeHero({ onContact, obscured = false }: { onContact: () => void; obscured?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const controls = useHeroInteraction(root);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'lost' | 'restoring'>('loading');
  const [attempt, setAttempt] = useState(0);
  const [test, setTest] = useState<'none' | 'unsupported' | 'initialization' | 'reduced-motion'>('none');
  const contextExtension = useRef<WEBGL_lose_context | null>(null);
  const qa = (import.meta as ImportMeta & { env: { DEV: boolean } }).env.DEV && new URLSearchParams(window.location.search).has('hero-qa');
  // Unknown preferences are loading, not a request for the static fallback.
  const reducedMotion = enabled === false || test === 'reduced-motion';
  const motionAllowed = enabled === true && !reducedMotion;
  const fallback = reducedMotion || failed || test === 'unsupported' || status === 'lost' || status === 'restoring';
  const sceneStatus = reducedMotion ? 'reduced-motion' : failed ? 'failed' : test === 'unsupported' ? 'unsupported' : status;
  const retry = () => { setFailed(false); setStatus('loading'); setTest('none'); setAttempt(n => n + 1); };

  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [quality, setQuality] = useState<Quality>('compact');
  const onUnavailable = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Hardware hints choose a stable initial topology. Resize and cadence never rebuild it.
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    setQuality(navigator.hardwareConcurrency <= 4 || (memory !== undefined && memory <= 4) ? 'compact' : 'desktop');
    const update = () => {
      if (!reduced.matches) {
        try {
          const probe = document.createElement('canvas').getContext('webgl2');
          if (!probe) setFailed(true);
          else probe.getExtension('WEBGL_lose_context')?.loseContext();
        } catch { setFailed(true); }
      }
      setStatus('loading');
      setEnabled(!reduced.matches);
    };
    const visibility = () => setVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    if (root.current) observer.observe(root.current);
    update(); visibility();
    reduced.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);


  return <main ref={root} data-scene-status={sceneStatus} data-render-active={motionAllowed && !failed && test !== 'unsupported' && inView && visible && !obscured && status === 'ready'} className="friday-hero" aria-labelledby="friday-hero-title"
    onPointerDown={controls.pointerDown} onPointerUp={controls.pointerUp} onPointerCancel={controls.pointerCancel}
    onPointerMove={controls.pointerMove} onPointerLeave={controls.pointerLeave}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) controls.leaveFocus(); }}
    onKeyDown={event => { if (event.key === 'Escape' && controls.activeCluster >= 0) { event.stopPropagation(); controls.dismiss(true); } }}>
    {/* This static atmosphere also remains when WebGL is unavailable or motion is reduced. */}
    <div className="friday-hero__atmosphere" aria-hidden="true" />
    <div className="friday-hero__content">
      <p className="friday-hero__eyebrow"><strong>PARADIGM</strong><span aria-hidden="true"> — </span><span>Business Interoperability as a Service</span></p>
      <h1 id="friday-hero-title"><span>Friday OS: your</span>{' '}<span>operating model,</span>{' '}<span className="friday-hero__accent">connected</span></h1>
      <p className="friday-hero__description">Operating model first, then automate</p>
      <ul className="friday-hero__values">
        <li>90-day proof sprints</li>
        <li>No IT project required</li>
        <li>Private, customizable and packaged for your organization</li>
      </ul>
      <button className="friday-hero__contact" onClick={onContact}><span>Contact Us</span><span className="friday-hero__arrow"><ArrowRight size={18} aria-hidden="true" /></span></button>
    </div>
    <div className="friday-hero__scene" role="group" aria-label="Explore the Friday OS knowledge graph">
      {fallback && <><StaticGraph /><ClusterFallback controls={controls} /></>}
      {motionAllowed && !failed && test !== 'unsupported' && <SceneBoundary key={attempt} onUnavailable={onUnavailable}><Suspense fallback={null}>
        <HeroScene ready={status === 'ready'} active={inView && visible && !obscured && status !== 'lost'} quality={quality} onStatus={setStatus} controls={controls} fail={test === 'initialization'} />
      </Suspense></SceneBoundary>}
    </div>
    <div className="friday-hero__shade" aria-hidden="true" />
    <ClusterPanel controls={controls} />
    {failed && <button type="button" className="friday-scene-retry" onClick={retry}>Retry visualization</button>}
    {qa && <div className="friday-qa" aria-label="Hero resilience tests">
      <output>{sceneStatus}</output>
      <button onClick={() => { const canvas = controls.interaction.current.canvas; const gl = canvas?.getContext('webgl2'); contextExtension.current = gl?.getExtension('WEBGL_lose_context') || null; contextExtension.current?.loseContext(); }}>Lose context</button>
      <button onClick={() => contextExtension.current?.restoreContext()}>Restore context</button>
      <button onClick={() => setTest('unsupported')}>Unsupported WebGL</button>
      <button onClick={() => { setFailed(false); setTest('initialization'); setAttempt(n => n + 1); }}>Fail initialization</button>
      <button onClick={() => setTest('reduced-motion')}>Reduced motion preview</button>
      <button onClick={retry}>Reset scene</button>
    </div>}
    <div className="friday-hero__edge" aria-hidden="true"><span />Connected by intelligence.</div>
  </main>;
}
