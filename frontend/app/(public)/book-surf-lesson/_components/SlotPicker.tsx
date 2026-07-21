// Step 3 (package only — single skips straight to the details form): picks the remaining dates
// for a package. The session already clicked in step 1 (AllSlotsCalendar) counts as the first
// one and is pre-selected here; the client picks sessionsCount - 1 more of the same type.
//
// Filters by baseLessonId, not the package's own id — a package never has its own slots
// (see project_package_booking_logic memory), it books against its base lesson's slots.
'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { CalendarMonth } from './CalendarMonth';
import { SelectedSlotsList } from './SelectedSlotsList';
import { ChevronLeft, Check, Users } from 'lucide-react';
import { formatTime, formatSessionDate } from '@/lib/date-formatter';
import type { Lesson, TimeSlot } from '@/lib/types';

interface SlotPickerProps {
  lesson: Lesson;
  initialSlot: TimeSlot;
  onConfirm: (slots: TimeSlot[]) => void;
  onBack: () => void;
}

export function SlotPicker({ lesson, initialSlot, onConfirm, onBack }: SlotPickerProps) {
  const required = lesson.sessionsCount;
  const filterLessonId = lesson.baseLessonId;

  const initialDate = new Date(`${initialSlot.date}T00:00:00`);
  const [calYear, setCalYear] = useState(initialDate.getFullYear());
  const [calMonth, setCalMonth] = useState(initialDate.getMonth());
  const [allSlots, setAllSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDayStr, setActiveDayStr] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([initialSlot]);

  useEffect(() => {
    apiClient
      .get('/slots/public')
      .then((data: TimeSlot[]) => setAllSlots(data))
      .catch(() => {
        /* stays empty */
      })
      .finally(() => setLoading(false));
  }, []);

  const slots = allSlots.filter((s) => s.lessonId === filterLessonId);
  const availableDates = new Set(slots.filter((s) => s.spotsLeft > 0).map((s) => s.date));
  const bookedDates = new Set(selectedSlots.map((s) => s.date));
  const slotsForDay = activeDayStr ? slots.filter((s) => s.date === activeDayStr) : [];

  const toggleSlot = (slot: TimeSlot) => {
    const isSelected = selectedSlots.some((s) => s.id === slot.id);
    if (isSelected) {
      setSelectedSlots((prev) => prev.filter((s) => s.id !== slot.id));
    } else if (selectedSlots.length < required) {
      setSelectedSlots((prev) => [...prev, slot]);
    }
  };

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
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Select {required} sessions — all dates are confirmed upfront. Your first session is already picked below.
        </p>
      </div>

      <SelectedSlotsList
        selectedSlots={selectedSlots}
        required={required}
        onRemove={(id) => setSelectedSlots((prev) => prev.filter((s) => s.id !== id))}
        onConfirm={() => onConfirm(selectedSlots)}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-background border rounded-2xl p-5">
          {loading ? (
            <p className="text-sm text-muted-foreground text-center py-8">Loading availability...</p>
          ) : slots.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No available sessions at the moment. Check back soon!
            </p>
          ) : (
            <CalendarMonth
              year={calYear}
              month={calMonth}
              availableDates={availableDates}
              bookedDates={bookedDates}
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
                    const isSelected = selectedSlots.some((s) => s.id === slot.id);
                    const isDisabled = isFull || (selectedSlots.length >= required && !isSelected);

                    return (
                      <button
                        key={slot.id}
                        onClick={() => !isDisabled && toggleSlot(slot)}
                        disabled={isDisabled}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : isFull || isDisabled
                              ? 'border-border opacity-40 cursor-not-allowed'
                              : 'border-border hover:border-primary/60 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              {formatTime(slot.time)} · {slot.durationMinutes} min
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Users className="w-3 h-3" />
                              {isFull ? 'Full' : `${slot.spotsLeft} spot${slot.spotsLeft > 1 ? 's' : ''} left`}
                            </p>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-primary" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
