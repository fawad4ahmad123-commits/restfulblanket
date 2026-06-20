import { Snowflake, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { TemperatureAttribute } from "../types";

interface ProductAttributesProps {
  title: string;
  temperatureLabel: string;
  options: TemperatureAttribute[];
}

const ProductAttributes = ({
  title,
  temperatureLabel,
  options,
}: ProductAttributesProps) => {
  if (!options.length) return null;

  return (
    <div className="rounded-xl border border-[#E3DCCD] bg-[#F7F2EA] p-5">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#3F3A36]">
        {title}
      </h3>
      <p className="mb-2 text-sm text-[#8A8377]">{temperatureLabel}</p>
      <div className="flex items-center gap-4">
        {options.map((option) => (
          <span
            key={option.id}
            className={cn(
              "flex items-center gap-1.5 text-sm",
              option.active ? "font-medium text-[#3F3A36]" : "text-[#C7C0B2]",
            )}
          >
            <TemperatureIcon icon={option.icon} active={option.active} />
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
};

function TemperatureIcon({
  icon,
  active,
}: {
  icon: TemperatureAttribute["icon"];
  active: boolean;
}) {
  const colorClass = active ? "text-[#3F3A36]" : "text-[#C7C0B2]";

  if (icon === "cool")
    return <Snowflake className={cn("h-3.5 w-3.5", colorClass)} />;
  if (icon === "warm")
    return <Flame className={cn("h-3.5 w-3.5", colorClass)} />;
  return (
    <span className={cn("h-1.5 w-1.5 rounded-full bg-current", colorClass)} />
  );
}

export default ProductAttributes;
