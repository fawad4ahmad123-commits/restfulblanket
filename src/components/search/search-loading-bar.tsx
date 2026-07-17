'use client';

export default function SearchLoadingBar() {
  return (
    <div className="flex flex-col gap-2 px-1 w-full">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#392A22]/40">
        Søger…
      </p>

      <div className="relative h-px w-full overflow-hidden rounded-full bg-[#392A22]/10">
        <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-[#392A22]/50 animate-[searchbar-slide_1.2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
