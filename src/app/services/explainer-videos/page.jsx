import VideoServicePage from "@/components/VideoAnimation/Inner/VideoServicePage";
import { videoInnerMetadata } from "@/data/video-animation/inner";

// A Video & Animation service page — the shared master design, filled from src/data/video-animation/inner/explainer-videos.js
export const metadata = videoInnerMetadata("explainer-videos");
export default function Page() {
  return <VideoServicePage slug="explainer-videos" />;
}
