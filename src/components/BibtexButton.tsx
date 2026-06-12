"use client";

import { useState } from "react";
import { IPublication, toBibtex } from "@/lib/publications/publication";
import SiteIcon from "./site/SiteIcon";

interface BibtexButtonProps {
  publication: IPublication;
}

export default function BibtexButton({ publication }: BibtexButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const bibtex = toBibtex(publication);
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Failed to copy BibTeX:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`utility-button${copied ? " utility-button--success" : ""}`}
      aria-label="Copy BibTeX citation"
      title="Copy BibTeX citation to clipboard"
      type="button"
    >
      <span>{copied ? "Copied" : "BibTeX"}</span>
      <SiteIcon name={copied ? "check" : "copy"} size={16} />
    </button>
  );
}
