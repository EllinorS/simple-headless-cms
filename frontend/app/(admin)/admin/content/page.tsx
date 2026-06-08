'use client';

import type { ContentItem } from '@/lib/types';
import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import { PAGE_BLOCKS } from '@/lib/content-blocks';
import ContentBlock from './_components/ContentBlock';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function ContentPage() {
  // all content items fetched for the selected page
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  // the currently active page tab
  const [selectedPage, setSelectedPage] = useState<string>('home');

  // fetch content whenever the selected page changes
  useEffect(() => {
    apiClient
      .get(`/content/page/${selectedPage}`)
      .then((data) => setContent(data))
      .catch(() => toast.error('Failed to load content'))
      .finally(() => setLoading(false));
  }, [selectedPage]);

  // updates the DB then syncs local state to avoid a full re-fetch
  const handleSave = async (keyName: string, value: string) => {
    const existing = content.find((item) => item.keyName === keyName);

    try {
      await apiClient.put(`/content/key/${keyName}`, {
        value,
        page: selectedPage,
        label: existing?.label ?? keyName,
        type: existing?.type ?? 'TEXT',
      });
      const updated = content.map((item) => {
        if (item.keyName === keyName) {
          return { ...item, value };
        }
        return item;
      });
      setContent(updated);
      toast.success('Saved');
    } catch {
      toast.error('Failed to save');
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading content...</p>
      </div>
    );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Content</h1>
        <p className="text-muted-foreground mt-1">Edit site text by page</p>
      </div>

      {/* One tab per page*/}
      <Tabs value={selectedPage} onValueChange={setSelectedPage} className="flex-col space-y-6">

        <TabsList variant="line" className="flex-wrap h-auto gap-2">
          {/* Create one tab button per page in the PAGES array */}
          {Object.keys(PAGE_BLOCKS).map((page) => (
            <TabsTrigger
              key={page} 
              value={page}
              className="capitalize rounded-md border border-border px-4 py-1.5 text-sm data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              {page}
            </TabsTrigger>
          ))}
        </TabsList>


        <TabsContent value={selectedPage}>
          {/* PAGE_BLOCKS[selectedPage] returns the list of sections for the active page */}
          {PAGE_BLOCKS[selectedPage]?.map((block) => {
            const items = block.keys
              .map((k) => content.find((i) => i.keyName === k))
              .filter(Boolean) as ContentItem[];

            return (
              <ContentBlock
                key={block.label} 
                blockLabel={block.label} 
                items={items}
                onSave={handleSave}
              />
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
