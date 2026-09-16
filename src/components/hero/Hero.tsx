import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useHeroIntro from "./useHeroIntro";
import heroVideo from "@/assets/videos/hero-placeholder.mp4";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const lineOneRef = useRef<HTMLHeadingElement>(null);
  const lineTwoRef = useRef<HTMLHeadingElement>(null);

  const nameRef = useRef<HTMLHeadingElement>(null);

  const founderRef = useRef<HTMLSpanElement>(null);
  const investorRef = useRef<HTMLSpanElement>(null);
  const convenerRef = useRef<HTMLSpanElement>(null);

  useHeroIntro({
    introRef,
    lineOneRef,
    lineTwoRef,
    nameRef,
    founderRef,
    investorRef,
    convenerRef,
  });

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;

    if (!hero || !content || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      }).to(content, { x: -80, autoAlpha: 0, duration: 1 });
    }, hero);

    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source
          src={heroVideo}
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div ref={contentRef} className="absolute bottom-[clamp(2rem,6vh,5.5rem)] left-[clamp(1.25rem,3.5vw,4rem)] z-10 max-w-262.5">
        <div>

          {/* ===========================
              HEADER AREA
          ============================ */}

          <div className="relative mb-10 h-45 w-237.5">

            {/* Intro Phrase */}

            <div
              ref={introRef}
              className="absolute inset-0"
            >
              <h2
                ref={lineOneRef}
                className="
                  text-[4rem]
                  md:text-[5.2rem]
                  font-medium
                  uppercase
                  tracking-[-0.04em]
                  leading-[0.95]
                  text-(--color-gold)
                  whitespace-nowrap
                "
              >
                Building Businesses
              </h2>

              <h2
                ref={lineTwoRef}
                className="
                  mt-2
                  text-[4rem]
                  md:text-[5.2rem]
                  font-medium
                  uppercase
                  tracking-[-0.04em]
                  leading-[0.95]
                  text-(--color-gold)
                  whitespace-nowrap
                "
              >
                That Builds Africa
              </h2>
            </div>

            {/* Victor */}

            <h1
              ref={nameRef}
              className="
                absolute
                inset-0
                text-[4.2rem]
                md:text-[5.6rem]
                font-medium
                uppercase
                tracking-[-0.04em]
                leading-[0.95]
                text-(--color-gold)
              "
            >
              Victor Gbenga
              <br />
              Afolabi
            </h1>

          </div>

          {/* ===========================
              TITLES
          ============================ */}

          <div className="flex gap-14 uppercase tracking-[0.24em] text-sm text-white">
            <span ref={founderRef}>Founder</span>
            <span ref={investorRef}>Investor</span>
            <span ref={convenerRef}>Convener</span>
          </div>

        </div>
      </div>
    </section>
  );
}
