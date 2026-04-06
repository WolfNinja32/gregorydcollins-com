# GregoryDCollins.com — Astro Starter Pack

This starter pack turns the architecture handoff into a repo-ready baseline for a coding agent or developer.

It is intentionally minimal and static-first.

---

## 1. Recommended initial commands

```bash
npm create astro@latest gregorydcollins-com
cd gregorydcollins-com
npm install
npm install @astrojs/mdx @astrojs/sitemap
```

If the developer prefers TypeScript strictness, keep the default Astro TypeScript setup.

---

## 2. Suggested `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gregorydcollins.com',
  output: 'static',
  integrations: [
    mdx(),
    sitemap(),
  ],
});
```

Notes:
- `output: 'static'` matches the recommended v1 deployment model.
- `site` should be set immediately so canonical URLs and sitemap output are correct.

---

## 3. Suggested `package.json` scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

---

## 4. Suggested `src/content.config.ts`

```ts
import { defineCollection, z, reference } from 'astro:content';

const pages = defineCollection({
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
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    featuredImage: z.string().optional(),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    author: z.string().default('Gregory Collins'),
  }),
});

const products = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
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
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const books = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    subtitle: z.string().optional(),
    summary: z.string(),
    status: z.enum(['idea', 'draft', 'published']).default('draft'),
    coverImage: z.string().optional(),
    purchaseUrl: z.string().url().optional(),
    sampleUrl: z.string().url().optional(),
    publishDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const photosets = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
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
```

---

## 5. Suggested `src/lib/site.ts`

```ts
export const SITE = {
  name: 'Gregory Collins',
  siteUrl: 'https://gregorydcollins.com',
  title: 'Gregory Collins',
  description:
    'Technology, photography, writing, and product ideas by Gregory Collins.',
  author: 'Gregory Collins',
  nav: [
    { label: 'Photography', href: '/photography/' },
    { label: 'Lab-in-a-Box', href: '/lab-in-a-box/' },
    { label: 'DirectoryBase', href: '/directorybase/' },
    { label: 'Writing', href: '/writing/' },
    { label: 'Books', href: '/books/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
};
```

---

## 6. Suggested `src/components/site/SEOHead.astro`

```astro
---
interface Props {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
}

import { SITE } from '../../lib/site';

const {
  title = SITE.title,
  description = SITE.description,
  canonical,
  image = '/social/og-default.jpg',
} = Astro.props;

const fullTitle = title === SITE.title ? title : `${title} | ${SITE.title}`;
const canonicalUrl = canonical ? new URL(canonical, SITE.siteUrl).toString() : undefined;
const imageUrl = new URL(image, SITE.siteUrl).toString();
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{fullTitle}</title>
<meta name="description" content={description} />
{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:image" content={imageUrl} />
{canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={imageUrl} />
```

---

## 7. Suggested `src/components/site/Header.astro`

```astro
---
import { SITE } from '../../lib/site';
---

<header class="site-header">
  <div class="container row">
    <a class="brand" href="/">Gregory Collins</a>
    <nav aria-label="Primary navigation">
      <ul class="nav-list">
        {SITE.nav.map((item) => (
          <li><a href={item.href}>{item.label}</a></li>
        ))}
      </ul>
    </nav>
  </div>
</header>
```

---

## 8. Suggested `src/components/site/Footer.astro`

```astro
<footer class="site-footer">
  <div class="container">
    <p>© Gregory Collins. All rights reserved.</p>
  </div>
</footer>
```

---

## 9. Suggested `src/layouts/BaseLayout.astro`

```astro
---
import Header from '../components/site/Header.astro';
import Footer from '../components/site/Footer.astro';
import SEOHead from '../components/site/SEOHead.astro';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
}

const { title, description, canonical, image } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <SEOHead
      title={title}
      description={description}
      canonical={canonical}
      image={image}
    />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

---

## 10. Suggested `src/layouts/SectionLayout.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description?: string;
  heroTitle?: string;
  heroSummary?: string;
}

const { title, description, heroTitle, heroSummary } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <section class="section-hero container">
    <h1>{heroTitle ?? title}</h1>
    {heroSummary && <p class="lede">{heroSummary}</p>}
  </section>
  <section class="container section-body">
    <slot />
  </section>
</BaseLayout>
```

---

## 11. Suggested `src/layouts/ArticleLayout.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description?: string;
  publishDate?: Date;
  updatedDate?: Date;
  tags?: string[];
}

const { title, description, publishDate, updatedDate, tags = [] } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <article class="container prose-wrap">
    <header class="article-header">
      <h1>{title}</h1>
      <div class="article-meta">
        {publishDate && <p>Published: {publishDate.toLocaleDateString()}</p>}
        {updatedDate && <p>Updated: {updatedDate.toLocaleDateString()}</p>}
        {tags.length > 0 && <p>Tags: {tags.join(', ')}</p>}
      </div>
    </header>
    <slot />
  </article>
</BaseLayout>
```

---

## 12. Suggested `src/layouts/ProductLayout.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description?: string;
  summary?: string;
  features?: string[];
  ctaLabel?: string;
  ctaUrl?: string;
}

