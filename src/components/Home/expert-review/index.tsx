'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

const ExpertCard = ({ expert, isExpert = false }: any) => {
  const { name, image, role, position, tags = [] } = expert;
  const router = useRouter();
  const profileUrl = isExpert ? '/expert-detail' : '/expert';
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e4dad1] bg-[#faf4ee]">
      <div
        className="flex flex-1 flex-col cursor-pointer"
        onClick={() => router.push('/expert-detail')}
      >
        <div className="relative h-[280px]">
          <Image
            src={image}
            alt={`${name} - ${position}`}
            fill
            className="object-cover"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] tracking-[0.2em] text-[#3b281f]">
            {role}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-serif text-[28px] text-[#3b281f]">{name}</h3>

          <p className="mt-1 text-sm text-[#35281E]">{position}</p>

          <div className="mt-4 flex flex-wrap gap-2 pb-2">
            {tags.map((tag: string, index: number) => (
              <span
                key={`${tag}-${index}`}
                className="rounded-full border border-[#e4dad1] px-3 py-1 text-xs text-[#3b281f]"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            aria-label={`View full profile of ${name}`}
            title={`View full profile of ${name}`}
            onClick={() => router.push(profileUrl)}
            className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-[#e5d8cb] py-3 text-sm text-[#3b281f] transition hover:bg-[#dac8b7] cursor-pointer"
          >
            Se hele profilen
            <ArrowRight aria-hidden="true" size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ExpertCard;
