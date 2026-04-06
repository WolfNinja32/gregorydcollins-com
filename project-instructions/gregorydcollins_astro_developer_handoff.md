# GregoryDCollins.com — Astro Developer Handoff

## Purpose

This document is the implementation handoff for rebuilding or building **gregorydcollins.com** in **Astro** as a fast, content-first, static-first website that supports several business lines under one personal brand.

It is written to be usable by:
- Codex or another cloud coding agent
- a local coding model
- a human developer

The goal is to make the first implementation pass clear, constrained, and practical.

---

## 1. Executive summary

Build **one Astro site**, not several separate sites.

Primary reasons:
- one personal brand umbrella
- one design system
- one deployment flow
- easier SEO and internal linking
- simpler long-term maintenance

The site should be:
- static-first
- content-driven
- image-aware but not dependent on heavy dynamic infrastructure
- modular enough to support future growth

Initial deployment target:
- **Cloudflare Pages** using Astro static output

Future upgrade path if needed:
- **Cloudflare Workers** for dynamic or server-rendered features

---

## 2. Project goals

### Primary goals
- Present Gregory Collins clearly as a credible technical and creative professional
- Organize multiple business lines without confusion
- Support writing, product pages, photography, and future books
- Keep the codebase clean enough for AI-assisted development
- Minimize complexity in version 1

### Secondary goals
- Strong SEO structure
- Good performance
- Easy content updates from local files
- Easy deployment from GitHub to Cloudflare Pages

### Explicit non-goals for v1
- full CMS
- user accounts
- gated dashboards
- server-side personalization
- complex search backend
- heavy frontend application behavior

---

## 3. Site model

Treat the website as **one personal brand site** with several major sections.

### Top-level sections
- Home
- About
- Photography
- Books
- Lab-in-a-Box
- DirectoryBase
- Writing
- Contact

These should exist as first-class sections in navigation, routing, and content organization.

---

## 4. Information architecture

### Core URL structure

```text
/
/about/
/photography/
/photography/[slug]/
/books/
/books/[slug]/
/lab-in-a-box/
/lab-in-a-box/[slug]/
/directorybase/
/directorybase/[slug]/
/writing/
/writing/[slug]/
/contact/
```

### Routing principles
- Keep URLs short and human-readable
- Use section-based routing, not arbitrary content buckets
- Use dynamic routes only where there are repeated content entries
- Keep slugs stable once published

---

## 5. Astro strategy

### Build approach
Use **Astro static output by default**.

### Why Astro is a fit
- strong for content-heavy websites
- file-based routing
- Markdown/MDX support
- content collections for structured content
- selective hydration for minimal JavaScript

### JavaScript policy
Default to **very little client JavaScript**.
Only hydrate components where real interaction is needed.

Examples where client islands are acceptable:
- gallery lightbox
- image filtering
- search box
- contact form enhancement

Do not build the whole site as a React-style app.

---

## 6. Deployment strategy

### Initial deployment target
- GitHub repository
- Cloudflare Pages
- static build output

### Expected flow
- local development
- commit to local repo
- push to GitHub
- Cloudflare Pages deploy from GitHub

### Future migration trigger
Move selective features to Cloudflare Workers only if the site later requires:
- authenticated areas
- API endpoints
- protected downloads
- dynamic search
- server-side logic

---

## 7. Recommended project structure

