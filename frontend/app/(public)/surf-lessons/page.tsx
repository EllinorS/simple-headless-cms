import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/web/blocks/Hero';
import { Button } from '@/components/ui/button';
import { Users, User, TrendingUp } from 'lucide-react';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { PLACEHOLDER_IMG } from '@/lib/utils';
import { LessonBlock } from './_components/LessonBlock';
import { InfoStrip } from './_components/InfoStrip';
import { SurfSpotsBlock } from './_components/SurfSpotsBlock';

export const metadata: Metadata = {
  title: 'Surf Lessons in Raglan | ALAIA Surf Coach',
  description:
    'Group surf lessons, private sessions and performance coaching in Raglan, New Zealand. All levels from beginner to advanced.',
};

export default async function SurfLessonsPage() {
  const c = await getPageContent('surf-lessons');
  const { v, img } = readContent(c);

  const spots = [
    {
      name: v('surf_lessons_spot_1_name', 'Ngarunui Beach'),
      level: v('surf_lessons_spot_1_level', 'Beginner'),
      type: v('surf_lessons_spot_1_type', 'Beach break'),
      desc: v('surf_lessons_spot_1_desc', ''),
    },
    {
      name: v('surf_lessons_spot_2_name', 'Ruapuke'),
      level: v('surf_lessons_spot_2_level', ''),
      type: v('surf_lessons_spot_2_type', ''),
      desc: v('surf_lessons_spot_2_desc', ''),
    },
  ];

  return (
    <>
      <Hero
        title={v('surf_lessons_hero_title', 'Surf Lessons in Raglan')}
        subtitle={v('surf_lessons_hero_subtitle', 'Group, private and coaching sessions for every level')}
        backgroundImage={img('surf_lessons_hero_image', PLACEHOLDER_IMG)}
        alt={v('surf_lessons_hero_image_alt', '')}
        primaryButton={{ text: 'Book a lesson →', href: '/book-surf-lesson', show: true }}
      />

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-3 gap-6">
          <LessonBlock
            icon={Users}
            eyebrow={v('surf_lessons_group_eyebrow', 'Most popular')}
            title={v('surf_lessons_group_title', 'Group Lessons')}
            description={v('surf_lessons_group_desc', '')}
            bullets={[
              v('surf_lessons_group_b1', ''),
              v('surf_lessons_group_b2', ''),
              v('surf_lessons_group_b3', ''),
            ]}
          />
          <LessonBlock
            icon={User}
            eyebrow={v('surf_lessons_private_eyebrow', 'One on one')}
            title={v('surf_lessons_private_title', 'Private Lessons')}
            description={v('surf_lessons_private_desc', '')}
            bullets={[
              v('surf_lessons_private_b1', ''),
              v('surf_lessons_private_b2', ''),
              v('surf_lessons_private_b3', ''),
            ]}
            accent
            ctaText="Contact us →"
            ctaHref="/contact"
          />
          <LessonBlock
            icon={TrendingUp}
            eyebrow={v('surf_lessons_coaching_eyebrow', 'Level up')}
            title={v('surf_lessons_coaching_title', 'Surf Coaching')}
            description={v('surf_lessons_coaching_desc', '')}
            bullets={[
              v('surf_lessons_coaching_b1', ''),
              v('surf_lessons_coaching_b2', ''),
              v('surf_lessons_coaching_b3', ''),
            ]}
            ctaText="Contact us →"
            ctaHref="/contact"
          />
        </div>
      </section>

      <InfoStrip />

      <section className="pt-12 px-4 text-center">
        <Button asChild size="lg">
          <Link href="/book-surf-lesson">Book now →</Link>
        </Button>
      </section>

      <SurfSpotsBlock
        title={v('surf_lessons_spots_title', 'Where your lesson takes place')}
        desc={v('surf_lessons_spots_desc', '')}
        spots={spots}
      />

      <section className="relative overflow-hidden bg-muted/40 border-t py-20 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-3">
            {v('surf_lessons_contact_title', 'Ready to catch your first wave?')}
          </h2>
          <p className="text-muted-foreground mb-8">{v('surf_lessons_contact_desc', '')}</p>
          <Button asChild size="lg">
            <Link href="/book-surf-lesson">Book now →</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
