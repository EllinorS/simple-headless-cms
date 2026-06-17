import type { Session } from './types';

// Fetches sessions from the backend. Returns null on failure to distinguish from empty schedule.
export async function getSessions(): Promise<Session[] | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/public`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('[getSessions] HTTP', res.status);
      return null;
    }

    // Backend wraps the array in { data: ... } unwrap it (this fetch bypasses api-client).
    const body = await res.json();
    return body?.data ?? body;
  } catch (err) {
    console.error('[getSessions] fetch failed:', err);
    return null;
  }
}
