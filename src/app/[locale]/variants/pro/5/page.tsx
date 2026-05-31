"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * /variants/pro/5 — "Fondateurs"
 * Direction artistique : carte de membership / invitation exclusive. Dark premium,
 * accents teal "foil" estampés, numéros de série mono, perforations, rareté
 * élégante. Hero = grande carte FOUNDING MEMBER avec tilt 3D et shine sweep.
 * Page interne (showcase). Contenu illustratif. Prise de RDV en ligne "bientôt".
 */

/* ── Sub-componente: SVG do logo DocAgora (marca + monograma) ─────────────── */
function FoilMark() {
  return (
    <svg
      className="pro5-mark"
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 4 L41 13 V35 L24 44 L7 35 V13 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <path
        d="M24 14 v20 M16 24 h16"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="3.4" fill="currentColor" />
    </svg>
  );
}

/* ── Sub-componente: ícone de benefício (desenhado em SVG) ────────────────── */
type BenefitIcon = "onboarding" | "lifetime" | "team";

function BenefitGlyph({ kind }: { kind: BenefitIcon }) {
  if (kind === "onboarding") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.5 12l1.7 1.7L15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "lifetime") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 21s-7-4.6-7-9.7A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7 3.3C19 16.4 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8.5 11.5h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M14.5 19a4.5 4.5 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ── Dados (todos ILUSTRATIVOS) ───────────────────────────────────────────── */
const BENEFITS: { icon: BenefitIcon; title: string; body: string }[] = [
  {
    icon: 'onboarding',
    title: 'Accompagnement dédié',
    body: 'Suivi individuel pour créer votre profil vérifié et complet, à votre rythme.',
  },
  {
    icon: 'lifetime',
    title: 'Remise à vie',
    body: 'Tarif fondateur préservé pour toujours lorsque nous lancerons les fonctionnalités payantes.',
  },
  {
    icon: 'team',
    title: 'Accès direct à l’équipe',
    body: 'Ligne ouverte avec l’équipe produit. Vos idées façonnent ce que nous construisons ensuite.',
  },
];

const TIMELINE: { tag: string; title: string; body: string; active?: boolean }[] = [
  {
    tag: 'AUJOURD’HUI',
    title: 'Profils fondateurs',
    body: 'Réservez votre place et construisez un profil vérifié, visible dans la recherche gratuite.',
    active: true,
  },
  {
    tag: 'ENSUITE',
    title: 'Visibilité renforcée',
    body: 'Mise en avant par spécialité et ville pour les premiers professionnels à rejoindre la plateforme.',
  },
  {
    tag: 'BIENTÔT',
    title: 'Prise de rendez-vous en ligne',
    body: 'La prise de rendez-vous arrive progressivement. Les fondateurs entrent en premier.',
  },
];

const INCLUDED: string[] = [
  'Profil professionnel vérifié',
  'Présence dans 16 spécialités',
  'Visible en PT, FR et EN',
  'Badge membre fondateur',
  'Numéro de place réservé',
  'Invitation au programme bêta',
];

