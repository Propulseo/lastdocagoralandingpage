"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── Helper : détection du mode mouvement réduit (SSR-safe) ── */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ============================================================
   Variante PRO 4 — « Retour »
   ROI / numbers-first / data-persuasion (avant vs après).
   Cobalt + navy, gros chiffres en tabular-nums, accents teal
   pour le « après » positif. Style data / finance-santé.
   Tout le style est encapsulé dans un <style> préfixé "pro4-".
   ============================================================ */

/* ── Données illustratives (jamais présentées comme réelles) ── */

type CountMetric = {
  id: string;
  prefix: string;
  to: number;
  suffix: string;
  decimals: number;
  label: string;
  hint: string;
};

const HERO_METRICS: CountMetric[] = [
  {
    id: 'faltas',
    prefix: '−',
    to: 40,
    suffix: '%',
    decimals: 0,
    label: 'rendez-vous manqués',
    hint: 'moins d’absences sans prévenir',
  },
  {
    id: 'horas',
    prefix: '',
    to: 8,
    suffix: 'h',
    decimals: 0,
    label: 'économisées / semaine',
    hint: 'moins de temps au téléphone',
  },
  {
    id: 'pacientes',
    prefix: '+',
    to: 30,
    suffix: '%',
    decimals: 0,
    label: 'nouveaux patients',
    hint: 'trouvés via la recherche',
  },
];

type CompareRow = { avant: string; apres: string };

const COMPARE_ROWS: CompareRow[] = [
  {
    avant: 'Le téléphone sonne sans arrêt pendant la consultation.',
    apres: 'Rendez-vous organisés, reçus tranquillement.',
  },
  {
    avant: 'Agenda papier, raturé et difficile à lire.',
    apres: 'Agenda numérique clair, toujours disponible.',
  },
  {
    avant: 'Rendez-vous manqués imprévus, sans prévenir.',
    apres: 'Rappels automatiques « bientôt » pour réduire les absences.',
  },
  {
    avant: 'Nouveaux patients qui ne vous trouvent pas en ligne.',
    apres: 'Profil vérifié, visible sur 16 spécialités.',
  },
];

type BentoMetric = {
  id: string;
  prefix: string;
  to: number;
  suffix: string;
  decimals: number;
  title: string;
  sub: string;
  span: 'wide' | 'tall' | 'normal';
  accent: 'teal' | 'cobalt' | 'navy';
};

const BENTO_METRICS: BentoMetric[] = [
  {
    id: 'b-faltas',
    prefix: '−',
    to: 40,
    suffix: '%',
    decimals: 0,
    title: 'de rendez-vous manqués',
    sub: 'Rappels « bientôt » qui avertissent le patient avant la consultation.',
    span: 'wide',
    accent: 'teal',
  },
  {
    id: 'b-horas',
    prefix: '',
    to: 8,
    suffix: 'h',
    decimals: 0,
    title: 'économisées par semaine',
    sub: 'Moins d’appels, plus de temps clinique.',
    span: 'normal',
    accent: 'cobalt',
  },
  {
    id: 'b-pacientes',
    prefix: '+',
    to: 30,
    suffix: '%',
    decimals: 0,
    title: 'de patients supplémentaires',
    sub: 'Visible dans la recherche gratuite.',
    span: 'normal',
    accent: 'navy',
  },
  {
    id: 'b-especialidades',
    prefix: '',
    to: 16,
    suffix: '',
    decimals: 0,
    title: 'spécialités',
    sub: 'De la médecine générale à la kinésithérapie, toutes vérifiées.',
    span: 'normal',
    accent: 'cobalt',
  },
  {
    id: 'b-idiomas',
    prefix: '',
    to: 3,
    suffix: '',
    decimals: 0,
    title: 'langues',
    sub: 'Português, Français, English, sans barrières.',
    span: 'normal',
    accent: 'teal',
  },
  {
    id: 'b-custo',
    prefix: '',
    to: 0,
    suffix: '€',
    decimals: 0,
    title: 'pour commencer',
    sub: 'Recherche gratuite. Sans carte, sans engagement.',
    span: 'wide',
    accent: 'teal',
  },
];

type Feature = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  soon?: boolean;
};

const FEATURES: Feature[] = [
  {
    id: 'f-perfil',
    icon: 'fa-user-md',
    title: 'Profil vérifié',
    desc: 'Affichez votre formation, spécialité et adresse avec un badge de confiance.',
  },
  {
    id: 'f-pesquisa',
    icon: 'fa-search',
    title: 'Visible dans la recherche',
    desc: 'Les patients filtrent par spécialité, ville et langue. Gratuit.',
  },
  {
    id: 'f-agenda',
    icon: 'fa-calendar-check',
    title: 'Prise de rendez-vous en ligne',
    desc: 'Recevez les demandes de rendez-vous de façon organisée.',
    soon: true,
  },
  {
    id: 'f-lembretes',
    icon: 'fa-bell',
    title: 'Rappels automatiques',
    desc: 'Notifications envoyées au patient pour réduire les absences.',
    soon: true,
  },
  {
    id: 'f-idiomas',
    icon: 'fa-language',
    title: 'Trilingue',
    desc: 'Interface et contact en PT, FR et EN pour tous les patients.',
  },
  {
    id: 'f-seguro',
    icon: 'fa-lock',
    title: 'Données protégées',
    desc: 'Conformité et sécurité dans le traitement des données de santé.',
  },
];

