import Image from "next/image";
import { Shield, Truck, BadgeCheck } from "lucide-react";

export function TrustBar() {
  return (
    <div className="absolute top-[101.5px] left-0 right-0 z-20 pt-3 lg:pt-0">
      <div className="mx-auto border-y border-[#f6eee7] bg-white/5 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="flex h-[72px] md:h-[62px] items-center justify-center gap-3 border-r border-[#f6eee7]">
            <Shield className="h-7 w-7 md:h-5 md:w-5 text-[#e6cfbb]" />

            <div>
              <p className="text-lg md:text-xs text-white">90 nætter</p>
              <p className="text-lg md:text-[15px] text-white/60">Sikkerhed</p>
            </div>
          </div>

          <div className="flex h-[72px] md:h-[62px] items-center justify-center gap-3 border-r border-[#f6eee7]">
            <Truck className="h-7 w-7 md:h-5 md:w-5 text-white" />

            <div>
              <p className="text-lg md:text-xs text-white">Gratis levering</p>
              <p className="text-lg md:text-[10px] text-white/60">& Return</p>
            </div>
          </div>

          <div className="flex h-[72px] md:h-[62px] items-center justify-center gap-3 border-r border-[#f6eee7]">
            <p className="text-lg md:text-lg text-white font-semibold">CE</p>

            <div>
              <p className="text-lg md:text-xs text-white">Medicinsk</p>
              <p className="text-md md:text-[10px] text-white/60">
                Approved (CE)
              </p>
            </div>
          </div>

          <div className="flex h-[72px] md:h-[62px] items-center justify-center gap-3">
            <Image
              src="/home/DK - Denmark.png"
              alt="Denmark"
              width={24}
              height={24}
              className="md:w-[18px] md:h-[18px]"
            />

            <div>
              <p className="text-lg md:text-xs text-white">Hand-sewn</p>
              <p className="text-lg md:text-[10px] text-white/60">In Denmark</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
