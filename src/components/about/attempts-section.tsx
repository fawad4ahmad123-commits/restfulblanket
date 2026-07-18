'use client';

import { useAboutContext } from '@/src/core/context/about-context';
import { AttemptCard } from './attempt-card';

export function AttemptsSection() {
  const { attempts } = useAboutContext();

  return (
    <section className="mt-28">
      <h2 className="mb-12 text-4xl text-[#3d2f27] md:text-5xl">
        Tested. Thrown out. Tested again.
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {attempts.map((item) => (
          <AttemptCard key={item.number} {...item} />
        ))}
      </div>
    </section>
  );
}