```text
gregorydcollins-com/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── social/
│   │   ├── og-default.jpg
│   │   ├── og-lab-in-a-box.jpg
│   │   ├── og-directorybase.jpg
│   │   └── og-photography.jpg
│   └── fonts/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── branding/
│   │   │   ├── photography/
│   │   │   ├── products/
│   │   │   └── books/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── site/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Nav.astro
│   │   │   └── SEOHead.astro
│   │   ├── content/
│   │   │   ├── Hero.astro
│   │   │   ├── SectionIntro.astro
│   │   │   ├── CardGrid.astro
│   │   │   ├── CTA.astro
│   │   │   ├── QuoteBlock.astro
│   │   │   └── Prose.astro
│   │   ├── products/
│   │   │   ├── ProductCard.astro
│   │   │   ├── ProductFeatureList.astro
│   │   │   └── ProductCTA.astro
│   │   ├── writing/
│   │   │   ├── ArticleCard.astro
│   │   │   └── ArticleMeta.astro
│   │   └── photography/
│   │       ├── PhotoGrid.astro
│   │       ├── PhotoStoryHeader.astro
│   │       └── GalleryLightbox.tsx
│   │
│   ├── content/
│   │   ├── pages/
│   │   │   ├── home.mdx
│   │   │   ├── about.mdx
│   │   │   ├── photography.mdx
│   │   │   ├── books.mdx
│   │   │   ├── lab-in-a-box.mdx
│   │   │   ├── directorybase.mdx
│   │   │   ├── writing.mdx
│   │   │   └── contact.mdx
│   │   ├── writing/
│   │   ├── products/
│   │   ├── books/
│   │   ├── photosets/
│   │   └── authors/
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── SectionLayout.astro
│   │   ├── ArticleLayout.astro
│   │   ├── ProductLayout.astro
│   │   └── GalleryLayout.astro
│   │
│   ├── lib/
│   │   ├── site.ts
│   │   ├── seo.ts
│   │   ├── urls.ts
│   │   └── content.ts
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── photography/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── books/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── lab-in-a-box/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── directorybase/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── writing/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── 404.astro
│   │   ├── rss.xml.ts
│   │   └── sitemap-index.xml.ts
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── tokens.css
│   │   └── prose.css
│   │
│   └── content.config.ts
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

## 8. Layout plan

### BaseLayout
Use for:
- home
- about
- contact
- general standalone pages

Responsibilities:
- page shell
- site header/footer
- global styles
- base metadata
- canonical URL

### SectionLayout
Use for:
- Photography landing
- Books landing
- Lab-in-a-Box landing
- DirectoryBase landing
- Writing landing

Responsibilities:
- section hero
- intro copy
- optional featured content block
- consistent section-level presentation

### ArticleLayout
Use for:
- writing entries
- essays
- long-form articles

Responsibilities:
- title and metadata
- readable typography
- tags/category display
- related articles

### ProductLayout
Use for:
- Lab-in-a-Box products
- DirectoryBase products
- future digital offers

Responsibilities:
- product summary
- feature list
- CTA
- FAQ or implementation notes
- related products

### GalleryLayout
Use for:
- photography stories
- curated image sets

Responsibilities:
- cover image
- story intro
- metadata
- gallery grid
- optional lightbox island

---

## 9. Content collections

Use Astro content collections for all repeatable structured content.

### Collection: `pages`
Purpose:
- editable section and landing-page content

Suggested fields:
- title
- description
- heroTitle
- heroSummary
- heroImage
- draft
- seoTitle
- seoDescription
- ogImage

### Collection: `writing`
Purpose:
- essays, articles, notes, thought pieces

Suggested fields:
- title
- slug
- excerpt
- publishDate
- updatedDate
- tags
- category
- featuredImage
- draft
- seoTitle
- seoDescription
- author

### Collection: `products`
Purpose:
- product pages under Lab-in-a-Box and DirectoryBase

Suggested fields:
- title
- slug
- productLine
- summary
- status
- audience
- priceNote
- ctaLabel
- ctaUrl
- features
- relatedProducts
- featuredImage
- publishDate
- updatedDate
- draft
- seoTitle
- seoDescription

Allowed `productLine` values:
- lab-in-a-box
- directorybase
- other

### Collection: `books`
Purpose:
- current and future books

Suggested fields:
- title
- slug
- subtitle
- summary
- status
- coverImage
- purchaseUrl
- sampleUrl
- publishDate
- updatedDate
- draft
- seoTitle
- seoDescription

### Collection: `photosets`
Purpose:
- photography stories and curated gallery pages

Suggested fields:
- title
- slug
- summary
- location
- subject
- captureDate
- coverImage
- gallery
- featured
- draft
- seoTitle
- seoDescription

---

## 10. Example `content.config.ts`

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

## 11. Page behavior by section

### Home
Purpose:
- explain who Gregory Collins is
- present the main areas of work
- give clear paths into each business line
- establish credibility quickly

Suggested content blocks:
- hero
- short positioning statement
- section cards
- featured writing
- featured product
- featured photography story
- contact CTA

### About
Purpose:
- provide background and credibility
- connect technical and creative experience
- show that the range is real, not random

### Photography
Purpose:
- present selected work with story and context
- avoid a chaotic gallery dump

### Books
Purpose:
- support authority and future discoverability
- provide detail pages when titles exist

### Lab-in-a-Box
Purpose:
- explain product family clearly
- position digital products in a practical way
- direct visitors to product detail pages

### DirectoryBase
Purpose:
- explain the concept and use cases clearly
- support future products or services in that category

### Writing
Purpose:
- support thought leadership and search traffic
- show clarity of thinking and personal voice

### Contact
Purpose:
- make it easy to reach Gregory Collins
- avoid clutter

---

## 12. Component plan for v1

Create a limited, reusable component library.
Do not overbuild.

### Required site shell components
- Header.astro
- Footer.astro
- Nav.astro
- SEOHead.astro

### Required content components
- Hero.astro
- SectionIntro.astro
- CardGrid.astro
- CTA.astro
- QuoteBlock.astro
- Prose.astro

### Product components
- ProductCard.astro
- ProductFeatureList.astro
- ProductCTA.astro

### Writing components
- ArticleCard.astro
- ArticleMeta.astro

### Photography components
- PhotoGrid.astro
- PhotoStoryHeader.astro
- GalleryLightbox.tsx (optional in v1)

---

## 13. Styling system

### Recommendation
Use either:
- Astro + plain CSS with design tokens
- Astro + Tailwind only if the developer strongly prefers it

Either is acceptable. For maintainability and AI-assisted generation, plain CSS with clear naming is often easier to reason about.

### Styling principles
- restrained, professional visual tone
- generous whitespace
- strong typography
- consistent spacing scale
- reusable card styles
- minimal motion

### Files
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/prose.css`

