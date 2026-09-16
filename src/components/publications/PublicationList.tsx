import PublicationShowcase from "./PublicationShowcase";
import type { Publication } from "./publicationData";

type Props = {
  items: Publication[];
};

export default function PublicationList({
  items,
}: Props) {
  const insightItems = items.filter((item) => item.type === "internal");
  const coverageItems = items.filter((item) => item.type === "external");

  return (
    <section
      className="publication-list"
      aria-label="Latest publications"
    >
      <PublicationShowcase
        sectionId="insights"
        title="VGA Insights"
        description="Original thinking on leadership, products, technology and building enduring institutions."
        items={insightItems}
      />

      <PublicationShowcase
        sectionId="media-coverage"
        title="Media Coverage"
        description="Selected conversations, interviews and stories featuring Victor Gbenga Afolabi across the media landscape."
        items={coverageItems}
      />
    </section>
  );
}
