import Button from "@/components/ui/Button";

import type { BusinessRecord } from "./types";

type ActiveBusinessSummaryProps = {
  business: BusinessRecord;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
  showCategory?: boolean;
};

export default function ActiveBusinessSummary({
  business,
  headingRef,
  showCategory = true,
}: ActiveBusinessSummaryProps) {
  return (
    <section className="active-business" aria-live="polite" aria-labelledby="active-business-heading">
      {showCategory && <p className="active-business__category">{business.category.replaceAll("-", " ")}</p>}
      <div className="active-business__logo" aria-hidden={!business.logoImage}>
        {business.logoImage && (
          <img src={business.logoImage} alt={`${business.name} logo`} />
        )}
      </div>
      <h1 ref={headingRef} id="active-business-heading" className="active-business__name">
        {business.name}
      </h1>
      <p className="active-business__tagline">{business.tagline}</p>
      <p className="active-business__summary">{business.summary}</p>

      {business.metrics.length > 0 && (
        <dl className="active-business__metrics">
          {business.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <Button
        to={`/business/${business.slug}`}
        className="active-business__cta bg-(--business-brand) text-white hover:bg-(--business-brand-hover)"
      >
        Explore {business.name} <span aria-hidden="true">→</span>
      </Button>
    </section>
  );
}
