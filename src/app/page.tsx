import Landing from "../components/Home";
import { getBestSellers } from "@/src/lib/products";

export default async function Home() {
  const start = Date.now();

  const response = await getBestSellers();

  const end = Date.now();

  console.log("t1 API Time:", end - start, "ms");

  console.log(
    "t1 Payload Size:",
    (JSON.stringify(response).length / 1024).toFixed(2),
    "KB",
  );

  return <Landing products={response} />;
}
