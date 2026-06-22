import Image from "next/image";
import { ArrowRight } from "lucide-react";

const CraftsmanshipSection = () => {
  return (
    <section className="bg-[#fdf9f6] py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="font-serif text-[32px] font-bold leading-[0.95] tracking-[-0.03em] text-[#3B281F] md:text-[46px] lg:text-[68px]">
              We <span className="font-normal italic">build</span> wardrobes
              that
              <br />
              <span className="font-normal italic">outlive</span> that
            </h2>

            <p className="mt-8 max-w-[470px] text-[15px] leading-8 text-[#7D7068]">
              We've lived with ADHD. We have children with special needs. We've
              known sleepless nights, anxiety, and the kind of fatigue that
              sinks deep into your bones. When your body can't relax, no matter
              how much you crave peace and quiet, you know what it's all about.
            </p>

            <div className="mt-12 flex flex-wrap gap-8 md:grid md:grid-cols-3 md:gap-12">
              <div className="min-w-[120px]">
                <div className="font-serif text-[32px] font-bold text-[#3B281F] md:text-[40px]">
                  12
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#A38575]">
                  Styles Per Year
                </div>
              </div>

              <div className="min-w-[120px]">
                <div className="font-serif text-[32px] font-bold text-[#3B281F] md:text-[40px]">
                  8 yrs
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#A38575]">
                  Average Lifespan
                </div>
              </div>

              <div className="min-w-[120px]">
                <div className="font-serif text-[32px] font-bold text-[#3B281F] md:text-[40px]">
                  100%
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#A38575]">
                  Repairable Design
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[420px] w-full max-w-[620px] overflow-hidden rounded-[28px] md:h-[520px]">
              <Image
                src="/home/craftman.png"
                alt="Craftsmanship"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-5 md:flex-row md:items-end md:justify-between md:p-8">
                <div className="text-white">
                  <h3 className="text-xl font-medium md:text-3xl">
                    Mara, pattern cutter
                  </h3>

                  <p className="mt-1 text-sm text-white/70">
                    9 years with the studio
                  </p>
                </div>

                <button className="flex w-full items-center justify-center gap-3 rounded-full bg-[#e6cfbb] px-5 py-3 text-sm font-medium text-[#3B281F] transition hover:scale-105 md:w-auto">
                  Read More
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B281F] text-white">
                    <ArrowRight size={14} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
