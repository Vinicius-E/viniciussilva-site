import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Case studies — MDX. Structure per approved spec §B / case-study section. */
const cases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    clientDisplay: z.string(),
    location: z.string(),
    summary: z.string(),
    role: z.string(),
    timeline: z.string().nullable().default(null),
    platforms: z.array(z.string()).default([]),
    domain: z.string(),
    stack: z
      .object({
        backend: z.array(z.string()).default([]),
        frontend: z.array(z.string()).default([]),
        mobile: z.array(z.string()).default([]),
        delivery: z.array(z.string()).default([]),
      })
      .default({}),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Screenshots are rendered as placeholders until real, cleared images exist.
    screenshots: z
      .array(z.object({ src: z.string().nullable().default(null), alt: z.string(), caption: z.string() }))
      .default([]),
    today: z.array(z.string()).default([]),
    planned: z.array(z.string()).default([]),
  }),
});

/* Experience timeline. Dates stay empty strings until Vinicius confirms them;
   the component renders a visible TODO for any empty period. */
const localizedEntry = z.object({
  title: z.string().optional(),
  context: z.string().optional(),
  ownership: z.string().optional(),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    start: z.string().default(''),
    end: z.string().nullable().default(null), // null → "Present"
    context: z.string(),
    ownership: z.string(),
    stack: z.array(z.string()).default([]),
    order: z.number().default(0),
    // Per-locale overrides for title / context / ownership (EN is the base above).
    translations: z
      .object({ pt: localizedEntry.optional(), es: localizedEntry.optional() })
      .default({}),
  }),
});

export const collections = { cases, experience };
