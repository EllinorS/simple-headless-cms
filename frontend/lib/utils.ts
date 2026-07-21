import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merges Tailwind classes safely — resolves conflicts (e.g. p-2 + p-4 → p-4)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fallback image
export const PLACEHOLDER_IMG = '/assets/surfboards-under-flax.webp';

// Regex checks if URL ends with video info. Returns true of false
export function isVideo(url: string): boolean {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

// Injects q_auto:eco into Cloudinary video URLs to reduce payload size
export function optimizeCloudinaryVideo(url: string): string {
  if (!url.includes('res.cloudinary.com')) return url;
  return url.replace('/upload/', '/upload/q_auto:eco/');
}

// Derives a JPG still-frame poster from a Cloudinary video URL (swaps the video extension for .jpg)
export function cloudinaryVideoPoster(url: string): string | undefined {
  if (!url.includes('res.cloudinary.com')) return undefined;
  return url.replace(/\.(mp4|webm|ogg)$/i, '.jpg');
}
