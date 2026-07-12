'use client';

import type { Media } from '@/lib/types';
import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import MediaCard from './_components/MediaCard';
import MediaUploadButton from './_components/MediaUpload';

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [editingAlt, setEditingAlt] = useState<number | null>(null);
  const [altValue, setAltValue] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiClient.get('/media');
        setMedia(data as Media[]);
      } catch { toast.error('Failed to load media'); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append('files', file));
      const res = await apiClient.upload('/media', formData) as { mediaArray: number[] };
      toast.success(`${res.mediaArray.length} file(s) uploaded`);
      const data = await apiClient.get('/media');
      setMedia(data as Media[]);
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); e.target.value = ''; }
  };

  const handleDelete = async (item: Media) => {
    if (!confirm(`Delete "${item.filename}"?`)) return;
    try {
      await apiClient.delete(`/media/${item.id}`);
      setMedia((prev) => prev.filter((m) => m.id !== item.id));
      toast.success('Deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleCopyUrl = (item: Media) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveAlt = async (id: number) => {
    try {
      await apiClient.put(`/media/${id}`, { alt: altValue });
      setMedia((prev) => prev.map((m) => m.id === id ? { ...m, alt: altValue } : m));
      setEditingAlt(null);
      toast.success('Alt text saved');
    } catch { toast.error('Failed to save'); }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground">Loading media...</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Media</h1>
          <p className="text-muted-foreground mt-1">{media.length} file(s)</p>
        </div>
        <MediaUploadButton uploading={uploading} onUpload={handleUpload} />
      </div>

      {media.length === 0 ? (
        <div className="bg-background rounded-lg border p-12 text-center text-muted-foreground">
          No media yet — upload your first file
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              copied={copiedId === item.id}
              editingAlt={editingAlt === item.id}
              altValue={altValue}
              onCopy={() => handleCopyUrl(item)}
              onDelete={() => handleDelete(item)}
              onEditAlt={() => { setEditingAlt(item.id); setAltValue(item.alt || ''); }}
              onSaveAlt={() => handleSaveAlt(item.id)}
              onAltChange={setAltValue}
              onCancelAlt={() => setEditingAlt(null)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
