"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/* ============================================================
   Hooks + item de la barre de métriques du hero élevé.
   Extraits de HeroElevated pour tenir le fichier sous ~200 l.
   Pattern SSR-safe : la valeur initiale = valeur finale (server
   et 1er rendu client identiques), l'animation ne démarre
   qu'après hydratation, et prefers-reduced-motion la coupe.
   ============================================================ */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type HeroMetric = {
  id: string;
  prefix: string;
  to: number;
  suffix: string;
  decimals: number;
  label: string;
};

function useCountUp(
  to: number,
  decimals: number,
  start: boolean,
  durationMs = 1400,
): string {
  // Initialise à la valeur finale : server et 1er rendu client concordent.
  const [value, setValue] = useState<number>(to);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!mounted || !start || prefersReducedMotion()) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(to * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, durationMs, start, mounted]);

  return value.toFixed(decimals);
}

export function useInView<T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  inView: boolean;
} {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function MetricItem({
  metric,
  start,
  delay,
}: {
  metric: HeroMetric;
  start: boolean;
  delay: number;
}) {
  const display = useCountUp(metric.to, metric.decimals, start);

  return (
    <div
      className="hepro__metric hepro-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="hepro__metric-num">
        <span className="hepro__metric-prefix">{metric.prefix}</span>
        <span className="hepro__metric-value">{display}</span>
        <span className="hepro__metric-suffix">{metric.suffix}</span>
      </div>
      <div className="hepro__metric-label">{metric.label}</div>
    </div>
  );
}
