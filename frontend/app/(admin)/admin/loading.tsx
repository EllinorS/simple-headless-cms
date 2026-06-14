export default function Loading() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <div className="h-8 w-40 bg-muted animate-pulse rounded" />
        <div className="h-4 w-64 bg-muted animate-pulse rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border bg-background rounded-lg p-6 space-y-4">
          <div className="h-5 w-36 bg-muted animate-pulse rounded" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
