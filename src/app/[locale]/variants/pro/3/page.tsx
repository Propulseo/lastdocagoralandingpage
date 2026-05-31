"use client";

import { useEffect, useRef, useState } from "react";

/**
 * /variants/pro/3 — "Orbite"
 * Dark SaaS audacieux · glassmorphism · orbes lumineux · compteurs animés.
 * Variante landing PRO pour DocAgora. FR-FR. Auto-suffisante (un seul fichier).
 * Tokens, Bootstrap, Font Awesome et polices chargés par le layout [locale].
 */

/* ── Données illustratives (KPIs, fonctionnalités, etc.) ── */

type Kpi = {
  id: string;
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  hint: string;
};

const KPIS: Kpi[] = [
  { id: "horas", value: 6, suffix: "h", decimals: 0, label: "heures gagnées / semaine", hint: "moins d’appels et de gestion manuelle" },
  { id: "faltas", value: 38, suffix: "%", decimals: 0, label: "% de rendez-vous manqués en moins", hint: "avec les rappels automatiques" },
  { id: "marcacoes", value: 1240, suffix: "+", decimals: 0, label: "rendez-vous organisés", hint: "dans un seul panneau clair" },
];

type Feature = {
  id: string;
  title: string;
  desc: string;
  badge?: string;
  icon: "agenda" | "pulse" | "shield" | "globe";
};

const FEATURES: Feature[] = [
  {
    id: "perfil",
    title: "Profil vérifié",
    desc: "Votre fiche publique, validée par l’équipe DocAgora : spécialité, adresse et horaires toujours exacts.",
    icon: "shield",
  },
  {
    id: "agenda",
    title: "Agenda en un seul endroit",
    desc: "Visualisez les rendez-vous de la semaine dans un panneau clair. Sans feuilles éparpillées, sans confusion d’horaires.",
    badge: "bientôt",
    icon: "agenda",
  },
  {
    id: "lembretes",
    title: "Rappels automatiques",
    desc: "Les patients reçoivent une notification avant la consultation. Moins d’oublis, agenda plus prévisible.",
    badge: "bientôt",
    icon: "pulse",
  },
  {
    id: "multilingue",
    title: "Visible en PT · FR · EN",
    desc: "Trouvé par les résidents et par ceux qui arrivent de l’étranger. Une seule fiche, trois langues.",
    icon: "globe",
  },
];

type Reason = { id: string; title: string; desc: string };

const REASONS: Reason[] = [
  { id: "gratis", title: "Être présent, c’est gratuit", desc: "Créer et maintenir votre profil vérifié est sans frais. Sans petites lignes." },
  { id: "claro", title: "Simple et direct", desc: "Conçu pour le quotidien du cabinet, pas pour les informaticiens. Tout là où vous l’attendez." },
  { id: "confianca", title: "La confiance avant tout", desc: "Professionnels vérifiés, données traitées avec soin et respect de la vie privée." },
];

/* ── Compteur animé (entrée en viewport, respect reduced-motion) ── */

const COUNT_DURATION_MS = 1600;

function useCountUp(target: number, start: boolean, decimals: number) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setDisplay(target);
      return;
    }

    const begin = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - begin) / COUNT_DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(target * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target]);

  const factor = Math.pow(10, decimals);
  const rounded = Math.round(display * factor) / factor;
  return rounded.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function KpiCard({ kpi, start, index }: { kpi: Kpi; start: boolean; index: number }) {
  const value = useCountUp(kpi.value, start, kpi.decimals);
  return (
    <article className="pro3-kpi" style={{ animationDelay: `${index * 90}ms` }}>
      <p className="pro3-kpi__value">
        {value}
        <span className="pro3-kpi__suffix">{kpi.suffix}</span>
        <span className="pro3-kpi__star" aria-hidden="true">*</span>
      </p>
      <p className="pro3-kpi__label">{kpi.label}</p>
      <p className="pro3-kpi__hint">{kpi.hint}</p>
    </article>
  );
}

/* ── Icônes SVG inline (currentColor) ── */

function FeatureIcon({ name }: { name: Feature["icon"] }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "agenda":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
          <path d="M3 9h18M8 2.5v4M16 2.5v4" />
          <path d="M8 13.5l2.2 2.2L15 11.5" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <path d="M2 12h4l2.5-6 4 13 2.5-7H22" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 2.5l7.5 3v5.5c0 4.6-3.2 8.4-7.5 10-4.3-1.6-7.5-5.4-7.5-10V5.5z" />
          <path d="M9 12l2 2 4-4.5" />
        </svg>
      );
    case "globe":
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9.2" />
          <path d="M2.8 12h18.4M12 2.8c2.6 2.4 4 5.7 4 9.2s-1.4 6.8-4 9.2c-2.6-2.4-4-5.7-4-9.2s1.4-6.8 4-9.2z" />
        </svg>
      );
  }
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Page ── */

