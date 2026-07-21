'use client';

import { CalendarDays } from 'lucide-react';
import { formatTime, formatSessionDate } from '@/lib/date-formatter';
import type { Lesson, TimeSlot } from '@/lib/types';

interface BookingSummaryProps {
  lesson: Lesson;
  selectedSlots: TimeSlot[];
}

export function BookingSummary({ lesson, selectedSlots }: BookingSummaryProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your booking</h2>
      <div className="bg-muted/40 rounded-2xl p-5 space-y-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Option</p>
          <p className="font-semibold">{lesson.title}</p>
          {lesson.isPackage && (
            <p className="text-sm text-muted-foreground mt-0.5">
              ${Math.round(lesson.price / lesson.sessionsCount)}/session
            </p>
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            {lesson.isPackage ? `Sessions (${selectedSlots.length})` : 'Session'}
          </p>
          <div className="space-y-2">
            {selectedSlots
              .slice()
              .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
              .map((slot) => (
                <div key={slot.id} className="flex items-start gap-2 text-sm">
                  <CalendarDays className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>
                    {formatSessionDate(slot.date)} · {formatTime(slot.time)}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-bold">
            <span>Deposit due by bank transfer</span>
            <span className="text-primary">${lesson.depositAmount}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>Total price</span>
            <span>${lesson.price}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Your spot is held for 48 hours while we wait for your bank transfer — details will be in your
            confirmation email. The deposit is refundable up to 24h before{' '}
            {lesson.isPackage ? 'your first session' : 'the session'}.
          </p>
        </div>
      </div>
    </div>
  );
}
