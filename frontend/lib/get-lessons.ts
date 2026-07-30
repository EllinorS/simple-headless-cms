import type { Lesson } from './types';
import { apiClient } from './api-client';

// Fetches active lessons from the backend. Returns null on failure to distinguish from an empty catalog.
export async function getLessons(): Promise<Lesson[] | null> {
  try {
    return await apiClient.get('/lessons/public', { next: { tags: ['lessons'] } });
  } catch (err) {
    console.error('[getLessons] fetch failed:', err instanceof Error ? err.message : err);
    return null;
  }
}
