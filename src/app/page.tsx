import Footer from "../components/footer";
import SiteHeader from "../components/header";
import HeroSection from "../components/hero";
import Banner from "../components/hero/bottom-banner";
import Landing from "../components/Home";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <SiteHeader />
      <HeroSection />
      <Banner />
      <Landing />
      <Footer />
    </main>
  );
}
