import { Mail, Phone } from 'lucide-react';

interface Answer { question: string; value: string; }
interface Client { firstName: string; lastName: string; email: string; phone: string | null; }

interface Props {
  loading: boolean;
  client?: Client;
  answers?: Answer[];
}

export default function SubmissionDetail({ loading, client, answers }: Props) {
  if (loading) return <p className="text-sm text-muted-foreground">Loading answers...</p>;
  if (!client) return null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4 text-sm pb-4 border-b">
        <a href={`mailto:${client.email}`} className="flex items-center gap-1.5 text-primary hover:underline">
          <Mail className="w-4 h-4" /> {client.email}
        </a>
        {client.phone && (
          <a href={`tel:${client.phone}`} className="flex items-center gap-1.5 text-muted-foreground">
            <Phone className="w-4 h-4" /> {client.phone}
          </a>
        )}
      </div>
      {answers && answers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {answers.map((answer, i) => (
            <div key={i} className="bg-background rounded-md p-3 border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {answer.question}
              </p>
              <p className="text-sm font-medium">{answer.value || '—'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No answers recorded</p>
      )}
    </div>
  );
}
