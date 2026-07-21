import type { Metadata } from 'next';
import Hero from '@/components/web/blocks/Hero';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { PLACEHOLDER_IMG } from '@/lib/utils';
import { BookingWizard } from './_components/BookingWizard';

export const metadata: Metadata = {
  title: 'Book a Surf Lesson in Raglan',
  description: 'See upcoming surf lesson dates in Raglan and book your session online.',
  alternates: { canonical: '/book-surf-lesson' },
};

export default async function BookSurfLessonPage() {
  const c = await getPageContent('book-surf-lesson');
  const { v, img } = readContent(c);

  return (
    <div className="min-h-screen">
      <Hero
        title={v('book_hero_title', 'Book a Surf Lesson')}
        subtitle={v('book_hero_subtitle', 'Raglan, New Zealand')}
        backgroundImage={img('book_hero_image', PLACEHOLDER_IMG)}
        alt={v('book_hero_image_alt', '')}
        size="medium"
      />

      <section className="relative overflow-hidden bg-muted/40 border-t">
        <BookingWizard />
      </section>
    </div>
  );
}
