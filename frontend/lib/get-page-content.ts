import { ContentItem } from './types';

// Dictionary of all content items for a page, indexed by key_name
export type ContentMap = Record<string, ContentItem>;

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
  // Gets a text value by key, returns fallback if not found
  function v(key: string, fallback = '') {
    return c[key]?.value || fallback;
  }

  function img(key: string, fallback = '') {
  const value = c[key]?.value;
  if (!value) return fallback;
  return value;
}

  return { v, img };
}
