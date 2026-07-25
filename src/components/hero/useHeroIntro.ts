import { useEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

type HeroIntroRefs = {
  introRef: RefObject<HTMLDivElement | null>;

  lineOneRef: RefObject<HTMLHeadingElement | null>;
  lineTwoRef: RefObject<HTMLHeadingElement | null>;

  nameRef: RefObject<HTMLHeadingElement | null>;

  founderRef: RefObject<HTMLSpanElement | null>;
  investorRef: RefObject<HTMLSpanElement | null>;
  convenerRef: RefObject<HTMLSpanElement | null>;
};

export default function useHeroIntro({
  lineOneRef,
  lineTwoRef,
  nameRef,
  founderRef,
  investorRef,
  convenerRef,
}: HeroIntroRefs) {
  useEffect(() => {
    if (
      !lineOneRef.current ||
      !lineTwoRef.current ||
      !nameRef.current ||
      !founderRef.current ||
      !investorRef.current ||
      !convenerRef.current
    ) {
      return;
    }

    // Initial states
    gsap.set(lineTwoRef.current, {
      opacity: 0,
      y: 18,
    });

    gsap.set(nameRef.current, {
      opacity: 0,
    });

    gsap.set(
      [
        founderRef.current,
        investorRef.current,
        convenerRef.current,
      ],
      {
        opacity: 0,
        y: 14,
      }
    );

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });

    // Reveal second line
    tl.to(lineTwoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })

      // Hold so both lines can be read
      .to({}, { duration: 1.35 })

      // Dissolve both lines away
      .to(
        [lineOneRef.current, lineTwoRef.current],
        {
          opacity: 0,
          duration: 0.9,
        }
      )

      // Bring Victor in
      .to(
        nameRef.current,
        {
          opacity: 1,
          duration: 0.9,
        },
        "-=0.35"
      )

      // Founder
      .to(
        founderRef.current,
        {
          opacity: 0.28,
          y: 0,
          duration: 0.45,
        },
        "+=0.15"
      )

      // Investor
      .to(investorRef.current, {
        opacity: 0.28,
        y: 0,
        duration: 0.45,
      })

      // Convener
      .to(convenerRef.current, {
        opacity: 0.28,
        y: 0,
        duration: 0.45,
      })

      // Final emphasis
      .to(
        [
          founderRef.current,
          investorRef.current,
          convenerRef.current,
        ],
        {
          opacity: 1,
          duration: 0.45,
        }
      );

    return () => {
      tl.kill();
    };
  }, [
    lineOneRef,
    lineTwoRef,
    nameRef,
    founderRef,
    investorRef,
    convenerRef,
  ]);
}