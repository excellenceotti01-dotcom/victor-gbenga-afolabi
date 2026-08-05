import Container from "../ui/Container";

import PublicationsHero from "./PublicationsHero";
import PublicationsHeader from "./PublicationsHeader";
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
      aria-labelledby="publications-heading"
    >
      <PublicationsHero
        items={featuredPublications}
      />

      <Container>
        <PublicationsHeader />

        <PublicationList
          items={publicationItems}
        />
      </Container>
    </section>
  );
}