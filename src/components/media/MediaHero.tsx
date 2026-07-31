import type { MediaItem } from "./mediaData";

type Props = {
  items: MediaItem[];
};

export default function MediaHero({
  items,
}: Props) {
  const item = items[0];

  if (!item) return null;

  return (
    <section className="media-hero">

      <img
        className="media-hero__image"
        src={item.thumbnail}
        alt={item.title}
      />

      <div className="media-hero__overlay" />

      <div className="media-hero__content">

        <div className="media-hero__text">

          <p className="media-hero__eyebrow">
            Featured Moment
          </p>

          <button
            type="button"
            className="media-hero__cta"
          >
            <span>
              {item.title}
            </span>

            <span
              className="media-hero__arrow"
              aria-hidden="true"
            >
              →
            </span>

            <span
              className="media-hero__underline"
              aria-hidden="true"
            />
          </button>

          <p className="media-hero__theme">
            {item.theme}
          </p>

        </div>

        <div className="media-hero__progress">

          {items.map((slide, index) => (

            <button
              key={slide.id}
              type="button"
              className={`media-hero__segment ${
                index === 0
                  ? "media-hero__segment--active"
                  : ""
              }`}
              aria-label={`Go to featured item ${
                index + 1
              }`}
            >
              <span className="media-hero__fill" />
            </button>

          ))}

        </div>

      </div>

    </section>
  );
}