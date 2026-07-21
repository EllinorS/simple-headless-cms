'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import type { Media } from '@/lib/types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
}

export default function MediaPicker({ open, onOpenChange, onSelect }: Props) {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) return;
    // Resets the loading flag on every reopen (media/loading state persists across opens by
    // design, to avoid refetch flicker) — an intentional sync setState, not derivable from props.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    apiClient
      .get('/media')
      .then((data) => setMedia((data as Media[]).filter((m) => !m.mime_type?.startsWith('video/'))))
      .catch(() => toast.error('Failed to load media'))
      .finally(() => setLoading(false));
  }, [open]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('files', file);
      await apiClient.upload('/media', formData);
      const data = await apiClient.get('/media');
      const images = (data as Media[]).filter((m) => !m.mime_type?.startsWith('video/'));
      setMedia(images);
      const uploaded = images[0]; // findAllMedia orders by uploaded_at DESC
      if (uploaded) {
        onSelect(uploaded.url);
        onOpenChange(false);
      }
      toast.success('Uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background w-[90vw] sm:max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose an image</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="library">
          <TabsList variant="line">
            <TabsTrigger value="library">Library</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="mt-4">
            {loading ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p>
            ) : media.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No images yet — upload one
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {media.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelect(item.url);
                      onOpenChange(false);
                    }}
                    className="relative aspect-square rounded-md border overflow-hidden hover:ring-2 hover:ring-primary transition-all"
                    title={item.filename}
                  >
                    <Image
                      src={item.url}
                      alt={item.alt || item.filename}
                      fill
                      sizes="(max-width: 640px) 30vw, 220px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <label
              className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg py-12 cursor-pointer hover:border-primary/50 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {uploading ? 'Uploading...' : 'Click to upload an image'}
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
