import Image from 'next/image';
import { MapPin, Waves } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type Spot = {
  id: number;
  name: string;
  region: string;
  type: string;
  level: string;
  desc: string;
  image: string;
};

type Props = {
  spots: Spot[];
};

export function SpotsSection({ spots }: Props) {
  if (spots.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-muted/40 border-b">
      <div className="container mx-auto max-w-5xl">
        <p className="eyebrow text-primary mb-3">Aotearoa New Zealand</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Where could you surf?</h2>
        <p className="text-muted-foreground mb-12">
          3,000 km of coastline. A wave for every level. Here are some of the regions we explore on custom surf trips.
        </p>
        {/* mobile 1 col, >=640 2 cols, >=768 4 cols */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {spots.map((spot) => (
            <Card key={spot.id} className="gap-0 p-0 h-full flex flex-col">
              <div className="relative h-44 shrink-0">
                <Image
                  src={spot.image}
                  alt={spot.name}
                  fill
                  className="object-cover rounded-t-xl"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <CardContent className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {spot.region}
                </div>
                <CardTitle className="text-base leading-tight">{spot.name}</CardTitle>
                <div className="flex flex-wrap gap-1.5">
                  {spot.type && (
                    <Badge variant="secondary">
                      <Waves />
                      {spot.type}
                    </Badge>
                  )}
                  {spot.level && (
                    <Badge variant="outline">{spot.level}</Badge>
                  )}
                </div>
                <CardDescription>{spot.desc}</CardDescription>
                <Button asChild size="sm" className="mt-auto w-full">
                  <a href="#plan-trip">Plan a trip here →</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
