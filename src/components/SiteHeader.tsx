"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/publications", label: "Publications" },
  { href: "/socials", label: "Socials" },
  { href: "/sponsors", label: "Sponsors" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", open);
    return () => {
      document.body.classList.remove("mobile-nav-open");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header ${open ? "site-header--open" : ""}`}>
      <div className="container nav">
        <Link
          href="/"
          className="brand"
          aria-label="Team whIRLwind home"
          onClick={closeMenu}
        >
          <Image
            src="/logo_light.svg"
            width={240}
            height={80}
            alt="WhIRLwind logo"
            className="logo"
            priority
          />
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={toggleMenu}
        >
          <span className="nav-toggle__icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="primary-navigation"
          aria-label="Primary"
          className="nav-list-container"
        >
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link" onClick={closeMenu}>
                  <span aria-hidden="true" className="nav-link__spark" />
                  <span aria-hidden="true" className="nav-link__backdrop" />
                  <span className="nav-link__label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="nav-link nav-link--cta nav-link--cta-mobile"
            aria-label="Get in touch"
            onClick={closeMenu}
          >
            <span aria-hidden="true" className="nav-link__spark" />
            <span aria-hidden="true" className="nav-link__backdrop" />
            <span className="nav-link__label">Get in touch</span>
          </Link>
        </nav>

        <Link
          href="/contact"
          className="nav-link nav-link--cta nav-link--cta-desktop"
          aria-label="Get in touch"
        >
          <span aria-hidden="true" className="nav-link__spark" />
          <span aria-hidden="true" className="nav-link__backdrop" />
          <span className="nav-link__label">Get in touch</span>
        </Link>
      </div>
    </header>
  );
}
