'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Baby,
  Users,
  Dog,
  Check,
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 'user',
    title: 'Hvem skal bruge tyngdeproduktet?',
    subtitle: 'Vi tilpasser anbefalingen til alder og behov.',
    answers: [
      {
        id: 'adult',
        title: 'Voksen',
        subtitle: '15+ år',
        icon: User,
      },
      {
        id: 'child',
        title: 'Barn',
        subtitle: '5–14 år',
        icon: User,
      },
      {
        id: 'baby',
        title: 'Baby / Småbørn',
        subtitle: '0–4 år (kun under opsyn)',
        icon: Baby,
      },
      {
        id: 'couple',
        title: 'Par (delt seng)',
        subtitle: 'To voksne',
        icon: Users,
      },
      {
        id: 'dog',
        title: 'Hund',
        subtitle: 'Til urolige hunde',
        icon: Dog,
      },
    ],
  },

  {
    id: 'weight',
    title: 'Hvad vejer personen?',
    subtitle: 'Vi bruger vægten til at finde den rette model.',
    answers: [
      {
        id: 'under60',
        title: 'Under 60 kg',
        subtitle: 'Let vægt',
        icon: User,
      },
      {
        id: '60-90',
        title: '60 - 90 kg',
        subtitle: 'Mellem vægt',
        icon: User,
      },
      {
        id: '90plus',
        title: 'Over 90 kg',
        subtitle: 'Høj vægt',
        icon: User,
      },
    ],
  },

  {
    id: 'sleep',
    title: 'Hvordan sover personen?',
    subtitle: 'Fortæl lidt om søvnen.',
    answers: [
      {
        id: 'poor',
        title: 'Dårligt',
        subtitle: 'Vågner ofte',
        icon: User,
      },
      {
        id: 'average',
        title: 'Nogenlunde',
        subtitle: 'Varierende søvn',
        icon: User,
      },
      {
        id: 'good',
        title: 'Godt',
        subtitle: 'Sover normalt',
        icon: User,
      },
    ],
  },

  {
    id: 'stress',
    title: 'Oplever personen stress eller uro?',
    subtitle: 'Dette hjælper os med anbefalingen.',
    answers: [
      {
        id: 'often',
        title: 'Ofte',
        subtitle: 'Dagligt',
        icon: User,
      },
      {
        id: 'sometimes',
        title: 'Nogle gange',
        subtitle: 'Indimellem',
        icon: User,
      },
      {
        id: 'never',
        title: 'Sjældent',
        subtitle: 'Næsten aldrig',
        icon: User,
      },
    ],
  },

  {
    id: 'goal',
    title: 'Hvad ønsker du hjælp til?',
    subtitle: 'Vælg det vigtigste mål.',
    answers: [
      {
        id: 'sleep',
        title: 'Bedre søvn',
        subtitle: 'Sov hurtigere',
        icon: User,
      },
      {
        id: 'stress',
        title: 'Mindre stress',
        subtitle: 'Mere ro',
        icon: User,
      },
      {
        id: 'focus',
        title: 'Mere fokus',
        subtitle: 'Bedre koncentration',
        icon: User,
      },
    ],
  },
];

export default function SleepQuiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  const question = QUESTIONS[step];

  const handleNext = () => {
    if (!selected) return;

    const updatedAnswers = {
      ...answers,
      [question.id]: selected,
    };

    setAnswers(updatedAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep((prev) => prev + 1);
      setSelected('');
    } else {
      setStep(QUESTIONS.length);
    }
  };

  const handleBack = () => {
    if (step === 0) return;

    setStep((prev) => prev - 1);
  };

  const restartQuiz = () => {
    setAnswers({});
    setSelected('');
    setStep(0);
  };

  const finished = step >= QUESTIONS.length;

  if (finished) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="rounded-3xl border border-[#E5D9D1] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#392A22]">
            <Check className="h-10 w-10 text-white" />
          </div>

          <h2 className="mb-4 text-4xl font-semibold text-[#392A22]">
            Din anbefaling er klar
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-[#6D6D6D]">
            Baseret på dine svar anbefaler vi en tyngdedyne, der passer bedst
            til dine behov.
          </p>

          <div className="mb-8 rounded-2xl bg-[#FDF9F6] p-8">
            <h3 className="text-2xl font-semibold text-[#392A22]">
              Restful Blanket 7kg
            </h3>

            <p className="mt-2 text-[#6D6D6D]">
              Perfekt balance mellem komfort, ro og støtte.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-[#392A22] px-8 py-4 text-white transition hover:opacity-90">
              Se produkt
            </button>

            <button
              onClick={restartQuiz}
              className="rounded-xl border border-[#392A22] px-8 py-4 text-[#392A22]"
            >
              Start igen
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
      {/* Progress */}

      <div className="mb-16 flex items-center gap-5">
        <div className="h-[4px] flex-1 rounded-full bg-[#E7DDD5]">
          <div
            className="h-full rounded-full bg-[#392A22] transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <span className="text-sm text-[#7B7B7B]">
          Trin {step + 1} af {QUESTIONS.length}
        </span>
      </div>

      {/* Heading */}

      <div className="mb-14 text-center">
        <h1 className="text-4xl font-semibold text-[#392A22] md:text-5xl">
          {question.title}
        </h1>

        <p className="mt-4 text-lg text-[#7B7B7B]">{question.subtitle}</p>
      </div>

      {/* Answers */}

      <div className="grid gap-4 md:grid-cols-2">
        {question.answers.map((answer) => {
          const Icon = answer.icon;
          const active = selected === answer.id;

          return (
            <button
              key={answer.id}
              onClick={() => setSelected(answer.id)}
              className={`
                relative flex items-center gap-4 rounded-2xl border p-6 text-left transition-all

                ${
                  active
                    ? 'border-[#392A22] bg-[#FAF4EE] shadow-md'
                    : 'border-[#E5D9D1] bg-white hover:border-[#392A22]'
                }
              `}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6EFE9]">
                <Icon size={22} className="text-[#392A22]" />
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#392A22]">
                  {answer.title}
                </h3>

                <p className="text-sm text-[#7B7B7B]">{answer.subtitle}</p>
              </div>

              {active && (
                <div className="absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-[#392A22]">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}

      <div className="mt-12 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="flex items-center gap-2 rounded-xl border border-[#D7C9BE] bg-white px-6 py-4 text-[#392A22] disabled:opacity-40"
        >
          <ArrowLeft size={18} />
          Tilbage
        </button>

        <button
          onClick={handleNext}
          disabled={!selected}
          className="flex items-center gap-2 rounded-xl bg-[#392A22] px-8 py-4 text-white disabled:bg-[#C8C1BC]"
        >
          Næste
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
