import type { Metadata } from 'next';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { ContactForm } from '@/components/web/blocks/ContactForm';
import Hero from '@/components/web/blocks/Hero';
import { SpotsSection } from './_sections/SpotsSection';
import { PLACEHOLDER_IMG } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Plan Your Surf Trip in New Zealand | ALAIA Surf Coach',
  description:
    "Tell us about your level and what you're looking for — we'll design a custom surf trip just for you.",
};

export default async function SurfTripRequestPage() {
  const [c, cSpots] = await Promise.all([
    getPageContent('surf-trip'),
    getPageContent('spots'),
  ]);
  const { v, img } = readContent(c);
  const { v: vs, img: imgs } = readContent(cSpots);

  const spots = [1, 2, 3, 4].map((n) => ({
    id: n,
    name: vs(`spots_card_${n}_name`),
    region: vs(`spots_card_${n}_region`),
    type: vs(`spots_card_${n}_type`),
    level: vs(`spots_card_${n}_level`),
    desc: vs(`spots_card_${n}_desc`),
    image: imgs(`spots_card_${n}_image`, PLACEHOLDER_IMG),
  })).filter((s) => s.name);

  return (
    <>
      <Hero
        title={v('surf_trip_hero_title', 'Plan your custom surf trip')}
        subtitle={v('surf_trip_hero_subtitle', "Tell us about your level and what you're looking for.")}
        backgroundImage={img('snz_hero_image', '/assets/surfers-paddling.webp')}
        size="medium"
      />

      <SpotsSection spots={spots} />

      <div id="plan-trip" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Plan your trip</h2>
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
