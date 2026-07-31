import { useState } from "react";

import Container from "@/components/ui/Container";

import LibraryBook from "./LibraryBook";
import LibraryProgress from "./LibraryProgress";

import { books } from "./books";

import "./Library.css";

export default function Library() {
  const [activeBookIndex, setActiveBookIndex] = useState(0);

  const activeBook = books[activeBookIndex];

  // For now we're keeping the first stage static.
  // Tomorrow this becomes the Apple-style scroll sequence.
  const activeStage = activeBook.stages[0];

  return (
    <section
      id="library"
      className="library"
      aria-labelledby="library-heading"
    >
      <Container className="library__container">
        <header className="library__header">
          <p className="library__eyebrow">
            Library
          </p>

          <h2
            id="library-heading"
            className="library__heading"
          >
            Books that shaped
            <br />
            how I think.
          </h2>

          <p className="library__intro">
            I read to think better,
            build better,
            and lead better.
          </p>
        </header>

        <div className="library__content">
          <LibraryBook
            book={activeBook}
            stage={activeStage}
          />
        </div>

        <LibraryProgress
          books={books.map((_, index) => index)}
          activeBook={activeBookIndex}
          onSelect={setActiveBookIndex}
        />
      </Container>
    </section>
  );
}