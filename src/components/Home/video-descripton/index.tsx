'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

const RestfulBlanketVideo = () => {
  const [playing, setPlaying] = useState(false);

  const YOUTUBE_ID = 'jCupG9MHVZc';

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#FAF4EE] py-16 md:py-20 xl:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <h2 className="mb-10 max-w-xl text-center font-serif text-3xl font-semibold leading-snug tracking-tight text-[#2c2318] md:text-4xl">
            Se, hvordan et{' '}
            <span className="font-light italic text-[#8b6f52]">
              RestfulBlanket
            </span>{' '}
            bliver fremstillet.
          </h2>

          <div className="group relative w-full overflow-hidden rounded-2xl shadow-xl">
            <div className="relative aspect-video bg-[#e8ddd4]">
              {playing ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                  title="RestfulBlanket Brand Film"
                  loading="lazy"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {/* Create /public/home/video-thumbnail.webp */}
                  <Image
                    src="/home/video-thumbnail.webp"
                    alt="Artisan folding a RestfulBlanket in Småland, Sweden"
                    fill
                    priority={false}
                    quality={70}
                    sizes="(max-width: 768px) 100vw, (max-width: 1320px) 90vw, 1320px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label="Play brand film"
                    className="group/btn absolute inset-0 z-10 flex items-center justify-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover/btn:scale-110">
                      <Play
                        className="ml-1 h-6 w-6 text-[#2c2318]"
                        fill="#2c2318"
                      />
                    </span>
                  </button>

                  <div className="absolute bottom-4 left-5 z-10 text-white">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest opacity-70">
                      Brand Film · 02:48
                    </p>

                    <p className="max-w-xs font-serif text-lg font-medium leading-tight md:text-xl">
                      Småland, Sverige – hvor hver eneste syning udføres med
                      omhu.
                    </p>
                  </div>

                  <div className="absolute bottom-4 right-5 z-10 flex items-center gap-3 text-white">
                    <div className="text-center">
                      <p className="font-serif text-xl font-semibold leading-none">
                        12
                      </p>

                      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest opacity-70">
                        Håndværkere
                      </p>
                    </div>

                    <div className="h-8 w-px bg-white/30" />

                    <div className="text-center">
                      <p className="font-serif text-xl font-semibold leading-none">
                        38 timer
                      </p>

                      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest opacity-70">
                        Pr. tæppe
                      </p>
                    </div>
                  </div>

                  <span className="absolute left-4 top-4 z-10 rounded-full bg-white/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-sm">
                    Håndlavet
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="mt-6 max-w-sm text-center font-serif text-sm italic text-[#35281E]">
            Hvert tæppe forlader først vores værksted, når det er helt færdigt –
            aldrig før.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RestfulBlanketVideo;
