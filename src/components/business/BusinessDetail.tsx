import { useLayoutEffect, useMemo, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "@/components/ui/Container";

import { getBusinessBySlug } from "./businessUtils";
import type { BusinessRecord } from "./types";

gsap.registerPlugin(ScrollTrigger);

type BusinessDetailProps = {
  business: BusinessRecord;
};

type BusinessDetailStyle = CSSProperties & {
  "--business-detail-image": string;
};

export default function BusinessDetail({ business }: BusinessDetailProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const heroBackgroundRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const statementRef = useRef<HTMLParagraphElement | null>(null);
  const relatedBusinesses = useMemo(
    () => business.relatedBusinessSlugs
      .map((slug) => getBusinessBySlug(slug))
      .filter((record): record is BusinessRecord => Boolean(record)),
    [business.relatedBusinessSlugs],
  );
  const style = {
    "--business-detail-image": `url("${business.heroImage}")`,
  } as BusinessDetailStyle;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const previousTitle = document.title;
    document.title = `${business.name} | Victor Gbenga Afolabi`;

    const navigationRoot = document.documentElement;
    const previousState = navigationRoot.getAttribute("data-business-navigation");
    const previousText = navigationRoot.style.getPropertyValue("--business-navigation-text");
    const previousBrand = navigationRoot.style.getPropertyValue("--business-navigation-brand");
    const previousBrandHover = navigationRoot.style.getPropertyValue("--business-navigation-brand-hover");
    const isDarkTheme = ["#001B44", "#160304"].includes(business.theme.background);

    navigationRoot.setAttribute("data-business-navigation", isDarkTheme ? "dark" : "light");
    navigationRoot.style.setProperty("--business-navigation-text", business.theme.text);
    navigationRoot.style.setProperty("--business-navigation-brand", business.theme.brand);
    navigationRoot.style.setProperty("--business-navigation-brand-hover", business.theme.brandHover);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        document.title = previousTitle;
        if (previousState === null) navigationRoot.removeAttribute("data-business-navigation");
        else navigationRoot.setAttribute("data-business-navigation", previousState);
        navigationRoot.style.setProperty("--business-navigation-text", previousText);
        navigationRoot.style.setProperty("--business-navigation-brand", previousBrand);
        navigationRoot.style.setProperty("--business-navigation-brand-hover", previousBrandHover);
      };
    }

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .fromTo(heroBackgroundRef.current, { autoAlpha: 0, scale: 1.045 }, { autoAlpha: 1, scale: 1, duration: 1.4 })
        .fromTo(logoRef.current, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.75 }, "-=0.8")
        .fromTo(nameRef.current, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.45")
        .fromTo(statementRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.5");

      gsap.utils.toArray<HTMLElement>(".business-detail__reveal").forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 42 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.fromTo(".business-detail__timeline-line", { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".business-detail__timeline",
          start: "top 72%",
          end: "bottom 65%",
          scrub: 0.7,
        },
      });

      gsap.to(".business-detail__origin-image", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: ".business-detail__origin-visual",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, root);

    return () => {
      context.revert();
      document.title = previousTitle;
      if (previousState === null) navigationRoot.removeAttribute("data-business-navigation");
      else navigationRoot.setAttribute("data-business-navigation", previousState);
      navigationRoot.style.setProperty("--business-navigation-text", previousText);
      navigationRoot.style.setProperty("--business-navigation-brand", previousBrand);
      navigationRoot.style.setProperty("--business-navigation-brand-hover", previousBrandHover);
    };
  }, [business]);

  return (
    <article ref={rootRef} className="business-detail" style={style}>
      <section className="business-detail__opening" aria-labelledby="business-detail-title">
        <div ref={heroBackgroundRef} className="business-detail__opening-background" aria-hidden="true" />
        <div className="business-detail__opening-shade" aria-hidden="true" />
        <Container className="business-detail__opening-container">
          <Link className="business-detail__back" to="/business">← Back to ecosystem</Link>
          <div className="business-detail__opening-content">
            {business.logoImage && (
              <img ref={logoRef} className="business-detail__logo" src={business.logoImage} alt={`${business.name} logo`} />
            )}
            <h1 ref={nameRef} id="business-detail-title" className="business-detail__title">{business.name}</h1>
            <p ref={statementRef} className="business-detail__statement">{business.tagline}</p>
          </div>
          <span className="business-detail__scroll-cue" aria-hidden="true">Scroll to enter <i /></span>
        </Container>
      </section>

      <section className="business-detail__origin">
        <Container className="business-detail__origin-grid">
          <div className="business-detail__origin-visual business-detail__reveal">
            <img className="business-detail__origin-image" src={business.selectorImage} alt="" />
          </div>
          <div className="business-detail__origin-copy business-detail__reveal">
            <h2>Built around a reason.</h2>
            {(business.originStory ?? [business.summary]).slice(0, 2).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      {(business.timeline?.length ?? 0) > 0 && (
        <section className="business-detail__journey" aria-labelledby="business-journey-title">
          <Container>
            <header className="business-detail__section-heading business-detail__reveal">
              <p className="business-detail__kicker">The journey</p>
              <h2 id="business-journey-title">Moments that shaped the chapter.</h2>
            </header>
            <div className="business-detail__timeline">
              <span className="business-detail__timeline-line" aria-hidden="true" />
              {business.timeline?.map((milestone) => (
                <article key={`${milestone.period}-${milestone.title}`} className="business-detail__milestone business-detail__reveal">
                  <p>{milestone.period}</p>
                  <h3>{milestone.title}</h3>
                  <span>{milestone.description}</span>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="business-detail__snapshot" aria-labelledby="business-snapshot-title">
        <Container>
          <header className="business-detail__section-heading business-detail__reveal">
            <p className="business-detail__kicker">Business snapshot</p>
            <h2 id="business-snapshot-title">The essential picture.</h2>
          </header>
          <dl className="business-detail__facts">
            {business.snapshot?.map((item) => (
              <div key={item.label} className="business-detail__fact business-detail__reveal">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <dl className="business-detail__metrics business-detail__reveal">
            {business.metrics.slice(0, 4).map((metric) => (
              <div key={metric.label}>
                <dd>{metric.value}</dd>
                <dt>{metric.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {relatedBusinesses.length > 0 && (
        <section className="business-detail__related">
          <Container className="business-detail__related-inner business-detail__reveal">
            <p className="business-detail__kicker">Connected ecosystem</p>
            <div className="business-detail__related-links">
              {relatedBusinesses.map((related) => (
                <Link key={related.slug} to={`/business/${related.slug}`}>
                  <span>{related.name}</span><span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="business-detail__closing">
        <Container className="business-detail__closing-inner business-detail__reveal">
          <p className="business-detail__kicker">Continue the story</p>
          <h2>Explore {business.name}</h2>
          {business.websiteUrl && (
            <a className="business-detail__website-cta" href={business.websiteUrl} target="_blank" rel="noreferrer">
              Visit website <span aria-hidden="true">↗</span>
            </a>
          )}
        </Container>
      </section>
    </article>
  );
}
