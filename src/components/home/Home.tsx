import ChiefMessage from "./ChiefMessage/ChiefMessage";
import GallerySection from "./Gallery/GallerySection";
import NavyHeroCarousel from "./HeroSection/NavyHeroCarousel";
import MarqueeNotice from "./MarqueeNotice";
import NewsEvents from "./News/NewsEvents";
import QuickAccess from "./QuickAccess/QuickAccess";
import MaritimeSearch from "./SearchSection/MaritimeSearch";

export default function Home() {
  return (
    <div>
      <MarqueeNotice />
      <NavyHeroCarousel />
      <QuickAccess />
      <ChiefMessage />
      <MaritimeSearch />
      <NewsEvents />
      <GallerySection />
    </div>
  );
}
