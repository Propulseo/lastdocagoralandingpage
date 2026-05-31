"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   SectionRoiBento, V2 PRO « Le retour, en grand »
   THEMEABLE : toutes les couleurs passent par les tokens --v2-*
   hérités de .v2p (dark/light/mixte + contrast). Aucune couleur
   en dur. Préfixe CSS « v2roi- ».
   Compteurs animés conservés (useCountUp + useInView, SSR-safe,
   cleanup RAF / IntersectionObserver). Chiffres ILLUSTRATIFS.
   ============================================================ */

/* ── Helper : mouvement réduit (SSR-safe) ── */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type BentoAccent = "teal" | "cobalt" | "neutral";

type BentoMetric = {
  id: string;
  prefix: string;
  to: number;
  suffix: string;
  decimals: number;
  title: string;
  sub: string;
  span: "wide" | "normal";
  accent: BentoAccent;
};

const BENTO_METRICS: BentoMetric[] = [
  {
    id: "b-faltas",
    prefix: "−",
    to: 40,
    suffix: "%",
    decimals: 0,
    title: "de rendez-vous manqués",
    sub: "Rappels « bientôt » qui avertissent le patient avant la consultation.",
    span: "wide",
    accent: "teal",
  },
  {
    id: "b-horas",
    prefix: "",
    to: 8,
    suffix: "h",
    decimals: 0,
    title: "économisées par semaine",
    sub: "Moins d’appels, plus de temps clinique.",
    span: "normal",
    accent: "cobalt",
  },
  {
    id: "b-pacientes",
    prefix: "+",
    to: 30,
    suffix: "%",
    decimals: 0,
    title: "de patients supplémentaires",
    sub: "Visible dans la recherche gratuite.",
    span: "normal",
    accent: "neutral",
  },
  {
    id: "b-especialidades",
    prefix: "",
    to: 16,
    suffix: "",
    decimals: 0,
    title: "spécialités",
    sub: "De la médecine générale à la kinésithérapie, toutes vérifiées.",
    span: "normal",
    accent: "cobalt",
  },
  {
    id: "b-idiomas",
    prefix: "",
    to: 3,
    suffix: "",
    decimals: 0,
    title: "langues",
    sub: "Português, Français, English, sans barrières.",
    span: "normal",
    accent: "teal",
  },
  {
    id: "b-custo",
    prefix: "",
    to: 0,
    suffix: "€",
    decimals: 0,
    title: "pour commencer",
    sub: "Recherche gratuite. Sans carte, sans engagement.",
    span: "wide",
    accent: "teal",
  },
];

/* ── Hook : compteur animé déclenché à l’entrée dans le viewport ── */
function useCountUp(
  to: number,
  decimals: number,
  start: boolean,
  durationMs = 1400,
): string {
  const [value, setValue] = useState<number>(() =>
    prefersReducedMotion() ? to : 0,
  );
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start || prefersReducedMotion()) return;

    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(to * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, durationMs, start]);

  return value.toFixed(decimals);
}

