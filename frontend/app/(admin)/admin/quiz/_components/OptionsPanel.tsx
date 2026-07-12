'use client';

import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { FormOption } from '@/lib/types';
import type { OptionFormData } from './OptionForm';
import OptionForm from './OptionForm';

interface Props {
  fieldId: number;
  options: FormOption[];
  showNewOption: boolean;
  editingOption: number | null;
  optionForm: OptionFormData;
  setO: (key: string, value: string) => void;
  onAddOption: () => void;
  onCreateOption: () => void;
  onCancelNew: () => void;
  onEditOption: (option: FormOption) => void;
  onSaveOption: (optionId: number) => void;
  onCancelEdit: () => void;
  onDeleteOption: (optionId: number) => void;
}

export default function OptionsPanel({
  options, showNewOption, editingOption, optionForm, setO,
  onAddOption, onCreateOption, onCancelNew,
  onEditOption, onSaveOption, onCancelEdit, onDeleteOption,
}: Props) {
  return (
    <div className="border-t px-4 py-3 bg-muted/10">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Options</p>
        <button onClick={onAddOption}
          className="flex items-center gap-1 text-xs px-2 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          <Plus className="w-3 h-3" /> Add Option
        </button>
      </div>

      {showNewOption && (
        <div className="mb-2">
          <OptionForm form={optionForm} setO={setO} onSave={onCreateOption} onCancel={onCancelNew} />
        </div>
      )}

      {options.length === 0 ? (
        <p className="text-xs text-muted-foreground">No options yet</p>
      ) : (
        <div className="space-y-1">
          {options.map((option) => (
            <div key={option.id} className="bg-background border rounded-md">
              {editingOption === option.id ? (
                <div className="p-3">
                  <OptionForm form={optionForm} setO={setO}
                    onSave={() => onSaveOption(option.id)} onCancel={onCancelEdit} />
                </div>
              ) : (
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{option.label}</p>
                    <p className="text-xs text-muted-foreground">
                      value: <span className="font-mono">{option.value}</span>
                      {option.feedback && <span className="ml-2">· &quot;{option.feedback}&quot;</span>}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => onEditOption(option)}
                      className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => onDeleteOption(option.id)}
                      className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
