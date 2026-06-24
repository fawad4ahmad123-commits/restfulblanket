import HeroSection from '../hero';
import BottomBanner from '../hero/bottom-banner';
import CraftsmanshipSection from './about-blanket';
import BestSellers from './best-seller-season';
import BlogsSection from './blog/blog-section';
import Coments from './comments';
import CommonQuestions from './common-question';
import ExpertsSection from './expert-review/expert-session';
import ProductCategories from './product-categories';
import RestfulBlanketVideo from './video-descripton';

const Landing = ({ products, response_categories }: any) => {
  return (
    <div>
      <HeroSection />
      <BottomBanner />
      <ProductCategories response_categories={response_categories} />
      <BestSellers isProduct={false} products={products} />
      <CraftsmanshipSection />
      <ExpertsSection />
      <Coments id={''} />
      <RestfulBlanketVideo />
      <CommonQuestions />
      <BlogsSection />
    </div>
  );
};

export default Landing;
