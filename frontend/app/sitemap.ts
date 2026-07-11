import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3002';

  return [
    { url: `${BASE}`, lastModified: new Date() },
    { url: `${BASE}/about`, lastModified: new Date() },
    { url: `${BASE}/contact`, lastModified: new Date() },
    { url: `${BASE}/book-surf-lesson`, lastModified: new Date() },
    { url: `${BASE}/surf-trip-request`, lastModified: new Date() },
    { url: `${BASE}/surf-in-new-zealand`, lastModified: new Date() },
    { url: `${BASE}/faq`, lastModified: new Date() },
  ];
}
