import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import useSectionExit from "@/hooks/useSectionExit";
import PublicationCover from "./PublicationCover";
import type { Publication } from "./publicationData";

type Props = { items: Publication[] };

const AUTOPLAY_DELAY = 7000;

export default function PublicationsHero({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useSectionExit(sectionRef, { left: textRef });

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timer);
  }, [activeIndex, items.length]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  return (
    <section ref={sectionRef} className="publications-hero" aria-roledescription="carousel" aria-label="Featured publications">
      <div className="publications-hero__atmosphere" aria-hidden="true" />

      <div className="publications-hero__content">
        <div className="publications-hero__slides">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const isExternal = item.type === "external";
            const titleWords = item.title.trim().split(/\s+/);
            const finalTitleWord = titleWords.pop();
            const title = (
              <>
                <span>{titleWords.join(" ")} </span>
                <span className="publications-hero__title-tail">
                  {finalTitleWord}
                  <span className="publications-hero__arrow" aria-hidden="true">{isExternal ? "↗" : "→"}</span>
                </span>
              </>
            );

            return (
              <article
                key={item.id}
                className={`publications-hero__slide ${isActive ? "publications-hero__slide--active" : ""}`}
                aria-hidden={!isActive}
              >
                <div ref={isActive ? textRef : undefined} className="publications-hero__text">
                  {isExternal ? (
                    <a className="publications-hero__cta" href={item.url} target="_blank" rel="noopener noreferrer" tabIndex={isActive ? 0 : -1}>
                      {title}
                    </a>
                  ) : (
                    <Link className="publications-hero__cta" to={item.url} tabIndex={isActive ? 0 : -1}>
                      {title}
                    </Link>
                  )}
                  <div className="publications-hero__meta">
                    <p className="publications-hero__publisher">{isExternal ? "Published by" : "By"} {item.publisher}</p>
                    <span aria-hidden="true">/</span>
                    <p className="publications-hero__category">{isExternal ? "Media Coverage" : "VGA Insights"}</p>
                  </div>

                  <div className="publications-hero__controls">
                    <div className="publications-hero__buttons">
                      <button type="button" onClick={showPrevious} aria-label="Previous featured publication">
                        <ChevronLeft aria-hidden="true" />
                      </button>
                      <button type="button" onClick={showNext} aria-label="Next featured publication">
                        <ChevronRight aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                <PublicationCover item={item} variant="hero" className="publications-hero__cover" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
