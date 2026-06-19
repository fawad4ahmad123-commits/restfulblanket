import Image from "next/image";

const  CraftsmanshipSection = () => {
  return (
    <section className="bg-[#f7f4f1] py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="max-w-[500px]">
            <h2 className="font-serif text-[56px] leading-[0.95] tracking-[-0.03em] text-[#3f2b22]">
              <span className="italic font-normal">We build</span>
              wardrobes that
              <br />
              <span className="italic font-normal">
                outlive
              </span>
              that
            </h2>
            <p className="mt-8 max-w-[420px] text-sm leading-7 text-[#7d7068]">
              We've lived with ADHD. We have children with
              special needs. We've known sleepless nights,
              anxiety, and the kind of fatigue that sinks
              deep into your bones. When your body can't
              relax, no matter how much you crave peace and
              quiet, you know what it's all about.
            </p>
            <div className="mt-12 flex gap-12">
              <div>
                <div className="font-serif text-[34px] text-[#3f2b22]">
                  12
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#a3948b]">
                  Styles Per Year
                </div>
              </div>

              <div>
                <div className="font-serif text-[34px] text-[#3f2b22]">
                  8 yrs
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#a3948b]">
                  Average Lifespan
                </div>
              </div>

              <div>
                <div className="font-serif text-[34px] text-[#3f2b22]">
                  100%
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#a3948b]">
                  Repairable Design
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[420px] w-full max-w-[540px] overflow-hidden rounded-[20px]">
              <Image
                src="/home/craftsmanship.jpg"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div className="text-[#fff9f5]">
                  <h3 className="font-medium">
                    Mara, pattern cutter
                  </h3>
                  <p className="mt-1 text-xs text-[#fff9f5]/70">
                    9 years with the studio
                  </p>
                </div>
                <button className="flex items-center gap-2 rounded-full bg-[#fff9f5] px-5 py-2 text-sm text-[#3f2b22] transition hover:bg-white">
                  Read More
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3f2b22] text-white">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CraftsmanshipSection;