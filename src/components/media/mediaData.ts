export type MediaCategory =
  | "all"
  | "speaking"
  | "events"
  | "behind-the-scenes"
  | "offstage"
  | "youtube";

export type MediaType =
  | "image"
  | "video"
  | "youtube";

export type MediaLayout =
  | "feature"
  | "landscape"
  | "portrait"
  | "square";

export type MediaItem = {
  id: string;

  type: MediaType;

  category: Exclude<MediaCategory, "all">;

  featured: boolean;

  layout: MediaLayout;

  title: string;

  theme: string;

  thumbnail: string;

  media?: string;

  youtubeUrl?: string;
};

export const mediaCategories = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "speaking",
    label: "Speaking",
  },
  {
    id: "events",
    label: "Events",
  },
  {
    id: "behind-the-scenes",
    label: "Behind the Scenes",
  },
  {
    id: "offstage",
    label: "Offstage",
  },
  {
    id: "youtube",
    label: "YouTube",
  },
] as const;

export const mediaItems: MediaItem[] = [
  {
    id: "mark-hack",

    type: "image",

    category: "speaking",

    featured: true,

    layout: "feature",

    title: "MARK HACK 2025",

    theme: "Designing AI Products",

    thumbnail: "/images/media/mark-hack.jpg",
  },

  {
    id: "product-lagos",

    type: "image",

    category: "events",

    featured: true,

    layout: "portrait",

    title: "Product Lagos",

    theme: "Building Products People Trust",

    thumbnail: "/images/media/product-lagos.jpg",
  },

  {
    id: "strategy-session",

    type: "image",

    category: "behind-the-scenes",

    featured: true,

    layout: "landscape",

    title: "Strategy Session",

    theme: "Preparing the Next Workshop",

    thumbnail: "/images/media/strategy.jpg",
  },

  {
    id: "family",

    type: "image",

    category: "offstage",

    featured: false,

    layout: "square",

    title: "Offstage",

    theme: "Life Beyond Design",

    thumbnail: "/images/media/offstage.jpg",
  },

  {
    id: "youtube-1",

    type: "youtube",

    category: "youtube",

    featured: true,

    layout: "landscape",

    title: "Building Better Products",

    theme: "Full Conference Talk",

    thumbnail: "/images/media/youtube-1.jpg",

    youtubeUrl: "https://youtube.com/",
  },
];

export const featuredMedia = mediaItems.filter(
  (item) => item.featured
);