"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   Hero2, V2 PRO « Retorno » (centré, panneau large dessous)
   Bloc texte centré + panneau ROI pleine largeur en dessous.
   THEMEABLE : toutes les couleurs passent par les tokens --v2-*
   hérités de .v2p (dark/light/mixte + contrast). Aucune couleur
   dark/light en dur.
   Courbe SVG montante, grain, compteurs animés.
   Tous chiffres ILLUSTRATIFS. Préfixe CSS « v2h2- ».
   ============================================================ */

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type Metric = {
  id: string;
  prefix: string;
  to: number;
  suffix: string;
  decimals: number;
  label: string;
  hint: string;
};

const METRICS: Metric[] = [
  {
    id: "hours",
    prefix: "",
    to: 8,
    suffix: "h",
    decimals: 0,
    label: "gagnées / semaine",
    hint: "moins de temps au téléphone",
  },
  {
    id: "noshow",
    prefix: "−",
    to: 40,
    suffix: "%",
    decimals: 0,
    label: "de rendez-vous manqués",
    hint: "rappels « bientôt »",
  },
  {
    id: "patients",
    prefix: "+",
    to: 30,
    suffix: "%",
    decimals: 0,
    label: "de patients",
    hint: "trouvés via la recherche",
  },
];

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
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, durationMs, start]);

  return value.toFixed(decimals);
}

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

