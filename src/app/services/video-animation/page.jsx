import VideoPage, { videoMetadata } from "@/components/VideoAnimation/Main/VideoPage";

// The Video & Animation category page — its own design, filled from src/data/video-animation/main.js
export const metadata = videoMetadata();
export default function Page() {
  return <VideoPage />;
}
