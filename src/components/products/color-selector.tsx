import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductColor } from "./types";

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColorId: string;
  onSelect: (colorId: string) => void;
}

const ColorSelector = ({
  colors = [],
  selectedColorId,
  onSelect,
}: ColorSelectorProps) => {
  const selectedColor = colors.find((c) => c.id === selectedColorId);

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-[#8A8377]">
        Color {selectedColor?.label ? `· ${selectedColor.label}` : ""}
      </p>

      <div className="flex items-center gap-2">
        {colors.map((color) => {
          const isSelected = color.id === selectedColorId;

          const primaryColor =
            color.hex ||
            getColorHex(color.label) ||
            getColorHex(color.value) ||
            "#D1D5DB";

          const secondaryColor = color.hexSecondary;

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
                secondaryColor
                  ? {
                      background: `linear-gradient(135deg, ${primaryColor} 50%, ${secondaryColor} 50%)`,
                    }
                  : {
                      backgroundColor: primaryColor,
                    }
              }
            >
              {isSelected && (
                <Check
                  className="h-3.5 w-3.5 drop-shadow-sm"
                  style={{
                    color: isLight(primaryColor) ? "#3F3A36" : "#FFFFFF",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

function isLight(hex?: string): boolean {
  if (!hex) return true;

  const cleanHex = hex.replace("#", "");

  if (cleanHex.length !== 6) return true;

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

function getColorHex(colorName?: string): string {
  if (!colorName) return "#D1D5DB";

  const colors: Record<string, string> = {
    black: "#000000",
    white: "#FFFFFF",
    red: "#EF4444",
    blue: "#3B82F6",
    green: "#22C55E",
    yellow: "#EAB308",
    orange: "#F97316",
    purple: "#A855F7",
    pink: "#EC4899",
    brown: "#92400E",
    gray: "#6B7280",
    grey: "#6B7280",
    silver: "#C0C0C0",
    gold: "#FFD700",
    navy: "#1E3A8A",
    beige: "#F5F5DC",
  };

  return colors[colorName.toLowerCase()] || "#D1D5DB";
}

export default ColorSelector;
