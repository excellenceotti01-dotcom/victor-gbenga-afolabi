import type { Publication } from "./publicationData";

type Props = {
  item: Publication;
};

export default function PublicationRow({ item }: Props) {
  const isExternal = item.type === "external";

  return (
    <article className="publication-row">
      <a
        href={item.url}
        className="publication-row__link"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        <div className="publication-row__content">
          <div className="publication-row__main">
            <h3 className="publication-row__title">
              {item.title}
            </h3>

            <p className="publication-row__excerpt">
              {item.excerpt}
            </p>
          </div>

          <div className="publication-row__meta">
            <p className="publication-row__publisher">
              Published by {item.publisher}
            </p>

            <p className="publication-row__details">
              <span>{item.date}</span>
              <span className="publication-row__dot">•</span>
              <span>{item.readingTime}</span>
            </p>
          </div>
        </div>

        <div className="publication-row__action">
          <span className="publication-row__arrow">
            {isExternal ? "↗" : "→"}
          </span>
        </div>
      </a>
    </article>
  );
}