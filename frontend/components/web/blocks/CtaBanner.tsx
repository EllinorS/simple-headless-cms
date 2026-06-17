import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { ComponentProps } from 'react';

type ButtonVariant = ComponentProps<typeof Button>['variant'];

export type CtaButton = {
  text: string;
  href: string;
  variant?: ButtonVariant;
};

type Props = {
  title: string;
  subtitle?: string;
  buttons: CtaButton[];
};

export function CtaBanner({ title, subtitle, buttons }: Props) {
  return (
    <section className="py-16 px-4 bg-secondary text-secondary-foreground">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-lg mb-8 opacity-90">{subtitle}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map(({ text, href, variant = 'white' }) => (
            <Button key={href} size="lg" variant={variant} asChild>
              <Link href={href}>{text}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
