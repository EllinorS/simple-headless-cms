import { Sun, Leaf, Snowflake, Flower2 } from 'lucide-react';
import ImageTextBlock from '@/components/web/blocks/ImageTextBlock';
import { PLACEHOLDER_IMG } from '@/lib/utils';

const SEASONS = [
  { icon: Sun, key: 'summer', months: 'Dec – Feb' },
  { icon: Leaf, key: 'autumn', months: 'Mar – May' },
  { icon: Snowflake, key: 'winter', months: 'Jun – Aug' },
  { icon: Flower2, key: 'spring', months: 'Sep – Nov' },
] as const;

type Props = {
  v: (key: string, fallback?: string) => string;
  img: (key: string, fallback?: string) => string;
};

export function SeasonsSection({ v, img }: Props) {
  return (
    <>
      <section className="py-20 px-4 border-t">
        <div className="container mx-auto max-w-5xl">
          <p className="eyebrow text-primary mb-4">{v('snz_seasons_eyebrow', 'Plan your trip')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {v('snz_seasons_title', 'Best Time to Surf in New Zealand')}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-3xl">
            {v('snz_seasons_intro')}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SEASONS.map(({ icon: Icon, key, months }) => (
              <div key={key} className="rounded-2xl bg-muted p-6">
                <Icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-xs font-semibold text-muted-foreground mb-1">{months}</p>
                <h3 className="font-bold mb-2">{v(`snz_season_${key}_title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v(`snz_season_${key}_desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageTextBlock
        eyebrow={v('snz_seasons_coast_eyebrow', 'Choose your coast')}
        title={v('snz_seasons_coast_title', 'West Coast or East Coast?')}
        content={v('snz_seasons_coast_text')}
        imageSrc={img('snz_seasons_coast_image', PLACEHOLDER_IMG)}
        imageAlt={v('snz_seasons_coast_image_alt', 'Surf coastline in New Zealand')}
        imagePosition="left"
      />
    </>
  );
}
