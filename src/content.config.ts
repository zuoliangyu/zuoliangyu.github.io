import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const sites = defineCollection({
  loader: file('src/data/sites.yaml'),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    url: z.string().url(),
    summary: z.string(),
    repo: z
      .string()
      .regex(/^[\w.-]+\/[\w.-]+$/, 'repo 应为 owner/repo')
      .optional(),
    tags: z.array(z.coerce.string()).default([]),
    mirrors: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    source: z.string().url().optional(),
  }),
});

export const collections = { sites };
