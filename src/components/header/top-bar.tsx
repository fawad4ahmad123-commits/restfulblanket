import { Truck } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="border-b border-white/10 bg-[#392A22] p-2 lg:p-0">
      <div className="mx-auto flex h-7 items-center justify-center px-4 text-[11px] uppercase tracking-widest gap-3 text-[#fff9f5]">
        <Truck size={12} className="h-5 w-5 text-[#fff9f5]" />
        Gratis CO2-neutral forsendelse over 120 € · 30 nætters søvnprøve
      </div>
    </div>
  );
};

export default TopBar;
