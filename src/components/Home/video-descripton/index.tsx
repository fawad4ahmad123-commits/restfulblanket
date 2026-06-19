"use client";

import { useState, useRef } from "react";
import { Play } from "lucide-react";

export default function RestfulBlanketVideo() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section className="bg-[#fff9f5] flex flex-col items-center justify-center px-6 py-16 min-h-screen">
      {/* Heading */}
      <h2 className="text-[#2c2318] text-3xl md:text-4xl font-serif font-semibold text-center mb-10 leading-snug tracking-tight max-w-xl">
        Watch how a{" "}
        <span className="italic font-light text-[#8b6f52]">
          RestfulBlanket
        </span>{" "}
        is made.
      </h2>

      {/* Video Card */}
      <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl group">
        {/* Thumbnail / Video */}
        <div className="relative aspect-video bg-[#e8ddd4]">
          {/* Placeholder image simulating the workshop photo */}
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80"
            alt="Artisan folding a RestfulBlanket in Småland, Sweden"
            className="w-full h-full object-cover"
          />

          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Play button — hidden once playing */}
          {!playing && (
            <button
              onClick={handlePlay}
              aria-label="Play brand film"
              className="absolute inset-0 flex items-center justify-center z-10 group/btn"
            >
              <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-200 group-hover/btn:scale-110">
                <Play className="w-6 h-6 text-[#2c2318] ml-1" fill="#2c2318" />
              </span>
            </button>
          )}

          {/* Bottom-left meta */}
          <div className="absolute bottom-4 left-5 z-10 text-white">
            <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1 font-mono">
              Brand Film · 02:48
            </p>
            <p className="text-lg md:text-xl font-serif font-medium leading-tight max-w-xs">
              Småland, Sweden — where every stitch is slow on purpose.
            </p>
          </div>

          {/* Bottom-right stats */}
          <div className="absolute bottom-4 right-5 z-10 flex items-center gap-3 text-white">
            <div className="text-center">
              <p className="text-xl font-semibold leading-none font-serif">12</p>
              <p className="text-[9px] uppercase tracking-widest opacity-70 font-mono mt-0.5">
                Artisans
              </p>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="text-center">
              <p className="text-xl font-semibold leading-none font-serif">38h</p>
              <p className="text-[9px] uppercase tracking-widest opacity-70 font-mono mt-0.5">
                Per Blanket
              </p>
            </div>
          </div>

          {/* Badge top-left */}
          <span className="absolute top-4 left-4 z-10 bg-white/20 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-mono px-2.5 py-1 rounded-full">
            Handcrafted
          </span>
        </div>
      </div>

      {/* Subtle caption */}
      <p className="mt-6 text-[#a08c78] text-sm font-serif italic text-center max-w-sm">
        Each blanket leaves our workshop only when it's ready — never before.
      </p>
    </section>
  );
}