import type { MediaItem } from "./mediaData";

type Props = {
  item: MediaItem;
  isHighlighted: boolean;
  onSelect: () => void;
};

export default function MediaCard({
  item,
  isHighlighted,
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      className={`
        media-card
        media-card--${item.type}
        media-card--${item.layout}
        ${isHighlighted ? "media-card--highlighted" : ""}
      `}
      data-media-id={item.id}
      aria-label={item.title}
      onClick={onSelect}
    >
      <div className="media-card__image-wrapper">
        <img
          className="media-card__image"
          src={item.thumbnail}
          alt={item.title}
        />

        <div className="media-card__overlay" />

        {(item.type === "video" ||
          item.type === "youtube") && (
          <div className="media-card__play">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}

        {item.type === "youtube" && (
          <div className="media-card__badge">
            YouTube
          </div>
        )}

        <span className="media-card__meta">
          <span className="media-card__name">{item.title}</span>
          <span className="media-card__action">View details →</span>
        </span>
      </div>
    </button>
  );
}
