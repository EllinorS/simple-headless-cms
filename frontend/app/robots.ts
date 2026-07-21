import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3002';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/login', '/reset-password', '/manage-booking'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
