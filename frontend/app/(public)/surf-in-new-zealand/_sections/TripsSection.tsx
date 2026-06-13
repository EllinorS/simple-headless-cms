import { Compass, Waves, TrendingUp, MapPin } from 'lucide-react';
import { TextCardsSection } from '@/components/web/blocks/TextCardsSection';

const TRIP_CARDS = [
  { icon: Compass, label: 'Personalised itinerary', sub: 'Built around your level' },
  { icon: Waves, label: 'NZ-wide surf', sub: 'Raglan to Northland' },
  { icon: TrendingUp, label: 'Expert coaching', sub: 'Every step of the way' },
  { icon: MapPin, label: 'Local knowledge', sub: 'Hidden gems & best breaks' },
];

type Props = {
  v: (key: string, fallback?: string) => string;
  bullets: string[];
};

export function TripsSection({ v, bullets }: Props) {
  return (
    <TextCardsSection
      eyebrow={v('snz_trips_eyebrow', 'New Zealand, your way')}
      title={v('snz_trips_title', 'Custom Surf Trips')}
      desc={v('snz_trips_desc')}
      bullets={bullets}
      buttonText="Plan my trip →"
      buttonHref="/surf-trip-request"
      cards={TRIP_CARDS}
      variant="secondary"
    />
  );
}
