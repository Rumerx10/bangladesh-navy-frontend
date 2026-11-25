import Partners from "../Partners";
import NewsEvents from "./News/NewsEvents";
import QuickAccess from "./QuickAccess/QuickAccess";
import GallerySection from "./Gallery/GallerySection";
import MaritimeSearch from "./SearchSection/MaritimeSearch";
import NavyHeroCarousel from "./HeroSection/NavyHeroCarousel";

// The sections leave their own backgrounds off: the site backdrop (in the
// public layout) shows through them.
const Home = () => {
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
};

export default Home;
