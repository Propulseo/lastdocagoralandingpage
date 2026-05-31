"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Options {
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  startDelayMs?: number;
}

/**
 * Trilingual type-and-delete cycle for the hero search placeholder.
 * `index` tracks which phrase is currently showing so callers can sync
 * other UI (e.g. the Verified Record card) to it.
 * Fully reduced-motion safe: returns the first phrase, statically.
 */
export function useTypewriter(phrases: string[], opts: Options = {}) {
  const { typeMs = 55, deleteMs = 28, holdMs = 1500, startDelayMs = 650 } = opts;
  const prefersReduced = useReducedMotion();
  const [text, setText] = useState(phrases[0] ?? "");
  const [index, setIndex] = useState(0);
  const key = phrases.join("|");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    // Reduced motion / no phrases: render statically (text derived below, no setState here).
    if (prefersReduced || phrases.length === 0) return;
    let cancelled = false;
    let i = 0;
    let pos = 0;
    let deleting = false;

    const tick = () => {
      if (cancelled) return;
      const phrase = phrases[i];
      if (!deleting) {
        pos += 1;
        setText(phrase.slice(0, pos));
        if (pos >= phrase.length) {
          deleting = true;
          timer.current = setTimeout(tick, holdMs);
          return;
        }
        timer.current = setTimeout(tick, typeMs);
      } else {
        pos -= 1;
        setText(phrase.slice(0, Math.max(0, pos)));
        if (pos <= 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
          setIndex(i);
          timer.current = setTimeout(tick, 360);
          return;
        }
        timer.current = setTimeout(tick, deleteMs);
      }
    };

    timer.current = setTimeout(tick, startDelayMs);
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, prefersReduced]);

  // In reduced-motion mode the phrase is shown statically (no animation/setState).
  if (prefersReduced || phrases.length === 0) {
    return { text: phrases[0] ?? "", index: 0, prefersReduced };
  }
  return { text, index, prefersReduced };
}
