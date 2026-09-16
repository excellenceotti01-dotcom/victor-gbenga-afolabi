import { Link, useParams } from "react-router-dom";

import PublicationCover from "@/components/publications/PublicationCover";
import { publicationItems } from "@/components/publications/publicationData";
import "@/components/publications/Publications.css";

export default function PublicationDetailPage() {
  const { slug } = useParams();
  const item = publicationItems.find((publication) => publication.id === slug && publication.type === "internal");

  if (!item) {
    return (
      <section className="publication-detail publication-detail--missing">
        <h1>Publication not found.</h1>
        <Link to="/publications">Return to Publications →</Link>
      </section>
    );
  }

  return (
    <article className="publication-detail">
      <div className="publication-detail__inner">
        <div className="publication-detail__copy">
          <Link className="publication-detail__back" to="/publications">← Publications</Link>
          <p>VGA Insights</p>
          <h1>{item.title}</h1>
          <p className="publication-detail__byline">By {item.publisher}</p>
          <p className="publication-detail__standfirst">{item.excerpt}</p>
          <p className="publication-detail__status">Full editorial content will be added in the publication phase.</p>
        </div>
        <PublicationCover item={item} variant="hero" className="publication-detail__cover" />
      </div>
    </article>
  );
}
