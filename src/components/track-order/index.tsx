'use client';

import { Check } from 'lucide-react';

interface TrackOrderTimelineProps {
  status?: string;
}

const STEPS = [
  {
    label: 'Ordre modtaget',
    statuses: ['pending'],
  },
  {
    label: 'Afventer bekræftelse',
    statuses: ['on-hold'],
  },
  {
    label: 'Behandles',
    statuses: ['processing'],
  },
  {
    label: 'Leveret',
    statuses: ['completed'],
  },
];

export default function TrackOrderTimeline({
  status = 'pending',
}: TrackOrderTimelineProps) {
  const currentIndex = getCurrentIndex(status);

  if (status === 'cancelled') {
    return (
      <StatusCard
        title="Ordren er annulleret"
        description="Denne ordre er blevet annulleret."
      />
    );
  }

  if (status === 'refunded') {
    return (
      <StatusCard
        title="Ordren er refunderet"
        description="Betalingen er blevet refunderet."
      />
    );
  }

  if (status === 'failed') {
    return (
      <StatusCard
        title="Betaling mislykkedes"
        description="Betalingen kunne ikke gennemføres."
      />
    );
  }

  return (
    <div className="rounded-3xl border border-[#E9DDD4] bg-white p-6 md:p-8">
      <h3 className="mb-8 font-serif text-xl text-[#392A22]">Ordrestatus</h3>

      <div className="hidden md:flex">
        {STEPS.map((step, index) => {
          const completed = index <= currentIndex;
          const isLast = index === STEPS.length - 1;

          return (
            <div key={step.label} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div
                    className={`h-[2px] flex-1 ${
                      index <= currentIndex ? 'bg-[#392A22]' : 'bg-[#E9DDD4]'
                    }`}
                  />
                )}

                <Dot completed={completed} />

                {!isLast && (
                  <div
                    className={`h-[2px] flex-1 ${
                      index < currentIndex ? 'bg-[#392A22]' : 'bg-[#E9DDD4]'
                    }`}
                  />
                )}
              </div>

              <span className="mt-4 text-center text-sm font-medium text-[#392A22]">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="space-y-6 md:hidden">
        {STEPS.map((step, index) => {
          const completed = index <= currentIndex;
          const isLast = index === STEPS.length - 1;

          return (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <Dot completed={completed} />

                {!isLast && (
                  <div
                    className={`mt-2 h-10 w-[2px] ${
                      index < currentIndex ? 'bg-[#392A22]' : 'bg-[#E9DDD4]'
                    }`}
                  />
                )}
              </div>

              <div className="pt-1">
                <p
                  className={`font-medium ${
                    completed ? 'text-[#392A22]' : 'text-[#A69A8C]'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Dot({ completed }: { completed: boolean }) {
  if (completed) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#392A22]">
        <Check className="h-4 w-4 text-white" />
      </div>
    );
  }

  return (
    <div className="h-9 w-9 rounded-full border-2 border-[#E9DDD4] bg-white" />
  );
}

function StatusCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-[#E9DDD4] bg-white p-6">
      <h3 className="text-lg font-semibold text-[#392A22]">{title}</h3>

      <p className="mt-2 text-sm text-[#6B5B4F]">{description}</p>
    </div>
  );
}

function getCurrentIndex(status: string) {
  switch (status) {
    case 'pending':
      return 0;

    case 'on-hold':
      return 1;

    case 'processing':
      return 2;

    case 'completed':
      return 3;

    default:
      return 0;
  }
}
