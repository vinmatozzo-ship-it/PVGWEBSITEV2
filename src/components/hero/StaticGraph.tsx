import { memo, useId, useMemo } from 'react';
import { generateGraph } from './generateGraph';
import { CLUSTERS, MOBILE_CENTERS, SCENE } from './SceneConfiguration';

/** The same seeded topology, rendered as a few batched SVG paths with no animation. */
export const StaticGraph = memo(function StaticGraph() {
  const id = useId().replace(/:/g, '');
  const layouts = useMemo(() => {
    const graph = generateGraph('compact');
    return [false, true].map(mobile => {
      const positions = graph.nodes.map(node => {
        let [x, y, z] = node.position;
        if (mobile && node.cluster >= 0 && node.cluster < 6) {
          const c = CLUSTERS[node.cluster].center, m = MOBILE_CENTERS[node.cluster];
          x = m[0] + (x-c[0]) * .62; y = m[1] + (y-c[1]) * .78; z = m[2] + (z-c[2]) * .9;
        }
        const scale = 40 / (1-z/20);
        return [300+x*scale, 280-y*scale];
      });
      const edges = ['', ''];
      for (const edge of graph.edges) {
        const a = positions[edge.a], b = positions[edge.b];
        edges[edge.strength > .6 ? 1 : 0] += `M${a.join(',')}L${b.join(',')}`;
      }
      const nodes = new Map<string, { path: string; color: string; opacity: number }>();
      graph.nodes.forEach((node, i) => {
        if (node.cluster < 0) return;
        const [x,y] = positions[i], r = Math.max(.6,node.size*2.4);
        const level = Math.min(2, Math.floor(node.brightness * 2));
        const key = `${node.cluster}-${level}`;
        const batch = nodes.get(key) || { path: '', color: SCENE.clusterColors[node.cluster] || '#E7F5FF', opacity: .5+level*.25 };
        batch.path += `M${x-r},${y}a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 ${-r*2},0`;
        nodes.set(key,batch);
      });
      return { mobile, edges, nodes: [...nodes.values()] };
    });
  }, []);
  return <div className="friday-static-graph" aria-hidden="true">{layouts.map(({ mobile, edges, nodes }) => <svg key={String(mobile)} className={mobile ? 'friday-static-mobile' : 'friday-static-desktop'} viewBox={mobile ? '110 40 380 480' : '0 0 600 560'}>
    <defs><radialGradient id={`${id}-${mobile}`}><stop stopColor="#55D9FF" stopOpacity=".28"/><stop offset="1" stopColor="#009DD6" stopOpacity="0"/></radialGradient></defs>
    <ellipse cx="300" cy="280" rx="170" ry="130" fill={`url(#${id}-${mobile})`} />
    {edges.map((path,i) => <path key={i} d={path} fill="none" stroke="#55D9FF" strokeWidth={i ? .65 : .35} opacity={i ? .55 : .14} />)}
    {nodes.map((batch,i) => <path key={i} d={batch.path} fill={batch.color} opacity={batch.opacity} />)}
    <circle cx="300" cy="280" r="5" fill="#E7F5FF" /><circle cx="300" cy="280" r="24" fill={`url(#${id}-${mobile})`} />
    <text x="300" y="310" textAnchor="middle" fill="#E7F5FF" fontSize="12" letterSpacing="3">FRIDAY OS</text>
  </svg>)}</div>;
});
