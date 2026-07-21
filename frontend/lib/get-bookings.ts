import type { Booking } from './types';
import { apiClient } from './api-client';

// Admin-scoped (requires auth) — fetches every booking, including cancelled/past. Returns null
// on failure to distinguish from an empty list.
export async function getBookings(): Promise<Booking[] | null> {
  try {
    return await apiClient.get('/bookings');
  } catch (err) {
    console.error('[getBookings] fetch failed:', err instanceof Error ? err.message : err);
    return null;
  }
}
