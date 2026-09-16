import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import PublicationCover from "./PublicationCover";
import type { Publication } from "./publicationData";

type Props = { item: Publication };

export default function PublicationCard({ item }: Props) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isExternal = item.type === "external";

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const body = (
    <>
      <PublicationCover item={item} variant="card" />
      <div className="publication-card__shade" />
      <div className="publication-card__content">
        <p>{isExternal ? item.publisher : "VGA Insights"}</p>
        <h3>{item.title}</h3>
        <span>{isExternal ? "View publication ↗" : "Read article →"}</span>
      </div>
    </>
  );

  return (
    <article
      ref={cardRef}
      className={`publication-card publication-card--${item.type} ${isVisible ? "publication-card--visible" : ""}`}
    >
      {isExternal ? (
        <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.title}, opens in a new tab`}>
          {body}
        </a>
      ) : (
        <Link to={item.url}>{body}</Link>
      )}
    </article>
  );
}
