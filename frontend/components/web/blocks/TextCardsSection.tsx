import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export type SectionCard = {
  icon: LucideIcon;
  label: string;
  sub: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  desc?: string;
  bullets?: string[];
  buttonText: string;
  buttonHref: string;
  cards: SectionCard[];
  cardPosition?: 'left' | 'right';
  variant?: 'default' | 'secondary';
};

export function TextCardsSection({
  eyebrow,
  title,
  desc,
  bullets = [],
  buttonText,
  buttonHref,
  cards,
  cardPosition = 'right',
  variant = 'default',
}: Props) {
  const isSecondary = variant === 'secondary';

  return (
    <section
      className={`py-20 px-4 ${isSecondary ? 'bg-secondary text-secondary-foreground' : ''}`}
    >
      <div className="container mx-auto max-w-5xl">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${cardPosition === 'left' ? 'md:grid-flow-dense' : ''}`}
        >
          {/* Text */}
          <div className={cardPosition === 'left' ? 'md:col-start-2' : ''}>
            {eyebrow && (
              <p
                className={`eyebrow mb-4 ${isSecondary ? 'text-secondary-foreground/60' : 'text-primary'}`}
              >
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            {desc && (
              <p
                className={`leading-relaxed mb-6 ${isSecondary ? 'text-secondary-foreground/70' : 'text-muted-foreground'}`}
              >
                {desc}
              </p>
            )}
            {bullets.length > 0 && (
              <ul className="space-y-2 mb-8">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className={`flex items-start gap-3 text-sm ${isSecondary ? 'text-secondary-foreground' : ''}`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 shrink-0 mt-0.5 ${isSecondary ? 'text-gold' : 'text-ring'}`}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <Button asChild size="lg" variant={isSecondary ? 'white' : 'default'}>
              <Link href={buttonHref}>{buttonText}</Link>
            </Button>
          </div>

          {/* Cards grid */}
          <div
            className={`grid grid-cols-2 gap-4 ${cardPosition === 'left' ? 'md:col-start-1 md:row-start-1' : ''}`}
          >
            {cards.map(({ icon: Icon, label, sub }) => (
              <Card
                key={label}
                className={`ring-0 shadow-none rounded-2xl ${isSecondary ? 'bg-secondary-foreground/10 border border-secondary-foreground/15' : 'bg-muted border-0'}`}
              >
                <CardContent className="p-5">
                  <Icon className={`w-5 h-5 mb-3 ${isSecondary ? 'text-gold' : 'text-primary'}`} />
                  <p className="font-semibold text-sm">{label}</p>
                  <p
                    className={`text-xs mt-1 ${isSecondary ? 'text-secondary-foreground/70' : 'text-muted-foreground'}`}
                  >
                    {sub}
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
