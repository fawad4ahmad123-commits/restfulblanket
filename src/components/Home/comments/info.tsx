import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, PenLine } from "lucide-react";
import { Info as InfoProps } from "./types";

const Info = ({
  showModal,
  setReview,
  setCurrent,
  setDirection,
  animating,
  setAnimating,
  totalReviews,
}: InfoProps) => {
  const navigate = (dir: "prev" | "next") => {
    if (animating) return;

    setAnimating(true);
    setDirection(dir === "next" ? "left" : "right");

    setTimeout(() => {
      setCurrent((prev) =>
        dir === "next"
          ? (prev + 1) % totalReviews
          : (prev - 1 + totalReviews) % totalReviews,
      );

      setAnimating(false);
    }, 350);
  };

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-serif text-[36px] md:text-[48px] leading-tight text-[#392A22]">
          12,480 nights.
          <span className="italic font-normal">One verdict.</span>
        </h2>

        <div className="flex items-center gap-3">
          {!showModal && (
            <Button
              type="button"
              variant="outline"
              aria-label="Write a review"
              title="Write a review"
              onClick={() => setReview(true)}
              className="rounded-full border-[#392A22]/20 bg-[#fff9f5] px-4 text-sm text-[#392A22] hover:bg-[#392A22] hover:text-white gap-2"
            >
              <PenLine aria-hidden="true" className="h-3.5 w-3.5" />
              Write a review
            </Button>
          )}

          {showModal && (
            <Button
              type="button"
              variant="outline"
              aria-label={`Show reviews. Total reviews: ${totalReviews}`}
              title={`Show reviews (${totalReviews})`}
              onClick={() => setReview(false)}
              className="rounded-full border-[#392A22]/20 bg-[#e6cfbb] px-4 text-sm text-[#392A22] hover:bg-[#392A22] hover:text-white gap-2"
            >
              Reviews ({totalReviews})
            </Button>
          )}

          {!showModal && (
            <>
              <button
                type="button"
                aria-label="Previous review"
                title="Previous review"
                onClick={() => navigate("prev")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#392A22]/20 bg-[#fff9f5] text-[#392A22] transition hover:bg-[#392A22] hover:text-white"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label="Next review"
                title="Next review"
                onClick={() => navigate("next")}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#392A22] text-white transition hover:bg-[#4A382E]"
              >
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
