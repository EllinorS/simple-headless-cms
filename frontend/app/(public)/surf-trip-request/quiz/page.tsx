'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import type { Form } from '@/lib/types';
import { FieldRenderer } from './_components/FieldRenderer';
import { ContactStep, type ClientInfo } from './_components/ContactStep';

const FORM_ID = 1;

export default function QuizPage() {
  const router = useRouter();
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [client, setClient] = useState<ClientInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiClient.get(`/forms/${FORM_ID}`);
        setForm(data as Form);
      } catch {
        /* silently fail */
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading quiz...</p>
      </div>
    );

  if (!form)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Quiz unavailable</p>
      </div>
    );

  const fields = form.fields;
  const total = fields.length + 1;
  const isContactStep = step === fields.length;
  const currentField = !isContactStep ? fields[step] : null;
  const currentAnswer = currentField ? answers[currentField.id] || '' : '';

  const canNext = isContactStep
    ? client.firstName && client.lastName && client.email
    : !currentField?.isRequired || currentAnswer.length > 0;

  const handleNext = () => {
    if (step < total - 1) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!form) return;
    setSubmitting(true);
    try {
      await apiClient.post('/submissions', {
        formId: FORM_ID,
        client: {
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
          phone: client.phone || undefined,
        },
        answers: Object.entries(answers).map(([fieldId, value]) => ({
          fieldId: parseInt(fieldId),
          value,
        })),
      });
      router.push('/surf-trip-request/success');
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = (step / (total - 1)) * 100;

  return (
    <main className="min-h-screen flex flex-col">
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <h1 className="sr-only">Surf Trip Request</h1>
          <div className="flex justify-center mb-4">
            <Image
              src="/assets/alaia-surf-coach-bus-green.svg"
              alt=""
              aria-hidden
              width={160}
              height={111}
              className="opacity-20"
            />
          </div>
          <p className="text-xs text-muted-foreground mb-4 text-center">
            {isContactStep ? 'Last step' : `Question ${step + 1} of ${fields.length}`}
          </p>

          {currentField && (
            <div className="mb-8">
              {currentField.imageUrl && (
                <div className="mb-6 rounded-2xl overflow-hidden max-h-64">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentField.imageUrl}
                    alt={currentField.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-2xl md:text-3xl font-black mb-2">{currentField.label}</h2>
              {currentField.subtitle && (
                <p className="text-muted-foreground text-sm mb-1">{currentField.subtitle}</p>
              )}
              {currentField.explanation && (
                <p className="text-xs text-muted-foreground mb-6">{currentField.explanation}</p>
              )}
              <FieldRenderer
                field={currentField}
                value={currentAnswer}
                onChange={(v) => setAnswers((prev) => ({ ...prev, [currentField.id]: v }))}
              />
            </div>
          )}

          {isContactStep && (
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-black mb-2">Almost there!</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Leave your details and we&apos;ll get back to you with your custom surf trip plan.
              </p>
              <ContactStep
                client={client}
                onChange={(k, v) => setClient((c) => ({ ...c, [k]: v }))}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            </div>
          )}

          {!isContactStep && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <Button onClick={handleNext} disabled={!canNext}>
                {currentField?.isRequired === false && !currentAnswer ? 'Skip →' : 'Next →'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
