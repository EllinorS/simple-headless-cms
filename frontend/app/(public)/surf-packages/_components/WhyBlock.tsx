import { BusAccent } from '@/components/web/blocks/BusAccent';

interface WhyItem {
  icon: React.ElementType;
  title: string;
  desc: string;
}

export function WhyBlock({ title, desc, items }: { title: string; desc: string; items: WhyItem[] }) {
  return (
    <section className="relative overflow-hidden bg-muted/40 border-y py-20 px-4">
      <BusAccent color="green" side="left" width={300} className="hidden md:block opacity-[0.07]" />
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{desc}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map(({ icon: Icon, title: itemTitle, desc: itemDesc }) => (
            <div key={itemTitle}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{itemTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{itemDesc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
