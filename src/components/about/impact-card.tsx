interface ImpactCardProps {
  title: string;
  description: string;
}

export function ImpactCard({ title, description }: ImpactCardProps) {
  return (
    <div className="rounded-2xl border border-[#ECE4DD] bg-[#FBF8F5] p-6">
      <h3 className="mb-3 text-lg text-[#3C2D24]">{title}</h3>

      <p className="text-sm leading-6 text-[#7D746D]">{description}</p>
    </div>
  );
}
