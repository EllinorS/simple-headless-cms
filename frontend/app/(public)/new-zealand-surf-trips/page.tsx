import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/web/blocks/Hero';
import { Button } from '@/components/ui/button';
import { BusAccent } from '@/components/web/blocks/BusAccent';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { PLACEHOLDER_IMG } from '@/lib/utils';
import { range } from '@/lib/cms-utils';
import { StepsBlock } from './_components/StepsBlock';
import { IncludedBlock } from './_components/IncludedBlock';
import { DestinationsBlock } from './_components/DestinationsBlock';

export const metadata: Metadata = {
  title: 'Custom Surf Trips in New Zealand',
  description:
    'Plan a personalised surf road trip across New Zealand, tailored to your level and goals, with coaching every step of the way.',
  alternates: { canonical: '/new-zealand-surf-trips' },
};

export default async function NewZealandSurfTripsPage() {
  const c = await getPageContent('new-zealand-surf-trips');
  const { v, img } = readContent(c);

  const included = range(4)
    .map((n) => v(`surf_trips_included_i${n}`))
    .filter(Boolean);

  const steps = range(3)
    .map((n) => ({
      step: `0${n}`,
      title: v(`surf_trips_step_${n}_title`),
      desc: v(`surf_trips_step_${n}_desc`),
    }))
    .filter((s) => s.title);

  const features = range(4)
    .map((n) => ({
      label: v(`surf_trips_feat_${n}_title`),
      sub: v(`surf_trips_feat_${n}_sub`),
    }))
    .filter((f) => f.label);

  const destinations = range(4).map((n) => ({
    id: n,
    image: img(`surf_trips_dest_${n}_image`, PLACEHOLDER_IMG),
  }));

  return (
    <>
      <Hero
        title={v('surf_trips_hero_title', 'Custom Surf Trips in New Zealand')}
        subtitle={v('surf_trips_hero_subtitle', 'A personalised surf road trip, tailored to your level and goals')}
        backgroundImage={img('surf_trips_hero_image', PLACEHOLDER_IMG)}
        alt={v('surf_trips_hero_image_alt', '')}
        primaryButton={{ text: 'Plan my trip →', href: '/surf-trip-request', show: true }}
        secondaryButton={{ text: 'Ask a question', href: '/contact', show: true }}
      />

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            {v('surf_trips_intro_eyebrow', 'New Zealand, your way')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {v('surf_trips_intro_title', 'More than a surf trip — a coaching adventure')}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {v('surf_trips_intro_desc', '')}
          </p>
        </div>
      </section>

      <StepsBlock
        title={v('surf_trips_how_title', 'How it works')}
        desc={v('surf_trips_how_desc', '')}
        steps={steps}
      />

      <IncludedBlock
        eyebrow={v('surf_trips_included_eyebrow', "What's included")}
        title={v('surf_trips_included_title', "Everything you need, nothing you don't")}
        items={included}
        features={features}
      />

      <DestinationsBlock
        title={v('surf_trips_dest_title', 'Where we surf')}
        desc={v('surf_trips_dest_desc', '')}
        destinations={destinations}
      />

      <section className="relative overflow-hidden py-20 px-4">
        <BusAccent color="green" side="left" width={340} className="hidden md:block opacity-[0.06]" />
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">{v('surf_trips_cta_title', 'Ready to chase waves?')}</h2>
          <p className="text-muted-foreground mb-8">{v('surf_trips_cta_desc', '')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/surf-trip-request">Start the quiz →</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Ask a question</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
