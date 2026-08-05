export type EventSlide = {
  image: string;
  imagePosition: string;
  date: string;
  category: string;
  title: string;
  location: string;
  href: string;
};

export type CoverageItem = {
  image: string;
  publication: string;
  date: string;
  type: string;
  headline: string;
  href: string;
};

// Temporary image selections: replace with dedicated event and coverage assets when available.
export const eventSlides: EventSlide[] = [
  {
    image: "/images/about/business.jpg",
    imagePosition: "74% 15%",
    date: "SEP 08",
    category: "FEATURED EVENT",
    title: "Founder Stories Live",
    location: "Abuja, Nigeria",
    href: "/news/founder-stories-live",
  },
  {
    image: "/images/about/vga-portrait.jpg",
    imagePosition: "68% 0%",
    date: "OCT 16",
    category: "SPEAKING ENGAGEMENT",
    title: "Building Beyond Boundaries",
    location: "Lagos, Nigeria",
    href: "/news/building-beyond-boundaries",
  },
  {
    image: "/images/about/library.jpg",
    imagePosition: "60% 0%",
    date: "NOV 05",
    category: "FOUNDER CONVERSATION",
    title: "The Work That Endures",
    location: "Accra, Ghana",
    href: "/news/the-work-that-endures",
  },
];

export const coverageItems: CoverageItem[] = [
  {
    image: "/images/about/business.jpg",
    publication: "BUSINESS DAY NIGERIA",
    date: "JUNE 2026",
    type: "FEATURE",
    headline: "How Victor Afolabi is reshaping brand strategy across African markets",
    href: "/news/brand-strategy-across-africa",
  },
  {
    image: "/images/about/vga-portrait.jpg",
    publication: "THE ENTREPRENEUR",
    date: "MAY 2026",
    type: "INTERVIEW",
    headline: "Eight ventures, one vision — the story of a serial founder",
    href: "/news/eight-ventures-one-vision",
  },
  {
    image: "/images/about/library.jpg",
    publication: "TECHCABAL",
    date: "APRIL 2026",
    type: "REPORT",
    headline: "CMO Circle is the gathering Nigerian marketing needs right now",
    href: "/news/cmo-circle",
  },
  {
    image: "/images/about/business.jpg",
    publication: "NAIRAMETRICS",
    date: "MARCH 2026",
    type: "PROFILE",
    headline: "The quiet architect behind Lagos's biggest marketing events",
    href: "/news/the-quiet-architect",
  },
];
