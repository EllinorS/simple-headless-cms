'use client';

import { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import type { Lesson } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

const LEVELS: Lesson['level'][] = ['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

// Fixed catalog editor (2 single lessons + 4 package rows) — no add/delete, just inline edit of
// each row's price/duration/max participants/level/deposit. is_package/sessions_count/
// base_lesson_id are structural (set once via SQL, not admin-editable) so package rows use the
// exact same editable fields as single rows, just flagged with a "Package" badge for clarity.
export default function LessonCatalogEditor({
  lessons,
  onUpdated,
}: {
  lessons: Lesson[];
  onUpdated: (lesson: Lesson) => void;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <Accordion type="single" collapsible className="bg-background rounded-lg border overflow-hidden">
      <AccordionItem value="catalog" className="border-0">
        <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline hover:bg-muted/50">
          Lesson catalog
        </AccordionTrigger>
        <AccordionContent className="px-0 pb-0 pt-0">
          <div className="divide-y border-t">
            {lessons.map((lesson) =>
        editingId === lesson.id ? (
          <CatalogRowEditing
            key={lesson.id}
            lesson={lesson}
            onSaved={(updated) => {
              onUpdated(updated);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <div key={lesson.id} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-3 text-sm">
            <span className="font-medium shrink-0">{lesson.title}</span>
            {lesson.isPackage && (
              <span className="text-xs bg-primary/10 text-primary border border-primary/30 rounded px-2 py-0.5 shrink-0">
                Package ×{lesson.sessionsCount}
              </span>
            )}
            <span className="text-xs bg-muted border rounded px-2 py-0.5 shrink-0">
              {lesson.level}
            </span>
            <span className="text-muted-foreground shrink-0 hidden sm:inline">
              Max {lesson.maxParticipants}
            </span>
            <span className="text-muted-foreground shrink-0 hidden sm:inline">
              {lesson.durationMinutes} min
            </span>
            <span className="font-medium shrink-0">${lesson.price}</span>
            <span className="text-xs text-muted-foreground shrink-0">
              ${lesson.depositAmount} deposit
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingId(lesson.id)}
              aria-label="Edit catalog values"
              className="ml-auto"
            >
              <Pencil className="w-3.5 h-3.5" />
            </Button>
          </div>
            ),
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function CatalogRowEditing({
  lesson,
  onSaved,
  onCancel,
}: {
  lesson: Lesson;
  onSaved: (lesson: Lesson) => void;
  onCancel: () => void;
}) {
  const [price, setPrice] = useState(lesson.price);
  const [depositAmount, setDepositAmount] = useState(lesson.depositAmount);
  const [durationLabel, setDurationLabel] = useState(minutesToLabel(lesson.durationMinutes));
  const [maxParticipants, setMaxParticipants] = useState(lesson.maxParticipants);
  const [level, setLevel] = useState<Lesson['level']>(lesson.level);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const durationMinutes = DURATIONS.find((d) => d.label === durationLabel)!.minutes;
    const payload = { durationMinutes, maxParticipants, price, depositAmount, level };
    try {
      await apiClient.patch(`/lessons/${lesson.id}`, payload);
      toast.success('Catalog updated');
      onSaved({ ...lesson, ...payload });
      // best-effort: public pages self-heal via cache expiry even if this fails
      fetch('/api/revalidate-lessons', { method: 'POST' }).catch(() => {});
    } catch {
      toast.error('Failed to update catalog');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-wrap items-end gap-2 px-4 py-3">
      <span className="font-medium w-32 shrink-0 self-center">{lesson.title}</span>
      <div className="flex flex-col gap-1">
        <Input
          type="number"
          min="0"
          step="1"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-24"
          aria-label="Price"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Input
          type="number"
          min="0"
          step="1"
          value={depositAmount}
          onChange={(e) => setDepositAmount(Number(e.target.value))}
          className="w-24"
          aria-label="Deposit"
        />
      </div>
      <Select value={durationLabel} onValueChange={setDurationLabel}>
        <SelectTrigger className="w-24" aria-label="Duration">
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
      <Input
        type="number"
        min="1"
        value={maxParticipants}
        onChange={(e) => setMaxParticipants(Number(e.target.value))}
        className="w-20"
        aria-label="Max participants"
      />
      <Select value={level} onValueChange={(v) => setLevel(v as Lesson['level'])}>
        <SelectTrigger className="w-32" aria-label="Level">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LEVELS.map((l) => (
            <SelectItem key={l} value={l}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" onClick={handleSave} disabled={saving} aria-label="Save">
          <Check className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onCancel} disabled={saving} aria-label="Cancel">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
