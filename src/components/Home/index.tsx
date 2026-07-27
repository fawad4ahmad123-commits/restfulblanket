import dynamic from 'next/dynamic';

import HeroSection from '../hero';
import BottomBanner from '../hero/bottom-banner';
import ProductCategories from './product-categories';
import BestSellers from './best-seller-season';

// Below-the-fold sections
const CraftsmanshipSection = dynamic(() => import('./about-blanket'));

const ExpertsSection = dynamic(() => import('./expert-review/expert-session'));

const Coments = dynamic(() => import('./comments'));

const RestfulBlanketVideo = dynamic(() => import('./video-descripton'), {
  ssr: false,
});

const CommonQuestions = dynamic(() => import('./common-question'));

const BlogsSection = dynamic(() => import('./blog/blog-section'));

interface LandingProps {
  products: any;
  response_categories: any;
  blogs: any;
}

const Landing = ({ products, response_categories, blogs }: LandingProps) => {
  return (
    <div>
      {/* Above the fold */}
      <HeroSection />
      <BottomBanner />

      {/* Important content */}
      <ProductCategories response_categories={response_categories} />

      <BestSellers isProduct={false} products={products} />

      {/* Below the fold */}
      <CraftsmanshipSection />
      <ExpertsSection />
      <Coments id="" />
      <RestfulBlanketVideo />
      <CommonQuestions />
      <BlogsSection blogs={blogs} />
    </div>
  );
};

export default Landing;
