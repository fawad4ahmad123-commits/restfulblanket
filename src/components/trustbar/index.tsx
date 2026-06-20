import Image from "next/image";

export function TrustBar() {
  return (
    <div className="absolute top-[101.5px] left-0 right-0 z-20 pt-4 lg:pt-0">
      <div className="mx-auto border-y border-[#f6eee7] bg-white/5 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="flex h-[72px] md:h-[62px] items-center justify-center gap-3 border-b border-r border-[#f6eee7] md:border-b-0">
            <Image
              src="/home/shieldIcon.png"
              alt="90 night guarantee"
              width={24}
              height={24}
              className="md:h-[18px] md:w-[18px]"
            />
            <div>
              <p className="text-md text-white md:text-xs">90 nætter</p>
              <p className="text-sm text-white/60 md:text-[10px]">
                Sikkerhed
              </p>
            </div>
          </div>

          <div className="flex h-[72px] md:h-[62px] items-center justify-center gap-3 border-b border-[#f6eee7] md:border-b-0 md:border-r">
            <Image
              src="/home/caricon.png"
              alt="Free delivery and returns"
              width={24}
              height={24}
              className="md:h-[18px] md:w-[18px]"
            />
            <div>
              <p className="text-md text-white md:text-xs">
                Gratis levering
              </p>
              <p className="text-sm text-white/60 md:text-[10px]">
                & Return
              </p>
            </div>
          </div>

          <div className="flex h-[72px] md:h-[62px] items-center justify-center gap-3 border-r border-[#f6eee7]">
            <Image
              src="/home/CEicon.png"
              alt="CE certified medical product"
              width={24}
              height={24}
              className="md:h-[18px] md:w-[18px]"
            />
            <div>
              <p className="text-md text-white md:text-xs">Medicinsk</p>
              <p className="text-sm text-white/60 md:text-[10px]">
                Approved (CE)
              </p>
            </div>
          </div>

          <div className="flex h-[72px] md:h-[62px] items-center justify-center gap-3">
            <Image
              src="/home/DK - Denmark.png"
              alt="Hand-sewn in Denmark"
              width={24}
              height={24}
              className="md:h-[18px] md:w-[18px]"
            />
            <div>
              <p className="text-md text-white md:text-xs">Hand-sewn</p>
              <p className="text-sm text-white/60 md:text-[10px]">
                In Denmark
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}