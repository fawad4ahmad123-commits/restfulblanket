import Image from 'next/image';
import type { SpeakerInfo } from '@/src/lib/foredrag/parse';

export default function SpeakerCard({ speaker }: { speaker: SpeakerInfo }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#efe3d6] bg-white p-6 sm:flex-row sm:items-start">
      {speaker.imageUrl && (
        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
          <Image
            src={speaker.imageUrl}
            alt={speaker.name}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
      )}
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-[#392A22]">{speaker.name}</h4>
        <div
          className="mt-2 space-y-3 text-sm leading-relaxed text-[#392A22]/70 [&_a]:underline [&_a]:decoration-[#392A22]/40 [&_a:hover]:text-[#392A22]"
          dangerouslySetInnerHTML={{ __html: speaker.bioHtml }}
        />
        {speaker.profileUrl && (
          <a
            href={`/om-os/ekspertpanel${speaker.profileUrl}`}
            className="mt-3 inline-block text-sm font-medium text-[#392A22] underline decoration-[#392A22]/40 underline-offset-2 hover:opacity-80"
          >
            Læs mere →
          </a>
        )}
      </div>
    </div>
  );
}