/* ── Hook : compteur animé déclenché à l’entrée dans le viewport ── */

function useCountUp(
  to: number,
  decimals: number,
  start: boolean,
  durationMs = 1400,
): string {
  // Lazy init : si mouvement réduit, on affiche directement la valeur finale.
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : 0));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start || prefersReducedMotion()) return;

    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      // easeOutExpo
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
  // Lazy init : en mouvement réduit, on considère l’élément déjà visible.
  const [inView, setInView] = useState(() => prefersReducedMotion());

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

/* ── Sous-composant : grande métrique chiffrée animée ── */

function HeroMetric({ metric, delay }: { metric: CountMetric; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const display = useCountUp(metric.to, metric.decimals, inView);

  return (
    <div
      ref={ref}
      className="pro4-herometric pro4-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="pro4-herometric__num">
        <span className="pro4-herometric__prefix">{metric.prefix}</span>
        <span className="pro4-herometric__value">{display}</span>
        <span className="pro4-herometric__suffix">{metric.suffix}</span>
        <span className="pro4-herometric__star" aria-hidden="true">
          *
        </span>
      </div>
      <div className="pro4-herometric__label">{metric.label}</div>
      <div className="pro4-herometric__hint">{metric.hint}</div>
    </div>
  );
}

/* ── Sous-composant : cellule bento avec compteur ── */

function BentoCell({ metric, delay }: { metric: BentoMetric; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const display = useCountUp(metric.to, metric.decimals, inView);

  return (
    <div
      ref={ref}
      className={`pro4-bento__cell pro4-bento__cell--${metric.span} pro4-bento__cell--${metric.accent} pro4-reveal`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="pro4-bento__num">
        <span className="pro4-bento__prefix">{metric.prefix}</span>
        <span className="pro4-bento__value">{display}</span>
        <span className="pro4-bento__suffix">{metric.suffix}</span>
        <span className="pro4-bento__star" aria-hidden="true">
          *
        </span>
      </div>
      <div className="pro4-bento__title">{metric.title}</div>
      <p className="pro4-bento__sub">{metric.sub}</p>
    </div>
  );
}

/* ── SVG décoratif : tracé « courbe de retour » montante ── */

function ReturnCurve() {
  return (
    <svg
      className="pro4-curve"
      viewBox="0 0 480 200"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="pro4grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(var(--color-cobalt-rgb), 0.15)" />
          <stop offset="55%" stopColor="rgba(var(--color-cobalt-rgb), 0.7)" />
          <stop offset="100%" stopColor="var(--color-teal)" />
        </linearGradient>
        <linearGradient id="pro4fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(var(--color-teal-rgb), 0.28)" />
          <stop offset="100%" stopColor="rgba(var(--color-teal-rgb), 0)" />
        </linearGradient>
      </defs>
      <path
        className="pro4-curve__area"
        d="M0,170 C90,168 150,150 220,120 C300,86 360,46 480,18 L480,200 L0,200 Z"
        fill="url(#pro4fill)"
      />
      <path
        className="pro4-curve__line"
        d="M0,170 C90,168 150,150 220,120 C300,86 360,46 480,18"
        stroke="url(#pro4grad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className="pro4-curve__dot" cx="480" cy="18" r="6" />
    </svg>
  );
}

export default function ProVariant4() {
  return (
    <div className="pro4-root">
      <style>{`
        .pro4-root, .pro4-root * { box-sizing: border-box; }

        .pro4-root {
          --pro4-shell: 1180px;
          --pro4-radius: 22px;
          --pro4-mono: ui-monospace, "SF Mono", Menlo, monospace;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          color: var(--color-dark-1);
          background:
            radial-gradient(120% 80% at 85% -10%, rgba(var(--color-cobalt-rgb), 0.12) 0%, rgba(var(--color-cobalt-rgb), 0) 55%),
            radial-gradient(90% 70% at 0% 0%, rgba(var(--color-teal-rgb), 0.10) 0%, rgba(var(--color-teal-rgb), 0) 50%),
            var(--color-light-1);
          line-height: 1.5;
          overflow-x: hidden;
          position: relative;
        }

        /* Fine grain overlay */
        .pro4-root::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
          mix-blend-mode: multiply;
          background-image: radial-gradient(rgba(var(--color-navy-rgb), 0.06) 1px, transparent 1px);
          background-size: 4px 4px;
        }

        .pro4-shell {
          width: 100%;
          max-width: var(--pro4-shell);
          margin-inline: auto;
          padding-inline: 28px;
          position: relative;
          z-index: 1;
        }

        /* ── Reveal cascade ── */
        @keyframes pro4-reveal {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pro4-reveal {
          opacity: 0;
          animation: pro4-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes pro4-floatpulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes pro4-draw {
          from { stroke-dashoffset: 620; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes pro4-dotpop {
          0%, 60% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* ── Header / nav ── */
        .pro4-header {
          position: relative;
          z-index: 5;
          padding-block: 22px;
        }
        .pro4-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .pro4-logo {
          display: inline-flex;
          align-items: baseline;
          gap: 2px;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 24px;
          letter-spacing: -0.01em;
          color: var(--color-navy);
          text-decoration: none;
          line-height: 1;
        }
        .pro4-logo b {
          font-weight: 600;
          color: var(--color-cobalt);
        }
        .pro4-logo i {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--color-teal);
          margin-left: 4px;
          display: inline-block;
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.18);
        }
        .pro4-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-navy);
          text-decoration: none;
          padding: 9px 16px;
          border-radius: 999px;
          background: rgba(var(--color-navy-rgb), 0.06);
          border: 1px solid rgba(var(--color-navy-rgb), 0.10);
          transition: background-color 0.2s ease, transform 0.2s ease, gap 0.2s ease;
          min-height: 44px;
          line-height: 1;
        }
        .pro4-back:hover {
          background: rgba(var(--color-navy-rgb), 0.12);
          color: var(--color-navy);
          gap: 12px;
          transform: translateY(-1px);
        }

        /* ── Buttons ── */
        .pro4-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          text-transform: none;
          letter-spacing: 0;
          padding: 15px 28px;
          min-height: 52px;
          border-radius: 14px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease, gap 0.2s ease;
          line-height: 1;
        }
        .pro4-btn--primary {
          color: var(--color-dark-1);
          background: linear-gradient(135deg, var(--color-teal), var(--color-mint));
          box-shadow: 0 14px 30px -10px rgba(var(--color-teal-rgb), 0.7);
        }
        .pro4-btn--primary:hover {
          color: var(--color-dark-1);
          transform: translateY(-2px);
          gap: 14px;
          box-shadow: 0 20px 40px -12px rgba(var(--color-teal-rgb), 0.85);
        }
        .pro4-btn--ghost {
          color: var(--color-navy);
          background: rgba(var(--color-cobalt-rgb), 0.08);
          border-color: rgba(var(--color-cobalt-rgb), 0.30);
        }
        .pro4-btn--ghost:hover {
          color: var(--color-navy);
          background: rgba(var(--color-cobalt-rgb), 0.16);
          transform: translateY(-2px);
        }
        .pro4-btn--light {
          color: var(--color-dark-1);
          background: var(--color-light-1);
        }
        .pro4-btn--light:hover {
          color: var(--color-dark-1);
          transform: translateY(-2px);
          gap: 14px;
        }
        .pro4-btn--outline-light {
          color: var(--color-light-1);
          background: transparent;
          border-color: rgba(255, 255, 255, 0.3);
        }
        .pro4-btn--outline-light:hover {
          color: var(--color-light-1);
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        /* ── Eyebrow / labels ── */
        .pro4-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--pro4-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-cobalt);
          padding: 7px 14px;
          border-radius: 999px;
          background: rgba(var(--color-cobalt-rgb), 0.10);
          border: 1px solid rgba(var(--color-cobalt-rgb), 0.22);
          line-height: 1;
        }
        .pro4-eyebrow i {
          color: var(--color-teal);
          font-size: 11px;
        }

        /* ── HERO ── */
        .pro4-hero {
          position: relative;
          padding-top: 36px;
          padding-bottom: 96px;
        }
        .pro4-hero__grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
        }
        .pro4-hero__title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(40px, 6vw, 74px);
          line-height: 1.03;
          letter-spacing: -0.02em;
          margin: 22px 0 0;
          color: var(--color-navy);
          text-transform: none;
        }
        .pro4-hero__title em {
          font-style: italic;
          color: var(--color-cobalt);
        }
        .pro4-hero__title .pro4-hl {
          background: linear-gradient(120deg, var(--color-teal), var(--color-mint));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-style: normal;
        }
        .pro4-hero__lead {
          font-size: clamp(16px, 1.5vw, 19px);
          line-height: 1.62;
          color: #46505f;
          margin: 22px 0 0;
          max-width: 33ch;
        }
        .pro4-hero__cta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 32px;
        }
        .pro4-hero__note {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          font-size: 13px;
          color: #6b7280;
        }
        .pro4-hero__note i { color: var(--color-teal); }

        /* Hero metrics panel */
        .pro4-hero__panel {
          position: relative;
          border-radius: var(--pro4-radius);
          padding: 30px;
          background:
            linear-gradient(160deg, rgba(var(--color-navy-rgb), 0.97), rgba(var(--color-dark-1-rgb), 0.98));
          box-shadow:
            0 40px 80px -30px rgba(var(--color-navy-rgb), 0.55),
            0 0 0 1px rgba(255,255,255,0.05) inset;
          overflow: hidden;
        }
        .pro4-hero__panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(70% 60% at 90% 0%, rgba(var(--color-teal-rgb), 0.22) 0%, transparent 60%);
          pointer-events: none;
        }
        .pro4-panel__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          position: relative;
          z-index: 1;
        }
        .pro4-panel__tag {
          font-family: var(--pro4-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }
        .pro4-panel__pill {
          font-family: var(--pro4-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--color-teal);
          padding: 5px 10px;
          border-radius: 999px;
          background: rgba(var(--color-teal-rgb), 0.14);
          border: 1px solid rgba(var(--color-teal-rgb), 0.3);
          text-transform: uppercase;
        }
        .pro4-panel__curve {
          position: relative;
          z-index: 1;
          height: 110px;
          margin: 18px 0 8px;
        }
        .pro4-curve { width: 100%; height: 100%; display: block; }
        .pro4-curve__line {
          stroke-dasharray: 620;
          stroke-dashoffset: 620;
          animation: pro4-draw 1.8s ease 0.4s forwards;
        }
        .pro4-curve__dot {
          fill: var(--color-teal);
          transform-origin: 480px 18px;
          transform: scale(0);
          opacity: 0;
          animation: pro4-dotpop 0.6s ease 2.1s forwards;
        }
        .pro4-panel__metrics {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 12px;
        }
        .pro4-herometric {
          padding: 16px 14px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.09);
        }
        .pro4-herometric__num {
          display: flex;
          align-items: baseline;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          font-weight: 800;
          font-size: clamp(26px, 3vw, 38px);
          color: var(--color-light-1);
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .pro4-herometric__prefix { color: var(--color-teal); }
        .pro4-herometric__suffix { font-size: 0.6em; color: var(--color-teal); margin-left: 1px; }
        .pro4-herometric__star { font-size: 0.5em; color: rgba(255,255,255,0.4); margin-left: 2px; }
        .pro4-herometric__label {
          margin-top: 8px;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          text-transform: none;
        }
        .pro4-herometric__hint {
          margin-top: 3px;
          font-size: 11px;
          line-height: 1.4;
          color: rgba(255,255,255,0.5);
        }
        .pro4-panel__foot {
          position: relative;
          z-index: 1;
          margin-top: 16px;
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          font-family: var(--pro4-mono);
        }

        /* ── Section frame ── */
        .pro4-section { padding-block: 88px; position: relative; }
        .pro4-section--tint {
          background:
            linear-gradient(180deg, rgba(var(--color-light-2), 0) 0%, var(--color-light-2) 12%, var(--color-light-2) 88%, rgba(var(--color-light-2), 0) 100%);
        }
        .pro4-sechead { max-width: 640px; margin-bottom: 44px; }
        .pro4-sechead--center { margin-inline: auto; text-align: center; }
        .pro4-sectitle {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: var(--color-navy);
          margin: 16px 0 0;
          text-transform: none;
        }
        .pro4-secsub {
          font-size: 16px;
          line-height: 1.6;
          color: #51596a;
          margin: 14px 0 0;
        }

        /* ── AVANT / APRÈS ── */
        .pro4-compare {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          align-items: stretch;
        }
        .pro4-col {
          border-radius: var(--pro4-radius);
          padding: 30px;
          position: relative;
          overflow: hidden;
        }
        .pro4-col--antes {
          background: #eef0f3;
          border: 1px solid #e0e3e8;
          filter: saturate(0.6);
        }
        .pro4-col--depois {
          background:
            radial-gradient(80% 60% at 80% 0%, rgba(var(--color-teal-rgb), 0.16) 0%, transparent 60%),
            linear-gradient(160deg, var(--color-light-1), var(--color-light-2));
          border: 1px solid rgba(var(--color-teal-rgb), 0.35);
          box-shadow: 0 28px 60px -28px rgba(var(--color-teal-rgb), 0.5);
        }
        .pro4-col__tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--pro4-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 999px;
          line-height: 1;
        }
        .pro4-col--antes .pro4-col__tag {
          color: #6b7280;
          background: #e2e5ea;
        }
        .pro4-col--depois .pro4-col__tag {
          color: var(--color-mint);
          background: rgba(var(--color-teal-rgb), 0.14);
        }
        .pro4-col__title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 26px;
          margin: 16px 0 22px;
          text-transform: none;
          line-height: 1.1;
        }
        .pro4-col--antes .pro4-col__title { color: #535b66; }
        .pro4-col--depois .pro4-col__title { color: var(--color-navy); }
        .pro4-col__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
        .pro4-col__item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          line-height: 1.5;
        }
        .pro4-col__ico {
          flex-shrink: 0;
          width: 26px; height: 26px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          font-size: 12px;
          margin-top: 1px;
        }
        .pro4-col--antes .pro4-col__item { color: #707885; }
        .pro4-col--antes .pro4-col__ico { background: #dcdfe5; color: #8b93a1; }
        .pro4-col--depois .pro4-col__item { color: var(--color-dark-1); font-weight: 500; }
        .pro4-col--depois .pro4-col__ico {
          background: var(--color-teal);
          color: var(--color-dark-1);
        }
        .pro4-compare__vs {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          width: 56px; height: 56px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: var(--color-navy);
          color: var(--color-light-1);
          font-family: var(--pro4-mono);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          box-shadow: 0 12px 28px -8px rgba(var(--color-navy-rgb), 0.6);
          border: 3px solid var(--color-light-1);
        }
        .pro4-compare__wrap { position: relative; }

        /* ── BENTO ── */
        .pro4-bento {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .pro4-bento__cell {
          position: relative;
          border-radius: var(--pro4-radius);
          padding: 28px;
          background: var(--color-light-1);
          border: 1px solid var(--border-default);
          box-shadow: 0 18px 40px -28px rgba(var(--color-navy-rgb), 0.35);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          grid-column: span 1;
        }
        .pro4-bento__cell:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 56px -28px rgba(var(--color-navy-rgb), 0.45);
        }
        .pro4-bento__cell--wide { grid-column: span 2; }
        .pro4-bento__cell::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.9;
          pointer-events: none;
        }
        .pro4-bento__cell--teal::before { background: radial-gradient(80% 70% at 100% 0%, rgba(var(--color-teal-rgb), 0.14), transparent 60%); }
        .pro4-bento__cell--cobalt::before { background: radial-gradient(80% 70% at 100% 0%, rgba(var(--color-cobalt-rgb), 0.12), transparent 60%); }
        .pro4-bento__cell--navy::before { background: radial-gradient(80% 70% at 100% 0%, rgba(var(--color-navy-rgb), 0.10), transparent 60%); }
        .pro4-bento__num {
          position: relative;
          display: flex;
          align-items: baseline;
          font-weight: 800;
          font-size: clamp(40px, 5vw, 62px);
          line-height: 1;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
          color: var(--color-navy);
        }
        .pro4-bento__cell--teal .pro4-bento__num { color: var(--color-mint); }
        .pro4-bento__cell--cobalt .pro4-bento__num { color: var(--color-cobalt); }
        .pro4-bento__prefix { color: inherit; }
        .pro4-bento__suffix { font-size: 0.5em; margin-left: 2px; }
        .pro4-bento__star { font-size: 0.32em; color: #aab2bd; margin-left: 3px; align-self: flex-start; }
        .pro4-bento__title {
          position: relative;
          margin-top: 8px;
          font-size: 16px;
          font-weight: 700;
          color: var(--color-dark-1);
          text-transform: none;
        }
        .pro4-bento__sub {
          position: relative;
          margin: 8px 0 0;
          font-size: 14px;
          line-height: 1.5;
          color: #5a6373;
        }

        /* ── FEATURES ── */
        .pro4-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .pro4-feat {
          position: relative;
          border-radius: 18px;
          padding: 26px;
          background: var(--color-light-1);
          border: 1px solid var(--border-default);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .pro4-feat:hover {
          transform: translateY(-4px);
          border-color: rgba(var(--color-cobalt-rgb), 0.4);
          box-shadow: 0 22px 44px -26px rgba(var(--color-cobalt-rgb), 0.5);
        }
        .pro4-feat__ico {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          font-size: 19px;
          color: var(--color-cobalt);
          background: rgba(var(--color-cobalt-rgb), 0.12);
          margin-bottom: 16px;
        }
        .pro4-feat__title {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          font-size: 17px;
          font-weight: 700;
          color: var(--color-navy);
          margin: 0 0 8px;
          text-transform: none;
        }
        .pro4-feat__desc {
          font-size: 14px;
          line-height: 1.55;
          color: #5a6373;
          margin: 0;
        }
        .pro4-soon {
          font-family: var(--pro4-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-mint);
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(var(--color-teal-rgb), 0.14);
          border: 1px solid rgba(var(--color-teal-rgb), 0.3);
          line-height: 1;
        }

        /* ── EARLY ACCESS ── */
        .pro4-early {
          border-radius: var(--pro4-radius);
          padding: 44px;
          background:
            radial-gradient(80% 100% at 0% 0%, rgba(var(--color-cobalt-rgb), 0.1), transparent 55%),
            linear-gradient(150deg, var(--color-light-1), var(--color-light-2));
          border: 1px solid rgba(var(--color-cobalt-rgb), 0.22);
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 36px;
          align-items: center;
        }
        .pro4-early__steps { list-style: none; margin: 22px 0 0; padding: 0; display: grid; gap: 14px; }
        .pro4-early__step {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 15px;
          color: var(--color-dark-1);
        }
        .pro4-early__num {
          flex-shrink: 0;
          width: 32px; height: 32px;
          border-radius: 10px;
          display: grid; place-items: center;
          font-family: var(--pro4-mono);
          font-weight: 700;
          font-size: 14px;
          color: var(--color-light-1);
          background: var(--color-cobalt);
        }
        .pro4-early__card {
          background: linear-gradient(160deg, rgba(var(--color-navy-rgb), 0.97), rgba(var(--color-dark-1-rgb), 0.98));
          border-radius: 18px;
          padding: 28px;
          box-shadow: 0 30px 60px -28px rgba(var(--color-navy-rgb), 0.55);
        }
        .pro4-early__card h3 {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 24px;
          color: var(--color-light-1);
          margin: 0 0 6px;
          text-transform: none;
        }
        .pro4-early__card p {
          font-size: 14px;
          line-height: 1.55;
          color: rgba(255,255,255,0.62);
          margin: 0 0 20px;
        }
        .pro4-early__card .pro4-btn { width: 100%; }
        .pro4-early__fineprint {
          margin-top: 14px;
          font-size: 11px;
          color: rgba(255,255,255,0.42);
          text-align: center;
        }

        /* ── FINAL CTA ── */
        .pro4-cta {
          position: relative;
          margin-top: 8px;
          border-radius: 28px;
          overflow: hidden;
          padding: 72px 48px;
          text-align: center;
          background:
            radial-gradient(90% 120% at 50% -20%, rgba(var(--color-teal-rgb), 0.22) 0%, transparent 55%),
            linear-gradient(160deg, var(--color-navy), var(--color-dark-1));
          box-shadow: 0 50px 90px -40px rgba(var(--color-navy-rgb), 0.7);
        }
        .pro4-cta__title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(30px, 4.5vw, 52px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: var(--color-light-1);
          margin: 18px auto 0;
          max-width: 18ch;
          text-transform: none;
        }
        .pro4-cta__title .pro4-hl {
          background: linear-gradient(120deg, var(--color-teal), var(--color-mint));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .pro4-cta__sub {
          font-size: 17px;
          line-height: 1.6;
          color: rgba(255,255,255,0.72);
          margin: 18px auto 0;
          max-width: 46ch;
        }
        .pro4-cta__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          margin-top: 30px;
        }
        .pro4-cta__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--pro4-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-teal);
          padding: 7px 14px;
          border-radius: 999px;
          background: rgba(var(--color-teal-rgb), 0.12);
          border: 1px solid rgba(var(--color-teal-rgb), 0.3);
          line-height: 1;
        }

        /* ── Footnote ── */
        .pro4-footnote {
          margin-top: 28px;
          font-size: 12px;
          line-height: 1.5;
          color: #8a93a1;
          max-width: 760px;
        }
        .pro4-footnote b { color: #6b7280; font-weight: 600; }

        /* ── Footer ── */
        .pro4-footer {
          margin-top: 96px;
          background: var(--color-dark-2);
          color: rgba(255,255,255,0.6);
          position: relative;
          z-index: 1;
        }
        .pro4-footer__top {
          display: flex;
          flex-wrap: wrap;
          gap: 28px;
          align-items: flex-start;
          justify-content: space-between;
          padding-block: 52px 32px;
        }
        .pro4-footer__brand { max-width: 320px; }
        .pro4-footer__logo {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 22px;
          color: var(--color-light-1);
          display: inline-flex;
          align-items: baseline;
          gap: 2px;
        }
        .pro4-footer__logo b { color: var(--color-teal); font-weight: 600; }
        .pro4-footer__tag {
          margin: 12px 0 0;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255,255,255,0.5);
        }
        .pro4-footer__cols {
          display: flex;
          gap: 56px;
          flex-wrap: wrap;
        }
        .pro4-footer__coltitle {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          margin: 0 0 14px;
          font-family: var(--pro4-mono);
        }
        .pro4-footer__nav { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
        .pro4-footer__nav a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s ease;
        }
        .pro4-footer__nav a:hover { color: var(--color-teal); }
        .pro4-footer__bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-block: 22px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
        }
        .pro4-footer__bottom a { color: rgba(255,255,255,0.4); text-decoration: none; }
        .pro4-footer__bottom a:hover { color: var(--color-teal); }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .pro4-hero__grid { grid-template-columns: 1fr; gap: 40px; }
          .pro4-hero__lead { max-width: 46ch; }
          .pro4-early { grid-template-columns: 1fr; gap: 28px; }
          .pro4-bento { grid-template-columns: repeat(2, 1fr); }
          .pro4-bento__cell--wide { grid-column: span 2; }
          .pro4-features { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 720px) {
          .pro4-shell { padding-inline: 18px; }
          .pro4-section { padding-block: 64px; }
          .pro4-compare { grid-template-columns: 1fr; gap: 16px; }
          .pro4-compare__vs {
            position: static;
            transform: none;
            margin: 4px auto;
          }
          .pro4-features { grid-template-columns: 1fr; }
          .pro4-cta { padding: 52px 24px; }
          .pro4-col, .pro4-early, .pro4-bento__cell { padding: 24px; }
        }
        @media (max-width: 460px) {
          .pro4-bento { grid-template-columns: 1fr; }
          .pro4-bento__cell--wide { grid-column: span 1; }
          .pro4-panel__metrics { grid-template-columns: 1fr; }
          .pro4-hero__cta .pro4-btn { width: 100%; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .pro4-root *,
          .pro4-reveal,
          .pro4-curve__line,
          .pro4-curve__dot {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="pro4-header">
        <div className="pro4-shell">
          <nav className="pro4-nav" aria-label="Navigation de la variante">
            <a className="pro4-logo" href="#pro4-top">
              DocAgora<b>Pro</b>
              <i aria-hidden="true" />
            </a>
            <Link className="pro4-back" href="/variants">
              <i className="fas fa-arrow-right" aria-hidden="true" style={{ transform: "rotate(180deg)" }} />
              Variantes
            </Link>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="pro4-hero" id="pro4-top" aria-labelledby="pro4-hero-title">
        <div className="pro4-shell">
          <div className="pro4-hero__grid">
            <div>
              <span className="pro4-eyebrow pro4-reveal" style={{ animationDelay: "0ms" }}>
                <i className="fas fa-shield-alt" aria-hidden="true" />
                Pour les professionnels de santé
              </span>
              <h1 className="pro4-hero__title pro4-reveal" id="pro4-hero-title" style={{ animationDelay: "70ms" }}>
                Votre temps a de la valeur.{" "}
                <span className="pro4-hl">Mesurez le retour.</span>
              </h1>
              <p className="pro4-hero__lead pro4-reveal" style={{ animationDelay: "150ms" }}>
                Moins de temps au téléphone, un agenda plus clair et de nouveaux
                patients qui vous trouvent. DocAgora illustre l’impact, en chiffres.
              </p>
              <div className="pro4-hero__cta pro4-reveal" style={{ animationDelay: "230ms" }}>
                <a className="pro4-btn pro4-btn--primary" href="#pro4-early">
                  Je veux un accès anticipé
                  <i className="fas fa-arrow-right" aria-hidden="true" />
                </a>
                <a className="pro4-btn pro4-btn--ghost" href="#pro4-compare">
                  Voir avant / après
                </a>
              </div>
              <p className="pro4-hero__note pro4-reveal" style={{ animationDelay: "300ms" }}>
                <i className="fas fa-check-circle" aria-hidden="true" />
                Recherche gratuite &middot; Prise de rendez-vous bientôt &middot; Sans carte
              </p>
            </div>

            <aside className="pro4-hero__panel pro4-reveal" style={{ animationDelay: "200ms" }} aria-label="Métriques illustratives">
              <div className="pro4-panel__head">
                <span className="pro4-panel__tag">retour estimé / mois</span>
                <span className="pro4-panel__pill">exemple</span>
              </div>
              <div className="pro4-panel__curve">
                <ReturnCurve />
              </div>
              <div className="pro4-panel__metrics">
                {HERO_METRICS.map((m, i) => (
                  <HeroMetric key={m.id} metric={m} delay={400 + i * 90} />
                ))}
              </div>
              <p className="pro4-panel__foot">* valeurs illustratives, non garanties</p>
            </aside>
          </div>
        </div>
      </section>

      {/* ── AVANT / APRÈS ── */}
      <section className="pro4-section pro4-section--tint" id="pro4-compare" aria-labelledby="pro4-compare-title">
        <div className="pro4-shell">
          <div className="pro4-sechead">
            <span className="pro4-eyebrow">
              <i className="fas fa-clock" aria-hidden="true" />
              Avant &middot; Après
            </span>
            <h2 className="pro4-sectitle" id="pro4-compare-title">
              La même journée, vécue autrement.
            </h2>
            <p className="pro4-secsub">
              À gauche, le quotidien que vous connaissez. À droite, ce qui change
              quand votre agenda se met à travailler pour vous.
            </p>
          </div>

          <div className="pro4-compare__wrap">
            <div className="pro4-compare">
              <div className="pro4-col pro4-col--antes pro4-reveal" style={{ animationDelay: "0ms" }}>
                <span className="pro4-col__tag">Avant</span>
                <h3 className="pro4-col__title">Sans DocAgora</h3>
                <ul className="pro4-col__list">
                  {COMPARE_ROWS.map((row, i) => (
                    <li className="pro4-col__item" key={`avant-${i}`}>
                      <span className="pro4-col__ico" aria-hidden="true">
                        <i className="fas fa-times" />
                      </span>
                      <span>{row.avant}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pro4-col pro4-col--depois pro4-reveal" style={{ animationDelay: "120ms" }}>
                <span className="pro4-col__tag">Après</span>
                <h3 className="pro4-col__title">Avec DocAgora</h3>
                <ul className="pro4-col__list">
                  {COMPARE_ROWS.map((row, i) => (
                    <li className="pro4-col__item" key={`apres-${i}`}>
                      <span className="pro4-col__ico" aria-hidden="true">
                        <i className="fas fa-check" />
                      </span>
                      <span>{row.apres}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pro4-compare__vs" aria-hidden="true">VS</div>
          </div>
        </div>
      </section>

      {/* ── BENTO MÉTRIQUES ── */}
      <section className="pro4-section" id="pro4-numbers" aria-labelledby="pro4-numbers-title">
        <div className="pro4-shell">
          <div className="pro4-sechead pro4-sechead--center">
            <span className="pro4-eyebrow">
              <i className="fas fa-star" aria-hidden="true" />
              Des chiffres qui parlent
            </span>
            <h2 className="pro4-sectitle" id="pro4-numbers-title">
              Le retour, en grand.
            </h2>
            <p className="pro4-secsub">
              Estimations illustratives de ce qu’un agenda organisé peut changer
              dans votre cabinet.
            </p>
          </div>

          <div className="pro4-bento">
            {BENTO_METRICS.map((m, i) => (
              <BentoCell key={m.id} metric={m} delay={i * 80} />
            ))}
          </div>

          <p className="pro4-footnote">
            <b>*illustratif.</b> Les valeurs présentées sont des exemples
            purement démonstratifs pour illustrer le potentiel de la plateforme.
            Elles ne constituent en aucun cas une garantie de résultat. La prise
            de rendez-vous en ligne et les rappels automatiques sont en cours de
            développement (&laquo;&nbsp;bientôt&nbsp;&raquo;).
          </p>
        </div>
      </section>

      {/* ── FONCTIONNALITÉS ── */}
      <section className="pro4-section pro4-section--tint" id="pro4-features" aria-labelledby="pro4-features-title">
        <div className="pro4-shell">
          <div className="pro4-sechead">
            <span className="pro4-eyebrow">
              <i className="fas fa-check-circle" aria-hidden="true" />
              Fonctionnalités
            </span>
            <h2 className="pro4-sectitle" id="pro4-features-title">
              Tout ce dont vous avez besoin, sans complexité.
            </h2>
            <p className="pro4-secsub">
              Commencez dès aujourd’hui avec ce qui est déjà disponible. Le reste arrive bientôt.
            </p>
          </div>

          <div className="pro4-features">
            {FEATURES.map((f, i) => (
              <article
                className="pro4-feat pro4-reveal"
                key={f.id}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="pro4-feat__ico" aria-hidden="true">
                  <i className={`fas ${f.icon}`} />
                </div>
                <h3 className="pro4-feat__title">
                  {f.title}
                  {f.soon ? <span className="pro4-soon">bientôt</span> : null}
                </h3>
                <p className="pro4-feat__desc">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCÈS ANTICIPÉ ── */}
      <section className="pro4-section" id="pro4-early" aria-labelledby="pro4-early-title">
        <div className="pro4-shell">
          <div className="pro4-early">
            <div>
              <span className="pro4-eyebrow">
                <i className="fas fa-bell" aria-hidden="true" />
                Accès anticipé
              </span>
              <h2 className="pro4-sectitle" id="pro4-early-title">
                Soyez parmi les premiers.
              </h2>
              <p className="pro4-secsub">
                Créez dès maintenant votre profil vérifié et soyez informé en
                priorité dès que la prise de rendez-vous en ligne sera disponible.
              </p>
              <ul className="pro4-early__steps">
                <li className="pro4-early__step">
                  <span className="pro4-early__num" aria-hidden="true">1</span>
                  Enregistrez votre intérêt en quelques minutes.
                </li>
                <li className="pro4-early__step">
                  <span className="pro4-early__num" aria-hidden="true">2</span>
                  Nous validons votre inscription et votre spécialité.
                </li>
                <li className="pro4-early__step">
                  <span className="pro4-early__num" aria-hidden="true">3</span>
                  Vous êtes parmi les premiers à activer la prise de rendez-vous &laquo;&nbsp;bientôt&nbsp;&raquo;.
                </li>
              </ul>
            </div>

            <div className="pro4-early__card">
              <h3>Liste d’accès</h3>
              <p>
                Gratuit et sans engagement. Nous vous contactons dès que de nouvelles
                places s’ouvrent dans votre région.
              </p>
              <a className="pro4-btn pro4-btn--primary" href="#pro4-cta">
                Rejoindre la liste
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </a>
              <p className="pro4-early__fineprint">
                <i className="fas fa-lock" aria-hidden="true" /> Vos données restent protégées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="pro4-section" aria-labelledby="pro4-cta-title" id="pro4-cta">
        <div className="pro4-shell">
          <div className="pro4-cta">
            <span className="pro4-cta__eyebrow">
              <i className="fas fa-globe-europe" aria-hidden="true" />
              Santé au Portugal &middot; PT &middot; FR &middot; EN
            </span>
            <h2 className="pro4-cta__title" id="pro4-cta-title">
              Commencez à mesurer votre <span className="pro4-hl">retour</span> aujourd’hui.
            </h2>
            <p className="pro4-cta__sub">
              Rejoignez DocAgora, créez votre profil vérifié gratuitement et
              préparez-vous à la prise de rendez-vous en ligne &laquo;&nbsp;bientôt&nbsp;&raquo;.
            </p>
            <div className="pro4-cta__actions">
              <a className="pro4-btn pro4-btn--light" href="#pro4-early">
                Créer mon profil gratuit
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </a>
              <a className="pro4-btn pro4-btn--outline-light" href="#pro4-compare">
                Revoir avant / après
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pro4-footer" aria-label="Pied de page">
        <div className="pro4-shell">
          <div className="pro4-footer__top">
            <div className="pro4-footer__brand">
              <span className="pro4-footer__logo">
                DocAgora<b>Pro</b>
              </span>
              <p className="pro4-footer__tag">
                La plateforme qui met en relation les patients et les professionnels
                de santé vérifiés au Portugal. Recherche gratuite, en PT, FR et EN.
              </p>
            </div>
            <div className="pro4-footer__cols">
              <div>
                <p className="pro4-footer__coltitle">Plateforme</p>
                <ul className="pro4-footer__nav">
                  <li><a href="#pro4-numbers">Retour</a></li>
                  <li><a href="#pro4-features">Fonctionnalités</a></li>
                  <li><a href="#pro4-early">Accès anticipé</a></li>
                </ul>
              </div>
              <div>
                <p className="pro4-footer__coltitle">Ressources</p>
                <ul className="pro4-footer__nav">
                  <li><a href="#pro4-compare">Avant / Après</a></li>
                  <li><a href="#pro4-top">Pour les professionnels</a></li>
                  <li><Link href="/variants">Variantes</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pro4-footer__bottom">
            <span>&copy; {new Date().getFullYear()} DocAgora &middot; Variante &laquo; Retour &raquo;</span>
            <span>
              <a href="#pro4-top">Retour en haut</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
