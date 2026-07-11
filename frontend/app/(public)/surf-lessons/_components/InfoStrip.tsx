import { Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const ITEMS = [
  { icon: Users, label: 'Max 4 per group', sub: 'Small groups' },
  { icon: Clock, label: '2 hours', sub: 'Session duration' },
  { icon: CheckCircle, label: 'All included', sub: 'Board & wetsuit' },
  { icon: TrendingUp, label: 'All levels', sub: 'Beginner to advanced' },
];

export function InfoStrip() {
  return (
    <section className="bg-muted/40 border-y py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className="w-6 h-6 text-primary" />
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
