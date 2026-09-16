import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

import "./Footer.css";

type FooterProps = {
  onBackToTop: () => void;
  onBookClick: () => void;
};

const exploreLinks = [
  { label: "About", to: "/about" },
  { label: "Business", to: "/business" },
  { label: "Library", to: "/about#library" },
  { label: "Media", to: "/media" },
  { label: "Contact", to: "/contact" },
];

const WORDMARK_TEXT = "LET'S TALK";

const connectLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "Twitter / X", href: "https://x.com" },
  { label: "Email", href: "mailto:hello@victorgbengaafolabi.com" },
];

export default function Footer({ onBackToTop, onBookClick }: FooterProps) {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <button type="button" onClick={onBackToTop} className="site-footer-top">
        Back to Top <span aria-hidden="true">↑</span>
      </button>

      <div className="site-footer-word-zone" aria-hidden="true">
        <Container>
          <p className="site-footer-wordmark">
            {WORDMARK_TEXT.split("").map((char, index) => (
              <span key={index} className="site-footer-wordmark-char">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </Container>
      </div>

      <Container className="relative z-10 pb-6 sm:pb-10">
        <div className="site-footer-card w-full">
          <div className="grid gap-12 px-7 py-9 sm:px-10 sm:py-11 lg:grid-cols-[minmax(0,1.7fr)_minmax(150px,0.7fr)_minmax(150px,0.7fr)] lg:gap-16 lg:px-14 lg:py-12">
            <div>
              <p className="text-lg font-medium tracking-[-0.02em] text-white sm:text-xl">
                Victor Gbenga Afolabi
              </p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
                Marketing strategist, convener, and brand builder creating work that moves people, businesses, and culture forward.
              </p>
              <Button onClick={onBookClick} className="mt-7">Book VGA</Button>
            </div>

            <nav aria-label="Explore">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-gold)]">Explore</p>
              <ul className="mt-5 space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.to}>
                    <Link className="text-sm text-white/65 transition-colors duration-200 hover:text-white" to={link.to}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Connect">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-gold)]">Connect</p>
              <ul className="mt-5 space-y-3">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <a className="text-sm text-white/65 transition-colors duration-200 hover:text-white" href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 px-7 py-5 text-xs leading-5 text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
            <p>© 2026 Victor Gbenga Afolabi. All rights reserved.</p>
            <p>
              Design &amp; Development by {" "}
              <a className="transition-colors hover:text-white" href="https://excellenceotti.com" target="_blank" rel="noreferrer">Excellence Otti</a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
