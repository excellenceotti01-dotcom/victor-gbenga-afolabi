import Container from "@/components/ui/Container";

type BusinessHeroProps = {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
};

export default function BusinessHero({ headingRef }: BusinessHeroProps) {
  return (
    <header className="business-hero" aria-labelledby="business-heading">
      <Container className="business-hero__container">
        <p className="business-hero__kicker">Victor Gbenga Afolabi</p>
        <h1 ref={headingRef} id="business-heading" className="business-hero__heading">
          Built as an ecosystem.
        </h1>
        <p className="business-hero__copy">
          Companies, platforms, and institutions created to serve evolving African needs and move meaningful work forward.
        </p>
      </Container>
    </header>
  );
}
