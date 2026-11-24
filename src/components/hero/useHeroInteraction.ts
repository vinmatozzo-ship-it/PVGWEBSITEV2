import { useCallback, useEffect, useRef, useState, type PointerEvent, type MouseEvent, type FocusEvent, type RefObject } from 'react';

export type HeroInteraction = {
  pointerX: number; pointerY: number; pointerInside: boolean;
  cluster: number; revision: number; hubs: Float32Array; canvas: HTMLCanvasElement | null;
};

export function useHeroInteraction(root: RefObject<HTMLElement>) {
  const interaction = useRef<HeroInteraction>({ pointerX: 0, pointerY: 0, pointerInside: false,
    cluster: -1, revision: 0, hubs: new Float32Array(12).fill(-10000), canvas: null });
  const [activeCluster, setActiveCluster] = useState(-1);
  const inputMode = useRef<'mouse' | 'keyboard' | 'touch' | null>(null);
  const touchSelection = useRef(-1), suppressFocus = useRef(false);
  const lastPointerType = useRef('mouse');
  const pointerFocusing = useRef(false);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverExit = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelHoverExit = useCallback(() => {
    if (hoverExit.current !== null) clearTimeout(hoverExit.current);
    hoverExit.current = null;
  }, []);
  useEffect(() => cancelHoverExit, [cancelHoverExit]);
  const activate = useCallback((index: number) => {
    if (interaction.current.cluster === index) return;
    interaction.current.cluster = index;
    interaction.current.revision++;
    setActiveCluster(index);
  }, []);
  const hover = useCallback((index: number) => {
    if (index >= 0) {
      cancelHoverExit();
      inputMode.current = 'mouse';
      touchSelection.current = -1;
      activate(index);
    } else if (inputMode.current === 'mouse' && hoverExit.current === null) {
      // Bridge tiny gaps between labels without leaving a persistent selection.
      hoverExit.current = setTimeout(() => {
        hoverExit.current = null;
        if (inputMode.current === 'mouse') { inputMode.current = null; activate(-1); }
      }, 100);
    }
  }, [activate, cancelHoverExit]);
  const dismiss = useCallback((restoreFocus = false) => {
    cancelHoverExit();
    const previous = interaction.current.cluster;
    touchSelection.current = -1; inputMode.current = null; activate(-1);
    if (restoreFocus && previous >= 0) {
      suppressFocus.current = true; triggers.current[previous]?.focus({ preventScroll: true });
      suppressFocus.current = false;
    }
  }, [activate, cancelHoverExit]);
  const tap = useCallback((index: number) => {
    cancelHoverExit();
    if (inputMode.current === 'touch' && touchSelection.current === index) dismiss();
    else { inputMode.current = 'touch'; touchSelection.current = index; activate(index); }
  }, [activate, dismiss, cancelHoverExit]);
  const click = useCallback((index: number, event: MouseEvent<HTMLButtonElement>) => {
    const nativePointerType = (event.nativeEvent as globalThis.PointerEvent).pointerType;
    const pointerType = nativePointerType || lastPointerType.current;
    if (event.detail === 0 && nativePointerType !== 'touch') {
      // Enter/Space and assistive-technology activation never create a touch pin.
      cancelHoverExit(); inputMode.current = 'keyboard'; touchSelection.current = -1; activate(index);
    } else if (pointerType === 'touch') tap(index);
    else { inputMode.current = 'mouse'; touchSelection.current = -1; }
    // Mouse/pen clicks never select: label pointerenter/leave own their active state.
  }, [activate, tap, cancelHoverExit]);
  const focus = useCallback((index: number, event: FocusEvent<HTMLButtonElement>) => {
    if (pointerFocusing.current) { pointerFocusing.current = false; return; }
    if (suppressFocus.current || !event.currentTarget.matches(':focus-visible')) return;
    cancelHoverExit(); inputMode.current = 'keyboard'; touchSelection.current = -1; activate(index);
  }, [activate, cancelHoverExit]);
  const blur = useCallback((event: FocusEvent<HTMLButtonElement>) => {
    if ((event.relatedTarget as HTMLElement | null)?.closest('[data-cluster-panel]')) return;
    if (inputMode.current === 'keyboard') dismiss();
  }, [dismiss]);
  const pointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = root.current?.getBoundingClientRect();
    if (!bounds) return;
    const state = interaction.current;
    state.pointerInside = true;
    state.pointerX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    state.pointerY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / Math.min(bounds.height, window.innerHeight) * 2 - 1));
    // A real mouse taking over from touch clears its selection, even on a wide tablet.
    // Graph proximity and card hover never open or prolong a mouse disclosure.
    if (inputMode.current === 'touch') {
      touchSelection.current = -1;
      const label = (event.target as HTMLElement).closest<HTMLElement>('[data-cluster]');
      if (label) hover(Number(label.dataset.cluster)); else dismiss();
    }
  }, [root, hover, dismiss]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const pointerDown = useCallback((event: PointerEvent<HTMLElement>) => {
    lastPointerType.current = event.pointerType;
    pointerFocusing.current = true;
    touchStart.current = event.pointerType === 'touch' ? { x: event.clientX, y: event.clientY } : null;
    if (event.pointerType !== 'touch' && (event.target as HTMLElement).closest('[data-cluster]')) {
      // Mouse focus can remain :focus-visible after keyboard use. It must not pin.
      inputMode.current = 'mouse'; touchSelection.current = -1;
    }
  }, []);
  const pointerCancel = useCallback(() => { touchStart.current = null; pointerFocusing.current = false; }, []);
  const pointerUp = useCallback((event: PointerEvent<HTMLElement>) => {
    const start = touchStart.current; touchStart.current = null; pointerFocusing.current = false;
    if (!start || Math.hypot(event.clientX-start.x, event.clientY-start.y) > 10) return;
    if ((event.target as HTMLElement).closest('button,a,[data-cluster-panel],.friday-hero__content')) return;
    const canvas = interaction.current.canvas?.getBoundingClientRect();
    if (!canvas || event.clientY < canvas.top || event.clientY > canvas.bottom) return;
    let nearest = -1, distance = 48 * 48;
    for (let i = 0; i < 6; i++) {
      const d = (event.clientX-canvas.left-interaction.current.hubs[i*2]) ** 2 + (event.clientY-canvas.top-interaction.current.hubs[i*2+1]) ** 2;
      if (d < distance) { nearest = i; distance = d; }
    }
    if (nearest >= 0) tap(nearest); else dismiss();
  }, [tap, dismiss]);
  const pointerLeave = useCallback(() => {
    interaction.current.pointerInside = false;
    hover(-1);
  }, [hover]);
  const leaveFocus = useCallback(() => { if (inputMode.current === 'keyboard') dismiss(); }, [dismiss]);
  return { interaction, activeCluster, inputMode, triggers, activate, hover, click, focus, blur, dismiss, pointerDown, pointerUp, pointerCancel, pointerMove, pointerLeave, leaveFocus };
}
export type ClusterControls = ReturnType<typeof useHeroInteraction>;
