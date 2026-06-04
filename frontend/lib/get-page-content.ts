import { ContentItem } from './types';
import { Cloudinary } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

// Dictionary of all content items for a page, indexed by key_name
export type ContentMap = Record<string, ContentItem>;

const cld = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
});

// Fetches all content for a given page from the backend and returns it as a ContentMap
export async function getPageContent(page: string): Promise<ContentMap> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/page/${page}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};

    // dictionary keyed by keyName 
    const body = await res.json();
    const items = body?.data ?? body;
    if (!Array.isArray(items)) return {};
    return Object.fromEntries((items as ContentItem[]).map((i) => [i.keyName, i]));
  } catch {
    return {};
  }
}

export function readContent(c: ContentMap) {
  // Gets a text value by key — returns fallback if not found
  function v(key: string, fallback = '') {
    return c[key]?.value || fallback;
  }

  function img(key: string, fallback = '') {
  const value = c[key]?.value;
  if (!value) return fallback;
  // if already a full URL, return as-is
  if (value.startsWith('http')) return value;
  return cld.image(value).delivery(format(autoFormat())).delivery(quality(autoQuality())).toURL();
}

  return { v, img };
}
