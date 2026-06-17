import type { Metadata } from 'next';
import Hero from '@/components/web/blocks/Hero';
import ImageTextBlock from '@/components/web/blocks/ImageTextBlock';
import { Award, Heart, Users, Waves } from 'lucide-react';
import { CtaBanner } from '@/components/web/blocks/CtaBanner';
import { IconCardGrid } from '@/components/web/blocks/IconCardGrid';
import { PLACEHOLDER_IMG } from '@/lib/utils';
import { getPageContent, readContent } from '@/lib/get-page-content';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet your surf coach — certified instructor with over 15 years of surfing experience in Raglan, New Zealand. Passionate about sharing the art of surfing.',
  openGraph: {
    title: 'About ALAIA Surf Coach',
    description: 'Meet your surf coach in Raglan, New Zealand.',
    images: [{ url: '/assets/surf-west-coast-new-zealand.webp', width: 1200, height: 630, alt: 'Surf coach on the west coast of New Zealand' }],
  },
};

const VALUE_ITEMS = [
  { icon: Award, titleKey: 'about_value_1_title', descKey: 'about_value_1_desc' },
  { icon: Heart, titleKey: 'about_value_2_title', descKey: 'about_value_2_desc' },
  { icon: Users, titleKey: 'about_value_3_title', descKey: 'about_value_3_desc' },
  { icon: Waves, titleKey: 'about_value_4_title', descKey: 'about_value_4_desc' },
];

export default async function AboutPage() {
  const c = await getPageContent('about');
  const { v, img } = readContent(c);

  const values = VALUE_ITEMS.map(({ icon, titleKey, descKey }) => ({
    icon,
    title: v(titleKey),
    desc: v(descKey),
  }));

  return (
    <>
      {/* Full-screen hero banner with title and background image */}
      <Hero
        title={v('about_hero_title', 'About ALAIA Surf Coach')}
        subtitle={v(
          'about_hero_subtitle',
          "Passionate about sharing the art of surfing in New Zealand's stunning waters",
        )}
        backgroundImage={img('about_hero_image', PLACEHOLDER_IMG)}
        alt={v('about_hero_image_alt', '')}
      />

      {/* Coach bio with photo on the right */}
      <ImageTextBlock
        title={v('about_coach_title', 'Meet Your Coach')}
        subtitle={v('about_coach_subtitle', 'Expert surfer & certified instructor')}
        content={v(
          'about_coach_content',
          "With over 15 years of surfing experience and 8 years as a professional surf coach, I've dedicated my life to helping people discover the joy of riding waves.",
        )}
        imageSrc={img('about_coach_image', PLACEHOLDER_IMG)}
        imageAlt="Surf coach on the beach"
        imagePosition="left"
        buttonText={v('about_coach_button_text', 'Book a lesson')}
        buttonHref={v('about_coach_button_url', '/book-surf-lesson')}
      />

      {/* Grid of value cards built from the values array above */}
      <IconCardGrid
        eyebrow="Our Values"
        title={v('about_values_title', 'What Makes ALAIA Different')}
        subtitle={v('about_values_subtitle')}
        items={values}
      />

      {/* Three paragraphs of mission statement text */}
      <ImageTextBlock
        sectionClassName="bg-muted/40 px-4"
        eyebrow="Our Mission"
        title={v('about_mission_title', 'Sharing the Stoke, One Wave at a Time')}
        content={v('about_mission_p1')}
        imageSrc={img('about_mission_image', '/assets/surfboards-under-flax.webp')}
        imageAlt="Our mission"
        imagePosition="right"
      />

      <CtaBanner
        title={v('about_cta_title', 'Ready to Start Your Surf Journey?')}
        subtitle={v('about_cta_subtitle', 'Book your first lesson today or plan an unforgettable surf trip across New Zealand')}
        buttons={[
          { text: 'Book a Lesson', href: '/book-surf-lesson', variant: 'white' },
          { text: 'Plan a Surf Trip', href: '/surf-trip-request', variant: 'glass' },
        ]}
      />
    </>
  );
}