const {
  title,
  description,
  summary,
  features = [],
  ctaLabel,
  ctaUrl,
} = Astro.props;
---

<BaseLayout title={title} description={description}>
  <article class="container product-page">
    <header class="product-header">
      <h1>{title}</h1>
      {summary && <p class="lede">{summary}</p>}
      {ctaLabel && ctaUrl && (
        <p><a class="button" href={ctaUrl}>{ctaLabel}</a></p>
      )}
    </header>

    {features.length > 0 && (
      <section>
        <h2>Features</h2>
        <ul>
          {features.map((feature) => <li>{feature}</li>)}
        </ul>
      </section>
    )}

    <section class="prose-wrap">
      <slot />
    </section>
  </article>
</BaseLayout>
```

---

## 13. Suggested `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Gregory Collins"
  description="Technology, photography, writing, and product ideas by Gregory Collins."
>
  <section class="container hero-block">
    <h1>Technology, photography, writing, and practical systems.</h1>
    <p class="lede">
      Gregory Collins brings together technical depth, creative work, and product thinking.
    </p>
  </section>

  <section class="container card-grid">
    <a class="card" href="/photography/">
      <h2>Photography</h2>
      <p>Selected work, photo stories, and visual projects.</p>
    </a>
    <a class="card" href="/lab-in-a-box/">
      <h2>Lab-in-a-Box</h2>
      <p>Practical digital products and systems.</p>
    </a>
    <a class="card" href="/directorybase/">
      <h2>DirectoryBase</h2>
      <p>Directory concepts, systems, and related products.</p>
    </a>
    <a class="card" href="/writing/">
      <h2>Writing</h2>
      <p>Essays, notes, and thinking in public.</p>
    </a>
  </section>
</BaseLayout>
```

---

## 14. Suggested `src/pages/about.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About" description="About Gregory Collins.">
  <section class="container prose-wrap">
    <h1>About</h1>
    <p>
      Gregory Collins is a retired technology professional, founder, photographer, and writer.
    </p>
    <p>
      This site brings together his work in photography, digital products, writing, and practical systems.
    </p>
  </section>
</BaseLayout>
```

---

## 15. Suggested `src/pages/contact.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Contact" description="Contact Gregory Collins.">
  <section class="container prose-wrap">
    <h1>Contact</h1>
    <p>Email contact details or a form can be added here in a later pass.</p>
  </section>
</BaseLayout>
```

---

## 16. Suggested `src/pages/writing/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import SectionLayout from '../../layouts/SectionLayout.astro';

const entries = (await getCollection('writing'))
  .filter((entry) => !entry.data.draft)
  .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
---

<SectionLayout
  title="Writing"
  description="Essays, notes, and articles by Gregory Collins."
  heroTitle="Writing"
  heroSummary="Essays, notes, and practical thinking in public."
>
  <ul>
    {entries.map((entry) => (
      <li>
        <a href={`/writing/${entry.slug}/`}>{entry.data.title}</a>
        <p>{entry.data.excerpt}</p>
      </li>
    ))}
  </ul>
</SectionLayout>
```

---

## 17. Suggested `src/pages/writing/[slug].astro`

```astro
---
import { getCollection, render } from 'astro:content';
import ArticleLayout from '../../layouts/ArticleLayout.astro';

