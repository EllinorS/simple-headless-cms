'use client';

type Step = 'calendar' | 'option' | 'slots' | 'form';

const SINGLE_STEPS: Step[] = ['calendar', 'option', 'form'];
const PACKAGE_STEPS: Step[] = ['calendar', 'option', 'slots', 'form'];

const STEP_LABELS: Record<Step, string> = {
  calendar: 'Availability',
  option: 'Choose your option',
  slots: 'Choose your dates',
  form: 'Your details',
};

interface StepIndicatorProps {
  current: Step;
  isPackage: boolean;
}

export function StepIndicator({ current, isPackage }: StepIndicatorProps) {
  // Once the client has reached 'form' via the single-lesson path, 'slots' never applied —
  // only show the 4-step version once isPackage is actually known (i.e. still relevant to display).
  const steps = isPackage || current === 'slots' ? PACKAGE_STEPS : SINGLE_STEPS;
  const currentIndex = steps.indexOf(current);

  return (
    <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                step === current
                  ? 'bg-primary text-primary-foreground'
                  : currentIndex > i
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-sm hidden sm:block ${step === current ? 'font-semibold' : 'text-muted-foreground'}`}>
              {STEP_LABELS[step]}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px w-8 mx-1 ${currentIndex > i ? 'bg-primary/40' : 'bg-border'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
