"use client";

import { Carousel } from "@/components/ui/Carousel";
import { BUKA_LIST_SLIDES } from "@/constants/carouselConfig";

export default function BukaListPage() {
    return (
        <div className="min-h-screen bg-[#1a1a1a]">
            {/* Hero Carousel Section - Full Width */}
            <Carousel slides={BUKA_LIST_SLIDES} />
        </div>
    );
}
