import type { MediaCategory } from "./mediaData";

type Category = {
  id: MediaCategory;
  label: string;
};

type Props = {
  categories: readonly Category[];
  active: MediaCategory;
  onChange: (category: MediaCategory) => void;
};

export default function MediaCategories({
  categories,
  active,
  onChange,
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
          onClick={() => onChange(category.id)}
          className={`media-categories__chip ${
            active === category.id
              ? "media-categories__chip--active"
              : ""
          }`}
          aria-pressed={active === category.id}
        >
          {category.label}
        </button>
      ))}
    </nav>
  );
}
