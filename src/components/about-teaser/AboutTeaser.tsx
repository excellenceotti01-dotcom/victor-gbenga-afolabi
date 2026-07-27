import { useEffect, useRef, useState } from "react";

import Background from "./Background";
import Content from "./Content";
import Progress from "./Progress";

import { slides } from "./slides";

const SLIDE_DURATION = 4000;

export default function AboutTeaser() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const isPaused = useRef(false);

  const animationFrame = useRef<number | null>(null);
  const previousTimestamp = useRef<number | null>(null);
  const elapsed = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const animate = (timestamp: number) => {
      if (cancelled) return;

      if (previousTimestamp.current === null) {
        previousTimestamp.current = timestamp;
      }

      const delta =
        timestamp - previousTimestamp.current;

      previousTimestamp.current = timestamp;

      if (!isPaused.current) {
        elapsed.current += delta;

        if (elapsed.current >= SLIDE_DURATION) {
          elapsed.current = 0;

          setProgress(0);

          setActiveSlide(
            (prev) => (prev + 1) % slides.length
          );
        } else {
          setProgress(
            (elapsed.current / SLIDE_DURATION) * 100
          );
        }
      }

      animationFrame.current =
        requestAnimationFrame(animate);
    };

    animationFrame.current =
      requestAnimationFrame(animate);

    return () => {
      cancelled = true;

      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const slide = slides[activeSlide];

  return (
    <section
      className="
        relative
        h-screen
        overflow-hidden
        bg-black
      "
    >
      <Background
        image={slide.image}
        imagePosition={slide.imagePosition}
      />

      <Content
        chapter={slide.chapter}
        title={slide.title}
        description={slide.description}
        cta={slide.cta}
        onPause={() => {
          isPaused.current = true;
        }}
        onResume={() => {
          isPaused.current = false;
        }}
      />

      <Progress
  total={slides.length}
  active={activeSlide}
  progress={progress}
  onPause={() => {
    isPaused.current = true;
  }}
  onResume={() => {
    isPaused.current = false;
  }}
/>
    </section>
  );
}