'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Waves } from 'lucide-react';
import { toast } from 'sonner';
import type { Submission } from '@/lib/types';
import SubmissionRow from './_components/SubmissionRow';
import SubmissionDetail from './_components/SubmissionDetail';

interface SubmissionDetailData {
  id: number;
  status: string;
  client: { firstName: string; lastName: string; email: string; phone: string | null };
  createdAt: string;
  answers: { question: string; value: string }[];
}

const STATUS_OPTIONS = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'] as const;

export default function SurfTripsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<SubmissionDetailData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get('/submissions?type=SURF_TRIP_REQUEST') as Submission[];
        if (!cancelled) setSubmissions(data);
      } catch {
        if (!cancelled) toast.error('Failed to load surf trip requests');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const handleExpand = async (id: number) => {
    if (expandedId === id) { setExpandedId(null); setDetail(null); return; }
    setExpandedId(id);
    setDetailLoading(true);
    try {
      const data = await apiClient.get(`/submissions/${id}`) as SubmissionDetailData;
      setDetail(data);
      const submission = submissions.find((s) => s.id === id);
      if (submission?.status === 'NEW') await handleStatusChange(id, 'READ');
    } catch { toast.error('Failed to load request details'); }
    finally { setDetailLoading(false); }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await apiClient.patch(`/submissions/${id}/status`, { status });
      setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status: status as Submission['status'] } : s));
    } catch { toast.error('Failed to update status'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this surf trip request permanently?')) return;
    try {
      await apiClient.delete(`/submissions/${id}`);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (expandedId === id) { setExpandedId(null); setDetail(null); }
      toast.success('Request deleted');
    } catch { toast.error('Failed to delete request'); }
  };

  const filtered = filterStatus === 'ALL' ? submissions : submissions.filter((s) => s.status === filterStatus);
  const newCount = submissions.filter((s) => s.status === 'NEW').length;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground">Loading surf trip requests...</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Surf Trip Requests</h1>
          <p className="text-muted-foreground mt-1">
            Customized surf trip quiz submissions
            {newCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                {newCount} new
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['ALL', ...STATUS_OPTIONS].map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filterStatus === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}>
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-background rounded-lg border p-12 text-center">
          <Waves className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No surf trip requests yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((submission) => (
            <SubmissionRow
              key={submission.id}
              submission={submission}
              expanded={expandedId === submission.id}
              onToggle={() => handleExpand(submission.id)}
              onDelete={() => handleDelete(submission.id)}
              onStatusChange={(status) => handleStatusChange(submission.id, status)}
            >
              <SubmissionDetail
                loading={detailLoading}
                client={detail?.client}
                answers={detail?.answers}
              />
            </SubmissionRow>
          ))}
        </div>
      )}
    </div>
  );
}
