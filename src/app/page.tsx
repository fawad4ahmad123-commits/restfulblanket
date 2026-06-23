import Landing from "../components/Home";
import { getBestSellers, getCategories } from "@/src/lib/products";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getBestSellers(),
    getCategories(),
  ]);

  return <Landing products={products} response_categories={categories} />;
}
