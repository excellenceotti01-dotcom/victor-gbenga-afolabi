import { useEffect } from "react";

import type { MediaItem } from "./mediaData";

type Props = {
  item: MediaItem | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function MediaViewer({ item, onClose, onPrevious, onNext }: Props) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose, onNext, onPrevious]);

  if (!item) return null;

  return (
    <section
      className="media-viewer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-viewer-title"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className="media-viewer__panel">
        <button type="button" className="media-viewer__close" onClick={onClose}>
          ← Back
        </button>

        <div className="media-viewer__media">
          <img src={item.thumbnail} alt={item.title} />
        </div>

        <div className="media-viewer__content">
          <p className="media-viewer__eyebrow">{item.category.replaceAll("-", " ")}</p>
          <h2 id="media-viewer-title">{item.title}</h2>
          <p>{item.theme}</p>
        </div>

        <div className="media-viewer__navigation">
          <button type="button" onClick={onPrevious}>Previous</button>
          <button type="button" onClick={onNext}>Next</button>
        </div>
      </div>
    </section>
  );
}
