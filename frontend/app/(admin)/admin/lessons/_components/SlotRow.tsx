'use client';

import { useState } from 'react';
import { Ban, Trash2 } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { formatSessionDate, formatTime } from '@/lib/date-formatter';
import { toast } from 'sonner';
import type { TimeSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function SlotRow({
  slot,
  onCancelled,
  onDeleted,
}: {
  slot: TimeSlot;
  onCancelled: () => void;
  onDeleted: () => void;
}) {
  const [saving, setSaving] = useState(false);

  const handleCancel = async () => {
    const cancelReason = prompt(`Cancel this ${slot.title} slot on ${slot.date}? Reason:`);
    if (!cancelReason) return;
    setSaving(true);
    try {
      await apiClient.patch(`/slots/${slot.id}/cancel`, { cancelReason });
      toast.success('Slot cancelled');
      onCancelled();
    } catch {
      toast.error('Failed to cancel slot');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete this ${slot.title} slot on ${slot.date}? This cannot be undone.`)) return;
    setSaving(true);
    try {
      await apiClient.delete(`/slots/${slot.id}`);
      toast.success('Slot deleted');
      onDeleted();
    } catch {
      toast.error('Failed to delete slot');
    } finally {
      setSaving(false);
    }
  };

  const isPast = new Date(`${slot.date}T${slot.time}`) < new Date();

  return (
    <div className="px-4 py-3 text-sm space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-medium shrink-0">{formatSessionDate(slot.date)}</span>
          <span className="text-primary shrink-0">{formatTime(slot.time)}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {!slot.isCancelled && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              disabled={saving}
              aria-label="Cancel slot"
              className="text-muted-foreground hover:text-destructive"
            >
              <Ban className="w-3.5 h-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={saving}
            aria-label="Delete slot"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
        <span className="truncate">{slot.title}</span>
        <span>{slot.durationMinutes} min</span>
        <span className="font-medium text-foreground">${slot.price}</span>
        {isPast && !slot.isCancelled && (
          <span className="text-xs border rounded px-2 py-0.5">Past</span>
        )}
        {slot.isCancelled && (
          <span className="text-xs text-destructive border border-destructive/40 rounded px-2 py-0.5">
            Cancelled
          </span>
        )}
      </div>
    </div>
  );
}
