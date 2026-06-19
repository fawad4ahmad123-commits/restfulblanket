import { Button } from "@/components/ui/button";
import { LogIn, Logs, User } from "lucide-react";
import React from "react";

const Heading = () => {
  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-serif text-[36px] md:text-[48px] leading-tight text-[#392A22]">
          Meet our
          <span className="italic font-normal">{" "}sleep experts.</span>
        </h2>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full border-[#392A22]/20 bg-[#e5d8cb] px-4 text-sm text-[#392A22] hover:bg-[#392A22] hover:text-white gap-2"
          >
            <User className="h-3.5 w-3.5" />
           View all experts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Heading;
