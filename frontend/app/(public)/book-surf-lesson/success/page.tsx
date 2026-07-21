import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Booking Received',
  robots: { index: false, follow: false },
  alternates: { canonical: '/book-surf-lesson/success' },
};

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-md text-center">
        <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-3">Booking received!</h1>
        <p className="text-muted-foreground mb-8">
          Check your email for your bank transfer details and reference — your spot is held for 48 hours.
          We&apos;ll send your confirmation as soon as your deposit lands. You can also manage your booking
          (reschedule or cancel up to 24h before your session) from the link in that email.
        </p>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
