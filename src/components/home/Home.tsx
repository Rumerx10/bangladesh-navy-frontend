// import ChiefMessage from "./ChiefMessage/ChiefMessage";
import Partners from "../Partners";
import GallerySection from "./Gallery/GallerySection";
import NavyHeroCarousel from "./HeroSection/NavyHeroCarousel";
import NewsEvents from "./News/NewsEvents";
import QuickAccess from "./QuickAccess/QuickAccess";
import MaritimeSearch from "./SearchSection/MaritimeSearch";

export default function Home() {
  return (
    <div>
      <NavyHeroCarousel />
      <QuickAccess />
      {/* <ChiefMessage /> */}
      <MaritimeSearch />
      <NewsEvents />
      <GallerySection />
      <Partners />
    </div>
  );
}
