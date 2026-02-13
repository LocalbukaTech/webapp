"use client";

import { useRef } from "react";
import Image from "next/image";

import {
  IconMapPin,
  IconStarFilled,
  IconGenderFemale,
  IconChevronLeft,
  IconChevronRight,
  IconArrowNarrowRight,
  IconToolsKitchen2,
  IconCircleArrowRight
} from "@tabler/icons-react";

const restaurants = [
  {
    id: 1,
    name: "Bukka Hut",
    location: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    rating: "4.5(20 Reviews)",
    image: "/images/Image4_Resturant.jpg",
  },
  {
    id: 2,
    name: "Wakame Restaurant",
    location: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    rating: "4.5(20 Reviews)",
    image: "/images/Image5_serenity.jpg",
  },
  {
    id: 3,
    name: "Chophouse Bistro and Grills",
    location: "15/17 Majekodunmi Street, Omotayo Street, Ikeja.",
    rating: "4.5(20 Reviews)",
    image: "/images/Image6_chophouse.png",
  },
];

export default function TopFiveBukas() {
  const scrollRef = useRef<HTMLDivElement | null>(null);


  const scrollRight = () => scrollRef.current?.scrollBy({ left: 350, behavior: "smooth" });

  return (
    <section className="mt-10 px-6 relative">

      {/* Title Row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          Top 5 Buka's
          <IconArrowNarrowRight size={22} />
        </h2>
      </div>

      
      {/* Scroll Section */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pr-10"
      >
        {restaurants.map((item) => (
          <div
            key={item.id}
            className="bg-[#1f1f1f] min-w-[300px] rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
          >
            {/* Image */}
            <div className="relative w-full h-[220px]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="p-4">

              {/* TOP ROW: utensils + name + rating */}
              <div className="flex items-center justify-between mb-2">

                {/* Left: icon + name */}
                <div className="flex items-center gap-2">
                  <IconToolsKitchen2 size={20} className="text-gray-300" />
                  <h3 className="text-white text-lg font-semibold">
                    {item.name}
                  </h3>
                </div>

                {/* Right: green star + rating */}
                {/* Right: green star + rating */}
                <div className="flex items-center gap-1 text-sm flex-shrink-0">
                <IconStarFilled size={18} className="text-green-500" />
                <span className="text-white">{item.rating}</span>
                </div>

              </div>

              {/* Location */}
              <p className="text-zinc-400 text-sm flex items-center gap-1 mt-1">
                <IconMapPin size={16} />
                {item.location}
              </p>

              {/* Tags */}
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="flex items-center gap-1 px-3 py-1 text-xs bg-[#F5E6C6] text-[#3A3A3A] rounded-full font-medium">
                  <IconGenderFemale size={14} />
                  Female Owned
                </span>

                <span className="px-3 py-1 text-xs bg-[#F5E6C6] text-[#3A3A3A] rounded-full font-medium">
                  Nigeria Cuisine
                </span>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-sm mt-4">
                <span className="flex items-center gap-1">
                  <span className="text-[#fbbe15] font-semibold">5.0</span>
                  <span className="text-white">Hygiene</span>
                </span>

                <span className="flex items-center gap-1">
                  <span className="text-[#fbbe15] font-semibold">5.0</span>
                  <span className="text-white">Affordability</span>
                </span>

                <span className="flex items-center gap-1">
                  <span className="text-[#fbbe15] font-semibold">5.0</span>
                  <span className="text-white">Food Quality</span>
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

     {/* Right Arrow */}
                 <button
                   onClick={scrollRight}
                   className="absolute right-0 top-1/2 -translate-y-1/2 gap-2
                   bg-[#2a2a2a] p-2 rounded-full shadow-md hover:bg-[#3a3a3a] 
                   transition z-20"
                 >
                   <IconCircleArrowRight  
                     size={34}
                     stroke={2}
                     className="text-white"
                   />
                 </button>
    </section>
  );
}
