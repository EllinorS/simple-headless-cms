'use client';

import { Button } from '@/components/ui/button';

export interface ClientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function ContactStep({
  client,
  onChange,
  onSubmit,
  submitting,
}: {
  client: ClientInfo;
  onChange: (k: keyof ClientInfo, v: string) => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {(
          [
            { key: 'firstName', label: 'First name', required: true },
            { key: 'lastName', label: 'Last name', required: true },
            { key: 'email', label: 'Email', required: true },
            { key: 'phone', label: 'Phone', required: false },
          ] as { key: keyof ClientInfo; label: string; required: boolean }[]
        ).map(({ key, label, required }) => (
          <div key={key}>
            <label htmlFor={`quiz-${key}`} className="text-xs font-medium text-muted-foreground mb-1 block">
              {label}
              {required && ' *'}
            </label>
            <input
              id={`quiz-${key}`}
              type={key === 'email' ? 'email' : 'text'}
              value={client[key]}
              onChange={(e) => onChange(key, e.target.value)}
              className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        ))}
      </div>
      <Button onClick={onSubmit} disabled={submitting} size="lg" className="w-full mt-4">
        {submitting ? 'Sending...' : 'Send my request →'}
      </Button>
    </div>
  );
}
