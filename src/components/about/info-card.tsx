interface InfoCardProps {
  label: string;
  value: string;
}

export function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-[#e7dfd8] bg-[#faf8f6] p-5">
      <p className="mb-2 text-xs text-[#8f857d]">{label}</p>

      <p className="text-base font-medium text-[#3b2c24]">{value}</p>
    </div>
  );
}
