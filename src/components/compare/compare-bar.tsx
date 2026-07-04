'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCompare } from '@/src/core/context/compare-provider';

const CompareBar = () => {
  const router = useRouter();
  const { compareItems } = useCompare();

  if (compareItems.length < 2) return null;

  return (
    <div className="mt-10">
      <div className="rounded-3xl bg-[#3B281F] px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {compareItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 border-white"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <span className="whitespace-nowrap text-lg font-medium text-white">
              {compareItems.length}/4 Valgt
            </span>
          </div>

          <button
            onClick={() => {
              const params = new URLSearchParams();

              compareItems.forEach((item) => {
                params.append('slug', item.slug);
              });

              router.push(`/compare?${params.toString()}`);
            }}
            className="w-full rounded-full bg-white px-8 py-3 text-sm font-medium text-[#3B281F] lg:w-auto lg:min-w-[180px]"
          >
            Sammenlign nu
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
