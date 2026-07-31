import type { MediaItem } from "./mediaData";

type Props = {
  item: MediaItem | null;
};

export default function MediaViewer({
  item,
}: Props) {
  if (!item) return null;

  return (
    <section className="media-viewer">

      <button
        type="button"
        className="media-viewer__close"
      >
        ← Back
      </button>

      <div className="media-viewer__media">

        <img
          src={item.thumbnail}
          alt={item.title}
        />

      </div>

      <div className="media-viewer__content">

        <p className="media-viewer__eyebrow">
          {item.category}
        </p>

        <h2>
          {item.title}
        </h2>

        <p>
          {item.theme}
        </p>

      </div>

      <div className="media-viewer__navigation">

        <button>
          Previous
        </button>

        <button>
          Next
        </button>

      </div>

    </section>
  );
}