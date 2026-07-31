import MediaCard from "./MediaCard";

import type { MediaItem } from "./mediaData";

type Props = {
  items: MediaItem[];
};

export default function MediaGrid({
  items,
}: Props) {
  return (
    <section
      className="media-grid"
      aria-label="Media archive"
    >
      {items.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
        />
      ))}
    </section>
  );
}