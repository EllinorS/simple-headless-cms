import { ContentItem } from './types';
import { apiClient } from './api-client';

// Dictionary of all content items for a page, indexed by key_name
export type PageContent = Record<string, ContentItem>;
// Fetches all content for a given page from the backend and returns it as a PageContent dict
export async function getPageContent(page: string): Promise<PageContent> {
  try {
    const items = await apiClient.get(`/content/page/${page}`, { next: { revalidate: 60 } });
    if (!Array.isArray(items)) return {};
    // dictionary keyed by keyName for easy access in component
    return Object.fromEntries((items as ContentItem[]).map((i) => [i.keyName, i]));
  } catch (err) {
    console.error(
      '[getPageContent] fetch failed for page',
      page,
      err instanceof Error ? err.message : err,
    );
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
