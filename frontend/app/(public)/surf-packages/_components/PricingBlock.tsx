import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Package {
  quantity: number;
  price: number;
  badge: string;
  accent: boolean;
  desc: string;
}

export function PricingBlock({
  eyebrow,
  title,
  desc,
  packages,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  packages: Package[];
}) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">{eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{desc}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map(({ quantity, price, badge, accent, desc: pkgDesc }) => (
            <div
              key={quantity}
              className={`rounded-2xl p-8 flex flex-col ${accent ? 'bg-primary text-primary-foreground' : 'bg-muted/40 border'}`}
            >
              {badge && (
                <span
                  className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-5 ${accent ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}
                >
                  {badge}
                </span>
              )}
              <p
                className={`text-sm font-semibold uppercase tracking-widest mb-1 ${accent ? 'text-white/70' : 'text-primary'}`}
              >
                {quantity} session{quantity > 1 ? 's' : ''}
              </p>
              <p className="text-5xl font-black mb-1">${price}</p>
              <p className={`text-sm mb-5 ${accent ? 'text-white/70' : 'text-muted-foreground'}`}>
                ${Math.round(price / quantity)}/session
              </p>
              {pkgDesc && (
                <p className={`text-sm leading-relaxed flex-1 ${accent ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {pkgDesc}
                </p>
              )}
              <div className="mt-8">
                <Button asChild variant={accent ? 'white' : 'default'} className="w-full">
                  <Link href="/book-surf-lesson">Book now →</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
