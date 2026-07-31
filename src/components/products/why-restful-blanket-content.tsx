'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Truck, BadgeCheck, RotateCcw, Award } from 'lucide-react';
import { useProductMeta } from '@/src/core/context/product-meta-context';

const benefits = [
  {
    icon: ShieldCheck,
    title: '90 nætters tryghed',
    description: 'Får du 90 nætter til at finde ud af, om det føles rigtigt.',
    url: '/handelsbetingelser#90-naetters-tryghed',
  },
  {
    icon: Truck,
    title: 'Fleksibel levering',
    description: 'Hurtig og nem levering der passer dig',
    url: '/handelsbetingelser#levering',
  },
  {
    icon: Truck,
    title: 'Gratis levering',
    description: 'Ved levering til pakkeshop.',
    url: '/handelsbetingelser#levering',
  },
  {
    icon: RotateCcw,
    title: 'Gratis retur',
    description: 'Vi dækker omkostningerne ved returnering.',
    url: '/handelsbetingelser#returfragtomkostninger',
  },
  {
    icon: BadgeCheck,
    title: '2 års garanti',
    description: 'På produktionsfejl.',
    url: '/om-vores-dyner/brugervejledning/#garanti',
  },
  {
    icon: Award,
    title: 'CE kl. 1 + OEKO-TEX kl. 1',
    description: 'Certificeret bomuld og medicinsk',
    url: '/om-vores-dyner/ce-maerkning-og-dokumentation',
  },
];

export function WhyRestfulBlanketContent() {
  const { metaFields } = useProductMeta();

  const certifications = Array.isArray(metaFields?.certificateImage)
    ? metaFields.certificateImage
    : [];

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
            <Link
              key={benefit.title}
              href={benefit.url}
              role="listitem"
              className="cursor-pointer rounded-2xl border border-[#E3DCCD] p-1 !no-underline transition-opacity hover:opacity-80 xl:p-5"
            >
              <div className="flex items-start gap-3 xl:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F2EC]">
                  <Icon className="h-5 w-5 text-[#3F3A36]" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#392A22] xl:text-base">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-[#392A22]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {certifications.length > 0 && (
        <div className="border-t border-[#E3DCCD] pt-4">
          <p className="mb-4 text-sm text-[#392A22]">
            Anerkendt og verificeret socialøkonomisk virksomhed
          </p>

          <div className="flex flex-wrap items-center gap-1 xl:gap-2">
            {certifications.map(
              (
                item: {
                  image: string;
                  url?: string;
                },
                index: number,
              ) => {
                const imageContent = (
                  <div className="relative h-10 w-[65px] shrink-0 cursor-pointer sm:h-12 sm:w-[85px] xl:h-14 xl:w-[100px]">
                    <Image
                      src={item.image}
                      alt={`Certification ${index + 1}`}
                      fill
                      sizes="100px"
                      className="object-contain"
                    />
                  </div>
                );

                return item.url ? (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    {imageContent}
                  </a>
                ) : (
                  <div key={index}>{imageContent}</div>
                );
              },
            )}
          </div>
        </div>
      )}
    </div>
  );
}
