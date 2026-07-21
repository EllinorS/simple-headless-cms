import { Users, User, TrendingUp, MapPin } from 'lucide-react';
import { TextCardsSection } from '@/components/web/blocks/TextCardsSection';
import { range } from '@/lib/cms-utils';

const LESSON_CARDS = [
  { icon: Users, label: 'Group Lessons', sub: 'Max 4 per group' },
  { icon: User, label: 'Private Lessons', sub: 'One on one' },
  { icon: TrendingUp, label: 'Surf Coaching', sub: 'Level up fast' },
  { icon: MapPin, label: 'Raglan, NZ', sub: 'World-class waves' },
];

type Props = {
  v: (key: string, fallback?: string) => string;
};

export function LessonsSection({ v }: Props) {
  // bullets returns an array of str for bullets props in TextCardsSection
  const bullets = range(3)
    .map((n) => v(`snz_lessons_b${n}`))
    .filter(Boolean);
  return (
    <TextCardsSection
      eyebrow={v('snz_lessons_eyebrow', 'Raglan, New Zealand')}
      title={v('snz_lessons_title', 'Surf Lessons')}
      desc={v('snz_lessons_desc')}
      bullets={bullets}
      buttonText="Explore surf lessons →"
      buttonHref="/surf-lessons"
      cards={LESSON_CARDS}
    />
  );
}
