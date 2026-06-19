"use client";

import { useState } from "react";
import LeftReview from "./detail-review";
import RightReviews from "./right-side-review";
import { REVIEWS } from "../constants";
import Info from "./info";
import ReviewForm from "./review-form";

const Coments = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [animating, setAnimating] = useState(false);

  return (
    <section className="bg-[#F5F0EB] py-16 px-6">
      <div className="mx-auto max-w-[1200px]">
        <Info
          showModal={showModal}
          setReview={setShowModal}
          current={current}
          setCurrent={setCurrent}
          direction={direction}
          setDirection={setDirection}
          animating={animating}
          setAnimating={setAnimating}
          totalReviews={REVIEWS.length}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <LeftReview
            review={REVIEWS[current]}
            current={current}
            animating={animating}
            direction={direction}
          />
          {showModal ? (
            <ReviewForm />
          ) : (
            <RightReviews
              reviews={REVIEWS}
              current={current}
              animating={animating}
              direction={direction}
              onWriteReview={() => setShowForm(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Coments;
