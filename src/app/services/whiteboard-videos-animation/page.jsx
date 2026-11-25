import VideoServicePage from "@/components/VideoAnimation/Inner/VideoServicePage";
import { videoInnerMetadata } from "@/data/video-animation/inner";

// A Video & Animation service page — the shared master design, filled from src/data/video-animation/inner/whiteboard-videos-animation.js
export const metadata = videoInnerMetadata("whiteboard-videos-animation");
export default function Page() {
  return <VideoServicePage slug="whiteboard-videos-animation" />;
}
