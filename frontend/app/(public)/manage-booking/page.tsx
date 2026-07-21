// Client self-service page for a single booking (or one session within a package — every
// session keeps its own cancel_token). Package sessions only ever see the Reschedule action:
// per the confirmed business rule, cancelling one session of a package isn't a refund, it's a
// forced reschedule.
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CalendarDays, Check, ChevronLeft, XCircle } from 'lucide-react';
import { formatTime, formatSessionDate } from '@/lib/date-formatter';
import { RescheduleSlotPicker } from './_components/RescheduleSlotPicker';
import type { Booking, TimeSlot } from '@/lib/types';

type View = 'loading' | 'error' | 'details' | 'reschedule' | 'cancelled' | 'rescheduled';

function ManageBookingInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [booking, setBooking] = useState<Booking | null>(null);
  const [view, setView] = useState<View>(token ? 'loading' : 'error');
  const [error, setError] = useState(token ? '' : 'No booking token provided.');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) return;
    apiClient
      .get(`/bookings/cancel/preview?token=${token}`)
      .then((data: Booking) => {
        setBooking(data);
        setView('details');
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'This link is invalid or has expired.');
        setView('error');
      });
  }, [token]);

  const handleCancel = async () => {
    if (!token) return;
    setBusy(true);
    try {
      await apiClient.post('/bookings/cancel', { token });
      setView('cancelled');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleReschedule = async (newSlot: TimeSlot) => {
    if (!token) return;
    setBusy(true);
    try {
      await apiClient.post('/bookings/reschedule', { token, newSlotId: newSlot.id });
      setView('rescheduled');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (view === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <p className="text-muted-foreground">Loading your booking...</p>
      </main>
    );
  }

  if (view === 'error') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-black mb-3">Can&apos;t access this link</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (view === 'cancelled') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black mb-3">Booking cancelled</h1>
          <p className="text-muted-foreground mb-8">
            Your booking has been cancelled. We hope to see you in the water again soon.
          </p>
          <Button asChild size="lg">
            <Link href="/book-surf-lesson">Book another lesson</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (view === 'rescheduled') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black mb-3">Session rescheduled</h1>
          <p className="text-muted-foreground mb-8">Your new date has been confirmed by email.</p>
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!booking) return null;
  const isPackageSession = booking.sessionsRequired > 1;

  if (view === 'reschedule') {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="container mx-auto max-w-3xl">
          <button
            onClick={() => setView('details')}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-2xl font-bold mb-2">Choose a new date</h1>
          <p className="text-muted-foreground text-sm mb-6">{booking.lessonTitle}</p>
          {error && <p className="text-sm text-destructive mb-4">{error}</p>}
          <RescheduleSlotPicker
            lessonType={booking.lessonType}
            currentSlotId={booking.slotId}
            onSelect={handleReschedule}
          />
          {busy && <p className="text-sm text-muted-foreground mt-4">Rescheduling...</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </div>

        <h1 className="text-3xl font-black mb-2">Manage your booking</h1>
        {isPackageSession && (
          <p className="text-muted-foreground mb-4 text-sm">
            This session is part of a package — it can be rescheduled but not cancelled on its own. To cancel the
            whole package, use the link in your package confirmation email.
          </p>
        )}

        <div className="bg-muted/40 rounded-2xl p-5 space-y-3 mb-8">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Lesson</p>
            <p className="font-semibold">{booking.lessonTitle}</p>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <CalendarDays className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p>{formatSessionDate(booking.slotDate)}</p>
              <p className="text-muted-foreground">{formatTime(booking.slotTime)}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Name</p>
            <p className="text-sm">
              {booking.clientFirstname} {booking.clientLastname}
            </p>
          </div>
        </div>

        {error && <p className="text-sm text-destructive mb-4">{error}</p>}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="flex-1" onClick={() => setView('reschedule')}>
            Reschedule
          </Button>
          {!isPackageSession && (
            <Button variant="destructive" size="lg" className="flex-1" onClick={handleCancel} disabled={busy}>
              {busy ? 'Cancelling...' : 'Cancel booking'}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ManageBookingPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center px-6">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      }
    >
      <ManageBookingInner />
    </Suspense>
  );
}
