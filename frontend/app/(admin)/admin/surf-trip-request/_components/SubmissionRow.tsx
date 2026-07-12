import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Submission } from '@/lib/types';

const STATUS_STYLES: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  READ: 'bg-gray-100 text-gray-600',
  REPLIED: 'bg-green-100 text-green-700',
  ARCHIVED: 'bg-yellow-100 text-yellow-700',
};

const STATUS_OPTIONS = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'] as const;

interface Props {
  submission: Submission;
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onStatusChange: (status: string) => void;
  children: React.ReactNode;
}

export default function SubmissionRow({
  submission, expanded, onToggle, onDelete, onStatusChange, children,
}: Props) {
  return (
    <div className="bg-background rounded-lg border overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        <div className={`w-2 h-2 rounded-full shrink-0 ${submission.status === 'NEW' ? 'bg-blue-500' : 'bg-transparent'}`} />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">{submission.clientFirstname} {submission.clientLastname}</p>
          <p className="text-xs text-muted-foreground truncate">{submission.clientEmail}</p>
        </div>
        <p className="text-xs text-muted-foreground hidden sm:block shrink-0">
          {new Date(submission.createdAt).toLocaleDateString('en-NZ', {
            day: 'numeric', month: 'short', year: 'numeric',
          })}
        </p>
        <select
          value={submission.status}
          onChange={(e) => onStatusChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className={`text-xs font-medium px-2 py-1 rounded-md border-0 cursor-pointer ${STATUS_STYLES[submission.status]}`}
        >
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={onDelete} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={onToggle} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="border-t px-6 py-4 bg-muted/30">{children}</div>
      )}
    </div>
  );
}
