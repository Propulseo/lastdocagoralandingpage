"use client";

import { useEffect, useRef, useState } from "react";

const CTA_HREF = "/contact";

/* ============================================================
   Hero3, V2 PRO « Retorno » (asymétrique)
   Structure d’origine restaurée. La section remplit TOUJOURS
   la hauteur du viewport : min-height = 100svh − header sticky
   (--v2-header-h, fallback 56px). Conteneur flex colonne qui
   répartit le contenu : la rangée [texte | panneau ROI]
   occupe/centre l’espace principal (flex:1), la barre de
   métriques est calée EN BAS (margin-top:auto). Zéro scroll
   sur 1440×900 (hauteur utile ~844px) grâce aux clamp(vw).

   Rangée côte à côte :
   - Colonne GAUCHE : eyebrow, H1 (titre accentué), sous-titre,
     2 CTA, badges RGPD / hébergement Portugal / langues.
   - Colonne DROITE : panneau ROI = label « RETOUR ESTIMÉ / MOIS »
     + courbe SVG montante SEULE (pas de grand chiffre €,
     pas de métriques dans le panneau) + note « *illustratif ».

   EN BAS, pleine largeur : la barre de métriques
   (3 colonnes séparées par des filets) :
   −40 % rendez-vous manqués · 8 h gagnées / semaine
   · +30 % nouveaux patients.

   THEMEABLE : couleurs UNIQUEMENT via tokens --v2-* hérités
   de .v2p (dark/light/mixte). Le panneau utilise --v2-panel-* ;
   la barre repose sur le fond de section (--v2-text /
   --v2-accent-text / --v2-border). Aucune couleur en dur.
   Préfixe CSS « v2h3- ». Chiffres ILLUSTRATIFS.
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
};

const METRICS: Metric[] = [
  {
    id: "noshow",
    prefix: "−",
    to: 40,
    suffix: "%",
    decimals: 0,
    label: "de rendez-vous manqués*",
  },
  {
    id: "hours",
    prefix: "",
    to: 8,
    suffix: " h",
    decimals: 0,
    label: "gagnées par semaine*",
  },
  {
    id: "patients",
    prefix: "+",
    to: 30,
    suffix: "%",
    decimals: 0,
    label: "de nouveaux patients*",
  },
];

function useCountUp(
  to: number,
  decimals: number,
  start: boolean,
  durationMs = 1400,
): string {
  // Always initialise to the final value so server and first client render match.
  const [value, setValue] = useState<number>(to);
  // mounted flag: animation only starts after hydration is complete.
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!mounted || !start || prefersReducedMotion()) return;
    // Animate from 0 to `to`; first rAF frame renders 0, keeping the state
    // update inside the rAF callback avoids synchronous setState-in-effect.
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

function useInView<T extends HTMLElement>(): {
  ref: React.RefObject<T | null>;
  inView: boolean;
} {
  const ref = useRef<T | null>(null);
  // Always start false to match SSR; reduced-motion will be handled via CSS.
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

function MetricItem({
  metric,
  start,
  delay,
}: {
  metric: Metric;
  start: boolean;
  delay: number;
}) {
  const display = useCountUp(metric.to, metric.decimals, start);

  return (
    <div
      className="v2h3-metric v2h3-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="v2h3-metric__num">
        <span className="v2h3-metric__prefix">{metric.prefix}</span>
        <span className="v2h3-metric__value">{display}</span>
        <span className="v2h3-metric__suffix">{metric.suffix}</span>
      </div>
      <div className="v2h3-metric__label">{metric.label}</div>
    </div>
  );
}

function ReturnCurve() {
  return (
    <svg
      className="v2h3-curve"
      viewBox="0 0 480 120"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="v2h3grad" x1="0" y1="0" x2="1" y2="0">
          <stop
            offset="0%"
            stopColor="var(--v2-accent-text)"
            stopOpacity="0.45"
          />
          <stop offset="55%" stopColor="var(--v2-accent-text)" />
          <stop offset="100%" stopColor="var(--v2-accent)" />
        </linearGradient>
        <linearGradient id="v2h3fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--v2-accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--v2-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        className="v2h3-curve__area"
        d="M0,108 C100,104 160,90 230,66 C310,40 370,20 480,6 L480,120 L0,120 Z"
        fill="url(#v2h3fill)"
      />
      <path
        className="v2h3-curve__line"
        d="M0,108 C100,104 160,90 230,66 C310,40 370,20 480,6"
        stroke="url(#v2h3grad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className="v2h3-curve__dot" cx="480" cy="6" r="6" />
    </svg>
  );
}

const BADGES = ["RGPD", "Données hébergées au Portugal", "PT · FR · EN"];

export default function Hero3() {
  const { ref: barRef, inView } = useInView<HTMLDivElement>();

  return (
    <section className="v2h3-root" aria-labelledby="v2h3-title">
      <style>{`
        .v2h3-root, .v2h3-root * { box-sizing: border-box; }

        .v2h3-root {
          --v2h3-shell: 1240px;
          --v2h3-radius: 22px;
          --v2h3-mono: ui-monospace, "SF Mono", Menlo, monospace;
          position: relative;
          width: 100%;
          /* Remplit toujours la hauteur du viewport sous le header sticky. */
          min-height: calc(100svh - var(--v2-header-h, 56px));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-block: clamp(28px, 3.6vh, 56px);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          color: var(--v2-text-body);
          background:
            radial-gradient(110% 80% at 100% 0%, var(--v2-mesh-a) 0%, transparent 54%),
            radial-gradient(90% 70% at 10% 90%, var(--v2-mesh-b) 0%, transparent 50%),
            var(--v2-bg);
          line-height: 1.5;
          overflow: hidden;
        }
        .v2h3-root::before {
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

        .v2h3-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: var(--v2h3-shell);
          margin-inline: auto;
          padding-inline: clamp(16px, 4vw, 24px);
          /* Hérite de la répartition pleine hauteur de la section. */
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .v2h3-top {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: clamp(28px, 3.4vw, 52px);
          align-items: center;
          /* Occupe et centre l’espace principal du hero. */
          flex: 1;
        }

        @keyframes v2h3-reveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2h3-reveal {
          opacity: 0;
          animation: v2h3-reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes v2h3-draw { to { stroke-dashoffset: 0; } }
        @keyframes v2h3-dotpop {
          0%, 60% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* ── Colonne gauche ── */
        .v2h3-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--v2h3-mono);
          font-size: clamp(12px, 0.95vw, 13px);
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--v2-eyebrow);
          padding: 8px 15px;
          border-radius: 999px;
          background: var(--v2-surface);
          border: 1px solid var(--v2-border);
          line-height: 1;
        }
        .v2h3-eyebrow i { font-size: 12px; }

        .v2h3-title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(34px, 4.6vw, 60px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: clamp(14px, 1.6vh, 20px) 0 0;
          color: var(--v2-text);
          max-width: 18ch;
        }
        .v2h3-title .v2h3-hl { color: var(--v2-accent-text); }

        .v2h3-lead {
          font-size: clamp(16px, 1.45vw, 19px);
          line-height: 1.55;
          color: var(--v2-text-body);
          margin: clamp(14px, 1.6vh, 20px) 0 0;
          max-width: 46ch;
        }

        .v2h3-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: clamp(20px, 2.4vh, 28px);
        }
        .v2h3-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          font-size: clamp(15px, 1.15vw, 16px);
          font-weight: 700;
          text-decoration: none;
          padding: clamp(12px, 1.4vh, 15px) clamp(24px, 2vw, 28px);
          min-height: 52px;
          border-radius: 14px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease, gap 0.2s ease;
          line-height: 1;
        }
        .v2h3-btn:focus-visible {
          outline: 3px solid var(--v2-accent);
          outline-offset: 3px;
        }
        .v2h3-btn--primary {
          color: var(--v2-accent-ink);
          background: var(--v2-accent);
          box-shadow: var(--v2-shadow);
        }
        .v2h3-btn--primary:hover {
          transform: translateY(-2px);
          gap: 14px;
          box-shadow: var(--v2-shadow-lg);
        }
        .v2h3-btn--ghost {
          color: var(--v2-text);
          background: transparent;
          border-color: var(--v2-border);
        }
        .v2h3-btn--ghost:hover {
          transform: translateY(-2px);
          background: var(--v2-surface);
        }

        .v2h3-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin: clamp(16px, 2vh, 22px) 0 0;
          padding: 0;
          list-style: none;
        }
        .v2h3-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: clamp(12px, 0.95vw, 13px);
          font-weight: 600;
          color: var(--v2-text-muted);
          padding: 7px 13px;
          border-radius: 999px;
          background: var(--v2-surface);
          border: 1px solid var(--v2-border);
          line-height: 1;
        }
        .v2h3-badge i { color: var(--v2-accent-text); font-size: 10px; }

        /* ── Panneau ROI (courbe seule), tokens --v2-panel-* ── */
        .v2h3-panel {
          position: relative;
          border-radius: var(--v2h3-radius);
          padding: clamp(22px, 2.4vw, 30px);
          background: var(--v2-panel-bg);
          border: 1px solid var(--v2-panel-border);
          box-shadow: var(--v2-shadow-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2vh, 22px);
        }
        .v2h3-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(70% 60% at 90% 0%, var(--v2-mesh-b) 0%, transparent 60%);
          pointer-events: none;
        }
        .v2h3-panel__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          position: relative;
          z-index: 1;
        }
        .v2h3-panel__tag {
          font-family: var(--v2h3-mono);
          font-size: clamp(11px, 0.9vw, 12px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--v2-panel-muted);
        }
        .v2h3-panel__pill {
          font-family: var(--v2h3-mono);
          font-size: clamp(11px, 0.9vw, 12px);
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--v2-accent);
          padding: 6px 11px;
          border-radius: 999px;
          background: var(--v2-panel-border);
          border: 1px solid var(--v2-panel-border);
          text-transform: uppercase;
        }
        .v2h3-panel__curve {
          position: relative;
          z-index: 1;
          height: clamp(180px, 30vh, 300px);
        }
        .v2h3-curve { width: 100%; height: 100%; display: block; }
        .v2h3-curve__line {
          stroke-dasharray: 640;
          stroke-dashoffset: 640;
          animation: v2h3-draw 1.8s ease 0.4s forwards;
        }
        .v2h3-curve__dot {
          fill: var(--v2-accent);
          transform-origin: 480px 6px;
          transform: scale(0);
          opacity: 0;
          animation: v2h3-dotpop 0.6s ease 2.1s forwards;
        }
        .v2h3-panel__foot {
          position: relative;
          z-index: 1;
          margin: 0;
          font-size: clamp(11px, 0.9vw, 12px);
          color: var(--v2-panel-muted);
          font-family: var(--v2h3-mono);
        }
        .v2h3-curve__badge {
          position: absolute;
          top: 6px;
          right: 12px;
          z-index: 2;
          font-family: var(--v2h3-mono);
          font-size: clamp(13px, 1.1vw, 15px);
          font-weight: 700;
          color: var(--v2-accent-text);
          background: var(--v2-panel-bg);
          border: 1px solid var(--v2-panel-border);
          border-radius: 8px;
          padding: 4px 10px;
          line-height: 1.4;
          letter-spacing: 0.04em;
          pointer-events: none;
        }

        /* ── Barre de métriques pleine largeur (fond de section) ──
           margin-top:auto la cale TOUJOURS en bas du hero. Le
           wrapper porte la marge ; le cadre garde le rendu d’origine. ── */
        .v2h3-barwrap {
          margin-top: auto;
          padding-top: clamp(24px, 3vh, 40px);
        }
        .v2h3-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid var(--v2-border);
          border-radius: var(--v2h3-radius);
          background: var(--v2-surface);
          overflow: hidden;
        }
        .v2h3-metric {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.9vh, 9px);
          padding: clamp(18px, 2.3vh, 26px) clamp(18px, 2.4vw, 30px);
          min-width: 0;
        }
        .v2h3-metric + .v2h3-metric {
          border-left: 1px solid var(--v2-border);
        }
        .v2h3-metric__num {
          display: flex;
          align-items: baseline;
          font-weight: 800;
          font-size: clamp(32px, 3.8vw, 48px);
          color: var(--v2-text);
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .v2h3-metric__prefix { color: var(--v2-accent-text); }
        .v2h3-metric__value { color: var(--v2-accent-text); }
        .v2h3-metric__suffix {
          font-size: 0.62em;
          color: var(--v2-accent-text);
          margin-left: 1px;
        }
        .v2h3-metric__label {
          font-size: clamp(13px, 1.05vw, 14px);
          font-weight: 600;
          line-height: 1.3;
          color: var(--v2-text-muted);
        }

        /* ── Responsive ──
           Empilé : on relâche la contrainte plein écran (min-height:auto)
           pour éviter un grand vide, le contenu coule naturellement. ── */
        @media (max-width: 980px) {
          .v2h3-root { min-height: auto; }
          .v2h3-top {
            grid-template-columns: 1fr;
            gap: 26px;
            align-items: stretch;
            flex: 0 1 auto;
          }
          .v2h3-title { max-width: none; }
          .v2h3-lead { max-width: 52ch; }
          .v2h3-barwrap { margin-top: clamp(24px, 4vh, 40px); }
          .v2h3-panel__curve { height: clamp(170px, 26vh, 240px); }
        }
        @media (max-width: 560px) {
          .v2h3-shell { padding-inline: 18px; }
          .v2h3-cta .v2h3-btn { width: 100%; }
          .v2h3-bar { grid-template-columns: 1fr; }
          .v2h3-metric + .v2h3-metric {
            border-left: none;
            border-top: 1px solid var(--v2-border);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .v2h3-root *,
          .v2h3-reveal,
          .v2h3-curve__line,
          .v2h3-curve__dot {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      <div className="v2h3-shell">
        <div className="v2h3-top">
          <div>
            <span
              className="v2h3-eyebrow v2h3-reveal"
              style={{ animationDelay: "0ms" }}
            >
              <i className="fas fa-stethoscope" aria-hidden="true" />
              Plateforme professionnelle
            </span>
            <h1
              className="v2h3-title v2h3-reveal"
              id="v2h3-title"
              style={{ animationDelay: "70ms" }}
            >
              Votre temps a de la valeur.{" "}
              <span className="v2h3-hl">Mesurez le retour.</span>
            </h1>
            <p
              className="v2h3-lead v2h3-reveal"
              style={{ animationDelay: "150ms" }}
            >
              Moins de temps au téléphone, un agenda plus clair et de nouveaux
              patients qui vous trouvent. DocAgora illustre l&apos;impact d&apos;un
              cabinet mieux organisé, en chiffres.
            </p>
            <div
              className="v2h3-cta v2h3-reveal"
              style={{ animationDelay: "230ms" }}
            >
              <a className="v2h3-btn v2h3-btn--primary" href={CTA_HREF}>
                Demander l&apos;accès anticipé
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </a>
              <a className="v2h3-btn v2h3-btn--ghost" href={CTA_HREF}>
                Parler à un conseiller
              </a>
            </div>
            <ul
              className="v2h3-badges v2h3-reveal"
              style={{ animationDelay: "300ms" }}
            >
              {BADGES.map((b) => (
                <li className="v2h3-badge" key={b}>
                  <i className="fas fa-check" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <aside
            className="v2h3-panel v2h3-reveal"
            style={{ animationDelay: "200ms" }}
            aria-label="Retour estimé par mois, valeur illustrative"
          >
            <div className="v2h3-panel__head">
              <span className="v2h3-panel__tag">retour estimé / mois</span>
              <span className="v2h3-panel__pill">exemple</span>
            </div>
            <div className="v2h3-panel__curve">
              <ReturnCurve />
              <span className="v2h3-curve__badge" aria-hidden="true">+30 %*</span>
            </div>
            <p className="v2h3-panel__foot">*illustratif, non garanti</p>
          </aside>
        </div>

        <div className="v2h3-barwrap">
          <div
            ref={barRef}
            className="v2h3-bar"
            aria-label="Métriques illustratives"
          >
            {METRICS.map((m, i) => (
              <MetricItem
                key={m.id}
                metric={m}
                start={inView}
                delay={420 + i * 90}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
