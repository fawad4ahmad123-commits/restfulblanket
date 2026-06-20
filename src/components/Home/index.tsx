import HeroSection from "../hero";
import BottomBanner from "../hero/bottom-banner";
import CraftsmanshipSection from "./about-blanket";
import BestSellers from "./best-seller-season";
import BlogsSection from "./blog/blog-section";
import Coments from "./comments";
import CommonQuestions from "./common-question";
import ExpertsSection from "./expert-review/expert-session";
import ProductCategories from "./product-categories";
import RestfulBlanketVideo from "./video-descripton";

const Landing = () => {
  return (
    <div>
      <HeroSection />
      <BottomBanner />
      <ProductCategories />
      <BestSellers />
      <CraftsmanshipSection />
      <ExpertsSection />
      <Coments />
      <RestfulBlanketVideo />
      <CommonQuestions />
      <BlogsSection />
    </div>
  );
};

export default Landing;
