'use client';

interface Props {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChange: (min: number, max: number) => void;
}

export default function DualRangeSlider({
  min,
  max,
  valueMin,
  valueMax,
  onChange,
}: Props) {
  const minPct = ((valueMin - min) / (max - min)) * 100;
  const maxPct = ((valueMax - min) / (max - min)) * 100;

  return (
    <div className="relative h-6 w-full">
      <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-[#E9DDD4]" />

      <div
        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#35281E]"
        style={{
          left: `${minPct}%`,
          right: `${100 - maxPct}%`,
        }}
      />

      <input
        type="range"
        min={min}
        max={max}
        value={valueMin}
        onChange={(e) => {
          const v = Math.min(Number(e.target.value), valueMax - 1);
          onChange(v, valueMax);
        }}
        className="range-thumb pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent"
      />

      <input
        type="range"
        min={min}
        max={max}
        value={valueMax}
        onChange={(e) => {
          const v = Math.max(Number(e.target.value), valueMin + 1);
          onChange(valueMin, v);
        }}
        className="range-thumb pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent"
      />
    </div>
  );
}
