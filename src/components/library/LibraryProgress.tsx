type Props = {
  books: number[];
  activeBook: number;
  onSelect: (index: number) => void;
};

export default function LibraryProgress({
  books,
  activeBook,
  onSelect,
}: Props) {
  return (
    <nav
      className="library-progress"
      aria-label="Library progress"
    >
      {books.map((book, index) => (
        <button
          key={book}
          type="button"
          className={`library-progress__segment ${
            index === activeBook
              ? "library-progress__segment--active"
              : ""
          }`}
          aria-label={`Go to book ${index + 1}`}
          onClick={() => onSelect(index)}
        >
          <span className="library-progress__fill" />
        </button>
      ))}
    </nav>
  );
}