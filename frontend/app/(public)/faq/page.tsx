import type { Metadata } from 'next';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { FaqCategory } from '@/lib/types';
import { FaqAccordion } from '@/components/web/blocks/FaqAccordion';
import { range } from '@/lib/cms-utils';
import Hero from '@/components/web/blocks/Hero';
import { PLACEHOLDER_IMG } from '@/lib/utils';
import { CtaBanner } from '@/components/web/blocks/CtaBanner';

export const metadata: Metadata = {
  title: 'FAQ — Surf Lessons in Raglan | ALAIA Surf Coach',
  description:
    'Everything you need to know before booking a surf lesson in Raglan, New Zealand. Questions about levels, what to bring, packages, cancellation, and more.',
  openGraph: {
    title: 'FAQ | ALAIA Surf Coach Raglan',
    description: 'Your questions answered — before your first session in Raglan, NZ.',
    images: [
      {
        url: '/assets/surfboards-under-flax.webp',
        width: 1200,
        height: 630,
        alt: 'Surfboards in Raglan',
      },
    ],
  },
};

export default async function FaqPage() {
  const content = await getPageContent('FAQ');
  const { v, img } = readContent(content);

  // creates array expected by FaqAccordion component
  const categories: FaqCategory[] = range(4).map((n) => ({ // 4 categories
    title: v(`faq_cat${n}_title`), // category title
    items: range(5) // 5 questions possible
      .map((m) => ({ q: v(`faq_cat${n}_item${m}_q`), a: v(`faq_cat${n}_item${m}_a`) })) // for each number, create a pair of question and answer
      .filter((item) => item.q), // keep pairs with a question
  })).filter((cat) => cat.items.length > 0); // keep categories with at least one question
  
  return (
    <>
      <Hero
        title={v('faq_hero_title', 'Frequently Asked Questions')}
        subtitle={v('faq_hero_subtitle', 'Everything you need to know before hitting the water')}
        backgroundImage={img('faq_hero_image', PLACEHOLDER_IMG)}
        alt={v('faq_hero_image_alt', '')}
        size="medium"
      />

      <div className="container mx-auto max-w-3xl px-6 py-16">
        <FaqAccordion categories={categories} />
      </div>

      <CtaBanner
        title="Still have a question?"
        subtitle="Send us a message and we'll get back to you within 24 hours."
        buttons={[
          { text: 'Contact us', href: '/contact', variant: 'white' },
          { text: 'Book a lesson', href: '/book-surf-lesson', variant: 'glass' },
        ]}
      />
    </>
  );
}
