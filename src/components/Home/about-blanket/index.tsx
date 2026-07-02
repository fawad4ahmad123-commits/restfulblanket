'use client';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CraftsmanshipSection = () => {
  const router = useRouter();
  return (
    <section className="bg-[#fdf9f6] py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="font-serif text-[32px] font-bold leading-[0.95] tracking-[-0.03em] text-[#3B281F] md:text-[46px] lg:text-[68px]">
              Om <span className="font-normal italic">RestfulBlanket</span>
              <div className="mt-[10px]" />
            </h2>

            <p className="mt-8 max-w-[470px] text-[15px] leading-8 text-[#7D7068]">
              Vi har levet med ADHD. Vi har børn med særlige behov. Vi har kendt
              søvnløse nætter, angst og den slags træthed, der sætter sig helt
              ind i knoglerne. Når kroppen ikke kan slappe af, uanset hvor meget
              man længes efter ro – så ved man, hvad det handler om.
              <br />
              Vi prøvede alt. Men de hjælpemidler, der fandtes, virkede ikke for
              os. For stive. For varme. Fyldt med plastik og raslende kugler. De
              føltes forkerte. … Så vi gik i gang selv.
            </p>

            <button
              onClick={() => router.push('/about')}
              className="mt-8 flex items-center gap-3 rounded-full bg-[#e6cfbb] px-5 py-3 text-sm font-medium text-[#3B281F] transition hover:scale-105"
            >
              Læs mere
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B281F] text-white">
                <ArrowRight size={14} />
              </span>
            </button>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative aspect-video w-full max-w-[720px] overflow-hidden rounded-[28px] shadow-lg">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/-Lya47BOKec?rel=0"
                title="RestfulBlanket Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
