// Pure presentational calendar grid for one month. Receives availability as pre-computed Sets
// so it doesn't fetch data itself. The parent controls year/month navigation.
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  startOfMonth,
  getDay,
  getDaysInMonth,
  addDays,
  isBefore,
  isSameDay,
  isToday as isTodayFn,
  startOfDay,
  format,
} from 'date-fns';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface CalendarMonthProps {
  year: number;
  month: number; // 0-indexed
  availableDates: Set<string>; // "YYYY-MM-DD" strings with available slots
  bookedDates: Set<string>; // days that have a selected slot (package mode)
  activeDayStr: string | null; // day currently open
  onSelectDate: (dateStr: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarMonth({
  year,
  month,
  availableDates,
  bookedDates,
  activeDayStr,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: CalendarMonthProps) {
  const today = startOfDay(new Date());
  const monthStart = startOfMonth(new Date(year, month, 1));

  // date-fns getDay() returns 0=Sun…6=Sat. Adding 6 and mod 7 rotates so Mon=0, Sun=6.
  const firstDow = (getDay(monthStart) + 6) % 7;
  const daysInMonth = getDaysInMonth(monthStart);

  // Pad the start of the grid with nulls so day 1 lands on the correct column.
  const cells: (Date | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => addDays(monthStart, i)),
  ];

  const isPrevDisabled = !isBefore(today, monthStart) && !isSameDay(today, monthStart);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrevMonth}
          disabled={isPrevDisabled}
          aria-label="Previous month"
          className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold">{format(monthStart, 'MMMM yyyy')}</span>
        <button
          onClick={onNextMonth}
          aria-label="Next month"
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs text-muted-foreground py-1 font-medium">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;

          const dateStr = format(date, 'yyyy-MM-dd');
          const isPast = isBefore(date, today);
          const hasSlots = availableDates.has(dateStr);
          const isBooked = bookedDates.has(dateStr);
          const isActive = activeDayStr === dateStr;
          const isTodayDate = isTodayFn(date);

          const clickable = !isPast && hasSlots;

          return (
            <button
              key={i}
              onClick={() => clickable && onSelectDate(dateStr)}
              disabled={!clickable}
              className={cn(
                'relative aspect-square rounded-lg text-sm transition-colors flex flex-col items-center justify-center',
                isPast && 'text-muted-foreground/30 cursor-not-allowed',
                !isPast && !hasSlots && 'text-muted-foreground/40 cursor-default',
                clickable && !isActive && !isBooked && 'hover:bg-primary/10 cursor-pointer font-medium',
                isActive && 'bg-primary text-primary-foreground font-semibold',
                isBooked && !isActive && 'bg-primary/20 text-primary font-semibold',
                isTodayDate && !isActive && !isBooked && 'underline',
              )}
            >
              {format(date, 'd')}
              {hasSlots && !isPast && !isActive && !isBooked && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
