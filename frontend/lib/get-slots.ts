import type { TimeSlot } from './types';
import { apiClient } from './api-client';

// Fetches upcoming, non-cancelled slots. Returns null on failure to distinguish from an empty schedule.
export async function getSlots(): Promise<TimeSlot[] | null> {
  try {
    return await apiClient.get('/slots/public', { cache: 'no-store' });
  } catch (err) {
    console.error('[getSlots] fetch failed:', err instanceof Error ? err.message : err);
    return null;
  }
}
