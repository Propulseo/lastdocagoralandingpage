"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/** Style helper : permet d’injecter une variable CSS custom (--pat2-d)
 *  tout en restant compatible avec le typage strict de CSSProperties. */
function delay(ms: number, extra?: CSSProperties): CSSProperties {
  return { "--pat2-d": `${ms}ms`, ...extra } as CSSProperties;
}

/* ------------------------------------------------------------------ */
/*  DocAgora — Variante Patient 2 : « Histoires de Santé »            */
/*  Direction artistique : éditorial chaleureux & humain,             */
/*  esprit magazine premium. Fraunces dominant, navy profond,         */
/*  teal en accent discret, fonds crème.                              */
/* ------------------------------------------------------------------ */

type Especialidade = {
  num: string;
  nome: string;
  nota: string;
};

type PullQuote = {
  texto: string;
  autor: string;
  contexto: string;
};

const ESPECIALIDADES: Especialidade[] = [
  { num: '01', nome: 'Médecine Générale', nota: 'Famille' },
  { num: '02', nome: 'Pédiatrie', nota: 'Enfants' },
  { num: '03', nome: 'Dermatologie', nota: 'Peau' },
  { num: '04', nome: 'Cardiologie', nota: 'Cœur' },
  { num: '05', nome: 'Gynécologie', nota: 'Femme' },
  { num: '06', nome: 'Ophtalmologie', nota: 'Vision' },
  { num: '07', nome: 'Psychologie', nota: 'Esprit' },
  { num: '08', nome: 'Orthopédie', nota: 'Os & Articulations' },
  { num: '09', nome: 'Oto-rhino-laryngologie', nota: 'ORL' },
  { num: '10', nome: 'Endocrinologie', nota: 'Hormones' },
  { num: '11', nome: 'Urologie', nota: 'Rénal' },
  { num: '12', nome: 'Gastro-entérologie', nota: 'Digestif' },
  { num: '13', nome: 'Neurologie', nota: 'Système nerveux' },
  { num: '14', nome: 'Pneumologie', nota: 'Respiration' },
  { num: '15', nome: 'Rhumatologie', nota: 'Articulations' },
  { num: '16', nome: 'Médecine Dentaire', nota: 'Sourire' },
];

const PULL_QUOTES: PullQuote[] = [
  {
    texto:
      'J’ai trouvé une médecin qui parle français près de chez moi. Je me suis sentie écoutée dès la première minute.',
    autor: 'Hélène M.',
    contexto: 'Cascais, exemple illustratif',
  },
  {
    texto:
      'Chercher en portugais, en anglais ou en français a tout changé. Ce n’était plus un labyrinthe.',
    autor: 'James O.',
    contexto: 'Porto, exemple illustratif',
  },
  {
    texto:
      'Voir les professionnels vérifiés avant de les contacter m’a apporté une sérénité que je n’avais pas.',
    autor: 'Sofia R.',
    contexto: 'Lisbonne, exemple illustratif',
  },
];

/* Petites icônes SVG inline (stroke = currentColor) -----------------*/
function IconShield() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  );
}

function IconFree() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.2c-.5-1-1.5-1.6-2.5-1.6-1.6 0-2.6 1-2.6 2.1 0 2.8 5.4 1.6 5.4 4.4 0 1.2-1.1 2.2-2.8 2.2-1.2 0-2.2-.6-2.7-1.6M12 6v1.6M12 16.4V18" />
    </svg>
  );
}

function IconQuote() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 10c-6 2.5-9 7.5-9 15v13h13V25h-7c0-4 1.5-6.5 6-8L18 10zm21 0c-6 2.5-9 7.5-9 15v13h13V25h-7c0-4 1.5-6.5 6-8L39 10z" />
    </svg>
  );
}

