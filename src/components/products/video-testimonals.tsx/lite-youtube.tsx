'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface LiteYoutubeProps {
  videoId: string;
  title: string;
}

export default function LiteYoutube({ videoId, title }: LiteYoutubeProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="absolute inset-0">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          aria-label={`Play ${title}`}
          onClick={() => setPlaying(true)}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={`https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`}
            alt={title}
            fill
            sizes="(max-width:768px) 85vw, (max-width:1024px) 340px, 290px"
            className="object-cover"
          />

          <span className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
              <Play size={28} className="ml-1 text-black" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
