import type { Session } from './types';
import { apiClient } from './api-client';

// Fetches sessions from the backend. Returns null on failure to distinguish from empty schedule.
export async function getSessions(): Promise<Session[] | null> {
  try {
    return await apiClient.get('/sessions/public', { cache: 'no-store' });
  } catch (err) {
    console.error('[getSessions] fetch failed:', err instanceof Error ? err.message : err);
    return null;
  }
}
