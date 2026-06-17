import { ContentItem } from './types';

// Dictionary of all content items for a page, indexed by key_name
export type PageContent = Record<string, ContentItem>;
// Fetches all content for a given page from the backend and returns it as a PageContent dict
export async function getPageContent(page: string): Promise<PageContent> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/page/${page}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error('[getPageContent] HTTP', res.status, 'for page', page);
      return {};
    }
    // dictionary keyed by keyName
    const body = await res.json();
    const items = body?.data ?? body;
    if (!Array.isArray(items)) return {};
    return Object.fromEntries((items as ContentItem[]).map((i) => [i.keyName, i]));
  } catch (err) {
    console.error('[getPageContent] fetch failed for page', page, err);
    return {};
  }
}

export function readContent(c: PageContent) {
  function v(key: string, fallback = '') {
    return c[key]?.value || fallback;
  }
  function img(key: string, fallback = '') {
    return c[key]?.value || fallback;
  }
  return { v, img };
}
