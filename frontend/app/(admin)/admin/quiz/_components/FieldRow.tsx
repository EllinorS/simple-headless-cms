'use client';

import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { FormField } from '@/lib/types';
import type { FieldFormData } from './FieldForm';
import FieldForm from './FieldForm';

interface Props {
  field: FormField;
  idx: number;
  expanded: boolean;
  editing: boolean;
  fieldForm: FieldFormData;
  setF: (key: string, value: unknown) => void;
  onToggleExpand: () => void;
  onEdit: () => void;
  onSave: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  children: React.ReactNode; // OptionsPanel
}

export default function FieldRow({
  field, idx, expanded, editing, fieldForm, setF,
  onToggleExpand, onEdit, onSave, onCancelEdit, onDelete, children,
}: Props) {
  return (
    <div className="bg-background border rounded-lg overflow-hidden">
      <div className="flex items-start gap-3 p-4">
        <span className="text-xs font-bold text-muted-foreground mt-1 w-5 shrink-0">{idx + 1}</span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">{field.label}</p>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{field.type}</span>
            {field.displayType && (
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{field.displayType}</span>
            )}
            {field.isRequired && (
              <span className="text-xs text-accent px-2 py-0.5 rounded-full bg-accent/10">Required</span>
            )}
            <span className="text-xs text-muted-foreground">{field.options?.length ?? 0} options</span>
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button onClick={onEdit} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-md text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={onToggleExpand} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {editing && (
        <div className="border-t px-4 py-3 bg-muted/20">
          <FieldForm form={fieldForm} setF={setF} onSave={onSave} onCancel={onCancelEdit} title="Edit Question" />
        </div>
      )}

      {expanded && !editing && children}
    </div>
  );
}
