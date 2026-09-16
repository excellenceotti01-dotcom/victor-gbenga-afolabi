export type PublicationType =
  | "internal"
  | "external";

export type Publication = {
  id: string;

  type: PublicationType;

  featured: boolean;

  title: string;

  publisher: string;

  date: string;

  readingTime: string;

  thumbnail: string;

  coverKind?: "placeholder" | "image";

  imagePosition: string;

  excerpt: string;

  url: string;
};

export const publicationItems: Publication[] = [
  {
    id: "designing-ai-products",

    type: "external",

    featured: true,

    title: "Designing AI Products for Africa",

    publisher: "TechCabal",

    date: "May 12, 2026",

    readingTime: "6 min read",

    thumbnail:
      "/images/publications/techcabal-ai.png",

    imagePosition: "68% 0%",

    excerpt:
      "Victor shares practical lessons on building AI products that solve real African problems.",

    url:
      "https://techcabal.com/",
  },

  {
    id: "building-trust",

    type: "internal",

    featured: true,

    title:
      "Building Products That Earn User Trust",

    publisher:
      "Victor Gbenga Afolabi",

    date: "April 20, 2026",

    readingTime: "8 min read",

    thumbnail:
      "/images/publications/building-trust.png",

    imagePosition: "0% 100%",

    excerpt:
      "Trust isn't designed with a single feature—it's built through hundreds of thoughtful decisions.",

    url:
      "/publications/building-trust",
  },

  {
    id: "future-of-design",

    type: "external",

    featured: false,

    title:
      "The Future of Design Leadership",

    publisher:
      "BusinessDay",

    date: "February 2, 2026",

    readingTime: "5 min read",

    thumbnail:
      "/images/publications/businessday.jpeg",

    imagePosition: "60% 0%",

    excerpt:
      "A conversation about product leadership, innovation and the future of African technology.",

    url:
      "https://businessday.ng/",
  },

  {
    id: "better-teams",

    type: "internal",

    featured: false,

    title:
      "How Great Product Teams Communicate",

    publisher:
      "Victor Gbenga Afolabi",

    date: "January 15, 2026",

    readingTime: "7 min read",

    thumbnail:
      "/images/publications/product-teams.png",

    imagePosition: "65% 10%",

    excerpt:
      "Communication is one of the strongest competitive advantages a product team can build.",

    url:
      "/publications/better-teams",
  },
];

export const featuredPublications =
  publicationItems.filter(
    (item) => item.featured
  );
