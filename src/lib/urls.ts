import { SITE } from './site';

export function absoluteUrl(path = '/') {
  return new URL(path, SITE.siteUrl).toString();
}