export default function ProVariant5() {
  const [claimed, setClaimed] = useState(false);

  return (
    <main className="pro5">
      <style>{`
        .pro5 {
          box-sizing: border-box;
          position: relative;
          min-height: 100vh;
          overflow-x: clip;
          font-family: var(--font-montserrat), system-ui, sans-serif;
          color: var(--color-light-1);
          background:
            radial-gradient(140% 90% at 12% -8%, rgba(var(--color-teal-rgb), 0.20) 0%, rgba(var(--color-teal-rgb), 0) 52%),
            radial-gradient(120% 100% at 92% 4%, rgba(var(--color-cobalt-rgb), 0.20) 0%, rgba(var(--color-cobalt-rgb), 0) 50%),
            linear-gradient(165deg, var(--color-dark-1) 0%, var(--color-dark-2) 100%);
        }
        .pro5 *, .pro5 *::before, .pro5 *::after { box-sizing: border-box; }
        .pro5 p, .pro5 h1, .pro5 h2, .pro5 h3, .pro5 ul, .pro5 li, .pro5 figure {
          margin: 0; padding: 0; line-height: 1.5; text-transform: none;
        }
        .pro5 ul { list-style: none; }

        /* grão atmosférico fixo */
        .pro5__grain {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.05;
          background-image: radial-gradient(rgba(255,255,255,0.8) 0.5px, transparent 0.5px);
          background-size: 3px 3px;
        }
        .pro5__inner { position: relative; z-index: 2; width: 100%; max-width: 1140px; margin: 0 auto; padding: 0 24px; }

        /* ── NAV ─────────────────────────────────────────────────────────── */
        .pro5-nav {
          position: relative; z-index: 5;
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 0;
        }
        .pro5-nav__brand {
          display: inline-flex; align-items: center; gap: 11px;
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; font-size: 21px; letter-spacing: -0.01em; color: var(--color-light-1);
          text-decoration: none;
        }
        .pro5-nav__brand .pro5-mark { color: var(--color-teal); flex: none; }
        .pro5-nav__back {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
          color: rgba(255,255,255,0.62); text-decoration: none;
          padding: 9px 15px; border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
          transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .pro5-nav__back:hover { color: var(--color-light-1); border-color: rgba(var(--color-teal-rgb), 0.55); transform: translateX(-3px); }
        .pro5-nav__back:focus-visible { outline: 2px solid var(--color-teal); outline-offset: 3px; }

        /* ── HERO ────────────────────────────────────────────────────────── */
        .pro5-hero {
          display: grid; grid-template-columns: 1.05fr 0.95fr; gap: clamp(36px, 5vw, 72px);
          align-items: center;
          padding: clamp(40px, 7vh, 84px) 0 clamp(56px, 9vh, 110px);
        }
        .pro5-hero__copy { max-width: 30rem; }
        .pro5-eyebrow {
          display: inline-flex; align-items: center; gap: 11px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 11.5px; letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--color-teal); margin-bottom: 24px;
        }
        .pro5-eyebrow i { display: block; width: 34px; height: 1px; background: linear-gradient(90deg, var(--color-teal), transparent); }
        .pro5-hero__title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; letter-spacing: -0.02em; line-height: 1.02;
          font-size: clamp(40px, 6vw, 72px); color: var(--color-light-1);
        }
        .pro5-hero__title em {
          font-style: italic;
          background: linear-gradient(100deg, var(--color-teal) 0%, var(--color-mint) 45%, #d8fffb 70%, var(--color-teal) 100%);
          background-size: 220% 100%;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: pro5-foil 7s ease-in-out infinite;
        }
        .pro5-hero__lead {
          margin-top: 22px; font-size: clamp(15px, 1.6vw, 17.5px); line-height: 1.7;
          color: rgba(255,255,255,0.68);
        }
        .pro5-hero__cta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-top: 34px; }
        .pro5-scarce {
          margin-top: 26px; display: inline-flex; align-items: center; gap: 10px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px; letter-spacing: 0.04em; color: rgba(255,255,255,0.55);
        }
        .pro5-scarce__dot {
          width: 8px; height: 8px; border-radius: 50%; flex: none;
          background: var(--color-teal); box-shadow: 0 0 0 0 rgba(var(--color-teal-rgb), 0.6);
          animation: pro5-pulse 2.4s ease-out infinite;
        }
        .pro5-scarce b { color: var(--color-teal); font-weight: 600; }

        /* botões */
        .pro5-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 15px; font-weight: 600; letter-spacing: 0.01em; text-transform: none;
          min-height: 50px; padding: 0 26px; border-radius: 50px;
          text-decoration: none; cursor: pointer; border: 1px solid transparent;
          transition: transform 0.25s ease, box-shadow 0.3s ease, background 0.3s ease, color 0.25s ease;
        }
        .pro5-btn--foil {
          color: var(--color-dark-2);
          background: linear-gradient(105deg, var(--color-teal) 0%, var(--color-mint) 50%, #c9fffb 75%, var(--color-teal) 100%);
          background-size: 220% 100%;
          box-shadow: 0 16px 38px -16px rgba(var(--color-teal-rgb), 0.75);
          animation: pro5-foil 6s ease-in-out infinite;
        }
        .pro5-btn--foil:hover { transform: translateY(-2px); box-shadow: 0 22px 48px -16px rgba(var(--color-teal-rgb), 0.9); }
        .pro5-btn--ghost {
          color: var(--color-light-1);
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.18);
        }
        .pro5-btn--ghost:hover { transform: translateY(-2px); border-color: rgba(var(--color-teal-rgb), 0.6); color: var(--color-teal); }
        .pro5-btn:focus-visible { outline: 2px solid var(--color-teal); outline-offset: 3px; }
        .pro5-btn svg { flex: none; }

        /* ── CARTÃO DE MEMBERSHIP (peça central) ─────────────────────────── */
        .pro5-cardwrap { perspective: 1200px; display: flex; justify-content: center; }
        .pro5-card {
          --rx: 0deg; --ry: 0deg;
          position: relative; width: 100%; max-width: 420px; aspect-ratio: 1.586 / 1;
          border-radius: 22px; padding: clamp(20px, 3.4vw, 30px);
          color: var(--color-light-1);
          background:
            radial-gradient(120% 130% at 85% -10%, rgba(var(--color-teal-rgb), 0.30) 0%, rgba(var(--color-teal-rgb), 0) 55%),
            linear-gradient(150deg, #16243d 0%, #0b1322 55%, #070c16 100%);
          border: 1px solid rgba(var(--color-teal-rgb), 0.30);
          box-shadow:
            0 50px 90px -38px rgba(0,0,0,0.85),
            inset 0 1px 0 rgba(255,255,255,0.10);
          transform: rotateX(var(--rx)) rotateY(var(--ry));
          transform-style: preserve-3d;
          transition: transform 0.18s ease-out, box-shadow 0.4s ease;
          overflow: hidden; isolation: isolate;
          animation: pro5-card-in 1s cubic-bezier(0.22,1,0.36,1) both;
        }
        /* textura guilloché sutil */
        .pro5-card::before {
          content: ""; position: absolute; inset: 0; z-index: 0; opacity: 0.5;
          background-image:
            repeating-linear-gradient(115deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 7px),
            repeating-linear-gradient(65deg, rgba(var(--color-teal-rgb),0.05) 0 1px, transparent 1px 9px);
          mask-image: radial-gradient(120% 120% at 80% 0%, #000 30%, transparent 78%);
          -webkit-mask-image: radial-gradient(120% 120% at 80% 0%, #000 30%, transparent 78%);
        }
        /* shine sweep */
        .pro5-card::after {
          content: ""; position: absolute; top: -60%; left: -40%; width: 60%; height: 220%;
          z-index: 4; pointer-events: none;
          background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.40) 50%, transparent 100%);
          transform: rotate(8deg) translateX(-30%);
          animation: pro5-shine 5.5s cubic-bezier(0.5,0,0.1,1) infinite;
          mix-blend-mode: screen;
        }
        .pro5-card > * { position: relative; z-index: 2; }

        .pro5-card__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
        .pro5-card__brand {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: 18px;
        }
        .pro5-card__brand .pro5-mark { color: var(--color-teal); flex: none; }
        .pro5-card__tier {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 9.5px; letter-spacing: 0.24em; text-transform: uppercase;
          padding: 5px 10px; border-radius: 50px; white-space: nowrap;
          color: var(--color-teal);
          border: 1px solid rgba(var(--color-teal-rgb), 0.45);
          background: rgba(var(--color-teal-rgb), 0.08);
        }
        /* chip / puce */
        .pro5-card__chip {
          margin-top: clamp(20px, 4vw, 34px);
          width: 50px; height: 38px; border-radius: 8px;
          background: linear-gradient(135deg, #cfe9e6, #7fb9b4 55%, #4e8c88);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.4);
          position: relative;
        }
        .pro5-card__chip::before, .pro5-card__chip::after {
          content: ""; position: absolute; background: rgba(0,0,0,0.28);
        }
        .pro5-card__chip::before { left: 0; right: 0; top: 50%; height: 1px; }
        .pro5-card__chip::after { top: 0; bottom: 0; left: 33%; width: 1px; box-shadow: 16px 0 0 rgba(0,0,0,0.28); }
        .pro5-card__role {
          margin-top: clamp(16px, 3vw, 26px);
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .pro5-card__serial {
          margin-top: 4px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: clamp(20px, 3.6vw, 30px); letter-spacing: 0.10em; font-weight: 600;
          color: var(--color-light-1);
        }
        .pro5-card__foot { margin-top: auto; padding-top: clamp(14px, 3vw, 22px); display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; }
        .pro5-card__since {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 9.5px; letter-spacing: 0.18em; color: rgba(255,255,255,0.45);
        }
        .pro5-card__since b { display: block; color: rgba(255,255,255,0.82); font-size: 12px; margin-top: 3px; letter-spacing: 0.1em; }
        .pro5-card__holo {
          width: 46px; height: 46px; border-radius: 11px; flex: none;
          background:
            conic-gradient(from 210deg, rgba(var(--color-teal-rgb),0.9), rgba(var(--color-cobalt-rgb),0.7), rgba(var(--color-mint-rgb),0.9), rgba(var(--color-teal-rgb),0.9));
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25);
          display: grid; place-items: center; color: var(--color-dark-2);
        }
        /* perfurações no topo do cartão */
        .pro5-card__perf {
          position: absolute; top: 0; left: 0; right: 0; height: 14px; z-index: 5;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .pro5-card__perf span { width: 5px; height: 5px; border-radius: 50%; background: rgba(7,12,22,0.9); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08); }

        /* ── secções genéricas ───────────────────────────────────────────── */
        .pro5-sec { padding: clamp(56px, 9vh, 104px) 0; position: relative; z-index: 2; }
        .pro5-sec--rule { border-top: 1px solid rgba(255,255,255,0.08); }
        .pro5-sec__kicker {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--color-teal); margin-bottom: 14px;
        }
        .pro5-sec__title {
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          letter-spacing: -0.02em; line-height: 1.08;
          font-size: clamp(28px, 4vw, 46px); color: var(--color-light-1); max-width: 18ch;
        }
        .pro5-sec__title em { font-style: italic; color: var(--color-teal); }
        .pro5-sec__lead { margin-top: 16px; font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.62); max-width: 56ch; }

        /* benefícios */
        .pro5-benefits { margin-top: 46px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .pro5-benefit {
          position: relative; padding: 28px 24px 26px; border-radius: 18px; overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018));
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow: 0 24px 50px -34px rgba(0,0,0,0.8);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .pro5-benefit:hover { transform: translateY(-6px); border-color: rgba(var(--color-teal-rgb), 0.45); box-shadow: 0 34px 64px -34px rgba(var(--color-teal-rgb), 0.4); }
        .pro5-benefit__num {
          font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 11px;
          letter-spacing: 0.16em; color: rgba(255,255,255,0.4);
        }
        .pro5-benefit__ico {
          margin: 14px 0 18px; width: 50px; height: 50px; border-radius: 14px;
          display: grid; place-items: center; color: var(--color-teal);
          background: rgba(var(--color-teal-rgb), 0.10);
          border: 1px solid rgba(var(--color-teal-rgb), 0.28);
        }
        .pro5-benefit__title { font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: 21px; color: var(--color-light-1); margin-bottom: 8px; }
        .pro5-benefit__body { font-size: 14.5px; line-height: 1.65; color: rgba(255,255,255,0.62); }

        /* timeline / escassez */
        .pro5-why { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(32px, 5vw, 64px); align-items: start; }
        .pro5-timeline { display: grid; gap: 18px; margin-top: 6px; }
        .pro5-step {
          position: relative; padding: 22px 24px 22px 56px; border-radius: 16px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .pro5-step::before {
          content: ""; position: absolute; left: 24px; top: 26px; width: 12px; height: 12px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3); background: var(--color-dark-1);
        }
        .pro5-step::after {
          content: ""; position: absolute; left: 29px; top: 42px; bottom: -18px; width: 2px;
          background: linear-gradient(rgba(255,255,255,0.18), transparent);
        }
        .pro5-step:last-child::after { display: none; }
        .pro5-step--active { border-color: rgba(var(--color-teal-rgb), 0.45); background: rgba(var(--color-teal-rgb), 0.07); }
        .pro5-step--active::before { border-color: var(--color-teal); background: var(--color-teal); box-shadow: 0 0 14px rgba(var(--color-teal-rgb), 0.8); }
        .pro5-step__tag {
          font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 10px;
          letter-spacing: 0.22em; text-transform: uppercase; color: var(--color-teal); margin-bottom: 6px;
        }
        .pro5-step__title { font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: 19px; color: var(--color-light-1); margin-bottom: 5px; }
        .pro5-step__body { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.6); }
        .pro5-gauge {
          margin-top: 24px; padding: 22px; border-radius: 16px;
          background: linear-gradient(180deg, rgba(var(--color-teal-rgb),0.08), rgba(255,255,255,0.02));
          border: 1px solid rgba(var(--color-teal-rgb), 0.22);
        }
        .pro5-gauge__row { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
        .pro5-gauge__big {
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: clamp(30px, 4vw, 44px); color: var(--color-teal); letter-spacing: -0.02em;
        }
        .pro5-gauge__label { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 11px; letter-spacing: 0.14em; color: rgba(255,255,255,0.55); text-transform: uppercase; }
        .pro5-gauge__track { margin-top: 14px; height: 8px; border-radius: 50px; background: rgba(255,255,255,0.08); overflow: hidden; }
        .pro5-gauge__fill {
          height: 100%; width: 64%; border-radius: 50px;
          background: linear-gradient(90deg, var(--color-cobalt), var(--color-teal), var(--color-mint));
          background-size: 200% 100%; animation: pro5-foil 6s ease-in-out infinite;
        }
        .pro5-gauge__note { margin-top: 12px; font-size: 12px; color: rgba(255,255,255,0.45); }

        /* incluído */
        .pro5-incl { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 28px; margin-top: 40px; max-width: 760px; }
        .pro5-incl li {
          display: flex; align-items: center; gap: 14px;
          font-size: 15.5px; color: rgba(255,255,255,0.86);
          padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .pro5-incl__check {
          flex: none; width: 26px; height: 26px; border-radius: 50%;
          display: grid; place-items: center; color: var(--color-dark-2);
          background: linear-gradient(135deg, var(--color-teal), var(--color-mint));
          box-shadow: 0 4px 12px -4px rgba(var(--color-teal-rgb), 0.8);
        }

        /* ── CTA FINAL ───────────────────────────────────────────────────── */
        .pro5-cta {
          position: relative; overflow: hidden; text-align: center;
          padding: clamp(48px, 8vw, 80px) clamp(24px, 5vw, 64px);
          border-radius: 28px;
          background:
            radial-gradient(120% 130% at 50% -10%, rgba(var(--color-teal-rgb), 0.22) 0%, rgba(var(--color-teal-rgb), 0) 60%),
            linear-gradient(150deg, #16243d, #070c16);
          border: 1px solid rgba(var(--color-teal-rgb), 0.30);
          box-shadow: 0 50px 100px -50px rgba(var(--color-teal-rgb), 0.5);
        }
        .pro5-cta::after {
          content: ""; position: absolute; top: -60%; left: -30%; width: 50%; height: 220%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.18) 50%, transparent);
          transform: rotate(8deg); animation: pro5-shine 6s cubic-bezier(0.5,0,0.1,1) infinite;
          mix-blend-mode: screen; pointer-events: none;
        }
        .pro5-cta > * { position: relative; z-index: 2; }
        .pro5-cta__title {
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: clamp(28px, 4.4vw, 50px); letter-spacing: -0.02em; line-height: 1.05;
          color: var(--color-light-1); margin: 0 auto; max-width: 18ch;
        }
        .pro5-cta__title em { font-style: italic; color: var(--color-teal); }
        .pro5-cta__lead { margin: 18px auto 30px; max-width: 50ch; font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.7); }
        .pro5-cta__row { display: inline-flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
        .pro5-cta__ok {
          display: inline-flex; align-items: center; gap: 10px; min-height: 50px; padding: 0 26px;
          border-radius: 50px; font-size: 15px; font-weight: 600; color: var(--color-teal);
          border: 1px solid rgba(var(--color-teal-rgb), 0.5); background: rgba(var(--color-teal-rgb), 0.10);
        }
        .pro5-cta__note {
          margin-top: 22px; font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 11.5px; letter-spacing: 0.06em; color: rgba(255,255,255,0.45);
        }

        /* footer */
        .pro5-foot {
          position: relative; z-index: 2; margin-top: clamp(40px, 7vh, 72px);
          padding: 34px 0 56px; border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: space-between; gap: 18px; flex-wrap: wrap;
        }
        .pro5-foot__brand { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: 18px; color: var(--color-light-1); }
        .pro5-foot__brand .pro5-mark { color: var(--color-teal); }
        .pro5-foot__note { font-size: 12.5px; line-height: 1.6; color: rgba(255,255,255,0.45); max-width: 60ch; }
        .pro5-foot__note b { color: rgba(255,255,255,0.7); font-weight: 600; }

        /* reveal em cascata */
        .pro5-reveal { animation: pro5-rise 0.8s cubic-bezier(0.22,1,0.36,1) both; }

        /* ── keyframes ───────────────────────────────────────────────────── */
        @keyframes pro5-foil { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pro5-shine {
          0% { transform: rotate(8deg) translateX(-30%); opacity: 0; }
          12% { opacity: 1; }
          55% { transform: rotate(8deg) translateX(380%); opacity: 0; }
          100% { transform: rotate(8deg) translateX(380%); opacity: 0; }
        }
        @keyframes pro5-card-in { from { opacity: 0; transform: translateY(34px) rotateX(8deg); } to { opacity: 1; transform: translateY(0) rotateX(0); } }
        @keyframes pro5-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pro5-pulse {
          0% { box-shadow: 0 0 0 0 rgba(var(--color-teal-rgb), 0.55); }
          70% { box-shadow: 0 0 0 9px rgba(var(--color-teal-rgb), 0); }
          100% { box-shadow: 0 0 0 0 rgba(var(--color-teal-rgb), 0); }
        }

        /* ── responsive ──────────────────────────────────────────────────── */
        @media (max-width: 960px) {
          .pro5-hero { grid-template-columns: 1fr; gap: 44px; }
          .pro5-hero__copy { max-width: 100%; order: 2; }
          .pro5-cardwrap { order: 1; }
          .pro5-why { grid-template-columns: 1fr; }
        }
        @media (max-width: 760px) {
          .pro5-benefits { grid-template-columns: 1fr; }
          .pro5-incl { grid-template-columns: 1fr; }
        }
        @media (max-width: 420px) {
          .pro5-nav { flex-wrap: wrap; gap: 12px; }
          .pro5-hero__cta { gap: 12px; }
          .pro5-btn { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pro5-hero__title em, .pro5-btn--foil, .pro5-gauge__fill { animation: none; background-position: 0 0; }
          .pro5-card, .pro5-reveal { animation: none; }
          .pro5-card { transform: none !important; }
          .pro5-card::after, .pro5-cta::after { display: none; }
          .pro5-scarce__dot { animation: none; }
          .pro5-btn:hover, .pro5-benefit:hover, .pro5-nav__back:hover { transform: none; }
        }
      `}</style>

      <div className="pro5__grain" aria-hidden="true" />

      <div className="pro5__inner">
        {/* NAV */}
        <nav className="pro5-nav" aria-label="Navigation de la variante">
          <a className="pro5-nav__brand" href="#pro5-top">
            <FoilMark />
            DocAgora
          </a>
          <Link className="pro5-nav__back" href="/variants">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            ← Variantes
          </Link>
        </nav>

        {/* HERO */}
        <section className="pro5-hero" id="pro5-top" aria-labelledby="pro5-h1">
          <div className="pro5-hero__copy pro5-reveal" style={{ animationDelay: "60ms" }}>
            <span className="pro5-eyebrow"><i aria-hidden="true" /> Accès fondateur</span>
            <h1 className="pro5-hero__title" id="pro5-h1">
              Rejoignez les <em>fondateurs</em> de DocAgora.
            </h1>
            <p className="pro5-hero__lead">
              Avant le grand lancement, nous réservons un nombre limité de places aux premiers
              professionnels de santé. Construisez un profil vérifié, gagnez en visibilité dans la
              recherche gratuite et contribuez à façonner la plateforme. La prise de rendez-vous en
              ligne arrive {"«"} bientôt {"»"}.
            </p>
            <div className="pro5-hero__cta">
              <a className="pro5-btn pro5-btn--foil" href="#pro5-claim">
                Réserver ma place
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a className="pro5-btn pro5-btn--ghost" href="#pro5-benefits">
                Ce que je reçois
              </a>
            </div>
            <p className="pro5-scarce">
              <span className="pro5-scarce__dot" aria-hidden="true" />
              Places fondateurs <b>limitées</b> <span aria-hidden="true">·</span> nombre illustratif
            </p>
          </div>

          {/* CARTÃO 3D */}
          <div className="pro5-cardwrap pro5-reveal" style={{ animationDelay: "150ms" }}>
            <TiltCard />
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="pro5-sec pro5-sec--rule" id="pro5-benefits" aria-labelledby="pro5-benefits-h">
          <div className="pro5-reveal">
            <p className="pro5-sec__kicker">Ce que vous recevez</p>
            <h2 className="pro5-sec__title" id="pro5-benefits-h">
              Des avantages réservés à ceux qui <em>arrivent en premier</em>.
            </h2>
            <p className="pro5-sec__lead">
              Être fondateur n’est pas un badge décoratif. C’est un ensemble concret d’avantages
              qui accompagnent votre profil à mesure que la plateforme grandit.
            </p>
          </div>
          <div className="pro5-benefits">
            {BENEFITS.map((b, i) => (
              <article
                className="pro5-benefit pro5-reveal"
                key={b.title}
                style={{ animationDelay: `${180 + i * 80}ms` }}
              >
                <span className="pro5-benefit__num">0{i + 1} / 03</span>
                <span className="pro5-benefit__ico"><BenefitGlyph kind={b.icon} /></span>
                <h3 className="pro5-benefit__title">{b.title}</h3>
                <p className="pro5-benefit__body">{b.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* PORQUÊ AGORA */}
        <section className="pro5-sec pro5-sec--rule" aria-labelledby="pro5-why-h">
          <div className="pro5-why">
            <div className="pro5-reveal">
              <p className="pro5-sec__kicker">Pourquoi maintenant</p>
              <h2 className="pro5-sec__title" id="pro5-why-h">
                Les places fondateurs <em>n’ouvrent qu’une fois</em>.
              </h2>
              <p className="pro5-sec__lead">
                Nous construisons lentement et avec soin. Les premiers professionnels bénéficient
                de conditions qui ne se reproduiront pas lorsque la plateforme ouvrira au grand
                public.
              </p>
              <div className="pro5-gauge" aria-label="Indicateur illustratif de places">
                <div className="pro5-gauge__row">
                  <span className="pro5-gauge__big">N° 00&mdash;01</span>
                  <span className="pro5-gauge__label">Lot fondateur</span>
                </div>
                <div className="pro5-gauge__track" aria-hidden="true">
                  <span className="pro5-gauge__fill" />
                </div>
                <p className="pro5-gauge__note">*Indicateur purement illustratif, sans valeur contractuelle.</p>
              </div>
            </div>

            <ol className="pro5-timeline pro5-reveal" style={{ animationDelay: "120ms" }}>
              {TIMELINE.map((s) => (
                <li className={`pro5-step${s.active ? " pro5-step--active" : ""}`} key={s.title}>
                  <p className="pro5-step__tag">{s.tag}</p>
                  <h3 className="pro5-step__title">{s.title}</h3>
                  <p className="pro5-step__body">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* O QUE ESTÁ INCLUÍDO */}
        <section className="pro5-sec pro5-sec--rule" aria-labelledby="pro5-incl-h">
          <div className="pro5-reveal">
            <p className="pro5-sec__kicker">Ce qui est inclus</p>
            <h2 className="pro5-sec__title" id="pro5-incl-h">
              Tout ce qu’il vous faut pour <em>bien démarrer</em>.
            </h2>
          </div>
          <ul className="pro5-incl pro5-reveal" style={{ animationDelay: "120ms" }}>
            {INCLUDED.map((item) => (
              <li key={item}>
                <span className="pro5-incl__check" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA FINAL */}
        <section className="pro5-sec" id="pro5-claim" aria-labelledby="pro5-cta-h">
          <div className="pro5-cta pro5-reveal">
            <h2 className="pro5-cta__title" id="pro5-cta-h">
              Réclamez votre <em>place fondateur</em>.
            </h2>
            <p className="pro5-cta__lead">
              Sans frais et sans engagement. Manifestez votre intérêt et nous vous contacterons
              pour l’accompagnement. La prise de rendez-vous en ligne reste {"«"} bientôt {"»"}.
            </p>
            <div className="pro5-cta__row">
              {claimed ? (
                <span className="pro5-cta__ok" role="status">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Demande enregistrée &mdash; nous vous recontactons bientôt
                </span>
              ) : (
                <>
                  <button type="button" className="pro5-btn pro5-btn--foil" onClick={() => setClaimed(true)}>
                    Réclamer ma place
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <a className="pro5-btn pro5-btn--ghost" href="#pro5-benefits">Revoir les avantages</a>
                </>
              )}
            </div>
            <p className="pro5-cta__note">RECHERCHE GRATUITE · PROFESSIONNELS VÉRIFIÉS · PT · FR · EN</p>
          </div>

          <footer className="pro5-foot">
            <span className="pro5-foot__brand"><FoilMark /> DocAgora</span>
            <p className="pro5-foot__note">
              <b>Showcase interne.</b> Numéros, places et statuts fondateur sont illustratifs et
              sans valeur contractuelle. Aucune promesse de téléconsultation, paiement, ordonnance
              ou remboursement. La prise de rendez-vous en ligne est indiquée comme {"«"} bientôt {"»"}.
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}

/* ── Cartão com tilt 3D (estado local de interação) ──────────────────────── */
function TiltCard() {
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const MAX = 9;
    setTilt({ rx: -py * MAX, ry: px * MAX });
  }

  function reset() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <figure
      className="pro5-card"
      style={{ ["--rx" as string]: `${tilt.rx}deg`, ["--ry" as string]: `${tilt.ry}deg` }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      aria-label="Carte membre fondateur DocAgora, numéro de place zéro zéro un, illustratif"
    >
      <span className="pro5-card__perf" aria-hidden="true">
        <span /><span /><span /><span /><span /><span /><span />
      </span>
      <div className="pro5-card__head">
        <span className="pro5-card__brand"><FoilMark /> DocAgora</span>
        <span className="pro5-card__tier">Founding member</span>
      </div>
      <span className="pro5-card__chip" aria-hidden="true" />
      <p className="pro5-card__role">Place fondateur</p>
      <p className="pro5-card__serial">N° 00&mdash;01</p>
      <div className="pro5-card__foot">
        <span className="pro5-card__since">
          Membre depuis
          <b>2026</b>
        </span>
        <span className="pro5-card__holo" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 3l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16l-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3Z" fill="currentColor" />
          </svg>
        </span>
      </div>
    </figure>
  );
}
