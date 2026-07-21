// Booking wizard: orchestrates the flow (calendar → option → slots [package only] → form).
// Step 1 shows every upcoming session (Adults + Kids together) so clients see availability
// immediately, like the site's original WeekCalendar. Clicking "Book" on a session locks in its
// lesson type and counts as the first session; single lessons skip straight to the details form,
// packages continue to pick their remaining dates. State lives here so "Back" preserves selections.
'use client';

import { useState } from 'react';
import { AllSlotsCalendar } from './AllSlotsCalendar';
import { LessonPicker } from './LessonPicker';
import { SlotPicker } from './SlotPicker';
import { BookingForm } from './BookingForm';
import { StepIndicator } from './StepIndicator';
import type { Lesson, TimeSlot } from '@/lib/types';

type Step = 'calendar' | 'option' | 'slots' | 'form';

interface BookingState {
  firstSlot: TimeSlot | null;
  type: 'Adults' | 'Kids' | null;
  lesson: Lesson | null;
  selectedSlots: TimeSlot[];
}

const EMPTY_STATE: BookingState = { firstSlot: null, type: null, lesson: null, selectedSlots: [] };

export function BookingWizard() {
  const [step, setStep] = useState<Step>('calendar');
  const [booking, setBooking] = useState<BookingState>(EMPTY_STATE);

  const handleBook = (slot: TimeSlot) => {
    const type = slot.type === 'KIDS' ? 'Kids' : 'Adults';
    setBooking({ firstSlot: slot, type, lesson: null, selectedSlots: [] });
    setStep('option');
  };

  const handleLessonSelect = (lesson: Lesson) => {
    if (!booking.firstSlot) return;
    if (!lesson.isPackage) {
      setBooking((b) => ({ ...b, lesson, selectedSlots: [booking.firstSlot!] }));
      setStep('form');
    } else {
      setBooking((b) => ({ ...b, lesson, selectedSlots: [] }));
      setStep('slots');
    }
  };

  const handleSlotsConfirm = (slots: TimeSlot[]) => {
    setBooking((b) => ({ ...b, selectedSlots: slots }));
    setStep('form');
  };

  return (
    <div className="container mx-auto max-w-3xl px-6 py-10">
      <StepIndicator current={step} isPackage={!!booking.lesson?.isPackage} />

      {step === 'calendar' && <AllSlotsCalendar onBook={handleBook} />}

      {step === 'option' && booking.type && (
        <LessonPicker type={booking.type} onSelect={handleLessonSelect} onBack={() => setStep('calendar')} />
      )}

      {step === 'slots' && booking.lesson && booking.firstSlot && (
        <SlotPicker
          lesson={booking.lesson}
          initialSlot={booking.firstSlot}
          onConfirm={handleSlotsConfirm}
          onBack={() => setStep('option')}
        />
      )}

      {step === 'form' && booking.lesson && booking.selectedSlots.length > 0 && (
        <BookingForm
          lesson={booking.lesson}
          selectedSlots={booking.selectedSlots}
          onBack={() => setStep(booking.lesson!.isPackage ? 'slots' : 'option')}
        />
      )}
    </div>
  );
}
