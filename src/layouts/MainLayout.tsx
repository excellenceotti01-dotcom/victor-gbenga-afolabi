import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import BookVGAModal from "@/components/book-modal/BookVGAModal";

export default function MainLayout() {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  const [bookModalOpen, setBookModalOpen] =
    useState(false);

  const scrollToElement = useCallback((target: HTMLElement) => {
    const navbar = document.querySelector<HTMLElement>("[data-site-navbar]");
    const navbarOffset = (navbar?.offsetHeight ?? 74) + 20;
    const triggerId = target.dataset.scrollTriggerId;
    const trigger = triggerId
      ? ScrollTrigger.getById(triggerId)
      : undefined;
    const pinnedStart = trigger?.start;

    lenisRef.current?.scrollTo(pinnedStart ?? target, {
      offset: pinnedStart === undefined ? -navbarOffset : 0,
      duration: 1.15,
    });
  }, []);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let animationFrame = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    lenisRef.current = lenis;

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handlePageScrollLock = (event: Event) => {
      const isLocked = (event as CustomEvent<{ locked: boolean }>).detail.locked;
      if (isLocked) lenisRef.current?.stop();
      else lenisRef.current?.start();
    };

    window.addEventListener("business-carousel-scroll-lock", handlePageScrollLock);
    window.addEventListener("media-wall-scroll-lock", handlePageScrollLock);
    window.addEventListener("book-modal-scroll-lock", handlePageScrollLock);
    return () => {
      window.removeEventListener("business-carousel-scroll-lock", handlePageScrollLock);
      window.removeEventListener("media-wall-scroll-lock", handlePageScrollLock);
      window.removeEventListener("book-modal-scroll-lock", handlePageScrollLock);
    };
  }, []);

  useLayoutEffect(() => {
    ScrollTrigger.refresh();

    const target = location.hash
      ? document.getElementById(location.hash.slice(1))
      : null;

    if (target) {
      scrollToElement(target);
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [location.hash, location.pathname, scrollToElement]);

  const openBookModal = () => {
    setBookModalOpen(true);
  };

  const closeBookModal = () => {
    setBookModalOpen(false);
  };

  return (
    <>
      <Navbar
        onBookClick={openBookModal}
      />

      <main className="site-main-panel">
        <Outlet
          context={{
            scrollTo: (
              target: HTMLElement
            ) => scrollToElement(target),
            openBookModal,
          }}
        />
      </main>

      <Footer
        onBackToTop={() =>
          lenisRef.current?.scrollTo(0)
        }
        onBookClick={openBookModal}
      />

      <BookVGAModal
        open={bookModalOpen}
        onClose={closeBookModal}
      />
    </>
  );
}
