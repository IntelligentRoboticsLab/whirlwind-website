"use client";

import { useState, type ReactNode } from "react";

// Copies a piece of text. Styled as a link, since a second action is a link
// (DESIGN.md, section 11). The label stays put; only the icon beside it turns
// into a tick for a moment, and a hidden live region says "Copied".
export default function CopyButton({
  text,
  children,
  ariaLabel,
  className = "",
}: {
  text: string;
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      className={`text-button link ${className}`}
      onClick={copy}
      aria-label={ariaLabel}
    >
      {children}
      <svg
        className="text-button__icon"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {copied ? (
          <path d="M20 6L9 17l-5-5" />
        ) : (
          <>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
          </>
        )}
      </svg>
      <span className="visually-hidden" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
