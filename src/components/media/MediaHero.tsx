import { useEffect, useRef, useState } from "react";

import type { MediaItem } from "./mediaData";

const AUTOPLAY_DELAY = 7000;

type Props = {
  items: MediaItem[];
  onSelect: (itemId: string) => void;
};

export default function MediaHero({
  items,
  onSelect,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const heroRef = useRef<HTMLElement | null>(null);
  const remainingTimeRef = useRef(AUTOPLAY_DELAY);
  const timerStartedAtRef = useRef<number | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (items.length < 2 || isPaused || !isVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timerStartedAtRef.current = performance.now();

    const timer = window.setTimeout(() => {
      timerStartedAtRef.current = null;
      remainingTimeRef.current = AUTOPLAY_DELAY;
      setActiveIndex((current) => (current + 1) % items.length);
    }, remainingTimeRef.current);

    return () => {
      window.clearTimeout(timer);

      if (timerStartedAtRef.current !== null) {
        remainingTimeRef.current = Math.max(
          0,
          remainingTimeRef.current - (performance.now() - timerStartedAtRef.current),
        );
        timerStartedAtRef.current = null;
      }
    };
  }, [activeIndex, isPaused, isVisible, items.length]);

  if (!items.length) return null;

  return (
    <section
      ref={heroRef}
      className={`media-hero ${isPaused || !isVisible ? "media-hero--paused" : ""}`}
      aria-roledescription="carousel"
      aria-label="Featured media"
    >
      <div className="media-hero__images">
        {items.map((item, index) => (
          <img
            key={item.id}
            className={`media-hero__image ${index === activeIndex ? "media-hero__image--active" : ""}`}
            src={item.thumbnail}
            alt={index === activeIndex ? item.title : ""}
            aria-hidden={index !== activeIndex}
          />
        ))}
      </div>

      <div className="media-hero__overlay" />

      <div className="media-hero__content">

        <div
          className="media-hero__interaction"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="media-hero__text" aria-live="polite">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`media-hero__copy ${index === activeIndex ? "media-hero__copy--active" : ""}`}
                aria-hidden={index !== activeIndex}
              >
                <h1 className="media-hero__title">
                  <button
                    type="button"
                    className="media-hero__title-button"
                    onClick={(event) => {
                      if (event.detail > 0) event.currentTarget.blur();
                      onSelect(item.id);
                    }}
                  >
                    <span>{item.title}</span>
                    <span className="media-hero__arrow" aria-hidden="true">→</span>
                    <span className="media-hero__underline" aria-hidden="true" />
                  </button>
                </h1>
                <p className="media-hero__theme">
                  <span>{item.category.replaceAll("-", " ")}</span>
                  <span aria-hidden="true"> · </span>
                  {item.theme}
                </p>
              </div>
            ))}
          </div>

          <div className="media-hero__progress">

            {items.map((slide, index) => (

              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  remainingTimeRef.current = AUTOPLAY_DELAY;
                  timerStartedAtRef.current = null;
                  setActiveIndex(index);
                }}
                className={`media-hero__segment ${
                  index < activeIndex ? "media-hero__segment--complete" : ""
                } ${index === activeIndex ? "media-hero__segment--active" : ""}`}
                aria-label={`Go to featured item ${
                  index + 1
                }`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <span className="media-hero__fill" />
              </button>

            ))}

          </div>
        </div>

      </div>

    </section>
  );
}
