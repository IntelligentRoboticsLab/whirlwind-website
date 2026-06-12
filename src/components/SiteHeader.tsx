"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logoLight from "@/assets/logo_light.svg";

import NavToggle from "./NavToggle";
import LinkButton from "./LinkButton";
import NavLinks from "./NavLinks";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
      <div className="site-container nav">
        <Link
          href="/"
          className="brand"
          aria-label="Team whIRLwind home"
          onClick={closeMenu}
        >
          <Image
            src={logoLight}
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
          className={`nav-list-container${open ? " is-open" : ""}`}
        >
          <NavLinks onNavigate={closeMenu} currentPath={pathname} />

          <LinkButton
            href="/contact"
            label="Get in touch"
            variant="primary"
            className="nav-cta nav-cta--mobile"
            ariaLabel="Get in touch"
            onNavigate={closeMenu}
          />
        </nav>

        <LinkButton
          href="/contact"
          label="Get in touch"
          variant="primary"
          className="nav-cta nav-cta--desktop"
          ariaLabel="Get in touch"
        />
      </div>
    </header>
  );
}
