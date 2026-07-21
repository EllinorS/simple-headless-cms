// Client self-service page for a whole package (all N sessions). Offers Cancel (the whole
// package, refund-eligible) and, per session, a Reschedule link that opens the single-booking
// manage page with that session's own cancel_token — reusing the same reschedule flow.
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CalendarDays, Check, XCircle } from 'lucide-react';
import { formatTime, formatSessionDate } from '@/lib/date-formatter';
import type { Booking } from '@/lib/types';

function ManagePackageInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [pkg, setPkg] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(!!token);
  const [error, setError] = useState(token ? '' : 'No package token provided.');
  const [cancelled, setCancelled] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!token) return;
    apiClient
      .get(`/bookings/cancel/package/preview?token=${token}`)
      .then((data: Booking) => setPkg(data))
      .catch(() => setError('This link is invalid or has expired.'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleCancel = async () => {
    if (!token) return;
    setCancelling(true);
    try {
      await apiClient.post('/bookings/cancel/package', { token });
      setCancelled(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <p className="text-muted-foreground">Loading your package...</p>
      </main>
    );
  }

  if (cancelled) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black mb-3">Package cancelled</h1>
          <p className="text-muted-foreground mb-8">
            All sessions in your package have been cancelled. We hope to see you in the water again soon.
          </p>
          <Button asChild size="lg">
            <Link href="/book-surf-lesson">Book another lesson</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (error || !pkg) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-black mb-3">Link invalid or expired</h1>
          <p className="text-muted-foreground mb-8">{error || 'This link is no longer valid.'}</p>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </main>
    );
  }

  const sessions = pkg.sessions ?? [];

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </div>

        <h1 className="text-3xl font-black mb-2">Manage your package</h1>
        <p className="text-muted-foreground mb-8">{pkg.lessonTitle}</p>

        <div className="bg-muted/40 rounded-2xl p-5 space-y-4 mb-8">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Sessions ({sessions.length})
            </p>
            <div className="space-y-2">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between gap-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>
                      {formatSessionDate(session.slotDate)} · {formatTime(session.slotTime)}
                    </span>
                  </div>
                  {session.cancelToken && (
                    <Link
                      href={`/manage-booking?token=${session.cancelToken}`}
                      className="text-xs font-medium text-primary hover:underline shrink-0"
                    >
                      Reschedule
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Name</p>
            <p className="text-sm">
              {pkg.clientFirstname} {pkg.clientLastname}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Cancelling here cancels <strong>all {sessions.length} sessions</strong> in your package. To move a single
          session to a new date instead, use &quot;Reschedule&quot; next to that session above.
        </p>

        {error && <p className="text-sm text-destructive mb-4">{error}</p>}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="destructive" size="lg" className="flex-1" onClick={handleCancel} disabled={cancelling}>
            {cancelling ? 'Cancelling...' : 'Cancel entire package'}
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link href="/">Keep my package</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default function ManagePackagePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center px-6">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      }
    >
      <ManagePackageInner />
    </Suspense>
  );
}
