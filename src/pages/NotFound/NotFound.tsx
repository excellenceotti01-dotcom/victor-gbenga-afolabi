import { Link } from "react-router-dom";

import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center bg-(--color-background) py-(--space-section)" aria-labelledby="not-found-heading">
      <Container>
        <p className="text-sm uppercase tracking-[0.38em] text-(--color-gold)">404</p>
        <h1 id="not-found-heading" className="mt-5 max-w-3xl font-[var(--font-heading)] text-6xl leading-[0.9] tracking-[-0.04em] text-white md:text-8xl">
          This page has moved.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-(--color-text-soft)">
          The page you are looking for is unavailable. Return home to explore Victor Gbenga Afolabi&apos;s work and perspective.
        </p>
        <Link to="/" className="mt-9 inline-flex items-center rounded-full bg-(--color-gold) px-6 py-3 text-sm font-medium tracking-wide text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-gold-hover)">
          Return home
        </Link>
      </Container>
    </section>
  );
}
