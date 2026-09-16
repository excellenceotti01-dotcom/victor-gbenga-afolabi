export type InMotionEvent = {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  image: string;
  imagePosition: string;
  registrationUrl: string;
};

// CMS-ready event records. Add, remove, or replace events here as the calendar evolves.
export const inMotionEvents: InMotionEvent[] = [
  {
    id: "arkhack-5",
    name: "MarkHack 5.0",
    date: "MAY 21, 2026",
    location: "Lagos, Nigeria",
    description: "A working convening for people building, scaling, funding, and governing products across Africa.",
    image: "/images/media/mark-hack.jpg",
    imagePosition: "50% 50%",
    registrationUrl: "https://productdaylagos.com/",
  },
  {
    id: "founder-forum",
    name: "AOT 8.0",
    date: "OCT 14–15, 2026",
    location: "Lagos, Nigeria",
    description: "A two-day gathering for founders, product leaders, and teams shaping the next generation of African technology.",
    image: "/images/media/strategy.jpg",
    imagePosition: "50% 50%",
    registrationUrl: "https://www.inspireafricaconference.com/",
  },
  {
    id: "product-lagos",
    name: "CMO Circle",
    date: "NOV 13–14, 2026",
    location: "Lagos, Nigeria",
    description: "Two days of workshops, conversations, and hands-on sessions for technology builders and communities.",
    image: "/images/media/product-lagos.jpg",
    imagePosition: "50% 50%",
    registrationUrl: "https://tickets.devfestlagos.com/",
  },
];
