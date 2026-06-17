import { formatSessionDate } from '@/lib/date-formatter';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getSessions } from '@/lib/get-sessions';

export default async function DashboardPage() {
  const sessions = await getSessions() ?? [];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your upcoming sessions.
        </p>
      </div>

      <Card className="border bg-background ring-0 rounded-lg max-w-lg">
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No upcoming sessions.</p>
          ) : (
            <ul className="space-y-2">
              {sessions.map((s) => (
                <li
                  key={s.id}
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm border-b pb-2 last:border-0 last:pb-0"
                >
                  <span className="font-medium whitespace-nowrap">{formatSessionDate(s.date)}</span>
                  <span className="text-primary whitespace-nowrap">{s.time}</span>
                  <span className="text-muted-foreground">{s.type}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
