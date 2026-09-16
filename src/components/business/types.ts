export type BusinessTheme = {
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  brand: string;
  brandHover: string;
  accent: string;
  atmosphere: string;
  inactiveDot: string;
};

export type BusinessMetric = {
  label: string;
  value: string;
};

export type BusinessCategory =
  | "holding-company"
  | "technology"
  | "healthcare"
  | "financial-services"
  | "telecommunications"
  | "data-platform"
  | "marketing-and-communications"
  | "innovation-ecosystem"
  | "industry-initiative";

export type BusinessStorySection = {
  id: string;
  heading: string;
  body: string[];
  image?: string;
};

export type BusinessTimelineMilestone = {
  period: string;
  title: string;
  description: string;
};

export type BusinessSnapshotItem = {
  label: string;
  value: string;
};

export type BusinessRecord = {
  id: string;
  slug: string;
  name: string;
  category: BusinessCategory;
  isPrimaryEcosystem: boolean;
  parentBusinessSlug?: string;
  tagline: string;
  summary: string;
  logoImage?: string;
  selectorImage: string;
  heroImage: string;
  websiteUrl?: string;
  founder?: string;
  foundedYear?: string;
  originStory?: string[];
  timeline?: BusinessTimelineMilestone[];
  snapshot?: BusinessSnapshotItem[];
  theme: BusinessTheme;
  metrics: BusinessMetric[];
  storySections: BusinessStorySection[];
  relatedBusinessSlugs: string[];
};
