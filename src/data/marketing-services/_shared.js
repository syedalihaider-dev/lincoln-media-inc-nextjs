// Shared assets for the ten Digital Marketing service pages. Photography is the site's own
// (public/images); the interfaces are the demo campaign kit (components/DigitalMarketing/ui).
import analytics from "@public/images/services/digital-marketing.jpg";
import studio from "@public/images/inner/wordpress/design-studio.webp";
import developer from "@public/images/inner/wordpress/developer-at-work.webp";
import laptop from "@public/images/home/laptop-glow.jpg";
import editing from "@public/images/services/video-animation.jpg";
import sketch from "@public/images/services/ui-ux-design.jpg";
import team from "@public/images/services/it-outsourcing.jpg";
import swatches from "@public/images/services/branding.jpg";
import phone from "@public/images/services/mobile-app-development.jpg";
import code from "@public/images/services/web-development.jpg";
import bags from "@public/images/services/ecommerce.jpg";
import circuit from "@public/images/services/ai-saas-mobile.jpg";
import dusk from "@public/images/home/nyc-dusk.jpg";
import empire from "@public/images/home/empire.jpg";
import towers from "@public/images/home/towers.jpg";

// image + its alt text, ready to spread into a data item: { ...P.analytics }
export const P = {
  analytics: { image: analytics, alt: "A laptop showing traffic, page-load and bounce-rate charts" },
  studio: { image: studio, alt: "A strategist reviewing app screens on a large monitor in a studio" },
  developer: { image: developer, alt: "Hands typing beside a laptop showing code and a data table" },
  laptop: { image: laptop, alt: "A laptop glowing in a dark room" },
  editing: { image: editing, alt: "A video editing timeline with clips and audio tracks" },
  sketch: { image: sketch, alt: "A designer sketching page wireframes on a tablet" },
  team: { image: team, alt: "A team working together around a table of laptops and phones" },
  swatches: { image: swatches, alt: "Colour swatches and brand sketches spread across a desk" },
  phone: { image: phone, alt: "A hand holding a phone showing a clean app dashboard" },
  code: { image: code, alt: "A laptop showing website code in an editor" },
  bags: { image: bags, alt: "Red and black shopping bags on a dark background" },
  circuit: { image: circuit, alt: "A glowing circuit schematic on a light table" },
  dusk: { image: dusk, alt: "The Manhattan skyline at dusk across the water" },
  empire: { image: empire, alt: "Midtown Manhattan from above at sunset" },
  towers: { image: towers, alt: "Glass office towers seen from street level" },
};

export const NYC_VIDEO = { video: "/videos/nyc-night.mp4", mobileVideo: "/videos/nyc-night-mobile.mp4", poster: "/videos/nyc-night-poster.jpg" };
