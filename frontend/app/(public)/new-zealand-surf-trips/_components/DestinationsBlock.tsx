import Image from 'next/image';

interface Destination {
  id: number;
  image: string;
}

export function DestinationsBlock({
  title,
  desc,
  destinations,
}: {
  title: string;
  desc: string;
  destinations: Destination[];
}) {
  return (
    <section className="bg-muted/40 border-y py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{desc}</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <div key={dest.id} className="relative aspect-3/4 rounded-2xl overflow-hidden">
              <Image
                src={dest.image}
                alt={`${title} destination`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
