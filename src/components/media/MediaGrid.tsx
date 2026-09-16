import MediaCard from "./MediaCard";

import type { MediaItem } from "./mediaData";

type Props = {
  items: MediaItem[];
  highlightedId: string | null;
  onSelect: (item: MediaItem) => void;
};

export default function MediaGrid({
  items,
  highlightedId,
  onSelect,
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
          isHighlighted={item.id === highlightedId}
          onSelect={() => onSelect(item)}
        />
      ))}
    </section>
  );
}
