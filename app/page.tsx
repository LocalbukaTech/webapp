"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { VideoFeed } from "@/components/video/VideoFeed";
import { mockVideos } from "@/constants/mockVideos";

export default function Home() {
  return (
    <MainLayout>
      <VideoFeed videos={mockVideos} />
    </MainLayout>
  );
}
