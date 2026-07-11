import { BusAccent } from '@/components/web/blocks/BusAccent';

interface Step {
  step: string;
  title: string;
  desc: string;
}

export function StepsBlock({ title, desc, steps }: { title: string; desc: string; steps: Step[] }) {
  return (
    <section className="relative overflow-hidden bg-muted/40 border-y py-20 px-4">
      <BusAccent color="green" side="left" width={320} className="hidden md:block opacity-[0.08]" />
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{desc}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="relative">
              <p className="text-6xl font-black text-primary/10 mb-3 leading-none">{step}</p>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
