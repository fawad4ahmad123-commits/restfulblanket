import Link from "next/link";
import { ProductFeature } from "./types";

interface FeatureListProps {
  features: ProductFeature[];
}

const FeatureList = ({ features }: FeatureListProps) => {
  return (
    <div>
      <ul className="space-y-1.5">
        {features.map((feature) => (
          <li
            key={feature.id}
            className="flex items-start gap-2 text-sm text-[#5B5650]"
          >
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#8A8377]" />
            {feature.text}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          document
            .getElementById("product-information")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mt-4 inline-flex text-sm font-medium text-[#3F3A36] underline underline-offset-4 transition hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F3A36] focus-visible:ring-offset-2 cursor-pointer"
      >
        Read More
      </button>
    </div>
  );
};
export default FeatureList;
