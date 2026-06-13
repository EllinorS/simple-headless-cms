import { Users, User, TrendingUp, MapPin } from 'lucide-react';
import { TextCardsSection } from '@/components/web/blocks/TextCardsSection';

const LESSON_CARDS = [
  { icon: Users, label: 'Group Lessons', sub: 'Max 4 per group' },
  { icon: User, label: 'Private Lessons', sub: 'One on one' },
  { icon: TrendingUp, label: 'Surf Coaching', sub: 'Level up fast' },
  { icon: MapPin, label: 'Raglan, NZ', sub: 'World-class waves' },
];

type Props = {
  v: (key: string, fallback?: string) => string;
  bullets: string[];
};

export function LessonsSection({ v, bullets }: Props) {
  return (
    <TextCardsSection
      eyebrow={v('snz_lessons_eyebrow', 'Raglan, New Zealand')}
      title={v('snz_lessons_title', 'Surf Lessons')}
      desc={v('snz_lessons_desc')}
      bullets={bullets}
      buttonText="Book a lesson →"
      buttonHref="/book-surf-lesson"
      cards={LESSON_CARDS}
    />
  );
}
