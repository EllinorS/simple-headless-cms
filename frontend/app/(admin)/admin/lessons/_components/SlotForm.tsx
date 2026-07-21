'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import type { Lesson, TimeSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// label -> minutes, same fixed list the old SessionEditor used
const DURATIONS: { label: string; minutes: number }[] = [
  { label: '30min', minutes: 30 },
  { label: '45min', minutes: 45 },
  { label: '1h', minutes: 60 },
  { label: '1h15', minutes: 75 },
  { label: '1h30', minutes: 90 },
  { label: '1h45', minutes: 105 },
  { label: '2h', minutes: 120 },
  { label: '2h15', minutes: 135 },
  { label: '2h30', minutes: 150 },
  { label: '2h45', minutes: 165 },
  { label: '3h', minutes: 180 },
];

const minutesToLabel = (minutes: number) =>
  DURATIONS.find((d) => d.minutes === minutes)?.label ?? DURATIONS[6].label;

// Flat single-row creation form (old SessionEditor style). Price/deposit/duration/max
// participants are pre-filled from the selected lesson's catalog defaults when Type changes,
// but stay fully editable — each slot stores its own values, independent of the catalog after creation.
//
// Type dropdown only ever lists the 2 single (base) lessons — package rows never get their own
// slots, they book against their base lesson's slots (see project_package_booking_logic memory).
export default function SlotForm({
  lessons,
  onCreated,
}: {
  lessons: Lesson[];
  onCreated: (slot: TimeSlot) => void;
}) {
  const baseLessons = lessons.filter((l) => !l.isPackage);
  const firstLesson = baseLessons[0];
  const [lessonId, setLessonId] = useState(firstLesson?.id);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState(firstLesson?.price ?? 0);
  const [depositAmount, setDepositAmount] = useState(firstLesson?.depositAmount ?? 0);
  const [durationLabel, setDurationLabel] = useState(
    minutesToLabel(firstLesson?.durationMinutes ?? 120),
  );
  const [maxParticipants, setMaxParticipants] = useState(firstLesson?.maxParticipants ?? 6);
  const [saving, setSaving] = useState(false);

  const lesson = baseLessons.find((l) => l.id === lessonId);

  const handleTypeChange = (value: string) => {
    const id = Number(value);
    setLessonId(id);
    const selected = baseLessons.find((l) => l.id === id);
    if (selected) {
      setPrice(selected.price);
      setDepositAmount(selected.depositAmount);
      setDurationLabel(minutesToLabel(selected.durationMinutes));
      setMaxParticipants(selected.maxParticipants);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !time || !lesson) return;
    setSaving(true);
    const durationMinutes = DURATIONS.find((d) => d.label === durationLabel)!.minutes;
    const payload = { lessonId: lesson.id, date, time, durationMinutes, maxParticipants, price, depositAmount };
    try {
      const created = await apiClient.post('/slots', payload);
      toast.success('Slot added');
      onCreated({
        id: created.id,
        lessonId: lesson.id,
        title: lesson.title,
        type: lesson.type,
        date,
        time,
        durationMinutes,
        maxParticipants,
        price,
        depositAmount,
        level: lesson.level,
        isCancelled: false,
        cancelReason: null,
        cancelledAt: null,
        notes: null,
        spotsLeft: maxParticipants,
      });
      setDate('');
      setTime('');
    } catch {
      toast.error('Failed to add slot');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-end">
      <div className="flex flex-col gap-1">
        <Label htmlFor="slot-date">Date</Label>
        <Input id="slot-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="slot-time">Time</Label>
        <Input id="slot-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="slot-type">Type</Label>
        <Select value={String(lessonId)} onValueChange={handleTypeChange}>
          <SelectTrigger id="slot-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {baseLessons.map((l) => (
              <SelectItem key={l.id} value={String(l.id)}>
                {l.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="slot-price">Price (NZD / person)</Label>
        <Input
          id="slot-price"
          type="number"
          min="0"
          step="1"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="slot-deposit">Deposit (NZD)</Label>
        <Input
          id="slot-deposit"
          type="number"
          min="0"
          step="1"
          value={depositAmount}
          onChange={(e) => setDepositAmount(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="slot-duration">Duration</Label>
        <Select value={durationLabel} onValueChange={setDurationLabel}>
          <SelectTrigger id="slot-duration">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DURATIONS.map((d) => (
              <SelectItem key={d.label} value={d.label}>
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="slot-max-participants">Max participants</Label>
        <Input
          id="slot-max-participants"
          type="number"
          min="1"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(Number(e.target.value))}
        />
      </div>
      <Button type="submit" disabled={!date || !time || !lesson || saving} className="flex items-center gap-1.5">
        + Add slot
      </Button>
    </form>
  );
}
