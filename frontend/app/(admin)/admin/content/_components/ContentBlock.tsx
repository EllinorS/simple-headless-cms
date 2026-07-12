'use client';

import { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { isVideo } from '@/lib/utils';
import type { ContentItem } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import MediaPicker from './MediaPicker';

function MediaPreview({ src, alt }: { src: string; alt: string }) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        className="w-20 h-20 object-cover rounded-md border"
        muted
        preload="metadata"
      />
    );
  }
  return (
    <Image src={src} alt={alt} width={80} height={80} className="object-cover rounded-md border" />
  );
}

function ContentField({ item }: { item: ContentItem }) {
  // Whether the field is in edit mode (inputs shown) or read mode
  const [editing, setEditing] = useState(false);
  // Last saved value, shown in read mode : changes when save successful
  const [currentValue, setCurrentValue] = useState(item.value || '');
  // Draft value bound to the input while editing : changes when user types
  const [editValue, setEditValue] = useState(item.value || '');
  // disables button while saving = true
  const [saving, setSaving] = useState(false);
  // whether the image picker dialog is open (IMAGE_URL fields only)
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.put(`/content/key/${item.keyName}`, {
        value: editValue,
        page: item.page,
        label: item.label,
        type: item.type,
      });
      setCurrentValue(editValue);
      setEditing(false);
      toast.success('Saved');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium">{item.label}</p>
          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            {item.type}
          </span>
        </div>

        {editing ? (
          <div className="space-y-2">
            {item.type === 'RICHTEXT' ? (
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={3}
                autoFocus
                className="resize-none"
              />
            ) : item.type === 'NUMBER' ? (
              <Input
                type="number"
                min="0"
                step="1"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
                className="w-32"
              />
            ) : item.type === 'IMAGE_URL' ? (
              <div className="flex items-center gap-3">
                {editValue && <MediaPreview src={editValue} alt={item.label} />}
                <Button type="button" variant="outline" size="sm" onClick={() => setPickerOpen(true)}>
                  {editValue ? 'Change image' : 'Choose image'}
                </Button>
                <MediaPicker
                  open={pickerOpen}
                  onOpenChange={setPickerOpen}
                  onSelect={(url) => setEditValue(url)}
                />
              </div>
            ) : (
              <Input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
              />
            )}

            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} disabled={saving}>
                <Check className="w-3 h-3" /> Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  setEditValue(currentValue);
                }}
              >
                <X className="w-3 h-3" /> Cancel
              </Button>
            </div>
          </div>
        ) : ( // if not in editing mode :
          <div className="flex items-center gap-3">
            {item.type === 'IMAGE_URL' && currentValue ? (
              <MediaPreview src={currentValue} alt={item.label} />
            ) : (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {currentValue || <span className="italic">empty</span>}
              </p>
            )}
          </div>
        )}
      </div>

      {!editing && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setEditing(true);
            setEditValue(currentValue);
          }}
          className="shrink-0 mt-0.5 text-muted-foreground hover:text-foreground"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

export default function ContentBlock({
  blockTitle,
  items,
}: {
  blockTitle: string;
  items: ContentItem[];
}) {
  if (items.length === 0) return null;

  return (
    <Accordion
      type="single"
      collapsible
      className="bg-background rounded-lg border overflow-hidden mb-3"
    >
      <AccordionItem value={blockTitle} className="border-0">
        <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline hover:bg-muted/50">
          {blockTitle}
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-2 pt-0">
          {items.map((item) => (
            <ContentField key={item.keyName} item={item} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
