import { useEffect, useMemo, useRef, useState } from "react";

import Container from "../ui/Container";

import MediaHero from "./MediaHero";
import MediaCategories from "./MediaCategories";
import MediaGrid from "./MediaGrid";
import MediaViewer from "./MediaViewer";

import {
  mediaItems,
  mediaCategories,
  featuredMedia,
} from "./mediaData";
import type { MediaCategory } from "./mediaData";

import "./Media.css";

export default function Media() {
  const [activeCategory, setActiveCategory] = useState<MediaCategory>("all");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [viewerItem, setViewerItem] = useState<(typeof mediaItems)[number] | null>(null);
  const highlightTimerRef = useRef<number | null>(null);
  const wallTrackRef = useRef<HTMLDivElement | null>(null);
  const wallScrollRef = useRef<HTMLDivElement | null>(null);
  const filteredItems = useMemo(
    () => activeCategory === "all"
      ? mediaItems
      : mediaItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => () => {
    if (highlightTimerRef.current !== null) {
      window.clearTimeout(highlightTimerRef.current);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("media-page-active");
    document.body.classList.add("media-page-active");

    return () => {
      document.documentElement.classList.remove("media-page-active");
      document.body.classList.remove("media-page-active");
    };
  }, []);

  useEffect(() => {
    const track = wallTrackRef.current;
    const scrollArea = wallScrollRef.current;
    if (!track || !scrollArea) return;

    const syncWallScroll = () => {
      const trackTop = window.scrollY + track.getBoundingClientRect().top;
      const distance = Math.max(0, scrollArea.scrollHeight - scrollArea.clientHeight);
      const progress = Math.min(Math.max(window.scrollY - trackTop, 0), distance);
      scrollArea.scrollTop = progress;
    };

    const updateTrackLength = () => {
      const distance = Math.max(0, scrollArea.scrollHeight - scrollArea.clientHeight);
      track.style.setProperty("--media-wall-scroll-distance", `${distance}px`);
      syncWallScroll();
    };

    const resizeObserver = new ResizeObserver(updateTrackLength);
    resizeObserver.observe(scrollArea);
    if (scrollArea.firstElementChild) {
      resizeObserver.observe(scrollArea.firstElementChild);
    }

    window.addEventListener("scroll", syncWallScroll, { passive: true });
    window.addEventListener("resize", updateTrackLength);
    updateTrackLength();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", syncWallScroll);
      window.removeEventListener("resize", updateTrackLength);
    };
  }, [filteredItems]);

  const revealMediaItem = (itemId: string) => {
    setActiveCategory("all");
    setHighlightedId(null);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const card = document.querySelector<HTMLElement>(`[data-media-id="${itemId}"]`);
        const scrollArea = wallScrollRef.current;
        const track = wallTrackRef.current;
        if (!card || !scrollArea || !track) return;

        const cardTop = card.getBoundingClientRect().top
          - scrollArea.getBoundingClientRect().top
          + scrollArea.scrollTop;
        const centeredTop = cardTop - ((scrollArea.clientHeight - card.offsetHeight) / 2);
        const trackTop = window.scrollY + track.getBoundingClientRect().top;

        window.scrollTo({
          top: trackTop + Math.max(0, centeredTop),
          behavior: "smooth",
        });
        window.setTimeout(() => setHighlightedId(itemId), 500);

        if (highlightTimerRef.current !== null) {
          window.clearTimeout(highlightTimerRef.current);
        }

        highlightTimerRef.current = window.setTimeout(() => {
          setHighlightedId(null);
          highlightTimerRef.current = null;
        }, 1800);
      });
    });
  };

  const moveViewer = (direction: -1 | 1) => {
    if (!viewerItem) return;
    const currentIndex = mediaItems.findIndex((item) => item.id === viewerItem.id);
    const nextIndex = (currentIndex + direction + mediaItems.length) % mediaItems.length;
    setViewerItem(mediaItems[nextIndex]);
  };

  return (
    <section
      id="media"
      className="media"
      aria-labelledby="media-heading"
    >
      <MediaHero items={featuredMedia} onSelect={revealMediaItem} />

      <div ref={wallTrackRef} className="media-wall-track">
      <section className="media-wall" aria-label="Media wall">
        <Container className="media-wall__container">
          <div className="media-wall__frame">
            <header className="media__header">
              <h2 id="media-heading" className="media__heading">
                Moments worth
                <br />
                remembering.
              </h2>

              <p className="media__intro">
                Conferences, conversations, workshops,
                behind the scenes, and the moments that
                shaped the journey.
              </p>
            </header>

            <MediaCategories
              categories={mediaCategories}
              active={activeCategory}
              onChange={setActiveCategory}
            />

            <div
              ref={wallScrollRef}
              className="media-wall__scroll"
              tabIndex={0}
              aria-label="Scrollable media archive"
            >
              <div className="media__gallery" aria-live="polite">
                <MediaGrid
                  key={activeCategory}
                  items={filteredItems}
                  highlightedId={highlightedId}
                  onSelect={setViewerItem}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      </div>

      <MediaViewer
        item={viewerItem}
        onClose={() => setViewerItem(null)}
        onPrevious={() => moveViewer(-1)}
        onNext={() => moveViewer(1)}
      />
    </section>
  );
}
