import Hero from "@/components/buka/Hero";
import TopRestaurants from "@/components/buka/sections/TopResturants";
import TopFiveBukas from "@/components/buka/sections/TopFiveBukas";
import HiddenGems from "@/components/buka/sections/HiddenGems";
import CuisineShowcase from "@/components/buka/sections/Cuisne";
import LocalBukaSection from "@/components/buka/sections/LocalBuka";
import StreetFavorites from "@/components/buka/sections/StreetFavorites";
import WaitlistSection from "@/components/buka/sections/waitlist";
export default function BukaPage(){
    return(
    <div className = "min-h-screen">
        <Hero/>
        <TopRestaurants/>
        <TopFiveBukas/>
        <HiddenGems/>
        <CuisineShowcase/>
        <LocalBukaSection/>
        <StreetFavorites/>
        <WaitlistSection/>
    </div>
    );
}
