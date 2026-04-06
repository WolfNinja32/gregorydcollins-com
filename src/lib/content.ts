import type { CollectionEntry } from 'astro:content';
import { getCollection, getEntry } from 'astro:content';

export async function getPage(id: string) {
  return getEntry('pages', id);
}

export async function getPublishedWriting() {
  const entries = await getCollection('writing', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getProductsByLine(productLine: CollectionEntry<'products'>['data']['productLine']) {
  const entries = await getCollection('products', ({ data }) => !data.draft && data.productLine === productLine);
  return entries.sort((a, b) => (b.data.publishDate?.getTime() ?? 0) - (a.data.publishDate?.getTime() ?? 0));
}

export async function getPublishedBooks() {
  const entries = await getCollection('books', ({ data }) => !data.draft);
  return entries.sort((a, b) => (b.data.publishDate?.getTime() ?? 0) - (a.data.publishDate?.getTime() ?? 0));
}

export async function getPublishedPhotosets() {
  const entries = await getCollection('photosets', ({ data }) => !data.draft);
  return entries.sort((a, b) => Number(b.data.featured) - Number(a.data.featured));
}
