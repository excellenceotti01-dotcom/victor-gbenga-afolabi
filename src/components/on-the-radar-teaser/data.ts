export type CoverageItem = {
  image: string;
  publication: string;
  date: string;
  type: string;
  headline: string;
  href: string;
};

export const coverageItems: CoverageItem[] = [
  {
    image: "/images/about/business.jpg",
    publication: "BUSINESS DAY NIGERIA",
    date: "JUNE 2026",
    type: "FEATURE",
    headline: "How Victor Afolabi is reshaping brand strategy across African markets",
    href: "/media",
  },
  {
    image: "/images/about/vga-portrait.jpg",
    publication: "THE ENTREPRENEUR",
    date: "MAY 2026",
    type: "INTERVIEW",
    headline: "Eight ventures, one vision — the story of a serial founder",
    href: "/media",
  },
  {
    image: "/images/about/library.jpg",
    publication: "TECHCABAL",
    date: "APRIL 2026",
    type: "REPORT",
    headline: "CMO Circle is the gathering Nigerian marketing needs right now",
    href: "/media",
  },
  {
    image: "/images/about/business.jpg",
    publication: "NAIRAMETRICS",
    date: "MARCH 2026",
    type: "PROFILE",
    headline: "The quiet architect behind Lagos's biggest marketing events",
    href: "/media",
  },
];
