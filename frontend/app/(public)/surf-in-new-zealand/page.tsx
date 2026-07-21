import type { Metadata } from 'next';
import Hero from '@/components/web/blocks/Hero';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { getLessons } from '@/lib/get-lessons';
import { LessonsSection } from './_sections/LessonsSection';
import { PackagesSection } from './_sections/PackagesSection';
import { TripsSection } from './_sections/TripsSection';
import { SeasonsSection } from './_sections/SeasonsSection';

export const metadata: Metadata = {
  title: 'Surf in New Zealand',
  description:
    'Surf lessons, packages and custom surf trips in New Zealand with ALAIA Surf Coach. Based in Raglan.',
  alternates: { canonical: '/surf-in-new-zealand' },
};

export default async function SurfInNewZealandPage() {
  const c = await getPageContent('surf-in-new-zealand');
  const cGlobal = await getPageContent('global');
  const { v, img } = readContent(c);
  const { v: vg } = readContent(cGlobal);
  const lessons = (await getLessons()) ?? [];

  // Single-lesson price now lives in the lessons catalog; package prices stay CMS-managed.
  const priceSingle = lessons.find((l) => l.title === 'Group - Adults')?.price ?? 60;
  const pricePack3 = Number(vg('global_price_pack_3')) || 160;
  const pricePack5 = Number(vg('global_price_pack_5')) || 250;

  const pricingCards = [
    {
      sessions: 1,
      price: priceSingle,
      per: priceSingle,
      label: vg('global_pkg_1_badge', 'Try it out'),
      accent: false,
    },
    {
      sessions: 3,
      price: pricePack3,
      per: Math.round(pricePack3 / 3),
      label: vg('global_pkg_3_badge', 'Most popular'),
      accent: true,
    },
    {
      sessions: 5,
      price: pricePack5,
      per: Math.round(pricePack5 / 5),
      label: vg('global_pkg_5_badge', 'Best value'),
      accent: false,
    },
  ];

  return (
    <>
      <Hero
        title={v('snz_hero_title', 'Surf in New Zealand')}
        subtitle={v('snz_hero_subtitle')}
        backgroundImage={img('snz_hero_image', '/assets/surfers-paddling.webp')}
        alt={v('snz_hero_image_alt', '')}
      />
      <SeasonsSection v={v} img={img} />
      <LessonsSection v={v} />
      <PackagesSection v={v} pricingCards={pricingCards} />
      <TripsSection v={v} />
    </>
  );
}
