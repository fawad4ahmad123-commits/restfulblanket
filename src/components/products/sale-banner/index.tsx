interface BenefitsTickerProps {
  benefits: string[];
}

export function BenefitsTicker({ benefits }: BenefitsTickerProps) {
  return (
    <div className="overflow-hidden border-y border-[#E9DDD4] bg-[#FAF4EE] py-4">
      <div className="flex min-w-max animate-marquee gap-12">
        {[...benefits, ...benefits].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 whitespace-nowrap text-lg font-medium text-[#392A22]"
          >
            <span>✦</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
