import ChiefMessage from "./ChiefMessage/ChiefMessage";
import NavyHeroCarousel from "./HeroSection/NavyHeroCarousel";
import NewsEvents from "./News/NewsEvents";
import QuickAccess from "./QuickAccess/QuickAccess";
import MaritimeSearch from "./SearchSection/MaritimeSearch";
import StatsBar from "./Stats/StatsBar";

export default function Home() {
  return (
    <div>
      <NavyHeroCarousel />
      <MaritimeSearch />
      <QuickAccess />
      <StatsBar />
      <ChiefMessage />
      <NewsEvents />
    </div>
  );
}
