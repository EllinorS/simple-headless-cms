'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import type { Lesson, TimeSlot } from '@/lib/types';
import LessonCatalogEditor from './_components/LessonCatalogEditor';
import SlotForm from './_components/SlotForm';
import SlotRow from './_components/SlotRow';

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiClient.get('/lessons'), apiClient.get('/slots')])
      .then(([lessonsRes, slotsRes]) => {
        setLessons(lessonsRes);
        setSlots(slotsRes);
      })
      .catch(() => toast.error('Failed to load schedule'))
      .finally(() => setLoading(false));
  }, []);

  const handleLessonUpdated = (lesson: Lesson) => {
    setLessons((prev) => prev.map((l) => (l.id === lesson.id ? lesson : l)));
  };

  const handleSlotCreated = (slot: TimeSlot) => {
    setSlots((prev) =>
      [...prev, slot].sort((a, b) =>
        a.date !== b.date ? a.date.localeCompare(b.date) : a.time.localeCompare(b.time),
      ),
    );
  };

  const handleSlotCancelled = (id: number) => {
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, isCancelled: true } : s)));
  };

  const handleSlotDeleted = (id: number) => {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  };

  if (loading) return <p className="text-sm text-muted-foreground py-2">Loading...</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Lessons</h1>
        <p className="text-muted-foreground mt-1">
          Catalog defaults (price/duration/capacity) and the upcoming lesson schedule.
        </p>
      </div>

      <LessonCatalogEditor lessons={lessons} onUpdated={handleLessonUpdated} />

      <div>
        <h2 className="text-xl font-semibold mb-3">Schedule</h2>
        <div className="bg-background rounded-lg border px-4 py-3 space-y-4">
          {slots.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No slots added yet</p>
          ) : (
            <div className="divide-y">
              {slots.map((slot) => (
                <SlotRow
                  key={slot.id}
                  slot={slot}
                  onCancelled={() => handleSlotCancelled(slot.id)}
                  onDeleted={() => handleSlotDeleted(slot.id)}
                />
              ))}
            </div>
          )}
          <div className="border-t pt-4">
            <SlotForm lessons={lessons} onCreated={handleSlotCreated} />
          </div>
        </div>
      </div>
    </div>
  );
}
