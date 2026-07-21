'use client';

import { Button } from '@/components/ui/button';
import { formatTime, formatSessionDate } from '@/lib/date-formatter';
import type { TimeSlot } from '@/lib/types';

interface SelectedSlotsListProps {
  selectedSlots: TimeSlot[];
  required: number;
  onRemove: (slotId: number) => void;
  onConfirm: () => void;
}

export function SelectedSlotsList({ selectedSlots, required, onRemove, onConfirm }: SelectedSlotsListProps) {
  return (
    <div className="mb-4 p-4 bg-muted/40 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">
          {selectedSlots.length} of {required} sessions selected
        </p>
        {selectedSlots.length === required && (
          <Button size="sm" onClick={onConfirm}>
            Continue →
          </Button>
        )}
      </div>
      {selectedSlots.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSlots
            .slice()
            .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
            .map((s) => (
              <span
                key={s.id}
                className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full"
              >
                {formatSessionDate(s.date)} · {formatTime(s.time)}
                <button onClick={() => onRemove(s.id)} className="ml-1 hover:text-destructive transition-colors">
                  ×
                </button>
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
