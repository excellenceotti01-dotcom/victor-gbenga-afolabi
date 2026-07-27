import type { FC } from "react";
import { motion } from "framer-motion";

type ContentProps = {
  chapter: string;
  title: string[];
  description: string;
  cta: string;
  onPause?: () => void;
  onResume?: () => void;
};

const Content: FC<ContentProps> = ({
  chapter,
  title,
  description,
  cta,
  onPause,
  onResume,
}) => {
  return (
    <div
      className="
        absolute
        inset-0
        z-20
        flex
        items-center
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-8
          md:px-16
        "
      >
        <div 
        className="max-w-[560px]"
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        >

          {/* Chapter */}

          <motion.p
  key={`chapter-${chapter}`}
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.9,
    ease: [0.4, 0, 0.2, 1],
  }}
  className="
    mb-8
    text-sm
    uppercase
    tracking-[0.45em]
    text-[var(--color-gold)]
  "
>
  {chapter}
</motion.p>
          {/* Headline */}

          <motion.h2
  key={`title-${title.join("-")}`}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1.0,
    delay: 0.12,
    ease: [0.4, 0, 0.2, 1],
  }}
  className="
    mb-10
    text-5xl
    md:text-7xl
    font-light
    leading-[0.95]
    tracking-[-0.04em]
    text-white
  "
>
  {title.map((line) => (
    <span
      key={line}
      className="block"
    >
      {line}
    </span>
  ))}
</motion.h2>

          {/* Description */}

          <motion.div
  key={`description-${description}`}
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.9,
    delay: 0.22,
    ease: [0.4, 0, 0.2, 1],
  }}
  className="
    mb-12
    flex
    min-h-[96px]
    max-w-[480px]
    items-start
  "
>
  <p
    className="
      text-lg
      leading-8
      text-white/80
    "
  >
    {description}
  </p>
</motion.div>

          {/* CTA */}

          <motion.button
  key={`cta-${cta}`}
  initial={{ opacity: 0, y: 14 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.85,
    delay: 0.32,
    ease: [0.4, 0, 0.2, 1],
  }}
  className="
    group
    inline-flex
    flex-col
    items-start
  "
>
  <div
    className="
      flex
      items-center
      gap-3
    "
  >
    <span
      className="
        uppercase
        tracking-[0.25em]
        text-white
      "
    >
      {cta}
    </span>

    <span
      className="
        transition-transform
        duration-300
        group-hover:translate-x-2
      "
    >
      →
    </span>
  </div>

  <span
    className="
      mt-2
      h-px
      w-0
      bg-white
      transition-all
      duration-300
      group-hover:w-full
    "
  />
</motion.button>

        </div>
      </div>
    </div>
  );
};

export default Content;