/** Pure cadence policy: sampling excludes background gaps and has asymmetric hysteresis. */
export function createQualityController(target = 0) {
  return { elapsed: 0, sum: 0, count: 0, slow: 0, fast: 0, cooldown: 5, target, step: 0, meanMs: 0 };
}
export function sampleQualityFrame(s: ReturnType<typeof createQualityController>, delta: number, cap: number) {
  if (delta <= 0 || delta > 0.25) return false;
  s.target = Math.min(s.target, cap);
  s.cooldown -= delta; s.step += delta;
  if (s.cooldown > 0) return false;
  s.elapsed += delta; s.sum += delta; s.count++;
  if (s.elapsed < 4) return false;
  s.meanMs = s.sum / s.count * 1000;
  s.slow = s.meanMs > 25 ? s.slow + 1 : 0;
  s.fast = s.meanMs < 18 ? s.fast + 1 : 0;
  if (s.slow >= 2 || s.fast >= 5) {
    s.target = Math.max(0.8, Math.min(cap, s.target + (s.slow >= 2 ? -0.2 : 0.1)));
    s.cooldown = 8; s.fast = 0; s.slow = 0;
  }
  s.elapsed = 0; s.sum = 0; s.count = 0;
  return true;
}
