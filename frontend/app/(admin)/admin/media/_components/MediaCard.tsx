'use client';

import Image from 'next/image';
import { Trash2, Copy, Check } from 'lucide-react';
import type { Media } from '@/lib/types';

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface Props {
  item: Media;
  copied: boolean;
  editingAlt: boolean;
  altValue: string;
  onCopy: () => void;
  onDelete: () => void;
  onEditAlt: () => void;
  onSaveAlt: () => void;
  onAltChange: (v: string) => void;
  onCancelAlt: () => void;
}

export default function MediaCard({
  item, copied, editingAlt, altValue,
  onCopy, onDelete, onEditAlt, onSaveAlt, onAltChange, onCancelAlt,
}: Props) {
  return (
    <div className="bg-background rounded-lg border overflow-hidden group">
      <div className="relative aspect-square bg-muted">
        {item.mime_type?.startsWith('video/') ? (
          <video src={item.url} className="w-full h-full object-cover" muted preload="metadata" />
        ) : (
          <Image
            src={item.url}
            alt={item.alt || item.filename}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button onClick={onCopy} title="Copy URL" className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors">
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
          </button>
          <button onClick={onDelete} title="Delete" className="p-2 bg-white/20 hover:bg-red-500/70 rounded-md transition-colors">
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      <div className="p-2">
        <p className="text-xs text-muted-foreground truncate mb-1">{item.filename}</p>
        <p className="text-xs text-muted-foreground">{formatSize(item.size_bytes)}</p>
        {editingAlt ? (
          <div className="mt-2 flex gap-1">
            <input
              autoFocus
              value={altValue}
              onChange={(e) => onAltChange(e.target.value)}
              placeholder="Alt text"
              className="flex-1 text-xs px-2 py-1 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
              onKeyDown={(e) => { if (e.key === 'Enter') onSaveAlt(); if (e.key === 'Escape') onCancelAlt(); }}
            />
            <button onClick={onSaveAlt} className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-md">OK</button>
          </div>
        ) : (
          <button onClick={onEditAlt} className="mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors truncate w-full text-left">
            {item.alt || <span className="italic">+ alt text</span>}
          </button>
        )}
      </div>
    </div>
  );
}