function RoiMetric({ metric, delay }: { metric: Metric; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const display = useCountUp(metric.to, metric.decimals, inView);

  return (
    <div
      ref={ref}
      className="v2h2-metric v2h2-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="v2h2-metric__num">
        <span className="v2h2-metric__prefix">{metric.prefix}</span>
        <span className="v2h2-metric__value">{display}</span>
        <span className="v2h2-metric__suffix">{metric.suffix}</span>
        <span className="v2h2-metric__star" aria-hidden="true">
          *
        </span>
      </div>
      <div className="v2h2-metric__label">{metric.label}</div>
      <div className="v2h2-metric__hint">{metric.hint}</div>
    </div>
  );
}

function ReturnCurve() {
  return (
    <svg
      className="v2h2-curve"
      viewBox="0 0 960 200"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="v2h2grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--v2-accent-2)" stopOpacity="0.45" />
          <stop offset="55%" stopColor="var(--v2-accent-2)" />
          <stop offset="100%" stopColor="var(--v2-accent)" />
        </linearGradient>
        <linearGradient id="v2h2fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--v2-accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--v2-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        className="v2h2-curve__area"
        d="M0,172 C180,170 320,154 460,124 C620,90 760,46 960,16 L960,200 L0,200 Z"
        fill="url(#v2h2fill)"
      />
      <path
        className="v2h2-curve__line"
        d="M0,172 C180,170 320,154 460,124 C620,90 760,46 960,16"
        stroke="url(#v2h2grad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className="v2h2-curve__dot" cx="960" cy="16" r="6" />
    </svg>
  );
}

const BADGES = ["RGPD", "Données hébergées au Portugal", "PT · FR · EN"];

export default function Hero2() {
  return (
    <section className="v2h2-root" aria-labelledby="v2h2-title">
      <style>{`
        .v2h2-root, .v2h2-root * { box-sizing: border-box; }

        .v2h2-root {
          --v2h2-shell: 1140px;
          --v2h2-radius: 24px;
          --v2h2-mono: ui-monospace, "SF Mono", Menlo, monospace;
          position: relative;
          width: 100%;
          padding-block: clamp(72px, 10vh, 120px);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          color: var(--v2-text-body);
          background:
            radial-gradient(120% 70% at 50% -10%, var(--v2-mesh-a) 0%, transparent 55%),
            radial-gradient(90% 60% at 80% 30%, var(--v2-mesh-b) 0%, transparent 50%),
            var(--v2-bg);
          line-height: 1.5;
          overflow: hidden;
        }
        .v2h2-root::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: var(--v2-grain-opacity);
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          color: var(--v2-text);
          background-size: 4px 4px;
        }

        .v2h2-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: var(--v2h2-shell);
          margin-inline: auto;
          padding-inline: clamp(16px, 4vw, 24px);
        }

        .v2h2-intro {
          text-align: center;
          max-width: 760px;
          margin-inline: auto;
        }

        @keyframes v2h2-reveal {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2h2-reveal {
          opacity: 0;
          animation: v2h2-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes v2h2-draw { to { stroke-dashoffset: 0; } }
        @keyframes v2h2-dotpop {
          0%, 60% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .v2h2-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--v2h2-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--v2-eyebrow);
          padding: 8px 14px;
          border-radius: 999px;
          background: var(--v2-surface);
          border: 1px solid var(--v2-border);
          line-height: 1;
        }
        .v2h2-eyebrow i { font-size: 11px; }

        .v2h2-title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(40px, 6vw, 70px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 22px auto 0;
          max-width: 18ch;
          color: var(--v2-text);
        }
        .v2h2-title .v2h2-hl {
          color: var(--v2-accent-text);
        }
        .v2h2-lead {
          font-size: clamp(16px, 1.5vw, 19px);
          line-height: 1.6;
          color: var(--v2-text-body);
          margin: 22px auto 0;
          max-width: 54ch;
        }

        .v2h2-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          margin-top: 32px;
        }
        .v2h2-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          padding: 15px 28px;
          min-height: 52px;
          border-radius: 14px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease, gap 0.2s ease;
          line-height: 1;
        }
        .v2h2-btn:focus-visible {
          outline: 3px solid var(--v2-accent);
          outline-offset: 3px;
        }
        .v2h2-btn--primary {
          color: var(--v2-accent-ink);
          background: var(--v2-accent);
          box-shadow: var(--v2-shadow);
        }
        .v2h2-btn--primary:hover {
          transform: translateY(-2px);
          gap: 14px;
          box-shadow: var(--v2-shadow-lg);
        }
        .v2h2-btn--ghost {
          color: var(--v2-text);
          background: transparent;
          border-color: var(--v2-border);
        }
        .v2h2-btn--ghost:hover {
          transform: translateY(-2px);
          background: var(--v2-surface);
        }

        .v2h2-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin: 26px 0 0;
          padding: 0;
          list-style: none;
        }
        .v2h2-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 600;
          color: var(--v2-text-muted);
          padding: 7px 12px;
          border-radius: 999px;
          background: var(--v2-surface);
          border: 1px solid var(--v2-border);
          line-height: 1;
        }
        .v2h2-badge i { color: var(--v2-accent-text); font-size: 10px; }

        /* ── Panneau large dessous (reste sombre en mixte : voulu) ── */
        .v2h2-panel {
          position: relative;
          margin-top: 52px;
          border-radius: var(--v2h2-radius);
          padding: 32px;
          background: var(--v2-panel-bg);
          border: 1px solid var(--v2-panel-border);
          box-shadow: var(--v2-shadow-lg);
          overflow: hidden;
        }
        .v2h2-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(60% 80% at 95% 0%, var(--v2-mesh-b) 0%, transparent 60%);
          pointer-events: none;
        }
        .v2h2-panel__inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 36px;
          align-items: center;
        }
        .v2h2-panel__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .v2h2-panel__tag {
          font-family: var(--v2h2-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--v2-panel-muted);
        }
        .v2h2-panel__pill {
          font-family: var(--v2h2-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--v2-accent);
          padding: 5px 10px;
          border-radius: 999px;
          background: var(--v2-panel-border);
          border: 1px solid var(--v2-panel-border);
          text-transform: uppercase;
        }
        .v2h2-panel__curve {
          height: 140px;
          margin: 18px 0 8px;
        }
        .v2h2-curve { width: 100%; height: 100%; display: block; }
        .v2h2-curve__line {
          stroke-dasharray: 1300;
          stroke-dashoffset: 1300;
          animation: v2h2-draw 2s ease 0.4s forwards;
        }
        .v2h2-curve__dot {
          fill: var(--v2-accent);
          transform-origin: 960px 16px;
          transform: scale(0);
          opacity: 0;
          animation: v2h2-dotpop 0.6s ease 2.3s forwards;
        }
        .v2h2-panel__foot {
          margin-top: 14px;
          font-size: 11px;
          color: var(--v2-panel-muted);
          font-family: var(--v2h2-mono);
        }
        .v2h2-panel__metrics {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        .v2h2-metric {
          padding: 18px 18px;
          border-radius: 16px;
          background: var(--v2-panel-border);
          border: 1px solid var(--v2-panel-border);
          display: grid;
          grid-template-columns: auto 1fr;
          column-gap: 16px;
          align-items: center;
        }
        .v2h2-metric__num {
          grid-row: span 2;
          display: flex;
          align-items: baseline;
          font-weight: 800;
          font-size: clamp(30px, 4vw, 44px);
          color: var(--v2-panel-text);
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
          letter-spacing: -0.02em;
          line-height: 1;
          min-width: 92px;
        }
        .v2h2-metric__prefix { color: var(--v2-accent); }
        .v2h2-metric__suffix { font-size: 0.6em; color: var(--v2-accent); margin-left: 1px; }
        .v2h2-metric__star { font-size: 0.5em; color: var(--v2-panel-muted); margin-left: 2px; }
        .v2h2-metric__label {
          font-size: 13px;
          font-weight: 700;
          color: var(--v2-panel-text);
          align-self: end;
        }
        .v2h2-metric__hint {
          font-size: 11px;
          line-height: 1.4;
          color: var(--v2-panel-muted);
          align-self: start;
          margin-top: 2px;
        }

        @media (max-width: 880px) {
          .v2h2-panel__inner { grid-template-columns: 1fr; gap: 24px; }
        }
        @media (max-width: 560px) {
          .v2h2-shell { padding-inline: 18px; }
          .v2h2-panel { padding: 24px; }
          .v2h2-cta .v2h2-btn { width: 100%; }
          .v2h2-metric { column-gap: 12px; }
          .v2h2-metric__num { min-width: 72px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .v2h2-root *,
          .v2h2-reveal,
          .v2h2-curve__line,
          .v2h2-curve__dot {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      <div className="v2h2-shell">
        <div className="v2h2-intro">
          <span
            className="v2h2-eyebrow v2h2-reveal"
            style={{ animationDelay: "0ms" }}
          >
            <i className="fas fa-stethoscope" aria-hidden="true" />
            Plateforme professionnelle
          </span>
          <h1
            className="v2h2-title v2h2-reveal"
            id="v2h2-title"
            style={{ animationDelay: "70ms" }}
          >
            Votre temps a de la valeur.{" "}
            <span className="v2h2-hl">Mesurez le retour.</span>
          </h1>
          <p
            className="v2h2-lead v2h2-reveal"
            style={{ animationDelay: "150ms" }}
          >
            Moins de temps au téléphone, un agenda plus clair et de nouveaux
            patients qui vous trouvent. DocAgora illustre l’impact d’un cabinet
            mieux organisé, en chiffres.
          </p>
          <div
            className="v2h2-cta v2h2-reveal"
            style={{ animationDelay: "230ms" }}
          >
            <a className="v2h2-btn v2h2-btn--primary" href="#">
              Demander l’accès anticipé
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </a>
            <a className="v2h2-btn v2h2-btn--ghost" href="#">
              Parler à un conseiller
            </a>
          </div>
          <ul
            className="v2h2-badges v2h2-reveal"
            style={{ animationDelay: "300ms" }}
          >
            {BADGES.map((b) => (
              <li className="v2h2-badge" key={b}>
                <i className="fas fa-check" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="v2h2-panel v2h2-reveal"
          style={{ animationDelay: "320ms" }}
          aria-label="Retour estimé par mois, valeurs illustratives"
        >
          <div className="v2h2-panel__inner">
            <div>
              <div className="v2h2-panel__head">
                <span className="v2h2-panel__tag">retour estimé / mois</span>
                <span className="v2h2-panel__pill">exemple</span>
              </div>
              <div className="v2h2-panel__curve">
                <ReturnCurve />
              </div>
              <p className="v2h2-panel__foot">*illustratif, non garanti</p>
            </div>
            <div className="v2h2-panel__metrics">
              {METRICS.map((m, i) => (
                <RoiMetric key={m.id} metric={m} delay={420 + i * 90} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
