import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionExitTargets = {
  left?: RefObject<HTMLElement | null>;
  right?: RefObject<HTMLElement | null>;
};

export default function useSectionExit(
  sectionRef: RefObject<HTMLElement | null>,
  { left, right }: SectionExitTargets,
) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftTarget = left?.current;
    const rightTarget = right?.current;

    if (!section || (!leftTarget && !rightTarget)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "bottom bottom",
          end: "bottom 10%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      if (leftTarget) {
        timeline.to(leftTarget, { x: -80, autoAlpha: 0.35, duration: 1 }, 0);
      }

      if (rightTarget) {
        timeline.to(rightTarget, { x: 80, autoAlpha: 0.35, duration: 1 }, 0);
      }
    }, section);

    return () => context.revert();
  }, [left, right, sectionRef]);
}
