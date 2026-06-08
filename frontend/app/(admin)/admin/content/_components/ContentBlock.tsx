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

// Renders a single editable content field.
// Switches between read mode (shows current value) and edit mode (shows input + save/cancel).
function ContentField({
  item,
  onSave,
}: {
  item: ContentItem;
  onSave: (keyName: string, value: string) => Promise<void>;
}) {

  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.value || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(item.keyName, editValue);
    setSaving(false);
    setEditing(false);
  };

  // value currently stored in the DB
  const displayValue = item.value;

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        {/* Field label and type badge */}
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium">{item.label}</p>
          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            {item.type}
          </span>
        </div>

        {editing ? (
          <div className="space-y-2">
            {/* Show different input depending on field type */}
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
            ) : (
              <Input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
                placeholder={item.type === 'IMAGE_URL' ? 'Paste a Cloudinary URL' : ''}
              />
            )}

            {/* Live preview while pasting an image URL */}
            {item.type === 'IMAGE_URL' && editValue && (
              <MediaPreview src={editValue} alt={item.label} />
            )}

            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} disabled={saving}>
                <Check className="w-3 h-3" /> Save
              </Button>

              {/* reset editValue to original and close edit mode */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  setEditValue(item.value || '');
                }}
              >
                <X className="w-3 h-3" /> Cancel
              </Button>
            </div>
          </div>
        ) : (
          // read mode
          <div className="flex items-center gap-3">
            {item.type === 'IMAGE_URL' && displayValue ? (
              <MediaPreview src={displayValue} alt={item.label} />
            ) : (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.value || <span className="italic">empty</span>}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Pencil button */}
      {!editing && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setEditing(true);
            setEditValue(item.value || '');
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
  blockLabel,
  items,
  onSave,
}: {
  blockLabel: string;
  items: ContentItem[];
  onSave: (keyName: string, value: string) => Promise<void>;
}) {
  if (items.length === 0) return null;

  return (
    <Accordion
      type="single"
      collapsible
      className="bg-background rounded-lg border overflow-hidden mb-3"
    >
      <AccordionItem value={blockLabel} className="border-0">
        <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline hover:bg-muted/50">
          {blockLabel}
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-2 pt-0">
          {items.map((item) => (
            <ContentField key={item.keyName} item={item} onSave={onSave} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
