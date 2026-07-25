import { NavLink } from "react-router-dom";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Business", path: "/business" },
  { name: "Library", path: "/library" },
  { name: "Media", path: "/media" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  return (
    <header className="fixed left-0 top-6 z-1000 w-full">
      <Container>
        <nav className="flex h-18.5 items-center justify-between rounded-full px-8">
          {/* Logo */}

          <NavLink
            to="/"
            className="text-xl font-semibold tracking-[0.25em] text-(--color-gold)"
          >
            VGA
          </NavLink>

          {/* Navigation */}

          <div className="flex items-center gap-10">
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

          <Button to="/book-vga">Book VGA</Button>
        </nav>
      </Container>
    </header>
  );
}