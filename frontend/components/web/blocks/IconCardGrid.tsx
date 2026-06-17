import type { LucideIcon } from 'lucide-react';

export type IconCardItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  items: IconCardItem[];
  className?: string;
};

export function IconCardGrid({ title, subtitle, eyebrow, items, className = '' }: Props) {
  return (
    <section className={`py-16 md:py-24 bg-secondary text-secondary-foreground ${className}`}>
      <div className="container mx-auto px-6">
        {(eyebrow || title || subtitle) && (
          <header className="text-center mb-12">
            {eyebrow && <p className="eyebrow text-secondary-foreground/60 mb-4">{eyebrow}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {subtitle && (
              <p className="text-secondary-foreground/70 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </header>
        )}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 list-none p-0 m-0">
          {items.map(({ icon: Icon, title: cardTitle, desc }) => (
            <li key={cardTitle}>
              <article className="rounded-2xl bg-secondary-foreground/10 border border-secondary-foreground/15 p-6 text-center hover:bg-secondary-foreground/15 transition-colors h-full">
                <div
                  aria-hidden
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary-foreground/15 flex items-center justify-center"
                >
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-bold text-xl mb-2">{cardTitle}</h3>
                <p className="text-sm text-secondary-foreground/70">{desc}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
