"use client";

export default function TopBanner() {
  const items = [
    "30-NIGHT SLEEP TRIAL, NO QUESTIONS ASKED",
    "HAND-FINISHED IN SMÅLAND, SWEDEN",
    "OEKO-TEX & CE CERTIFIED",
    "FREE CARBON-NEUTRAL SHIPPING OVER €120",
  ];

  return (
    <div className="relative h-8 overflow-hidden bg-[#4a3227] text-[#fff9f5]">
      <div className="absolute flex min-w-max animate-marquee items-center">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center gap-6 px-8 text-[9px] font-medium uppercase tracking-[0.25em] py-2.5"
          >
            <span>✶</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}