import { type KeyboardEvent } from "react";

import type { BusinessRecord } from "./types";

type BusinessSelectorProps = {
  businesses: readonly BusinessRecord[];
  activeSlug: string;
  previewSlug: string | null;
  onPreview: (slug: string | null) => void;
  onSelect: (slug: string) => void;
};

export default function BusinessSelector({
  businesses,
  activeSlug,
  previewSlug,
  onPreview,
  onSelect,
}: BusinessSelectorProps) {
  const activeIndex = Math.max(
    businesses.findIndex((business) => business.slug === activeSlug),
    0,
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (activeIndex + direction + businesses.length) % businesses.length;
    const nextBusiness = businesses[nextIndex];

    onSelect(nextBusiness.slug);
    requestAnimationFrame(() => document.getElementById(`business-selector-${nextBusiness.slug}`)?.focus());
  };

  return (
    <nav className="business-selector" aria-label="Choose a business ecosystem">
      <p className="business-selector__label">The ecosystem</p>
      <ol className="business-selector__list" onMouseLeave={() => onPreview(null)}>
          {businesses.map((business, index) => {
            const isActive = business.slug === activeSlug;
            const isPreviewed = business.slug === previewSlug;

            return (
              <li
                key={business.id}
                className="business-selector__item"
              >
                <button
                  id={`business-selector-${business.slug}`}
                  type="button"
                  className="business-selector__button"
                  aria-current={isActive ? "true" : undefined}
                  data-previewed={isPreviewed || undefined}
                  onMouseEnter={() => onPreview(business.slug)}
                  onFocus={() => onPreview(business.slug)}
                  onBlur={() => onPreview(null)}
                  onClick={() => onSelect(business.slug)}
                  onKeyDown={handleKeyDown}
                >
                  <span className="business-selector__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="business-selector__name">{business.name}</span>
                </button>
              </li>
            );
          })}
      </ol>
    </nav>
  );
}
