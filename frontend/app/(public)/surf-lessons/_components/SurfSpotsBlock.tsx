import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Spot {
  name: string;
  level: string;
  type: string;
  desc: string;
}

export function SurfSpotsBlock({
  title,
  desc,
  spots,
}: {
  title: string;
  desc: string;
  spots: Spot[];
}) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Raglan, New Zealand
          </p>
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{desc}</p>
          {spots[0]?.type && (
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-3">
              {spots[0].type}
            </p>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
          {spots.map((spot) => (
            <div key={spot.name} className="bg-muted/40 border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <h3 className="text-3xl font-bold leading-none whitespace-nowrap mt-3">{spot.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{spot.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/spots">Explore more NZ surf spots →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
