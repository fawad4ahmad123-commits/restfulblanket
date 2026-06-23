"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  disabled?: boolean;
}

export default function AppTooltip({
  children,
  content,
  side = "top",
  disabled = false,
}: AppTooltipProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">{children}</span>
        </TooltipTrigger>

        <TooltipContent
          side={side}
          className="border-[#392A22] bg-[#392A22] text-[#E6CBB8]"
        >
          {typeof content === "string" ? <p>{content}</p> : content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
