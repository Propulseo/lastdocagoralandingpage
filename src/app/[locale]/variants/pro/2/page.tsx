"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * /variants/pro/2 — « Confiance »
 * Autorité éditoriale sobre. Navy dominant, serif Fraunces, filets fins,
 * numérotation 01-04, mono pour labels de conformité. Esprit cabinet de conseil.
 * Page autosuffisante, sans imports CSS. Toutes les classes préfixées "pro2-".
 */

type Razao = {
  num: string;
  title: string;
  body: string;
  mono: string;
};

type Testemunho = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const RAZOES: Razao[] = [
  {
    num: "01",
    title: 'Visibilité vérifiée',
    body:
      "Votre profil professionnel, validé et présenté avec clarté. Spécialité, adresse et horaires, l’information que les patients recherchent, sans bruit.",
    mono: 'profil · vérifié',
  },
  {
    num: "02",
    title: 'Conçu en français',
    body:
      "Pensé pour la réalité de la santé en Portugal. Langage, flux et priorités dessinés ici, pas une traduction hâtive d’un autre marché.",
    mono: 'conçu · en PT',
  },
  {
    num: "03",
    title: 'Sans frais d’adhésion',
    body:
      'La présence sur DocAgora est gratuite pour les professionnels durant cette phase. Sans abonnement, sans commission sur votre activité clinique.',
    mono: 'gratuit · phase initiale',
  },
  {
    num: "04",
    title: 'Prise de rendez-vous bientôt',
    body:
      'La recherche connecte déjà patients et professionnels. La prise de rendez-vous en ligne arrive bientôt, sans promesse de téléconsultation ni paiement sur la plateforme.',
    mono: 'rendez-vous · bientôt',
  },
];

const CONFORMIDADE: { title: string; body: string }[] = [
  {
    title: 'RGPD par conception',
    body:
      'Minimisation des données, base légale explicite et droit d’accès. La confidentialité est une exigence d’architecture, pas une note de bas de page.',
  },
  {
    title: 'Données hébergées au Portugal',
    body:
      'Les informations résident sur une infrastructure au Portugal, sous juridiction européenne. Sans transferts opaques hors de l’espace RGPD.',
  },
  {
    title: 'Accès contrôlé',
    body:
      "Authentification robuste et journaux d’accès. Chaque opération sensible est traçable, transparence pour le professionnel et pour le patient.",
  },
];

const TESTEMUNHOS: Testemunho[] = [
  {
    quote:
      'La sobriété de la présentation inspire confiance. Le patient comprend qui je suis et où je me trouve avant même d’appeler.',
    name: 'Drᵉ Helena M.',
    role: 'Médecine générale · Porto',
    initials: 'HM',
  },
  {
    quote:
      'J’apprécie l’honnêteté : aucune promesse exagérée. La plateforme indique clairement ce qu’elle fait aujourd’hui et ce qui arrive bientôt.',
    name: 'Dr Rui A.',
    role: 'Cardiologie · Lisbonne',
    initials: 'RA',
  },
  {
    quote:
      'Être référencé dans un espace pensé pour le Portugal, en français, fait une vraie différence dans la relation avec mes patients.',
    name: 'Drᵉ Sofia C.',
    role: 'Dermatologie · Coimbra',
    initials: 'SC',
  },
];

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <path
        d="M12 2.5 4.5 5.5v5.5c0 4.6 3.1 8.3 7.5 9.8 4.4-1.5 7.5-5.2 7.5-9.8V5.5L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m8.6 12 2.2 2.3 4.6-4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="15.4" r="1.5" fill="currentColor" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SEC_ICONS = [ShieldIcon, GlobeIcon, LockIcon];

