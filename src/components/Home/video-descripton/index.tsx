"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

const RestfulBlanketVideo = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section className="bg-[#FAF4EE] py-16 md:py-20 xl:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <h2 className="mb-10 max-w-xl text-center font-serif text-3xl font-semibold leading-snug tracking-tight text-[#2c2318] md:text-4xl">
            Watch how a{" "}
            <span className="font-light italic text-[#8b6f52]">
              RestfulBlanket
            </span>{" "}
            is made.
          </h2>

          <div className="group relative w-full overflow-hidden rounded-2xl shadow-xl">
            <div className="relative aspect-video bg-[#e8ddd4]">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80"
                alt="Artisan folding a RestfulBlanket in Småland, Sweden"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {!playing && (
                <button
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
              )}

              <div className="absolute bottom-4 left-5 z-10 text-white">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-widest opacity-70">
                  Brand Film · 02:48
                </p>

                <p className="max-w-xs font-serif text-lg font-medium leading-tight md:text-xl">
                  Småland, Sweden — where every stitch is slow on purpose.
                </p>
              </div>

              <div className="absolute bottom-4 right-5 z-10 flex items-center gap-3 text-white">
                <div className="text-center">
                  <p className="font-serif text-xl font-semibold leading-none">
                    12
                  </p>

                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest opacity-70">
                    Artisans
                  </p>
                </div>

                <div className="h-8 w-px bg-white/30" />

                <div className="text-center">
                  <p className="font-serif text-xl font-semibold leading-none">
                    38h
                  </p>

                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest opacity-70">
                    Per Blanket
                  </p>
                </div>
              </div>

              <span className="absolute left-4 top-4 z-10 rounded-full bg-white/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-sm">
                Handcrafted
              </span>

              <video ref={videoRef} className="hidden" />
            </div>
          </div>

          <p className="mt-6 max-w-sm text-center font-serif text-sm italic text-[#a08c78]">
            Each blanket leaves our workshop only when it's ready — never
            before.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RestfulBlanketVideo;
