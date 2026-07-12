'use client';

import { Upload } from 'lucide-react';

interface Props {
  uploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MediaUploadButton({ uploading, onUpload }: Props) {
  return (
    <label
      className={`flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium cursor-pointer hover:bg-primary/90 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <Upload className="w-4 h-4" />
      {uploading ? 'Uploading...' : 'Upload'}
      <input
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp,image/svg+xml,video/mp4,video/webm,video/quicktime"
        onChange={onUpload}
        className="hidden"
      />
    </label>
  );
}
