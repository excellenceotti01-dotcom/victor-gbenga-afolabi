import { AnimatePresence, motion } from "framer-motion";

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
    <AnimatePresence mode="wait">
      <motion.div
        key={book.id}
        className="library-book"
        initial={{ opacity: 0, scale: 0.985, y: 10 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.99, y: -8 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div className="library-book__cover-column">
          <div className="library-book__cover">
            <img
              src={book.cover}
              alt={book.title}
            />
          </div>
        </div>

        <div className="library-book__content">
          <h3 className="library-book__heading">
            {book.title}
          </h3>

          <p className="library-book__author">
            {book.author}
          </p>

          <p className="library-book__reflection">
            {stage.title}
          </p>

          <p className="library-book__body">
            {stage.body}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
