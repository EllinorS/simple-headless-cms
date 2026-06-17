import type { Metadata } from 'next';
import Hero from '@/components/web/blocks/Hero';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { LessonsSection } from './_sections/LessonsSection';
import { PackagesSection } from './_sections/PackagesSection';
import { TripsSection } from './_sections/TripsSection';

export const metadata: Metadata = {
  title: 'Surf in New Zealand | ALAIA Surf Coach',
  description:
    'Surf lessons, packages and custom surf trips in New Zealand with ALAIA Surf Coach. Based in Raglan.',
};

export default async function SurfInNewZealandPage() {
  const c = await getPageContent('surf-in-new-zealand');
  const cGlobal = await getPageContent('global');
  const { v, img } = readContent(c);
  const { v: vg } = readContent(cGlobal);

  // Prices from global CMS
  const priceSingle = Number(vg('global_price_group_adults')) || 60;
  const pricePack3 = Number(vg('global_price_pack_3')) || 160;
  const pricePack5 = Number(vg('global_price_pack_5')) || 250;

  const pricingCards = [
    { sessions: 1, price: priceSingle, per: priceSingle, label: 'Single session', accent: false },
    {
      sessions: 3,
      price: pricePack3,
      per: Math.round(pricePack3 / 3),
      label: 'Package',
      accent: true,
    },
    {
      sessions: 5,
      price: pricePack5,
      per: Math.round(pricePack5 / 5),
      label: 'Best value',
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
      <LessonsSection v={v} />
      <PackagesSection v={v} pricingCards={pricingCards} />
      <TripsSection v={v} />
    </>
  );
}