### Required design tokens
At minimum:
- colors
- typography scale
- spacing scale
- border radius scale
- max-widths
- shadow values

---

## 14. Content authoring rules

### Use Markdown when:
- content is simple prose
- no embedded custom components are required

### Use MDX when:
- a landing page needs embedded components
- a product page needs custom callouts or CTA blocks
- a writing page needs richer presentation

### Content rules
- stable frontmatter fields
- no ad hoc metadata
- no duplicate copies of the same content in multiple folders
- keep filenames slug-safe

---

## 15. Image strategy

This site is photography-aware, so image handling matters.

### Rules
- keep original masters outside the site repo
- store only web-ready derivatives in the project
- optimize images before committing where practical
- use consistent folder organization by content type
- do not make the build pipeline depend on a fragile image-processing workflow

### Organization
- branding images in `src/assets/images/branding/`
- product images in `src/assets/images/products/`
- book covers in `src/assets/images/books/`
- site photography in `src/assets/images/photography/`

---

## 16. SEO and metadata

Every page should support:
- title
- meta description
- canonical URL
- Open Graph image
- structured layout-level SEO defaults

Writing entries should also support:
- publish date
- updated date
- tags or category

### Required outputs
- sitemap
- RSS feed for writing
- robots.txt

---

## 17. Suggested initial content set

Do not launch with empty sections.

### Minimum useful launch content
- Home page
- About page
- Contact page
- Photography landing page
- Lab-in-a-Box landing page
- DirectoryBase landing page
- Writing landing page
- 3–5 writing entries
- 2–4 product pages
- 1–2 photo story pages

