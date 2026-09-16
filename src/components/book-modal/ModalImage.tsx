import { useEffect, useState } from "react";

import type {
  BookImageConfig,
} from "./bookImages";

type Props = {
  config: BookImageConfig;
};

function AnimatedImage({
  config,
}: Props) {
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 140);

    return () =>
      window.clearTimeout(timer);
  }, [config.image]);

  return (
    <div
      className="
        relative
        h-full
        overflow-hidden
        rounded-r-[34px]
        bg-[#070707]
      "
    >
      <img
        src={config.image}
        alt={config.alt}
        loading="eager"
        decoding="async"
        draggable={false}
        className={`
          absolute
          inset-0
          h-full
          w-full
          object-cover
          will-change-transform
          transition-all
          duration-500
          ease-out
          ${visible
            ? "opacity-100"
            : "opacity-0"}
        `}
        style={{
          objectPosition: `${config.position.x}% ${config.position.y}%`,
          transform: `scale(${config.position.scale})`,
        }}
      />

      {/* Divider */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          w-12
          bg-gradient-to-r
          from-[#090909]
          via-[#090909]/65
          to-transparent
        "
      />

      {/* Bottom Gradient */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/45
          via-transparent
          to-transparent
        "
      />

      {/* Top Gradient */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-b
          from-black/18
          via-transparent
          to-transparent
        "
      />
    </div>
  );
}

export default function ModalImage({
  config,
}: Props) {
  return (
    <AnimatedImage
      key={config.image}
      config={config}
    />
  );
}
