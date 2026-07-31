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
  "--fallen-offset": string;
  "--fallen-rotation": string;
  "--chapter-index": number;
};

export default function Biography() {
  const [selectedChapter, setSelectedChapter] = useState<BiographyChapter | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const readerRef = useRef<HTMLElement | null>(null);
  const readerArrivalRef = useRef<HTMLDivElement | null>(null);
  const readerOverlayRef = useRef<HTMLDivElement | null>(null);
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

    const context = gsap.context(() => {
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          onEnter: () => setActiveChapterIndex(index),
          onLeaveBack: () => setActiveChapterIndex(Math.max(0, index - 1)),
          start: "top 14%",
          trigger: card,
        });
      });
    });

    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    if (!selectedChapter || !readerRef.current || !readerArrivalRef.current || !readerOverlayRef.current || !originRef.current) return;

    const reader = readerRef.current;
    const arrival = readerArrivalRef.current;
    const overlay = readerOverlayRef.current;
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
    gsap.set([arrival, overlay], { autoAlpha: 0 });
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
      .to(arrival, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, "-=0.1");

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

  return (
    <section id="biography" className="biography" aria-labelledby="biography-heading" tabIndex={-1}>
      <Container>
        <header className="biography__header">
          <p className="text-sm uppercase tracking-[0.45em] text-(--color-gold)">Biography</p>
          <h2 id="biography-heading" className="mt-5 text-5xl font-light leading-[0.95] tracking-[-0.04em] md:text-6xl xl:text-7xl">A life in chapters.</h2>
        </header>

        <div className="biography__stack">
          {biographyChapters.map((chapter, index) => (
            <button
              key={chapter.id}
              ref={(element) => {
                cardRefs.current[chapter.id] = element;
              }}
              type="button"
              className="biography__chapter"
              style={{
                "--fallen-offset": `${Math.max(0, activeChapterIndex - index) * 5}px`,
                "--fallen-rotation": `${Math.max(0, activeChapterIndex - index) * -0.15}deg`,
                "--chapter-index": index,
              } as ChapterStyle}
              data-state={index < activeChapterIndex ? "fallen" : index === activeChapterIndex ? "active" : "waiting"}
              onClick={() => openChapter(chapter)}
            >
              <img src={chapter.image} alt="" />
              <span className="biography__chapter-content">
                <span className="biography__chapter-subtitle">{chapter.subtitle}</span>
                <span className="biography__chapter-title">{chapter.title}</span>
                <span className="biography__chapter-enter" aria-hidden="true">Enter chapter →</span>
              </span>
            </button>
          ))}
        </div>
      </Container>

      {selectedChapter && (
        <section ref={readerRef} className="biography__reader" aria-label={`${selectedChapter.title} chapter`} data-lenis-prevent tabIndex={-1}>
          <img className="biography__reader-image" src={selectedChapter.image} alt="" />
          <div ref={readerOverlayRef} className="biography__reader-overlay" />
          <button type="button" className="biography__back" onClick={closeChapter}>
            <span className="biography__back-label">← Back to Chapters</span>
            <span className="biography__back-underline" aria-hidden="true" />
          </button>
          <div ref={readerScrollRef} className="biography__reader-scroll">
            <div ref={readerArrivalRef} className="biography__arrival">
              <Container>
                <p className="text-sm uppercase tracking-[0.45em] text-(--color-gold)">{selectedChapter.subtitle}</p>
                <h2 className="mt-5 text-5xl font-light leading-[0.95] tracking-[-0.04em] text-white md:text-6xl xl:text-7xl">{selectedChapter.title}</h2>
                <p>{selectedChapter.introduction}</p>
              </Container>
            </div>
            <article className="biography__reading-panel">
              <Container className="biography__reading-content">
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
              </Container>
            </article>
          </div>
        </section>
      )}
    </section>
  );
}
