import { AttemptCard } from './attempt-card';
import { ATTEMPTS } from './contants';

export function AttemptsSection() {
  return (
    <section className="mt-28">
      <h2 className="mb-12 text-4xl text-[#3d2f27] md:text-5xl">
        Tested. Thrown out. Tested again.
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ATTEMPTS.map((item) => (
          <AttemptCard key={item.number} {...item} />
        ))}
      </div>
    </section>
  );
}
