import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from "react";
import { useNavigate } from "react-router-dom";

import ActiveBusinessSummary from "@/components/business/ActiveBusinessSummary";
import BusinessCarousel3D from "@/components/business/BusinessCarousel3D";
import BusinessThemeScope from "@/components/business/BusinessThemeScope";
import { getPrimaryEcosystemBusinesses } from "@/components/business/businessUtils";
import type { BusinessRecord } from "@/components/business/types";
import Container from "@/components/ui/Container";

import "./Business.css";

type BusinessProps = {
  activeBusiness?: BusinessRecord;
};

const primaryEcosystems = getPrimaryEcosystemBusinesses();

export default function Business({ activeBusiness = primaryEcosystems[0] }: BusinessProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [activeSlug, setActiveSlug] = useState(activeBusiness.slug);
  const touchStartY = useRef<number | null>(null);
  const wheelLock = useRef(false);
  const navigate = useNavigate();
  const selectedBusiness = primaryEcosystems.find(
    (business) => business.slug === activeSlug,
  ) ?? activeBusiness;
  const activeIndex = Math.max(primaryEcosystems.findIndex((business) => business.slug === selectedBusiness.slug), 0);

  const atmosphereStyle = {
    "--business-image": `url("${selectedBusiness.heroImage}")`,
  } as CSSProperties;

  const selectIndex = useCallback((index: number) => {
    const nextBusiness = primaryEcosystems[index];
    if (nextBusiness) setActiveSlug(nextBusiness.slug);
  }, []);

  const moveBy = useCallback((direction: number) => {
    selectIndex(Math.max(0, Math.min(primaryEcosystems.length - 1, activeIndex + direction)));
  }, [activeIndex, selectIndex]);

  useLayoutEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflowY;
    const previousBodyOverflow = document.body.style.overflowY;
    const isLastBusiness = activeIndex === primaryEcosystems.length - 1;

    if (!isLastBusiness) {
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    window.dispatchEvent(new CustomEvent("business-carousel-scroll-lock", {
      detail: { locked: !isLastBusiness },
    }));

    return () => {
      document.documentElement.style.overflowY = previousHtmlOverflow;
      document.body.style.overflowY = previousBodyOverflow;
      window.dispatchEvent(new CustomEvent("business-carousel-scroll-lock", {
        detail: { locked: false },
      }));
    };
  }, [activeIndex]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousState = root.getAttribute("data-business-navigation");
    const previousText = root.style.getPropertyValue("--business-navigation-text");
    const previousBrand = root.style.getPropertyValue("--business-navigation-brand");
    const previousBrandHover = root.style.getPropertyValue("--business-navigation-brand-hover");
    const isDarkTheme = ["#001B44", "#160304"].includes(selectedBusiness.theme.background);

    root.setAttribute("data-business-navigation", isDarkTheme ? "dark" : "light");
    root.style.setProperty("--business-navigation-text", selectedBusiness.theme.text);
    root.style.setProperty("--business-navigation-brand", selectedBusiness.theme.brand);
    root.style.setProperty("--business-navigation-brand-hover", selectedBusiness.theme.brandHover);

    return () => {
      if (previousState === null) root.removeAttribute("data-business-navigation");
      else root.setAttribute("data-business-navigation", previousState);
      root.style.setProperty("--business-navigation-text", previousText);
      root.style.setProperty("--business-navigation-brand", previousBrand);
      root.style.setProperty("--business-navigation-brand-hover", previousBrandHover);
    };
  }, [selectedBusiness.theme]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const section = sectionRef.current;
      if (!section || !section.contains(event.target as Node)) return;
      if (event.ctrlKey || Math.abs(event.deltaY) < 6) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const isLastBusiness = activeIndex === primaryEcosystems.length - 1;
      const shouldHoldScene = !isLastBusiness || direction < 0;

      if (shouldHoldScene) event.preventDefault();
      if (wheelLock.current || !shouldHoldScene) return;

      moveBy(direction);
      wheelLock.current = true;
      window.setTimeout(() => { wheelLock.current = false; }, 900);
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", handleWheel, { capture: true });
  }, [moveBy]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowRight" && event.key !== "ArrowUp" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    moveBy(event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startY = touchStartY.current;
    const endY = event.changedTouches[0]?.clientY;
    touchStartY.current = null;
    if (startY === null || endY === undefined || Math.abs(startY - endY) < 44) return;
    moveBy(startY > endY ? 1 : -1);
  };

  return (
    <BusinessThemeScope theme={selectedBusiness.theme}>
      <section
        ref={sectionRef}
        id="business"
        className={`business-page${activeIndex < primaryEcosystems.length - 1 ? " business-page--locked" : ""}`}
        style={atmosphereStyle}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="business-page__atmosphere" aria-hidden="true" />
        <BusinessCarousel3D
          businesses={primaryEcosystems}
          activeIndex={activeIndex}
          onSelect={selectIndex}
          onActivate={(business) => navigate(`/business/${business.slug}`)}
        />
        <Container className="business-page__container">
          <div className="business-page__experience">
            <ActiveBusinessSummary business={selectedBusiness} headingRef={headingRef} showCategory={false} />
          </div>
        </Container>
      </section>
    </BusinessThemeScope>
  );
}