export default function PatientVariant2() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`pat2-root${ready ? " pat2-ready" : ""}`}>
      <style>{`
        .pat2-root, .pat2-root * { box-sizing: border-box; }
        .pat2-root {
          --pat2-cream: color-mix(in srgb, var(--color-light-1) 92%, var(--color-mint) 8%);
          --pat2-cream-2: color-mix(in srgb, var(--color-light-2) 88%, var(--color-mint) 12%);
          --pat2-ink: var(--color-navy);
          --pat2-ink-soft: rgba(var(--color-navy-rgb), 0.66);
          --pat2-line: rgba(var(--color-navy-rgb), 0.16);
          --pat2-accent: var(--color-teal);
          --pat2-max: 1180px;
          position: relative;
          width: 100%;
          overflow-x: hidden;
          background:
            radial-gradient(900px 700px at 88% -8%, rgba(var(--color-teal-rgb), 0.12), transparent 60%),
            radial-gradient(820px 620px at -6% 18%, rgba(var(--color-cobalt-rgb), 0.10), transparent 58%),
            var(--pat2-cream);
          color: var(--pat2-ink);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        /* grain subtil */
        .pat2-root::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.05;
          background-image: radial-gradient(rgba(var(--color-navy-rgb), 0.9) 0.5px, transparent 0.5px);
          background-size: 3px 3px;
          mix-blend-mode: multiply;
        }

        .pat2-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: var(--pat2-max);
          margin: 0 auto;
          padding-left: clamp(20px, 5vw, 48px);
          padding-right: clamp(20px, 5vw, 48px);
        }

        .pat2-root p, .pat2-root h1, .pat2-root h2, .pat2-root h3,
        .pat2-root ul, .pat2-root li, .pat2-root figure, .pat2-root blockquote {
          margin: 0;
          padding: 0;
          text-transform: none;
          line-height: inherit;
        }
        .pat2-root ul { list-style: none; }

        .pat2-serif {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
        }
        .pat2-label {
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-mint);
        }
        .pat2-mono {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
        }

        /* ----- focus ----- */
        .pat2-root a:focus-visible,
        .pat2-root button:focus-visible {
          outline: 2px solid var(--color-teal);
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* ----- reveal cascade ----- */
        .pat2-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
          transition-delay: var(--pat2-d, 0ms);
        }
        .pat2-ready .pat2-reveal { opacity: 1; transform: none; }

        /* ============ NAV ============ */
        .pat2-nav {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 22px 0 18px;
          border-bottom: 1px solid var(--pat2-line);
        }
        .pat2-brand {
          display: inline-flex;
          align-items: baseline;
          gap: 2px;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 1.4rem;
          color: var(--pat2-ink);
          text-decoration: none;
          letter-spacing: -0.01em;
        }
        .pat2-brand b { color: var(--color-teal); font-weight: 600; }
        .pat2-brand .pat2-dot { color: var(--color-mint); }
        .pat2-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--pat2-ink-soft);
          text-decoration: none;
          padding: 8px 4px;
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .pat2-back:hover { color: var(--color-teal); transform: translateX(-3px); }

        /* ============ HERO ============ */
        .pat2-hero { padding: clamp(48px, 8vw, 96px) 0 clamp(40px, 6vw, 72px); }
        .pat2-hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: clamp(20px, 3vw, 30px);
        }
        .pat2-hero-kicker .pat2-rule {
          width: 46px;
          height: 1px;
          background: var(--color-mint);
        }
        .pat2-hero-grid {
          display: grid;
          grid-template-columns: 1.18fr 0.82fr;
          gap: clamp(28px, 4vw, 56px);
          align-items: end;
        }
        .pat2-h1 {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(2.6rem, 8vw, 5.6rem);
          line-height: 0.98;
          letter-spacing: -0.02em;
          color: var(--pat2-ink);
        }
        .pat2-h1 em {
          font-style: italic;
          font-weight: 400;
          color: var(--color-teal);
        }
        .pat2-h1 .pat2-line2 { display: block; }
        .pat2-h1 .pat2-lingua {
          position: relative;
          display: inline-block;
          white-space: nowrap;
        }
        .pat2-h1 .pat2-lingua::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0.06em;
          height: 0.12em;
          background: linear-gradient(90deg,
            rgba(var(--color-teal-rgb), 0.95),
            rgba(var(--color-mint-rgb), 0.55));
          transform: scaleX(0);
          transform-origin: left;
          border-radius: 2px;
          transition: transform 1s ease 0.5s;
        }
        .pat2-ready .pat2-h1 .pat2-lingua::after { transform: scaleX(1); }

        .pat2-langflip {
          display: inline-flex;
          align-items: baseline;
          gap: 0.28em;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-style: italic;
          font-weight: 400;
        }
        .pat2-langflip span {
          color: var(--pat2-ink-soft);
          transition: color 0.4s ease, transform 0.4s ease;
        }
        .pat2-langflip span.is-on {
          color: var(--color-teal);
          transform: translateY(-0.06em);
        }
        .pat2-langflip i { font-style: normal; color: var(--pat2-line); }

        .pat2-hero-chapo {
          font-size: clamp(1rem, 1.6vw, 1.16rem);
          color: var(--pat2-ink-soft);
          max-width: 42ch;
          margin-top: clamp(22px, 3vw, 30px);
        }
        .pat2-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          margin-top: clamp(26px, 3vw, 34px);
        }
        .pat2-byline {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: clamp(28px, 3vw, 36px);
          padding-top: 18px;
          border-top: 1px solid var(--pat2-line);
        }
        .pat2-byline-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          flex-shrink: 0;
          background:
            radial-gradient(circle at 35% 30%, rgba(var(--color-teal-rgb), 0.9), transparent 60%),
            linear-gradient(135deg, var(--color-navy), var(--color-mint));
        }
        .pat2-byline p { font-size: 0.82rem; color: var(--pat2-ink-soft); }
        .pat2-byline strong {
          display: block;
          font-family: var(--font-fraunces), serif;
          font-size: 0.96rem;
          color: var(--pat2-ink);
          font-weight: 600;
        }

        /* ----- bouton (teal action) ----- */
        .pat2-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 48px;
          padding: 0 24px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-decoration: none;
          border-radius: 999px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease;
        }
        .pat2-btn-primary {
          background: var(--color-teal);
          color: var(--color-dark-1);
          box-shadow: 0 14px 30px -12px rgba(var(--color-teal-rgb), 0.7);
        }
        .pat2-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 38px -12px rgba(var(--color-teal-rgb), 0.8);
        }
        .pat2-btn-ghost {
          background: transparent;
          color: var(--pat2-ink);
          border-color: var(--pat2-line);
        }
        .pat2-btn-ghost:hover {
          border-color: var(--color-navy);
          transform: translateY(-2px);
        }
        .pat2-soon {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-mint);
          padding: 6px 12px;
          border: 1px solid var(--pat2-line);
          border-radius: 999px;
        }

        /* ----- visuel hero (photo duotone) ----- */
        .pat2-hero-visual {
          position: relative;
          aspect-ratio: 3 / 4;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 40px 80px -36px rgba(var(--color-navy-rgb), 0.55);
        }
        .pat2-hero-visual .pat2-photo {
          position: absolute;
          inset: 0;
          background-image: url("/assets/images/about/2.jpg");
          background-size: cover;
          background-position: center;
          filter: grayscale(1) contrast(1.05);
          transform: scale(1.04);
          transition: transform 8s ease;
        }
        .pat2-ready .pat2-hero-visual .pat2-photo { transform: scale(1); }
        .pat2-hero-visual .pat2-duo {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg,
            rgba(var(--color-navy-rgb), 0.82),
            rgba(var(--color-teal-rgb), 0.45));
          mix-blend-mode: multiply;
        }
        .pat2-hero-visual .pat2-tag {
          position: absolute;
          left: 16px;
          bottom: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 4px;
          background: rgba(var(--color-light-1-rgb, 252, 254, 254), 0.92);
          backdrop-filter: blur(6px);
        }
        .pat2-hero-visual .pat2-tag .pat2-mono { color: var(--pat2-ink); }
        .pat2-hero-visual .pat2-tag b {
          font-family: var(--font-fraunces), serif;
          color: var(--color-navy);
          font-size: 0.95rem;
          font-weight: 600;
        }

        /* ----- trust strip ----- */
        .pat2-trust {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 3vw, 40px);
          margin-top: clamp(40px, 5vw, 60px);
          padding-top: clamp(28px, 4vw, 40px);
          border-top: 1px solid var(--pat2-line);
        }
        .pat2-trust-item { display: flex; gap: 14px; align-items: flex-start; }
        .pat2-trust-item .pat2-ico {
          color: var(--color-teal);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .pat2-trust-item h3 {
          font-family: var(--font-fraunces), serif;
          font-size: 1.06rem;
          font-weight: 600;
          color: var(--pat2-ink);
          margin-bottom: 4px;
        }
        .pat2-trust-item p { font-size: 0.85rem; color: var(--pat2-ink-soft); }

        /* ============ SECTION TITLE ============ */
        .pat2-sec { padding: clamp(64px, 9vw, 120px) 0; }
        .pat2-sec-head { margin-bottom: clamp(36px, 5vw, 64px); }
        .pat2-secnum {
          display: inline-block;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          color: var(--color-mint);
          margin-bottom: 14px;
        }

        /* ============ MANIFESTO ============ */
        .pat2-manifesto {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 400;
          font-size: clamp(1.5rem, 3.4vw, 2.5rem);
          line-height: 1.32;
          letter-spacing: -0.01em;
          color: var(--pat2-ink);
          max-width: 24ch;
        }
        .pat2-manifesto-wrap {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: clamp(28px, 5vw, 72px);
          align-items: start;
        }
        .pat2-manifesto em { font-style: italic; color: var(--color-teal); }
        .pat2-dropcap::first-letter {
          float: left;
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 4.6em;
          line-height: 0.74;
          padding: 0.04em 0.12em 0 0;
          color: var(--color-teal);
        }
        .pat2-manifesto-body p {
          font-size: clamp(0.98rem, 1.4vw, 1.08rem);
          color: var(--pat2-ink-soft);
          margin-bottom: 1.1em;
        }
        .pat2-manifesto-body p:last-child { margin-bottom: 0; }
        .pat2-manifesto-note {
          margin-top: 22px;
          padding-top: 18px;
          border-top: 1px solid var(--pat2-line);
          font-size: 0.78rem;
          color: var(--pat2-ink-soft);
          font-style: italic;
        }

        /* ============ LÍNGUA ============ */
        .pat2-lingua-sec {
          position: relative;
          background:
            radial-gradient(700px 500px at 80% 0%, rgba(var(--color-teal-rgb), 0.16), transparent 60%),
            var(--color-dark-1);
          color: var(--color-light-1);
          border-radius: 8px;
          padding: clamp(48px, 7vw, 96px) clamp(24px, 5vw, 64px);
          overflow: hidden;
        }
        .pat2-lingua-sec .pat2-label { color: var(--color-teal); }
        .pat2-lingua-big {
          font-family: var(--font-fraunces), serif;
          font-weight: 500;
          font-size: clamp(2rem, 6vw, 4rem);
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin: 18px 0 clamp(28px, 4vw, 44px);
          color: var(--color-light-1);
        }
        .pat2-lingua-big em { font-style: italic; color: var(--color-teal); }
        .pat2-lang-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 2.4vw, 24px);
        }
        .pat2-lang-card {
          border: 1px solid rgba(var(--color-teal-rgb), 0.28);
          border-radius: 6px;
          padding: clamp(20px, 3vw, 30px);
          background: rgba(var(--color-light-1-rgb, 252, 254, 254), 0.03);
          transition: transform 0.4s ease, border-color 0.4s ease, background 0.4s ease;
        }
        .pat2-lang-card:hover {
          transform: translateY(-6px);
          border-color: rgba(var(--color-teal-rgb), 0.7);
          background: rgba(var(--color-teal-rgb), 0.07);
        }
        .pat2-lang-card .pat2-code {
          font-family: var(--font-fraunces), serif;
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          font-weight: 600;
          color: var(--color-teal);
          line-height: 1;
        }
        .pat2-lang-card h3 {
          font-family: var(--font-fraunces), serif;
          font-size: 1.16rem;
          font-weight: 600;
          margin: 16px 0 8px;
          color: var(--color-light-1);
        }
        .pat2-lang-card p {
          font-size: 0.85rem;
          color: rgba(var(--color-light-1-rgb, 252, 254, 254), 0.72);
        }

        /* ============ ESPECIALIDADES INDEX ============ */
        .pat2-index { border-top: 1px solid var(--pat2-line); }
        .pat2-index-row {
          display: grid;
          grid-template-columns: 88px 1fr auto;
          align-items: baseline;
          gap: 18px;
          padding: clamp(14px, 1.8vw, 20px) 0;
          border-bottom: 1px solid var(--pat2-line);
          text-decoration: none;
          color: var(--pat2-ink);
          position: relative;
          transition: padding-left 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .pat2-index-row::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: -1px;
          height: 2px;
          width: 100%;
          background: var(--color-teal);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .pat2-index-row:hover::before { transform: scaleX(1); }
        .pat2-index-row:hover { padding-left: 14px; }
        .pat2-index-num {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 0.82rem;
          color: var(--color-mint);
          letter-spacing: 0.08em;
        }
        .pat2-index-name {
          font-family: var(--font-fraunces), serif;
          font-size: clamp(1.2rem, 2.6vw, 1.9rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--pat2-ink);
          transition: color 0.3s ease;
        }
        .pat2-index-row:hover .pat2-index-name { color: var(--color-navy); }
        .pat2-index-note {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.78rem;
          color: var(--pat2-ink-soft);
          letter-spacing: 0.04em;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .pat2-index-note .pat2-arrow {
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          color: var(--color-teal);
        }
        .pat2-index-row:hover .pat2-arrow { opacity: 1; transform: translateX(0); }

        /* ============ PULL QUOTES ============ */
        .pat2-quotes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 36px);
        }
        .pat2-quote {
          position: relative;
          padding: clamp(24px, 3vw, 34px) clamp(20px, 2.6vw, 30px);
          border-radius: 6px;
          background: var(--pat2-cream-2);
          border: 1px solid var(--pat2-line);
        }
        .pat2-quote .pat2-qmark { color: rgba(var(--color-teal-rgb), 0.4); margin-bottom: 8px; }
        .pat2-quote blockquote {
          font-family: var(--font-fraunces), serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.05rem, 1.8vw, 1.28rem);
          line-height: 1.42;
          color: var(--pat2-ink);
        }
        .pat2-quote figcaption {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid var(--pat2-line);
        }
        .pat2-quote figcaption strong {
          display: block;
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          color: var(--pat2-ink);
          font-size: 0.95rem;
        }
        .pat2-quote figcaption span {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.72rem;
          color: var(--pat2-ink-soft);
          letter-spacing: 0.02em;
        }
        .pat2-illus {
          position: absolute;
          top: 16px;
          right: 16px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-mint);
          padding: 4px 8px;
          border: 1px solid var(--pat2-line);
          border-radius: 999px;
        }

        /* ============ CTA ============ */
        .pat2-cta {
          position: relative;
          margin: clamp(40px, 6vw, 80px) 0;
          border-radius: 8px;
          overflow: hidden;
          padding: clamp(48px, 8vw, 100px) clamp(24px, 5vw, 72px);
          background:
            radial-gradient(600px 400px at 18% 20%, rgba(var(--color-cobalt-rgb), 0.4), transparent 60%),
            linear-gradient(135deg, var(--color-navy), var(--color-dark-2));
          color: var(--color-light-1);
          text-align: center;
        }
        .pat2-cta .pat2-label { color: var(--color-teal); }
        .pat2-cta h2 {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: clamp(2rem, 5.4vw, 3.6rem);
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin: 16px auto clamp(20px, 3vw, 28px);
          max-width: 16ch;
          color: var(--color-light-1);
        }
        .pat2-cta h2 em { font-style: italic; color: var(--color-teal); }
        .pat2-cta p {
          font-size: clamp(0.95rem, 1.5vw, 1.08rem);
          color: rgba(var(--color-light-1-rgb, 252, 254, 254), 0.78);
          max-width: 48ch;
          margin: 0 auto clamp(28px, 4vw, 36px);
        }
        .pat2-cta-search {
          display: flex;
          gap: 10px;
          max-width: 520px;
          margin: 0 auto;
          flex-wrap: wrap;
          justify-content: center;
        }
        .pat2-fakefield {
          flex: 1 1 240px;
          min-width: 200px;
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 52px;
          padding: 0 20px;
          border-radius: 999px;
          background: rgba(var(--color-light-1-rgb, 252, 254, 254), 0.08);
          border: 1px solid rgba(var(--color-teal-rgb), 0.34);
          color: rgba(var(--color-light-1-rgb, 252, 254, 254), 0.7);
          font-size: 0.9rem;
          text-align: left;
        }
        .pat2-fakefield i { color: var(--color-teal); }

        /* ============ FOOTER ============ */
        .pat2-footer {
          border-top: 1px solid var(--pat2-line);
          padding: clamp(32px, 5vw, 48px) 0 clamp(40px, 6vw, 56px);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }
        .pat2-footer p { font-size: 0.78rem; color: var(--pat2-ink-soft); }
        .pat2-footer .pat2-flinks { display: flex; gap: 22px; flex-wrap: wrap; }
        .pat2-footer .pat2-flinks a {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.78rem;
          color: var(--pat2-ink-soft);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .pat2-footer .pat2-flinks a:hover { color: var(--color-teal); }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 900px) {
          .pat2-hero-grid { grid-template-columns: 1fr; }
          .pat2-hero-visual { aspect-ratio: 16 / 11; max-height: 440px; }
          .pat2-manifesto-wrap { grid-template-columns: 1fr; }
          .pat2-manifesto { max-width: none; }
          .pat2-lang-cards { grid-template-columns: 1fr; }
          .pat2-quotes-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .pat2-trust { grid-template-columns: 1fr; }
          .pat2-index-row { grid-template-columns: 56px 1fr; }
          .pat2-index-note { grid-column: 2; padding-top: 2px; }
        }

        /* ============ REDUCED MOTION ============ */
        @media (prefers-reduced-motion: reduce) {
          .pat2-root *,
          .pat2-reveal,
          .pat2-hero-visual .pat2-photo,
          .pat2-h1 .pat2-lingua::after {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="pat2-shell">
        {/* ============ NAV ============ */}
        <nav className="pat2-nav" aria-label="Navigation de la variante">
          <a href="#topo" className="pat2-brand" aria-label="DocAgora">
            Doc<b>Agora</b>
            <span className="pat2-dot">.</span>
          </a>
          <Link href="/variants" className="pat2-back">
            <span aria-hidden="true">&larr;</span> Variantes
          </Link>
        </nav>

        {/* ============ HERO ============ */}
        <header className="pat2-hero" id="topo">
          <div className="pat2-hero-kicker pat2-reveal" style={delay(60)}>
            <span className="pat2-rule" aria-hidden="true" />
            <span className="pat2-label">Histoires de Santé &middot; Portugal</span>
          </div>

          <div className="pat2-hero-grid">
            <div>
              <h1 className="pat2-h1 pat2-reveal" style={delay(120)}>
                Trouvez qui
                <span className="pat2-line2">
                  parle <em>votre</em>{" "}
                  <span className="pat2-lingua">langue</span>
                </span>
              </h1>

              <div
                className="pat2-langflip pat2-reveal"
                style={delay(200, { marginTop: "18px", fontSize: "clamp(1.3rem, 3.4vw, 2.1rem)" })}
                aria-label="Portugais, Français, Anglais"
              >
                <LangFlip />
              </div>

              <p className="pat2-hero-chapo pat2-reveal" style={delay(260)}>
                Une façon chaleureuse de trouver des professionnels de santé vérifiés au
                Portugal &mdash; en portugais, en français ou en anglais. La recherche est
                gratuite. La prise de rendez-vous arrive <em>bientôt</em>.
              </p>

              <div className="pat2-hero-actions pat2-reveal" style={delay(320)}>
                <a href="#especialidades" className="pat2-btn pat2-btn-primary">
                  <i className="fas fa-search" aria-hidden="true" />
                  Explorer les spécialités
                </a>
                <span className="pat2-soon">Prise de rendez-vous bientôt</span>
              </div>

              <div className="pat2-byline pat2-reveal" style={delay(380)}>
                <span className="pat2-byline-avatar" aria-hidden="true" />
                <p>
                  <strong>Éditorial DocAgora</strong>
                  La santé avec proximité et soin
                </p>
              </div>
            </div>

            <div className="pat2-hero-visual pat2-reveal" style={delay(260)}>
              <span className="pat2-photo" aria-hidden="true" />
              <span className="pat2-duo" aria-hidden="true" />
              <div className="pat2-tag">
                <span className="pat2-mono">PT &middot; FR &middot; EN</span>
                <b>16 spécialités</b>
              </div>
            </div>
          </div>

          {/* trust strip */}
          <div className="pat2-trust pat2-reveal" style={delay(440)}>
            <div className="pat2-trust-item">
              <span className="pat2-ico"><IconFree /></span>
              <div>
                <h3>Recherche gratuite</h3>
                <p>Trouver des professionnels ne coûte absolument rien.</p>
              </div>
            </div>
            <div className="pat2-trust-item">
              <span className="pat2-ico"><IconShield /></span>
              <div>
                <h3>Professionnels vérifiés</h3>
                <p>Les profils sont confirmés avant d’apparaître dans les résultats.</p>
              </div>
            </div>
            <div className="pat2-trust-item">
              <span className="pat2-ico"><IconGlobe /></span>
              <div>
                <h3>Trois langues</h3>
                <p>Naviguez en portugais, en français ou en anglais.</p>
              </div>
            </div>
          </div>
        </header>

        {/* ============ MANIFESTO ============ */}
        <section className="pat2-sec" aria-labelledby="pat2-manifesto-h">
          <div className="pat2-manifesto-wrap">
            <div className="pat2-reveal" style={delay(0)}>
              <span className="pat2-secnum">01 &middot; Notre mission</span>
              <h2 id="pat2-manifesto-h" className="pat2-manifesto">
                Prendre soin de soi commence par <em>se comprendre</em>.
              </h2>
            </div>
            <div className="pat2-manifesto-body pat2-reveal" style={delay(120)}>
              <p className="pat2-dropcap">
                Changer de pays, ou simplement chercher le bon médecin, ne devrait jamais
                signifier se perdre dans des mots que l’on ne maîtrise pas. C’est de là
                qu’est née l’idée simple derrière DocAgora&nbsp;: rapprocher ceux qui
                cherchent des soins de ceux qui les prodiguent &mdash; dans la langue de
                chacun.
              </p>
              <p>
                Nous avons réuni des professionnels de santé vérifiés au Portugal et tout
                organisé autour d’une question humaine&nbsp;: avec qui vous sentez-vous
                à l’aise pour parler&nbsp;? La recherche est, et restera, gratuite pour
                vous.
              </p>
              <p>
                Nous ne promettons pas de raccourcis. Pas de téléconsultation, pas
                d’ordonnances en ligne, pas de paiements via la plateforme. Ce que nous
                offrons, c’est de la clarté &mdash; et, bientôt, la possibilité de
                prendre rendez-vous.
              </p>
              <p className="pat2-manifesto-note">
                Les exemples et chiffres présentés sur cette page sont purement
                illustratifs et donnés à titre indicatif.
              </p>
            </div>
          </div>
        </section>

        {/* ============ LÍNGUA ============ */}
        <section className="pat2-sec" aria-labelledby="pat2-lingua-h">
          <div className="pat2-lingua-sec pat2-reveal" style={delay(0)}>
            <span className="pat2-secnum">02 &middot; Votre langue</span>
            <span className="pat2-label" style={{ display: "block", marginTop: "10px" }}>
              Quelqu’un qui parle votre langue
            </span>
            <h2 id="pat2-lingua-h" className="pat2-lingua-big">
              Trois langues, <em>une</em> même attention aux détails qui change tout.
            </h2>
            <div className="pat2-lang-cards">
              <article className="pat2-lang-card">
                <span className="pat2-code">PT</span>
                <h3>Português</h3>
                <p>Pour ceux qui sont chez eux &mdash; du Minho à l’Algarve, naturellement.</p>
              </article>
              <article className="pat2-lang-card">
                <span className="pat2-code">FR</span>
                <h3>Français</h3>
                <p>Pour la communauté francophone qui vit ou s&rsquo;installe au Portugal.</p>
              </article>
              <article className="pat2-lang-card">
                <span className="pat2-code">EN</span>
                <h3>English</h3>
                <p>For expats and visitors who feel safer being understood clearly.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ============ ESPECIALIDADES INDEX ============ */}
        <section className="pat2-sec" id="especialidades" aria-labelledby="pat2-esp-h">
          <div className="pat2-sec-head pat2-reveal" style={delay(0)}>
            <span className="pat2-secnum">03 &middot; Index</span>
            <h2
              id="pat2-esp-h"
              className="pat2-serif"
              style={{
                fontSize: "clamp(1.8rem, 4.4vw, 3rem)",
                letterSpacing: "-0.02em",
                color: "var(--pat2-ink)",
                marginTop: "10px",
              }}
            >
              Seize spécialités, une seule porte d’entrée.
            </h2>
          </div>

          <div className="pat2-index">
            {ESPECIALIDADES.map((esp, i) => (
              <a
                key={esp.num}
                href="#"
                className="pat2-index-row pat2-reveal"
                style={delay(Math.min(i * 60, 540))}
                aria-label={`${esp.nome}, ${esp.nota}`}
              >
                <span className="pat2-index-num">{esp.num}</span>
                <span className="pat2-index-name">{esp.nome}</span>
                <span className="pat2-index-note">
                  {esp.nota}
                  <i className="fas fa-arrow-right pat2-arrow" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ============ PULL QUOTES ============ */}
        <section className="pat2-sec" aria-labelledby="pat2-quotes-h">
          <div className="pat2-sec-head pat2-reveal" style={delay(0)}>
            <span className="pat2-secnum">04 &middot; Témoignages</span>
            <h2
              id="pat2-quotes-h"
              className="pat2-serif"
              style={{
                fontSize: "clamp(1.8rem, 4.4vw, 3rem)",
                letterSpacing: "-0.02em",
                color: "var(--pat2-ink)",
                marginTop: "10px",
              }}
            >
              Petites histoires, <em style={{ fontStyle: "italic", color: "var(--color-teal)" }}>grands soulagements</em>.
            </h2>
          </div>

          <div className="pat2-quotes-grid">
            {PULL_QUOTES.map((q, i) => (
              <figure
                key={q.autor}
                className="pat2-quote pat2-reveal"
                style={delay(i * 90)}
              >
                <span className="pat2-illus">Illustratif</span>
                <span className="pat2-qmark"><IconQuote /></span>
                <blockquote>{q.texto}</blockquote>
                <figcaption>
                  <strong>{q.autor}</strong>
                  <span>{q.contexto}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="pat2-cta pat2-reveal" style={delay(0)} aria-labelledby="pat2-cta-h">
          <span className="pat2-label">Commencez maintenant</span>
          <h2 id="pat2-cta-h">
            Votre santé mérite <em>la sérénité</em>.
          </h2>
          <p>
            Recherchez gratuitement des professionnels vérifiés dans votre langue. La prise
            de rendez-vous en ligne arrive <em style={{ fontStyle: "italic", color: "var(--color-teal)" }}>bientôt</em>.
          </p>
          <div className="pat2-cta-search">
            <span className="pat2-fakefield">
              <i className="fas fa-search" aria-hidden="true" />
              Spécialité, ville&hellip;
            </span>
            <a href="#especialidades" className="pat2-btn pat2-btn-primary">
              Rechercher
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="pat2-footer">
          <p>&copy; {new Date().getFullYear()} DocAgora &middot; Histoires de Santé &mdash; variante illustrative.</p>
          <div className="pat2-flinks">
            <a href="#topo">Accueil</a>
            <a href="#especialidades">Spécialités</a>
            <Link href="/variants">&larr; Variantes</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sous-composant : alternance typographique PT · FR · EN            */
/* ------------------------------------------------------------------ */
function LangFlip() {
  const langs = ["PT", "FR", "EN"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setActive((prev) => (prev + 1) % langs.length);
    }, 1600);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {langs.map((l, i) => (
        <span key={l}>
          <span className={i === active ? "is-on" : undefined}>{l}</span>
          {i < langs.length - 1 ? <i aria-hidden="true">&middot;</i> : null}
        </span>
      ))}
    </>
  );
}
