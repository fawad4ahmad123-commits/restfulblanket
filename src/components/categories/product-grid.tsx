import { BESTSELLERPRODUCT } from '../Home/constants';
import { CATEGORY_PRODUCT } from './constants';
import ProductCard from './product-card';

export function ProductGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {CATEGORY_PRODUCT.map((product) => {
        const {
          id,
          slug,
          image,
          title,
          price,
          originalPrice,
          badge,
          rating,
          reviewCount,
          weight,
          dimensions,
        } = product;

        return (
          <ProductCard
            key={id}
            id={id}
            slug={slug}
            image={image}
            title={title}
            price={price}
            originalPrice={originalPrice}
            badge={badge}
            rating={rating}
            reviewCount={reviewCount}
            weight={weight}
            dimensions={dimensions}
          />
        );
      })}
    </div>
  );
}
