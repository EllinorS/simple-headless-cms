'use client';

import { useEffect } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import type { FormField } from '@/lib/types';

function SliderField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
}) {
  const idx = (field.options ?? []).findIndex((o) => o.value === value);
  const current = idx >= 0 ? idx : 0;

  return (
    <div className="space-y-6">
      <input
        type="range"
        min={0}
        max={(field.options ?? []).length - 1}
        value={current}
        onChange={(e) => onChange((field.options ?? [])[parseInt(e.target.value)].value)}
        aria-label={field.label}
        className="w-full accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        {(field.options ?? []).map((o) => (
          <span key={o.id} className={o.value === value ? 'text-primary font-semibold' : ''}>
            {o.label.split('—')[0].trim()}
          </span>
        ))}
      </div>
      {value && (
        <div className="bg-primary/10 rounded-xl p-4 text-sm text-center">
          <p className="font-medium">
            {(field.options ?? []).find((o) => o.value === value)?.label}
          </p>
          {(field.options ?? []).find((o) => o.value === value)?.feedback && (
            <p className="text-muted-foreground mt-1 text-xs">
              {(field.options ?? []).find((o) => o.value === value)?.feedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function RadioField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      {(field.options ?? []).map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.value)}
          className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-colors text-sm ${
            value === option.value
              ? 'border-primary bg-primary/10 font-medium'
              : 'border-border hover:border-primary/50'
          }`}
        >
          {option.label}
          {value === option.value && option.feedback && (
            <p className="text-xs text-muted-foreground mt-1 font-normal">{option.feedback}</p>
          )}
        </button>
      ))}
    </div>
  );
}

function CheckboxField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
}) {
  const selected = value ? value.split(',') : [];
  const toggle = (v: string) => {
    const next = selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v];
    onChange(next.join(','));
  };

  return (
    <div className="space-y-3">
      {(field.options ?? []).map((option) => {
        const checked = selected.includes(option.value);
        return (
          <button
            key={option.id}
            onClick={() => toggle(option.value)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-colors text-sm flex items-center gap-3 ${
              checked ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
            }`}
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                checked ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}
            >
              {checked && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function CardsField({
  field,
  value,
  onChange,
  multi,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
  multi?: boolean;
}) {
  const selected = value ? value.split(',') : [];
  const toggle = (v: string) => {
    if (multi) {
      const next = selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v];
      onChange(next.join(','));
    } else {
      onChange(v);
    }
  };

  const hasImages = (field.options ?? []).some((o) => o.imageUrl);

  return (
    <div className={`grid gap-3 ${hasImages ? 'grid-cols-2 sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
      {(field.options ?? []).map((option) => {
        const active = multi ? selected.includes(option.value) : value === option.value;
        return (
          <button
            key={option.id}
            onClick={() => toggle(option.value)}
            className={`text-left rounded-xl border-2 transition-colors overflow-hidden ${
              active ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
            }`}
          >
            {option.imageUrl && (
              <div className="w-full aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={option.imageUrl}
                  alt={option.label}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="px-3 py-2">
              <p className={`text-sm ${active ? 'font-medium' : ''}`}>{option.label}</p>
              {active && option.feedback && (
                <p className="text-xs text-muted-foreground mt-1">{option.feedback}</p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function RankField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
}) {
  const ordered = value
    ? value
        .split(',')
        .map((v) => (field.options ?? []).find((o) => o.value === v)!)
        .filter(Boolean)
    : [...(field.options ?? [])];

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...ordered];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    onChange(next.map((o) => o.value).join(','));
  };

  useEffect(() => {
    if (!value && field.options) onChange((field.options ?? []).map((o) => o.value).join(','));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-2">
      {ordered.map((option, idx) => (
        <div key={option.id} className="flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-3">
          <span className="text-xs font-bold text-primary w-5 shrink-0">{idx + 1}</span>
          <p className="flex-1 text-sm">{option.label}</p>
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => move(idx, -1)}
              disabled={idx === 0}
              aria-label={`Move ${option.label} up`}
              className="p-0.5 disabled:opacity-30 hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4 rotate-90" />
            </button>
            <button
              onClick={() => move(idx, 1)}
              disabled={idx === ordered.length - 1}
              aria-label={`Move ${option.label} down`}
              className="p-0.5 disabled:opacity-30 hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4 -rotate-90" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function TextField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.explanation || ''}
      aria-label={field.label}
      rows={4}
      className="w-full px-4 py-3 text-sm bg-muted border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ring"
    />
  );
}

export function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
}) {
  if (field.displayType === 'SLIDER')
    return <SliderField field={field} value={value} onChange={onChange} />;
  if (field.displayType === 'RADIO')
    return <RadioField field={field} value={value} onChange={onChange} />;
  if (field.displayType === 'CHECKBOX')
    return <CheckboxField field={field} value={value} onChange={onChange} />;
  if (field.displayType === 'CARDS')
    return (
      <CardsField
        field={field}
        value={value}
        onChange={onChange}
        multi={field.type === 'MULTIPLE'}
      />
    );
  if (field.type === 'RANK') return <RankField field={field} value={value} onChange={onChange} />;
  if (field.type === 'TEXT') return <TextField field={field} value={value} onChange={onChange} />;
  return null;
}
