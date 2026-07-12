'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import FieldForm, { type FieldFormData } from './_components/FieldForm';
import { type OptionFormData } from './_components/OptionForm';
import FieldRow from './_components/FieldRow';
import OptionsPanel from './_components/OptionsPanel';
import type { Form, FormField, FormOption } from '@/lib/types';

const FORM_ID = 1;

const EMPTY_FIELD: FieldFormData = {
  label: '', subtitle: '', explanation: '', imageUrl: '',
  type: 'SINGLE', displayType: 'RADIO', isRequired: true,
};

const EMPTY_OPTION: OptionFormData = {
  label: '', value: '', feedback: '', imageUrl: '',
};

export default function QuizPage() {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedField, setExpandedField] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<number | null>(null);
  const [fieldForm, setFieldForm] = useState<FieldFormData>(EMPTY_FIELD);
  const [showNewField, setShowNewField] = useState(false);
  const [editingOption, setEditingOption] = useState<number | null>(null);
  const [optionForm, setOptionForm] = useState<OptionFormData>(EMPTY_OPTION);
  const [showNewOption, setShowNewOption] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiClient.get(`/forms/${FORM_ID}`);
        setForm(data as Form);
      } catch { toast.error('Failed to load quiz'); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const handleUpdateField = async (fieldId: number) => {
    try {
      await apiClient.put(`/forms/fields/${fieldId}`, {
        label: fieldForm.label, subtitle: fieldForm.subtitle || null,
        explanation: fieldForm.explanation || null, type: fieldForm.type,
        displayType: fieldForm.type === 'TEXT' ? null : fieldForm.displayType,
        isRequired: fieldForm.isRequired, imageUrl: fieldForm.imageUrl || null,
      });
      setForm((prev) => prev ? {
        ...prev,
        fields: prev.fields.map((f) => f.id === fieldId ? {
          ...f, ...fieldForm,
          subtitle: fieldForm.subtitle || null,
          explanation: fieldForm.explanation || null,
          displayType: fieldForm.type === 'TEXT' ? null : fieldForm.displayType,
          imageUrl: fieldForm.imageUrl || null,
        } : f),
      } : prev);
      setEditingField(null);
      toast.success('Question updated');
    } catch { toast.error('Failed to update question'); }
  };

  const handleCreateField = async () => {
    if (!form) return;
    try {
      const res = await apiClient.post(`/forms/${FORM_ID}/fields`, {
        ...fieldForm,
        subtitle: fieldForm.subtitle || null,
        explanation: fieldForm.explanation || null,
        displayType: fieldForm.type === 'TEXT' ? null : fieldForm.displayType,
        imageUrl: fieldForm.imageUrl || null,
        position: form.fields.length,
      }) as { id: number };
      setForm((prev) => prev ? {
        ...prev,
        fields: [...prev.fields, {
          id: res.id, ...fieldForm,
          subtitle: fieldForm.subtitle || null,
          explanation: fieldForm.explanation || null,
          displayType: fieldForm.type === 'TEXT' ? null : fieldForm.displayType as FormField['displayType'],
          imageUrl: fieldForm.imageUrl || null,
          position: form.fields.length,
          options: [],
        }],
      } : prev);
      setShowNewField(false);
      setFieldForm(EMPTY_FIELD);
      toast.success('Question created');
    } catch { toast.error('Failed to create question'); }
  };

  const handleDeleteField = async (fieldId: number) => {
    if (!confirm('Delete this question and all its options?')) return;
    try {
      await apiClient.delete(`/forms/fields/${fieldId}`);
      setForm((prev) => prev ? { ...prev, fields: prev.fields.filter((f) => f.id !== fieldId) } : prev);
      toast.success('Question deleted');
    } catch { toast.error('Failed to delete question'); }
  };

  const handleUpdateOption = async (fieldId: number, optionId: number) => {
    try {
      await apiClient.put(`/forms/options/${optionId}`, {
        label: optionForm.label, value: optionForm.value,
        feedback: optionForm.feedback || null, imageUrl: optionForm.imageUrl || null,
      });
      setForm((prev) => prev ? {
        ...prev,
        fields: prev.fields.map((f) => f.id === fieldId ? {
          ...f,
          options: (f.options ?? []).map((o) => o.id === optionId ? {
            ...o, label: optionForm.label, value: optionForm.value,
            feedback: optionForm.feedback || null, imageUrl: optionForm.imageUrl || null,
          } : o),
        } : f),
      } : prev);
      setEditingOption(null);
      toast.success('Option updated');
    } catch { toast.error('Failed to update option'); }
  };

  const handleCreateOption = async (fieldId: number) => {
    try {
      const field = form?.fields.find((f) => f.id === fieldId);
      const res = await apiClient.post(`/forms/fields/${fieldId}/options`, {
        label: optionForm.label, value: optionForm.value,
        feedback: optionForm.feedback || null, imageUrl: optionForm.imageUrl || null,
        position: field?.options?.length ?? 0,
      }) as { id: number };
      setForm((prev) => prev ? {
        ...prev,
        fields: prev.fields.map((f) => f.id === fieldId ? {
          ...f,
          options: [...(f.options ?? []), {
            id: res.id, label: optionForm.label, value: optionForm.value,
            feedback: optionForm.feedback || null, imageUrl: optionForm.imageUrl || null,
            position: field?.options?.length ?? 0,
          }],
        } : f),
      } : prev);
      setShowNewOption(null);
      setOptionForm(EMPTY_OPTION);
      toast.success('Option created');
    } catch { toast.error('Failed to create option'); }
  };

  const handleDeleteOption = async (fieldId: number, optionId: number) => {
    if (!confirm('Delete this option?')) return;
    try {
      await apiClient.delete(`/forms/options/${optionId}`);
      setForm((prev) => prev ? {
        ...prev,
        fields: prev.fields.map((f) => f.id === fieldId ? {
          ...f, options: (f.options ?? []).filter((o) => o.id !== optionId),
        } : f),
      } : prev);
      toast.success('Option deleted');
    } catch { toast.error('Failed to delete option'); }
  };

  const setF = (key: string, value: unknown) => setFieldForm((f) => ({ ...f, [key]: value }));
  const setO = (key: string, value: string) => setOptionForm((o) => ({ ...o, [key]: value }));

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-muted-foreground">Loading quiz...</p></div>;
  if (!form) return <div className="flex items-center justify-center h-64"><p className="text-muted-foreground">Quiz not found</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quiz Editor</h1>
          <p className="text-muted-foreground mt-1">{form.name} · {form.fields.length} questions</p>
        </div>
        <button onClick={() => { setShowNewField(true); setFieldForm(EMPTY_FIELD); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Question
        </button>
      </div>

      {showNewField && (
        <FieldForm form={fieldForm} setF={setF} onSave={handleCreateField}
          onCancel={() => setShowNewField(false)} title="New Question" />
      )}

      <div className="space-y-2">
        {form.fields.map((field, idx) => (
          <FieldRow
            key={field.id}
            field={field}
            idx={idx}
            expanded={expandedField === field.id}
            editing={editingField === field.id}
            fieldForm={fieldForm}
            setF={setF}
            onToggleExpand={() => setExpandedField(expandedField === field.id ? null : field.id)}
            onEdit={() => {
              setEditingField(field.id);
              setFieldForm({
                label: field.label, subtitle: field.subtitle || '',
                explanation: field.explanation || '', imageUrl: field.imageUrl || '',
                type: field.type, displayType: field.displayType || 'RADIO',
                isRequired: field.isRequired,
              });
            }}
            onSave={() => handleUpdateField(field.id)}
            onCancelEdit={() => setEditingField(null)}
            onDelete={() => handleDeleteField(field.id)}
          >
            <OptionsPanel
              fieldId={field.id}
              options={field.options ?? []}
              showNewOption={showNewOption === field.id}
              editingOption={editingOption}
              optionForm={optionForm}
              setO={setO}
              onAddOption={() => { setShowNewOption(field.id); setOptionForm(EMPTY_OPTION); }}
              onCreateOption={() => handleCreateOption(field.id)}
              onCancelNew={() => setShowNewOption(null)}
              onEditOption={(option: FormOption) => {
                setEditingOption(option.id);
                setOptionForm({
                  label: option.label, value: option.value,
                  feedback: option.feedback || '', imageUrl: option.imageUrl || '',
                });
              }}
              onSaveOption={(optionId) => handleUpdateOption(field.id, optionId)}
              onCancelEdit={() => setEditingOption(null)}
              onDeleteOption={(optionId) => handleDeleteOption(field.id, optionId)}
            />
          </FieldRow>
        ))}
      </div>
    </div>
  );
}
