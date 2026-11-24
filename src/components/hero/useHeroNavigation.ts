import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/** Scope the dark navigation to the part of the homepage it actually overlays. */
export function useHeroNavigation() {
  const { pathname } = useLocation();
  const [overHero, setOverHero] = useState(true);
  useEffect(() => {
    if (pathname !== '/') return;
    const hero = document.querySelector('.friday-hero');
    if (!hero) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      setOverHero(hero.getBoundingClientRect().bottom > 16);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(hero);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname]);
  return { home: pathname === '/', dark: pathname === '/' && overHero };
}
