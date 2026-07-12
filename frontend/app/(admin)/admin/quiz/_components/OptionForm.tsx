'use client';

import { Check } from 'lucide-react';

export type OptionFormData = {
  label: string;
  value: string;
  feedback: string;
  imageUrl: string;
};

interface Props {
  form: OptionFormData;
  setO: (key: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function OptionForm({ form, setO, onSave, onCancel }: Props) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Label *</label>
          <input value={form.label} onChange={(e) => setO('label', e.target.value)}
            className="w-full px-2 py-1.5 text-xs bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Value *</label>
          <input value={form.value} onChange={(e) => setO('value', e.target.value)}
            placeholder="UPPER_CASE"
            className="w-full px-2 py-1.5 text-xs bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring font-mono" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Feedback</label>
          <input value={form.feedback} onChange={(e) => setO('feedback', e.target.value)}
            className="w-full px-2 py-1.5 text-xs bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Image URL <span className="text-muted-foreground/60">(optional)</span>
        </label>
        <input value={form.imageUrl} onChange={(e) => setO('imageUrl', e.target.value)}
          placeholder="https://..."
          className="w-full px-2 py-1.5 text-xs bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring" />
        {form.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.imageUrl} alt="preview" className="mt-2 h-16 rounded-md object-cover" />
        )}
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={onSave}
          className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90">
          <Check className="w-3 h-3" /> Save
        </button>
        <button onClick={onCancel}
          className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-medium rounded-md hover:bg-muted/80">
          Cancel
        </button>
      </div>
    </div>
  );
}
