"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* ============================================================
   « Clinique Claire » — Variante Patient #1
   Premium clinique lumineux & rassurant (énergie Doctolib/Alan).
   Tout le style est local, préfixé pat1- pour éviter toute
   collision avec le CSS legacy global (Bootstrap + template).
   ============================================================ */

const LANGS = ["PT", "FR", "EN"] as const;
type Lang = (typeof LANGS)[number];

type Specialty = {
  id: string;
  label: string;
  draw: () => React.ReactNode;
};

type Step = {
  id: string;
  index: string;
  title: string;
  desc: string;
  draw: () => React.ReactNode;
};

type TrustItem = {
  id: string;
  value: string;
  label: string;
  draw: () => React.ReactNode;
};

/* ── Petits SVG inline (stroke = currentColor) ───────────── */

function IconStroke({
  children,
  size = 26,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ── Données ─────────────────────────────────────────────── */

const SPECIALTIES: Specialty[] = [
  {
    id: "clinica-geral",
    label: "Médecine générale",
    draw: () => (
      <IconStroke>
        <path d="M12 5v14M5 12h14" />
        <circle cx="12" cy="12" r="9" />
      </IconStroke>
    ),
  },
  {
    id: "pediatria",
    label: "Pédiatrie",
    draw: () => (
      <IconStroke>
        <circle cx="12" cy="7" r="3.2" />
        <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
      </IconStroke>
    ),
  },
  {
    id: "cardiologia",
    label: "Cardiologie",
    draw: () => (
      <IconStroke>
        <path d="M12 20s-7-4.6-9.2-9A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 9.2 4c-2.2 4.4-9.2 9-9.2 9Z" />
        <path d="M3.5 12h4l1.5-3 2 6 1.5-3h4.5" />
      </IconStroke>
    ),
  },
  {
    id: "dermatologia",
    label: "Dermatologie",
    draw: () => (
      <IconStroke>
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="10" r="1" />
        <circle cx="14" cy="9" r="1" />
        <circle cx="13" cy="14" r="1" />
      </IconStroke>
    ),
  },
  {
    id: "oftalmologia",
    label: "Ophtalmologie",
    draw: () => (
      <IconStroke>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.6" />
      </IconStroke>
    ),
  },
  {
    id: "ginecologia",
    label: "Gynécologie",
    draw: () => (
      <IconStroke>
        <circle cx="12" cy="9" r="5" />
        <path d="M12 14v6M9 18h6" />
      </IconStroke>
    ),
  },
  {
    id: "ortopedia",
    label: "Orthopédie",
    draw: () => (
      <IconStroke>
        <path d="M7 4c1.6 0 2.5 1.4 2.5 3S8 11 8 13s1.5 3 1.5 4.5S8.6 20 7 20" />
        <path d="M17 4c-1.6 0-2.5 1.4-2.5 3S16 11 16 13s-1.5 3-1.5 4.5S15.4 20 17 20" />
        <path d="M9.5 12h5" />
      </IconStroke>
    ),
  },
  {
    id: "psicologia",
    label: "Psychologie",
    draw: () => (
      <IconStroke>
        <path d="M12 4a6 6 0 0 0-4 10.5V18h8v-3.5A6 6 0 0 0 12 4Z" />
        <path d="M9.5 20h5" />
      </IconStroke>
    ),
  },
  {
    id: "dentaria",
    label: "Médecine dentaire",
    draw: () => (
      <IconStroke>
        <path d="M8 4c-2 0-3 1.5-3 3.5 0 3 1 5 1.5 8 .3 1.6 1.2 2 1.8.4.4-1 .6-2.7 1.7-2.7s1.3 1.7 1.7 2.7c.6 1.6 1.5 1.2 1.8-.4.5-3 1.5-5 1.5-8C16 5.5 15 4 13 4c-1 0-1.6.6-1 .6S9 4 8 4Z" />
      </IconStroke>
    ),
  },
  {
    id: "nutricao",
    label: "Nutrition",
    draw: () => (
      <IconStroke>
        <path d="M12 21c4-1 6-4.5 6-9 0-3-2-6-6-6S6 9 6 12c0 4.5 2 8 6 9Z" />
        <path d="M12 6c2 1 2.5 3.5 1 6" />
      </IconStroke>
    ),
  },
  {
    id: "neurologia",
    label: "Neurologie",
    draw: () => (
      <IconStroke>
        <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 1 5 3 3 0 0 0 3 2.5V4Z" />
        <path d="M9 8h2M9 12h3M9 16h2" />
      </IconStroke>
    ),
  },
  {
    id: "fisioterapia",
    label: "Kinésithérapie",
    draw: () => (
      <IconStroke>
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v6m0 0-3 7m3-7 3 7M8 10h8" />
      </IconStroke>
    ),
  },
];

const STEPS: Step[] = [
  {
    id: "procurar",
    index: "01",
    title: "Recherchez",
    desc: "Choisissez la spécialité, la ville et la langue dans laquelle vous souhaitez être pris en charge.",
    draw: () => (
      <IconStroke size={28}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m20 20-3.5-3.5" />
      </IconStroke>
    ),
  },
  {
    id: "comparar",
    index: "02",
    title: "Comparez",
    desc: "Consultez les profils des professionnels vérifiés, les langues parlées et leur localisation.",
    draw: () => (
      <IconStroke size={28}>
        <path d="M4 19V9m6 10V5m6 14v-7" />
        <path d="M3 19h18" />
      </IconStroke>
    ),
  },
  {
    id: "marcar",
    index: "03",
    title: "Prenez rendez-vous (bientôt)",
    desc: "La prise de rendez-vous en ligne arrive bientôt. Pour l’instant, trouvez votre praticien en toute clarté.",
    draw: () => (
      <IconStroke size={28}>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3M9 14.5l2 2 4-4" />
      </IconStroke>
    ),
  },
];

const TRUST: TrustItem[] = [
  {
    id: "especialidades",
    value: "16",
    label: "spécialités couvertes",
    draw: () => (
      <IconStroke size={22}>
        <path d="M12 3v18M3 12h18" />
        <circle cx="12" cy="12" r="9" />
      </IconStroke>
    ),
  },
  {
    id: "linguas",
    value: "PT · FR · EN",
    label: "consultation dans votre langue",
    draw: () => (
      <IconStroke size={22}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z" />
      </IconStroke>
    ),
  },
  {
    id: "verificados",
    value: "100%",
    label: "professionnels vérifiés",
    draw: () => (
      <IconStroke size={22}>
        <path d="M12 3 5 6v5c0 4.3 2.9 8 7 9 4.1-1 7-4.7 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </IconStroke>
    ),
  },
  {
    id: "rgpd",
    value: "RGPD",
    label: "données protégées dans l’UE",
    draw: () => (
      <IconStroke size={22}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </IconStroke>
    ),
  },
];

const CIDADES = [
  "Lisbonne",
  "Porto",
  "Braga",
  "Coïmbre",
  "Faro",
  "Aveiro",
  "Setúbal",
  "Funchal",
];

/* ── Page ────────────────────────────────────────────────── */

export default function PatientVariant1() {
  const [lang, setLang] = useState<Lang>("PT");
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`pat1-root${mounted ? " is-ready" : ""}`}>
      <style>{`
        .pat1-root, .pat1-root * { box-sizing: border-box; }

        .pat1-root {
          position: relative;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          color: var(--color-dark-1);
          background:
            radial-gradient(1100px 720px at 82% -8%, rgba(var(--color-teal-rgb), 0.16), transparent 60%),
            radial-gradient(960px 640px at 8% 4%, rgba(var(--color-cobalt-rgb), 0.12), transparent 58%),
            linear-gradient(180deg, var(--color-light-1) 0%, var(--color-light-2) 100%);
          min-height: 100vh;
          overflow-x: clip;
          -webkit-font-smoothing: antialiased;
          line-height: 1.6;
        }

        /* Subtle grain for depth */
        .pat1-root::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
        }

        .pat1-wrap {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin-inline: auto;
          padding-inline: 24px;
        }

        /* Reveal cascade */
        .pat1-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pat1-root.is-ready .pat1-reveal { opacity: 1; transform: none; }

        /* ── Header ── */
        .pat1-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 22px 0 8px;
        }
        .pat1-brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 700;
          font-size: 20px;
          letter-spacing: -0.02em;
          color: var(--color-navy);
          text-decoration: none;
          line-height: 1;
        }
        .pat1-brand-mark {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 13px;
          color: #fff;
          background: linear-gradient(140deg, var(--color-teal), var(--color-cobalt));
          box-shadow: 0 10px 24px -10px rgba(var(--color-teal-rgb), 0.7);
        }
        .pat1-brand b { color: var(--color-teal); font-weight: 700; }
        .pat1-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 44px;
          padding: 0 16px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--color-navy);
          text-decoration: none;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(var(--color-navy-rgb), 0.12);
          backdrop-filter: blur(8px);
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }
        .pat1-back:hover {
          color: var(--color-navy);
          background: #fff;
          transform: translateY(-1px);
          box-shadow: 0 10px 26px -16px rgba(var(--color-navy-rgb), 0.5);
        }

        /* ── Hero ── */
        .pat1-hero {
          display: grid;
          grid-template-columns: 1.04fr 0.96fr;
          gap: 56px;
          align-items: center;
          padding: 54px 0 84px;
        }
        .pat1-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 7px 15px 7px 11px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--color-navy);
          background: rgba(var(--color-teal-rgb), 0.13);
          border: 1px solid rgba(var(--color-teal-rgb), 0.32);
        }
        .pat1-eyebrow .pat1-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.25);
          animation: pat1-pulse 2.4s ease-in-out infinite;
        }
        @keyframes pat1-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(var(--color-teal-rgb), 0.28); }
          50% { box-shadow: 0 0 0 7px rgba(var(--color-teal-rgb), 0.06); }
        }

        .pat1-h1 {
          font-family: var(--font-fraunces), Georgia, serif !important;
          font-weight: 600;
          text-transform: none !important;
          color: var(--color-navy);
          font-size: clamp(2.3rem, 5.4vw, 3.9rem);
          line-height: 1.04;
          letter-spacing: -0.025em;
          margin: 20px 0 0;
        }
        .pat1-h1 .pat1-accent {
          color: var(--color-teal);
          font-style: italic;
        }
        .pat1-lead {
          margin: 20px 0 0;
          max-width: 30em;
          font-size: clamp(1rem, 1.4vw, 1.12rem);
          line-height: 1.65;
          color: #44505f;
          font-weight: 400;
        }

        /* Search console */
        .pat1-console {
          margin-top: 30px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
          box-shadow: 0 26px 60px -34px rgba(var(--color-navy-rgb), 0.4);
          backdrop-filter: blur(10px);
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }
        .pat1-console.is-focused {
          box-shadow: 0 30px 70px -30px rgba(var(--color-teal-rgb), 0.55),
            0 0 0 1px rgba(var(--color-teal-rgb), 0.35);
          transform: translateY(-2px);
        }
        .pat1-fields {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 12px;
        }
        .pat1-field { position: relative; }
        .pat1-field-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-navy);
          margin: 0 0 6px 2px;
        }
        .pat1-input, .pat1-select {
          width: 100%;
          min-height: 50px;
          padding: 0 16px 0 44px;
          border-radius: 14px;
          border: 1px solid rgba(var(--color-navy-rgb), 0.16);
          background: var(--color-light-1);
          font-family: var(--font-montserrat), sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: var(--color-dark-1);
          line-height: 1.2;
          appearance: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .pat1-input::placeholder { color: #93a0b0; font-weight: 400; }
        .pat1-input:focus, .pat1-select:focus {
          outline: none;
          border-color: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.2);
        }
        .pat1-field-ico {
          position: absolute;
          left: 15px;
          bottom: 0;
          height: 50px;
          display: flex;
          align-items: center;
          color: var(--color-mint);
          pointer-events: none;
        }
        .pat1-select-chev {
          position: absolute;
          right: 15px;
          bottom: 17px;
          color: var(--color-mint);
          pointer-events: none;
        }

        .pat1-segrow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-top: 14px;
        }
        .pat1-seg {
          display: inline-flex;
          padding: 4px;
          gap: 4px;
          border-radius: 13px;
          background: rgba(var(--color-navy-rgb), 0.06);
        }
        .pat1-chip {
          min-height: 38px;
          padding: 0 15px;
          border: 0;
          border-radius: 10px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #5a6677;
          background: transparent;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .pat1-chip:hover { color: var(--color-navy); transform: translateY(-1px); }
        .pat1-chip.is-active {
          color: #fff;
          background: linear-gradient(135deg, var(--color-teal), var(--color-mint));
          box-shadow: 0 8px 18px -8px rgba(var(--color-teal-rgb), 0.7);
        }
        .pat1-seg-hint {
          font-size: 12.5px;
          color: #6b7787;
          font-weight: 500;
        }

        .pat1-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 52px;
          margin-top: 14px;
          padding: 0 22px;
          border: 0;
          border-radius: 14px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: #08332f;
          text-decoration: none;
          cursor: pointer;
          background: linear-gradient(135deg, var(--color-teal), #8fe0d3);
          box-shadow: 0 16px 34px -16px rgba(var(--color-teal-rgb), 0.85);
          transition: transform 0.2s ease, box-shadow 0.2s ease, gap 0.2s ease;
        }
        .pat1-btn:hover {
          color: #08332f;
          transform: translateY(-2px);
          gap: 14px;
          box-shadow: 0 22px 44px -16px rgba(var(--color-teal-rgb), 0.95);
        }
        .pat1-btn svg { transition: transform 0.2s ease; }
        .pat1-btn:hover svg { transform: translateX(3px); }

        .pat1-embreve {
          margin: 16px 2px 0;
          font-size: 12.5px;
          color: #6b7787;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pat1-embreve i { color: var(--color-cobalt); }

        /* ── Verified card (hero right) ── */
        .pat1-cardstage {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 420px;
        }
        .pat1-glow {
          position: absolute;
          inset: 6% 8%;
          border-radius: 40px;
          background: radial-gradient(closest-side, rgba(var(--color-teal-rgb), 0.4), transparent 75%);
          filter: blur(34px);
        }
        .pat1-vcard {
          position: relative;
          width: min(380px, 100%);
          padding: 26px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
          box-shadow: 0 30px 70px -30px rgba(var(--color-navy-rgb), 0.42);
          backdrop-filter: blur(6px);
        }
        .pat1-root.is-ready .pat1-vcard { animation: pat1-floatcard 7s ease-in-out 1.2s infinite; }
        @keyframes pat1-floatcard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .pat1-vcard-top {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .pat1-avatar {
          flex-shrink: 0;
          display: grid;
          place-items: center;
          width: 62px; height: 62px;
          border-radius: 18px;
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 22px;
          color: #fff;
          background: linear-gradient(140deg, var(--color-navy), var(--color-cobalt));
        }
        .pat1-vcard-name {
          margin: 0;
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: var(--color-navy);
          line-height: 1.2;
        }
        .pat1-vcard-spec {
          margin: 3px 0 0;
          font-size: 13px;
          color: #5a6677;
          font-weight: 500;
        }
        .pat1-verified {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 9px;
          padding: 4px 11px 4px 8px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #0b5b4f;
          background: rgba(var(--color-teal-rgb), 0.16);
          border: 1px solid rgba(var(--color-teal-rgb), 0.4);
        }
        .pat1-verified .pat1-check {
          display: grid; place-items: center;
          width: 16px; height: 16px;
          border-radius: 50%;
          color: #fff;
          background: var(--color-teal);
        }
        .pat1-root.is-ready .pat1-verified .pat1-check {
          animation: pat1-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.35s both;
        }
        @keyframes pat1-pop {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .pat1-vcard-divider {
          height: 1px;
          margin: 20px 0;
          background: linear-gradient(90deg, transparent, rgba(var(--color-navy-rgb), 0.14), transparent);
        }
        .pat1-vcard-meta {
          display: grid;
          gap: 13px;
        }
        .pat1-meta-row {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 13.5px;
          color: #44505f;
          font-weight: 500;
        }
        .pat1-meta-row .pat1-mico {
          display: grid; place-items: center;
          width: 30px; height: 30px;
          flex-shrink: 0;
          border-radius: 9px;
          color: var(--color-mint);
          background: rgba(var(--color-mint-rgb), 0.12);
        }
        .pat1-langpills { display: inline-flex; gap: 6px; }
        .pat1-langpill {
          padding: 3px 9px;
          border-radius: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: var(--color-navy);
          background: rgba(var(--color-cobalt-rgb), 0.12);
          border: 1px solid rgba(var(--color-cobalt-rgb), 0.22);
        }
        .pat1-stars { color: var(--color-teal); letter-spacing: 1px; font-size: 13px; }

        /* Floating mini badges around the card */
        .pat1-float {
          position: absolute;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 13px;
          border-radius: 14px;
          font-size: 12px;
          font-weight: 700;
          color: var(--color-navy);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 18px 40px -22px rgba(var(--color-navy-rgb), 0.5);
          border: 1px solid rgba(var(--color-navy-rgb), 0.07);
        }
        .pat1-float i { color: var(--color-teal); }
        .pat1-float-a { top: 2%; left: -4%; }
        .pat1-float-b { bottom: 4%; right: -3%; }
        .pat1-root.is-ready .pat1-float-a { animation: pat1-floatcard 6s ease-in-out 1.6s infinite; }
        .pat1-root.is-ready .pat1-float-b { animation: pat1-floatcard 6.5s ease-in-out 2s infinite reverse; }

        /* ── Section shell ── */
        .pat1-section { padding: 78px 0; }
        .pat1-section-head { max-width: 660px; margin: 0 auto 50px; text-align: center; }
        .pat1-kicker {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-mint);
          margin: 0 0 14px;
        }
        .pat1-h2 {
          font-family: var(--font-fraunces), Georgia, serif !important;
          font-weight: 600;
          text-transform: none !important;
          color: var(--color-navy);
          font-size: clamp(1.8rem, 3.6vw, 2.7rem);
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .pat1-sub {
          margin: 16px 0 0;
          font-size: 1rem;
          line-height: 1.6;
          color: #5a6677;
        }

        /* ── Trust band ── */
        .pat1-trust {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .pat1-trust-card {
          padding: 26px 22px;
          border-radius: 20px;
          background: #fff;
          border: 1px solid rgba(var(--color-navy-rgb), 0.07);
          box-shadow: 0 18px 50px -30px rgba(var(--color-navy-rgb), 0.3);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .pat1-trust-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 26px 56px -28px rgba(var(--color-teal-rgb), 0.45);
        }
        .pat1-trust-ico {
          display: grid; place-items: center;
          width: 46px; height: 46px;
          border-radius: 13px;
          color: var(--color-teal);
          background: rgba(var(--color-teal-rgb), 0.12);
          margin-bottom: 16px;
        }
        .pat1-trust-val {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 26px;
          color: var(--color-navy);
          line-height: 1;
        }
        .pat1-trust-lbl {
          margin: 9px 0 0;
          font-size: 13.5px;
          color: #5a6677;
          font-weight: 500;
          line-height: 1.45;
        }

        /* ── How it works ── */
        .pat1-steps {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
        }
        .pat1-steps::before {
          content: "";
          position: absolute;
          top: 47px;
          left: 16%;
          right: 16%;
          height: 2px;
          background: repeating-linear-gradient(90deg, rgba(var(--color-teal-rgb), 0.55) 0 10px, transparent 10px 20px);
          z-index: 0;
        }
        .pat1-step {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 0 8px;
        }
        .pat1-step-orb {
          position: relative;
          display: grid; place-items: center;
          width: 84px; height: 84px;
          margin: 0 auto 20px;
          border-radius: 50%;
          color: var(--color-navy);
          background: #fff;
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
          box-shadow: 0 18px 44px -26px rgba(var(--color-navy-rgb), 0.42);
        }
        .pat1-step-orb .pat1-stepnum {
          position: absolute;
          top: -6px; right: -6px;
          display: grid; place-items: center;
          width: 28px; height: 28px;
          border-radius: 50%;
          font-size: 11px;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, var(--color-teal), var(--color-mint));
          box-shadow: 0 6px 14px -6px rgba(var(--color-teal-rgb), 0.8);
        }
        .pat1-step-title {
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: var(--color-navy);
          margin: 0 0 9px;
        }
        .pat1-step-desc {
          font-size: 14px;
          line-height: 1.55;
          color: #5a6677;
          max-width: 24em;
          margin: 0 auto;
        }

        /* ── Specialties grid ── */
        .pat1-specs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .pat1-spec {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 18px;
          border-radius: 18px;
          background: #fff;
          border: 1px solid rgba(var(--color-navy-rgb), 0.07);
          box-shadow: 0 14px 40px -30px rgba(var(--color-navy-rgb), 0.3);
          text-decoration: none;
          color: var(--color-navy);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .pat1-spec:hover {
          color: var(--color-navy);
          transform: translateY(-3px);
          border-color: rgba(var(--color-teal-rgb), 0.4);
          box-shadow: 0 22px 48px -26px rgba(var(--color-teal-rgb), 0.5);
        }
        .pat1-spec-ico {
          display: grid; place-items: center;
          width: 44px; height: 44px;
          flex-shrink: 0;
          border-radius: 13px;
          color: var(--color-mint);
          background: rgba(var(--color-mint-rgb), 0.1);
          transition: color 0.22s ease, background 0.22s ease;
        }
        .pat1-spec:hover .pat1-spec-ico {
          color: #fff;
          background: linear-gradient(140deg, var(--color-teal), var(--color-mint));
        }
        .pat1-spec-label {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.25;
        }

        /* ── Security ── */
        .pat1-sec {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 56px;
          align-items: center;
        }
        .pat1-shield-stage {
          position: relative;
          display: grid; place-items: center;
          min-height: 320px;
        }
        .pat1-shield-glow {
          position: absolute;
          inset: 12%;
          border-radius: 50%;
          background: radial-gradient(closest-side, rgba(var(--color-teal-rgb), 0.34), transparent 72%);
          filter: blur(30px);
        }
        .pat1-shield {
          position: relative;
          display: grid; place-items: center;
          width: 200px; height: 200px;
          border-radius: 36px;
          color: var(--color-teal);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
          box-shadow: 0 30px 64px -30px rgba(var(--color-navy-rgb), 0.4);
        }
        .pat1-root.is-ready .pat1-shield { animation: pat1-floatcard 8s ease-in-out 1s infinite; }
        .pat1-sec-list { display: grid; gap: 18px; margin: 26px 0 0; padding: 0; list-style: none; }
        .pat1-sec-item { display: flex; gap: 15px; }
        .pat1-sec-item .pat1-sec-ico {
          flex-shrink: 0;
          display: grid; place-items: center;
          width: 42px; height: 42px;
          border-radius: 12px;
          color: var(--color-teal);
          background: rgba(var(--color-teal-rgb), 0.12);
        }
        .pat1-sec-item h3 {
          font-family: var(--font-montserrat), sans-serif !important;
          font-weight: 700;
          font-size: 16px;
          color: var(--color-navy);
          margin: 2px 0 5px;
          text-transform: none !important;
        }
        .pat1-sec-item p { margin: 0; font-size: 14px; line-height: 1.55; color: #5a6677; }

        /* ── Final CTA ── */
        .pat1-cta {
          position: relative;
          overflow: hidden;
          padding: 64px 48px;
          border-radius: 30px;
          text-align: center;
          background:
            radial-gradient(640px 360px at 80% 0%, rgba(var(--color-teal-rgb), 0.22), transparent 60%),
            radial-gradient(560px 320px at 10% 100%, rgba(var(--color-cobalt-rgb), 0.18), transparent 60%),
            #fff;
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
          box-shadow: 0 36px 80px -40px rgba(var(--color-navy-rgb), 0.45);
        }
        .pat1-cta h2 {
          font-family: var(--font-fraunces), Georgia, serif !important;
          font-weight: 600;
          text-transform: none !important;
          color: var(--color-navy);
          font-size: clamp(1.9rem, 4vw, 2.8rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 auto;
          max-width: 16em;
        }
        .pat1-cta p {
          margin: 16px auto 0;
          max-width: 34em;
          font-size: 1rem;
          line-height: 1.6;
          color: #5a6677;
        }
        .pat1-cta-actions {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          margin-top: 30px;
        }
        .pat1-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          min-height: 52px;
          padding: 0 26px;
          border-radius: 14px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--color-navy);
          text-decoration: none;
          background: #fff;
          border: 1.5px solid rgba(var(--color-navy-rgb), 0.2);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .pat1-btn-ghost:hover {
          color: var(--color-navy);
          transform: translateY(-2px);
          border-color: var(--color-teal);
          box-shadow: 0 16px 34px -22px rgba(var(--color-teal-rgb), 0.6);
        }
        .pat1-cta .pat1-btn { width: auto; margin-top: 0; }

        /* ── Footer ── */
        .pat1-footer {
          padding: 40px 0 56px;
          margin-top: 56px;
          border-top: 1px solid rgba(var(--color-navy-rgb), 0.1);
        }
        .pat1-footer-inner {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }
        .pat1-footer-note { font-size: 12.5px; color: #6b7787; max-width: 40em; line-height: 1.5; }
        .pat1-footer-links { display: inline-flex; gap: 22px; flex-wrap: wrap; }
        .pat1-footer-links a {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-navy);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .pat1-footer-links a:hover { color: var(--color-teal); }
        .pat1-illu-note {
          display: inline-block;
          margin-top: 22px;
          font-size: 11.5px;
          color: #93a0b0;
          font-style: italic;
        }

        /* Reveal delays */
        .pat1-d1 { transition-delay: 0.06s; }
        .pat1-d2 { transition-delay: 0.12s; }
        .pat1-d3 { transition-delay: 0.18s; }
        .pat1-d4 { transition-delay: 0.24s; }
        .pat1-d5 { transition-delay: 0.30s; }
        .pat1-d6 { transition-delay: 0.36s; }
        .pat1-d7 { transition-delay: 0.42s; }
        .pat1-d8 { transition-delay: 0.48s; }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .pat1-hero { grid-template-columns: 1fr; gap: 44px; padding-bottom: 60px; }
          .pat1-cardstage { min-height: 360px; }
          .pat1-trust { grid-template-columns: repeat(2, 1fr); }
          .pat1-specs { grid-template-columns: repeat(3, 1fr); }
          .pat1-sec { grid-template-columns: 1fr; gap: 36px; }
          .pat1-shield-stage { min-height: 240px; }
        }
        @media (max-width: 640px) {
          .pat1-wrap { padding-inline: 18px; }
          .pat1-hero { padding-top: 32px; }
          .pat1-fields { grid-template-columns: 1fr; }
          .pat1-steps { grid-template-columns: 1fr; gap: 30px; }
          .pat1-steps::before { display: none; }
          .pat1-specs { grid-template-columns: repeat(2, 1fr); }
          .pat1-section { padding: 56px 0; }
          .pat1-cta { padding: 44px 22px; }
          .pat1-float-a { left: 0; }
          .pat1-float-b { right: 0; }
        }
        @media (max-width: 380px) {
          .pat1-specs { grid-template-columns: 1fr; }
          .pat1-trust { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pat1-reveal, .pat1-vcard, .pat1-float-a, .pat1-float-b,
          .pat1-shield, .pat1-eyebrow .pat1-dot, .pat1-verified .pat1-check {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="pat1-wrap">
        {/* ── Header ── */}
        <header className="pat1-header">
          <a className="pat1-brand" href="#" aria-label="DocAgora, accueil">
            <span className="pat1-brand-mark" aria-hidden="true">
              <IconStroke size={22}>
                <path d="M12 5v14M5 12h14" />
              </IconStroke>
            </span>
            Doc<b>Agora</b>
          </a>
          <Link className="pat1-back" href="/variants">
            <i className="fas fa-arrow-right" style={{ transform: "rotate(180deg)" }} aria-hidden="true" />
            ← Variantes
          </Link>
        </header>

        {/* ── Hero ── */}
        <section className="pat1-hero" aria-labelledby="pat1-hero-title">
          <div>
            <span className="pat1-eyebrow pat1-reveal pat1-d1">
              <span className="pat1-dot" aria-hidden="true" />
              Recherche gratuite &middot; Portugal
            </span>

            <h1 id="pat1-hero-title" className="pat1-h1 pat1-reveal pat1-d2">
              Trouvez un médecin qui{" "}
              <span className="pat1-accent">parle votre langue</span>
            </h1>

            <p className="pat1-lead pat1-reveal pat1-d3">
              Recherchez des professionnels de santé vérifiés au Portugal, en
              français, portugais ou anglais. Simple, gratuit et clair
              &mdash; la prise de rendez-vous en ligne arrive bientôt.
            </p>

            {/* Search console */}
            <div
              className={`pat1-console pat1-reveal pat1-d4${focused ? " is-focused" : ""}`}
              role="search"
              aria-label="Rechercher des professionnels de santé"
            >
              <div className="pat1-fields">
                <div className="pat1-field">
                  <label className="pat1-field-label" htmlFor="pat1-spec">
                    Spécialité
                  </label>
                  <span className="pat1-field-ico" aria-hidden="true">
                    <IconStroke size={18}>
                      <circle cx="11" cy="11" r="6.5" />
                      <path d="m20 20-3.5-3.5" />
                    </IconStroke>
                  </span>
                  <input
                    id="pat1-spec"
                    className="pat1-input"
                    type="text"
                    placeholder="Cardiologie, pédiatrie…"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                  />
                </div>

                <div className="pat1-field">
                  <label className="pat1-field-label" htmlFor="pat1-city">
                    Ville
                  </label>
                  <span className="pat1-field-ico" aria-hidden="true">
                    <IconStroke size={18}>
                      <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10Z" />
                      <circle cx="12" cy="11" r="2.3" />
                    </IconStroke>
                  </span>
                  <select
                    id="pat1-city"
                    className="pat1-select"
                    defaultValue=""
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                  >
                    <option value="" disabled>
                      Choisissez une ville
                    </option>
                    {CIDADES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <span className="pat1-select-chev" aria-hidden="true">
                    <IconStroke size={16}>
                      <path d="m6 9 6 6 6-6" />
                    </IconStroke>
                  </span>
                </div>
              </div>

              <div className="pat1-segrow">
                <div
                  className="pat1-seg"
                  role="group"
                  aria-label="Langue de consultation"
                >
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`pat1-chip${lang === l ? " is-active" : ""}`}
                      aria-pressed={lang === l}
                      onClick={() => setLang(l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <span className="pat1-seg-hint">
                  Consultation en {lang === "PT" ? "portugais" : lang === "FR" ? "français" : "anglais"}
                </span>
              </div>

              <a className="pat1-btn" href="#especialidades">
                Rechercher
                <IconStroke size={18}>
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </IconStroke>
              </a>

              <p className="pat1-embreve">
                <i className="fas fa-calendar-check" aria-hidden="true" />
                Prise de rendez-vous en ligne &mdash; bientôt. Pour l’instant, la recherche est
                gratuite.
              </p>
            </div>
          </div>

          {/* Verified card */}
          <div className="pat1-cardstage pat1-reveal pat1-d3" aria-hidden="false">
            <span className="pat1-glow" aria-hidden="true" />

            <div className="pat1-float pat1-float-a">
              <i className="fas fa-language" aria-hidden="true" />
              PT &middot; FR &middot; EN
            </div>

            <article
              className="pat1-vcard"
              aria-label="Exemple illustratif de profil de professionnel de santé"
            >
              <div className="pat1-vcard-top">
                <span className="pat1-avatar" aria-hidden="true">
                  AM
                </span>
                <div>
                  <p className="pat1-vcard-name">Dr. Ana Marques</p>
                  <p className="pat1-vcard-spec">
                    Médecine générale &middot; Lisbonne
                  </p>
                  <span className="pat1-verified">
                    <span className="pat1-check" aria-hidden="true">
                      <IconStroke size={11}>
                        <path d="m5 12 4 4 10-10" />
                      </IconStroke>
                    </span>
                    Vérifié
                  </span>
                </div>
              </div>

              <div className="pat1-vcard-divider" aria-hidden="true" />

              <div className="pat1-vcard-meta">
                <div className="pat1-meta-row">
                  <span className="pat1-mico" aria-hidden="true">
                    <IconStroke size={16}>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z" />
                    </IconStroke>
                  </span>
                  <span className="pat1-langpills">
                    <span className="pat1-langpill">PT</span>
                    <span className="pat1-langpill">FR</span>
                    <span className="pat1-langpill">EN</span>
                  </span>
                </div>
                <div className="pat1-meta-row">
                  <span className="pat1-mico" aria-hidden="true">
                    <IconStroke size={16}>
                      <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10Z" />
                      <circle cx="12" cy="11" r="2.3" />
                    </IconStroke>
                  </span>
                  Avenida da Liberdade, Lisbonne
                </div>
                <div className="pat1-meta-row">
                  <span className="pat1-mico" aria-hidden="true">
                    <IconStroke size={16}>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </IconStroke>
                  </span>
                  Accepte de nouveaux patients
                  <span className="pat1-stars" aria-hidden="true">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </span>
                </div>
              </div>
            </article>

            <div className="pat1-float pat1-float-b">
              <i className="fas fa-shield-alt" aria-hidden="true" />
              Profil vérifié
            </div>
          </div>
        </section>
      </div>

      {/* ── Trust band ── */}
      <section className="pat1-section" aria-labelledby="pat1-trust-title">
        <div className="pat1-wrap">
          <div className="pat1-section-head">
            <span className="pat1-kicker pat1-reveal pat1-d1">
              Confiance
            </span>
            <h2 id="pat1-trust-title" className="pat1-h2 pat1-reveal pat1-d2">
              Une base solide pour votre recherche
            </h2>
            <p className="pat1-sub pat1-reveal pat1-d3">
              Tout ce qu’il vous faut pour trouver le bon praticien, avec la
              tranquillité de savoir que chaque profil a été vérifié.
            </p>
          </div>

          <div className="pat1-trust">
            {TRUST.map((t, i) => (
              <div
                key={t.id}
                className={`pat1-trust-card pat1-reveal pat1-d${i + 2}`}
              >
                <span className="pat1-trust-ico" aria-hidden="true">
                  {t.draw()}
                </span>
                <div className="pat1-trust-val">{t.value}</div>
                <p className="pat1-trust-lbl">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="pat1-section" aria-labelledby="pat1-how-title">
        <div className="pat1-wrap">
          <div className="pat1-section-head">
            <span className="pat1-kicker pat1-reveal pat1-d1">
              Comment ça marche
            </span>
            <h2 id="pat1-how-title" className="pat1-h2 pat1-reveal pat1-d2">
              Trois étapes simples et claires
            </h2>
            <p className="pat1-sub pat1-reveal pat1-d3">
              Sans complication, sans frais. La recherche est gratuite et la prise
              de rendez-vous en ligne arrive bientôt.
            </p>
          </div>

          <div className="pat1-steps">
            {STEPS.map((s, i) => (
              <div key={s.id} className={`pat1-step pat1-reveal pat1-d${i + 3}`}>
                <div className="pat1-step-orb">
                  <span className="pat1-stepnum" aria-hidden="true">
                    {s.index}
                  </span>
                  {s.draw()}
                </div>
                <h3 className="pat1-step-title">{s.title}</h3>
                <p className="pat1-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specialties ── */}
      <section
        className="pat1-section"
        id="especialidades"
        aria-labelledby="pat1-spec-title"
      >
        <div className="pat1-wrap">
          <div className="pat1-section-head">
            <span className="pat1-kicker pat1-reveal pat1-d1">
              Spécialités
            </span>
            <h2 id="pat1-spec-title" className="pat1-h2 pat1-reveal pat1-d2">
              16 spécialités, une seule recherche
            </h2>
            <p className="pat1-sub pat1-reveal pat1-d3">
              De la médecine générale à la kinésithérapie, trouvez le soin dont vous avez besoin
              près de chez vous.
            </p>
          </div>

          <div className="pat1-specs">
            {SPECIALTIES.map((sp, i) => (
              <a
                key={sp.id}
                className={`pat1-spec pat1-reveal pat1-d${(i % 6) + 2}`}
                href="#"
                aria-label={`Rechercher en ${sp.label}`}
              >
                <span className="pat1-spec-ico" aria-hidden="true">
                  {sp.draw()}
                </span>
                <span className="pat1-spec-label">{sp.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security & trust ── */}
      <section className="pat1-section" aria-labelledby="pat1-sec-title">
        <div className="pat1-wrap">
          <div className="pat1-sec">
            <div className="pat1-shield-stage pat1-reveal pat1-d2">
              <span className="pat1-shield-glow" aria-hidden="true" />
              <div className="pat1-shield" aria-hidden="true">
                <IconStroke size={92}>
                  <path d="M12 3 5 6v5c0 4.3 2.9 8 7 9 4.1-1 7-4.7 7-9V6l-7-3Z" />
                  <rect x="9" y="11" width="6" height="5" rx="1" />
                  <path d="M10 11V9.5a2 2 0 0 1 4 0V11" />
                </IconStroke>
              </div>
            </div>

            <div>
              <span className="pat1-kicker pat1-reveal pat1-d1">
                Sécurité &amp; confiance
              </span>
              <h2 id="pat1-sec-title" className="pat1-h2 pat1-reveal pat1-d2">
                Vos données, traitées avec le plus grand soin
              </h2>

              <ul className="pat1-sec-list">
                <li className="pat1-sec-item pat1-reveal pat1-d3">
                  <span className="pat1-sec-ico" aria-hidden="true">
                    <IconStroke size={20}>
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </IconStroke>
                  </span>
                  <div>
                    <h3>Conforme au RGPD</h3>
                    <p>
                      Vos informations sont traitées conformément au Règlement
                      Général sur la Protection des Données de l’Union Européenne.
                    </p>
                  </div>
                </li>
                <li className="pat1-sec-item pat1-reveal pat1-d4">
                  <span className="pat1-sec-ico" aria-hidden="true">
                    <IconStroke size={20}>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z" />
                    </IconStroke>
                  </span>
                  <div>
                    <h3>Données hébergées dans l’UE</h3>
                    <p>
                      L’infrastructure est localisée dans l’Union Européenne,
                      avec des accès contrôlés et un chiffrement des données.
                    </p>
                  </div>
                </li>
                <li className="pat1-sec-item pat1-reveal pat1-d5">
                  <span className="pat1-sec-ico" aria-hidden="true">
                    <IconStroke size={20}>
                      <path d="M12 3 5 6v5c0 4.3 2.9 8 7 9 4.1-1 7-4.7 7-9V6l-7-3Z" />
                      <path d="m9 12 2 2 4-4" />
                    </IconStroke>
                  </span>
                  <div>
                    <h3>Professionnels vérifiés</h3>
                    <p>
                      Chaque profil est vérifié avant d’apparaître
                      dans les résultats de recherche.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="pat1-section" aria-labelledby="pat1-cta-title">
        <div className="pat1-wrap">
          <div className="pat1-cta pat1-reveal pat1-d1">
            <h2 id="pat1-cta-title">
              Commencez à chercher votre médecin dès aujourd’hui
            </h2>
            <p>
              La recherche est gratuite et disponible en français, portugais et
              anglais. Trouvez des professionnels vérifiés près de chez vous &mdash; la
              prise de rendez-vous en ligne arrive bientôt.
            </p>
            <div className="pat1-cta-actions">
              <a className="pat1-btn" href="#especialidades">
                Rechercher maintenant
                <IconStroke size={18}>
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </IconStroke>
              </a>
              <a className="pat1-btn-ghost" href="#especialidades">
                <i className="fas fa-globe-europe" aria-hidden="true" />
                Voir les spécialités
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pat1-footer">
        <div className="pat1-wrap">
          <div className="pat1-footer-inner">
            <a className="pat1-brand" href="#" aria-label="DocAgora">
              <span className="pat1-brand-mark" aria-hidden="true">
                <IconStroke size={22}>
                  <path d="M12 5v14M5 12h14" />
                </IconStroke>
              </span>
              Doc<b>Agora</b>
            </a>
            <nav className="pat1-footer-links" aria-label="Liens de pied de page">
              <a href="#especialidades">Spécialités</a>
              <a href="#">Comment ça marche</a>
              <a href="#">Confidentialité</a>
              <Link href="/variants">Variantes</Link>
            </nav>
          </div>
          <p className="pat1-footer-note">
            DocAgora &mdash; recherche gratuite de professionnels de santé
            vérifiés au Portugal. Les profils et avis présentés sur cette
            page sont à titre purement illustratif.
          </p>
          <span className="pat1-illu-note">
            *Profils, avis et chiffres présentés sont illustratifs.
          </span>
        </div>
      </footer>
    </div>
  );
}
