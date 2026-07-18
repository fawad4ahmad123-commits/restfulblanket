'use client';

import { useAboutContext } from '@/src/core/context/about-context';
import { ImpactCard } from './impact-card';

export function ImpactSection() {
  const { impactProjects } = useAboutContext();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-5xl text-[#3C2D24]">
          Social impact drives <span className="italic">everything</span> we
          create
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {impactProjects.map((project) => (
            <ImpactCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
