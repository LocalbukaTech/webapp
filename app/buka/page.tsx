"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { BukaCategory } from "@/components/buka/BukaCategory";
import { BukaRestaurant } from "@/components/buka/BukaCard";
import { CuisineSection } from "@/components/buka/CuisineSection";
import { Waitlist } from "@/components/buka/Waitlist";
import { Images } from "@/public/images";

// --- Mock Data ---

const topRestaurants: BukaRestaurant[] = [
  {
    id: "r1",
    name: "Shiro Lagos",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "r2",
    name: "Wakame Restaurant",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "r3",
    name: "Ekaabo Restaurant",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "r4",
    name: "Yellow Chilli",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&q=80",
    rating: 4.3,
    reviewCount: 15,
    address: "27 Joel Ogunnaike Street, GRA Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "r5",
    name: "Nkoyo Restaurant",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
    rating: 4.7,
    reviewCount: 32,
    address: "5 Admiralty Way, Lekki Phase 1, Lagos.",
    tags: ["Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "r6",
    name: "Terra Kulture",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f73?w=600&q=80",
    rating: 4.6,
    reviewCount: 28,
    address: "Plot 1376 Tiamiyu Savage, Victoria Island.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
];

const topBukas: BukaRestaurant[] = [
  {
    id: "b1",
    name: "Bukka Hut",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "b2",
    name: "Wakame Restaurant",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "b3",
    name: "Chophouse Bistro and Grills",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "b4",
    name: "Mama Cass Restaurant",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
    rating: 4.2,
    reviewCount: 18,
    address: "22 Opebi Road, Ikeja, Lagos.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "b5",
    name: "Iya Oyo Buka",
    image: "https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=600&q=80",
    rating: 4.8,
    reviewCount: 40,
    address: "8 Allen Avenue, Ikeja, Lagos.",
    tags: ["Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "b6",
    name: "Calabar Kitchen",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    rating: 4.4,
    reviewCount: 22,
    address: "12 Awolowo Road, Ikoyi, Lagos.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
];

const hiddenGems: BukaRestaurant[] = [
  {
    id: "h1",
    name: "Shiro Lagos",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "h2",
    name: "Wakame Restaurant",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "h3",
    name: "Teecas Amala Express",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "h4",
    name: "Olaiya Foods",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    rating: 4.9,
    reviewCount: 50,
    address: "3 Bode Thomas Street, Surulere, Lagos.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "h5",
    name: "Amala Skye",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
    rating: 4.6,
    reviewCount: 35,
    address: "14 Admiralty Road, Lekki, Lagos.",
    tags: ["Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "h6",
    name: "White House Restaurant",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    rating: 4.3,
    reviewCount: 19,
    address: "1 Kingsway Road, Ikoyi, Lagos.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
];

// Cuisine Data
const cuisines = [
  { name: "Nigeria Cuisine", image: Images.image1 },
  { name: "Yoruba Cuisine", image: Images.image2 },
  { name: "Igbo Cuisine", image: Images.image3},
  { name: "Hausa Cuisine", image: "https://images.unsplash.com/photo-1567982047351-76b6f93e38ee?w=600&q=80" },
  { name: "Calabar Cuisine", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80" },
  { name: "Edo Cuisine", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" },
];

// Street Favorites Data
const streetFavorites: BukaRestaurant[] = [
  {
    id: "s1",
    name: "Shiro Lagos",
    image: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "s2",
    name: "Wakame Restaurant",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "s3",
    name: "Ekaabo Restaurant",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80",
    rating: 4.5,
    reviewCount: 20,
    address: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "s4",
    name: "Mama Cass",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    rating: 4.7,
    reviewCount: 25,
    address: "22 Opebi Road, Ikeja, Lagos.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "s5",
    name: "Amala Zone",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
    rating: 4.8,
    reviewCount: 38,
    address: "3 Bode Thomas Street, Surulere.",
    tags: ["Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
  {
    id: "s6",
    name: "Suya Spot",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    rating: 4.4,
    reviewCount: 30,
    address: "1 Allen Avenue, Ikeja, Lagos.",
    tags: ["Female Owned", "Nigeria Cuisine"],
    hygiene: 5.0,
    affordability: 5.0,
    foodQuality: 5.0,
  },
];

// --- Page ---

export default function BukaPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[#1a1a1a]">
      <div className="max-w-[1440px] mx-auto">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden" style={{ height: 1007 }}>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/buka_hero.png')" }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          <button
            onClick={() => router.back()}
            className="absolute top-8 left-8 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors bg-transparent cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>

          <img
            src="/images/buka-hero-overlay.png"
            alt=""
            className="absolute bottom-0 left-0 z-5 pointer-events-none"
          />

          <div className="absolute bottom-16 left-8 z-10 flex flex-col gap-5 max-w-md">
            <h1 className="text-white text-[32px] font-bold leading-tight">
              Wetin You Wan Chop?!
            </h1>
            <p className="text-white/80 text-base leading-relaxed">
              From mama-put joints to city-class bukas,
              <br />
              your next plate is right here.
            </p>
            <button className="w-fit px-10 py-3.5 bg-[#fbbe15] text-[#1a1a1a] text-sm font-semibold rounded-lg hover:bg-[#e5ac10] transition-colors cursor-pointer border-none">
              Explore Restaurants
            </button>
          </div>
        </section>

        {/* Categories Sections */}
        <div className="flex flex-col gap-16 px-8 py-16">
          <BukaCategory title="Top 5 Restaurant" restaurants={topRestaurants} />
          <BukaCategory title="Top 5 Buka's" restaurants={topBukas} />
          <BukaCategory title="Hidden Gem's" restaurants={hiddenGems} />
        </div>

        {/* By Cuisine Section */}
        <div className="px-8 pb-16">
          <CuisineSection cuisines={cuisines} />
        </div>

        {/* Banner Image */}
        <div className="px-8 pb-16">
          <div className="w-[92%] mx-auto rounded-2xl overflow-hidden">
            <img
              src="/images/buka_middle_Image.png"
              alt="LocalBuka"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Street Favorites Section */}
        <div className="px-8 pb-16">
          <BukaCategory title="Street Favorites" restaurants={streetFavorites} />
        </div>
        {/* WaitList Section */}
        <div className="px-8 pb-16">
          <Waitlist />
        </div>
      </div>
    </div>
  );
}
