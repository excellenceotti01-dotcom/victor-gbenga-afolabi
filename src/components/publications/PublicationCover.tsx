import type { Publication } from "./publicationData";

type Props = {
  item: Publication;
  className?: string;
  variant?: "hero" | "card" | "thumbnail";
};

const vgaInsightCovers = {
  hero: "/images/publications/vga-article-cover-hero.png",
  card: "/images/publications/vga-article-cover-card.png",
  thumbnail: "/images/publications/vga-article-cover-thumbnail.png",
} as const;

export default function PublicationCover({ item, className = "", variant = "card" }: Props) {
  const isVgaInsight = item.type === "internal" || item.publisher === "Victor Gbenga Afolabi";

  if (isVgaInsight) {
    return (
      <div
        className={`publication-cover publication-cover--insight publication-cover--${variant} ${className}`}
        aria-label={`VGA Insights cover for ${item.title}`}
        role="img"
      >
        <img src={vgaInsightCovers[variant]} alt="" />
      </div>
    );
  }

  if (item.type === "external" || item.coverKind === "image") {
    return (
      <div className={`publication-cover publication-cover--external ${className}`}>
        <img src={item.thumbnail} alt="" style={{ objectPosition: item.imagePosition }} />
      </div>
    );
  }

  return null;
}
