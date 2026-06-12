"use client";

import { IPublication } from "@/lib/publications/publication";
import SiteIcon from "./site/SiteIcon";

interface PdfButtonProps {
  publication: IPublication;
}

export default function PdfButton({ publication }: PdfButtonProps) {
  const handleDownload = () => {
    // Open the PDF in a new tab
    window.open(publication.file, "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      className="utility-button"
      aria-label="Open PDF"
      title="Open PDF"
      type="button"
    >
      <span>PDF</span>
      <SiteIcon name="download" size={16} />
    </button>
  );
}
