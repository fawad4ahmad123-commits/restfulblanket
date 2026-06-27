interface AttemptCardProps {
  number: string;
  attempt: string;
  title: string;
  description: string;
}

export function AttemptCard({
  number,
  attempt,
  title,
  description,
}: AttemptCardProps) {
  return (
    <div className="rounded-2xl border border-[#e7dfd8] bg-[#f6f0ea] p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] text-[#9f948c]">
          {number}
        </span>

        <span className="text-[10px] tracking-[0.2em] text-[#9f948c]">
          {attempt}
        </span>
      </div>

      <h3 className="mb-2 text-lg text-[#3d2f27]">{title}</h3>

      <p className="text-sm leading-6 text-[#7c7169]">{description}</p>
    </div>
  );
}
