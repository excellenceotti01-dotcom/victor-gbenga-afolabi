export type BiographyChapter = {
  id: string;
  title: string;
  subtitle?: string;
  introduction: string;
  image: string;
  content: string[];
  cta: {
    label: string;
    to?: string;
  };
};

export const biographyChapters: BiographyChapter[] = [
  {
    id: "the-beginning",
    title: "Origins",
    subtitle: "Chapter One",
    introduction: "The first principles that made building feel inevitable.",
    image: "/images/about/vga-portrait.jpg",
    content: [
      "Every meaningful body of work begins with an early conviction: that the world can be made more useful, more generous, and more possible through deliberate action.",
      "This chapter follows the early life, first principles, and entrepreneurial experiences that shaped Victor Gbenga Afolabi's approach to building.",
    ],
    cta: { label: "View CV" },
  },
  {
    id: "building-companies",
    title: "The Journey",
    subtitle: "Chapter Two",
    introduction: "Ideas becoming enduring platforms through deliberate work.",
    image: "/images/about/business.jpg",
    content: [
      "Building companies is a practice of turning conviction into systems that can serve people at scale. Each venture begins with a real problem and the discipline to stay with it.",
      "This chapter explores the companies, partnerships, leadership lessons, and growth decisions that transformed ideas into enduring platforms.",
    ],
    cta: { label: "Explore the Companies", to: "/business" },
  },
  {
    id: "leadership",
    title: "The Legacy",
    subtitle: "Chapter Three",
    introduction: "A legacy still being created through people, platforms, and possibility.",
    image: "/images/about/library.jpg",
    content: [
      "The work continues through present impact, ecosystem building, and a belief that mentorship creates more room for the next generation of builders.",
      "This chapter gathers the vision, communities, and principles shaping a legacy that is still being written.",
    ],
    cta: { label: "See What's Next", to: "/media" },
  },
];
