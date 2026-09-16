import Container from "../ui/Container";

import PublicationsHero from "./PublicationsHero";
import PublicationList from "./PublicationList";

import {
  publicationItems,
  featuredPublications,
} from "./publicationData";

import "./Publications.css";

export default function Publications() {
  return (
    <section
      id="publications"
      className="publications"
      aria-label="Publications"
    >
      <PublicationsHero
        items={featuredPublications}
      />

      <Container className="publications__archive">
        <PublicationList
          items={publicationItems}
        />
      </Container>
    </section>
  );
}