export async function getStaticPaths() {
  const entries = await getCollection('writing', ({ data }) => !data.draft);
  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<ArticleLayout
  title={entry.data.title}
  description={entry.data.seoDescription ?? entry.data.excerpt}
  publishDate={entry.data.publishDate}
  updatedDate={entry.data.updatedDate}
  tags={entry.data.tags}
>
  <Content />
</ArticleLayout>
```

---

## 18. Suggested `src/pages/lab-in-a-box/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import SectionLayout from '../../layouts/SectionLayout.astro';

const entries = (await getCollection('products'))
  .filter((entry) => !entry.data.draft && entry.data.productLine === 'lab-in-a-box');
---

<SectionLayout
  title="Lab-in-a-Box"
  description="Lab-in-a-Box products and systems."
  heroTitle="Lab-in-a-Box"
  heroSummary="Practical digital products and systems built for real work."
>
  <ul>
    {entries.map((entry) => (
      <li>
        <a href={`/lab-in-a-box/${entry.slug}/`}>{entry.data.title}</a>
        <p>{entry.data.summary}</p>
      </li>
    ))}
  </ul>
</SectionLayout>
```

---

## 19. Suggested `src/pages/lab-in-a-box/[slug].astro`

```astro
---
import { getCollection, render } from 'astro:content';
import ProductLayout from '../../layouts/ProductLayout.astro';

export async function getStaticPaths() {
  const entries = await getCollection(
    'products',
    ({ data }) => !data.draft && data.productLine === 'lab-in-a-box'
  );

  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<ProductLayout
  title={entry.data.title}
  description={entry.data.seoDescription ?? entry.data.summary}
  summary={entry.data.summary}
  features={entry.data.features}
  ctaLabel={entry.data.ctaLabel}
  ctaUrl={entry.data.ctaUrl}
>
  <Content />
</ProductLayout>
```

---

## 20. Suggested `src/pages/directorybase/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import SectionLayout from '../../layouts/SectionLayout.astro';

const entries = (await getCollection('products'))
  .filter((entry) => !entry.data.draft && entry.data.productLine === 'directorybase');
---

<SectionLayout
  title="DirectoryBase"
  description="DirectoryBase products and related concepts."
  heroTitle="DirectoryBase"
  heroSummary="Directory systems, products, and practical implementations."
>
  <ul>
    {entries.map((entry) => (
      <li>
        <a href={`/directorybase/${entry.slug}/`}>{entry.data.title}</a>
        <p>{entry.data.summary}</p>
      </li>
    ))}
  </ul>
</SectionLayout>
```

---

## 21. Suggested `src/pages/directorybase/[slug].astro`

```astro
---
import { getCollection, render } from 'astro:content';
import ProductLayout from '../../layouts/ProductLayout.astro';

export async function getStaticPaths() {
  const entries = await getCollection(
    'products',
    ({ data }) => !data.draft && data.productLine === 'directorybase'
  );

  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<ProductLayout
  title={entry.data.title}
  description={entry.data.seoDescription ?? entry.data.summary}
  summary={entry.data.summary}
  features={entry.data.features}
  ctaLabel={entry.data.ctaLabel}
  ctaUrl={entry.data.ctaUrl}
>
  <Content />
</ProductLayout>
```

---

## 22. Suggested `src/pages/photography/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import SectionLayout from '../../layouts/SectionLayout.astro';

const entries = (await getCollection('photosets'))
  .filter((entry) => !entry.data.draft);
---

<SectionLayout
  title="Photography"
  description="Photography by Gregory Collins."
  heroTitle="Photography"
  heroSummary="Selected work, stories, and visual projects."
>
  <ul>
    {entries.map((entry) => (
      <li>
        <a href={`/photography/${entry.slug}/`}>{entry.data.title}</a>
        <p>{entry.data.summary}</p>
      </li>
    ))}
  </ul>
</SectionLayout>
```

---

## 23. Suggested `src/pages/photography/[slug].astro`

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const entries = await getCollection('photosets', ({ data }) => !data.draft);
  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<BaseLayout
  title={entry.data.title}
  description={entry.data.seoDescription ?? entry.data.summary}
>
  <article class="container prose-wrap">
    <h1>{entry.data.title}</h1>
    <p class="lede">{entry.data.summary}</p>
    <Content />
  </article>
</BaseLayout>
```

---

## 24. Suggested sample content: `src/content/writing/first-essay.mdx`

```mdx
---
title: "The Shape of Useful Systems"
excerpt: "Thoughts on building systems that serve people instead of impressing them."
publishDate: 2026-04-06
tags:
  - systems
  - design
category: "Writing"
draft: false
seoTitle: "The Shape of Useful Systems"
seoDescription: "Thoughts on building systems that serve people instead of impressing them."
---

Useful systems are often quieter than flashy ones.

A good system reduces friction, makes decisions easier, and stays understandable over time.
```

---

## 25. Suggested sample content: `src/content/products/lab-in-a-box-local-ai.mdx`

```mdx
---
title: "Lab-in-a-Box: Local AI"
productLine: "lab-in-a-box"
summary: "A practical local AI stack designed to get useful work done quickly."
status: "draft"
audience:
  - solo operators
  - homelab users
  - technical founders
priceNote: "Details coming soon"
ctaLabel: "Contact Gregory"
ctaUrl: "/contact/"
features:
  - local-first approach
  - practical setup guidance
  - focused on useful workflows
relatedProducts: []
draft: false
seoTitle: "Lab-in-a-Box: Local AI"
seoDescription: "A practical local AI stack designed to get useful work done quickly."
---

Lab-in-a-Box: Local AI is a practical package for people who want useful local AI without unnecessary complication.
```

---

## 26. Suggested sample content: `src/content/products/directorybase-overview.mdx`

```mdx
---
title: "DirectoryBase Overview"
productLine: "directorybase"
summary: "A structured foundation for directory-style sites and products."
status: "draft"
audience:
  - publishers
  - niche site builders
  - directory operators
priceNote: "Details coming soon"
ctaLabel: "Get in Touch"
ctaUrl: "/contact/"
features:
  - clear structure
  - repeatable content model
  - built for maintainability
relatedProducts: []
draft: false
seoTitle: "DirectoryBase Overview"
seoDescription: "A structured foundation for directory-style sites and products."
---

DirectoryBase is a practical foundation for directory-oriented web properties and related products.
```

---

## 27. Suggested sample content: `src/content/photosets/selected-work.mdx`

```mdx
---
title: "Selected Work"
summary: "A starting point for curated photography on the site."
location: "Various"
subject: "People, places, and animals"
featured: true
draft: false
seoTitle: "Selected Work"
seoDescription: "A starting point for curated photography on the site."
---

This page can become the first curated photography story or portfolio entry.
```

---

## 28. Suggested `src/styles/global.css`

```css
:root {
  --bg: #ffffff;
  --text: #111111;
  --muted: #666666;
  --border: #dddddd;
  --accent: #1d4ed8;
  --max-width: 72rem;
  --radius: 0.75rem;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
}

* {
  box-sizing: border-box;
}

html {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  color: var(--text);
  background: var(--bg);
}

body {
  margin: 0;
}

img {
  max-width: 100%;
  display: block;
}

.container {
  width: min(100% - 2rem, var(--max-width));
  margin-inline: auto;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.site-header,
.site-footer {
  border-bottom: 1px solid var(--border);
  padding: var(--space-2) 0;
}

.site-footer {
  border-top: 1px solid var(--border);
  border-bottom: none;
  margin-top: var(--space-4);
}

.brand {
  font-weight: 700;
  text-decoration: none;
  color: inherit;
}

.nav-list {
  display: flex;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.nav-list a {
  text-decoration: none;
  color: inherit;
}

.hero-block,
.section-hero,
.section-body,
.prose-wrap,
.product-page {
  padding: var(--space-4) 0;
}

.lede {
  font-size: 1.125rem;
  color: var(--muted);
  max-width: 42rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: var(--space-2);
  padding-bottom: var(--space-4);
}

.card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-3);
  text-decoration: none;
  color: inherit;
}

.button {
  display: inline-block;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  background: var(--accent);
  color: white;
  text-decoration: none;
}

.article-meta {
  color: var(--muted);
  font-size: 0.95rem;
}
```

---

## 29. Suggested `public/robots.txt`

```txt
User-agent: *
Allow: /

Sitemap: https://gregorydcollins.com/sitemap-index.xml
```

---

## 30. Suggested build notes for Cloudflare Pages

Use these values in Cloudflare Pages:

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`

These values align with Cloudflare’s Astro Pages deployment guidance and Astro’s standard build output. ([developers.cloudflare.com](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [docs.astro.build](https://docs.astro.build/en/basics/project-structure/))

---

## 31. Direct instruction block for Codex or another coding model

Use this starter pack together with the architecture handoff.

Build the first working Astro implementation for gregorydcollins.com.

Requirements:
- keep the site static-first
- use the collection schemas provided here
- implement the pages and routes listed here
- keep code readable and minimal
- do not add a CMS, auth, database, or unnecessary frontend frameworks
- make the site build cleanly for GitHub-to-Cloudflare Pages deployment

If current Astro behavior requires a small change, preserve the intent and note the change clearly.

