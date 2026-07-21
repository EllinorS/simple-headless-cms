// Final booking step: collects client details and submits to the API.
// Splits into single-booking (/bookings) and package (/bookings/multiple) endpoints based on
// lesson.isPackage. lessonId is always the purchased catalog product (single row or package row).
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { BookingSummary } from './BookingSummary';
import type { Lesson, TimeSlot } from '@/lib/types';

interface BookingFormProps {
  lesson: Lesson;
  selectedSlots: TimeSlot[];
  onBack: () => void;
}

const FIELDS = [
  { key: 'clientFirstname', label: 'First name', type: 'text', required: true },
  { key: 'clientLastname', label: 'Last name', type: 'text', required: true },
  { key: 'clientEmail', label: 'Email', type: 'email', required: true },
  { key: 'clientPhone', label: 'Phone', type: 'tel', required: false },
] as const;

export function BookingForm({ lesson, selectedSlots, onBack }: BookingFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    clientFirstname: '',
    clientLastname: '',
    clientEmail: '',
    clientPhone: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async () => {
    if (!form.clientFirstname || !form.clientLastname || !form.clientEmail) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      if (lesson.isPackage) {
        await apiClient.post('/bookings/multiple', {
          lessonId: lesson.id,
          slotIds: selectedSlots.map((s) => s.id),
          clientFirstname: form.clientFirstname,
          clientLastname: form.clientLastname,
          clientEmail: form.clientEmail,
          clientPhone: form.clientPhone || undefined,
        });
      } else {
        await apiClient.post('/bookings', {
          lessonId: lesson.id,
          slotId: selectedSlots[0].id,
          clientFirstname: form.clientFirstname,
          clientLastname: form.clientLastname,
          clientEmail: form.clientEmail,
          clientPhone: form.clientPhone || undefined,
          notes: form.notes || undefined,
        });
      }
      router.push('/book-surf-lesson/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Back to calendar
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <BookingSummary lesson={lesson} selectedSlots={selectedSlots} />

        <div>
          <h2 className="text-2xl font-bold mb-6">Your details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {FIELDS.slice(0, 2).map(({ key, label, type, required }) => (
                <div key={key}>
                  <label htmlFor={`booking-${key}`} className="text-xs font-medium text-muted-foreground mb-1 block">
                    {label} {required && '*'}
                  </label>
                  <input
                    id={`booking-${key}`}
                    type={type}
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
            </div>

            {FIELDS.slice(2).map(({ key, label, type, required }) => (
              <div key={key}>
                <label htmlFor={`booking-${key}`} className="text-xs font-medium text-muted-foreground mb-1 block">
                  {label} {required && '*'}
                </label>
                <input
                  id={`booking-${key}`}
                  type={type}
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}

            {!lesson.isPackage && (
              <div>
                <label htmlFor="booking-notes" className="text-xs font-medium text-muted-foreground mb-1 block">
                  Notes (optional)
                </label>
                <textarea
                  id="booking-notes"
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  rows={3}
                  placeholder="Any info we should know (injuries, experience, etc.)"
                  className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button onClick={handleSubmit} disabled={submitting} size="lg" className="w-full mt-2">
              {submitting ? 'Confirming...' : 'Confirm booking →'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              A confirmation email will be sent to you with a link to manage your booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
