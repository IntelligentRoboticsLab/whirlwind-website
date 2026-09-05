"use client";

import { useEffect, useRef, useState } from "react";

import Artwork from "./Artwork";
import sixseven from "@/assets/artwork/sixseven.png";

const FRAMES = 12; // one cycle of the gesture, in tools/artwork/sixseven.py
const CYCLES = 3;
const CYCLE_MS = 1000;
const TAPS = 7;
const TAP_GAP_MS = 700; // the longest pause allowed between two taps of the run

// The footer crest, with one secret: seven taps on it in quick succession and
// the K1 appears in the middle of the screen, head to hips, and does the
// six-seven, hands weighing, for three cycles. A sprite strip stepped by CSS;
// under prefers-reduced-motion the first frame stands still for the same time
// instead. Not in DESIGN.md, on purpose.
export default function FooterCrest() {
  const [playing, setPlaying] = useState(false);
  const taps = useRef<number[]>([]);

  const onClick = () => {
    const now = Date.now();
    const last = taps.current.at(-1);
    taps.current = last !== undefined && now - last > TAP_GAP_MS ? [now] : [...taps.current, now];
    if (taps.current.length >= TAPS) {
      taps.current = [];
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setPlaying(false), CYCLES * CYCLE_MS + 150);
    return () => clearTimeout(timer);
  }, [playing]);

  return (
    <>
      {/* the crest: the logo as a solid object, cropped by the page edges (DESIGN.md, section 3) */}
      <div className="crest-hit" onClick={onClick}>
        <Artwork name="mark-3d" className="crest" sizes="26rem" />
      </div>
      {playing ? (
        <span
          className="sixseven"
          aria-hidden="true"
          style={{
            ["--frames" as string]: FRAMES,
            ["--ratio" as string]: sixseven.width / FRAMES / sixseven.height,
            ["--cycle" as string]: `${CYCLE_MS}ms`,
            ["--cycles" as string]: CYCLES,
          }}
        >
          {/* a plain img: the strip must keep its exact pixels and is loaded only on the taps */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sixseven.src} alt="" width={sixseven.width} height={sixseven.height} />
        </span>
      ) : null}
    </>
  );
}
