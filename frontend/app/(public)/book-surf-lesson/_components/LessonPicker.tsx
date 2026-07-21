// Step 2: choose Single / 3-Pack / 5-Pack — for the type already locked in by the session the
// client clicked "Book" on in step 1 (AllSlotsCalendar). Fetches the real catalog (2 single
// lessons + 4 package rows) instead of a hardcoded price map, so admin edits in /admin/lessons
// show up here directly.
'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import type { Lesson } from '@/lib/types';
import { ChevronLeft, Users } from 'lucide-react';

interface LessonPickerProps {
  type: 'Adults' | 'Kids';
  onSelect: (lesson: Lesson) => void;
  onBack: () => void;
}

export function LessonPicker({ type, onSelect, onBack }: LessonPickerProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/lessons/public')
      .then((data: Lesson[]) => setLessons(data))
      .catch(() => {
        /* stays empty */
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground text-center py-8">Loading options...</p>;
  }

  const options = lessons.filter((l) => l.type === (type === 'Kids' ? 'KIDS' : 'ADULTS'));

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Back to calendar
      </button>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">{type} — how many sessions?</h2>
        <p className="text-muted-foreground text-sm mt-1">
          A deposit secures your spot — refundable up to 24h before the session.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        {options.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => onSelect(lesson)}
            className="w-full text-left px-4 py-3 rounded-xl border-2 border-border hover:border-primary/60 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{lesson.isPackage ? `${lesson.sessionsCount}-Pack` : 'Single session'}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Users className="w-3 h-3" />
                  {lesson.isPackage
                    ? `${lesson.sessionsCount} sessions — deposit $${lesson.depositAmount}`
                    : `Deposit $${lesson.depositAmount}`}
                </p>
              </div>
              <span className="font-bold text-primary">${lesson.price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
