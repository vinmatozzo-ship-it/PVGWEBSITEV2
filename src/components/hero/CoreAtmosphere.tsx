import { AdditiveBlending } from 'three';
import type { GraphUniforms } from './graphShaders';

const vertex = /* glsl */`
 varying vec2 vUv;
 void main() {
   vUv = uv;
   vec4 view = modelViewMatrix * vec4(0.0,0.0,0.0,1.0);
   view.xy += position.xy * vec2(5.5, 3.3);
   gl_Position = projectionMatrix * view;
 }
`;
const fragment = /* glsl */`
 uniform float uTime;
 uniform float uFocusEnergy;
 uniform float uCoreResponse;
 varying vec2 vUv;
 void main() {
   vec2 p = (vUv - 0.5) * 2.0;
   float r = dot(p,p);
   float wisps = 0.65 + 0.15*sin(p.x*13.0 + sin(p.y*8.0 + uTime*0.15)*2.0)
     + 0.1*cos(p.y*17.0 - p.x*9.0 + uTime*0.11);
   float release = smoothstep(0.8, 1.4, uTime) * (1.0-smoothstep(2.8, 4.4, uTime));
   // A broken elliptical ripple through the scattering volume, never a solid ring.
   float waveDistance = (sqrt(r) - fract(max(uTime-1.2,0.0)*0.24))*13.0;
   float wave = exp(-waveDistance * waveDistance);
   float scatter = exp(-r*4.5) * wisps * (1.0-smoothstep(0.5,1.0,r));
   vec3 color = mix(vec3(0.0,0.06,0.38),vec3(0.01,0.55,0.85),exp(-r*14.0));
   scatter += wave * wisps * exp(-r*4.0) * release * 0.12;
   float emergence = max(smoothstep(0.35, 1.8, uTime), uFocusEnergy);
   gl_FragColor = vec4(color,scatter*(0.22 + release*0.05 + uFocusEnergy*0.055 + uCoreResponse*0.09)*emergence);
   #include <colorspace_fragment>
 }
`;

/** One billboarded light volume; no full-screen blur or expensive ray marching. */
export function CoreAtmosphere({ uniforms }: { uniforms: GraphUniforms }) {
  return <mesh frustumCulled={false} renderOrder={-1}>
    <planeGeometry args={[1, 1]} />
    <shaderMaterial uniforms={uniforms} onUpdate={material => { material.uniforms = uniforms; }} vertexShader={vertex} fragmentShader={fragment}
      transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
  </mesh>;
}
