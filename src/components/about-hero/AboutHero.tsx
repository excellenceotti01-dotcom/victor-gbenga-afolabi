import { slides } from "@/components/about-teaser/slides";
import Container from "@/components/ui/Container";

import "./AboutHero.css";

type AboutHeroProps = {
  onMeetVga: () => void;
};

const portrait = slides[0];
const aboutHeroHeadlineClassName =
  "mb-10 text-6xl font-light leading-[0.95] tracking-[-0.04em] text-white md:text-8xl";

export default function AboutHero({ onMeetVga }: AboutHeroProps) {
  const handleDownloadCv = () => {
    // Reserved for the future CV modal.
  };

  return (
    <section className="about-hero" aria-labelledby="about-hero-heading">
      <img
        className="about-hero__portrait"
        src={portrait.image}
        alt="Victor Gbenga Afolabi"
        style={{ objectPosition: portrait.imagePosition }}
      />

      <Container className="about-hero__content">
        <div className="about-hero__copy">
          <h1 id="about-hero-heading" className={`about-hero__heading ${aboutHeroHeadlineClassName}`}>
            <span>Founder.</span>
            <span>Convener.</span>
            <span>Builder.</span>
          </h1>
          <p className="about-hero__description text-lg leading-8 text-(--color-text-soft)">
            The story behind eight companies and a career built on solving real problems — not titles.
          </p>

          <div className="about-hero__actions">
            <button type="button" className="about-hero__cta group text-sm uppercase tracking-[0.25em]" onClick={onMeetVga}>
              <span>Meet VGA</span>
              <span className="about-hero__arrow" aria-hidden="true">→</span>
              <span className="about-hero__underline" aria-hidden="true" />
            </button>
            <button type="button" className="about-hero__cta group text-sm uppercase tracking-[0.25em]" onClick={handleDownloadCv}>
              <span>Download CV</span>
              <span className="about-hero__arrow" aria-hidden="true">→</span>
              <span className="about-hero__underline" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="about-hero__metric" aria-label="10 plus years building">
          <span>10<sup>+</sup></span>
          <p className="text-xs uppercase tracking-[0.25em]">Years building</p>
        </div>
      </Container>
    </section>
  );
}