export default function ProVariant3() {
  const kpiRef = useRef<HTMLDivElement | null>(null);
  const [kpiVisible, setKpiVisible] = useState(false);

  useEffect(() => {
    const node = kpiRef.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setKpiVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setKpiVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="pro3">
      <style>{`
        .pro3 {
          box-sizing: border-box;
          position: relative;
          overflow-x: clip;
          min-height: 100vh;
          font-family: var(--font-montserrat), system-ui, sans-serif;
          color: rgba(255, 255, 255, 0.78);
          background: var(--color-dark-2);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        .pro3 *, .pro3 *::before, .pro3 *::after { box-sizing: border-box; }

        .pro3 h1, .pro3 h2, .pro3 h3 {
          font-family: var(--font-montserrat), system-ui, sans-serif;
          color: #fff; margin: 0; line-height: 1.08;
          letter-spacing: -0.02em; text-transform: none; font-weight: 700;
        }
        .pro3 p { margin: 0; }

        .pro3__inner { width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 3; }

        /* ── Atmosphère : orbes + mesh + grain ── */
        .pro3__sky { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .pro3__orb { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.55; will-change: transform; }
        .pro3__orb--a {
          width: 540px; height: 540px; top: -160px; left: -120px;
          background: radial-gradient(circle, rgba(var(--color-cobalt-rgb), 0.9), transparent 68%);
          animation: pro3-drift-a 26s ease-in-out infinite;
        }
        .pro3__orb--b {
          width: 460px; height: 460px; top: 60px; right: -130px;
          background: radial-gradient(circle, rgba(var(--color-teal-rgb), 0.85), transparent 66%);
          animation: pro3-drift-b 30s ease-in-out infinite;
        }
        .pro3__orb--c {
          width: 600px; height: 600px; top: 1100px; left: 30%;
          background: radial-gradient(circle, rgba(var(--color-mint-rgb), 0.55), transparent 70%);
          animation: pro3-drift-c 34s ease-in-out infinite;
        }
        .pro3__grid-bg {
          position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.5;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(120% 90% at 50% 0%, #000 0%, transparent 75%);
          -webkit-mask-image: radial-gradient(120% 90% at 50% 0%, #000 0%, transparent 75%);
        }
        .pro3__grain {
          position: fixed; inset: 0; z-index: 2; pointer-events: none; opacity: 0.045;
          background-image: radial-gradient(rgba(255,255,255,0.8) 0.5px, transparent 0.5px);
          background-size: 3px 3px;
        }

        /* ── Verre (glass) générique avec fallback opaque ── */
        .pro3-glass {
          background: rgba(var(--color-dark-1-rgb), 0.72);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
        }
        @supports ((backdrop-filter: blur(14px)) or (-webkit-backdrop-filter: blur(14px))) {
          .pro3-glass {
            background: rgba(255,255,255,0.06);
            backdrop-filter: blur(14px) saturate(1.3);
            -webkit-backdrop-filter: blur(14px) saturate(1.3);
          }
        }

        /* ── Nav ── */
        .pro3-nav {
          position: relative; z-index: 5;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; padding: 22px 0;
        }
        .pro3-nav__brand {
          display: inline-flex; align-items: center; gap: 10px;
          font-weight: 700; font-size: 19px; letter-spacing: -0.02em; color: #fff;
          text-decoration: none;
        }
        .pro3-nav__dot {
          width: 11px; height: 11px; border-radius: 50%;
          background: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.22), 0 0 16px rgba(var(--color-teal-rgb), 0.9);
        }
        .pro3-nav__back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 500; letter-spacing: 0.02em;
          color: rgba(255,255,255,0.6); text-decoration: none;
          padding: 8px 14px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.12);
          transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
          min-height: 40px;
        }
        .pro3-nav__back:hover { color: #fff; border-color: rgba(var(--color-teal-rgb), 0.6); background: rgba(var(--color-teal-rgb), 0.08); }

        /* ── Eyebrow ── */
        .pro3-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--color-teal); margin: 0;
        }
        .pro3-eyebrow span { display: inline-block; width: 34px; height: 1px; background: linear-gradient(90deg, var(--color-teal), transparent); }

        /* ── Hero ── */
        .pro3-hero { position: relative; z-index: 3; padding: clamp(40px, 7vh, 84px) 0 clamp(56px, 9vh, 110px); }
        .pro3-hero__grid {
          display: grid; grid-template-columns: 1.05fr 0.95fr; gap: clamp(32px, 5vw, 70px); align-items: center;
        }
        .pro3-hero__title {
          font-size: clamp(40px, 6.4vw, 78px); margin: 22px 0 0; max-width: 14ch;
        }
        .pro3-hero__title em {
          font-family: var(--font-fraunces), Georgia, serif; font-style: italic; font-weight: 500;
          color: var(--color-teal);
        }
        .pro3-hero__lead {
          margin: 22px 0 0; font-size: clamp(16px, 1.7vw, 19px); line-height: 1.7;
          color: rgba(255,255,255,0.66); max-width: 46ch;
        }
        .pro3-hero__cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 34px; }
        .pro3-hero__note {
          margin-top: 20px; font-size: 13px; color: rgba(255,255,255,0.45);
          display: inline-flex; align-items: center; gap: 8px;
        }
        .pro3-hero__note i { color: var(--color-teal); }

        /* ── Boutons ── */
        .pro3-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          padding: 14px 26px; min-height: 48px; border-radius: 50px; cursor: pointer;
          font-family: inherit; font-size: 15px; font-weight: 600; letter-spacing: 0.01em;
          text-decoration: none; border: 1px solid transparent; line-height: 1;
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease, background 0.28s ease, border-color 0.28s ease;
        }
        .pro3-btn svg { transition: transform 0.28s ease; }
        .pro3-btn--primary {
          color: var(--color-dark-2);
          background: linear-gradient(135deg, var(--color-teal), var(--color-cobalt));
          box-shadow: 0 12px 34px -12px rgba(var(--color-teal-rgb), 0.8);
        }
        .pro3-btn--primary:hover { transform: translateY(-3px); box-shadow: 0 20px 44px -14px rgba(var(--color-teal-rgb), 0.95); color: var(--color-dark-2); }
        .pro3-btn--primary:hover svg { transform: translateX(4px); }
        .pro3-btn--ghost {
          color: #fff; background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.18);
        }
        .pro3-btn--ghost:hover { transform: translateY(-3px); border-color: rgba(var(--color-teal-rgb), 0.65); background: rgba(var(--color-teal-rgb), 0.1); color: #fff; }
        .pro3-btn:focus-visible { outline: 2px solid var(--color-teal); outline-offset: 3px; }

        /* ── Cartes glass flottantes (hero) ── */
        .pro3-hero__stack { position: relative; min-height: 360px; }
        .pro3-floatcard {
          position: relative; padding: 22px 24px; border-radius: 20px;
          box-shadow: 0 30px 70px -34px rgba(0,0,0,0.85);
        }
        .pro3-floatcard--main { animation: pro3-bob 7s ease-in-out infinite; }
        .pro3-floatcard--pill {
          position: absolute; padding: 12px 16px; border-radius: 16px; z-index: 4;
          display: inline-flex; align-items: center; gap: 11px; font-size: 13px; color: #fff;
        }
        .pro3-floatcard--pill-a { top: -26px; right: 8px; animation: pro3-bob 6s ease-in-out infinite; }
        .pro3-floatcard--pill-b { bottom: -24px; left: -10px; animation: pro3-bob 8s ease-in-out infinite reverse; }
        .pro3-floatcard__icon {
          width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
          display: grid; place-items: center; color: var(--color-teal);
          background: rgba(var(--color-teal-rgb), 0.14); border: 1px solid rgba(var(--color-teal-rgb), 0.3);
        }
        .pro3-floatcard__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
        .pro3-floatcard__title { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.92); }
        .pro3-floatcard__tag {
          font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 10px; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--color-teal);
          padding: 4px 9px; border-radius: 50px; border: 1px solid rgba(var(--color-teal-rgb), 0.4);
        }
        .pro3-slot {
          display: flex; align-items: center; gap: 13px; padding: 12px 14px; margin-bottom: 9px;
          border-radius: 13px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
        }
        .pro3-slot:last-child { margin-bottom: 0; }
        .pro3-slot__time {
          font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 13px; font-weight: 600;
          color: var(--color-teal); min-width: 48px;
        }
        .pro3-slot__who { font-size: 13px; color: rgba(255,255,255,0.85); font-weight: 500; }
        .pro3-slot__meta { font-size: 11px; color: rgba(255,255,255,0.45); }
        .pro3-slot__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-teal); margin-left: auto; box-shadow: 0 0 10px rgba(var(--color-teal-rgb), 0.9); }

        /* ── Sections génériques ── */
        .pro3-section { position: relative; z-index: 3; padding: clamp(64px, 11vh, 130px) 0; }
        .pro3-section__head { max-width: 60ch; margin-bottom: clamp(36px, 5vh, 58px); }
        .pro3-section__title { font-size: clamp(30px, 4.4vw, 50px); margin: 16px 0 0; }
        .pro3-section__title em { font-family: var(--font-fraunces), Georgia, serif; font-style: italic; font-weight: 500; color: var(--color-teal); }
        .pro3-section__lead { margin: 18px 0 0; font-size: clamp(15px, 1.6vw, 18px); line-height: 1.7; color: rgba(255,255,255,0.62); }

        /* ── KPI ── */
        .pro3-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .pro3-kpi {
          padding: 34px 30px; border-radius: 22px; position: relative; overflow: hidden;
          background: rgba(var(--color-dark-1-rgb), 0.72); border: 1px solid rgba(255,255,255,0.12);
          opacity: 0; animation: pro3-rise 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @supports ((backdrop-filter: blur(14px)) or (-webkit-backdrop-filter: blur(14px))) {
          .pro3-kpi { background: rgba(255,255,255,0.05); backdrop-filter: blur(14px) saturate(1.3); -webkit-backdrop-filter: blur(14px) saturate(1.3); }
        }
        .pro3-kpi::before {
          content: ""; position: absolute; inset: 0; opacity: 0.5; pointer-events: none;
          background: radial-gradient(110% 80% at 0% 0%, rgba(var(--color-teal-rgb), 0.18), transparent 55%);
        }
        .pro3-kpi__value {
          position: relative; font-size: clamp(46px, 6vw, 64px); font-weight: 700; color: #fff;
          letter-spacing: -0.03em; line-height: 1; font-variant-numeric: tabular-nums;
          display: flex; align-items: flex-start; gap: 2px;
        }
        .pro3-kpi__suffix { font-size: 0.5em; font-weight: 600; color: var(--color-teal); align-self: flex-end; padding-bottom: 0.18em; }
        .pro3-kpi__star { font-size: 0.4em; color: rgba(var(--color-teal-rgb), 0.8); margin-left: 3px; }
        .pro3-kpi__label { position: relative; margin-top: 16px; font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.9); }
        .pro3-kpi__hint { position: relative; margin-top: 6px; font-size: 13px; color: rgba(255,255,255,0.5); }
        .pro3-kpis__note { margin-top: 22px; font-size: 12px; color: rgba(255,255,255,0.4); font-family: ui-monospace, "SF Mono", Menlo, monospace; letter-spacing: 0.04em; }

        /* ── Funcionalidades ── */
        .pro3-features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
        .pro3-feature {
          position: relative; padding: 30px 28px; border-radius: 20px; overflow: hidden;
          background: rgba(var(--color-dark-1-rgb), 0.72); border: 1px solid rgba(255,255,255,0.12);
          transition: transform 0.34s cubic-bezier(0.22,1,0.36,1), border-color 0.34s ease, box-shadow 0.34s ease;
          opacity: 0; animation: pro3-rise 0.8s cubic-bezier(0.22,1,0.36,1) both;
        }
        @supports ((backdrop-filter: blur(14px)) or (-webkit-backdrop-filter: blur(14px))) {
          .pro3-feature { background: rgba(255,255,255,0.05); backdrop-filter: blur(14px) saturate(1.3); -webkit-backdrop-filter: blur(14px) saturate(1.3); }
        }
        .pro3-feature::before {
          content: ""; position: absolute; inset: 0; opacity: 0; transition: opacity 0.34s ease; pointer-events: none;
          background: radial-gradient(90% 70% at 50% 0%, rgba(var(--color-teal-rgb), 0.16), transparent 60%);
        }
        .pro3-feature:hover { transform: translateY(-6px); border-color: rgba(var(--color-teal-rgb), 0.5); box-shadow: 0 32px 64px -34px rgba(var(--color-teal-rgb), 0.6); }
        .pro3-feature:hover::before { opacity: 1; }
        .pro3-feature__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .pro3-feature__icon {
          width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; color: var(--color-teal);
          background: rgba(var(--color-teal-rgb), 0.12); border: 1px solid rgba(var(--color-teal-rgb), 0.28);
        }
        .pro3-feature__badge {
          font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--color-teal); padding: 5px 11px; border-radius: 50px;
          border: 1px solid rgba(var(--color-teal-rgb), 0.4); background: rgba(var(--color-teal-rgb), 0.07);
        }
        .pro3-feature__title { font-size: 21px; margin-bottom: 10px; }
        .pro3-feature__desc { font-size: 15px; line-height: 1.65; color: rgba(255,255,255,0.62); }

        /* ── Porquê ── */
        .pro3-why { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 5vw, 64px); align-items: start; }
        .pro3-why__list { display: flex; flex-direction: column; gap: 16px; }
        .pro3-reason {
          display: flex; gap: 18px; padding: 22px 24px; border-radius: 18px;
          background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .pro3-reason:hover { border-color: rgba(var(--color-teal-rgb), 0.4); background: rgba(var(--color-teal-rgb), 0.05); }
        .pro3-reason__mark {
          flex-shrink: 0; width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center;
          color: var(--color-teal); background: rgba(var(--color-teal-rgb), 0.13); border: 1px solid rgba(var(--color-teal-rgb), 0.3);
        }
        .pro3-reason__title { font-size: 17px; margin-bottom: 5px; }
        .pro3-reason__desc { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.6); }

        .pro3-why__panel {
          position: relative; padding: 34px; border-radius: 24px; overflow: hidden;
          background: rgba(var(--color-dark-1-rgb), 0.72); border: 1px solid rgba(255,255,255,0.12);
        }
        @supports ((backdrop-filter: blur(14px)) or (-webkit-backdrop-filter: blur(14px))) {
          .pro3-why__panel { background: rgba(255,255,255,0.05); backdrop-filter: blur(14px) saturate(1.3); -webkit-backdrop-filter: blur(14px) saturate(1.3); }
        }
        .pro3-why__panel-glow {
          position: absolute; width: 280px; height: 280px; border-radius: 50%; top: -80px; right: -60px;
          background: radial-gradient(circle, rgba(var(--color-teal-rgb), 0.5), transparent 70%); filter: blur(50px); pointer-events: none;
        }
        .pro3-why__quote { position: relative; font-family: var(--font-fraunces), Georgia, serif; font-style: italic; font-size: clamp(20px, 2.4vw, 26px); line-height: 1.4; color: #fff; }
        .pro3-why__by { position: relative; margin-top: 20px; font-size: 13px; color: rgba(255,255,255,0.55); }
        .pro3-why__by b { color: rgba(255,255,255,0.85); font-weight: 600; }
        .pro3-tag-illus {
          position: relative; display: inline-flex; align-items: center; gap: 7px; margin-top: 22px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 11px; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.5);
          padding: 6px 12px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.14);
        }

        /* ── Acesso antecipado ── */
        .pro3-early {
          position: relative; padding: clamp(40px, 6vw, 64px); border-radius: 28px; overflow: hidden;
          background: rgba(var(--color-dark-1-rgb), 0.78); border: 1px solid rgba(var(--color-teal-rgb), 0.3);
          box-shadow: 0 40px 90px -50px rgba(var(--color-teal-rgb), 0.7);
        }
        @supports ((backdrop-filter: blur(16px)) or (-webkit-backdrop-filter: blur(16px))) {
          .pro3-early { background: rgba(255,255,255,0.06); backdrop-filter: blur(16px) saturate(1.3); -webkit-backdrop-filter: blur(16px) saturate(1.3); }
        }
        .pro3-early__glow {
          position: absolute; inset: -40% 30% auto -10%; height: 360px; border-radius: 50%;
          background: radial-gradient(circle, rgba(var(--color-cobalt-rgb), 0.55), transparent 70%); filter: blur(60px); pointer-events: none;
        }
        .pro3-early__grid { position: relative; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(28px, 4vw, 56px); align-items: center; }
        .pro3-early__title { font-size: clamp(26px, 3.6vw, 40px); margin: 14px 0 0; }
        .pro3-early__title em { font-family: var(--font-fraunces), Georgia, serif; font-style: italic; font-weight: 500; color: var(--color-teal); }
        .pro3-early__lead { margin-top: 16px; font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.66); }
        .pro3-early__form { display: flex; flex-direction: column; gap: 14px; }
        .pro3-field { display: flex; flex-direction: column; gap: 7px; }
        .pro3-field label { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.55); font-weight: 600; }
        .pro3-field input {
          font-family: inherit; font-size: 15px; color: #fff; padding: 14px 16px; min-height: 48px;
          border-radius: 12px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.16);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .pro3-field input::placeholder { color: rgba(255,255,255,0.4); }
        .pro3-field input:focus-visible { outline: none; border-color: var(--color-teal); box-shadow: 0 0 0 3px rgba(var(--color-teal-rgb), 0.25); }
        .pro3-early__hint { font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.55; }

        /* ── CTA final ── */
        .pro3-final { position: relative; z-index: 3; text-align: center; padding: clamp(70px, 12vh, 150px) 0; }
        .pro3-final__title { font-size: clamp(34px, 5.6vw, 66px); margin: 18px auto 0; max-width: 18ch; }
        .pro3-final__title em { font-family: var(--font-fraunces), Georgia, serif; font-style: italic; font-weight: 500; color: var(--color-teal); }
        .pro3-final__lead { margin: 20px auto 0; max-width: 52ch; font-size: clamp(15px, 1.6vw, 18px); line-height: 1.7; color: rgba(255,255,255,0.62); }
        .pro3-final__cta { display: flex; justify-content: center; flex-wrap: wrap; gap: 14px; margin-top: 36px; }
        .pro3-final__neon {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: -1;
          width: 640px; max-width: 90%; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(var(--color-teal-rgb), 0.45), rgba(var(--color-cobalt-rgb), 0.2) 45%, transparent 72%);
          filter: blur(50px); pointer-events: none;
        }

        /* ── Footer ── */
        .pro3-footer { position: relative; z-index: 3; border-top: 1px solid rgba(255,255,255,0.08); padding: 34px 0; }
        .pro3-footer__row { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; justify-content: space-between; }
        .pro3-footer__brand { display: inline-flex; align-items: center; gap: 9px; color: #fff; font-weight: 700; font-size: 15px; }
        .pro3-footer__legal { font-size: 12px; color: rgba(255,255,255,0.4); max-width: 62ch; line-height: 1.6; }

        /* ── Animations ── */
        @keyframes pro3-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pro3-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pro3-drift-a { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(60px, 50px); } }
        @keyframes pro3-drift-b { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-50px, 70px); } }
        @keyframes pro3-drift-c { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(40px, -60px); } }

        .pro3-reveal { opacity: 0; animation: pro3-rise 0.85s cubic-bezier(0.22,1,0.36,1) forwards; }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .pro3-hero__grid { grid-template-columns: 1fr; gap: 48px; }
          .pro3-hero__stack { min-height: 0; max-width: 460px; }
          .pro3-why { grid-template-columns: 1fr; gap: 36px; }
          .pro3-early__grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 720px) {
          .pro3-kpis { grid-template-columns: 1fr; }
          .pro3-features { grid-template-columns: 1fr; }
          .pro3-floatcard--pill-a { right: -4px; }
          .pro3-floatcard--pill-b { left: 0; }
        }
        @media (max-width: 420px) {
          .pro3-nav__back span.pro3-nav__back-label { display: none; }
        }

        /* ── Reduced motion : tout statique ── */
        @media (prefers-reduced-motion: reduce) {
          .pro3 *, .pro3 *::before, .pro3 *::after {
            animation: none !important;
            transition: none !important;
          }
          .pro3-reveal, .pro3-kpi, .pro3-feature { opacity: 1 !important; transform: none !important; }
          .pro3__orb { transform: none !important; }
        }
      `}</style>

      {/* Atmosphère */}
      <div className="pro3__sky" aria-hidden="true">
        <span className="pro3__orb pro3__orb--a" />
        <span className="pro3__orb pro3__orb--b" />
        <span className="pro3__orb pro3__orb--c" />
        <span className="pro3__grid-bg" />
      </div>
      <div className="pro3__grain" aria-hidden="true" />

      <div className="pro3__inner">
        {/* Nav */}
        <nav className="pro3-nav" aria-label="Navigation de la variante">
          <a className="pro3-nav__brand" href="#haut">
            <span className="pro3-nav__dot" aria-hidden="true" />
            DocAgora
          </a>
          <a className="pro3-nav__back" href="/variants">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="pro3-nav__back-label">← Variantes</span>
          </a>
        </nav>

        {/* Hero */}
        <header className="pro3-hero" id="haut">
          <div className="pro3-hero__grid">
            <div>
              <p className="pro3-eyebrow pro3-reveal" style={{ animationDelay: "60ms" }}>
                <span aria-hidden="true" />
                Pour les professionnels de santé
              </p>
              <h1 className="pro3-hero__title pro3-reveal" style={{ animationDelay: "150ms" }}>
                Votre présence en ligne, <em>claire et en orbite.</em>
              </h1>
              <p className="pro3-hero__lead pro3-reveal" style={{ animationDelay: "240ms" }}>
                {'DocAgora réunit votre fiche vérifiée et votre agenda dans un panneau serein, pour que les patients vous trouvent en PT, FR et EN et que votre quotidien respire mieux.'}
              </p>
              <div className="pro3-hero__cta pro3-reveal" style={{ animationDelay: "330ms" }}>
                <a className="pro3-btn pro3-btn--primary" href="#acces">
                  Demander l’accès anticipé
                  <ArrowIcon />
                </a>
                <a className="pro3-btn pro3-btn--ghost" href="#fonctionnalites">
                  Voir les fonctionnalités
                </a>
              </div>
              <p className="pro3-hero__note pro3-reveal" style={{ animationDelay: "420ms" }}>
                <i className="fas fa-check-circle" aria-hidden="true" />
                {'Être présent est gratuit · prise de rendez-vous en ligne '}
                <em style={{ fontStyle: "normal", color: "var(--color-teal)" }}>bientôt</em>
              </p>
            </div>

            {/* Cartes glass flottantes */}
            <div className="pro3-hero__stack pro3-reveal" style={{ animationDelay: "300ms" }} aria-hidden="true">
              <div className="pro3-floatcard pro3-floatcard--main pro3-glass">
                <div className="pro3-floatcard__head">
                  <span className="pro3-floatcard__title">Agenda · aujourd’hui</span>
                  <span className="pro3-floatcard__tag">bientôt</span>
                </div>
                <div className="pro3-slot">
                  <span className="pro3-slot__time">09:00</span>
                  <span>
                    <span className="pro3-slot__who">Consultation de suivi</span>
                    <br />
                    <span className="pro3-slot__meta">15 min · présentiel</span>
                  </span>
                  <span className="pro3-slot__dot" />
                </div>
                <div className="pro3-slot">
                  <span className="pro3-slot__time">10:30</span>
                  <span>
                    <span className="pro3-slot__who">Première consultation</span>
                    <br />
                    <span className="pro3-slot__meta">30 min · présentiel</span>
                  </span>
                  <span className="pro3-slot__dot" />
                </div>
                <div className="pro3-slot">
                  <span className="pro3-slot__time">14:15</span>
                  <span>
                    <span className="pro3-slot__who">Bilan</span>
                    <br />
                    <span className="pro3-slot__meta">20 min · présentiel</span>
                  </span>
                  <span className="pro3-slot__dot" />
                </div>
              </div>

              <div className="pro3-floatcard--pill pro3-glass pro3-floatcard--pill-a">
                <span className="pro3-floatcard__icon">
                  <i className="fas fa-shield-alt" aria-hidden="true" />
                </span>
                <span>
                  <strong style={{ color: "#fff", display: "block", fontSize: "13px" }}>Profil vérifié</strong>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "11px" }}>par l’équipe DocAgora</span>
                </span>
              </div>

              <div className="pro3-floatcard--pill pro3-glass pro3-floatcard--pill-b">
                <span className="pro3-floatcard__icon">
                  <i className="fas fa-language" aria-hidden="true" />
                </span>
                <span>
                  <strong style={{ color: "#fff", display: "block", fontSize: "13px" }}>PT · FR · EN</strong>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "11px" }}>une seule fiche</span>
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* KPIs */}
      <section className="pro3-section" aria-labelledby="pro3-kpi-title">
        <div className="pro3__inner">
          <div className="pro3-section__head">
            <p className="pro3-eyebrow">
              <span aria-hidden="true" />
              Chiffres illustratifs
            </p>
            <h2 className="pro3-section__title" id="pro3-kpi-title">
              Ce qu’un agenda <em>serein</em> peut changer.
            </h2>
            <p className="pro3-section__lead">
              {'Scénarios pour illustrer l’impact d’une organisation plus simple. Valeurs illustratives, pas des mesures réelles.'}
            </p>
          </div>

          <div className="pro3-kpis" ref={kpiRef}>
            {KPIS.map((kpi, i) => (
              <KpiCard key={kpi.id} kpi={kpi} start={kpiVisible} index={i} />
            ))}
          </div>
          <p className="pro3-kpis__note">* Valeurs illustratives &mdash; présentées à titre d’exemple.</p>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="pro3-section" id="fonctionnalites" aria-labelledby="pro3-feat-title">
        <div className="pro3__inner">
          <div className="pro3-section__head">
            <p className="pro3-eyebrow">
              <span aria-hidden="true" />
              Fonctionnalités
            </p>
            <h2 className="pro3-section__title" id="pro3-feat-title">
              Tout au bon endroit, <em>sans complexité.</em>
            </h2>
            <p className="pro3-section__lead">
              {'Des outils pensés pour le rythme d’un cabinet. Certains déjà disponibles, d’autres bientôt.'}
            </p>
          </div>

          <div className="pro3-features">
            {FEATURES.map((f, i) => (
              <article key={f.id} className="pro3-feature" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="pro3-feature__top">
                  <span className="pro3-feature__icon">
                    <FeatureIcon name={f.icon} />
                  </span>
                  {f.badge ? <span className="pro3-feature__badge">{f.badge}</span> : null}
                </div>
                <h3 className="pro3-feature__title">{f.title}</h3>
                <p className="pro3-feature__desc">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi DocAgora */}
      <section className="pro3-section" aria-labelledby="pro3-why-title">
        <div className="pro3__inner">
          <div className="pro3-why">
            <div>
              <p className="pro3-eyebrow">
                <span aria-hidden="true" />
                Pourquoi DocAgora
              </p>
              <h2 className="pro3-section__title" id="pro3-why-title" style={{ marginBottom: 28 }}>
                Fait pour vous, <em>avec calme.</em>
              </h2>
              <div className="pro3-why__list">
                {REASONS.map((r) => (
                  <div key={r.id} className="pro3-reason">
                    <span className="pro3-reason__mark">
                      <i className="fas fa-check" aria-hidden="true" />
                    </span>
                    <span>
                      <h3 className="pro3-reason__title">{r.title}</h3>
                      <p className="pro3-reason__desc">{r.desc}</p>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="pro3-why__panel">
              <span className="pro3-why__panel-glow" aria-hidden="true" />
              <p className="pro3-why__quote">
                {'« Je veux être trouvé par les bons patients, sans passer ma matinée au téléphone. DocAgora rend ma fiche claire et mon agenda facile à lire. »'}
              </p>
              <p className="pro3-why__by">
                <b>Dr Sofia M.</b> · Médecine générale, Paris
              </p>
              <span className="pro3-tag-illus">
                <i className="fas fa-star" aria-hidden="true" />
                Témoignage illustratif
              </span>
            </aside>
          </div>
        </div>
      </section>

      {/* Accès anticipé */}
      <section className="pro3-section" id="acces" aria-labelledby="pro3-early-title">
        <div className="pro3__inner">
          <div className="pro3-early">
            <span className="pro3-early__glow" aria-hidden="true" />
            <div className="pro3-early__grid">
              <div>
                <p className="pro3-eyebrow">
                  <span aria-hidden="true" />
                  Accès anticipé
                </p>
                <h2 className="pro3-early__title" id="pro3-early-title">
                  Entrez en <em>orbite</em> dès le début.
                </h2>
                <p className="pro3-early__lead">
                  {'Laissez votre contact et nous vous prévenons à l’ouverture de la prise de rendez-vous en ligne. Créer le profil vérifié reste gratuit.'}
                </p>
              </div>

              <form
                className="pro3-early__form"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Demander l’accès anticipé"
              >
                <div className="pro3-field">
                  <label htmlFor="pro3-email">Votre e-mail professionnel</label>
                  <input
                    id="pro3-email"
                    type="email"
                    name="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="prenom@cabinet.fr"
                  />
                </div>
                <button className="pro3-btn pro3-btn--primary" type="submit">
                  Je veux être prévenu
                  <ArrowIcon />
                </button>
                <p className="pro3-early__hint">
                  {'Sans engagement. Pas de téléconsultation, paiement ou remboursement : uniquement votre présence et, bientôt, la prise de rendez-vous.'}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="pro3-final" aria-labelledby="pro3-final-title">
        <span className="pro3-final__neon" aria-hidden="true" />
        <div className="pro3__inner">
          <p className="pro3-eyebrow" style={{ justifyContent: "center" }}>
            <span aria-hidden="true" />
            DocAgora &middot; professionnels
          </p>
          <h2 className="pro3-final__title" id="pro3-final-title">
            Prêt à être <em>trouvé</em> avec clarté ?
          </h2>
          <p className="pro3-final__lead">
            {'Mettez votre fiche vérifiée en orbite dès aujourd’hui. L’agenda et la prise de rendez-vous en ligne arrivent bientôt.'}
          </p>
          <div className="pro3-final__cta">
            <a className="pro3-btn pro3-btn--primary" href="#acces">
              Demander l’accès anticipé
              <ArrowIcon />
            </a>
            <a className="pro3-btn pro3-btn--ghost" href="#fonctionnalites">
              Revoir les fonctionnalités
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pro3-footer">
        <div className="pro3__inner pro3-footer__row">
          <span className="pro3-footer__brand">
            <span className="pro3-nav__dot" aria-hidden="true" />
            DocAgora
          </span>
          <p className="pro3-footer__legal">
            {'Variante interne « Orbite ». Contenu, chiffres et témoignages illustratifs. La prise de rendez-vous en ligne est indiquée comme bientôt. Aucune promesse de téléconsultation, paiement ou remboursement.'}
          </p>
        </div>
      </footer>
    </main>
  );
}
