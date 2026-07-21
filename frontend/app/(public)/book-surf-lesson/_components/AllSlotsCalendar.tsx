// Step 1: shows every upcoming session (Adults + Kids together) in a week grid, ported from
// this project's original WeekCalendar (deleted in Phase 1's clean cutover, restored here wired
// to the real API instead of a contact-form anchor). Clicking "Book" on a session locks in its
// lesson type for the rest of the wizard — the next step only offers Single/3-Pack/5-Pack for it.
'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { startOfISOWeek, addWeeks, addDays, eachDayOfInterval, format, isToday, startOfToday } from 'date-fns';
import { formatTime } from '@/lib/date-formatter';
import { cn } from '@/lib/utils';
import { apiClient } from '@/lib/api-client';
import type { TimeSlot } from '@/lib/types';

function toDateStr(d: Date): string {
  return format(d, 'yyyy-MM-dd');
}

function typeColor(type: 'ADULTS' | 'KIDS'): string {
  return type === 'KIDS' ? 'bg-blue text-white' : 'bg-green text-white';
}

interface AllSlotsCalendarProps {
  onBook: (slot: TimeSlot) => void;
}

export function AllSlotsCalendar({ onBook }: AllSlotsCalendarProps) {
  const today = startOfToday();
  const [weekStart, setWeekStart] = useState(() => startOfISOWeek(today));
  const [selectedDay, setSelectedDay] = useState(toDateStr(today));
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/slots/public')
      .then((data: TimeSlot[]) => setSlots(data))
      .catch(() => {
        /* stays empty */
      })
      .finally(() => setLoading(false));
  }, []);

  const goBack = () => setWeekStart((p) => addWeeks(p, -1));
  const goForward = () => setWeekStart((p) => addWeeks(p, 1));

  const weekDays = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });
  const weekLabel = `${format(weekStart, 'd MMM')} – ${format(addDays(weekStart, 6), 'd MMM')}`;

  const byDate = Object.groupBy(slots, (s) => s.date);
  const hasAnyThisWeek = weekDays.some((d) => (byDate[toDateStr(d)]?.length ?? 0) > 0);

  const selIdx = weekDays.findIndex((d) => toDateStr(d) === selectedDay);
  const selSlots = (byDate[selectedDay] ?? []).slice().sort((a, b) => a.time.localeCompare(b.time));

  if (loading) {
    return <p className="text-sm text-muted-foreground text-center py-8">Loading availability...</p>;
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Upcoming sessions</h2>
        <p className="text-muted-foreground text-sm mt-1">Pick a session to start booking — Adults and Kids shown together.</p>
      </div>

      <div className="flex items-center justify-center gap-3 mb-8">
        <Button variant="outline" size="icon" onClick={goBack} aria-label="Previous week" className="rounded-full">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm font-semibold w-44 text-center">{weekLabel}</span>
        <Button variant="outline" size="icon" onClick={goForward} aria-label="Next week" className="rounded-full">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile: tappable day strip + sessions for the selected day */}
      <div className="md:hidden">
        <div className="grid grid-cols-7 border-b pb-1 mb-6">
          {weekDays.map((day) => {
            const dateStr = toDateStr(day);
            const isSel = dateStr === selectedDay;
            const hasSessions = !!byDate[dateStr]?.length;
            return (
              <Button
                key={dateStr}
                variant="ghost"
                onClick={() => setSelectedDay(dateStr)}
                className="flex flex-col items-center gap-1.5 py-2 h-auto w-full"
              >
                <span className="text-[10px] font-medium text-muted-foreground">{format(day, 'EEE')}</span>
                <span
                  className={cn(
                    'w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold transition-colors',
                    isSel ? 'bg-primary text-primary-foreground' : isToday(day) ? 'ring-2 ring-primary' : '',
                  )}
                >
                  {format(day, 'd')}
                </span>
                <span className={cn('w-1.5 h-1.5 rounded-full', hasSessions ? 'bg-primary' : 'bg-transparent')} />
              </Button>
            );
          })}
        </div>
        {selIdx >= 0 && <p className="text-sm font-semibold mb-4">{format(weekDays[selIdx], 'EEEE d MMM')}</p>}
        {selSlots.length > 0 ? (
          <div className="space-y-3">
            {selSlots.map((slot) => (
              <SessionCard key={slot.id} slot={slot} onBook={onBook} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4">No sessions this day.</p>
        )}
      </div>

      {/* Desktop: 7-column grid, all days visible at once */}
      <div className="hidden md:block">
        <div className="grid grid-cols-7 border-b mb-4">
          {weekDays.map((day) => (
            <div key={toDateStr(day)} className="text-center pb-3">
              <p className="text-xs text-muted-foreground mb-2">{format(day, 'EEE')}</p>
              <span
                className={cn(
                  'inline-flex w-8 h-8 items-center justify-center rounded-full text-sm font-bold',
                  isToday(day) && 'bg-primary text-primary-foreground',
                )}
              >
                {format(day, 'd')}
              </span>
            </div>
          ))}
        </div>
        {hasAnyThisWeek ? (
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const ds = toDateStr(day);
              const daySlots = (byDate[ds] ?? []).slice().sort((a, b) => a.time.localeCompare(b.time));
              return (
                <div key={ds} className="space-y-2 min-h-20">
                  {daySlots.map((slot) => (
                    <SessionCard key={slot.id} slot={slot} onBook={onBook} compact />
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4">No sessions this week.</p>
        )}
      </div>
    </div>
  );
}

function SessionCard({ slot, onBook, compact = false }: { slot: TimeSlot; onBook: (slot: TimeSlot) => void; compact?: boolean }) {
  const isFull = slot.spotsLeft <= 0;
  const type = slot.type === 'KIDS' ? 'Kids' : 'Adults';

  const inner = (
    <>
      <p className={compact ? 'text-xs font-semibold text-primary mb-0.5' : 'font-bold text-base mb-1'}>
        {formatTime(slot.time)}
      </p>
      <p className={compact ? 'text-[10px] text-muted-foreground mb-0.5' : 'text-xs text-muted-foreground mb-1'}>
        {slot.durationMinutes} min
      </p>
      <span className={cn('w-fit font-semibold rounded-full', compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1', typeColor(slot.type))}>
        {type}
      </span>
      <p className={compact ? 'text-[10px] text-muted-foreground mt-0.5' : 'text-xs text-muted-foreground mb-4'}>
        {isFull ? 'Full' : `${slot.spotsLeft} spot${slot.spotsLeft > 1 ? 's' : ''} left`}
      </p>
    </>
  );

  if (compact) {
    return (
      <button
        onClick={() => !isFull && onBook(slot)}
        disabled={isFull}
        className="block w-full text-left bg-background border rounded-xl p-2.5 hover:border-primary/60 hover:shadow-sm transition-all group disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {inner}
        {!isFull && (
          <p className="text-[10px] font-semibold text-primary mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            Book →
          </p>
        )}
      </button>
    );
  }

  return (
    <div className="bg-background border rounded-2xl p-4">
      {inner}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => !isFull && onBook(slot)}
          disabled={isFull}
          className="text-sm font-bold hover:underline ml-auto disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline"
        >
          {isFull ? 'Full' : 'Book →'}
        </button>
      </div>
    </div>
  );
}
