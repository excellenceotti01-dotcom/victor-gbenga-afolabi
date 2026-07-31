import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let animationFrame = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    lenisRef.current = lenis;

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="site-main-panel">
        <Outlet context={{ scrollTo: (target: HTMLElement) => lenisRef.current?.scrollTo(target) }} />
      </main>

      <Footer onBackToTop={() => lenisRef.current?.scrollTo(0)} />
    </>
  );
}
