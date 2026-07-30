import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

const API_URL = process.env.BACKEND_URL
  ? `${process.env.BACKEND_URL}/api`
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api';

// Called by the admin lesson catalog editor right after a successful PATCH, so the
// public /surf-lessons, /surf-packages, /surf-in-new-zealand pages (tagged 'lessons')
// pick up the change immediately instead of waiting on the fetch cache to expire.
export async function POST(request: Request) {
  const cookie = request.headers.get('cookie') ?? '';

  const meRes = await fetch(`${API_URL}/auth/me`, {
    headers: { Cookie: cookie },
    cache: 'no-store',
  });
  if (!meRes.ok) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { data: user } = await meRes.json();
  if (user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  // 'max' = the fallback expiry window between on-demand revalidations; the tag call itself
  // is what actually refreshes the pages immediately after a catalog edit.
  revalidateTag('lessons', 'max');
  return NextResponse.json({ revalidated: true });
}
