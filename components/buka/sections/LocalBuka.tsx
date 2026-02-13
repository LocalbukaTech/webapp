"use client";

import Image from "next/image";

export default function LocalBukaSection() {
  return (
    <section className="mt-16 px-6 w-full">
      <div className="relative max-w-[1200px] mx-auto aspect-[1238/562] rounded-xl overflow-hidden">
        <Image
          src="/images/LocalBuka_Image.jpg"
          alt="Local Buka Chef"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
