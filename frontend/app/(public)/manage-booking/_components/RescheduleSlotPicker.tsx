// Compact single-slot picker used by the manage-booking pages to reschedule an existing
// booking. Filters public slots by the booking's own lesson type and excludes the slot
// currently booked.
'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { CalendarMonth } from '@/app/(public)/book-surf-lesson/_components/CalendarMonth';
import { Users } from 'lucide-react';
import { formatTime, formatSessionDate } from '@/lib/date-formatter';
import type { TimeSlot } from '@/lib/types';

interface RescheduleSlotPickerProps {
  lessonType: 'ADULTS' | 'KIDS';
  currentSlotId: number;
  onSelect: (slot: TimeSlot) => void;
}

export function RescheduleSlotPicker({ lessonType, currentSlotId, onSelect }: RescheduleSlotPickerProps) {
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [allSlots, setAllSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDayStr, setActiveDayStr] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get('/slots/public')
      .then((data: TimeSlot[]) => setAllSlots(data))
      .catch(() => {
        /* stays empty */
      })
      .finally(() => setLoading(false));
  }, []);

  const slots = allSlots.filter((s) => s.type === lessonType && s.id !== currentSlotId);
  const availableDates = new Set(slots.filter((s) => s.spotsLeft > 0).map((s) => s.date));
  const slotsForDay = activeDayStr ? slots.filter((s) => s.date === activeDayStr) : [];

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else setCalMonth((m) => m - 1);
    setActiveDayStr(null);
  };

  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else setCalMonth((m) => m + 1);
    setActiveDayStr(null);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-background border rounded-2xl p-5">
        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-8">Loading availability...</p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No other sessions available right now.</p>
        ) : (
          <CalendarMonth
            year={calYear}
            month={calMonth}
            availableDates={availableDates}
            bookedDates={new Set()}
            activeDayStr={activeDayStr}
            onSelectDate={setActiveDayStr}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
          />
        )}
      </div>

      <div className="bg-background border rounded-2xl p-5">
        {!activeDayStr ? (
          <div className="flex items-center justify-center h-full min-h-50 text-center">
            <p className="text-sm text-muted-foreground">← Select a date to see available times</p>
          </div>
        ) : (
          <div>
            <p className="font-semibold mb-4">{formatSessionDate(activeDayStr)}</p>
            {slotsForDay.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sessions available this day.</p>
            ) : (
              <div className="space-y-2">
                {slotsForDay.map((slot) => {
                  const isFull = slot.spotsLeft <= 0;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => !isFull && onSelect(slot)}
                      disabled={isFull}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm ${
                        isFull ? 'border-border opacity-40 cursor-not-allowed' : 'border-border hover:border-primary/60 cursor-pointer'
                      }`}
                    >
                      <p className="font-medium">
                        {formatTime(slot.time)} · {slot.durationMinutes} min
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Users className="w-3 h-3" />
                        {isFull ? 'Full' : `${slot.spotsLeft} spot${slot.spotsLeft > 1 ? 's' : ''} left`}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
