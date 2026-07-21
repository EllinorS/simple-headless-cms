import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Spot {
  id: number;
  image: string;
}

interface Region {
  name: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
  spots: Spot[];
}

export function RegionsList({ regions }: { regions: Region[] }) {
  return (
    <div className="divide-y">
      {regions.map((region, i) => (
        <section key={region.name} className={`py-20 px-4 ${i % 2 === 1 ? 'bg-muted/40' : ''}`}>
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h2 className="text-2xl font-bold">{region.name}</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">{region.intro}</p>
              </div>
              {region.ctaLabel && (
                <Button asChild variant="outline" className="shrink-0">
                  <Link href={region.ctaHref}>{region.ctaLabel}</Link>
                </Button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {region.spots.map((spot) => (
                <div key={spot.id} className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src={spot.image}
                    alt={`${region.name} surf spot`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
