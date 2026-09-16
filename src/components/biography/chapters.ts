export type BiographyChapter = {
  id: string;
  title: string;
  subtitle?: string;
  readingHeading: string;
  introduction: string;
  image: string;
  imagePosition: string;
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
    readingHeading: "How It All Started",
    introduction: "The first principles that made building feel inevitable.",
    image: "/images/about/vga-portrait.jpg",
    imagePosition: "68% 0%",
    content: [
      "Every meaningful body of work begins with an early conviction: that the world can be made more useful, more generous, and more possible through deliberate action.",
      "This chapter follows the early life, first principles, and entrepreneurial experiences that shaped Victor Gbenga Afolabi's approach to building.",
    ],
    cta: { label: "View CV" },
  },
  {
    id: "building-companies",
    title: "Legacy",
    subtitle: "Chapter Two",
    readingHeading: "What He Has Built",
    introduction: "Companies, platforms, and institutions built to create enduring impact.",
    image: "/images/about/business.jpg",
    imagePosition: "74% 8%",
    content: [
      "Building companies is a practice of turning conviction into systems that can serve people at scale. Each venture begins with a real problem and the discipline to stay with it.",
      "This chapter explores the companies, partnerships, leadership lessons, and growth decisions that transformed ideas into enduring platforms.",
    ],
    cta: { label: "Explore the Companies", to: "/business" },
  },
  {
    id: "leadership",
    title: "The Journey",
    subtitle: "Chapter Three",
    readingHeading: "The Road Ahead",
    introduction: "Current work, upcoming engagements, and the initiatives still taking shape.",
    image: "/images/about/library.jpg",
    imagePosition: "60% 0%",
    content: [
      "The journey continues through current initiatives, new partnerships, and conversations that bring ideas into rooms where they can become action.",
      "From upcoming engagements to future projects, this chapter follows the work that is unfolding now and the possibilities still ahead.",
    ],
    cta: { label: "Follow The Journey", to: "/#in-motion" },
  },
];
