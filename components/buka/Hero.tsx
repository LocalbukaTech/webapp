"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconCircleArrowLeft } from "@tabler/icons-react";

export default function BukaHero() {
  const router = useRouter();

  return (
    <section className="relative w-full h-[420px] md:h-[500px] overflow-hidden rounded-2xl bg-[#111] mb-10">

      {/* Background GIF */}
      <Image
        src="/images/footwear_image.gif"
        alt="Buka Hero Illustration"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Text Content */}
      <div className="absolute bottom-10 left-6 z-20 max-w-md">
        <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight drop-shadow-lg">
          Wetin You Wan Chop?!
        </h1>

        <p className="mt-2 text-sm md:text-[15px] text-zinc-300 leading-relaxed">
          Find the best buka joints, street food hotspots, and home-style kitchens near you.
        </p>

        <button
          onClick={() => router.push("/restaurants")}
          className="inline-block mt-5 bg-[#fbbe15] text-black font-semibold py-2.5 px-6 rounded-full text-sm hover:bg-[#e5a90f] transition-all"
        >
          Explore Restaurants
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="
          absolute top-5 left-5 z-20
          bg-black/40 backdrop-blur-md
          rounded-full
          p-1
          hover:bg-black/60
          transition
        "
        aria-label="Go Back"
      >
        <IconCircleArrowLeft
          size={34}
          stroke={2}
          className="text-white"
        />
      </button>

    </section>
  );
}
