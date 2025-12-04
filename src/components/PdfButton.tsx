"use client";

import { IPublication } from "@/lib/publications/publication";

interface PdfButtonProps {
  publication: IPublication;
}

export default function PdfButton({ publication }: PdfButtonProps) {
  const handleDownload = () => {
    // Open the PDF in a new tab
    window.open(publication.file, "_blank");
  };

  return (
    <>
      <button
        onClick={handleDownload}
        className="pdf-button flex w-auto flex-row items-center gap-2 rounded-lg px-3 py-1.5 transition-all cursor-pointer"
        aria-label="Download PDF"
        title="Download PDF"
      >
        <span className="font-medium">PDF</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
      <style jsx>{`
        .pdf-button {
          background: transparent;
          color: var(--ink-dim);
          border: none;
        }

        .pdf-button:hover {
          color: var(--ink);
        }
      `}</style>
    </>
  );
}
