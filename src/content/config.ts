import { defineCollection, z } from 'astro:content'

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      }).optional(),
  }),
})

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    duration: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      }).optional(),
    date: z
      .string()
      .or(z.date())
      .transform((val: string | number | Date) => new Date(val).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })),
    draft: z.boolean().default(false).optional(),
    lang: z.string().default('en-US').optional(),
    tag: z.string().optional().optional(),
    redirect: z.string().optional(),
    video: z.boolean().default(false).optional(),
    tech: z.array(z.string()).optional(),
  }),
})

const expertise = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    expertiseGroup: z.string(),
    mainImage: z.string(),
    secondaryImage: z.string(),
    personImage: z.string(),
    duration: z.string(),
    date: z.string().or(z.date()),
    toolkit: z.array(z.object({
      'header': z.string(),
      'description': z.string(),
      'tech-stack': z.array(z.string()),
    })),
    execSummary: z.string().optional(),
  }),
})

export const collections = { pages, blog, expertise }
