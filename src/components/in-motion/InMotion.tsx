import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "@/components/ui/Container";

import { inMotionEvents, type InMotionEvent } from "./events";

import "./InMotion.css";

gsap.registerPlugin(ScrollTrigger);

const motionEase = [0.22, 0.61, 0.36, 1] as const;

export default function InMotion() {
  const [activeEvent, setActiveEvent] = useState<InMotionEvent | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const heading = activeEvent?.name ?? "In Motion";

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (
      !section
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
      || window.matchMedia("(max-width: 767px)").matches
    ) return;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const resetActiveEvent = () => setActiveEvent(null);

    window.addEventListener("focus", resetActiveEvent);
    window.addEventListener("pageshow", resetActiveEvent);

    return () => {
      window.removeEventListener("focus", resetActiveEvent);
      window.removeEventListener("pageshow", resetActiveEvent);
    };
  }, []);

  return (
    <section id="in-motion-section-build" className="in-motion" aria-labelledby="in-motion-heading">
      <div ref={sectionRef} className="in-motion__pin">
      <Container className="in-motion__container">
        <div
          className={`in-motion__cards${activeEvent ? " is-focused" : ""}`}
          onMouseLeave={() => setActiveEvent(null)}
        >
          {inMotionEvents.map((event) => {
            const isActive = activeEvent?.id === event.id;

            return (
              <motion.a
                key={event.id}
                className={`in-motion__card${isActive ? " is-active" : ""}`}
                href={event.registrationUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${event.name}`}
                animate={{ flex: isActive ? 2.4 : 1 }}
                transition={{ duration: 0.7, ease: motionEase }}
                onMouseEnter={() => setActiveEvent(event)}
              >
                <img
                  src={event.image}
                  alt=""
                  className="in-motion__image"
                  style={{ objectPosition: event.imagePosition }}
                />
                <div className="in-motion__shade" aria-hidden="true" />
                <div className="in-motion__card-content">
                  <p className="in-motion__meta">{event.date} <span>·</span> {event.location}</p>
                  <h3>{event.name}</h3>
                  <p className="in-motion__description">{event.description}</p>
                  <span className="in-motion__cta">
                      <span>Visit Event</span>
                      <span aria-hidden="true">→</span>
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="in-motion__heading-wrap" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h2
              key={heading}
              id="in-motion-heading"
              className="in-motion__heading"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: motionEase }}
            >
              {heading}
            </motion.h2>
          </AnimatePresence>
        </div>
      </Container>
      </div>
    </section>
  );
}
