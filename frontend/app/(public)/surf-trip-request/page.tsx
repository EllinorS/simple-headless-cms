import type { Metadata } from 'next';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { ContactForm } from '@/components/web/blocks/ContactForm';
import Hero from '@/components/web/blocks/Hero';

export const metadata: Metadata = {
  title: 'Plan Your Surf Trip in New Zealand | ALAIA Surf Coach',
  description:
    "Tell us about your level and what you're looking for — we'll design a custom surf trip just for you.",
};

export default async function SurfTripRequestPage() {
  const c = await getPageContent('surf-trip');
  const { v, img } = readContent(c);

  return (
    <>
      <Hero
        title={v('surf_trip_hero_title', 'Plan your custom surf trip')}
        subtitle={v('surf_trip_hero_subtitle', 'Tell us about your level and what you\'re looking for.')}
        backgroundImage={img('snz_hero_image', '/assets/surfers-paddling.webp')}
        size="medium"
      />
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-12">
            We&apos;ll get back to you with a custom surf trip plan tailored to your level and goals.
          </p>
          <ContactForm
            source="Surf Trip Request"
            messagePlaceholder="Your level, dates, who's coming, what you're looking for..."
          />
        </div>
      </div>
    </>
  );
}
