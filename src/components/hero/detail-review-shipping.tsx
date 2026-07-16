import { Star } from 'lucide-react';

const DetailReviewShipping = () => {
  return (
    <div className="hidden gap-8 md:grid md:grid-cols-4 md:gap-10">
      <div>
        <div className="flex items-center gap-1 text-[28px] text-[#fff9f5] sm:text-[34px] md:text-[40px]">
          <span>4.9</span>
          <Star className="h-5 w-5 fill-[#e6cfbb] text-[#e6cfbb] sm:h-6 sm:w-6 md:h-7 md:w-7" />
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#fff9f5]/60 sm:text-[11px] md:text-xs">
          93 anmeldelser
        </div>
      </div>
      <div>
        <div className="text-[28px] text-[#fff9f5] sm:text-[34px] md:text-[40px]">
          184k
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#fff9f5]/60 sm:text-[11px] md:text-xs">
          nætter med bedre søvn
        </div>
      </div>
      <div>
        <div className="text-[28px] text-[#fff9f5] sm:text-[34px] md:text-[38px] l:text-[40px]">
          30 Days
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#fff9f5]/60 sm:text-[11px] md:text-xs">
          dages søvnprøve
        </div>
      </div>
      <div>
        <div className="text-[28px] text-[#fff9f5] sm:text-[34px] md:text-[40px]">
          Gratis
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#fff9f5]/60 sm:text-[11px] md:text-xs">
          levering
        </div>
      </div>
    </div>
  );
};

export default DetailReviewShipping;
