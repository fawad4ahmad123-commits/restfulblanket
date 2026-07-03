import Image from 'next/image';
import { ShieldCheck, Truck, BadgeCheck, RotateCcw, Award } from 'lucide-react';

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

export type Certification = {
  src: string;
  alt: string;
};

const defaultCertifications: Certification[] = [
  {
    src: '/certifications/goodmarket.png',
    alt: 'Good Market Approved',
  },
  {
    src: '/certifications/peopleandplanetfirst.png',
    alt: 'People Planet First',
  },
  {
    src: '/certifications/socialeentreprenoereridanmark.png',
    alt: 'Social Entrepreneur Denmark',
  },
  {
    src: '/certifications/goodshoppingguide.png',
    alt: 'Ethical Business Certification',
  },
];

type WhyRestfulBlanketContentProps = {
  certifications?: Certification[];
};

export function WhyRestfulBlanketContent({
  certifications = defaultCertifications,
}: WhyRestfulBlanketContentProps) {
  return (
    <div className="space-y-6">
      <div
        className="grid gap-4 md:grid-cols-2"
        role="list"
        aria-label="Fordele ved Restful Blanket"
      >
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <article
              key={benefit.title}
              role="listitem"
              className="rounded-2xl border border-[#E3DCCD] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F2EC]">
                  <Icon className="h-6 w-6 text-[#3F3A36]" />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[#3F3A36]">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#6F6860]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="border-t border-[#E3DCCD] pt-4">
        <p className="mb-4 text-sm text-[#6F6860]">
          Anerkendt og verificeret socialøkonomisk virksomhed
        </p>

        <div className="flex flex-wrap items-center gap-1">
          {certifications.map((cert) => (
            <div key={cert.src} className="relative h-12 w-[120px] shrink-0">
              <Image
                src={cert.src}
                alt={cert.alt}
                fill
                sizes="120px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
