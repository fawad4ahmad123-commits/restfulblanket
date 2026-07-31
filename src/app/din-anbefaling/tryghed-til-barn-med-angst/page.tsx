'use client';

import RecommendationCard from '@/src/components/quiz/recomendation-card';

export default function BarnAngstResultatPage() {
  return (
    <div className="bg-[#fff9f5]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="mb-10 text-center text-3xl font-semibold text-[#392A22] md:text-4xl">
          Tryghed til Dit Barn med Angst
        </h1>

        <p className="mb-10 text-center font-semibold text-[#736760]">
          Du søger hjælp til et barn, der oplever angst eller indre uro. En
          tyngdedyne til børn kan give den tryghed og ro, som barnet har brug
          for – som et varmt kram, der er der hele natten. Læs mere i vores
          guide til angst og tyngdedyner.
        </p>

        <RecommendationCard />
      </div>
    </div>
  );
}
