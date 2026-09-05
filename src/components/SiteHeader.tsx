"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logoDark from "@/assets/logo_dark_full.svg";
import logoLight from "@/assets/logo_light.svg";

const navLinks = [
  { href: "/team", label: "Team" },
  { href: "/news", label: "News" },
  { href: "/publications", label: "Publications" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`header${open ? " header--open" : ""}`}>
      <div className="container header__inner">
        <Link href="/" className="brand" aria-label="whIRLwind home">
          <Image
            src={logoDark}
            alt="whIRLwind"
            height={54}
            width={150}
            className="only-light"
            priority
          />
          <Image
            src={logoLight}
            alt="whIRLwind"
            height={54}
            width={150}
            className="only-dark"
            priority
          />
        </Link>

        <button
          type="button"
          className="nav__toggle"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {/* three lines that turn into a cross while open; see globals.css, .nav__icon */}
          <svg
            className="nav__icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="3" y="5" width="18" height="2" />
            <rect x="3" y="11" width="18" height="2" />
            <rect x="3" y="17" width="18" height="2" />
          </svg>
        </button>

        <nav id="primary-navigation" className="nav" aria-label="Primary">
          <div className="nav__list">
            {navLinks.map((link) => {
              const current =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
