import PublicationRow from "./PublicationRow";

import type { Publication } from "./publicationData";

type Props = {
  items: Publication[];
};

export default function PublicationList({
  items,
}: Props) {
  const internal = items.filter(
    (item) => item.type === "internal"
  );

  const external = items.filter(
    (item) => item.type === "external"
  );

  return (
    <section
      className="publication-list"
      aria-label="Latest publications"
    >
      <div className="publication-group">
        <p className="publication-group__label">
          Written by Victor
        </p>

        {internal.map((item) => (
          <PublicationRow
            key={item.id}
            item={item}
          />
        ))}
      </div>

      <div className="publication-group">
        <p className="publication-group__label">
          In the Press
        </p>

        {external.map((item) => (
          <PublicationRow
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}