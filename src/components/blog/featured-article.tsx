import Image from 'next/image';
import { ArrowRight, CalendarDays, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FeaturedArticle = () => {
  return (
    <section className="grid items-center gap-[56px] lg:grid-cols-[640px_1fr]">
      <div className="relative h-[436px] overflow-hidden rounded-[24px]">
        <Image
          src="/blog/blogside.png"
          alt="Featured article"
          fill
          sizes="640px"
          className="object-cover"
        />

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#4A403B]">
          Featured
        </div>
      </div>

      <div className="flex-1">
        <span className="rounded-full border border-[#E4DAD1] px-3 py-1 text-[11px] uppercase tracking-wide text-[#857B74]">
          Sleep Science
        </span>

        <h2 className="mt-6 max-w-xl font-serif text-[32px] leading-tight text-[#3A2A22]">
          The Science Behind Weighted Blankets and Deep Sleep
        </h2>

        <p className="mt-5 max-w-lg text-[16px] leading-7 text-[#8B817A]">
          A look at deep pressure stimulation, the gently evenly distributed
          weight that calms the nervous system, lowers cortisol, and helps the
          body settle into longer, steadier stretches of rest.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#7D736C]">
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image
                src="/blog/blog-avatar.jpg"
                alt="Author"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>

            <span>Dr. Maya Lindqvist</span>
          </div>

          <span>•</span>

          <div className="flex items-center gap-2">
            <CalendarDays size={15} />
            <span>6/13/2026</span>
          </div>

          <span>•</span>

          <div className="flex items-center gap-2">
            <Eye size={15} />
            <span>10k Viewers</span>
          </div>
        </div>

        <Button className="mt-8 h-12 rounded-full bg-[#3A2A22] px-8 hover:bg-[#3A2A22]">
          Read Full Article
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
