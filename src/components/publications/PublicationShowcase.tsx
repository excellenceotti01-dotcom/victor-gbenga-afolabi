import { type ReactNode, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import PublicationCover from "./PublicationCover";
import type { Publication } from "./publicationData";

const AUTOPLAY_DELAY = 7000;

type Props = {
  sectionId: string;
  title: string;
  description: string;
  items: Publication[];
};

type DestinationProps = {
  item: Publication;
  children: ReactNode;
  className?: string;
  tabIndex?: number;
  ariaHidden?: boolean;
};

function PublicationDestination({ item, children, className, tabIndex, ariaHidden }: DestinationProps) {
  if (item.type === "external") {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        tabIndex={tabIndex}
        aria-hidden={ariaHidden}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={item.url} className={className} tabIndex={tabIndex} aria-hidden={ariaHidden}>
      {children}
    </Link>
  );
}

function ReadMore({ item }: { item: Publication }) {
  return (
    <span className="publication-showcase__read-more">
      Read More <span aria-hidden="true">{item.type === "external" ? "↗" : "→"}</span>
    </span>
  );
}

export default function PublicationShowcase({ sectionId, title, description, items }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timer);
  }, [activeIndex, items.length]);

  if (!items.length) return null;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  const otherItems = items.filter((_, index) => index !== activeIndex);
  const secondaryItems = (items.length > 2 ? otherItems : items).slice(0, 2);

  return (
    <section className="publication-showcase" aria-labelledby={`${sectionId}-heading`}>
      <header className="publication-showcase__header">
        <h2 id={`${sectionId}-heading`}>{title}</h2>
        <p>{description}</p>
      </header>

      <div className="publication-showcase__layout">
        <div
          className="publication-showcase__featured"
          aria-roledescription="carousel"
          aria-label={`Featured ${title}`}
        >
          <div className="publication-showcase__visuals">
            {items.map((item, index) => (
              <PublicationDestination
                key={item.id}
                item={item}
                className={`publication-showcase__visual ${index === activeIndex ? "is-active" : ""}`}
                tabIndex={index === activeIndex ? 0 : -1}
                ariaHidden={index !== activeIndex}
              >
                <PublicationCover item={item} variant="hero" />
              </PublicationDestination>
            ))}
          </div>

          <div className="publication-showcase__copy-stage" aria-live="polite">
            {items.map((item, index) => (
              <PublicationDestination
                key={item.id}
                item={item}
                className={`publication-showcase__copy ${index === activeIndex ? "is-active" : ""}`}
                tabIndex={index === activeIndex ? 0 : -1}
                ariaHidden={index !== activeIndex}
              >
                <p className="publication-showcase__meta">
                  <span>{item.publisher}</span>
                  <span aria-hidden="true">/</span>
                  <time>{item.date}</time>
                  <span aria-hidden="true">/</span>
                  <span>{title}</span>
                </p>
                <h3>{item.title}</h3>
                <p className="publication-showcase__excerpt">{item.excerpt}</p>
                <ReadMore item={item} />
              </PublicationDestination>
            ))}
          </div>

          <div className="publication-showcase__controls">
            <button type="button" onClick={showPrevious} aria-label={`Previous ${title} publication`}>
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={showNext} aria-label={`Next ${title} publication`}>
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <aside className="publication-showcase__secondary" aria-label={`More ${title}`}>
          <p className="publication-showcase__secondary-label">More {title}</p>
          <div className="publication-showcase__secondary-list">
            {secondaryItems.map((item, index) => (
              <article key={`${item.id}-${index}`} className="publication-showcase__secondary-item">
                <PublicationDestination item={item} className="publication-showcase__secondary-link">
                  <div className="publication-showcase__secondary-thumbnail">
                    <PublicationCover item={item} variant="thumbnail" />
                  </div>
                  <div className="publication-showcase__secondary-copy">
                    <p>{item.publisher}</p>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <ReadMore item={item} />
                  </div>
                </PublicationDestination>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
