'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { getBookings } from '@/lib/get-bookings';
import { toast } from 'sonner';
import type { Booking, TimeSlot } from '@/lib/types';
import { formatSessionDate, formatTime } from '@/lib/date-formatter';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RescheduleSlotPicker } from '@/app/(public)/manage-booking/_components/RescheduleSlotPicker';

const TABS = ['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'] as const;
type Tab = (typeof TABS)[number];

function bookingType(booking: Booking) {
  if (booking.sessionsRequired <= 1) return 'Single';
  return booking.parentBookingId ? `Package ×${booking.sessionsRequired} (child)` : `Package ×${booking.sessionsRequired} (parent)`;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('ALL');
  const [reschedulingId, setReschedulingId] = useState<number | null>(null);

  const load = () => {
    getBookings()
      .then((data) => setBookings(data ?? []))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCancel = async (booking: Booking) => {
    const reason = prompt(`Cancel ${booking.clientFirstname} ${booking.clientLastname}'s booking? Reason (optional):`);
    if (reason === null) return;
    try {
      await apiClient.patch(`/bookings/${booking.id}/cancel`, { reason: reason || undefined });
      toast.success('Booking cancelled');
      load();
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  const handleMarkPaid = async (booking: Booking) => {
    try {
      await apiClient.patch(`/bookings/${booking.id}/mark-paid`, {});
      toast.success('Booking confirmed');
      load();
    } catch {
      toast.error('Failed to mark booking as paid');
    }
  };

  const handleCancelGroup = async (booking: Booking) => {
    const reason = prompt(
      `Cancel the ENTIRE package (${booking.sessionsRequired} sessions) for ${booking.clientFirstname} ${booking.clientLastname}? Reason (optional):`,
    );
    if (reason === null) return;
    try {
      await apiClient.patch(`/bookings/${booking.id}/cancel-group`, { reason: reason || undefined });
      toast.success('Package cancelled');
      load();
    } catch {
      toast.error('Failed to cancel package');
    }
  };

  const handleRescheduleSelect = async (bookingId: number, newSlot: TimeSlot) => {
    try {
      await apiClient.patch(`/bookings/${bookingId}/reschedule`, { newSlotId: newSlot.id });
      toast.success('Booking rescheduled');
      setReschedulingId(null);
      load();
    } catch {
      toast.error('Failed to reschedule booking');
    }
  };

  const filtered = tab === 'ALL' ? bookings : bookings.filter((b) => b.status === tab);
  const reschedulingBooking = bookings.find((b) => b.id === reschedulingId);

  if (loading) return <p className="text-sm text-muted-foreground py-2">Loading...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-muted-foreground mt-1">Every reservation, single or package. Reschedule or cancel at any time — no 24h restriction for admin.</p>
      </div>

      <div className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              tab === t ? 'bg-primary text-primary-foreground border-primary' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-background rounded-lg border overflow-x-auto">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground italic px-4 py-6">No bookings</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-xs text-muted-foreground uppercase">
              <tr>
                <th className="text-left px-4 py-2">#</th>
                <th className="text-left px-4 py-2">Client</th>
                <th className="text-left px-4 py-2">Lesson</th>
                <th className="text-left px-4 py-2">Date/time</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Type</th>
                <th className="text-right px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-2">{b.id}</td>
                  <td className="px-4 py-2">
                    <div className="font-medium">
                      {b.clientFirstname} {b.clientLastname}
                    </div>
                    <div className="text-xs text-muted-foreground">{b.clientEmail}</div>
                  </td>
                  <td className="px-4 py-2">{b.lessonTitle}</td>
                  <td className="px-4 py-2">
                    {formatSessionDate(b.slotDate)} · {formatTime(b.slotTime)}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs border rounded px-2 py-0.5 ${
                        b.status === 'CANCELLED'
                          ? 'text-destructive border-destructive/40'
                          : b.status === 'PENDING'
                            ? 'text-amber-600 border-amber-400'
                            : 'text-primary border-primary/40'
                      }`}
                    >
                      {b.status}
                      {b.status === 'CANCELLED' && b.cancelledBy ? ` · by ${b.cancelledBy}` : ''}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">{bookingType(b)}</td>
                  <td className="px-4 py-2 text-right space-x-2">
                    {b.status !== 'CANCELLED' && (
                      <>
                        {b.status === 'PENDING' && (
                          <Button variant="ghost" size="sm" onClick={() => handleMarkPaid(b)}>
                            Mark as paid
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => setReschedulingId(b.id)}>
                          Reschedule
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleCancel(b)}>
                          Cancel
                        </Button>
                        {b.sessionsRequired > 1 && (
                          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleCancelGroup(b)}>
                            Cancel package
                          </Button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={reschedulingId !== null} onOpenChange={(open) => !open && setReschedulingId(null)}>
        <DialogContent className="bg-background w-[90vw] sm:max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reschedule booking</DialogTitle>
          </DialogHeader>
          {reschedulingBooking && (
            <RescheduleSlotPicker
              lessonType={reschedulingBooking.lessonType}
              currentSlotId={reschedulingBooking.slotId}
              onSelect={(slot) => handleRescheduleSelect(reschedulingBooking.id, slot)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
