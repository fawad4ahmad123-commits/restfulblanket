import dynamic from 'next/dynamic';

import HeroSection from '../hero';
import BottomBanner from '../hero/bottom-banner';

const ProductCategories = dynamic(() => import('./product-categories'));

const BestSellers = dynamic(() => import('./best-seller-season'));

const CraftsmanshipSection = dynamic(() => import('./about-blanket'));

const ExpertsSection = dynamic(() => import('./expert-review/expert-session'));

const Coments = dynamic(() => import('./comments'));

const RestfulBlanketVideo = dynamic(() => import('./video-descripton'));

const CommonQuestions = dynamic(() => import('./common-question'));

const BlogsSection = dynamic(() => import('./blog/blog-section'));

const Landing = ({ products, response_categories, blogs }: any) => {
  return (
    <>
      <HeroSection />
      <BottomBanner />

      <ProductCategories response_categories={response_categories} />

      <BestSellers isProduct={false} products={products} />

      <CraftsmanshipSection />

      <ExpertsSection />

      <Coments id="" />

      <RestfulBlanketVideo />

      <CommonQuestions />

      <BlogsSection blogs={blogs} />
    </>
  );
};

export default Landing;
