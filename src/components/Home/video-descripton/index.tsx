'use client';

import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const RestfulBlanketVideo = () => {
  const [playing, setPlaying] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const YOUTUBE_ID = 'jCupG9MHVZc';

  const handlePlay = () => {
    const trigger =
      wrapperRef.current?.querySelector<HTMLButtonElement>('.lty-playbtn');
    trigger?.click();
  };

  useEffect(() => {
    const facade = wrapperRef.current?.querySelector('.yt-lite');
    if (!facade) return;
    if (playing) {
      facade.removeAttribute('aria-hidden');
    } else {
      facade.setAttribute('aria-hidden', 'true');
      facade.removeAttribute('role');
      facade.removeAttribute('aria-label');
    }
  }, [playing]);

  return (
    <section className="w-full overflow-hidden bg-[#FAF4EE] py-16 md:py-20 xl:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <h2 className="mb-10 max-w-xl text-center font-serif text-3xl font-semibold leading-snug tracking-tight text-[#2c2318] md:text-4xl">
            Se, hvordan et{' '}
            <span className="font-light italic text-[#8b6f52]">
              RestfulBlanket
            </span>{' '}
            bliver fremstillet.
          </h2>

          <div
            ref={wrapperRef}
            className="group relative w-full overflow-hidden rounded-2xl shadow-xl"
          >
            <div className="relative aspect-video bg-[#e8ddd4]">
              <LiteYouTubeEmbed
                id={YOUTUBE_ID}
                title="RestfulBlanket Brand Film"
                noCookie
                onIframeAdded={() => setPlaying(true)}
                wrapperClass="yt-lite absolute inset-0 !h-full !w-full !bg-cover !bg-center [&_.lty-playbtn]:hidden"
              />

              {!playing && (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <button
                    type="button"
                    onClick={handlePlay}
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

                  <div className="pointer-events-none absolute bottom-4 left-5 z-10 text-white">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest opacity-70">
                      Brand Film · 02:48
                    </p>

                    <p className="max-w-xs font-serif text-lg font-medium leading-tight md:text-xl">
                      Småland, Sverige – hvor hver eneste syning udføres med
                      omhu.
                    </p>
                  </div>

                  <div className="pointer-events-none absolute bottom-4 right-5 z-10 flex items-center gap-3 text-white">
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

                  <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-white/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-sm">
                    Håndlavet
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestfulBlanketVideo;
