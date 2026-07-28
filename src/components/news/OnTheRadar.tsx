import { useEffect, useRef, useState } from "react";

import Container from "@/components/ui/Container";

import "./OnTheRadar.css";
import { coverageItems, eventSlides } from "./data";

const SLIDE_DURATION = 5000;

export default function OnTheRadar() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const isPaused = useRef(false);
  const elapsed = useRef(0);
  const previousTimestamp = useRef<number | null>(null);

  useEffect(() => {
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
          setProgress((elapsed.current / SLIDE_DURATION) * 100);
          setActiveSlide(
            (current) => (current + completedSlides) % eventSlides.length,
          );
        } else {
          elapsed.current = nextElapsed;
          setProgress((elapsed.current / SLIDE_DURATION) * 100);
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const event = eventSlides[activeSlide];
  const pause = () => {
    isPaused.current = true;
  };
  const resume = () => {
    isPaused.current = false;
  };

  return (
    <section
      className="border-y border-white/8 bg-(--color-surface) pb-20 pt-28 sm:pb-24 sm:pt-32 lg:min-h-screen lg:py-0"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <Container className="lg:flex lg:min-h-screen lg:items-center">
        <div className="grid w-full gap-16 lg:translate-y-12 lg:grid-cols-[minmax(0,1.16fr)_minmax(360px,0.84fr)] lg:gap-20 xl:gap-28">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.45em] text-(--color-gold)">
              ON THE RADAR
            </p>
            <h2 className="text-5xl font-light leading-[0.95] tracking-[-0.04em] text-(--color-text) md:text-6xl xl:text-7xl">
              <span className="block whitespace-nowrap">Press. Stages.</span>
              <span className="block whitespace-nowrap">What&apos;s next.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-(--color-text-soft)">
              Where Victor shows up — in print, in rooms, and on stage.
            </p>

            <a
              href={event.href}
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
                  <p className="text-xs uppercase tracking-[0.25em] text-(--color-gold)">
                    {event.date} <span className="mx-1 text-white/50">·</span> {event.category}
                  </p>
                  <h3 className="mt-2 text-3xl font-light leading-[0.95] tracking-[-0.04em] text-white sm:text-4xl">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.24em] text-white/75">
                    {event.location.toUpperCase()}
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-20 flex gap-4 px-6 pb-6 sm:px-8 sm:pb-8">
                  {eventSlides.map((_, index) => (
                    <span key={index} className="h-0.5 flex-1 overflow-hidden bg-white/20">
                      <span
                        className="block h-full bg-white"
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
                <a
                  key={item.headline}
                  href={item.href}
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
                </a>
              ))}
            </div>
            <a href="/news" className="group mt-7 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white">
              SEE ALL COVERAGE <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