/* ── Hook : observe l’entrée d’un élément dans le viewport ── */
function useInView<T extends HTMLElement>(): {
  ref: React.RefObject<T | null>;
  inView: boolean;
} {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState<boolean>(() => prefersReducedMotion());

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

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

/* ── Sous-composant : cellule bento avec compteur animé ── */
function BentoCell({ metric, delay }: { metric: BentoMetric; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const display = useCountUp(metric.to, metric.decimals, inView);

  return (
    <div
      ref={ref}
      className={`v2roi-cell v2roi-cell--${metric.span} v2roi-cell--${metric.accent} v2roi-reveal`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="v2roi-num">
        <span className="v2roi-num__prefix">{metric.prefix}</span>
        <span className="v2roi-num__value">{display}</span>
        <span className="v2roi-num__suffix">{metric.suffix}</span>
        <span className="v2roi-num__star" aria-hidden="true">
          *
        </span>
      </div>
      <div className="v2roi-cell__title">{metric.title}</div>
      <p className="v2roi-cell__sub">{metric.sub}</p>
    </div>
  );
}

export default function SectionRoiBento() {
  return (
    <section
      className="v2roi-section"
      id="v2roi-numbers"
      aria-labelledby="v2roi-numbers-title"
    >
      <style>{`
        .v2roi-section, .v2roi-section * { box-sizing: border-box; }

        .v2roi-section {
          --v2roi-shell: 1200px;
          --v2roi-radius: 18px;
          --v2roi-mono: ui-monospace, "SF Mono", Menlo, monospace;
          position: relative;
          padding-block: clamp(72px, 10vh, 120px);
          background: var(--v2-bg);
          color: var(--v2-text-body);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          line-height: 1.5;
          overflow: hidden;
        }
        .v2roi-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(55% 50% at 85% 0%, var(--v2-mesh-a), transparent 60%),
            radial-gradient(55% 50% at 10% 100%, var(--v2-mesh-b), transparent 60%);
        }

        .v2roi-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: var(--v2roi-shell);
          margin-inline: auto;
          padding-inline: clamp(16px, 4vw, 24px);
        }

        /* ── Reveal cascade ── */
        @keyframes v2roi-reveal {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2roi-reveal {
          opacity: 0;
          animation: v2roi-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* ── Eyebrow ── */
        .v2roi-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--v2roi-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--v2-eyebrow);
          line-height: 1;
        }
        .v2roi-eyebrow span {
          height: 1px;
          width: 38px;
          background: linear-gradient(90deg, transparent, var(--v2-accent));
        }
        .v2roi-eyebrow span:last-child {
          background: linear-gradient(90deg, var(--v2-accent), transparent);
        }

        /* ── Section head ── */
        .v2roi-sechead {
          max-width: 640px;
          margin: 0 auto 44px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .v2roi-sectitle {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: var(--v2-text);
          margin: 16px 0 0;
          text-transform: none;
        }
        .v2roi-secsub {
          font-size: 16px;
          line-height: 1.6;
          color: var(--v2-text-muted);
          margin: 14px 0 0;
        }

        /* ── BENTO ── */
        .v2roi-bento {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .v2roi-cell {
          position: relative;
          border-radius: var(--v2roi-radius);
          padding: 28px;
          background: var(--v2-surface);
          border: 1px solid var(--v2-border);
          box-shadow: var(--v2-shadow);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          grid-column: span 1;
        }
        .v2roi-cell:hover {
          transform: translateY(-4px);
          box-shadow: var(--v2-shadow-lg);
        }
        .v2roi-cell--wide { grid-column: span 2; }
        .v2roi-cell::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .v2roi-cell--teal::before {
          background: radial-gradient(80% 70% at 100% 0%, var(--v2-mesh-b), transparent 60%);
        }
        .v2roi-cell--cobalt::before {
          background: radial-gradient(80% 70% at 100% 0%, var(--v2-mesh-a), transparent 60%);
        }
        .v2roi-cell--neutral::before {
          background: none;
        }

        .v2roi-num {
          position: relative;
          display: flex;
          align-items: baseline;
          font-weight: 800;
          font-size: clamp(40px, 5vw, 62px);
          line-height: 1;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
          color: var(--v2-text);
        }
        .v2roi-cell--teal .v2roi-num { color: var(--v2-accent-text); }
        .v2roi-cell--cobalt .v2roi-num { color: var(--v2-accent-2); }
        .v2roi-num__prefix { color: inherit; }
        .v2roi-num__suffix { font-size: 0.5em; margin-left: 2px; }
        .v2roi-num__star {
          font-size: 0.32em;
          color: var(--v2-text-muted);
          margin-left: 3px;
          align-self: flex-start;
        }
        .v2roi-cell__title {
          position: relative;
          margin-top: 8px;
          font-size: 16px;
          font-weight: 700;
          color: var(--v2-text);
          text-transform: none;
        }
        .v2roi-cell__sub {
          position: relative;
          margin: 8px 0 0;
          font-size: 14px;
          line-height: 1.5;
          color: var(--v2-text-muted);
        }

        /* ── Footnote ── */
        .v2roi-footnote {
          margin-top: 28px;
          font-size: 12px;
          line-height: 1.5;
          color: var(--v2-text-muted);
          max-width: 760px;
        }
        .v2roi-footnote b { color: var(--v2-text-body); font-weight: 600; }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .v2roi-bento { grid-template-columns: repeat(2, 1fr); }
          .v2roi-cell--wide { grid-column: span 2; }
        }
        @media (max-width: 720px) {
          .v2roi-cell { padding: 24px; }
        }
        @media (max-width: 460px) {
          .v2roi-bento { grid-template-columns: 1fr; }
          .v2roi-cell--wide { grid-column: span 1; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .v2roi-section *,
          .v2roi-reveal {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="v2roi-shell">
        <div className="v2roi-sechead">
          <span className="v2roi-eyebrow">
            <span aria-hidden="true" />
            Des chiffres qui parlent
            <span aria-hidden="true" />
          </span>
          <h2 className="v2roi-sectitle" id="v2roi-numbers-title">
            Le retour, en grand.
          </h2>
          <p className="v2roi-secsub">
            Estimations illustratives de ce qu’un agenda organisé peut changer
            dans votre cabinet.
          </p>
        </div>

        <div className="v2roi-bento">
          {BENTO_METRICS.map((m, i) => (
            <BentoCell key={m.id} metric={m} delay={i * 80} />
          ))}
        </div>

        <p className="v2roi-footnote">
          <b>*illustratif.</b> Les valeurs présentées sont des exemples purement
          démonstratifs pour illustrer le potentiel de la plateforme. Elles ne
          constituent en aucun cas une garantie de résultat. La prise de
          rendez-vous en ligne et les rappels automatiques sont en cours de
          développement (« bientôt »).
        </p>
      </div>
    </section>
  );
}
