import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "@/components/ui/Container";

import "./Biography.css";
import { biographyChapters, type BiographyChapter } from "./chapters";

gsap.registerPlugin(ScrollTrigger);

type ChapterStyle = CSSProperties & {
  "--chapter-index": number;
  "--stack-offset": string;
};

export default function Biography() {
  const [selectedChapter, setSelectedChapter] = useState<BiographyChapter | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const readerRef = useRef<HTMLElement | null>(null);
  const readerOverlayRef = useRef<HTMLDivElement | null>(null);
  const readerPanelRef = useRef<HTMLElement | null>(null);
  const readerScrollRef = useRef<HTMLDivElement | null>(null);
  const originRef = useRef<DOMRect | null>(null);
  const entryTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const overviewScrollPositionRef = useRef(0);

  const openChapter = (chapter: BiographyChapter) => {
    const chapterCard = cardRefs.current[chapter.id];
    if (!chapterCard) return;

    originRef.current = chapterCard.getBoundingClientRect();
    overviewScrollPositionRef.current = window.scrollY;
    setSelectedChapter(chapter);
  };

  const closeChapter = () => {
    if (!selectedChapter || !entryTimelineRef.current) return;

    readerScrollRef.current?.scrollTo({ top: 0 });
    entryTimelineRef.current.eventCallback("onReverseComplete", () => {
      setSelectedChapter(null);
      window.scrollTo({ top: overviewScrollPositionRef.current });
    });
    entryTimelineRef.current.reverse();
  };

  useLayoutEffect(() => {
    const cards = biographyChapters
      .map((chapter) => cardRefs.current[chapter.id])
      .filter((card): card is HTMLButtonElement => card !== null);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set(cards, {
        scale: 1,
        transformOrigin: "center top",
      });

      gsap.set(cards.slice(1), { yPercent: 110 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinRef.current,
          id: "biography-story",
          start: "top top",
          end: () => `+=${window.innerHeight * cards.length}`,
          pin: pinRef.current,
          pinSpacing: false,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to({}, { duration: 0.35 });

      cards.slice(1).forEach((incomingCard, incomingIndex) => {
        const precedingCards = cards.slice(0, incomingIndex + 1);
        const stage = `card-${incomingIndex + 2}`;

        timeline
          .to(incomingCard, { yPercent: 0, duration: 1 }, stage)
          .to(
            precedingCards,
            {
              scale: (cardIndex) =>
                1 - (precedingCards.length - cardIndex) * 0.04,
              duration: 1,
            },
            stage,
          );
      });

      timeline.to({}, { duration: 0.35 });
    }, stackRef);

    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    if (!selectedChapter || !readerRef.current || !readerOverlayRef.current || !readerPanelRef.current || !originRef.current) return;

    const reader = readerRef.current;
    const overlay = readerOverlayRef.current;
    const panel = readerPanelRef.current;
    const card = cardRefs.current[selectedChapter.id];
    const origin = originRef.current;
    const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    gsap.set(reader, {
      autoAlpha: 0,
      borderRadius: "var(--radius-lg)",
      height: origin.height,
      overflow: "hidden",
      width: origin.width,
      x: origin.left,
      y: origin.top,
    });
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(panel, { yPercent: 100 });
    readerScrollRef.current?.scrollTo({ top: 0 });

    if (card) timeline.to(card, { duration: 0.18, y: -8 });

    timeline
      .set(reader, { autoAlpha: 1 })
      .to(reader, {
        borderRadius: 0,
        duration: 0.85,
        height: "100svh",
        width: "100vw",
        x: 0,
        y: 0,
      }, "<")
      .to(overlay, { autoAlpha: 1, duration: 0.45 }, "-=0.35")
      .to(panel, { yPercent: 0, duration: 0.85, ease: "power3.out" }, "-=0.1");

    entryTimelineRef.current = timeline;

    return () => {
      timeline.kill();
      entryTimelineRef.current = null;
    };
  }, [selectedChapter]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChapter();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  });

  useEffect(() => {
    if (!selectedChapter) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [selectedChapter]);

  return (
    <section id="biography" data-scroll-trigger-id="biography-story" className="biography" aria-labelledby="biography-heading" tabIndex={-1}>
      <div ref={pinRef} className="biography__pin">
        <Container>
          <header className="biography__header">
            <h2 id="biography-heading" className="text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl xl:text-7xl">A life in chapters.</h2>
          </header>

          <div ref={stackRef} className="biography__stack">
            {biographyChapters.map((chapter, index) => (
            <button
              key={chapter.id}
              ref={(element) => {
                cardRefs.current[chapter.id] = element;
              }}
              type="button"
              className="biography__chapter"
              style={{
                "--chapter-index": index,
                "--stack-offset": `${index * 14}px`,
              } as ChapterStyle}
              onClick={() => openChapter(chapter)}
            >
              <img
                src={chapter.image}
                alt=""
                style={{ objectPosition: chapter.imagePosition }}
              />
              <span className="biography__chapter-content">
                <span className="biography__chapter-title">{chapter.title}</span>
                <span className="biography__chapter-enter" aria-hidden="true">Enter chapter →</span>
              </span>
            </button>
            ))}
          </div>
        </Container>
      </div>

      {selectedChapter && (
        <section ref={readerRef} className="biography__reader" aria-label={`${selectedChapter.title} chapter`} data-lenis-prevent tabIndex={-1}>
          <img
            className="biography__reader-image"
            src={selectedChapter.image}
            alt=""
            style={{ "--reader-image-position": selectedChapter.imagePosition } as CSSProperties}
          />
          <div ref={readerOverlayRef} className="biography__reader-overlay" />
          <article ref={readerPanelRef} className="biography__reading-panel">
              <Container className="biography__reading-container">
                <div className="biography__reading-content">
                  <button type="button" className="biography__back" onClick={closeChapter}>
                    <span className="biography__back-label">← Back to Chapters</span>
                    <span className="biography__back-underline" aria-hidden="true" />
                  </button>
                  <div className="biography__reading-hero">
                    <h2 className="biography__reading-heading">{selectedChapter.readingHeading}</h2>
                    <p className="biography__reading-introduction">{selectedChapter.introduction}</p>
                  </div>
                  <div ref={readerScrollRef} className="biography__reading-body" data-lenis-prevent>
                {selectedChapter.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {selectedChapter.cta.to ? (
                  <Link to={selectedChapter.cta.to} className="biography__cta group">
                    <span>{selectedChapter.cta.label}</span>
                    <span className="biography__cta-arrow" aria-hidden="true">→</span>
                    <span className="biography__cta-underline" aria-hidden="true" />
                  </Link>
                ) : (
                  <button type="button" className="biography__cta group" onClick={() => undefined}>
                    <span>{selectedChapter.cta.label}</span>
                    <span className="biography__cta-arrow" aria-hidden="true">→</span>
                    <span className="biography__cta-underline" aria-hidden="true" />
                  </button>
                )}
                  </div>
                </div>
              </Container>
          </article>
        </section>
      )}
    </section>
  );
}
