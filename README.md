# GregoryDCollins.com

Static-first Astro site for Gregory Collins, designed for GitHub-to-Cloudflare Pages deployment.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Cloudflare Pages

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`

## Notes

This first pass intentionally avoids a CMS, auth, database, and heavy client-side frameworks.

The main Astro v6-era adjustments from the original handoff are:

1. Content collections use the Content Layer API with explicit `loader` declarations.
2. Collection entry `id` is used as the route slug, so `slug` was removed from schemas.
