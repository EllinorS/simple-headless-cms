import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LessonBlockProps {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  accent?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export function LessonBlock({
  icon: Icon,
  eyebrow,
  title,
  description,
  bullets,
  accent,
  ctaText = 'Book now →',
  ctaHref = '/book-surf-lesson',
}: LessonBlockProps) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl p-8 ${accent ? 'bg-primary text-primary-foreground' : 'bg-muted/40 border'}`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${accent ? 'bg-white/20' : 'bg-primary/10'}`}
      >
        <Icon className={`w-6 h-6 ${accent ? 'text-white' : 'text-primary'}`} />
      </div>
      <p
        className={`text-xs font-semibold uppercase tracking-widest mb-1 ${accent ? 'text-white/70' : 'text-primary'}`}
      >
        {eyebrow}
      </p>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p
        className={`text-sm leading-relaxed min-h-18 line-clamp-3 ${accent ? 'text-white/80' : 'text-muted-foreground'}`}
      >
        {description}
      </p>
      <ul className="space-y-2 mt-5">
        {bullets.filter(Boolean).map((item) => (
          <li
            key={item}
            className={`flex items-start gap-2 text-sm ${accent ? 'text-white/80' : 'text-muted-foreground'}`}
          >
            <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${accent ? 'text-white' : 'text-primary'}`} />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <Button
          asChild
          size="sm"
          className={`w-full ${accent ? 'bg-white text-primary hover:bg-white/90' : ''}`}
        >
          <Link href={ctaHref}>{ctaText}</Link>
        </Button>
      </div>
    </div>
  );
}
