import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { inMotionEvents } from "@/components/in-motion/events";
import Container from "@/components/ui/Container";

import "./OnTheRadar.css";
import { coverageItems } from "./data";

const SLIDE_DURATION = 5000;

gsap.registerPlugin(ScrollTrigger);

export default function OnTheRadar() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isPaused = useRef(false);
  const elapsed = useRef(0);
  const previousTimestamp = useRef<number | null>(null);
  const lastProgressUpdate = useRef(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (
      !section
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
      || window.matchMedia("(max-width: 1023px)").matches
    ) return;

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

    let animationFrame = 0;
    let cancelled = false;

    const animate = (timestamp: number) => {
      if (cancelled) return;

      if (previousTimestamp.current === null) {
        previousTimestamp.current = timestamp;
      }

      const delta = timestamp - previousTimestamp.current;
      previousTimestamp.current = timestamp;

      if (!isPaused.current) {
        const nextElapsed = elapsed.current + delta;

        if (nextElapsed >= SLIDE_DURATION) {
          const completedSlides = Math.floor(nextElapsed / SLIDE_DURATION);
          elapsed.current = nextElapsed % SLIDE_DURATION;
          lastProgressUpdate.current = timestamp;
          setProgress((elapsed.current / SLIDE_DURATION) * 100);
          setActiveSlide(
            (current) => (current + completedSlides) % inMotionEvents.length,
          );
        } else if (
          timestamp - lastProgressUpdate.current >= 100
        ) {
          elapsed.current = nextElapsed;
          lastProgressUpdate.current = timestamp;
          setProgress((elapsed.current / SLIDE_DURATION) * 100);
        } else {
          elapsed.current = nextElapsed;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView]);

  const event = inMotionEvents[activeSlide];
  const pause = () => {
    isPaused.current = true;
  };
  const resume = () => {
    isPaused.current = false;
  };

  return (
    <section
      ref={sectionRef}
      id="in-motion"
      className="border-y border-white/8 bg-(--color-surface) pb-20 pt-28 sm:pb-24 sm:pt-32 lg:min-h-screen lg:py-0"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <Container className="lg:flex lg:min-h-screen lg:items-center">
        <div className="grid w-full gap-16 lg:translate-y-12 lg:grid-cols-[minmax(0,1.16fr)_minmax(360px,0.84fr)] lg:gap-20 xl:gap-28">
          <div>
            <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-(--color-text) md:text-6xl xl:text-7xl">
              <span className="block whitespace-nowrap">Press. Stages.</span>
              <span className="block whitespace-nowrap">What&apos;s next.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-(--color-text-soft)">
              Where Victor shows up — in print, in rooms, and on stage.
            </p>

            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-7 block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-gold)"
              onPointerEnter={pause}
              onPointerLeave={resume}
            >
              <div className="relative aspect-1.5/1 overflow-hidden bg-black sm:aspect-[1.65/1]">
                <img
                  key={event.image}
                  src={event.image}
                  alt=""
                  className="radar-image-enter h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: event.imagePosition }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 sm:px-8 sm:pb-20">
                  <p className="inline-flex w-fit rounded-full border border-white/16 bg-white/8 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.23em] text-white backdrop-blur-[14px] backdrop-saturate-[130%]">
                    {event.date} <span className="mx-1 text-white/70">·</span> {event.location}
                  </p>
                  <h3 className="mt-3 flex h-[1.92em] items-end overflow-hidden text-3xl font-medium leading-[0.95] tracking-[-0.04em] text-white sm:text-4xl">
                    {event.name}
                  </h3>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-20 flex gap-4 px-6 pb-6 sm:px-8 sm:pb-8">
                  {inMotionEvents.map((_, index) => (
                    <span key={index} className="h-0.5 flex-1 overflow-hidden bg-white/20">
                      <span
                        className="block h-full bg-white transition-[width] duration-100 ease-linear"
                        style={{
                          width: index < activeSlide ? "100%" : index === activeSlide ? `${progress}%` : "0%",
                        }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </div>

          <div className="pt-1 lg:pt-52">
            <p className="border-b border-white/15 pb-4 text-sm uppercase tracking-[0.45em] text-(--color-gold)">
              RECENT COVERAGE
            </p>
            <div>
              {coverageItems.map((item) => (
                <Link
                  key={item.headline}
                  to={item.href}
                  className="group grid grid-cols-[56px_minmax(0,1fr)_auto] gap-x-4 border-b border-white/12 py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-gold) sm:grid-cols-[64px_minmax(0,1fr)_auto]"
                >
                  <img src={item.image} alt="" className="h-14 w-14 object-cover sm:h-16 sm:w-16" />
                  <div className="min-w-0">
                    <p className="text-xs uppercase leading-4 tracking-[0.16em] text-white/55">
                      {item.publication} <span className="text-white/35">·</span> {item.date} <span className="text-white/35">·</span> {item.type}
                    </p>
                    <h3 className="mt-1 text-lg font-medium leading-[1.05] tracking-tight text-(--color-text) sm:text-xl">
                      {item.headline}
                    </h3>
                  </div>
                  <span className="self-center text-lg text-white transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
            <Link to="/media" className="group mt-7 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white">
              SEE ALL COVERAGE <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
