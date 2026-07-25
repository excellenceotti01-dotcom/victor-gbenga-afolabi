import { useRef } from "react";
import Container from "../ui/Container";
import useHeroIntro from "./useHeroIntro";

export default function Hero() {
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

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/videos/hero-placeholder.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <Container className="relative z-10 flex h-full items-center">
        <div className="max-w-262.5">

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
                  font-light
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
                  font-light
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
                font-light
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
            <span ref={founderRef}>
              Founder
            </span>

            <span ref={investorRef}>
              Investor
            </span>

            <span ref={convenerRef}>
              Convener
            </span>
          </div>

        </div>
      </Container>
    </section>
  );
}