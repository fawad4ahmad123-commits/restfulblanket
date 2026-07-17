'use client';
import Image from 'next/image';
import { ShieldCheck, Truck, BadgeCheck, RotateCcw, Award } from 'lucide-react';
import { useProductMeta } from '@/src/core/context/product-meta-context';

const benefits = [
  {
    icon: ShieldCheck,
    title: '90 nætters tryghed',
    description: 'Får du 90 nætter til at finde ud af, om det føles rigtigt.',
  },
  {
    icon: Truck,
    title: 'Fleksibel levering',
    description: 'Hurtig og nem levering der passer dig',
  },
  {
    icon: Truck,
    title: 'Gratis levering',
    description: 'Ved levering til pakkeshop.',
  },
  {
    icon: RotateCcw,
    title: 'Gratis retur',
    description: 'Vi dækker omkostningerne ved returnering.',
  },
  {
    icon: BadgeCheck,
    title: '2 års garanti',
    description: 'På produktionsfejl.',
  },
  {
    icon: Award,
    title: 'CE kl. 1 + OEKO-TEX kl. 1',
    description: 'Certificeret bomuld og medicinsk',
  },
];

export function WhyRestfulBlanketContent() {
  const { metaFields } = useProductMeta();

  const certifications = metaFields?.certificateImages?.filter(Boolean) ?? [];
  return (
    <div className="space-y-6">
      <div
        className="grid grid-cols-1 gap-4 xl:grid-cols-2"
        role="list"
        aria-label="Fordele ved Restful Blanket"
      >
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <article
              key={benefit.title}
              role="listitem"
              className="rounded-2xl border border-[#E3DCCD] p-1 xl:p-5"
            >
              <div className="flex items-start gap-3 xl:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F2EC]">
                  <Icon className="h-5 w-5 text-[#3F3A36]" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#3F3A36] xl:text-base">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-[#6F6860]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {certifications.length > 0 && (
        <div className="border-t border-[#E3DCCD] pt-4">
          <p className="mb-4 text-sm text-[#6F6860]">
            Anerkendt og verificeret socialøkonomisk virksomhed
          </p>

          <div className="flex flex-wrap items-center gap-1 xl:gap-2">
            {certifications.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative h-10 w-[65px] shrink-0 sm:h-12 sm:w-[85px] xl:h-14 xl:w-[100px]"
              >
                <Image
                  src={src}
                  alt={`Certification ${index + 1}`}
                  fill
                  sizes="100px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
