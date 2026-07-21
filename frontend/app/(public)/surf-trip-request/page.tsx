import type { Metadata } from 'next';
import Link from 'next/link';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { Button } from '@/components/ui/button';
import { Waves, Clock, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Plan Your Surf Trip in New Zealand',
  description:
    "Tell us about your level and what you're looking for — we'll design a custom surf trip just for you.",
  alternates: { canonical: '/surf-trip-request' },
};

export default async function SurfTripRequestPage() {
  const c = await getPageContent('surf-trip');
  const { v } = readContent(c);

  const cards = [
    {
      icon: Clock,
      title: v('surf_trip_card_1_title', '5 minutes'),
      desc: v('surf_trip_card_1_desc', 'Quick and easy to complete'),
    },
    {
      icon: CheckCircle,
      title: v('surf_trip_card_2_title', '12 questions'),
      desc: v('surf_trip_card_2_desc', 'About your level and preferences'),
    },
    {
      icon: Waves,
      title: v('surf_trip_card_3_title', 'Custom trip'),
      desc: v('surf_trip_card_3_desc', 'Tailored just for you'),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Waves className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          {v('surf_trip_hero_title', 'Plan your custom surf trip')}
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          {v(
            'surf_trip_hero_subtitle',
            "Answer a few questions about your experience and what you're looking for. We'll use your answers to design the perfect New Zealand surf adventure for you.",
          )}
        </p>
        <div className="grid sm:grid-cols-3 gap-6 mb-12 text-left">
          {cards.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-muted/40 rounded-xl p-4">
              <Icon className="w-5 h-5 text-primary mb-2" />
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
        <Button asChild size="lg">
          <Link href="/surf-trip-request/quiz">{v('surf_trip_cta', 'Start the quiz →')}</Link>
        </Button>
      </div>
    </div>
  );
}
