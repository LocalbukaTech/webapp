"use client";

import { useRef } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight, IconCircleArrowLeft, IconCircleArrowRight } from "@tabler/icons-react";

const cuisines = [
  {
    id: 1,
    name: "Nigeria Cuisine",
    image: "/images/Nigeria_cuisine.png",
  },
  {
    id: 2,
    name: "Yoruba Cuisine",
    image: "/images/Yoruba_cuisine.jpg",
  },
  {
    id: 3,
    name: "Igbo Cuisine",
    image: "/images/Igbo_cuisine.jpg",
  },
];

export default function CuisineShowcase() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 350, behavior: "smooth" });

  return (
    <section className="mt-10 px-6 relative w-full">

      {/* Title */}
      <h2 className="text-xl font-semibold text-white mb-6">
        Explore by Cuisine
      </h2>

      
      

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth w-full pr-10"
      >
        {cuisines.map((item) => (
          <div
            key={item.id}
            className="relative bg-[#1f1f1f] min-w-[330px]
            h-[340px] rounded-xl overflow-hidden shadow-lg 
            hover:scale-[1.02] transition-transform cursor-pointer 
            border border-transparent hover:border-purple-500"
          >
            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover object-center !object-left"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Text Label */}
            <div
              className="absolute bottom-3 left-3 bg-black/40 
              px-2 py-1 rounded-md backdrop-blur-sm"
            >
              <span className="text-white text-sm font-medium">
                {item.name}
              </span>
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
