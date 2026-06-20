import {
  ShieldCheck,
  Truck,
  PackageCheck,
  BadgeCheck,
  Award,
  RotateCcw,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "90 nights of security",
    description: "You get 90 nights to figure out if it feels right.",
  },
  {
    icon: Truck,
    title: "Flexible delivery",
    description: "Fast and easy delivery that suits you.",
  },
  {
    icon: Truck,
    title: "Free delivery",
    description: "On orders to Pakkeshop",
  },
  {
    icon: RotateCcw,
    title: "Free returns",
    description: "We cover return shipping costs.",
  },
  {
    icon: BadgeCheck,
    title: "2 year warranty",
    description: "On production defects.",
  },
  {
    icon: Award,
    title: "CE class 1 + OEKO-TEX class 1",
    description: "Certified cotton and medical.",
  },
];

export function WhyRestfulBlanketContent() {
  return (
    <div className="space-y-6">
      <div
        className="grid gap-4 md:grid-cols-2"
        role="list"
        aria-label="Restful Blanket benefits"
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
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7F2EC]"
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

      <div className="flex flex-wrap items-center gap-4 border-t border-[#E3DCCD] pt-4">
        <p className="text-sm text-[#6F6860]">
          Recognized & verified social economy enterprise
        </p>

        <div
          className="flex flex-wrap items-center gap-3"
          aria-label="Certifications"
        >
          <img
            src="/certifications/good-market.svg"
            alt="Good Market Approved"
            className="h-12 w-auto"
          />
          <img
            src="/certifications/people-planet-first.svg"
            alt="People Planet First"
            className="h-12 w-auto"
          />
          <img
            src="/certifications/social-enterprise.svg"
            alt="Social Entrepreneur Denmark"
            className="h-12 w-auto"
          />
          <img
            src="/certifications/ethical-business.svg"
            alt="Ethical Business Certification"
            className="h-12 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
