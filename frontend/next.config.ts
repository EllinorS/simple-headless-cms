import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxies /api/* to the Render backend so the browser only ever talks to this
  // domain: the auth cookie (Set-Cookie from the proxied response) then gets
  // scoped to this same origin instead of the backend's own domain, which is
  // required for the admin login cookie to be visible to this app's middleware.
  async rewrites() {
    if (!process.env.BACKEND_URL) return [];
    return [{ source: '/api/:path*', destination: `${process.env.BACKEND_URL}/api/:path*` }];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://res.cloudinary.com",
              "media-src 'self' https://res.cloudinary.com",
              "connect-src 'self'" + (process.env.NEXT_PUBLIC_API_URL?.startsWith('http') ? " " + new URL(process.env.NEXT_PUBLIC_API_URL).origin : ""),
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "object-src 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3005',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3005',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;