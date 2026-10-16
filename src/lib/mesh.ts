/* Deterministic node mesh for the hero and the peak diagram.
   Built at compile time (seeded PRNG), so the SVG is static markup:
   zero runtime cost, identical output on every build. */

export interface MeshNode {
  x: number;
  y: number;
  r: number;
  far: boolean;
}
export interface MeshEdge {
  a: number;
  b: number;
  d: string;
}
export interface Mesh {
  w: number;
  h: number;
  nodes: MeshNode[];
  edges: MeshEdge[];
  /** indices into `edges` that carry a travelling event pulse */
  pulses: number[];
}

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Opts {
  w: number;
  h: number;
  cols: number;
  rows: number;
  seed: number;
  /** nodes left of this fraction of the width are "far" (dim, small): keeps the headline calm */
  quietX: number;
  maxLink: number;
}

export function buildMesh({ w, h, cols, rows, seed, quietX, maxLink }: Opts): Mesh {
  const rand = rng(seed);
  const nodes: MeshNode[] = [];
  const cw = w / cols;
  const ch = h / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = Math.round((i + 0.2 + rand() * 0.6) * cw);
      const y = Math.round((j + 0.2 + rand() * 0.6) * ch);
      const far = x / w < quietX;
      if (far && rand() < 0.8) continue;
      nodes.push({ x, y, r: far ? 1.6 : 2.4 + rand() * 1.6, far });
    }
  }
  const edgeKey = new Set<string>();
  const edges: MeshEdge[] = [];
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, k) => ({ k, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter((o) => o.k !== i && o.d < maxLink)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2);
    for (const o of near) {
      const key = i < o.k ? `${i}-${o.k}` : `${o.k}-${i}`;
      if (edgeKey.has(key)) continue;
      edgeKey.add(key);
      const m = nodes[o.k];
      edges.push({ a: i, b: o.k, d: `M${n.x} ${n.y}L${m.x} ${m.y}` });
    }
  });
  // pulses only on edges between non-far nodes, spread out
  const cand = edges.map((_, i) => i).filter((i) => !nodes[edges[i].a].far && !nodes[edges[i].b].far);
  const pulses: number[] = [];
  const step = Math.max(1, Math.floor(cand.length / 7));
  for (let i = 0; i < cand.length && pulses.length < 7; i += step) pulses.push(cand[i]);
  return { w, h, nodes, edges, pulses };
}

/** desktop (landscape) and phone (portrait) compositions are generated separately */
export const heroMeshWide = () =>
  buildMesh({ w: 1200, h: 720, cols: 12, rows: 7, seed: 20261016, quietX: 0.2, maxLink: 170 });
export const heroMeshTall = () =>
  buildMesh({ w: 420, h: 520, cols: 6, rows: 8, seed: 7741, quietX: 0, maxLink: 150 });
