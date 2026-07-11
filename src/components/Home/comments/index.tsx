'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { getProductReviews } from '@/src/lib/products';
import LeftReview from './detail-review';
import RightReviews from './right-side-review';
import Info from './info';
import ReviewForm from './review-form';
import { Loader } from '../../loader';

const Coments = ({ id }: { id: string }) => {
  const pathname = usePathname();

  const [showModal, setShowModal] = useState(false);
  const [hasAuth, setHasAuth] = useState(false);

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [animating, setAnimating] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isHome = ['/'].includes(pathname);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      setHasAuth(true);
    }
  }, []);

  const loadReviews = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getProductReviews(Number(id), isHome);

      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [id, isHome]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleWriteReview = () => {
    if (!hasAuth) {
      setShowModal(false);
      return;
    }

    setShowModal(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-[#fdf9f6] px-6 py-16">
      <div className="mx-auto max-w-[1200px]">
        <Info
          showModal={showModal}
          setReview={handleWriteReview}
          current={current}
          setCurrent={setCurrent}
          direction={direction}
          setDirection={setDirection}
          animating={animating}
          setAnimating={setAnimating}
          totalReviews={reviews.length}
          isHome={isHome}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            {reviews.length > 0 && (
              <LeftReview
                review={reviews[current]}
                current={current}
                animating={animating}
                direction={direction}
              />
            )}
          </div>

          <div className="order-1 lg:order-2 flex h-full flex-col justify-end">
            {showModal && hasAuth ? (
              <ReviewForm
                onClose={() => setShowModal(false)}
                productId={Number(id)}
                onReviewCreated={loadReviews}
              />
            ) : (
              <RightReviews
                reviews={reviews}
                current={current}
                animating={animating}
                direction={direction}
                onWriteReview={handleWriteReview}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coments;
