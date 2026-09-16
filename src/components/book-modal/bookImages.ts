import type { ServiceOption } from "./types";

export type ImagePosition = {
  x: number;
  y: number;
  scale: number;
};

export type BookImageConfig = {
  service: ServiceOption["id"];
  image: string;
  alt: string;
  position: ImagePosition;
};

export const BOOK_IMAGES: Record<
  ServiceOption["id"],
  BookImageConfig
> = {
  keynote: {
    service: "keynote",

    image: "/images/book/keynote.jpg",

    alt: "Victor Gbenga Afolabi delivering a keynote presentation",

    position: {
      x: 50,
      y: 50,
      scale: 1.08,
    },
  },

  consulting: {
    service: "consulting",

    image: "/images/book/consulting.jpg",

    alt: "Victor Gbenga Afolabi in a strategic consulting session",

    position: {
      x: 50,
      y: 50,
      scale: 1.08,
    },
  },

  workshops: {
    service: "workshops",

    image: "/images/book/workshops.jpg",

    alt: "Victor Gbenga Afolabi facilitating a workshop",

    position: {
      x: 50,
      y: 50,
      scale: 1.08,
    },
  },

  media: {
    service: "media",

    image: "/images/book/media.jpg",

    alt: "Victor Gbenga Afolabi during a media interview",

    position: {
      x: 50,
      y: 50,
      scale: 1.08,
    },
  },
};

export const DEFAULT_BOOK_IMAGE =
  BOOK_IMAGES.keynote;