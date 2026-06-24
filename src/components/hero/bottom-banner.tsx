import { BOTTIM_BANNER_ITEMS } from '../constant';

const BottomBanner = () => {
  return (
    <div className="relative h-8 overflow-hidden bg-[#4a3227] text-[#fff9f5]">
      <div className="absolute flex min-w-max animate-marquee items-center">
        {[
          ...BOTTIM_BANNER_ITEMS,
          ...BOTTIM_BANNER_ITEMS,
          ...BOTTIM_BANNER_ITEMS,
          ...BOTTIM_BANNER_ITEMS,
        ].map((item, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center gap-6 px-8 text-[9px] font-medium uppercase tracking-[0.25em] py-2.5"
          >
            <span>✶</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomBanner;
