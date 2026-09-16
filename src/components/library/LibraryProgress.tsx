import { forwardRef } from "react";

type Props = {
  books: number[];
  activeBook: number;
};

const LibraryProgress = forwardRef<HTMLElement, Props>(function LibraryProgress(
  { books, activeBook },
  ref,
) {
  return (
    <nav
      ref={ref}
      className="library-progress"
      aria-label="Library progress"
    >
      {books.map((book, index) => (
        <span
          key={book}
          className={`library-progress__segment ${
            index === activeBook
              ? "library-progress__segment--active"
              : ""
          }`}
          aria-label={`Book ${index + 1}`}
          aria-current={index === activeBook ? "true" : undefined}
        >
          <span className="library-progress__fill" />
        </span>
      ))}
    </nav>
  );
});

export default LibraryProgress;
