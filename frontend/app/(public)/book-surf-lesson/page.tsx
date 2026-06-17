import type { Metadata } from 'next';
import Hero from '@/components/web/blocks/Hero';
import { ContactForm } from '@/components/web/blocks/ContactForm';
import { BusAccent } from '@/components/web/blocks/BusAccent';
import { WeekCalendar } from './_components/WeekCalendar';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { getSessions } from '@/lib/get-sessions';
import { PLACEHOLDER_IMG } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Book a Surf Lesson in Raglan | ALAIA Surf Coach',
  description: 'See upcoming surf lesson dates in Raglan and get in touch to book your session.',
};

export default async function BookSurfLessonPage() {
  const c = await getPageContent('book-surf-lesson');
  const { v, img } = readContent(c);
  const sessions = await getSessions();

  return (
    <div className="min-h-screen">
      <Hero
        title={v('book_hero_title', 'Book a Surf Lesson')}
        subtitle={v('book_hero_subtitle', 'Raglan, New Zealand')}
        backgroundImage={img('book_hero_image', PLACEHOLDER_IMG)}
        alt={v('book_hero_image_alt', '')}
        size="medium"
      />

      {/* Weekly session calendar */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold mb-8">
            {v('book_schedule_title', 'Upcoming Lessons')}
          </h2>
          {sessions === null ? (
            <p className="text-sm text-muted-foreground py-4">
              There seems to be an error loading sessions. Get in touch to arrange a lesson.
            </p>
          ) : (
            <WeekCalendar
              sessions={sessions}
              emptyMessage="No sessions scheduled right now, get in touch to arrange a lesson."
            />
          )}
          <p className="text-xs text-muted-foreground mt-4">
            Kids: 12 and under · Adults: 13 and over
          </p>
        </div>
      </section>

      {/* id="contact-form" allows session cards to scroll directly to this section via href="#contact-form" */}
      <section
        id="contact-form"
        className="relative overflow-hidden bg-muted/40 border-t py-20 px-4"
      >
        <BusAccent color="green" side="left" width={300} className="opacity-[0.07]" />

        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">
              {v('book_contact_title', 'Book or Ask a Question')}
            </h2>
            <p className="text-muted-foreground">
              {v(
                'book_contact_desc',
                "Ready to get in the water? Send us a message and we'll confirm your session.",
              )}
            </p>
          </div>

          <ContactForm
            source="Booking Page"
            messagePlaceholder="Please let us know which date and lesson type you're interested in."
          />
        </div>
      </section>
    </div>
  );
}
