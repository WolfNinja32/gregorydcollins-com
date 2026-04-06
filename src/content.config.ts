import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    heroTitle: z.string().optional(),
    heroSummary: z.string().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    featuredImage: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    author: z.string().default('Gregory Collins'),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    productLine: z.enum(['lab-in-a-box', 'directorybase', 'other']),
    summary: z.string(),
    status: z.enum(['idea', 'draft', 'active', 'archived']).default('draft'),
    audience: z.array(z.string()).default([]),
    priceNote: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaUrl: z.string().optional(),
    features: z.array(z.string()).default([]),
    relatedProducts: z.array(reference('products')).default([]),
    featuredImage: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    summary: z.string(),
    status: z.enum(['idea', 'draft', 'published']).default('draft'),
    coverImage: z.string().optional(),
    purchaseUrl: z.string().url().optional(),
    sampleUrl: z.string().url().optional(),
    publishDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const photosets = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/photosets' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    location: z.string().optional(),
    subject: z.string().optional(),
    captureDate: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = {
  pages,
  writing,
  products,
  books,
  photosets,
};
