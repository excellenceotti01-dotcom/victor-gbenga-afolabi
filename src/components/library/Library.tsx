import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "@/components/ui/Container";

import LibraryBook from "./LibraryBook";
import LibraryProgress from "./LibraryProgress";

import { books } from "./books";

import "./Library.css";

gsap.registerPlugin(ScrollTrigger);

export default function Library() {
  const [activeBookIndex, setActiveBookIndex] = useState(0);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLElement | null>(null);
  const activeBookIndexRef = useRef(activeBookIndex);

  const activeBook = books[activeBookIndex];

  const activeStage = activeBook.stages.find(
    (stage) => stage.id === "reflection",
  ) ?? activeBook.stages[0];

  useLayoutEffect(() => {
    const library = pinRef.current;
    const progress = progressRef.current;

    if (!library || !progress || books.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fills = Array.from(
      progress.querySelectorAll<HTMLElement>(".library-progress__fill"),
    );

    const context = gsap.context(() => {
      gsap.set(fills, { scaleX: 0, transformOrigin: "left center" });

      const scrollState = { progress: 0 };

      const updateLibrary = () => {
        const scaledProgress = scrollState.progress * books.length;
        const nextIndex = Math.min(
          Math.floor(scaledProgress),
          books.length - 1,
        );

        gsap.set(fills, {
          scaleX: (index) => Math.min(Math.max(scaledProgress - index, 0), 1),
        });

        if (nextIndex !== activeBookIndexRef.current) {
          activeBookIndexRef.current = nextIndex;
          setActiveBookIndex(nextIndex);
        }
      };

      gsap.to(scrollState, {
        progress: 1,
        ease: "none",
        onUpdate: updateLibrary,
        scrollTrigger: {
          trigger: library,
          id: "library-story",
          start: "top top",
          end: () => `+=${window.innerHeight * books.length}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, library);

    return () => context.revert();
  }, []);

  return (
    <section
      id="library"
      data-scroll-trigger-id="library-story"
      className="library"
      aria-labelledby="library-heading"
    >
      <div ref={pinRef} className="library__pin">
        <Container className="library__container">
        <header className="library__header">
          <h2
            id="library-heading"
            className="library__heading"
          >
            Books that shaped
            <br />
            how I think.
          </h2>

        </header>

        <div className="library__content">
          <LibraryBook
            book={activeBook}
            stage={activeStage}
          />
        </div>

        <LibraryProgress
          ref={progressRef}
          books={books.map((_, index) => index)}
          activeBook={activeBookIndex}
        />
        </Container>
      </div>
    </section>
  );
}
