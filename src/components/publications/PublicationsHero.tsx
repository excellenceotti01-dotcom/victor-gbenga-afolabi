import { useEffect, useState } from "react";

import type { Publication } from "./publicationData";

type Props = {
  items: Publication[];
};

export default function PublicationsHero({
  items,
}: Props) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        current === items.length - 1
          ? 0
          : current + 1
      );
    }, 6000);

    return () => window.clearInterval(timer);
  }, [items]);

  const activeItem = items[activeIndex];

  const isExternal =
    activeItem.type === "external";

  return (
    <section className="publications-hero">
      <img
        className="publications-hero__image"
        src={activeItem.thumbnail}
        alt={activeItem.title}
        style={{
          objectPosition:
            activeItem.imagePosition,
        }}
      />

      <div className="publications-hero__overlay" />

      <div className="publications-hero__content">
        <div className="publications-hero__text">
          <p className="publications-hero__eyebrow">
            Publications
          </p>

          <a
            className="publications-hero__cta"
            href={activeItem.url}
            target={
              isExternal
                ? "_blank"
                : undefined
            }
            rel={
              isExternal
                ? "noopener noreferrer"
                : undefined
            }
          >
            {activeItem.title}

            <span className="publications-hero__arrow">
              {isExternal ? "↗" : "→"}
            </span>

            <span className="publications-hero__underline" />
          </a>

          <p className="publications-hero__publisher">
            {activeItem.publisher}
          </p>
        </div>

        <div className="publications-hero__progress">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`publications-hero__segment ${
                index === activeIndex
                  ? "publications-hero__segment--active"
                  : ""
              }`}
              onClick={() =>
                setActiveIndex(index)
              }
            >
              <span className="publications-hero__fill" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}