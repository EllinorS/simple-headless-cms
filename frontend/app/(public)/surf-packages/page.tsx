import type { Metadata } from 'next';
import Hero from '@/components/web/blocks/Hero';
import { TrendingUp, Users, Calendar } from 'lucide-react';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { getLessons } from '@/lib/get-lessons';
import { PLACEHOLDER_IMG } from '@/lib/utils';
import { range } from '@/lib/cms-utils';
import { PricingBlock } from './_components/PricingBlock';
import { WhyBlock } from './_components/WhyBlock';
import { IncludedBlock } from './_components/IncludedBlock';
import { FaqBlock } from './_components/FaqBlock';

export const metadata: Metadata = {
  title: 'Surf Lesson Packages in Raglan',
  description: 'Book a surf lesson package and save. Best value for real progression in Raglan, New Zealand.',
  alternates: { canonical: '/surf-packages' },
};

const WHY_ICONS = [TrendingUp, Users, Calendar];

export default async function SurfPackagesPage() {
  const [c, global] = await Promise.all([getPageContent('surf-packages'), getPageContent('global')]);
  const { v, img } = readContent(c);
  const { v: gv } = readContent(global);
  const lessons = (await getLessons()) ?? [];

  // Single-lesson price now lives in the lessons catalog; package prices stay CMS-managed.
  const priceSingle = lessons.find((l) => l.title === 'Group - Adults')?.price ?? 60;
  const pricePack3 = Number(gv('global_price_pack_3', '160'));
  const pricePack5 = Number(gv('global_price_pack_5', '250'));

  const packages = [
    {
      quantity: 1,
      price: priceSingle,
      badge: gv('global_pkg_1_badge', 'Try it out'),
      accent: false,
      desc: v('surf_packages_pkg_1_desc', ''),
    },
    {
      quantity: 3,
      price: pricePack3,
      badge: gv('global_pkg_3_badge', 'Most popular'),
      accent: true,
      desc: v('surf_packages_pkg_3_desc', ''),
    },
    {
      quantity: 5,
      price: pricePack5,
      badge: gv('global_pkg_5_badge', 'Best value'),
      accent: false,
      desc: v('surf_packages_pkg_5_desc', ''),
    },
  ];

  const whyItems = range(3)
    .map((n, i) => ({
      icon: WHY_ICONS[i],
      title: v(`surf_packages_why_${n}_title`),
      desc: v(`surf_packages_why_${n}_desc`),
    }))
    .filter((w) => w.title);

  const included = range(6)
    .map((n) => v(`surf_packages_incl_i${n}`))
    .filter(Boolean);

  const faqs = range(3)
    .map((n) => ({
      q: v(`surf_packages_faq_${n}_q`),
      a: v(`surf_packages_faq_${n}_a`),
    }))
    .filter((f) => f.q);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Surf Lesson Packages — ALAIA Surf Coach',
    description: 'Group surf lesson packages in Raglan, New Zealand. Book more sessions and save.',
    brand: { '@type': 'Brand', name: 'ALAIA Surf Coach' },
    offers: packages.map((p) => ({
      '@type': 'Offer',
      name: `${p.quantity}-session package`,
      price: p.price,
      priceCurrency: 'NZD',
      availability: 'https://schema.org/InStock',
      url: 'https://www.alaiasurf.co.nz/surf-packages',
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Hero
        title={v('surf_packages_hero_title', 'Surf Lesson Packages')}
        subtitle={v('surf_packages_hero_subtitle', 'Book more sessions, save more, progress faster')}
        backgroundImage={img('surf_packages_hero_image', PLACEHOLDER_IMG)}
        alt={v('surf_packages_hero_image_alt', '')}
        primaryButton={{ text: 'Book a package →', href: '/book-surf-lesson', show: true }}
      />

      <PricingBlock
        eyebrow={v('surf_packages_pricing_eyebrow', 'Simple pricing')}
        title={v('surf_packages_pricing_title', 'Choose your package')}
        desc={v('surf_packages_pricing_desc', '')}
        packages={packages}
      />

      <WhyBlock
        title={v('surf_packages_why_title', 'Why a package works better')}
        desc={v('surf_packages_why_desc', '')}
        items={whyItems}
      />

      <IncludedBlock
        title={v('surf_packages_incl_title', "What's included in every session")}
        desc={v('surf_packages_incl_desc', '')}
        items={included}
      />

      <FaqBlock faqs={faqs} />
    </>
  );
}
