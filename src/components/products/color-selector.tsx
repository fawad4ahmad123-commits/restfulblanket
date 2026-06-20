import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductColor } from "./types";

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColorId: string;
  onSelect: (colorId: string) => void;
}

const ColorSelector = ({
  colors,
  selectedColorId,
  onSelect,
}: ColorSelectorProps) => {
  const selectedColor = colors.find((c) => c.id === selectedColorId);

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-[#8A8377]">
        Color · {selectedColor?.label}
      </p>
      <div className="flex items-center gap-2">
        {colors.map((color) => {
          const isSelected = color.id === selectedColorId;
          return (
            <button
              key={color.id}
              type="button"
              aria-label={color.label}
              aria-pressed={isSelected}
              onClick={() => onSelect(color.id)}
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full ring-offset-2 transition-all",
                isSelected ? "ring-2 ring-[#3F3A36]" : "ring-1 ring-[#E3DCCD]",
              )}
              style={
                color.hexSecondary
                  ? {
                      background: `linear-gradient(135deg, ${color.hex} 50%, ${color.hexSecondary} 50%)`,
                    }
                  : { backgroundColor: color.hex }
              }
            >
              {isSelected && (
                <Check
                  className="h-3.5 w-3.5 drop-shadow-sm"
                  style={{ color: isLight(color.hex) ? "#3F3A36" : "#FFFFFF" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

function isLight(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

export default ColorSelector;
