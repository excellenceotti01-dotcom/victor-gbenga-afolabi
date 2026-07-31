import Container from "../ui/Container";

import MediaHero from "./MediaHero";
import MediaCategories from "./MediaCategories";
import MediaGrid from "./MediaGrid";

import {
  mediaItems,
  mediaCategories,
  featuredMedia,
} from "./mediaData";

import "./Media.css";

export default function Media() {
  return (
    <section
      id="media"
      className="media"
      aria-labelledby="media-heading"
    >
      <MediaHero items={featuredMedia} />

      <Container>
        <header className="media__header">
          <p className="media__eyebrow">
            Media
          </p>

          <h2
            id="media-heading"
            className="media__heading"
          >
            Moments worth
            <br />
            remembering.
          </h2>

          <p className="media__intro">
            Conferences, conversations, workshops,
            behind the scenes, and the moments that
            shaped the journey.
          </p>
        </header>

        <MediaCategories
          categories={mediaCategories}
          active="all"
        />

        <div className="media__gallery">
          <MediaGrid
            items={mediaItems}
          />
        </div>
      </Container>
    </section>
  );
}