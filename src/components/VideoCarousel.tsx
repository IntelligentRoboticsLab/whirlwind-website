"use client";

import type { StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type Clip = {
  title: string;
  poster: StaticImageData;
  src: string; // under /public
};

// the carousels on a page share one signal: while any player dialog is open,
// every preview pauses
const DIALOG_EVENT = "project-video-dialog";

// A row of muted, looping previews that scrolls sideways, with arrows beside
// the heading and the arrow keys to browse. Only previews on screen play, none
// under prefers-reduced-motion. Choosing a clip opens it at full size in a
// dialog with sound and controls; Escape, the Close link or a click outside
// close it, and focus returns to the preview. `head` is the heading (and its
// subcaption) the arrows sit beside.
export default function VideoCarousel({
  label,
  clips,
  head,
}: {
  label: string;
  clips: Clip[];
  head: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const visible = useRef(new Set<HTMLVideoElement>());
  const [active, setActive] = useState<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // play the visible previews, pause the rest; nothing plays while a dialog is
  // open, the tab is hidden or the visitor asked for less motion
  const playback = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dialogOpen = document.querySelector(".video-dialog[open]") !== null;
    cards.current.forEach((card) => {
      const video = card?.querySelector("video");
      if (!video) return;
      if (visible.current.has(video) && !reduced && !dialogOpen && !document.hidden) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // observe the button, not the video: a cropped video never reaches the threshold
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video");
          if (!video) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) visible.current.add(video);
          else visible.current.delete(video);
        });
        playback();
      },
      { threshold: [0, 0.5] },
    );
    cards.current.forEach((card) => card && observer.observe(card));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.addEventListener("change", playback);
    document.addEventListener("visibilitychange", playback);
    window.addEventListener(DIALOG_EVENT, playback);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", playback);
      document.removeEventListener("visibilitychange", playback);
      window.removeEventListener(DIALOG_EVENT, playback);
    };
  }, [playback]);

  // the arrows switch off at either end
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft < 3);
      setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 3);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, []);

  const positions = () => {
    const first = cards.current[0]?.offsetLeft ?? 0;
    return cards.current.map((card) => (card?.offsetLeft ?? 0) - first);
  };
  const activeIndex = () => {
    const el = track.current;
    if (!el) return 0;
    return positions().reduce(
      (best, value, i, list) =>
        Math.abs(value - el.scrollLeft) < Math.abs(list[best] - el.scrollLeft) ? i : best,
      0,
    );
  };
  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = Math.max(0, Math.min(i, clips.length - 1));
    el.scrollTo({ left: positions()[target], behavior: reduced ? "instant" : "smooth" });
  };

  // the dialog follows `active`, as the photo lightbox does
  useEffect(() => {
    const d = dialog.current;
    const v = player.current;
    if (!d || !v) return;
    if (active !== null && !d.open) {
      v.src = clips[active].src;
      v.muted = false;
      d.showModal();
      window.dispatchEvent(new Event(DIALOG_EVENT));
      v.play().catch(() => {});
    }
    if (active === null && d.open) d.close();
  }, [active, clips]);

  const onClose = () => {
    const v = player.current;
    if (v) {
      v.pause();
      v.removeAttribute("src");
      v.load();
    }
    setActive(null);
    window.dispatchEvent(new Event(DIALOG_EVENT));
    opener.current?.focus({ preventScroll: true });
  };

  const arrow = (direction: "previous" | "next") => (
    <button
      type="button"
      className="carousel__arrow"
      aria-label={direction === "previous" ? "Previous clips" : "Next clips"}
      disabled={direction === "previous" ? atStart : atEnd}
      onClick={() => go(activeIndex() + (direction === "previous" ? -1 : 1))}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        {direction === "previous" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );

  return (
    <>
      <div className="carousel-block">
        <div className="carousel-head">
          {/* the heading arrives from the server page; as the one child of its own
              element it is not a list item, so React asks for no key */}
          <div className="carousel-head__text">{head}</div>
          <div className="carousel__arrows">
            {arrow("previous")}
            {arrow("next")}
          </div>
        </div>
        <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
          <div
            ref={track}
            className="carousel__track"
            tabIndex={0}
            aria-label="Video clips; use the left and right arrow keys to browse"
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return;
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                go(activeIndex() + (e.key === "ArrowRight" ? 1 : -1));
              }
            }}
          >
            {clips.map((clip, i) => (
              <figure key={clip.src} className="carousel__card">
                <button
                  ref={(el) => {
                    cards.current[i] = el;
                  }}
                  type="button"
                  className="carousel__open"
                  aria-label={`Play ${clip.title.toLowerCase()}`}
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setActive(i);
                  }}
                >
                  <video
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={clip.poster.src}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <source src={clip.src} type="video/mp4" />
                  </video>
                </button>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <dialog
        ref={dialog}
        className="lightbox video-dialog"
        aria-label={active !== null ? clips[active].title : "Video"}
        onClose={onClose}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
      >
        <div className="lightbox__inner">
          {/* the player stays mounted so its src can be set before the dialog opens */}
          <video
            ref={player}
            className="lightbox__video"
            controls
            playsInline
            preload="none"
          />
          {/* no title under the clip; the dialog's aria-label carries it */}
          <div className="lightbox__bar lightbox__bar--end">
            <div className="lightbox__actions t-body">
              <button type="button" className="text-button link" onClick={() => setActive(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
