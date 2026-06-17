import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { BusAccent } from '@/components/web/blocks/BusAccent';
import { range } from '@/lib/cms-utils';

export type PricingCard = {
  sessions: number;
  price: number;
  per: number;
  label: string;
  accent: boolean;
};

type Props = {
  v: (key: string, fallback?: string) => string;
  pricingCards: PricingCard[];
};

export function PackagesSection({ v, pricingCards }: Props) {
  const bullets = range(3).map((n) => v(`snz_packages_b${n}`)).filter(Boolean);
  return (
    <section className="relative overflow-hidden bg-muted/40 border-y py-20 px-4">
      <BusAccent color="yellow" side="right" width={300} className="opacity-[0.2]" />
      <div className="relative z-10 container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">


        {/* text bloc : first on mobile */}
          <div className="md:order-2">
            <p className="eyebrow text-primary mb-4">{v('snz_packages_eyebrow', 'Save more, surf more')}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{v('snz_packages_title', 'Surf Packages')}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{v('snz_packages_desc')}</p>
            {bullets.length > 0 && (
              <ul className="space-y-2 mb-8">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-ring shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <Button asChild size="lg">
              <Link href="/book-surf-lesson">View packages →</Link>
            </Button>
          </div>

               {/* pricing bloc : second on mobile */}
          <div className="md:order-1 grid grid-cols-3 gap-2 md:gap-4">
            {pricingCards.map((card) => (
              <Card
                key={card.sessions}
                className={`rounded-2xl shadow-none text-center ${card.accent ? 'bg-primary text-primary-foreground border-0' : 'bg-background'}`}
              >
                <CardContent className="p-3 md:p-5">
                  <p className={`text-xs font-semibold mb-2 ${card.accent ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {card.label}
                  </p>
                  <p className="text-2xl md:text-3xl font-black">${card.price}</p>
                  <p className={`text-xs mt-1 ${card.accent ? 'text-white/70' : 'text-muted-foreground'}`}>
                    ${card.per}/session
                  </p>
                  <p className={`text-xs mt-2 font-medium ${card.accent ? 'text-white/80' : ''}`}>
                    {card.sessions} session{card.sessions > 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
