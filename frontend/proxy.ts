import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// blocks unauthenticated visits to admin UI before page load.
export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