Books can launch as a light section if content is thin.

---

## 18. Initial implementation priority

### Phase 1 — foundation
Build:
- project structure
- layouts
- site shell
- content collections
- top-level pages
- section landing pages
- one working dynamic route for writing
- one working dynamic route for products

### Phase 2 — content population
Add:
- initial articles
- initial product entries
- initial photography stories
- Open Graph images
- sitemap and RSS

### Phase 3 — polish
Add:
- related content blocks
- image refinement
- optional gallery lightbox
- improved section intros
- accessibility cleanup

### Phase 4 — optional future enhancements
Only if justified:
- contact form backend
- search
- gated downloads
- server-side features

---

## 19. Definition of done for v1

A v1 build is complete when:
- the site builds cleanly in Astro
- static deployment works on Cloudflare Pages
- all major top-level sections exist
- at least one dynamic content collection route works end-to-end
- content collection schema is stable
- metadata is in place
- navigation is complete
- there is no major placeholder clutter
- Lighthouse/performance is reasonable for a content site

---

## 20. Build notes for the coding agent

### Preferred implementation posture
- keep code simple
- prefer readable structure over clever abstractions
- do not over-engineer
- avoid unnecessary client-side frameworks
- use Astro-native patterns first

### Do not do these things in the first pass
- do not add a CMS
- do not add authentication
- do not add a database
- do not add heavy animation libraries
- do not split the repo into multiple sub-sites

### What the coding agent should optimize for
- clean structure
- correctness
- easy hand-editing later
- predictable naming
- content-first performance

---

## 21. Recommended first implementation tasks for Codex or another coding model

1. Scaffold a fresh Astro project.
2. Create the folder structure described in this document.
3. Add `content.config.ts` with the collections defined here.
4. Create `BaseLayout`, `SectionLayout`, `ArticleLayout`, and `ProductLayout`.
5. Create site shell components: header, footer, nav, SEO head.
6. Create content components: hero, card grid, CTA, prose wrapper.
7. Implement top-level pages and section landing pages.
8. Implement dynamic route templates for writing and products.
9. Add sample content entries for writing, products, and pages.
10. Configure metadata defaults and sitemap/RSS generation.
11. Confirm production build output works for Cloudflare Pages.

---

## 22. Suggested starter pages to create first

### Static pages
- `/`
- `/about/`
- `/contact/`
- `/photography/`
- `/lab-in-a-box/`
- `/directorybase/`
- `/writing/`

### Dynamic routes
- `/writing/[slug]/`
- `/lab-in-a-box/[slug]/`
- `/directorybase/[slug]/`
- `/photography/[slug]/`

---

## 23. Recommended repository conventions

### Naming
- kebab-case for filenames and slugs
- PascalCase for component names
- no spaces in file names

### Content
- one logical content entry per file
- frontmatter must match collection schema
- draft content should be clearly marked

### Git
- small, reviewable commits
- keep content commits separate from layout refactors where practical

---

## 24. Final architecture decision

**Decision:** Build gregorydcollins.com as a **single Astro site** using **content collections**, **shared layouts**, **section-based routing**, **minimal client JavaScript**, and **static deployment to Cloudflare Pages**.

This is the recommended baseline. Any move toward Workers, CMS, or more dynamic infrastructure should happen only after the static-first version is complete and proven useful.

---

## 25. Short instruction block for an AI coding agent

Use the contents of this document as the source of truth for the initial implementation.

Build a clean Astro codebase for gregorydcollins.com with:
- one site
- section-based architecture
- content collections for pages, writing, products, books, and photosets
- shared layouts
- top-level pages and dynamic content routes
- static-first deployment suitable for Cloudflare Pages

Do not add extra infrastructure unless it is required to satisfy the architecture above.

Prefer simple, readable, maintainable code over advanced abstractions.

