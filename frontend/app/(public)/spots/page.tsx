import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/web/blocks/Hero';
import { Button } from '@/components/ui/button';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { PLACEHOLDER_IMG } from '@/lib/utils';
import { range } from '@/lib/cms-utils';
import { RegionsList } from './_components/RegionsList';

export const metadata: Metadata = {
  title: 'Surf Spots in New Zealand',
  description:
    'Discover the best surf spots across New Zealand — from the point breaks of Raglan to the reefs of Taranaki and beyond.',
  alternates: { canonical: '/spots' },
};

export default async function SpotsPage() {
  const c = await getPageContent('spots');
  const { v, img } = readContent(c);

  const regions = range(5)
    .map((r) => ({
      name: v(`spots_region_${r}_name`),
      intro: v(`spots_region_${r}_intro`),
      ctaLabel: v(`spots_region_${r}_cta_label`),
      ctaHref: v(`spots_region_${r}_cta_href`, '/new-zealand-surf-trips'),
      spots: range(4).map((s) => ({
        id: s,
        image: img(`spots_region_${r}_spot_${s}_image`, PLACEHOLDER_IMG),
      })),
    }))
    .filter((region) => region.name);

  return (
    <>
      <Hero
        title={v('spots_hero_title', 'Surf Spots in New Zealand')}
        subtitle={v('spots_hero_subtitle', '3,000 km of coastline. A wave for every level.')}
        backgroundImage={img('spots_hero_image', PLACEHOLDER_IMG)}
        alt={v('spots_hero_image_alt', '')}
        primaryButton={{ text: 'Book a lesson in Raglan', href: '/book-surf-lesson', show: true }}
        secondaryButton={{ text: 'Plan a custom surf trip', href: '/new-zealand-surf-trips', show: true }}
      />

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            {v('spots_intro_eyebrow', 'Aotearoa New Zealand')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {v('spots_intro_title', 'A region-by-region guide')}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{v('spots_intro_desc', '')}</p>
        </div>
      </section>

      <RegionsList regions={regions} />

      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            {v('spots_cta_title', 'Ready to discover New Zealand by surf?')}
          </h2>
          <p className="text-muted-foreground mb-8">{v('spots_cta_desc', '')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/book-surf-lesson">Book a lesson in Raglan</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/new-zealand-surf-trips">Plan a custom surf trip →</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
