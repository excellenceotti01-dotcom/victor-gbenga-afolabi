import type { MediaCategory } from "./mediaData";

type Category = {
  id: MediaCategory;
  label: string;
};

type Props = {
  categories: readonly Category[];
  active: MediaCategory;
};

export default function MediaCategories({
  categories,
  active,
}: Props) {
  return (
    <nav
      className="media-categories"
      aria-label="Media categories"
    >
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={`media-categories__chip ${
            active === category.id
              ? "media-categories__chip--active"
              : ""
          }`}
        >
          {category.label}
        </button>
      ))}
    </nav>
  );
}