import CraftsmanshipSection from "./about-blanket"
import BestSellers from "./best-seller-season"
import ReviewsSection from "./comments"
import CommonQuestions from "./common-question"
import ProductCategories from "./product-categories"
import RestfulBlanketVideo from "./video-descripton"

const Landing = () => {
  return (
    <div>
      <ProductCategories />
      <BestSellers />
      <CraftsmanshipSection />
      <ReviewsSection />
      <RestfulBlanketVideo />
      <CommonQuestions />
    </div>
  )
}

export default Landing
