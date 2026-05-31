"use client";

import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  DocAgora — Variante Patient 4 · « Bento Santé »                     */
/*  Grille bento modulaire, data-driven, premium & ludique.            */
/* ------------------------------------------------------------------ */

type Especialidade = {
  nome: string;
  icone: string;
  cor: string;
  corRgb: string;
};

type Cidade = {
  nome: string;
  x: number; // 0..100 (left %)
  y: number; // 0..100 (top %)
};

type Faq = {
  pergunta: string;
  resposta: string;
};

const ESPECIALIDADES: Especialidade[] = [
  { nome: 'Médecine générale', icone: 'fa-user-md', cor: 'var(--color-navy)', corRgb: 'var(--color-navy-rgb)' },
  { nome: 'Dentiste', icone: 'fa-check-circle', cor: 'var(--color-teal)', corRgb: 'var(--color-teal-rgb)' },
  { nome: 'Dermatologie', icone: 'fa-shield-alt', cor: 'var(--color-cobalt)', corRgb: 'var(--color-cobalt-rgb)' },
  { nome: 'Pédiatrie', icone: 'fa-bell', cor: 'var(--color-mint)', corRgb: 'var(--color-mint-rgb)' },
  { nome: 'Cardiologie', icone: 'fa-star', cor: 'var(--color-navy)', corRgb: 'var(--color-navy-rgb)' },
  { nome: 'Ophtalmologie', icone: 'fa-globe-europe', cor: 'var(--color-teal)', corRgb: 'var(--color-teal-rgb)' },
  { nome: 'Gynécologie', icone: 'fa-check', cor: 'var(--color-cobalt)', corRgb: 'var(--color-cobalt-rgb)' },
  { nome: 'Psychologie', icone: 'fa-clock', cor: 'var(--color-mint)', corRgb: 'var(--color-mint-rgb)' },
];

const CIDADES: Cidade[] = [
  { nome: 'Porto', x: 30, y: 24 },
  { nome: 'Braga', x: 33, y: 14 },
  { nome: 'Coïmbre', x: 36, y: 42 },
  { nome: 'Aveiro', x: 30, y: 36 },
  { nome: 'Lisbonne', x: 24, y: 64 },
  { nome: 'Setúbal', x: 28, y: 71 },
  { nome: 'Évora', x: 44, y: 70 },
  { nome: 'Faro', x: 40, y: 90 },
];

const FAQS: Faq[] = [
  {
    pergunta: 'La recherche est-elle vraiment gratuite ?',
    resposta:
      'Oui. Rechercher et consulter des professionnels de santé vérifiés sur DocAgora est entièrement gratuit, sans compte obligatoire.',
  },
  {
    pergunta: 'Puis-je déjà prendre rendez-vous en ligne ?',
    resposta:
      'Pas encore. La prise de rendez-vous en ligne arrive bientôt. Pour l\'instant, trouvez le bon professionnel et contactez-le directement.',
  },
  {
    pergunta: 'Dans quelles langues puis-je utiliser la plateforme ?',
    resposta:
      'En portugais, français et anglais, pour que chacun se sente chez soi, qu\'il vive ou visite le Portugal.',
  },
];

/* --- Petit hook compteur animé (chiffres bento) --- */
function useCountUp(target: number, start: boolean, durationMs = 1100): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setValue(target);
        return;
      }
    }
    let frame = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, durationMs]);

  return value;
}

