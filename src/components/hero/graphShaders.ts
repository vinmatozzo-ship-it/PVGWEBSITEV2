import { CLUSTERS, MOBILE_CENTERS } from './SceneConfiguration';

/** Shared displacement keeps signal paths, nodes and line endpoints coincident. */
export const spatialMotion = /* glsl */`
  uniform float uMobile;
  uniform float uTime;
  uniform float uClusterWeights[6];
  uniform float uInteractionStarts[6];
  uniform float uFocusEnergy;
  uniform float uCoreResponse;
  float clusterWeight(float cluster) {
    if (cluster < 0.0 || cluster > 5.5) return 0.0;
    return uClusterWeights[int(cluster)];
  }
  float revealAt(vec3 p, float cluster) {
    float seed = fract(sin(dot(p, vec3(12.9898, 78.233, 39.425))) * 43758.5453);
    float delay = cluster > 5.5 ? 0.35 + seed * 0.5 : 0.08 + seed * 1.1 + length(p) * 0.055;
    float emergence = smoothstep(delay, delay + 1.65, uTime);
    return max(emergence, clusterWeight(cluster));
  }
  float emphasis(float cluster) {
    if (cluster > 5.5) return 1.0 + uFocusEnergy * 0.12 + uCoreResponse * 0.18;
    float selected = clusterWeight(cluster);
    return 1.0 + selected * 0.6 - uFocusEnergy * (1.0 - selected) * 0.28;
  }
  vec3 driftAt(vec3 p, float cluster) {
    vec3 mapped = p;
    ${CLUSTERS.map((c, i) => `if (cluster > ${i - 0.5} && cluster < ${i + 0.5}) mapped = vec3(${MOBILE_CENTERS[i].map(n => n.toFixed(3)).join(',')}) + (p - vec3(${c.center.map(n => n.toFixed(3)).join(',')})) * vec3(0.62,0.78,0.9);`).join('\n')}
    if (cluster > 5.5) mapped = p * 1.08;
    if (cluster < -0.5) mapped = p * vec3(0.6,1.0,1.0);
    p = mix(p, mapped, uMobile);
    if (cluster < -0.5) return p;
    float c = cluster * 1.73;
    float core = step(5.5, cluster);
    float breath = sin(uTime * 0.7) * 0.025 * core;
    vec3 shift = vec3(sin(uTime * 0.21 + c), cos(uTime * 0.17 + c), sin(uTime * 0.19 + c * 0.7));
    vec3 weave = core * 0.065 * vec3(
      sin(p.y * 3.0 + uTime * 0.42) - sin(uTime * 0.42),
      sin(p.z * 2.7 - uTime * 0.31) + sin(uTime * 0.31),
      sin(p.x * 3.4 + uTime * 0.36) - sin(uTime * 0.36));
    return p * (1.0 + breath) + weave + shift * mix(0.15, 0.025, core)
      + 0.035 * vec3(sin(p.y * 2.0 + uTime * 0.3), sin(p.z + uTime * 0.24), cos(p.x + uTime * 0.2));
  }
  float atmosphere(float depth) {
    return clamp(exp(-max(depth - 10.0, 0.0) * 0.075), 0.22, 1.0);
  }
  float arrivalFlash(vec3 event) {
    float age = mod(max(uTime - event.x, 0.0), max(event.y, 1.0));
    return step(event.x, uTime) * event.z * smoothstep(0.0, 0.065, age) * exp(-age * 2.7);
  }
`;
export const particleVertex = /* glsl */`
  ${spatialMotion}
  uniform float uProjectionScale;
  uniform vec4 uCoreSignals[6];
  attribute float aCluster;
  attribute float aSize;
  attribute float aBrightness;
  attribute float aKind;
  attribute vec3 aColor;
  attribute vec3 aArrival0;
  attribute vec3 aArrival1;
  attribute vec3 aArrival2;
  attribute vec3 aArrival3;
  varying vec3 vColor;
  varying float vBrightness;
  varying float vKind;
  varying float vSoftness;
  varying float vActivity;
  void main() {
    vec4 view = modelViewMatrix * vec4(driftAt(position, aCluster), 1.0);
    gl_Position = projectionMatrix * view;
    float activation = arrivalFlash(aArrival0) + arrivalFlash(aArrival1) + arrivalFlash(aArrival2) + arrivalFlash(aArrival3);
    float coreActivity = 0.0;
    for (int i = 0; i < 6; i++) coreActivity += arrivalFlash(uCoreSignals[i].xyz);
    if (aCluster > 5.5) {
      activation += min(coreActivity, 1.4) * 0.4;
      activation += smoothstep(0.5, 1.2, uTime) * (1.0 - smoothstep(1.5, 2.8, uTime)) * 0.28;
      activation += uCoreResponse * 0.10;
    }
    vActivity = min(activation + clusterWeight(aCluster) * 0.12, 1.5);
    // Circle-of-confusion approximation: crisp middle plane, softer near/far layers.
    vSoftness = clamp(abs(-view.z - 16.0) / 12.0, 0.0, 0.8);
    if (aCluster > 5.5 || aKind == 2.0) vSoftness *= 0.3;
    if (aKind > 3.5) vSoftness = max(vSoftness, 0.62);
    gl_PointSize = clamp(aSize * mix(1.0, 0.80, uMobile) * (1.0 + vActivity * mix(0.28, 0.14, uMobile) + vSoftness * 0.55) * uProjectionScale / max(-view.z, 0.1), 1.0, 240.0);
    vColor = mix(aColor, vec3(0.65, 0.93, 1.0), min(vActivity * 0.35, 0.5));
    vKind = aKind;
    float corePulse = aCluster > 5.5 ? 1.0 + 0.06 * sin(uTime * 0.7) : 1.0;
    float community = aCluster >= 0.0 && aCluster < 5.5 ? 0.83 + 0.17 * sin(uTime * 0.37 - aCluster * 1.1) : 1.0;
    vBrightness = mix(1.0, 0.82, uMobile) * aBrightness * atmosphere(-view.z) * corePulse * community * (1.0 + vActivity * mix(1.9, 0.9, uMobile)) * emphasis(aCluster) * revealAt(position, aCluster);
  }
`;
export const particleFragment = /* glsl */`
  uniform float uMobile;
  varying vec3 vColor;
  varying float vBrightness;
  varying float vKind;
  varying float vSoftness;
  varying float vActivity;
  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    bool volume = vKind > 2.5 && vKind < 3.5;
    if (volume) p.y *= 1.55;
    float r = length(p);
    if (r > 1.0) discard;
    // A defined luminous aperture rather than a tiny Gaussian dot.
    float aperture = vKind > 1.5 ? 0.16 : 0.23;
    float sharp = 1.0 - smoothstep(aperture * 0.6, aperture, r);
    float center = mix(sharp, exp(-r * r * 23.0), vSoftness);
    float shoulder = exp(-r * r * 19.0);
    float halo = exp(-r * r * 5.0) * (1.0 - smoothstep(0.75, 1.0, r));
    // Selective local bloom: only hubs, active destinations and the core receive broad halos.
    float bloom = vKind > 1.5 ? 0.18 : 0.025;
    float alpha = (center * (1.0 - vSoftness * 0.45) + shoulder * mix(0.28, 0.18, uMobile) + halo * (bloom + vActivity * 0.14) * mix(1.0, 0.6, uMobile)) * vBrightness;
    if (volume) alpha = halo * vBrightness * 0.23;
    vec3 light = mix(vColor, vec3(0.91, 0.98, 1.0), center * (vKind > 1.5 && !volume ? 0.5 : 0.16));
    gl_FragColor = vec4(light, min(alpha, 1.0));
    #include <colorspace_fragment>
  }
`;
export const filamentVertex = /* glsl */`
  ${spatialMotion}
  attribute float aCluster;
  attribute vec3 aColor;
  attribute float aStrength;
  attribute float aOtherCluster;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 view = modelViewMatrix * vec4(driftAt(position, aCluster), 1.0);
    gl_Position = projectionMatrix * view;
    vColor = aColor;
    float community = 0.85 + 0.15 * sin(uTime * 0.37 - aCluster * 1.1);
    float selected = max(clusterWeight(aCluster), clusterWeight(aOtherCluster));
    float emergence = max(smoothstep(0.55 + (1.0-aStrength)*1.2, 3.7 + (1.0-aStrength)*0.5, uTime), selected);
    vAlpha = emergence * aStrength * atmosphere(-view.z) * community * (1.0 + selected * 1.5 - uFocusEnergy * (1.0 - selected) * 0.42);
  }
`;
export const filamentFragment = /* glsl */`
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(vColor, vAlpha);
    #include <colorspace_fragment>
  }
`;
export const signalVertex = /* glsl */`
  ${spatialMotion}
  uniform float uProjectionScale;
  attribute vec3 aDestination;
  attribute vec2 aClusters;
  attribute vec4 aSchedule;
  attribute float aTail;
  attribute float aInteractive;
  varying float vEnergy;
  varying float vTail;
  void main() {
    float start = aSchedule.x;
    // Selected community takes narrative priority; unrelated autonomous traffic recedes.
    float related = max(clusterWeight(aClusters.x), clusterWeight(aClusters.y));
    float interactionEnergy = 1.0 - uFocusEnergy * (1.0 - related) * 0.78;
    if (aInteractive >= 0.0) {
      start += uInteractionStarts[int(aInteractive)];
      interactionEnergy = uClusterWeights[int(aInteractive)];
    }
    float age = mod(max(uTime - start, 0.0), aSchedule.z);
    float progress = age / aSchedule.y - aTail * 0.095;
    float alive = step(start, uTime) * step(0.0, progress) * step(progress, 1.0);
    vec3 origin = driftAt(position, aClusters.x);
    vec3 destination = driftAt(aDestination, aClusters.y);
    vec4 view = modelViewMatrix * vec4(mix(origin, destination, clamp(progress, 0.0, 1.0)), 1.0);
    gl_Position = projectionMatrix * view;
    gl_PointSize = clamp(mix(0.32, 0.12, aTail) * uProjectionScale / max(-view.z, 0.1), 1.0, 80.0);
    vEnergy = alive * pow(1.0 - aTail * 0.85, 1.8) * aSchedule.w * atmosphere(-view.z) * interactionEnergy;
    vTail = aTail;
  }
`;
export const signalFragment = /* glsl */`
  varying float vEnergy;
  varying float vTail;
  void main() {
    float r = length(gl_PointCoord * 2.0 - 1.0);
    if (r > 1.0 || vEnergy < 0.001) discard;
    float light = exp(-r * r * 45.0) + 0.25 * exp(-r * r * 7.0);
    vec3 color = mix(vec3(0.83, 0.98, 1.0), vec3(0.01, 0.55, 0.92), vTail);
    gl_FragColor = vec4(color, min(light * vEnergy, 1.0));
    #include <colorspace_fragment>
  }
`;
export type GraphUniforms = {
  uMobile: { value: number };
  uTime: { value: number };
  uProjectionScale: { value: number };
  uCoreSignals: { value: Float32Array };
  uClusterWeights: { value: Float32Array };
  uInteractionStarts: { value: Float32Array };
  uFocusEnergy: { value: number };
  uCoreResponse: { value: number };
};
