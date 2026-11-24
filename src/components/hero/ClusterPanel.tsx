import { useLayoutEffect, useRef } from 'react';
import { BUSINESS_CLUSTERS } from './businessClusters';
import type { ClusterControls } from './useHeroInteraction';

export function ClusterPanel({ controls }: { controls: ClusterControls }) {
  const panel = useRef<HTMLElement>(null);
  const open = controls.activeCluster >= 0;
  const lastCluster = useRef(0);
  if (open) lastCluster.current = controls.activeCluster;
  const current = BUSINESS_CLUSTERS[lastCluster.current];
  useLayoutEffect(() => {
    if (!open) return;
    // Inline mobile disclosure cannot obscure the CTA, navigation or touch lanes.
    // Reveal the card on selection without moving keyboard focus away from its trigger.
    if (window.innerWidth <= 900 && controls.inputMode.current !== 'mouse') panel.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, [open, current.name, controls.inputMode]);
  return <>
    <section ref={panel} id="friday-cluster-panel" className="friday-cluster-panel" data-cluster-panel data-open={open}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) controls.leaveFocus(); }}
      aria-labelledby="friday-cluster-panel-title" aria-hidden={!open} inert={!open}>
      <div className="friday-cluster-panel__copy" key={current.name}>
      <span className="friday-cluster-panel__eyebrow">Concept</span>
      <h2 id="friday-cluster-panel-title">{current.name}</h2>
      {BUSINESS_CLUSTERS.map((cluster, i) => <p key={cluster.name} id={`friday-cluster-description-${i}`}
        hidden={lastCluster.current !== i}>{cluster.description}</p>)}
      </div>
      <button type="button" className="friday-cluster-panel__close" aria-label="Close cluster information"
        onClick={() => controls.dismiss(true)}>×</button>
    </section>
  </>;
}

export function ClusterFallback({ controls }: { controls: ClusterControls }) {
  return <div className="friday-cluster-fallback" role="group" aria-label="Explore business clusters">
      {BUSINESS_CLUSTERS.map((cluster, i) => <button key={cluster.name} type="button" data-cluster={i}
        ref={element => { controls.triggers.current[i] = element; }}
        aria-expanded={controls.activeCluster === i} aria-controls="friday-cluster-panel"
        aria-describedby={`friday-cluster-description-${i}`}
        onPointerEnter={event => { if (event.pointerType !== 'touch') controls.hover(i); }}
        onPointerLeave={event => { if (event.pointerType !== 'touch') controls.hover(-1); }}
        onFocus={event => controls.focus(i, event)} onBlur={controls.blur} onClick={event => controls.click(i, event)}>{cluster.name}</button>)}
    </div>;
}
