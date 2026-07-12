'use client';

import { X, Check } from 'lucide-react';
import Toggle from '@/components/admin/Toggle';

const FIELD_TYPES = ['SINGLE', 'MULTIPLE', 'RANK', 'TEXT'] as const;
const DISPLAY_TYPES = ['CARDS', 'SLIDER', 'CHECKBOX', 'RADIO'] as const;

export type FieldFormData = {
  label: string;
  subtitle: string;
  explanation: string;
  imageUrl: string;
  type: 'SINGLE' | 'MULTIPLE' | 'RANK' | 'TEXT';
  displayType: 'CARDS' | 'SLIDER' | 'CHECKBOX' | 'RADIO';
  isRequired: boolean;
};

interface Props {
  form: FieldFormData;
  setF: (key: string, value: unknown) => void;
  onSave: () => void;
  onCancel: () => void;
  title: string;
}

export default function FieldForm({ form, setF, onSave, onCancel, title }: Props) {
  return (
    <div className="bg-background border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold">{title}</p>
        <button onClick={onCancel}><X className="w-4 h-4 text-muted-foreground" /></button>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Question Image/GIF <span className="text-muted-foreground/60">(optional)</span>
          </label>
          <input value={form.imageUrl} onChange={(e) => setF('imageUrl', e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring" />
          {form.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.imageUrl} alt="preview" className="mt-2 h-20 rounded-md object-cover" />
          )}
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Question *</label>
          <input value={form.label} onChange={(e) => setF('label', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Subtitle</label>
          <input value={form.subtitle} onChange={(e) => setF('subtitle', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Explanation</label>
          <textarea value={form.explanation} onChange={(e) => setF('explanation', e.target.value)}
            rows={2} className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Type</label>
            <select value={form.type} onChange={(e) => setF('type', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring">
              {FIELD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {form.type !== 'TEXT' && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Display</label>
              <select value={form.displayType} onChange={(e) => setF('displayType', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring">
                {DISPLAY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          )}
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Toggle value={form.isRequired} onChange={() => setF('isRequired', !form.isRequired)} />
          <span className="text-sm">Required</span>
        </label>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={onSave}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90">
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
