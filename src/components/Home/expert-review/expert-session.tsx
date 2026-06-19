import Link from "next/link";
import ExpertCard from ".";
import { EXPERTS } from "../constants";
import Heading from "./heading";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExpertsSection = () => {
  return (
    <section className="bg-[#FAF4EE] py-20">
      <div className="mx-auto max-w-[1400px] px-5">
        <Heading />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {EXPERTS.map((expert: any, index: number) => (
            <ExpertCard key={index} expert={expert} />
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button className="rounded-full bg-[#e5d8cb] py-4 px-4 text-sm text-[#3b281f]">
          Not sure which blanket suits your needs?
        </Button>
        <Link
          href="/products"
          className="flex items-center gap-2 text-sm font-medium text-[#3b281f]"
        >
          Book a free consultation
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3b281f]/20">
            <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default ExpertsSection;
