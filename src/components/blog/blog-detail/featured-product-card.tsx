import Image from 'next/image';
import { ARTICLE_DATA } from '../constants';

export default function FeaturedProductCard() {
  const product = ARTICLE_DATA.featuredProduct;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#E5DDD7] bg-white">
      <div className="relative h-[280px] w-full overflow-hidden">
        <span className="absolute left-4 top-4 z-10 rounded-full bg-[#F2ECE7] px-3 py-1 text-[10px] font-medium text-[#35281E]">
          {product.badge}
        </span>

        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="320px"
        />
      </div>
      <div className="space-y-3 p-5">
        <p className="text-xs text-[#8B817A]">Featured in this article</p>

        <h3 className="font-serif text-lg text-[#35281E]">{product.title}</h3>

        <p className="text-sm text-[#736760]">{product.description}</p>

        <button className="w-full rounded-full bg-[#35281E] py-3 text-sm text-white">
          Shop Now →
        </button>
      </div>
    </div>
  );
}
