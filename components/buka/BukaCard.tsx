"use client";

import { Bookmark, MapPin, UtensilsCrossed, Star } from "lucide-react";
import Image from "next/image";

export interface BukaRestaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  address: string;
  tags: string[];
  hygiene: number;
  affordability: number;
  foodQuality: number;
}

interface BukaCardProps {
  restaurant: BukaRestaurant;
}

export function BukaCard({ restaurant }: BukaCardProps) {
  return (
    <div className="flex flex-col w-full min-w-0 bg-[#151515] rounded-2xl p-3 pb-4">
      {/* Image */}
      <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden group">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Bookmark */}
        <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md bg-black/40 text-white hover:bg-black/60 transition-colors">
          <Bookmark size={16} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 mt-3">
        {/* Name & Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <UtensilsCrossed size={14} className="text-white shrink-0" />
            <span className="text-white text-sm font-bold truncate">{restaurant.name}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <Star size={12} className="text-green-500 fill-green-500" />
            <span className="text-green-500 text-xs font-medium">
              {restaurant.rating}
            </span>
            <span className="text-zinc-500 text-xs">
              ({restaurant.reviewCount} Reviews)
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-1.5">
          <MapPin size={12} className="text-zinc-400 shrink-0 mt-0.5" />
          <span className="text-zinc-400 text-xs leading-tight">{restaurant.address}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {restaurant.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] font-medium rounded-full bg-[#FEEBB6] text-[#695009]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Scores */}
        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-1">
            <span className="text-primary text-xs font-bold">{restaurant.hygiene.toFixed(1)}</span>
            <span className="text-zinc-500 text-[10px]">Hygiene</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-primary text-xs font-bold">{restaurant.affordability.toFixed(1)}</span>
            <span className="text-zinc-500 text-[10px]">Affordability</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-primary text-xs font-bold">{restaurant.foodQuality.toFixed(1)}</span>
            <span className="text-zinc-500 text-[10px]">Food Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
}
