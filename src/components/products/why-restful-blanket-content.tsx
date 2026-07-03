import { ShieldCheck, Truck, BadgeCheck, Award, RotateCcw } from 'lucide-react';

const benefits = [
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
];

export type Certification = {
  src: string;
  alt: string;
};

const defaultCertifications: Certification[] = [
  { src: '/certifications/goodmarket.png', alt: 'Good Market Approved' },
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
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F2EC]"
                  aria-hidden="true"
                >
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

      {certifications.length > 0 && (
        <div className="border-t border-[#E3DCCD] pt-4">
          <p className="mb-4 text-sm text-[#6F6860]">
            Anerkendt og verificeret socialøkonomisk virksomhed
          </p>

          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-4"
            aria-label="Certificeringer"
          >
            {certifications.map((cert) => (
              <img
                key={cert.src}
                src={cert.src}
                alt={cert.alt}
                loading="lazy"
                className="h-12 w-auto max-w-[120px] shrink-0 object-contain"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
