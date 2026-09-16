import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

type NavbarProps = {
  onBookClick?: () => void;
};

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Business", path: "/business" },
  { name: "Media", path: "/media" },
  { name: "Publications", path: "/publications" },
];

export default function Navbar({
  onBookClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateNavigation = () => setIsScrolled(window.scrollY > 24);

    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    return () => window.removeEventListener("scroll", updateNavigation);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeMenuAndBook = () => {
    setIsOpen(false);
    onBookClick?.();
  };

  return (
    <header data-site-navbar className="fixed inset-x-0 top-0 z-1000 pt-4 sm:top-2 sm:pt-4">
      <Container>
        <nav
          aria-label="Primary navigation"
          className={`relative flex min-h-16 items-center justify-between rounded-full border bg-white/[0.10] px-5 backdrop-blur-[20px] backdrop-saturate-[145%] shadow-[0_0.45rem_1.5rem_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.12)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-white/[0.16] hover:bg-white/[0.12] sm:px-8 ${
            isScrolled || isOpen
              ? "border-white/[0.16] bg-white/[0.12]"
              : "border-white/[0.13]"
          }`}
        >
          {/* Logo */}

          <NavLink
            to="/"
            className="text-xl font-semibold tracking-[0.25em] text-(--color-gold)"
          >
            VGA
          </NavLink>

          {/* Navigation */}

          <div className="hidden items-center gap-7 lg:flex xl:gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm tracking-[0.08em] transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/72 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* CTA */}

          <div className="hidden lg:block">
            <Button onClick={onBookClick}>Book VGA</Button>
          </div>

          <button
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none lg:hidden"
          >
            {isOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </nav>

        <div
          id="mobile-navigation"
          className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 lg:hidden ${
            isOpen ? "mt-3 max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-[var(--radius-lg)] border border-white/10 bg-[#090909]/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base tracking-[0.06em] transition-colors ${
                      isActive ? "bg-white/8 text-white" : "text-white/70 hover:bg-white/6 hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            <Button className="mt-5 w-full" onClick={closeMenuAndBook}>Book VGA</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
