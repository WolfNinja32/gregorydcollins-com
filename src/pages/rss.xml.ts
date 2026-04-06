import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@/lib/site';

export const GET: APIRoute = async (context) => {
  const writing = (await getCollection('writing', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  return rss({
    title: `${SITE.title} — Writing`,
    description: SITE.description,
    site: context.site ?? SITE.siteUrl,
    items: writing.map((entry) => ({
      title: entry.data.title,
      description: entry.data.excerpt,
      pubDate: entry.data.publishDate,
      link: `/writing/${entry.id}/`,
    })),
  });
};
