import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Faq {
  q: string;
  a: string;
}

export function FaqBlock({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="bg-muted/40 border-t py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="grid sm:grid-cols-3 gap-8 text-sm text-muted-foreground text-center">
          {faqs.map(({ q, a }) => (
            <div key={q}>
              <p className="font-semibold text-foreground mb-1">{q}</p>
              <p>{a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/faq">More questions →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
