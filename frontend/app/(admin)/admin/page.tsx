import { formatSessionDate, formatTime } from '@/lib/date-formatter';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getSlots } from '@/lib/get-slots';

export default async function DashboardPage() {
  const slots = (await getSlots()) ?? [];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your upcoming lessons.</p>
      </div>

      <Card className="border bg-background ring-0 rounded-lg max-w-lg">
        <CardHeader>
          <CardTitle>Upcoming Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          {slots.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No upcoming lessons.</p>
          ) : (
            <ul className="space-y-2">
              {slots.map((s) => (
                <li
                  key={s.id}
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm border-b pb-2 last:border-0 last:pb-0"
                >
                  <span className="font-medium whitespace-nowrap">{formatSessionDate(s.date)}</span>
                  <span className="text-primary whitespace-nowrap">{formatTime(s.time)}</span>
                  <span className="text-muted-foreground">{s.title}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
