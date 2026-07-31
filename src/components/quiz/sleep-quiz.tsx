'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import QuizIntro from './quiz-intro';

import {
  findBestDogMatch,
  findBestMatch,
  getRecommendation,
} from '@/src/lib/quiz/quiz-logic';
import { getQuestions } from './quiz-question';
import { useQuizResult } from '@/src/core/context/quiz-result-context';

const RESULT_ROUTE = '/din-anbefaling/tryghed-til-barn-med-angst';

export default function SleepQuiz({
  products,
  dogProducts,
  babyProducts,
  introVariant = 'page',
}: {
  products: any[];
  dogProducts?: any[];
  babyProducts?: any[];
  categories: any[];
  introVariant?: 'page' | 'card';
}) {
  const router = useRouter();
  const { setResult } = useQuizResult();

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const QUESTIONS = useMemo(() => getQuestions(answers), [answers.user]);

  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const question = QUESTIONS[step];

  const handleNext = () => {
    if (!selected) return;

    const updatedAnswers = { ...answers, [question.id]: selected };
    setAnswers(updatedAnswers);

    const nextQuestions = getQuestions(updatedAnswers);

    if (step < nextQuestions.length - 1) {
      setStep((prev) => prev + 1);
      setSelected('');
      return;
    }

    const rec = getRecommendation(updatedAnswers);

    const matched = rec.isDog
      ? findBestDogMatch(dogProducts ?? products, rec.dogSize)
      : rec.isBaby
        ? findBestMatch(babyProducts ?? products, rec)
        : findBestMatch(products, rec);

    const productName =
      matched?.name ??
      (rec.isDog
        ? 'DoggyRo Tyngdetæppe'
        : rec.isBaby
          ? 'Natural weighted blanket for baby 70x100 cm'
          : 'Tyngdedyne');

    const size =
      matched?.attributes?.find((a: any) =>
        ['størrelse', 'size'].includes(a?.name?.toLowerCase?.()),
      )?.options?.[0] ??
      (rec.isDog
        ? rec.dogSize === 'large'
          ? '70x100 cm'
          : '50x70 cm'
        : '70x100 cm');

    const weightLabel = rec.isDog
      ? rec.dogSize === 'large'
        ? '4-5 kg'
        : '2-3 kg'
      : `${rec.idealWeight} kg`;

    const price = matched?.price
      ? `${matched.price} kr.`
      : rec.isDog
        ? '499 kr.'
        : '599 kr.';

    const ctaLabel = rec.isDog
      ? 'Se produkt'
      : `Se produkt – ${rec.idealWeight} kg`;

    setResult({
      productName,
      size,
      weightLabel,
      price,
      productSlug: matched?.slug,
      ctaLabel,
    });

    router.push(RESULT_ROUTE);
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
    setSelected(answers[QUESTIONS[step - 1].id] ?? '');
  };

  if (!started) {
    return (
      <QuizIntro variant={introVariant} onStart={() => setStarted(true)} />
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
      <div className="mb-16 flex items-center gap-5">
        <div className="h-[4px] flex-1 rounded-full bg-[#E7DDD5]">
          <div
            className="h-full rounded-full bg-[#392A22] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-sm text-[#7B7B7B]">
          Trin {step + 1} af {QUESTIONS.length}
        </span>
      </div>

      <div className="mb-14 text-center">
        <h1 className="text-4xl font-semibold text-[#392A22] md:text-5xl">
          {question.title}
        </h1>
        <p className="mt-4 text-lg text-[#7B7B7B]">{question.subtitle}</p>
      </div>

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
