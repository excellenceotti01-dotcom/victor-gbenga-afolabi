import type { ServiceOption } from "./types";

export const services: ServiceOption[] = [
  {
    id: "keynote",
    icon: "🎤",
    title: "Keynote Speaking",
    description:
      "Conferences, universities, leadership summits and corporate events.",
    engagementTypes: [
      "Corporate Conference",
      "University Event",
      "Leadership Summit",
      "Company Retreat",
      "Panel Discussion",
      "Other",
    ],
  },
  {
    id: "consulting",
    icon: "📈",
    title: "Strategic Consulting",
    description:
      "Growth strategy, executive advisory and organizational transformation.",
    engagementTypes: [
      "Brand Strategy",
      "Growth Strategy",
      "Executive Advisory",
      "Leadership Consulting",
      "Innovation Workshop",
      "Other",
    ],
  },
  {
    id: "workshops",
    icon: "🧠",
    title: "Workshops",
    description:
      "Interactive learning experiences designed for teams and organizations.",
    engagementTypes: [
      "Leadership Workshop",
      "Executive Training",
      "Team Development",
      "Masterclass",
      "Corporate Training",
      "Other",
    ],
  },
  {
    id: "media",
    icon: "🎙",
    title: "Media & Interviews",
    description:
      "Podcasts, television, panels and editorial conversations.",
    engagementTypes: [
      "Podcast",
      "Television Interview",
      "Panel Discussion",
      "Editorial Feature",
      "Radio Interview",
      "Other",
    ],
  },
];