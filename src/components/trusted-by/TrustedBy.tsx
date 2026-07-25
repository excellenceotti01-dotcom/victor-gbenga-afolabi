import { motion } from "framer-motion";

import Container from "../ui/Container";
import logos from "./logos";

export default function TrustedBy() {
  return (
    <section className="relative overflow-hidden bg-black py-16">

      <Container>

        <div className="flex flex-col items-center gap-10">

          {/* Heading */}

          <p
            className="
              text-sm
              font-medium
              uppercase
              tracking-[0.45em]
              text-(--color-gold)
            "
          >
            Trusted By
          </p>

          {/* Marquee */}

          <div className="relative w-full overflow-hidden">

            {/* Left Fade */}

            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-linear-to-r from-black to-transparent" />

            {/* Right Fade */}

            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-linear-to-l from-black to-transparent" />

            <motion.div
              className="flex w-max"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 40,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="
                    flex
                    items-center
                    justify-center
                    px-8
                    lg:px-10
                    shrink-0
                  "
                >
                  <span
                    className="
                      text-[1.65rem]
                      font-light
                      tracking-tight
                      whitespace-nowrap
                      text-white/75
                      transition-opacity
                    "
                  >
                    {logo}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

        </div>

      </Container>

    </section>
  );
}