export default function PatientVariant4() {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const especialidadesCount = useCountUp(16, mounted);
  const cidadesCount = useCountUp(120, mounted);
  const linguasCount = useCountUp(3, mounted);

  return (
    <div className={`pat4-root${mounted ? " is-ready" : ""}`}>
      <style>{`
        .pat4-root,
        .pat4-root * { box-sizing: border-box; }

        .pat4-root {
          --pat4-radius: 20px;
          --pat4-radius-sm: 14px;
          --pat4-gap: 16px;
          --pat4-maxw: 1180px;
          --pat4-ease: cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          color: var(--color-dark-1);
          background-color: var(--color-light-2);
          background-image:
            radial-gradient(60% 50% at 12% 4%, rgba(var(--color-teal-rgb), 0.18) 0%, transparent 60%),
            radial-gradient(55% 45% at 92% 0%, rgba(var(--color-cobalt-rgb), 0.16) 0%, transparent 58%),
            radial-gradient(70% 60% at 50% 110%, rgba(var(--color-navy-rgb), 0.12) 0%, transparent 60%);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* Grain subtil */
        .pat4-root::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
          mix-blend-mode: soft-light;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
        }

        .pat4-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: var(--pat4-maxw);
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ---------- NAV ---------- */
        .pat4-nav {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 22px 0 6px;
        }
        .pat4-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 22px;
          letter-spacing: -0.01em;
          color: var(--color-navy);
          text-decoration: none;
          line-height: 1;
        }
        .pat4-brand-dot {
          display: inline-flex;
          width: 30px; height: 30px;
          align-items: center; justify-content: center;
          border-radius: 9px;
          color: var(--color-light-1);
          background: linear-gradient(140deg, var(--color-teal), var(--color-cobalt));
          box-shadow: 0 6px 16px rgba(var(--color-cobalt-rgb), 0.35);
        }
        .pat4-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-transform: none;
          color: var(--color-navy);
          text-decoration: none;
          background: rgba(var(--color-navy-rgb), 0.07);
          border: 1px solid rgba(var(--color-navy-rgb), 0.12);
          transition: background 0.25s var(--pat4-ease), transform 0.25s var(--pat4-ease);
        }
        .pat4-back:hover { background: rgba(var(--color-navy-rgb), 0.13); transform: translateX(-2px); }

        /* ---------- SECTIONS ---------- */
        .pat4-section { padding: clamp(48px, 7vw, 88px) 0; }
        .pat4-section--hero { padding: clamp(20px, 3vw, 36px) 0 clamp(40px, 6vw, 64px); }

        .pat4-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 14px;
          padding: 6px 12px;
          border-radius: 999px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-mint);
          background: rgba(var(--color-mint-rgb), 0.12);
          border: 1px solid rgba(var(--color-mint-rgb), 0.22);
        }
        .pat4-section-title {
          margin: 0 0 8px;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(28px, 4.4vw, 46px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--color-navy);
          text-transform: none;
        }
        .pat4-section-sub {
          margin: 0 0 30px;
          max-width: 56ch;
          font-size: clamp(15px, 1.6vw, 17px);
          line-height: 1.6;
          color: rgba(var(--color-dark-1-rgb), 0.72);
        }

        /* ---------- BENTO GRID GÉNÉRIQUE ---------- */
        .pat4-bento {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--pat4-gap);
        }
        .pat4-tile {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 24px;
          border-radius: var(--pat4-radius);
          background: var(--color-light-1);
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
          box-shadow: 0 1px 2px rgba(var(--color-dark-1-rgb), 0.04),
                      0 18px 40px -28px rgba(var(--color-navy-rgb), 0.5);
          overflow: hidden;
          transition: transform 0.4s var(--pat4-ease), box-shadow 0.4s var(--pat4-ease);
        }
        .pat4-tile::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(120% 90% at 50% -10%,
            rgba(var(--pat4-glow, var(--color-teal-rgb)), 0.22) 0%, transparent 60%);
          transition: opacity 0.4s var(--pat4-ease);
        }
        .pat4-tile:hover {
          transform: translateY(-4px) scale(1.012);
          box-shadow: 0 1px 2px rgba(var(--color-dark-1-rgb), 0.05),
                      0 28px 60px -30px rgba(var(--pat4-glow, var(--color-navy-rgb)), 0.7);
        }
        .pat4-tile:hover::after { opacity: 1; }

        /* Reveal en cascade */
        .pat4-reveal {
          opacity: 0;
          transform: translateY(20px) scale(0.985);
        }
        .pat4-root.is-ready .pat4-reveal {
          animation: pat4-in 0.7s var(--pat4-ease) forwards;
        }
        @keyframes pat4-in {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ---------- HERO BENTO ---------- */
        .pat4-hero { grid-auto-rows: minmax(118px, auto); }

        .pat4-hero-main {
          grid-column: span 4;
          grid-row: span 2;
          justify-content: space-between;
          gap: 24px;
          padding: clamp(26px, 3vw, 40px);
          color: var(--color-light-1);
          background:
            radial-gradient(120% 120% at 0% 0%, rgba(var(--color-teal-rgb), 0.55) 0%, transparent 55%),
            linear-gradient(150deg, var(--color-navy) 0%, var(--color-dark-1) 100%);
          border: 1px solid rgba(var(--color-teal-rgb), 0.22);
        }
        .pat4-hero-main::after { display: none; }
        .pat4-h1 {
          margin: 0;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(34px, 5.6vw, 62px);
          line-height: 0.98;
          letter-spacing: -0.025em;
          color: var(--color-light-1);
          text-transform: none;
        }
        .pat4-h1 em {
          font-style: italic;
          color: var(--color-teal);
        }
        .pat4-h1-sub {
          margin: 16px 0 0;
          max-width: 46ch;
          font-size: clamp(14px, 1.6vw, 17px);
          line-height: 1.55;
          font-weight: 400;
          color: rgba(var(--color-light-1-rgb, 252, 254, 254), 0.82);
        }

        .pat4-search {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 7px 7px 7px 18px;
          border-radius: 999px;
          background: rgba(252, 254, 254, 0.96);
          box-shadow: 0 14px 34px -16px rgba(var(--color-dark-2-rgb), 0.8);
        }
        .pat4-search i { color: var(--color-navy); font-size: 15px; }
        .pat4-search-input {
          flex: 1;
          min-width: 0;
          border: none;
          background: transparent;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          font-size: 15px;
          color: var(--color-dark-1);
          padding: 10px 4px;
          outline: none;
        }
        .pat4-search-input::placeholder { color: rgba(var(--color-dark-1-rgb), 0.5); }
        .pat4-search-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 0 20px;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.01em;
          text-transform: none;
          color: var(--color-dark-1);
          background: linear-gradient(135deg, var(--color-teal), var(--color-mint));
          transition: transform 0.25s var(--pat4-ease), filter 0.25s var(--pat4-ease);
          white-space: nowrap;
        }
        .pat4-search-btn:hover { transform: translateY(-1px); filter: brightness(1.05); }

        .pat4-tile-langs { grid-column: span 2; --pat4-glow: var(--color-cobalt-rgb); }
        .pat4-tile-map { grid-column: span 2; grid-row: span 2; --pat4-glow: var(--color-mint-rgb); padding: 20px; }
        .pat4-tile-esp { grid-column: span 2; --pat4-glow: var(--color-teal-rgb); }
        .pat4-tile-verif { grid-column: span 2; --pat4-glow: var(--color-navy-rgb); }
        .pat4-tile-gratis {
          grid-column: span 2;
          --pat4-glow: var(--color-teal-rgb);
          color: var(--color-dark-1);
          background: linear-gradient(140deg, rgba(var(--color-teal-rgb), 0.95), rgba(var(--color-mint-rgb), 0.92));
          border-color: rgba(var(--color-teal-rgb), 0.4);
        }

        .pat4-tile-label {
          margin: 0 0 6px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(var(--color-dark-1-rgb), 0.55);
        }
        .pat4-stat {
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
          font-size: clamp(34px, 4.4vw, 48px);
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--color-navy);
        }
        .pat4-tile-gratis .pat4-stat { color: var(--color-dark-1); }
        .pat4-stat-note {
          margin: 10px 0 0;
          font-size: 13px;
          line-height: 1.45;
          color: rgba(var(--color-dark-1-rgb), 0.65);
        }

        .pat4-langs {
          display: flex;
          gap: 8px;
          margin-top: 4px;
          flex-wrap: wrap;
        }
        .pat4-lang-chip {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 6px 11px;
          border-radius: 9px;
          color: var(--color-cobalt);
          background: rgba(var(--color-cobalt-rgb), 0.12);
        }

        .pat4-verif-head {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--color-teal);
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 6px;
        }
        .pat4-verif-head i { font-size: 18px; }

        /* ---------- CARTE PORTUGAL ---------- */
        .pat4-map-wrap {
          position: relative;
          flex: 1;
          min-height: 220px;
          border-radius: var(--pat4-radius-sm);
          overflow: hidden;
          background:
            radial-gradient(80% 70% at 60% 20%, rgba(var(--color-cobalt-rgb), 0.16), transparent 60%),
            linear-gradient(160deg, rgba(var(--color-navy-rgb), 0.06), rgba(var(--color-mint-rgb), 0.1));
        }
        .pat4-map-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .pat4-map-shape {
          fill: rgba(var(--color-navy-rgb), 0.1);
          stroke: rgba(var(--color-navy-rgb), 0.4);
          stroke-width: 1.2;
        }
        .pat4-dot {
          fill: var(--color-teal);
          transform-box: fill-box;
          transform-origin: center;
          animation: pat4-pulse 2.6s var(--pat4-ease) infinite;
        }
        .pat4-dot-halo {
          fill: rgba(var(--color-teal-rgb), 0.35);
          transform-box: fill-box;
          transform-origin: center;
          animation: pat4-halo 2.6s var(--pat4-ease) infinite;
        }
        @keyframes pat4-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.35); }
        }
        @keyframes pat4-halo {
          0% { transform: scale(0.6); opacity: 0.6; }
          70%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .pat4-map-tag {
          position: absolute;
          left: 14px; bottom: 12px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-navy);
        }

        /* ---------- ESPECIALIDADES ---------- */
        .pat4-esp-grid { grid-auto-rows: minmax(96px, auto); }
        .pat4-esp-tile {
          grid-column: span 2;
          flex-direction: row;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          cursor: default;
        }
        .pat4-esp-tile--wide { grid-column: span 3; }
        .pat4-esp-icon {
          flex: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px; height: 44px;
          border-radius: 12px;
          font-size: 18px;
        }
        .pat4-esp-name {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.2;
          color: var(--color-dark-1);
        }
        .pat4-esp-more { margin: 2px 0 0; font-size: 13px; color: rgba(var(--color-dark-1-rgb), 0.6); }
        .pat4-esp-cta {
          grid-column: span 3;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          color: var(--color-light-1);
          background: linear-gradient(150deg, var(--color-cobalt), var(--color-navy));
          --pat4-glow: var(--color-cobalt-rgb);
        }
        .pat4-esp-cta h3 {
          margin: 0;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 22px;
          color: var(--color-light-1);
          text-transform: none;
        }
        .pat4-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          font-weight: 700;
          font-size: 14px;
          color: var(--color-teal);
          text-decoration: none;
          transition: gap 0.25s var(--pat4-ease);
        }
        .pat4-link:hover { gap: 13px; }

        /* ---------- PORQUÊ (bento) ---------- */
        .pat4-why-tile { grid-column: span 3; gap: 12px; }
        .pat4-why-tile--lead {
          grid-column: span 6;
          color: var(--color-light-1);
          background: linear-gradient(150deg, var(--color-mint), var(--color-navy));
          --pat4-glow: var(--color-mint-rgb);
        }
        .pat4-why-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px; height: 46px;
          border-radius: 13px;
          margin-bottom: 6px;
          background: rgba(var(--color-teal-rgb), 0.14);
          color: var(--color-mint);
        }
        .pat4-why-icon svg { width: 24px; height: 24px; }
        .pat4-why-title {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: var(--color-navy);
          text-transform: none;
        }
        .pat4-why-tile--lead .pat4-why-title { color: var(--color-light-1); font-size: 22px; }
        .pat4-why-text { margin: 0; font-size: 14px; line-height: 1.55; color: rgba(var(--color-dark-1-rgb), 0.72); }
        .pat4-why-tile--lead .pat4-why-text { color: rgba(252, 254, 254, 0.85); }
        .pat4-soon {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 4px;
          padding: 5px 11px;
          border-radius: 999px;
          width: fit-content;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-cobalt);
          background: rgba(var(--color-cobalt-rgb), 0.13);
        }

        /* ---------- CIDADES ---------- */
        .pat4-cities-tile-map { grid-column: span 3; grid-row: span 2; padding: 22px; }
        .pat4-cities-list {
          grid-column: span 3;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          align-content: start;
        }
        .pat4-city-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-radius: var(--pat4-radius-sm);
          background: var(--color-light-1);
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
          font-weight: 600;
          font-size: 15px;
          color: var(--color-dark-1);
          transition: transform 0.3s var(--pat4-ease), border-color 0.3s var(--pat4-ease);
        }
        .pat4-city-chip:hover { transform: translateY(-3px); border-color: rgba(var(--color-teal-rgb), 0.5); }
        .pat4-city-chip i { color: var(--color-mint); font-size: 14px; }

        /* ---------- FAQ ---------- */
        .pat4-faq-grid { grid-auto-rows: minmax(80px, auto); }
        .pat4-faq-intro {
          grid-column: span 2;
          grid-row: span 3;
          justify-content: center;
          color: var(--color-light-1);
          background: linear-gradient(160deg, var(--color-navy), var(--color-dark-1));
          --pat4-glow: var(--color-teal-rgb);
        }
        .pat4-faq-intro h2 {
          margin: 0 0 10px;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(26px, 3vw, 36px);
          line-height: 1.05;
          color: var(--color-light-1);
          text-transform: none;
        }
        .pat4-faq-intro p { margin: 0; font-size: 14px; line-height: 1.55; color: rgba(252, 254, 254, 0.82); }
        .pat4-faq-item { grid-column: span 4; gap: 8px; }
        .pat4-faq-q {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 700;
          color: var(--color-navy);
        }
        .pat4-faq-q i { color: var(--color-teal); }
        .pat4-faq-a { margin: 0; font-size: 14px; line-height: 1.6; color: rgba(var(--color-dark-1-rgb), 0.72); }

        /* ---------- CTA FINAL ---------- */
        .pat4-cta-tile {
          grid-column: span 6;
          align-items: center;
          text-align: center;
          gap: 18px;
          padding: clamp(36px, 6vw, 64px) 24px;
          color: var(--color-light-1);
          background:
            radial-gradient(80% 120% at 50% 0%, rgba(var(--color-teal-rgb), 0.4), transparent 60%),
            linear-gradient(150deg, var(--color-navy), var(--color-dark-1));
          border: 1px solid rgba(var(--color-teal-rgb), 0.25);
        }
        .pat4-cta-tile h2 {
          margin: 0;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(28px, 4.4vw, 48px);
          line-height: 1.02;
          letter-spacing: -0.02em;
          color: var(--color-light-1);
          text-transform: none;
        }
        .pat4-cta-tile h2 em { font-style: italic; color: var(--color-teal); }
        .pat4-cta-sub { margin: 0; max-width: 50ch; font-size: 16px; line-height: 1.55; color: rgba(252, 254, 254, 0.85); }
        .pat4-cta-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
        .pat4-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 52px;
          padding: 0 28px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          text-transform: none;
          color: var(--color-dark-1);
          background: linear-gradient(135deg, var(--color-teal), var(--color-mint));
          transition: transform 0.25s var(--pat4-ease), filter 0.25s var(--pat4-ease);
        }
        .pat4-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.05); }
        .pat4-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 52px;
          padding: 0 24px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          text-transform: none;
          color: var(--color-light-1);
          background: rgba(252, 254, 254, 0.08);
          border: 1px solid rgba(252, 254, 254, 0.28);
          transition: background 0.25s var(--pat4-ease);
        }
        .pat4-btn-ghost:hover { background: rgba(252, 254, 254, 0.16); }

        /* ---------- FOOTER ---------- */
        .pat4-footer {
          position: relative;
          z-index: 1;
          padding: 28px 0 40px;
          border-top: 1px solid rgba(var(--color-navy-rgb), 0.1);
          margin-top: 24px;
        }
        .pat4-footer-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }
        .pat4-footer-note { margin: 0; font-size: 13px; color: rgba(var(--color-dark-1-rgb), 0.6); }
        .pat4-footer-links { display: flex; gap: 18px; }
        .pat4-footer-links a {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-navy);
          text-decoration: none;
          text-transform: none;
        }
        .pat4-footer-links a:hover { color: var(--color-cobalt); }
        .pat4-footnote {
          margin: 18px 0 0;
          font-size: 11px;
          line-height: 1.5;
          color: rgba(var(--color-dark-1-rgb), 0.45);
        }

        /* Focus visible global */
        .pat4-root a:focus-visible,
        .pat4-root button:focus-visible,
        .pat4-root input:focus-visible {
          outline: 3px solid var(--color-cobalt);
          outline-offset: 3px;
          border-radius: 6px;
        }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 960px) {
          .pat4-hero-main { grid-column: span 6; grid-row: auto; }
          .pat4-tile-langs,
          .pat4-tile-esp,
          .pat4-tile-verif,
          .pat4-tile-gratis { grid-column: span 3; }
          .pat4-tile-map { grid-column: span 6; grid-row: auto; min-height: 280px; }
          .pat4-esp-tile,
          .pat4-esp-tile--wide,
          .pat4-esp-cta { grid-column: span 3; }
          .pat4-why-tile { grid-column: span 6; }
          .pat4-cities-tile-map { grid-column: span 6; grid-row: auto; min-height: 320px; }
          .pat4-cities-list { grid-column: span 6; }
          .pat4-faq-intro { grid-column: span 6; grid-row: auto; }
          .pat4-faq-item { grid-column: span 6; }
        }
        @media (max-width: 560px) {
          .pat4-bento { grid-template-columns: 1fr; }
          .pat4-hero-main,
          .pat4-tile-langs,
          .pat4-tile-map,
          .pat4-tile-esp,
          .pat4-tile-verif,
          .pat4-tile-gratis,
          .pat4-esp-tile,
          .pat4-esp-tile--wide,
          .pat4-esp-cta,
          .pat4-why-tile,
          .pat4-why-tile--lead,
          .pat4-cities-tile-map,
          .pat4-cities-list,
          .pat4-faq-intro,
          .pat4-faq-item,
          .pat4-cta-tile { grid-column: 1 / -1; }
          .pat4-cities-list { grid-template-columns: 1fr 1fr; }
          .pat4-search { flex-wrap: wrap; padding: 12px; }
          .pat4-search-input { width: 100%; padding: 6px 8px; }
          .pat4-search-btn { width: 100%; justify-content: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pat4-root .pat4-reveal,
          .pat4-root.is-ready .pat4-reveal { opacity: 1 !important; transform: none !important; animation: none !important; }
          .pat4-dot, .pat4-dot-halo { animation: none !important; }
          .pat4-tile, .pat4-city-chip, .pat4-back, .pat4-search-btn,
          .pat4-btn-primary, .pat4-btn-ghost, .pat4-link { transition: none !important; }
        }
      `}</style>

      <header className="pat4-shell">
        <nav className="pat4-nav" aria-label="Navigation de la variante">
          <a className="pat4-brand" href="#pat4-top">
            <span className="pat4-brand-dot" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M12 4v16M4 12h16" />
              </svg>
            </span>
            DocAgora
          </a>
          <a className="pat4-back" href="/variants">
            <span aria-hidden="true">&larr;</span> Variantes
          </a>
        </nav>
      </header>

      <main id="pat4-top" className="pat4-shell" role="main">
        {/* ====================== HERO BENTO ====================== */}
        <section className="pat4-section pat4-section--hero" aria-labelledby="pat4-h1">
          <div className="pat4-bento pat4-hero">
            {/* Tuile titre + recherche */}
            <div className="pat4-tile pat4-hero-main pat4-reveal" style={{ animationDelay: "0ms" }}>
              <div>
                <span className="pat4-eyebrow" style={{ color: "var(--color-teal)", background: "rgba(var(--color-teal-rgb), 0.14)", borderColor: "rgba(var(--color-teal-rgb), 0.3)" }}>
                  Santé au Portugal
                </span>
                <h1 className="pat4-h1" id="pat4-h1">
                  Trouvez votre <em>professionnel</em> de santé.
                </h1>
                <p className="pat4-h1-sub">
                  {'Recherche gratuite de professionnels vérifiés, sans complications, en portugais, français et anglais.'}
                </p>
              </div>
              <form
                className="pat4-search"
                role="search"
                aria-label="Rechercher des professionnels de santé"
                onSubmit={(e) => e.preventDefault()}
              >
                <i className="fas fa-search" aria-hidden="true" />
                <input
                  className="pat4-search-input"
                  type="search"
                  placeholder="Spécialité, nom ou ville…"
                  aria-label="Spécialité, nom ou ville"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="pat4-search-btn" type="submit">
                  Rechercher <i className="fas fa-arrow-right" aria-hidden="true" />
                </button>
              </form>
            </div>

            {/* Tuile langues */}
            <div className="pat4-tile pat4-tile-langs pat4-reveal" style={{ animationDelay: "70ms" }}>
              <p className="pat4-tile-label">
                <i className="fas fa-language" aria-hidden="true" /> Langues
              </p>
              <div className="pat4-stat" aria-hidden="true">{linguasCount}</div>
              <div className="pat4-langs" aria-label="Portugais, Français et Anglais">
                <span className="pat4-lang-chip">PT</span>
                <span className="pat4-lang-chip">FR</span>
                <span className="pat4-lang-chip">EN</span>
              </div>
            </div>

            {/* Tuile carte du Portugal */}
            <div className="pat4-tile pat4-tile-map pat4-reveal" style={{ animationDelay: "140ms" }}>
              <p className="pat4-tile-label">
                <i className="fas fa-map-marker-alt" aria-hidden="true" /> Partout au Portugal
              </p>
              <div className="pat4-map-wrap" role="img" aria-label="Carte simplifiée du Portugal avec les villes couvertes">
                <PortugalMap />
                <span className="pat4-map-tag">Portugal continental</span>
              </div>
            </div>

            {/* Tuile especialidades */}
            <div className="pat4-tile pat4-tile-esp pat4-reveal" style={{ animationDelay: "210ms" }}>
              <p className="pat4-tile-label">
                <i className="fas fa-user-md" aria-hidden="true" /> Spécialités
              </p>
              <div className="pat4-stat" aria-hidden="true">{especialidadesCount}</div>
              <p className="pat4-stat-note">domaines de santé, de la médecine générale à la pédiatrie.</p>
            </div>

            {/* Tuile verificados */}
            <div className="pat4-tile pat4-tile-verif pat4-reveal" style={{ animationDelay: "280ms" }}>
              <span className="pat4-verif-head">
                <i className="fas fa-check-circle" aria-hidden="true" /> Vérifiés
              </span>
              <p className="pat4-stat-note" style={{ marginTop: 0 }}>
                Chaque professionnel est confirmé avant d&#8217;apparaître dans les résultats.
              </p>
            </div>

            {/* Tuile gratis */}
            <div className="pat4-tile pat4-tile-gratis pat4-reveal" style={{ animationDelay: "350ms" }}>
              <p className="pat4-tile-label" style={{ color: "rgba(var(--color-dark-1-rgb), 0.7)" }}>Coût</p>
              <div className="pat4-stat">Gratuit</div>
              <p className="pat4-stat-note" style={{ color: "rgba(var(--color-dark-1-rgb), 0.75)" }}>
                Rechercher et consulter ne coûte rien.
              </p>
            </div>
          </div>
        </section>

        {/* ====================== ESPECIALIDADES ====================== */}
        <section className="pat4-section" aria-labelledby="pat4-esp-title">
          <span className="pat4-eyebrow">16 domaines</span>
          <h2 className="pat4-section-title" id="pat4-esp-title">Des spécialités pour tous</h2>
          <p className="pat4-section-sub">
            {'De la consultation de routine au suivi spécialisé, explorez les domaines les plus recherchés et découvrez des professionnels vérifiés près de chez vous.'}
          </p>

          <div className="pat4-bento pat4-esp-grid">
            <div className="pat4-tile pat4-esp-cta pat4-reveal" style={{ animationDelay: "0ms" }}>
              <h3>16 spécialités, une seule recherche.</h3>
              <a className="pat4-link" href="#pat4-top" style={{ color: "var(--color-teal)" }}>
                Tout voir <i className="fas fa-arrow-right" aria-hidden="true" />
              </a>
            </div>

            {ESPECIALIDADES.map((esp, i) => (
              <div
                key={esp.nome}
                className={`pat4-tile pat4-esp-tile pat4-reveal${i % 5 === 0 ? " pat4-esp-tile--wide" : ""}`}
                style={
                  {
                    animationDelay: `${(i + 1) * 60}ms`,
                    "--pat4-glow": esp.corRgb,
                  } as React.CSSProperties
                }
              >
                <span
                  className="pat4-esp-icon"
                  style={{ background: `rgba(${esp.corRgb}, 0.13)`, color: esp.cor }}
                  aria-hidden="true"
                >
                  <i className={`fas ${esp.icone}`} />
                </span>
                <div>
                  <h3 className="pat4-esp-name">{esp.nome}</h3>
                  <p className="pat4-esp-more">professionnels vérifiés</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================== PORQUÊ DOCAGORA ====================== */}
        <section className="pat4-section" aria-labelledby="pat4-why-title">
          <span className="pat4-eyebrow" style={{ color: "var(--color-cobalt)", background: "rgba(var(--color-cobalt-rgb), 0.12)", borderColor: "rgba(var(--color-cobalt-rgb), 0.22)" }}>
            Confiance
          </span>
          <h2 className="pat4-section-title" id="pat4-why-title">Pourquoi DocAgora</h2>
          <p className="pat4-section-sub">
            {'Conçue pour être simple, transparente et respectueuse de vos données. Sans promesses exagérées.'}
          </p>

          <div className="pat4-bento">
            <div className="pat4-tile pat4-why-tile--lead pat4-reveal" style={{ animationDelay: "0ms" }}>
              <span className="pat4-why-icon" style={{ background: "rgba(252, 254, 254, 0.16)", color: "var(--color-light-1)" }} aria-hidden="true">
                <IconGlobe />
              </span>
              <h3 className="pat4-why-title">Votre langue, toujours</h3>
              <p className="pat4-why-text">
                {'Toute la plateforme en portugais, français et anglais. Que vous viviez ici depuis des années ou soyez de passage, vous comprenez tout ce dont vous avez besoin.'}
              </p>
            </div>

            <div className="pat4-tile pat4-why-tile pat4-reveal" style={{ animationDelay: "70ms" }}>
              <span className="pat4-why-icon" aria-hidden="true"><IconShield /></span>
              <h3 className="pat4-why-title">Professionnels vérifiés</h3>
              <p className="pat4-why-text">
                {'Nous confirmons chaque professionnel avant de l\'afficher. Recherchez avec la tranquillité d\'esprit de savoir que les données sont réelles.'}
              </p>
            </div>

            <div className="pat4-tile pat4-why-tile pat4-reveal" style={{ animationDelay: "140ms" }}>
              <span className="pat4-why-icon" style={{ background: "rgba(var(--color-cobalt-rgb), 0.14)", color: "var(--color-cobalt)" }} aria-hidden="true"><IconLock /></span>
              <h3 className="pat4-why-title">RGPD &amp; vie privée</h3>
              <p className="pat4-why-text">
                {'Vos données sont traitées avec soin et en conformité avec le RGPD. Aucun partage caché, aucune mauvaise surprise.'}
              </p>
            </div>

            <div className="pat4-tile pat4-why-tile pat4-reveal" style={{ animationDelay: "210ms" }}>
              <span className="pat4-why-icon" style={{ background: "rgba(var(--color-navy-rgb), 0.12)", color: "var(--color-navy)" }} aria-hidden="true"><IconCalendar /></span>
              <h3 className="pat4-why-title">Prise de rendez-vous en ligne</h3>
              <p className="pat4-why-text">
                {'La prise de rendez-vous directement sur la plateforme arrive bientôt. Pour l\'instant, trouvez et contactez facilement.'}
              </p>
              <span className="pat4-soon"><i className="fas fa-clock" aria-hidden="true" /> Bientôt disponible</span>
            </div>

            <div className="pat4-tile pat4-why-tile pat4-reveal" style={{ animationDelay: "280ms", gridColumn: "span 6" }}>
              <span className="pat4-why-icon" style={{ background: "rgba(var(--color-teal-rgb), 0.16)", color: "var(--color-mint)" }} aria-hidden="true"><IconHeart /></span>
              <h3 className="pat4-why-title">Pensée pour vous</h3>
              <p className="pat4-why-text">
                {'Une expérience claire et accueillante, du premier clic à la découverte du bon professionnel, sans petits caractères.'}
              </p>
            </div>
          </div>
        </section>

        {/* ====================== CIDADES ====================== */}
        <section className="pat4-section" aria-labelledby="pat4-cities-title">
          <span className="pat4-eyebrow" style={{ color: "var(--color-mint)", background: "rgba(var(--color-mint-rgb), 0.12)", borderColor: "rgba(var(--color-mint-rgb), 0.22)" }}>
            Couverture
          </span>
          <h2 className="pat4-section-title" id="pat4-cities-title">Du nord au sud</h2>
          <p className="pat4-section-sub">
            {'Des professionnels dans les principales villes portugaises, en pleine croissance. Choisissez votre ville et commencez à explorer.'}
          </p>

          <div className="pat4-bento">
            <div className="pat4-tile pat4-cities-tile-map pat4-reveal" style={{ animationDelay: "0ms" }}>
              <p className="pat4-tile-label">
                <i className="fas fa-map-marker-alt" aria-hidden="true" /> Carte de couverture
              </p>
              <div className="pat4-map-wrap" role="img" aria-label="Carte du Portugal avec les villes couvertes">
                <PortugalMap />
                <span className="pat4-map-tag">
                  <span aria-hidden="true">{cidadesCount}</span> professionnels&#42;
                </span>
              </div>
            </div>

            <div className="pat4-cities-list" aria-label="Liste des villes">
              {CIDADES.map((c) => (
                <a key={c.nome} className="pat4-city-chip" href="#pat4-top">
                  <i className="fas fa-map-marker-alt" aria-hidden="true" /> {c.nome}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ====================== FAQ ====================== */}
        <section className="pat4-section" aria-labelledby="pat4-faq-title">
          <div className="pat4-bento pat4-faq-grid">
            <div className="pat4-tile pat4-faq-intro pat4-reveal" style={{ animationDelay: "0ms" }}>
              <span className="pat4-eyebrow" style={{ color: "var(--color-teal)", background: "rgba(var(--color-teal-rgb), 0.16)", borderColor: "rgba(var(--color-teal-rgb), 0.3)" }}>
                Questions
              </span>
              <h2 id="pat4-faq-title">Questions fréquentes</h2>
              <p>{'L\'essentiel, sans détour. Si vous avez encore des questions, contactez-nous quand vous voulez.'}</p>
            </div>

            {FAQS.map((f, i) => (
              <div key={f.pergunta} className="pat4-tile pat4-faq-item pat4-reveal" style={{ animationDelay: `${(i + 1) * 80}ms` }}>
                <h3 className="pat4-faq-q">
                  <i className="fas fa-check" aria-hidden="true" /> {f.pergunta}
                </h3>
                <p className="pat4-faq-a">{f.resposta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ====================== CTA FINAL ====================== */}
        <section className="pat4-section" aria-labelledby="pat4-cta-title">
          <div className="pat4-bento">
            <div className="pat4-tile pat4-cta-tile pat4-reveal" style={{ animationDelay: "0ms" }}>
              <span className="pat4-eyebrow" style={{ color: "var(--color-teal)", background: "rgba(var(--color-teal-rgb), 0.16)", borderColor: "rgba(var(--color-teal-rgb), 0.3)" }}>
                Commencez maintenant
              </span>
              <h2 id="pat4-cta-title">
                Votre santé, <em>plus proche</em> de vous.
              </h2>
              <p className="pat4-cta-sub">
                {'Recherchez gratuitement parmi des professionnels vérifiés. La prise de rendez-vous en ligne arrive bientôt.'}
              </p>
              <div className="pat4-cta-actions">
                <a className="pat4-btn-primary" href="#pat4-top">
                  <i className="fas fa-search" aria-hidden="true" /> Rechercher des professionnels
                </a>
                <a className="pat4-btn-ghost" href="#pat4-faq-title">
                  En savoir plus <i className="fas fa-arrow-right" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pat4-shell pat4-footer">
        <div className="pat4-footer-row">
          <a className="pat4-brand" href="#pat4-top" style={{ fontSize: "18px" }}>
            <span className="pat4-brand-dot" aria-hidden="true" style={{ width: 24, height: 24 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M12 4v16M4 12h16" />
              </svg>
            </span>
            DocAgora
          </a>
          <nav className="pat4-footer-links" aria-label="Liens de pied de page">
            <a href="#pat4-esp-title">Spécialités</a>
            <a href="#pat4-cities-title">Villes</a>
            <a href="#pat4-faq-title">FAQ</a>
          </nav>
        </div>
        <p className="pat4-footnote">
          {'* Les chiffres et exemples présentés sont purement illustratifs. La prise de rendez-vous en ligne sera disponible prochainement. La recherche de professionnels de santé est gratuite.'}
        </p>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Carte simplifiée du Portugal (SVG inline) avec villes pulsantes    */
/* ------------------------------------------------------------------ */
function PortugalMap() {
  return (
    <svg className="pat4-map-svg" viewBox="0 0 200 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path
        className="pat4-map-shape"
        d="M70 18 L96 22 L104 44 L96 64 L102 86 L92 108 L98 130 L88 152
           L94 176 L82 200 L88 224 L74 250 L82 276 L66 300 L52 286
           L58 262 L48 238 L56 212 L46 188 L54 162 L44 138 L52 112
           L42 88 L52 62 L46 38 L58 22 Z"
      />
      {CIDADES.map((c) => (
        <g key={c.nome} transform={`translate(${(c.x / 100) * 200}, ${(c.y / 100) * 320})`}>
          <circle className="pat4-dot-halo" r="7" />
          <circle className="pat4-dot" r="3.4" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Petits pictos SVG (stroke = currentColor)                          */
/* ------------------------------------------------------------------ */
function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4.5" y="10" width="15" height="10" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15" r="1.4" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="5" width="16" height="16" rx="2.5" />
      <path d="M4 9h16M8 3v4M16 3v4M9 14l2 2 4-4" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20s-7-4.6-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5C19 15.4 12 20 12 20z" />
    </svg>
  );
}
