import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Background from "./Background";
import Content from "./Content";
import Progress from "./Progress";

import { slides } from "./slides";

gsap.registerPlugin(ScrollTrigger);

const SLIDE_DURATION = 4000;

export default function AboutTeaser() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isPaused = useRef(false);

  const animationFrame = useRef<number | null>(null);
  const previousTimestamp = useRef<number | null>(null);
  const lastProgressUpdate = useRef(0);
  const elapsed = useRef(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) {
      previousTimestamp.current = null;
      return;
    }

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
          lastProgressUpdate.current = timestamp;

          setProgress(0);

          setActiveSlide(
            (prev) => (prev + 1) % slides.length
          );
        } else if (
          timestamp - lastProgressUpdate.current >= 100
        ) {
          lastProgressUpdate.current = timestamp;

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
  }, [isInView]);

  const slide = slides[activeSlide];

  return (
    <section
      ref={sectionRef}
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
        title={slide.title}
        description={slide.description}
        cta={slide.cta}
        onCta={() => navigate(slide.href)}
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
