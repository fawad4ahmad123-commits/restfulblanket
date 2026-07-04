import Categories from '@/src/components/categories';
import { getBestSellers } from '@/src/lib/products';
import { getCategories } from '@/src/lib/products';
import { formatProducts } from '@/src/utilty/all-product-foemater';

const Categorypage = async () => {
  const [products, categories] = await Promise.all([
    getBestSellers(),
    getCategories(),
  ]);
  const product_response = formatProducts(products);
  return <Categories products={product_response} categories={categories} />;
};

export default Categorypage;
