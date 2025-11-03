"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import NavToggle from "./NavToggle";
import LinkButton from "./LinkButton";
import NavLinks from "./NavLinks";

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
      <div className="nav w-full px-8 py-4 sm:px-10 lg:px-12 xl:mx-auto xl:max-w-[1120px] xl:px-4">
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

        <NavToggle open={open} onToggle={toggleMenu} />

        <nav
          id="primary-navigation"
          aria-label="Primary"
          className="nav-list-container"
        >
          <NavLinks onNavigate={closeMenu} />

          <LinkButton
            href="/contact"
            label="Get in touch"
            className="nav-link--cta nav-link--cta-mobile"
            ariaLabel="Get in touch"
            onNavigate={closeMenu}
          />
        </nav>

        <LinkButton
          href="/contact"
          label="Get in touch"
          className="nav-link--cta nav-link--cta-desktop"
          ariaLabel="Get in touch"
        />
      </div>
    </header>
  );
}
