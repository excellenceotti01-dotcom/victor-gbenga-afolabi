import type { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BackgroundProps = {
  image: string;
  imagePosition: string;
};

const Background: FC<BackgroundProps> = ({
  image,
  imagePosition,
}) => {
  return (
    <AnimatePresence mode="sync">
  <motion.div
    key={image}
    initial={{
      opacity: 0,
      scale: 1.022,
    }}
    animate={{
      opacity: 1,
      scale: 1.03,
    }}
    exit={{
      opacity: 0,
      scale: 1.02,
    }}
    transition={{
      duration: 0.9,
      ease: [0.4, 0, 0.2, 1],
    }}
    className="
      absolute
      inset-0
      bg-cover
      bg-no-repeat
      will-change-transform
    "
    style={{
      backgroundImage: `url(${image})`,
      backgroundPosition: imagePosition,
    }}
  >
    {/* Dark cinematic overlay */}

    <div className="absolute inset-0 bg-black/45" />

    {/* Bottom gradient */}

    <div
      className="
        absolute
        inset-x-0
        bottom-0
        h-56
        bg-linear-to-t
        from-black
        via-black/60
        to-transparent
      "
    />
  </motion.div>
</AnimatePresence>
  );
};

export default Background;