function ArrowRight() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProVariant2() {
  const [active, setActive] = useState<number>(0);

  // Observe quelle « raison » est visible pour mettre en surbrillance l’index dans la colonne sticky.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-razao]"));
    if (nodes.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-razao"));
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { rootMargin: reduce ? "0px" : "-45% 0px -45% 0px", threshold: 0.01 },
    );
    for (const n of nodes) obs.observe(n);
    return () => obs.disconnect();
  }, []);

  return (
    <main className="pro2-root">
      <style>{`
        .pro2-root {
          box-sizing: border-box;
          font-family: var(--font-montserrat), system-ui, sans-serif;
          color: var(--color-dark-1);
          background:
            radial-gradient(120% 70% at 100% -5%, rgba(var(--color-cobalt-rgb), 0.07) 0%, transparent 55%),
            radial-gradient(90% 60% at -5% 6%, rgba(var(--color-navy-rgb), 0.06) 0%, transparent 50%),
            var(--color-light-1);
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .pro2-root *, .pro2-root *::before, .pro2-root *::after { box-sizing: border-box; }

        .pro2-grain {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.4;
          background-image: radial-gradient(rgba(var(--color-navy-rgb), 0.06) 0.5px, transparent 0.5px);
          background-size: 3px 3px;
        }

        .pro2-wrap { width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 2; }
        @media (max-width: 768px) { .pro2-wrap { padding: 0 20px; } }

        /* ── serif / mono helpers ── */
        .pro2-serif { font-family: var(--font-fraunces), Georgia, "Times New Roman", serif; }
        .pro2-mono {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          letter-spacing: 0.18em; text-transform: uppercase;
        }

        /* ── header / nav ── */
        .pro2-nav {
          position: relative; z-index: 5;
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 0; gap: 16px;
          border-bottom: 1px solid rgba(var(--color-navy-rgb), 0.10);
        }
        .pro2-logo {
          display: inline-flex; align-items: center; gap: 9px; text-decoration: none;
          color: var(--color-navy); font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; font-size: 21px; letter-spacing: -0.01em; line-height: 1;
        }
        .pro2-logo-mark {
          width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
          display: grid; place-items: center; color: var(--color-light-1);
          background: linear-gradient(140deg, var(--color-navy), var(--color-cobalt));
          font-size: 14px; font-weight: 700; font-family: var(--font-montserrat), sans-serif;
        }
        .pro2-logo b { font-weight: 600; color: var(--color-teal); }
        .pro2-back {
          display: inline-flex; align-items: center; gap: 7px; text-decoration: none;
          font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--color-navy); opacity: 0.6; transition: opacity 0.2s ease, gap 0.2s ease;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
        }
        .pro2-back:hover { opacity: 1; gap: 11px; color: var(--color-navy); }

        /* ── reveal cascade ── */
        .pro2-reveal { opacity: 0; transform: translateY(20px); animation: pro2-rise 0.75s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes pro2-rise { to { opacity: 1; transform: translateY(0); } }

        /* ── HERO ── */
        .pro2-hero { padding: clamp(56px, 9vh, 104px) 0 clamp(48px, 7vh, 88px); position: relative; }
        .pro2-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 12px; margin: 0 0 26px;
          font-size: 11px; color: var(--color-navy);
        }
        .pro2-hero-eyebrow .pro2-rule { height: 1px; width: 46px; background: linear-gradient(90deg, var(--color-teal), transparent); }
        .pro2-h1 {
          margin: 0; max-width: 17ch; color: var(--color-navy);
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: clamp(40px, 6.4vw, 82px); line-height: 1.02; letter-spacing: -0.025em;
        }
        .pro2-h1 em { font-style: italic; color: var(--color-cobalt); }
        .pro2-h1 .pro2-accent { color: var(--color-teal); font-style: italic; }
        .pro2-hero-lead {
          margin: 30px 0 0; max-width: 56ch; color: var(--color-dark-1);
          font-size: clamp(16px, 1.55vw, 19px); line-height: 1.68; opacity: 0.78;
        }
        .pro2-hero-cta { display: flex; flex-wrap: wrap; gap: 14px; margin: 38px 0 0; }
        .pro2-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 26px; border-radius: 4px; text-decoration: none;
          font-family: var(--font-montserrat), sans-serif; font-size: 14.5px; font-weight: 600;
          letter-spacing: 0.01em; cursor: pointer; border: 1px solid transparent;
          text-transform: none; line-height: 1;
          transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, gap 0.25s ease;
        }
        .pro2-btn svg { transition: transform 0.25s ease; }
        .pro2-btn:hover svg { transform: translateX(3px); }
        .pro2-btn-primary { background: var(--color-navy); color: var(--color-light-1); }
        .pro2-btn-primary:hover { background: var(--color-cobalt); color: #fff; transform: translateY(-2px); gap: 14px; }
        .pro2-btn-ghost {
          background: transparent; color: var(--color-navy);
          border-color: rgba(var(--color-navy-rgb), 0.28);
        }
        .pro2-btn-ghost:hover { border-color: var(--color-navy); background: rgba(var(--color-navy-rgb), 0.05); color: var(--color-navy); gap: 14px; }

        .pro2-badges {
          display: flex; flex-wrap: wrap; gap: 10px 26px; margin: 44px 0 0;
          padding-top: 28px; border-top: 1px solid rgba(var(--color-navy-rgb), 0.12);
        }
        .pro2-badge {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 11px; color: var(--color-navy);
        }
        .pro2-badge i { color: var(--color-teal); font-size: 13px; }

        /* hero side rail — decorative editorial mark */
        .pro2-hero-grid { display: grid; grid-template-columns: 1fr; gap: 0; }
        .pro2-hero-stamp {
          position: absolute; top: clamp(56px, 9vh, 104px); right: 0; z-index: 1;
          width: 230px; max-width: 30vw; aspect-ratio: 1; pointer-events: none;
          border: 1px solid rgba(var(--color-navy-rgb), 0.14); border-radius: 50%;
          display: grid; place-items: center; opacity: 0.9;
        }
        .pro2-hero-stamp::before {
          content: ""; position: absolute; inset: 16px; border-radius: 50%;
          border: 1px solid rgba(var(--color-teal-rgb), 0.30);
        }
        .pro2-hero-stamp span {
          font-family: var(--font-fraunces), Georgia, serif; font-style: italic;
          color: var(--color-navy); opacity: 0.55; text-align: center; line-height: 1.2;
          font-size: clamp(13px, 1.6vw, 17px); padding: 0 18px;
        }
        @media (max-width: 980px) { .pro2-hero-stamp { display: none; } }

        /* ── SECTION shell ── */
        .pro2-section { padding: clamp(64px, 9vh, 110px) 0; position: relative; }
        .pro2-section--tint {
          background: linear-gradient(180deg, transparent, rgba(var(--color-navy-rgb), 0.025) 30%, rgba(var(--color-navy-rgb), 0.025) 70%, transparent);
        }
        .pro2-kicker {
          display: inline-flex; align-items: center; gap: 12px; margin: 0 0 18px;
          font-size: 11px; color: var(--color-cobalt);
        }
        .pro2-kicker .pro2-rule { height: 1px; width: 38px; background: var(--color-cobalt); opacity: 0.5; }

        /* ── MANIFESTO ── */
        .pro2-manifesto-grid {
          display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(28px, 5vw, 72px);
          align-items: start;
        }
        @media (max-width: 880px) { .pro2-manifesto-grid { grid-template-columns: 1fr; gap: 28px; } }
        .pro2-manifesto-label .pro2-num {
          font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(48px, 7vw, 88px);
          color: rgba(var(--color-navy-rgb), 0.14); line-height: 0.9; font-weight: 600; display: block;
        }
        .pro2-manifesto-label h2 {
          margin: 14px 0 0; color: var(--color-navy); font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; font-size: clamp(24px, 3vw, 34px); line-height: 1.12; letter-spacing: -0.015em;
        }
        .pro2-manifesto-body p {
          margin: 0 0 22px; font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 400; font-size: clamp(19px, 2.1vw, 27px); line-height: 1.5;
          color: var(--color-dark-1); letter-spacing: -0.01em;
        }
        .pro2-manifesto-body p:last-child { margin-bottom: 0; }
        .pro2-manifesto-body em { font-style: italic; color: var(--color-cobalt); }
        .pro2-manifesto-sign {
          margin-top: 30px; font-size: 12px; color: var(--color-navy); opacity: 0.55;
        }

        /* ── 04 RAZÕES (sticky / scroll) ── */
        .pro2-razoes-grid {
          display: grid; grid-template-columns: 0.78fr 1.22fr; gap: clamp(32px, 6vw, 88px);
          align-items: start;
        }
        @media (max-width: 880px) { .pro2-razoes-grid { grid-template-columns: 1fr; gap: 30px; } }
        .pro2-sticky {
          position: sticky; top: 56px; align-self: start;
        }
        @media (max-width: 880px) { .pro2-sticky { position: static; top: auto; } }
        .pro2-sticky h2 {
          margin: 18px 0 0; color: var(--color-navy); font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.02em;
        }
        .pro2-sticky h2 em { font-style: italic; color: var(--color-cobalt); }
        .pro2-sticky-lead { margin: 18px 0 0; max-width: 38ch; font-size: 15px; line-height: 1.65; opacity: 0.72; }
        .pro2-index { list-style: none; margin: 30px 0 0; padding: 0; }
        @media (max-width: 880px) { .pro2-index { display: none; } }
        .pro2-index li {
          display: flex; align-items: center; gap: 14px; padding: 11px 0;
          border-top: 1px solid rgba(var(--color-navy-rgb), 0.10);
          font-size: 12.5px; color: var(--color-navy); opacity: 0.45;
          transition: opacity 0.3s ease, padding-left 0.3s ease;
        }
        .pro2-index li .pro2-idx-num { font-size: 11px; min-width: 22px; }
        .pro2-index li .pro2-idx-bar {
          height: 1px; flex: 0 0 0; background: var(--color-teal);
          transition: flex-basis 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .pro2-index li.is-active { opacity: 1; padding-left: 4px; }
        .pro2-index li.is-active .pro2-idx-bar { flex-basis: 26px; }

        .pro2-razao {
          padding: clamp(28px, 4vw, 44px) 0;
          border-top: 1px solid rgba(var(--color-navy-rgb), 0.12);
          position: relative;
        }
        .pro2-razao:first-child { border-top: none; padding-top: 0; }
        .pro2-razao-num {
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: clamp(54px, 9vw, 104px); line-height: 0.86; letter-spacing: -0.03em;
          color: rgba(var(--color-navy-rgb), 0.16);
          transition: color 0.4s ease;
        }
        .pro2-razao:hover .pro2-razao-num,
        .pro2-razao:focus-within .pro2-razao-num { color: rgba(var(--color-cobalt-rgb), 0.55); }
        .pro2-razao h3 {
          margin: 14px 0 0; color: var(--color-navy); font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; font-size: clamp(22px, 2.7vw, 32px); letter-spacing: -0.015em; line-height: 1.15;
          display: inline-block; position: relative;
        }
        .pro2-razao h3::after {
          content: ""; position: absolute; left: 0; bottom: -6px; height: 2px; width: 0;
          background: var(--color-teal); transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .pro2-razao:hover h3::after, .pro2-razao:focus-within h3::after { width: 100%; }
        .pro2-razao p { margin: 18px 0 0; max-width: 54ch; font-size: 15.5px; line-height: 1.7; opacity: 0.82; }
        .pro2-razao-mono { margin: 18px 0 0; font-size: 11px; color: var(--color-cobalt); opacity: 0.85; }

        /* ── SEGURANÇA ── */
        .pro2-sec-head { max-width: 56ch; margin: 0 0 clamp(36px, 5vw, 56px); }
        .pro2-sec-head h2 {
          margin: 0; color: var(--color-navy); font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; font-size: clamp(28px, 4vw, 46px); line-height: 1.08; letter-spacing: -0.02em;
        }
        .pro2-sec-head h2 em { font-style: italic; color: var(--color-cobalt); }
        .pro2-sec-head p { margin: 20px 0 0; font-size: clamp(15px, 1.5vw, 17px); line-height: 1.7; opacity: 0.78; }
        .pro2-sec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(var(--color-navy-rgb), 0.12); border: 1px solid rgba(var(--color-navy-rgb), 0.12); border-radius: 6px; overflow: hidden; }
        @media (max-width: 820px) { .pro2-sec-grid { grid-template-columns: 1fr; } }
        .pro2-sec-card {
          background: var(--color-light-1); padding: clamp(26px, 3vw, 36px);
          transition: background-color 0.3s ease;
        }
        .pro2-sec-card:hover { background: var(--color-light-2); }
        .pro2-sec-icon {
          width: 52px; height: 52px; border-radius: 8px; display: grid; place-items: center;
          color: var(--color-navy); background: rgba(var(--color-teal-rgb), 0.12);
          border: 1px solid rgba(var(--color-teal-rgb), 0.3); margin-bottom: 20px;
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .pro2-sec-card:hover .pro2-sec-icon { transform: translateY(-3px); color: var(--color-cobalt); }
        .pro2-sec-card h3 {
          margin: 0 0 10px; color: var(--color-navy); font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; font-size: 20px; letter-spacing: -0.01em; line-height: 1.2;
        }
        .pro2-sec-card p { margin: 0; font-size: 14.5px; line-height: 1.65; opacity: 0.8; }
        .pro2-sec-note {
          margin: clamp(28px, 4vw, 40px) 0 0; padding: 18px 22px;
          border-left: 3px solid var(--color-teal); background: rgba(var(--color-teal-rgb), 0.06);
          border-radius: 0 4px 4px 0; font-size: 13.5px; line-height: 1.6; color: var(--color-dark-1);
        }

        /* ── TESTEMUNHOS ── */
        .pro2-tst-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        @media (max-width: 880px) { .pro2-tst-grid { grid-template-columns: 1fr; max-width: 540px; } }
        .pro2-tst-card {
          background: var(--color-light-1); border: 1px solid rgba(var(--color-navy-rgb), 0.12);
          border-radius: 8px; padding: 30px 28px; display: flex; flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .pro2-tst-card:hover {
          transform: translateY(-4px); border-color: rgba(var(--color-cobalt-rgb), 0.4);
          box-shadow: 0 24px 50px -34px rgba(var(--color-navy-rgb), 0.55);
        }
        .pro2-tst-illu {
          display: inline-flex; align-self: flex-start; align-items: center; gap: 7px;
          font-size: 9.5px; padding: 4px 9px; border-radius: 50px; margin-bottom: 18px;
          color: var(--color-cobalt); border: 1px solid rgba(var(--color-cobalt-rgb), 0.4);
          background: rgba(var(--color-cobalt-rgb), 0.06);
        }
        .pro2-tst-illu i { font-size: 8px; }
        .pro2-tst-quote {
          margin: 0; font-family: var(--font-fraunces), Georgia, serif; font-weight: 400;
          font-size: 18px; line-height: 1.5; color: var(--color-dark-1); letter-spacing: -0.005em; flex: 1 1 auto;
        }
        .pro2-tst-foot { display: flex; align-items: center; gap: 13px; margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(var(--color-navy-rgb), 0.1); }
        .pro2-tst-avatar {
          width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; display: grid; place-items: center;
          color: var(--color-light-1); font-size: 14px; font-weight: 600;
          background: linear-gradient(140deg, var(--color-navy), var(--color-mint));
          font-family: var(--font-montserrat), sans-serif;
        }
        .pro2-tst-name { margin: 0; font-size: 14.5px; font-weight: 600; color: var(--color-navy); line-height: 1.3; }
        .pro2-tst-role { margin: 2px 0 0; font-size: 12px; color: var(--color-dark-1); opacity: 0.6; }
        .pro2-tst-disclaimer { margin: clamp(26px, 4vw, 34px) 0 0; font-size: 12px; opacity: 0.55; text-align: center; }

        /* ── CTA final ── */
        .pro2-cta {
          margin-top: clamp(40px, 6vh, 72px);
          background:
            radial-gradient(120% 90% at 100% 0%, rgba(var(--color-cobalt-rgb), 0.4) 0%, transparent 55%),
            radial-gradient(90% 80% at 0% 100%, rgba(var(--color-teal-rgb), 0.22) 0%, transparent 50%),
            linear-gradient(150deg, var(--color-navy) 0%, var(--color-dark-1) 100%);
          color: var(--color-light-1); border-radius: 14px; overflow: hidden; position: relative;
          padding: clamp(44px, 6vw, 76px) clamp(28px, 5vw, 72px);
        }
        .pro2-cta::before {
          content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
          background-image: radial-gradient(rgba(255,255,255,0.10) 0.6px, transparent 0.6px);
          background-size: 22px 22px;
          mask-image: linear-gradient(135deg, #000, transparent 75%);
          -webkit-mask-image: linear-gradient(135deg, #000, transparent 75%);
        }
        .pro2-cta-inner { position: relative; z-index: 2; max-width: 720px; }
        .pro2-cta .pro2-kicker { color: var(--color-teal); }
        .pro2-cta .pro2-kicker .pro2-rule { background: var(--color-teal); opacity: 0.7; }
        .pro2-cta h2 {
          margin: 0; color: #fff; font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: clamp(30px, 4.4vw, 54px); line-height: 1.05; letter-spacing: -0.02em; max-width: 18ch;
        }
        .pro2-cta h2 em { font-style: italic; color: var(--color-teal); }
        .pro2-cta p { margin: 22px 0 0; max-width: 52ch; font-size: clamp(15px, 1.5vw, 17px); line-height: 1.65; color: rgba(255,255,255,0.74); }
        .pro2-cta-actions { display: flex; flex-wrap: wrap; gap: 14px; margin: 34px 0 0; }
        .pro2-btn-teal { background: var(--color-teal); color: var(--color-dark-1); }
        .pro2-btn-teal:hover { background: var(--color-mint); color: var(--color-dark-1); transform: translateY(-2px); gap: 14px; }
        .pro2-btn-onDark {
          background: transparent; color: #fff; border-color: rgba(255,255,255,0.4);
        }
        .pro2-btn-onDark:hover { border-color: #fff; background: rgba(255,255,255,0.08); color: #fff; gap: 14px; }

        /* ── footer ── */
        .pro2-footer { background: var(--color-dark-2); color: rgba(255,255,255,0.6); margin-top: clamp(48px, 7vh, 90px); }
        .pro2-footer-top {
          display: flex; flex-wrap: wrap; gap: 30px; justify-content: space-between; align-items: flex-start;
          padding: clamp(44px, 6vw, 64px) 0 clamp(30px, 4vw, 44px);
        }
        .pro2-footer-brand { max-width: 34ch; }
        .pro2-footer-brand .pro2-logo { color: #fff; }
        .pro2-footer-brand p { margin: 16px 0 0; font-size: 13.5px; line-height: 1.7; color: rgba(255,255,255,0.5); }
        .pro2-footer-cols { display: flex; flex-wrap: wrap; gap: clamp(32px, 6vw, 72px); }
        .pro2-footer-col h4 { margin: 0 0 14px; font-size: 11px; color: rgba(255,255,255,0.85); }
        .pro2-footer-col a, .pro2-footer-col span {
          display: block; text-decoration: none; color: rgba(255,255,255,0.5);
          font-size: 13.5px; margin: 0 0 10px; transition: color 0.2s ease;
        }
        .pro2-footer-col a:hover { color: var(--color-teal); }
        .pro2-footer-bottom {
          display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: center;
          padding: 20px 0 36px; border-top: 1px solid rgba(255,255,255,0.08);
          font-size: 12px; color: rgba(255,255,255,0.4);
        }
        .pro2-footer-bottom .pro2-mono { font-size: 10.5px; }

        /* ── focus visible ── */
        .pro2-root a:focus-visible, .pro2-root button:focus-visible {
          outline: 2px solid var(--color-teal); outline-offset: 3px; border-radius: 2px;
        }

        /* ── responsive ── */
        @media (max-width: 600px) {
          .pro2-nav { flex-wrap: wrap; }
          .pro2-btn { width: 100%; justify-content: center; min-height: 48px; }
          .pro2-hero-cta, .pro2-cta-actions { width: 100%; }
        }

        /* ── reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .pro2-root *, .pro2-root *::before, .pro2-root *::after {
            animation: none !important; transition: none !important;
          }
          .pro2-reveal { opacity: 1; transform: none; }
          .pro2-razao h3::after { width: 0 !important; }
          .pro2-btn:hover, .pro2-tst-card:hover, .pro2-sec-card:hover .pro2-sec-icon { transform: none; }
        }
      `}</style>

      <div className="pro2-grain" aria-hidden="true" />

      {/* ── HEADER / NAV ── */}
      <header className="pro2-wrap">
        <nav className="pro2-nav" aria-label="Navigation de la variante">
          <a className="pro2-logo" href="#topo">
            <span className="pro2-logo-mark" aria-hidden="true">D</span>
            Doc<b>Agora</b>
          </a>
          <Link className="pro2-back" href="/variants">
            <span aria-hidden="true">&larr;</span> Variantes
          </Link>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="pro2-hero" id="topo" aria-labelledby="pro2-h1">
        <div className="pro2-hero-stamp pro2-reveal" aria-hidden="true" style={{ animationDelay: "0.45s" }}>
          <span>conçu au<br />Portugal</span>
        </div>
        <div className="pro2-wrap">
          <div className="pro2-hero-grid">
            <p className="pro2-hero-eyebrow pro2-mono pro2-reveal" style={{ animationDelay: "0.04s" }}>
              <span className="pro2-rule" aria-hidden="true" />
              DocAgora · pour les professionnels de santé
            </p>
            <h1 className="pro2-h1 pro2-reveal" id="pro2-h1" style={{ animationDelay: "0.12s" }}>
              Un logiciel conçu pour la <em>santé portugaise.</em>
            </h1>
            <p className="pro2-hero-lead pro2-reveal" style={{ animationDelay: "0.2s" }}>
              {'DocAgora connecte les patients à des professionnels vérifiés, gratuitement, en portugais, français et anglais. Sobriété, clarté et conformité avant tout. La prise de rendez-vous en ligne arrive bientôt.'}
            </p>
            <div className="pro2-hero-cta pro2-reveal" style={{ animationDelay: "0.28s" }}>
              <a className="pro2-btn pro2-btn-primary" href="#cta">
                Présenter mon profil <ArrowRight />
              </a>
              <a className="pro2-btn pro2-btn-ghost" href="#seguranca">
                Voir la conformité
              </a>
            </div>
            <div className="pro2-badges pro2-reveal" style={{ animationDelay: "0.36s" }}>
              <span className="pro2-badge pro2-mono">
                <i className="fas fa-shield-alt" aria-hidden="true" /> RGPD
              </span>
              <span className="pro2-badge pro2-mono">
                <i className="fas fa-globe-europe" aria-hidden="true" /> Données dans l’UE
              </span>
              <span className="pro2-badge pro2-mono">
                <i className="fas fa-check-circle" aria-hidden="true" /> Conçu au Portugal
              </span>
              <span className="pro2-badge pro2-mono">
                <i className="fas fa-language" aria-hidden="true" /> PT · FR · EN
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="pro2-section pro2-section--tint" aria-labelledby="pro2-manifesto-h">
        <div className="pro2-wrap">
          <div className="pro2-manifesto-grid">
            <div className="pro2-manifesto-label pro2-reveal">
              <span className="pro2-num" aria-hidden="true">.00</span>
              <p className="pro2-kicker pro2-mono">
                <span className="pro2-rule" aria-hidden="true" /> Le pourquoi
              </p>
              <h2 id="pro2-manifesto-h">La confiance ne se promet pas. Elle se construit.</h2>
              <p className="pro2-manifesto-sign pro2-mono">DocAgora · manifeste</p>
            </div>
            <div className="pro2-manifesto-body pro2-reveal" style={{ animationDelay: "0.1s" }}>
              <p>
                {'La santé mérite des outils sérieux. Pas une promesse de rendez-vous supplémentaires, pas un artifice marketing : '}
                <em>une présence numérique à la hauteur du travail clinique qu’elle représente.</em>
              </p>
              <p>
                {"Nous avons construit DocAgora au Portugal, pour la façon dont la santé fonctionne ici. Aujourd’hui, nous aidons les patients à trouver des professionnels vérifiés. Demain, la prise de rendez-vous en ligne, avec la même rigueur."}
              </p>
              <p>
                {'Sans téléconsultation, sans paiement sur la plateforme, sans remboursement promis. L’essentiel, bien fait, avec la confidentialité au centre.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 RAZÕES (sticky / scroll) ── */}
      <section className="pro2-section" aria-labelledby="pro2-razoes-h">
        <div className="pro2-wrap">
          <div className="pro2-razoes-grid">
            <div className="pro2-sticky">
              <p className="pro2-kicker pro2-mono">
                <span className="pro2-rule" aria-hidden="true" /> 04 raisons
              </p>
              <h2 id="pro2-razoes-h">
                Pourquoi rejoindre <em>DocAgora.</em>
              </h2>
              <p className="pro2-sticky-lead">
                {'Quatre raisons claires, sans inflation. Votre présence, construite avec sobriété et maintenue avec transparence.'}
              </p>
              <ul className="pro2-index" aria-hidden="true">
                {RAZOES.map((r, i) => (
                  <li key={r.num} className={i === active ? "is-active" : ""}>
                    <span className="pro2-idx-num pro2-mono">{r.num}</span>
                    <span className="pro2-idx-bar" />
                    {r.title}
                  </li>
                ))}
              </ul>
            </div>

            <ol className="pro2-razoes-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {RAZOES.map((r, i) => (
                <li key={r.num} className="pro2-razao pro2-reveal" data-razao={i} style={{ animationDelay: `${0.06 * i}s` }} tabIndex={0}>
                  <span className="pro2-razao-num" aria-hidden="true">{r.num}</span>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                  <p className="pro2-razao-mono pro2-mono">{r.mono}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── SEGURANÇA & CONFORMIDADE ── */}
      <section className="pro2-section pro2-section--tint" id="seguranca" aria-labelledby="pro2-seg-h">
        <div className="pro2-wrap">
          <div className="pro2-sec-head pro2-reveal">
            <p className="pro2-kicker pro2-mono">
              <span className="pro2-rule" aria-hidden="true" /> Sécurité &amp; conformité
            </p>
            <h2 id="pro2-seg-h">
              La confidentialité est le <em>socle</em>, pas un supplément.
            </h2>
            <p>
              {"Les données de santé exigent le plus haut niveau d’exigence. DocAgora traite la conformité comme une exigence d’architecture, présente à chaque décision technique, dès le premier jour."}
            </p>
          </div>
          <div className="pro2-sec-grid pro2-reveal" style={{ animationDelay: "0.1s" }}>
            {CONFORMIDADE.map((c, i) => {
              const Icon = SEC_ICONS[i % SEC_ICONS.length];
              return (
                <article className="pro2-sec-card" key={c.title}>
                  <div className="pro2-sec-icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </article>
              );
            })}
          </div>
          <p className="pro2-sec-note pro2-reveal" style={{ animationDelay: "0.16s" }}>
            {"Note : DocAgora ne propose pas de téléconsultation, d’ordonnance en ligne, de paiement sur la plateforme ni de remboursement d’assurance. Notre rôle est de connecter, avec clarté et respect des données."}
          </p>
        </div>
      </section>

      {/* ── TESTEMUNHOS ── */}
      <section className="pro2-section" aria-labelledby="pro2-tst-h">
        <div className="pro2-wrap">
          <div className="pro2-sec-head pro2-reveal">
            <p className="pro2-kicker pro2-mono">
              <span className="pro2-rule" aria-hidden="true" /> Voix de professionnels
            </p>
            <h2 id="pro2-tst-h">Ce qu’ils disent, exemples illustratifs.</h2>
          </div>
          <div className="pro2-tst-grid">
            {TESTEMUNHOS.map((t, i) => (
              <article className="pro2-tst-card pro2-reveal" key={t.name} style={{ animationDelay: `${0.07 * i}s` }}>
                <span className="pro2-tst-illu pro2-mono">
                  <i className="fas fa-star" aria-hidden="true" /> Illustratif
                </span>
                <blockquote className="pro2-tst-quote">« {t.quote} »</blockquote>
                <div className="pro2-tst-foot">
                  <span className="pro2-tst-avatar" aria-hidden="true">{t.initials}</span>
                  <div>
                    <p className="pro2-tst-name">{t.name}</p>
                    <p className="pro2-tst-role">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="pro2-tst-disclaimer">
            {'*Témoignages illustratifs, créés à des fins de démonstration. Ils ne représentent pas des personnes réelles.'}
          </p>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="pro2-section" id="cta" aria-labelledby="pro2-cta-h" style={{ paddingBottom: 0 }}>
        <div className="pro2-wrap">
          <div className="pro2-cta pro2-reveal">
            <div className="pro2-cta-inner">
              <p className="pro2-kicker pro2-mono">
                <span className="pro2-rule" aria-hidden="true" /> Rejoindre DocAgora
              </p>
              <h2 id="pro2-cta-h">
                Une présence <em>sérieuse</em> pour votre activité clinique.
              </h2>
              <p>
                {'Présentez votre profil aux patients qui recherchent au Portugal. Gratuit durant cette phase, sans engagement. La prise de rendez-vous en ligne arrive bientôt, sans promesses que nous ne tenons pas.'}
              </p>
              <div className="pro2-cta-actions">
                <a className="pro2-btn pro2-btn-teal" href="#">
                  Présenter mon profil <ArrowRight />
                </a>
                <a className="pro2-btn pro2-btn-onDark" href="#seguranca">
                  Contacter l’équipe
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pro2-footer">
        <div className="pro2-wrap">
          <div className="pro2-footer-top">
            <div className="pro2-footer-brand">
              <a className="pro2-logo" href="#topo">
                <span className="pro2-logo-mark" aria-hidden="true">D</span>
                Doc<b>Agora</b>
              </a>
              <p>
                {'Recherche gratuite de professionnels de santé vérifiés au Portugal. En portugais, français et anglais. Prise de rendez-vous en ligne bientôt.'}
              </p>
            </div>
            <nav className="pro2-footer-cols" aria-label="Pied de page">
              <div className="pro2-footer-col">
                <h4 className="pro2-mono">Plateforme</h4>
                <a href="#topo">Accueil</a>
                <a href="#seguranca">Conformité</a>
                <a href="#cta">Professionnels</a>
              </div>
              <div className="pro2-footer-col">
                <h4 className="pro2-mono">Confiance</h4>
                <span>RGPD</span>
                <span>Données dans l’UE</span>
                <span>Conçu au Portugal</span>
              </div>
              <div className="pro2-footer-col">
                <h4 className="pro2-mono">Studio</h4>
                <Link href="/variants">Variantes</Link>
              </div>
            </nav>
          </div>
          <div className="pro2-footer-bottom">
            <span>© {new Date().getFullYear()} DocAgora · Portugal</span>
            <span className="pro2-mono">Variante interne · Confiance · contenu illustratif</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
