'use client';

interface Props {
  value: boolean;
  onChange: () => void;
}

export default function Toggle({ value, onChange }: Props) {
  return (
    <div
      onClick={onChange}
      className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer shrink-0 ${
        value ? 'bg-primary' : 'bg-muted-foreground/30'
      }`}
    >
      <div
        className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
          value ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </div>
  );
}
