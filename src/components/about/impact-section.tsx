import { IMPACT_PROJECTS } from './contants';
import { ImpactCard } from './impact-card';

export function ImpactSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-5xl text-[#3C2D24]">
          Social impact drives <span className="italic">everything</span> we
          create
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {IMPACT_PROJECTS.map((project) => (
            <ImpactCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
