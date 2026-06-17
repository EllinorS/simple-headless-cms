'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  startOfISOWeek,
  addWeeks,
  addDays,
  eachDayOfInterval,
  format,
  isToday,
  startOfToday,
} from 'date-fns';
import { formatTime } from '@/lib/date-formatter';
import { cn } from '@/lib/utils';

// One session passed in from page.tsx
export type CalendarSession = {
  date: string;
  time: string;
  type: string;
  duration: string;
  price: number;
};

type Props = {
  sessions: CalendarSession[];
  emptyMessage: string; // shown when a week has no sessions
};

// Formats a Date as "YYYY-MM-DD" to match session.date from the DB
function toDateStr(d: Date): string {
  return format(d, 'yyyy-MM-dd');
}

// Returns colour classes based on lesson type
function typeColor(type: string): string {
  const t = type.toLowerCase();
  if (t.includes('kids')) return 'bg-blue text-white';
  return 'bg-green text-white';
}

export function WeekCalendar({ sessions, emptyMessage }: Props) {
  // State: base date, displayed week (Monday), and selected day on mobile
  const today = startOfToday();
  const [weekStart, setWeekStart] = useState(() => startOfISOWeek(today));
  const [selectedDay, setSelectedDay] = useState(toDateStr(today));

  // Navigation: shift weekStart by +-7 days to move between weeks
  const goBack = () => setWeekStart((p) => addWeeks(p, -1));
  const goForward = () => setWeekStart((p) => addWeeks(p, 1));

  // Derived from weekStart: 7 Date objects (Mon–Sun) and the header label "9 Jun – 15 Jun"
  const weekDays = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });
  const weekLabel = `${format(weekStart, 'd MMM')} – ${format(addDays(weekStart, 6), 'd MMM')}`;

  // All sessions grouped by date: { "2026-06-15": [session, ...] }
  const byDate = Object.groupBy(sessions, (s) => s.date);
  // True if at least one session exists this week, controls desktop empty state
  const hasAnyThisWeek = weekDays.some((d) => (byDate[toDateStr(d)]?.length ?? 0) > 0);

  // Mobile only: index of selected day in weekDays (to format the title), and its sessions
  const selIdx = weekDays.findIndex((d) => toDateStr(d) === selectedDay);
  const selSessions = byDate[selectedDay] ?? [];

  return (
    <div>
      {/* Mobile and Desktop : Week navigation: prev button / week label / next button */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={goBack}
          aria-label="Previous week"
          className="rounded-full"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm font-semibold w-44 text-center">{weekLabel}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={goForward}
          aria-label="Next week"
          className="rounded-full"
        >
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
                <span className="text-[10px] font-medium text-muted-foreground">
                  {format(day, 'EEE')}
                </span>
                {/* Filled circle = selected, ring = today */}
                <span
                  className={cn(
                    'w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold transition-colors',
                    isSel ? 'bg-primary text-primary-foreground'
                      : isToday(day)
                        ? 'ring-2 ring-primary'
                        : ''
                  )}
                >
                  {format(day, 'd')}
                </span>
                {/* Dot indicator, visible only when the day has sessions */}
                <span
                  className={cn('w-1.5 h-1.5 rounded-full', hasSessions ? 'bg-primary' : 'bg-transparent')}
                />
              </Button>
            );
          })}
        </div>
        {/* Sessions list */}
        {selIdx >= 0 && (
          <p className="text-sm font-semibold mb-4">{format(weekDays[selIdx], 'EEEE d MMM')}</p>
        )}
        {selSessions.length > 0 ? (
          <div className="space-y-3">
            {selSessions.map((s, i) => (
              <SessionCard key={i} session={s} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4">{emptyMessage}</p>
        )}
      </div>

      {/* Desktop: 7-column grid, all days visible at once */}
      <div className="hidden md:block">
        <div className="grid grid-cols-7 border-b mb-4">
          {weekDays.map((day) => (
            <div key={toDateStr(day)} className="text-center pb-3">
              <p className="text-xs text-muted-foreground mb-2">{format(day, 'EEE')}</p>
              {/* Today's date gets a filled circle */}
              <span
                className={cn(
                  'inline-flex w-8 h-8 items-center justify-center rounded-full text-sm font-bold',
                  isToday(day) && 'bg-primary text-primary-foreground'
                )}
              >
                {format(day, 'd')}
              </span>
            </div>
          ))}
        </div>
        {/* Sessions list */}
        {hasAnyThisWeek ? (
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const ds = toDateStr(day);
              const daySessions = byDate[ds] ?? [];
              return (
                <div key={ds} className="space-y-2 min-h-20">
                  {daySessions.map((s, index) => (
                    <SessionCard key={index} session={s} compact />
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}

function SessionCard({
  session,
  compact = false,
}: {
  session: CalendarSession;
  compact?: boolean;
}) {
  const inner = (
    <>
      <p
        className={
          compact ? 'text-xs font-semibold text-primary mb-0.5' : 'font-bold text-base mb-1'
        }
      >
        {formatTime(session.time)}
      </p>
      {session.duration && (
        <p
          className={
            compact
              ? 'text-[10px] text-muted-foreground mb-0.5'
              : 'text-xs text-muted-foreground mb-1'
          }
        >
          {session.duration}
        </p>
      )}
      <span
        className={cn(
          'w-fit font-semibold rounded-full',
          compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
          typeColor(session.type)
        )}
      >
        {session.type}
      </span>
      {session.price > 0 && (
        <p
          className={
            compact
              ? 'text-[10px] text-muted-foreground mt-0.5'
              : 'text-xs text-muted-foreground mb-4'
          }
        >
          ${session.price} / person
        </p>
      )}
      {compact && (
        <p className="text-[10px] font-semibold text-primary mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          Book →
        </p>
      )}
    </>
  );

  if (compact) {
    return (
      <a
        href="#contact-form"
        className="block bg-background border rounded-xl p-2.5 hover:border-primary/60 hover:shadow-sm transition-all group"
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="bg-background border rounded-2xl p-4">
      {!session.duration && <div className="mb-4" />}
      {inner}
      <div className="flex items-center justify-between mt-4">
        <a href="#contact-form" className="text-sm font-bold hover:underline ml-auto">
          Book →
        </a>
      </div>
    </div>
  );
}
