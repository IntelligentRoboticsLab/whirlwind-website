"use client";

import { useState } from "react";
import { IPublication, toBibtex } from "@/lib/publications/publication";

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
    <>
      <button
        onClick={handleCopy}
        className={`bibtex-button flex w-auto flex-row items-center gap-2 rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
          copied ? "copied" : ""
        }`}
        aria-label="Copy BibTeX citation"
        title="Copy BibTeX citation to clipboard"
      >
        <span className="font-medium">BibTeX</span>
        {!copied ? (
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
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="checkmark"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
      <style jsx>{`
        .bibtex-button {
          background: transparent;
          color: var(--ink-dim);
          border: none;
        }

        .bibtex-button:hover {
          color: var(--ink);
        }

        .bibtex-button.copied {
          background: rgba(34, 197, 94, 0.1);
        }

        .checkmark {
          animation: checkmark 0.3s ease-in-out;
        }

        @keyframes checkmark {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
