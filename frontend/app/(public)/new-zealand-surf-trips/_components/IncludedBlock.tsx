import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Compass, Waves, Star, MapPin } from 'lucide-react';

const FEAT_ICONS = [Compass, Waves, Star, MapPin];

interface Feature {
  label: string;
  sub: string;
}

export function IncludedBlock({
  eyebrow,
  title,
  items,
  features,
}: {
  eyebrow: string;
  title: string;
  items: string[];
  features: Feature[];
}) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">{eyebrow}</p>
            <h2 className="text-3xl font-bold mb-6">{title}</h2>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/surf-trip-request">Start planning →</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {features.map(({ label, sub }, i) => {
              const Icon = FEAT_ICONS[i];
              return (
                <div key={label} className="bg-muted/40 rounded-2xl p-5">
                  <Icon className="w-5 h-5 text-primary mb-3" />
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
