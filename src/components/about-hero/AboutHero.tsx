import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { slides } from "@/components/about-teaser/slides";
import Container from "@/components/ui/Container";
import useSectionExit from "@/hooks/useSectionExit";

import "./AboutHero.css";

type AboutHeroProps = {
  onMeetVga: () => void;
  onViewLibrary: () => void;
};

const biography = slides[0];
const library = slides[2];

const experiences = [
  {
    id: "biography",
    image: biography.image,
    imagePosition: biography.imagePosition,
    title: ["Founder.", "Convener.", "Builder."],
    description:
      "The story behind eight companies and a career built on solving real problems — not titles.",
    cta: "Meet VGA",
  },
  {
    id: "library",
    image: library.image,
    imagePosition: library.imagePosition,
    title: library.title,
    description: library.description,
    cta: "Explore Library",
  },
];

const SLIDE_DURATION = 4500;

function CountUpMetric({ value, start }: { value: number; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();
    let frame = 0;

    const update = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setCount(Math.round(value * easedProgress));

      if (progress < 1) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [start, value]);

  return <>{count}</>;
}

export default function AboutHero({
  onMeetVga,
  onViewLibrary,
}: AboutHeroProps) {
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [isSlideReady, setIsSlideReady] = useState(false);
  const [metricsStarted, setMetricsStarted] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const copyExitRef = useRef<HTMLDivElement | null>(null);
  const metricExitRef = useRef<HTMLDivElement | null>(null);
  const isPaused = useRef(false);
  const experience = experiences[experienceIndex];

  useSectionExit(heroRef, { left: copyExitRef, right: metricExitRef });

  useEffect(() => {
    if (!isSlideReady) return;

    let frame = 0;
    let previousTimestamp: number | null = null;
    let elapsed = 0;
    let cancelled = false;

    const advance = () => {
      setIsSlideReady(false);
      setExperienceIndex((current) => (current + 1) % experiences.length);
    };

    const tick = (timestamp: number) => {
      if (cancelled) return;

      if (previousTimestamp === null) previousTimestamp = timestamp;
      const delta = timestamp - previousTimestamp;
      previousTimestamp = timestamp;

      if (!isPaused.current) {
        elapsed += delta;
        if (elapsed >= SLIDE_DURATION) {
          advance();
          return;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [experienceIndex, isSlideReady]);

  const handleAction = () => {
    if (experience.id === "biography") onMeetVga();
    else onViewLibrary();
  };

  const handleDownloadCv = () => {
    // Reserved for the existing CV download flow.
  };

  const handleSlideEntranceComplete = () => {
    setIsSlideReady(true);
    setMetricsStarted(true);
  };

  return (
    <section ref={heroRef} className="about-hero" aria-labelledby="about-hero-heading">
      <AnimatePresence mode="sync">
        <motion.div
          key={experience.id}
          className="about-hero__image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{
            backgroundImage: `url(${experience.image})`,
            backgroundPosition: experience.imagePosition,
          }}
        />
      </AnimatePresence>

      <div ref={copyExitRef} className="about-hero__exit-left">
        <AnimatePresence mode="wait">
        <motion.div
          key={experience.id}
          className="about-hero__scene"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <Container className="about-hero__content">
            <motion.div
              className="about-hero__copy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.48, ease: [0.4, 0, 0.2, 1] }}
            >
              <h1 id="about-hero-heading" className="about-hero__heading">
                {experience.title.map((line) => <span key={line}>{line}</span>)}
              </h1>
              <p className="about-hero__description">
                {experience.description}
              </p>

              <motion.div
                className="about-hero__actions"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.72, ease: [0.4, 0, 0.2, 1] }}
                onAnimationComplete={handleSlideEntranceComplete}
              >
                <button
                  type="button"
                  className="about-hero__cta group"
                  onClick={handleAction}
                  onMouseEnter={() => { isPaused.current = true; }}
                  onMouseLeave={() => { isPaused.current = false; }}
                >
                  <span>{experience.cta}</span>
                  <span className="about-hero__arrow" aria-hidden="true">→</span>
                  <span className="about-hero__underline" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="about-hero__cta group"
                  onClick={handleDownloadCv}
                  onMouseEnter={() => { isPaused.current = true; }}
                  onMouseLeave={() => { isPaused.current = false; }}
                >
                  <span>Download CV</span>
                  <span className="about-hero__arrow" aria-hidden="true">→</span>
                  <span className="about-hero__underline" aria-hidden="true" />
                </button>
              </motion.div>
            </motion.div>
          </Container>
        </motion.div>
        </AnimatePresence>
      </div>

      <Container className="about-hero__metric-wrap">
        <motion.div
          ref={metricExitRef}
          className="about-hero__metric"
          aria-label="10 plus years building"
          initial={{ opacity: 0 }}
          animate={{ opacity: metricsStarted ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span><CountUpMetric value={10} start={metricsStarted} /><sup>+</sup></span>
          <p>Years building</p>
        </motion.div>
      </Container>
    </section>
  );
}
