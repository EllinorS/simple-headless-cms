import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function IncludedBlock({
  title,
  desc,
  items,
}: {
  title: string;
  desc: string;
  items: string[];
}) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground">{desc}</p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link href="/book-surf-lesson">Choose your package →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
