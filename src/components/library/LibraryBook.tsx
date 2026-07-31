import type { LibraryBook as LibraryBookType, BookStage } from "./books";

type Props = {
  book: LibraryBookType;
  stage: BookStage;
};

export default function LibraryBook({
  book,
  stage,
}: Props) {
  return (
    <div className="library-book">

      <div className="library-book__cover-column">

        <div className="library-book__cover">
          <img
            src={book.cover}
            alt={book.title}
          />
        </div>

        <div className="library-book__meta">
          <p className="library-book__title">
            {book.title}
          </p>

          <p className="library-book__author">
            {book.author}
          </p>
        </div>

      </div>

      <div className="library-book__content">

        <div className="library-book__stage">
          {stage.id === "book" && "Book"}

          {stage.id === "idea" && "Idea"}

          {stage.id === "reflection" &&
            "Victor's Reflection"}
        </div>

        <h3 className="library-book__heading">
          {stage.title}
        </h3>

        <p className="library-book__body">
          {stage.body}
        </p>

      </div>

    </div>
  );
}