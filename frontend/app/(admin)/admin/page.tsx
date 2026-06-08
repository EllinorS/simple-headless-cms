'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { formatSessionDate } from '@/lib/date-formatter';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Session } from '@/lib/types';

export default function DashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/sessions/public')
      .then((sessions) => {
        setSessions(sessions);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your upcoming sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border bg-background ring-0 rounded-lg">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : sessions.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No upcoming sessions.</p>
            ) : (
              <ul className="space-y-2">
                {sessions.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0"
                  >
                    <span className="font-medium w-28 shrink-0">{formatSessionDate(s.date)}</span>
                    <span className="text-primary w-20 shrink-0">{s.time}</span>
                    <span className="flex-1 text-muted-foreground truncate">{s.type}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
