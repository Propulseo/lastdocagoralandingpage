"use client";

/**
 * Variante patient #5 — « Recherche Vive »
 * PRODUCT-LED : la console de recherche interactive EST le héros.
 * Énergie app-like (Linear/Arc) : surfaces blanches, ombres précises,
 * accent mint/teal, labels en mono. Tous les résultats sont ILLUSTRATIFS.
 * Page autonome — aucun import CSS, tout le style dans un seul <style>.
 */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Données illustratives (jamais présentées comme réelles)
   ────────────────────────────────────────────────────────────── */

type Especialidade = {
  id: string;
  label: string;
  icon: string; // classe Font Awesome 5
};

type Cidade = {
  id: string;
  label: string;
};

type Lingua = {
  id: string;
  label: string;
};

type Profissional = {
  id: string;
  nome: string;
  especialidade: string; // id especialidade
  cidade: string; // id cidade
  linguas: string[]; // ids lingua
  iniciais: string;
  zonas: string;
  nota: string; // illustratif
};

const ESPECIALIDADES: Especialidade[] = [
  { id: 'all', label: 'Toutes', icon: 'fa-th-large' },
  { id: 'clinica', label: 'Médecine générale', icon: 'fa-user-md' },
  { id: 'dentaria', label: 'Médecine dentaire', icon: 'fa-tooth' },
  { id: 'derma', label: 'Dermatologie', icon: 'fa-allergies' },
  { id: 'pediatria', label: 'Pédiatrie', icon: 'fa-child' },
  { id: 'psico', label: 'Psychologie', icon: 'fa-brain' },
  { id: 'oftalmo', label: 'Ophtalmologie', icon: 'fa-eye' },
  { id: 'fisio', label: 'Kinésithérapie', icon: 'fa-walking' },
];

const CIDADES: Cidade[] = [
  { id: 'all', label: 'Tout le pays' },
  { id: 'lisboa', label: 'Lisbonne' },
  { id: 'porto', label: 'Porto' },
  { id: 'coimbra', label: 'Coimbra' },
  { id: 'braga', label: 'Braga' },
  { id: 'faro', label: 'Faro' },
];

const LINGUAS: Lingua[] = [
  { id: 'all', label: 'Toutes' },
  { id: 'pt', label: 'PT' },
  { id: 'fr', label: 'FR' },
  { id: 'en', label: 'EN' },
];

const PROFISSIONAIS: Profissional[] = [
  {
    id: 'p1',
    nome: 'Dra. Sofia Marques',
    especialidade: 'clinica',
    cidade: 'lisboa',
    linguas: ['pt', 'fr', 'en'],
    iniciais: 'SM',
    zonas: 'Lisbonne · Avenidas Novas',
    nota: '4,9',
  },
  {
    id: 'p2',
    nome: 'Dr. André Pereira',
    especialidade: 'dentaria',
    cidade: 'porto',
    linguas: ['pt', 'en'],
    iniciais: 'AP',
    zonas: 'Porto · Boavista',
    nota: '4,8',
  },
  {
    id: 'p3',
    nome: 'Dra. Inês Carvalho',
    especialidade: 'derma',
    cidade: 'lisboa',
    linguas: ['pt', 'fr'],
    iniciais: 'IC',
    zonas: 'Lisbonne · Chiado',
    nota: '5,0',
  },
  {
    id: 'p4',
    nome: 'Dr. Tomás Silva',
    especialidade: 'pediatria',
    cidade: 'coimbra',
    linguas: ['pt', 'en'],
    iniciais: 'TS',
    zonas: 'Coimbra · Centre',
    nota: '4,9',
  },
  {
    id: 'p5',
    nome: 'Dra. Mariana Lopes',
    especialidade: 'psico',
    cidade: 'porto',
    linguas: ['pt', 'fr', 'en'],
    iniciais: 'ML',
    zonas: 'Porto · Cedofeita',
    nota: '4,7',
  },
  {
    id: 'p6',
    nome: 'Dr. Rui Fonseca',
    especialidade: 'oftalmo',
    cidade: 'braga',
    linguas: ['pt'],
    iniciais: 'RF',
    zonas: 'Braga · São Vítor',
    nota: '4,8',
  },
  {
    id: 'p7',
    nome: 'Dra. Beatriz Nunes',
    especialidade: 'fisio',
    cidade: 'faro',
    linguas: ['pt', 'en'],
    iniciais: 'BN',
    zonas: 'Faro · Centre',
    nota: '4,9',
  },
  {
    id: 'p8',
    nome: 'Dr. Hugo Antunes',
    especialidade: 'clinica',
    cidade: 'porto',
    linguas: ['pt', 'fr'],
    iniciais: 'HA',
    zonas: 'Porto · Foz',
    nota: '4,6',
  },
  {
    id: 'p9',
    nome: 'Dra. Carla Ribeiro',
    especialidade: 'derma',
    cidade: 'coimbra',
    linguas: ['pt', 'en'],
    iniciais: 'CR',
    zonas: 'Coimbra · Solum',
    nota: '5,0',
  },
];

/* Placeholders qui se tapent (typewriter) */
const TYPEWRITER: string[] = [
  'Dentiste à Lisbonne qui parle français',
  'Pédiatre à Porto',
  'Psychologue qui parle anglais',
  'Dermatologue à Coimbra',
];

/* ──────────────────────────────────────────────────────────────
   Sous-composants locaux
   ────────────────────────────────────────────────────────────── */

function LogoMark() {
  return (
    <span className="pat5-logo" aria-label="DocAgora">
      <svg
        className="pat5-logo-glyph"
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="11"
          cy="11"
          r="7"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <path
          d="M16 16l4 4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M8 11h6M11 8v6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="pat5-logo-text">DocAgora</span>
    </span>
  );
}

type ChipRowProps = {
  legend: string;
  options: { id: string; label: string; icon?: string }[];
  value: string;
  onChange: (id: string) => void;
  withIcon?: boolean;
};

function ChipRow({ legend, options, value, onChange, withIcon }: ChipRowProps) {
  return (
    <fieldset className="pat5-chiprow">
      <legend className="pat5-mono pat5-chiprow-legend">{legend}</legend>
      <div className="pat5-chips" role="group" aria-label={legend}>
        {options.map((opt) => {
          const active = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              className={`pat5-chip${active ? ' pat5-chip--active' : ''}`}
              aria-pressed={active}
              onClick={() => onChange(opt.id)}
            >
              {withIcon && opt.icon ? (
                <i className={`fas ${opt.icon} pat5-chip-icon`} aria-hidden="true" />
              ) : null}
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

type ResultCardProps = {
  pro: Profissional;
  index: number;
};

function ResultCard({ pro, index }: ResultCardProps) {
  const esp =
    ESPECIALIDADES.find((e) => e.id === pro.especialidade)?.label ?? '';
  return (
    <article
      className="pat5-result"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <span className="pat5-result-flag pat5-mono">exemple</span>
      <div className="pat5-result-head">
        <span className="pat5-avatar" aria-hidden="true">
          {pro.iniciais}
        </span>
        <div className="pat5-result-id">
          <h3 className="pat5-result-name">{pro.nome}</h3>
          <p className="pat5-result-spec">{esp}</p>
        </div>
        <span className="pat5-verified" title="Professionnel vérifié">
          <i className="fas fa-check-circle" aria-hidden="true" />
        </span>
      </div>

      <div className="pat5-result-meta">
        <span className="pat5-result-metaitem">
          <i className="fas fa-map-marker-alt" aria-hidden="true" />
          {pro.zonas}
        </span>
        <span className="pat5-result-metaitem">
          <i className="fas fa-language" aria-hidden="true" />
          {pro.linguas
            .map((l) => LINGUAS.find((x) => x.id === l)?.label ?? l)
            .join(' · ')}
        </span>
      </div>

      <div className="pat5-result-foot">
        <span className="pat5-result-rating">
          <i className="fas fa-star" aria-hidden="true" />
          {pro.nota}
          <span className="pat5-mono pat5-result-rating-note">*illustratif</span>
        </span>
        <span className="pat5-result-cta">
          Voir le profil
          <i className="fas fa-arrow-right" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────── */

export default function PatientVariant5() {
  const [espId, setEspId] = useState<string>('all');
  const [cidadeId, setCidadeId] = useState<string>('all');
  const [linguaId, setLinguaId] = useState<string>('all');

  // Typewriter placeholder — initial value resolved lazily (no setState in effect)
  const [typed, setTyped] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? TYPEWRITER[0]
      : '';
  });

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const phrase = TYPEWRITER[phraseIndex];
      if (!deleting) {
        charIndex += 1;
        setTyped(phrase.slice(0, charIndex));
        if (charIndex === phrase.length) {
          deleting = true;
          return 1600;
        }
        return 55;
      }
      charIndex -= 1;
      setTyped(phrase.slice(0, charIndex));
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % TYPEWRITER.length;
        return 400;
      }
      return 28;
    };

    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      const delay = tick();
      timer = setTimeout(loop, delay);
    };
    timer = setTimeout(loop, 600);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage des résultats illustratifs
  const resultados = useMemo<Profissional[]>(() => {
    const out = PROFISSIONAIS.filter((p) => {
      const okEsp = espId === 'all' || p.especialidade === espId;
      const okCidade = cidadeId === 'all' || p.cidade === cidadeId;
      const okLingua = linguaId === 'all' || p.linguas.includes(linguaId);
      return okEsp && okCidade && okLingua;
    });
    // Réordonne pour donner la sensation « vivante »
    return out.slice(0, 6);
  }, [espId, cidadeId, linguaId]);

  // Clé de re-render pour l’animation d’entrée groupée
  const resultsKey = `${espId}-${cidadeId}-${linguaId}`;

  return (
    <div className="pat5-root">
      <style>{`
        .pat5-root {
          box-sizing: border-box;
          --pat5-ink: var(--color-dark-1);
          --pat5-ink-2: #475569;
          --pat5-line: #e7edf2;
          --pat5-surface: var(--color-light-1);
          --pat5-bg: var(--color-light-2);
          --pat5-mono: ui-monospace, "SF Mono", Menlo, monospace;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          color: var(--pat5-ink);
          background: var(--pat5-bg);
          line-height: 1.5;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }
        .pat5-root *,
        .pat5-root *::before,
        .pat5-root *::after { box-sizing: border-box; }

        .pat5-root h1,
        .pat5-root h2,
        .pat5-root h3,
        .pat5-root p,
        .pat5-root ul,
        .pat5-root li,
        .pat5-root fieldset,
        .pat5-root legend,
        .pat5-root figure {
          margin: 0;
          padding: 0;
          font-family: inherit;
          text-transform: none;
          color: inherit;
          line-height: inherit;
        }
        .pat5-root fieldset { border: 0; min-width: 0; }
        .pat5-root ul { list-style: none; }

        .pat5-mono {
          font-family: var(--pat5-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .pat5-shell {
          max-width: 1180px;
          margin-inline: auto;
          padding-inline: 24px;
        }

        /* ── Atmosphere ── */
        .pat5-mesh {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(60% 50% at 78% -5%, rgba(var(--color-teal-rgb), 0.22), transparent 70%),
            radial-gradient(50% 45% at 8% 8%, rgba(var(--color-cobalt-rgb), 0.14), transparent 70%),
            radial-gradient(45% 40% at 50% 120%, rgba(var(--color-mint-rgb), 0.12), transparent 70%);
        }
        .pat5-grain {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.4;
          background-image: radial-gradient(rgba(var(--color-navy-rgb), 0.05) 1px, transparent 1px);
          background-size: 4px 4px;
        }

        /* ── Header / Nav ── */
        .pat5-header {
          position: relative;
          z-index: 5;
        }
        .pat5-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-block: 22px;
        }
        .pat5-logo {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--color-navy);
        }
        .pat5-logo-glyph { color: var(--color-teal); flex-shrink: 0; }
        .pat5-logo-text {
          font-weight: 700;
          font-size: 19px;
          letter-spacing: -0.02em;
          color: var(--color-navy);
        }
        .pat5-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--pat5-mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--pat5-ink-2);
          text-decoration: none;
          padding: 9px 14px;
          border: 1px solid var(--pat5-line);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.6);
          transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          min-height: 40px;
        }
        .pat5-back:hover {
          color: var(--color-navy);
          border-color: rgba(var(--color-cobalt-rgb), 0.45);
          transform: translateX(-2px);
        }

        /* ── Hero ── */
        .pat5-hero {
          position: relative;
          z-index: 2;
          padding-top: 28px;
          padding-bottom: 84px;
        }
        .pat5-hero-grid {
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          gap: 44px;
          align-items: start;
        }
        .pat5-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--color-mint);
          background: rgba(var(--color-teal-rgb), 0.1);
          border: 1px solid rgba(var(--color-teal-rgb), 0.3);
          padding: 6px 12px;
          border-radius: 999px;
        }
        .pat5-eyebrow-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--color-teal);
          box-shadow: 0 0 0 0 rgba(var(--color-teal-rgb), 0.6);
          animation: pat5-pulse 2.4s ease-out infinite;
        }
        .pat5-h1 {
          font-weight: 700;
          font-size: clamp(2.2rem, 5.2vw, 3.6rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--pat5-ink);
          margin-top: 18px;
        }
        .pat5-h1 .pat5-h1-accent {
          background: linear-gradient(100deg, var(--color-cobalt), var(--color-teal));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .pat5-lead {
          font-size: clamp(1rem, 1.6vw, 1.12rem);
          color: var(--pat5-ink-2);
          margin-top: 18px;
          max-width: 30ch;
        }
        .pat5-hero-points {
          margin-top: 26px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pat5-point {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 14px;
          color: var(--pat5-ink);
        }
        .pat5-point i {
          color: var(--color-teal);
          font-size: 15px;
          width: 18px;
          text-align: center;
        }
        .pat5-hero-note {
          margin-top: 24px;
          color: var(--pat5-ink-2);
          font-size: 12.5px;
        }

        /* ── Device / App window ── */
        .pat5-device {
          background: var(--pat5-surface);
          border: 1px solid var(--pat5-line);
          border-radius: 18px;
          box-shadow:
            0 1px 1px rgba(var(--color-dark-1-rgb), 0.04),
            0 24px 60px -22px rgba(var(--color-navy-rgb), 0.32),
            0 8px 24px -16px rgba(var(--color-dark-1-rgb), 0.2);
          overflow: hidden;
        }
        .pat5-device-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 16px;
          border-bottom: 1px solid var(--pat5-line);
          background: linear-gradient(180deg, #ffffff, var(--pat5-bg));
        }
        .pat5-dots { display: flex; gap: 7px; }
        .pat5-dot { width: 11px; height: 11px; border-radius: 50%; }
        .pat5-dot--1 { background: #ff5f57; }
        .pat5-dot--2 { background: #febc2e; }
        .pat5-dot--3 { background: #28c840; }
        .pat5-urlbar {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--pat5-bg);
          border: 1px solid var(--pat5-line);
          border-radius: 8px;
          padding: 6px 12px;
          font-family: var(--pat5-mono);
          font-size: 11.5px;
          color: var(--pat5-ink-2);
          letter-spacing: 0.02em;
          min-width: 0;
        }
        .pat5-urlbar i { color: var(--color-mint); font-size: 11px; }
        .pat5-urlbar span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pat5-console { padding: 20px; }

        /* Search field */
        .pat5-searchfield {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--pat5-bg);
          border: 1.5px solid var(--pat5-line);
          border-radius: 12px;
          padding: 14px 16px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .pat5-searchfield:focus-within,
        .pat5-searchfield:hover {
          border-color: rgba(var(--color-teal-rgb), 0.6);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.12);
        }
        .pat5-search-icon { color: var(--color-mint); font-size: 16px; flex-shrink: 0; }
        .pat5-search-text {
          flex: 1;
          font-size: 15px;
          color: var(--pat5-ink);
          min-height: 22px;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pat5-search-text.is-empty { color: var(--pat5-ink-2); }
        .pat5-caret {
          display: inline-block;
          width: 2px;
          height: 1.05em;
          margin-left: 1px;
          background: var(--color-teal);
          vertical-align: -2px;
          animation: pat5-blink 1s step-end infinite;
        }
        .pat5-search-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 0;
          cursor: pointer;
          background: var(--color-teal);
          color: var(--color-dark-1);
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 600;
          font-size: 13px;
          padding: 9px 15px;
          border-radius: 9px;
          min-height: 40px;
          transition: transform 0.18s ease, background-color 0.2s ease;
        }
        .pat5-search-btn:hover { background: var(--color-mint); color: #fff; transform: translateY(-1px); }

        /* Filter chips */
        .pat5-filters { margin-top: 16px; display: flex; flex-direction: column; gap: 13px; }
        .pat5-chiprow { display: flex; flex-direction: column; gap: 8px; }
        .pat5-chiprow-legend { color: var(--pat5-ink-2); }
        .pat5-chips { display: flex; flex-wrap: wrap; gap: 7px; }
        .pat5-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 1px solid var(--pat5-line);
          background: var(--pat5-surface);
          color: var(--pat5-ink-2);
          font-family: var(--font-montserrat), sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          padding: 7px 12px;
          border-radius: 999px;
          cursor: pointer;
          min-height: 34px;
          transition: transform 0.16s ease, border-color 0.18s ease, background-color 0.18s ease, color 0.18s ease;
        }
        .pat5-chip:hover {
          border-color: rgba(var(--color-cobalt-rgb), 0.5);
          color: var(--color-navy);
          transform: translateY(-1px);
        }
        .pat5-chip-icon { font-size: 11px; color: var(--color-mint); }
        .pat5-chip--active {
          background: var(--color-navy);
          border-color: var(--color-navy);
          color: #fff;
        }
        .pat5-chip--active .pat5-chip-icon { color: var(--color-teal); }

        /* Results */
        .pat5-results-head {
          margin-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 15px;
          border-top: 1px dashed var(--pat5-line);
        }
        .pat5-results-count { font-size: 12.5px; color: var(--pat5-ink-2); }
        .pat5-results-count b { color: var(--color-navy); font-weight: 700; }
        .pat5-soon {
          font-family: var(--pat5-mono);
          font-size: 10.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-mint);
          background: rgba(var(--color-mint-rgb), 0.12);
          border: 1px solid rgba(var(--color-mint-rgb), 0.3);
          padding: 4px 9px;
          border-radius: 999px;
        }

        .pat5-results {
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 11px;
          max-height: 360px;
          overflow: auto;
          padding-right: 2px;
        }
        .pat5-results-empty {
          grid-column: 1 / -1;
          text-align: center;
          color: var(--pat5-ink-2);
          font-size: 13px;
          padding: 30px 12px;
        }

        .pat5-result {
          position: relative;
          background: var(--pat5-surface);
          border: 1px solid var(--pat5-line);
          border-radius: 12px;
          padding: 14px;
          opacity: 0;
          transform: translateY(10px) scale(0.99);
          animation: pat5-result-in 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .pat5-result:hover {
          border-color: rgba(var(--color-teal-rgb), 0.55);
          box-shadow: 0 10px 26px -16px rgba(var(--color-navy-rgb), 0.4);
          transform: translateY(-2px);
        }
        .pat5-result-flag {
          position: absolute;
          top: 11px;
          right: 11px;
          font-size: 9px;
          letter-spacing: 0.14em;
          color: var(--pat5-ink-2);
          background: var(--pat5-bg);
          border: 1px solid var(--pat5-line);
          padding: 2px 6px;
          border-radius: 5px;
        }
        .pat5-result-head { display: flex; align-items: center; gap: 11px; padding-right: 56px; }
        .pat5-avatar {
          width: 40px; height: 40px;
          flex-shrink: 0;
          border-radius: 11px;
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-mint));
          letter-spacing: 0.02em;
        }
        .pat5-result-id { min-width: 0; }
        .pat5-result-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--pat5-ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pat5-result-spec { font-size: 12px; color: var(--pat5-ink-2); margin-top: 2px; }
        .pat5-verified { color: var(--color-teal); font-size: 15px; margin-left: auto; }

        .pat5-result-meta { margin-top: 11px; display: flex; flex-direction: column; gap: 6px; }
        .pat5-result-metaitem {
          display: flex; align-items: center; gap: 7px;
          font-size: 11.5px; color: var(--pat5-ink-2);
        }
        .pat5-result-metaitem i { color: var(--color-mint); width: 13px; text-align: center; font-size: 11px; }

        .pat5-result-foot {
          margin-top: 12px;
          padding-top: 11px;
          border-top: 1px solid var(--pat5-line);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .pat5-result-rating {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12.5px; font-weight: 600; color: var(--pat5-ink);
        }
        .pat5-result-rating i { color: #f5b301; font-size: 11px; }
        .pat5-result-rating-note { font-size: 9px; color: var(--pat5-ink-2); letter-spacing: 0.08em; margin-left: 3px; }
        .pat5-result-cta {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 600; color: var(--color-cobalt);
        }
        .pat5-result:hover .pat5-result-cta { gap: 9px; }
        .pat5-result-cta i { font-size: 10px; transition: transform 0.2s ease; }

        /* ── Generic section ── */
        .pat5-section { position: relative; z-index: 2; padding-block: 84px; }
        .pat5-section--alt { background: var(--pat5-surface); border-block: 1px solid var(--pat5-line); }
        .pat5-section-head { max-width: 56ch; margin-bottom: 40px; }
        .pat5-kicker { color: var(--color-mint); margin-bottom: 12px; display: inline-block; }
        .pat5-h2 {
          font-weight: 700;
          font-size: clamp(1.6rem, 3.4vw, 2.4rem);
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--pat5-ink);
        }
        .pat5-section-sub { margin-top: 14px; color: var(--pat5-ink-2); font-size: 15px; max-width: 52ch; }

        /* ── Comment ça marche ── */
        .pat5-howgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .pat5-step {
          background: var(--pat5-bg);
          border: 1px solid var(--pat5-line);
          border-radius: 14px;
          padding: 22px;
          position: relative;
          overflow: hidden;
        }
        .pat5-section--alt .pat5-step { background: var(--pat5-bg); }
        .pat5-step-num {
          font-family: var(--pat5-mono);
          font-size: 12px;
          letter-spacing: 0.1em;
          color: var(--color-mint);
        }
        .pat5-step-icon {
          margin-top: 12px;
          width: 44px; height: 44px;
          border-radius: 12px;
          display: grid; place-items: center;
          background: rgba(var(--color-teal-rgb), 0.12);
          color: var(--color-mint);
          font-size: 18px;
        }
        .pat5-step-title { margin-top: 14px; font-size: 16px; font-weight: 600; color: var(--pat5-ink); }
        .pat5-step-desc { margin-top: 7px; font-size: 13.5px; color: var(--pat5-ink-2); line-height: 1.55; }

        /* mock preview band */
        .pat5-preview {
          margin-top: 30px;
          background: var(--pat5-bg);
          border: 1px solid var(--pat5-line);
          border-radius: 16px;
          padding: 18px;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 16px;
        }
        .pat5-preview-side { display: flex; flex-direction: column; gap: 9px; }
        .pat5-preview-pill {
          height: 34px;
          border-radius: 9px;
          background: var(--pat5-surface);
          border: 1px solid var(--pat5-line);
          display: flex; align-items: center; gap: 9px;
          padding-inline: 12px;
          font-size: 12px;
          color: var(--pat5-ink-2);
        }
        .pat5-preview-pill i { color: var(--color-mint); font-size: 11px; }
        .pat5-preview-pill--on { border-color: rgba(var(--color-teal-rgb), 0.55); color: var(--color-navy); font-weight: 600; }
        .pat5-preview-main { display: grid; grid-template-columns: repeat(2, 1fr); gap: 11px; }
        .pat5-preview-card {
          background: var(--pat5-surface);
          border: 1px solid var(--pat5-line);
          border-radius: 11px;
          padding: 13px;
        }
        .pat5-preview-row { height: 9px; border-radius: 4px; background: var(--pat5-line); }
        .pat5-preview-row--sm { width: 55%; margin-top: 8px; }
        .pat5-preview-row--accent { background: rgba(var(--color-teal-rgb), 0.4); width: 38%; margin-top: 12px; }
        .pat5-preview-chip {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--pat5-mono); font-size: 9px; letter-spacing: 0.1em;
          color: var(--pat5-ink-2); background: var(--pat5-bg);
          border: 1px solid var(--pat5-line); border-radius: 5px;
          padding: 2px 6px;
        }

        /* ── Chips spécialités ── */
        .pat5-espsearch {
          display: flex; align-items: center; gap: 10px;
          max-width: 420px;
          background: var(--pat5-surface);
          border: 1.5px solid var(--pat5-line);
          border-radius: 11px;
          padding: 11px 14px;
          margin-bottom: 22px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .pat5-espsearch:focus-within { border-color: rgba(var(--color-teal-rgb), 0.6); box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.12); }
        .pat5-espsearch i { color: var(--color-mint); }
        .pat5-espsearch input {
          flex: 1; border: 0; outline: none; background: transparent;
          font-family: var(--font-montserrat), sans-serif; font-size: 14px; color: var(--pat5-ink);
          min-width: 0;
        }
        .pat5-espsearch input::placeholder { color: var(--pat5-ink-2); }
        .pat5-espgrid { display: flex; flex-wrap: wrap; gap: 10px; }
        .pat5-esp {
          display: inline-flex; align-items: center; gap: 9px;
          background: var(--pat5-surface);
          border: 1px solid var(--pat5-line);
          border-radius: 11px;
          padding: 12px 16px;
          font-size: 14px;
          color: var(--pat5-ink);
          transition: transform 0.18s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .pat5-esp:hover {
          transform: translateY(-2px);
          border-color: rgba(var(--color-teal-rgb), 0.55);
          box-shadow: 0 8px 22px -16px rgba(var(--color-navy-rgb), 0.4);
        }
        .pat5-esp i { color: var(--color-mint); font-size: 15px; width: 18px; text-align: center; }
        .pat5-esp-empty { color: var(--pat5-ink-2); font-size: 13px; }

        /* ── Confiance ── */
        .pat5-trust { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .pat5-trust-card {
          background: var(--pat5-surface);
          border: 1px solid var(--pat5-line);
          border-radius: 14px;
          padding: 22px;
        }
        .pat5-trust-icon { color: var(--color-mint); font-size: 22px; }
        .pat5-trust-svg { color: var(--color-mint); }
        .pat5-trust-title { margin-top: 14px; font-size: 15px; font-weight: 600; color: var(--pat5-ink); }
        .pat5-trust-desc { margin-top: 7px; font-size: 13px; color: var(--pat5-ink-2); line-height: 1.55; }

        /* ── Application bientôt ── */
        .pat5-app {
          position: relative;
          background: linear-gradient(140deg, var(--color-dark-2), var(--color-dark-1) 60%, #122140);
          border-radius: 22px;
          overflow: hidden;
          padding: 48px;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 36px;
          align-items: center;
        }
        .pat5-app::before {
          content: "";
          position: absolute; inset: 0;
          background:
            radial-gradient(45% 60% at 90% 10%, rgba(var(--color-teal-rgb), 0.28), transparent 70%),
            radial-gradient(40% 55% at 10% 95%, rgba(var(--color-cobalt-rgb), 0.22), transparent 70%);
          pointer-events: none;
        }
        .pat5-app > * { position: relative; z-index: 1; }
        .pat5-app-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--pat5-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--color-teal);
          background: rgba(var(--color-teal-rgb), 0.12);
          border: 1px solid rgba(var(--color-teal-rgb), 0.35);
          border-radius: 999px;
          padding: 6px 12px;
        }
        .pat5-app-title { margin-top: 18px; font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.12; }
        .pat5-app-desc { margin-top: 14px; color: rgba(255, 255, 255, 0.7); font-size: 14.5px; max-width: 40ch; line-height: 1.6; }
        .pat5-app-list { margin-top: 20px; display: flex; flex-direction: column; gap: 10px; }
        .pat5-app-li { display: flex; align-items: center; gap: 10px; color: rgba(255, 255, 255, 0.85); font-size: 13.5px; }
        .pat5-app-li i { color: var(--color-teal); }
        .pat5-app-soon {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 22px;
          font-size: 12px; color: rgba(255, 255, 255, 0.55);
          border: 1px dashed rgba(255, 255, 255, 0.25);
          border-radius: 10px; padding: 9px 14px;
        }

        /* phone mock */
        .pat5-phone {
          justify-self: center;
          width: 230px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 30px;
          padding: 12px;
          backdrop-filter: blur(4px);
          box-shadow: 0 30px 60px -24px rgba(0, 0, 0, 0.7);
        }
        .pat5-phone-screen {
          background: var(--pat5-surface);
          border-radius: 22px;
          padding: 16px;
          min-height: 360px;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .pat5-phone-bar {
          display: flex; align-items: center; gap: 8px;
          background: var(--pat5-bg); border: 1px solid var(--pat5-line);
          border-radius: 9px; padding: 9px 11px; font-size: 11px; color: var(--pat5-ink-2);
        }
        .pat5-phone-bar i { color: var(--color-mint); }
        .pat5-phone-mini {
          background: var(--pat5-bg);
          border: 1px solid var(--pat5-line);
          border-radius: 11px;
          padding: 11px;
          display: flex; align-items: center; gap: 9px;
        }
        .pat5-phone-mini-avatar {
          width: 30px; height: 30px; border-radius: 9px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-mint));
        }
        .pat5-phone-mini-lines { flex: 1; }
        .pat5-phone-mini-row { height: 7px; border-radius: 4px; background: var(--pat5-line); }
        .pat5-phone-mini-row--sm { width: 60%; margin-top: 6px; }
        .pat5-phone-tag {
          align-self: flex-start;
          font-family: var(--pat5-mono); font-size: 8px; letter-spacing: 0.1em;
          color: var(--pat5-ink-2); background: var(--pat5-surface);
          border: 1px solid var(--pat5-line); border-radius: 4px; padding: 2px 5px;
        }

        /* ── CTA final ── */
        .pat5-cta { text-align: center; }
        .pat5-cta-h2 {
          font-weight: 700;
          font-size: clamp(1.7rem, 3.6vw, 2.6rem);
          letter-spacing: -0.025em;
          color: var(--pat5-ink);
          line-height: 1.1;
          max-width: 18ch;
          margin-inline: auto;
        }
        .pat5-cta-sub { margin-top: 16px; color: var(--pat5-ink-2); font-size: 15px; max-width: 46ch; margin-inline: auto; }
        .pat5-cta-actions { margin-top: 28px; display: inline-flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
        .pat5-btn {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 600; font-size: 14px;
          text-decoration: none;
          padding: 14px 24px;
          border-radius: 12px;
          min-height: 48px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: transform 0.18s ease, background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .pat5-btn--primary {
          background: var(--color-teal);
          color: var(--color-dark-1);
          box-shadow: 0 12px 28px -14px rgba(var(--color-teal-rgb), 0.8);
        }
        .pat5-btn--primary:hover { background: var(--color-mint); color: #fff; transform: translateY(-2px); }
        .pat5-btn--ghost {
          background: var(--pat5-surface);
          color: var(--color-navy);
          border-color: var(--pat5-line);
        }
        .pat5-btn--ghost:hover { border-color: rgba(var(--color-cobalt-rgb), 0.5); transform: translateY(-2px); }
        .pat5-btn i { font-size: 12px; transition: transform 0.2s ease; }
        .pat5-btn--primary:hover i { transform: translateX(3px); }

        /* ── Footer ── */
        .pat5-footer {
          position: relative;
          z-index: 2;
          border-top: 1px solid var(--pat5-line);
          background: var(--pat5-surface);
        }
        .pat5-footer-inner {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
          padding-block: 28px;
        }
        .pat5-footer-meta { font-size: 12px; color: var(--pat5-ink-2); }
        .pat5-footer-links { display: flex; gap: 18px; flex-wrap: wrap; }
        .pat5-footer-link {
          font-size: 12.5px; color: var(--pat5-ink-2); text-decoration: none;
          transition: color 0.18s ease;
        }
        .pat5-footer-link:hover { color: var(--color-navy); }

        /* ── Reveal on load ── */
        .pat5-reveal {
          opacity: 0;
          transform: translateY(16px);
          animation: pat5-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* ── Keyframes ── */
        @keyframes pat5-reveal { to { opacity: 1; transform: translateY(0); } }
        @keyframes pat5-result-in { to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes pat5-blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }
        @keyframes pat5-pulse {
          0% { box-shadow: 0 0 0 0 rgba(var(--color-teal-rgb), 0.55); }
          70% { box-shadow: 0 0 0 10px rgba(var(--color-teal-rgb), 0); }
          100% { box-shadow: 0 0 0 0 rgba(var(--color-teal-rgb), 0); }
        }

        /* ── Focus visible ── */
        .pat5-root a:focus-visible,
        .pat5-root button:focus-visible {
          outline: 2px solid var(--color-cobalt);
          outline-offset: 2px;
          border-radius: 8px;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .pat5-hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .pat5-app { grid-template-columns: 1fr; gap: 28px; padding: 36px; }
          .pat5-phone { order: -1; }
        }
        @media (max-width: 860px) {
          .pat5-howgrid { grid-template-columns: 1fr; }
          .pat5-trust { grid-template-columns: repeat(2, 1fr); }
          .pat5-preview { grid-template-columns: 1fr; }
          .pat5-preview-side { flex-direction: row; flex-wrap: wrap; }
          .pat5-preview-pill { flex: 1; min-width: 140px; }
        }
        @media (max-width: 600px) {
          .pat5-shell { padding-inline: 16px; }
          .pat5-section { padding-block: 60px; }
          .pat5-results { grid-template-columns: 1fr; max-height: none; }
          .pat5-trust { grid-template-columns: 1fr; }
          .pat5-preview-main { grid-template-columns: 1fr; }
          .pat5-searchfield { flex-wrap: wrap; }
          .pat5-search-btn { width: 100%; justify-content: center; }
          .pat5-app { padding: 26px; }
          .pat5-nav { padding-block: 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pat5-root *,
          .pat5-root *::before,
          .pat5-root *::after {
            animation: none !important;
            transition: none !important;
          }
          .pat5-reveal,
          .pat5-result { opacity: 1 !important; transform: none !important; }
          .pat5-caret { opacity: 1 !important; }
        }
      `}</style>

      <div className="pat5-mesh" aria-hidden="true" />
      <div className="pat5-grain" aria-hidden="true" />

      {/* ── Header / Nav ── */}
      <header className="pat5-header">
        <div className="pat5-shell">
          <nav className="pat5-nav" aria-label="Navigation de la variante">
            <LogoMark />
            <Link className="pat5-back" href="/variants">
              <i className="fas fa-arrow-left" aria-hidden="true" />
              Variantes
            </Link>
          </nav>
        </div>
      </header>

      {/* ── HERO : console de recherche ── */}
      <main>
        <section className="pat5-hero" aria-labelledby="pat5-hero-title">
          <div className="pat5-shell">
            <div className="pat5-hero-grid">
              {/* Colonne texte */}
              <div>
                <span className="pat5-eyebrow pat5-reveal" style={{ animationDelay: '40ms' }}>
                  <span className="pat5-eyebrow-dot" aria-hidden="true" />
                  <span className="pat5-mono">Recherche gratuite</span>
                </span>

                <h1 id="pat5-hero-title" className="pat5-h1 pat5-reveal" style={{ animationDelay: '120ms' }}>
                  Trouvez le professionnel de santé{' '}
                  <span className="pat5-h1-accent">qu’il vous faut</span>.
                </h1>

                <p className="pat5-lead pat5-reveal" style={{ animationDelay: '200ms' }}>
                  {'Recherchez des professionnels vérifiés au Portugal, par spécialité, ville et langue. En portugais, français ou anglais.'}
                </p>

                <ul className="pat5-hero-points pat5-reveal" style={{ animationDelay: '280ms' }}>
                  <li className="pat5-point">
                    <i className="fas fa-check" aria-hidden="true" />
                    Recherche toujours gratuite, sans inscription
                  </li>
                  <li className="pat5-point">
                    <i className="fas fa-shield-alt" aria-hidden="true" />
                    Professionnels vérifiés par notre équipe
                  </li>
                  <li className="pat5-point">
                    <i className="fas fa-globe-europe" aria-hidden="true" />
                    Disponible en PT &middot; FR &middot; EN
                  </li>
                </ul>

                <p className="pat5-hero-note pat5-mono pat5-reveal" style={{ animationDelay: '360ms' }}>
                  Résultats illustratifs &middot; prise de rendez-vous bientôt
                </p>
              </div>

              {/* Colonne device — la console */}
              <div className="pat5-device pat5-reveal" style={{ animationDelay: '260ms' }}>
                <div className="pat5-device-bar">
                  <span className="pat5-dots" aria-hidden="true">
                    <span className="pat5-dot pat5-dot--1" />
                    <span className="pat5-dot pat5-dot--2" />
                    <span className="pat5-dot pat5-dot--3" />
                  </span>
                  <span className="pat5-urlbar">
                    <i className="fas fa-lock" aria-hidden="true" />
                    <span>docagora.pt/recherche</span>
                  </span>
                </div>

                <div className="pat5-console">
                  {/* Champ de recherche avec typewriter */}
                  <div className="pat5-searchfield">
                    <i className="fas fa-search pat5-search-icon" aria-hidden="true" />
                    <div
                      className={`pat5-search-text${typed ? '' : ' is-empty'}`}
                      role="textbox"
                      aria-readonly="true"
                      aria-label="Exemple de recherche"
                    >
                      {typed || 'Rechercher un professionnel, une spécialité, une ville…'}
                      <span className="pat5-caret" aria-hidden="true" />
                    </div>
                    <button type="button" className="pat5-search-btn">
                      <i className="fas fa-search" aria-hidden="true" />
                      Rechercher
                    </button>
                  </div>

                  {/* Chips de filtre */}
                  <div className="pat5-filters">
                    <ChipRow
                      legend="Spécialité"
                      options={ESPECIALIDADES.map((e) => ({ id: e.id, label: e.label, icon: e.icon }))}
                      value={espId}
                      onChange={setEspId}
                      withIcon
                    />
                    <ChipRow
                      legend="Ville"
                      options={CIDADES}
                      value={cidadeId}
                      onChange={setCidadeId}
                    />
                    <ChipRow
                      legend="Langue"
                      options={LINGUAS}
                      value={linguaId}
                      onChange={setLinguaId}
                    />
                  </div>

                  {/* En-tête résultats */}
                  <div className="pat5-results-head">
                    <span className="pat5-results-count">
                      <b>{resultados.length}</b>{' '}
                      {resultados.length === 1 ? 'résultat' : 'résultats'}{' '}
                      &middot; exemple
                    </span>
                    <span className="pat5-soon">prise de rendez-vous bientôt</span>
                  </div>

                  {/* Grille de résultats — re-render animé via key */}
                  <div className="pat5-results" key={resultsKey} aria-live="polite">
                    {resultados.length === 0 ? (
                      <p className="pat5-results-empty">
                        {'Aucun exemple pour cette combinaison, essayez une autre ville ou langue.'}
                      </p>
                    ) : (
                      resultados.map((pro, i) => (
                        <ResultCard key={pro.id} pro={pro} index={i} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Comment ça marche ── */}
        <section className="pat5-section pat5-section--alt" aria-labelledby="pat5-how-title">
          <div className="pat5-shell">
            <div className="pat5-section-head">
              <span className="pat5-kicker pat5-mono">Comment ça marche</span>
              <h2 id="pat5-how-title" className="pat5-h2">
                De la recherche au contact, en trois étapes simples.
              </h2>
              <p className="pat5-section-sub">
                {"Tout ce qu’il vous faut pour trouver le bon professionnel, clair, rapide et sans frais."}
              </p>
            </div>

            <div className="pat5-howgrid">
              <article className="pat5-step">
                <span className="pat5-step-num">01</span>
                <div className="pat5-step-icon">
                  <i className="fas fa-search" aria-hidden="true" />
                </div>
                <h3 className="pat5-step-title">Recherchez librement</h3>
                <p className="pat5-step-desc">
                  {'Filtrez par spécialité, ville et langue. Les résultats se mettent à jour au fil de vos choix.'}
                </p>
              </article>
              <article className="pat5-step">
                <span className="pat5-step-num">02</span>
                <div className="pat5-step-icon">
                  <i className="fas fa-user-md" aria-hidden="true" />
                </div>
                <h3 className="pat5-step-title">Consultez le profil</h3>
                <p className="pat5-step-desc">
                  {'Découvrez la spécialité, les zones d’exercice et les langues parlées par chaque professionnel vérifié.'}
                </p>
              </article>
              <article className="pat5-step">
                <span className="pat5-step-num">03</span>
                <div className="pat5-step-icon">
                  <i className="fas fa-calendar-check" aria-hidden="true" />
                </div>
                <h3 className="pat5-step-title">Prise de rendez-vous bientôt</h3>
                <p className="pat5-step-desc">
                  {"Pour l’instant, contactez directement. La prise de rendez-vous en ligne arrive bientôt, nous vous préviendrons dès qu’elle sera disponible."}
                </p>
              </article>
            </div>

            {/* Mock app-like preview */}
            <div className="pat5-preview" aria-hidden="true">
              <div className="pat5-preview-side">
                <div className="pat5-preview-pill pat5-preview-pill--on">
                  <i className="fas fa-user-md" /> Spécialité
                </div>
                <div className="pat5-preview-pill">
                  <i className="fas fa-map-marker-alt" /> Ville
                </div>
                <div className="pat5-preview-pill">
                  <i className="fas fa-language" /> Langue
                </div>
              </div>
              <div className="pat5-preview-main">
                <div className="pat5-preview-card">
                  <span className="pat5-preview-chip">exemple</span>
                  <div className="pat5-preview-row" style={{ width: '70%', marginTop: 10 }} />
                  <div className="pat5-preview-row pat5-preview-row--sm" />
                  <div className="pat5-preview-row pat5-preview-row--accent" />
                </div>
                <div className="pat5-preview-card">
                  <span className="pat5-preview-chip">exemple</span>
                  <div className="pat5-preview-row" style={{ width: '62%', marginTop: 10 }} />
                  <div className="pat5-preview-row pat5-preview-row--sm" />
                  <div className="pat5-preview-row pat5-preview-row--accent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Spécialités recherchables ── */}
        <EspecialidadesSection />

        {/* ── Confiance ── */}
        <section className="pat5-section pat5-section--alt" aria-labelledby="pat5-trust-title">
          <div className="pat5-shell">
            <div className="pat5-section-head">
              <span className="pat5-kicker pat5-mono">Confiance</span>
              <h2 id="pat5-trust-title" className="pat5-h2">
                Un annuaire de professionnels soigneusement constitué.
              </h2>
              <p className="pat5-section-sub">
                {'Des principes simples qui guident la façon dont nous présentons chaque professionnel.'}
              </p>
            </div>

            <div className="pat5-trust">
              <article className="pat5-trust-card">
                <svg className="pat5-trust-svg" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2l8 3v6c0 4.5-3 8.5-8 11-5-2.5-8-6.5-8-11V5l8-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M8.5 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="pat5-trust-title">Professionnels vérifiés</h3>
                <p className="pat5-trust-desc">
                  {'Chaque profil est examiné par notre équipe avant d’apparaître dans les résultats.'}
                </p>
              </article>
              <article className="pat5-trust-card">
                <i className="fas fa-globe-europe pat5-trust-icon" aria-hidden="true" />
                <h3 className="pat5-trust-title">Trilingue</h3>
                <p className="pat5-trust-desc">
                  {'Recherchez et lisez en portugais, français ou anglais, sans barrière de langue.'}
                </p>
              </article>
              <article className="pat5-trust-card">
                <i className="fas fa-search pat5-trust-icon" aria-hidden="true" />
                <h3 className="pat5-trust-title">Toujours gratuit</h3>
                <p className="pat5-trust-desc">
                  {'Trouver un professionnel ne coûte rien. Sans inscription obligatoire.'}
                </p>
              </article>
              <article className="pat5-trust-card">
                <i className="fas fa-map-marker-alt pat5-trust-icon" aria-hidden="true" />
                <h3 className="pat5-trust-title">Dans tout le pays</h3>
                <p className="pat5-trust-desc">
                  {'De Lisbonne à Porto, de Coimbra à Faro : couverture dans les principales villes.'}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── Application bientôt ── */}
        <section className="pat5-section" aria-labelledby="pat5-app-title">
          <div className="pat5-shell">
            <div className="pat5-app">
              <div>
                <span className="pat5-app-badge">
                  <i className="fas fa-bell" aria-hidden="true" />
                  Bientôt disponible
                </span>
                <h2 id="pat5-app-title" className="pat5-app-title">
                  L’application DocAgora arrive.
                </h2>
                <p className="pat5-app-desc">
                  {'Toute la recherche que vous connaissez, dans votre poche. La prise de rendez-vous en ligne arrivera progressivement, sans promesses, seulement des nouveautés quand elles seront prêtes.'}
                </p>
                <ul className="pat5-app-list">
                  <li className="pat5-app-li">
                    <i className="fas fa-check-circle" aria-hidden="true" />
                    Recherche gratuite de professionnels vérifiés
                  </li>
                  <li className="pat5-app-li">
                    <i className="fas fa-language" aria-hidden="true" />
                    Interface en PT, FR et EN
                  </li>
                  <li className="pat5-app-li">
                    <i className="fas fa-bell" aria-hidden="true" />
                    Notification à l’ouverture de la prise de rendez-vous en ligne
                  </li>
                </ul>
                <span className="pat5-app-soon">
                  <i className="fas fa-clock" aria-hidden="true" />
                  {"Pas d’application mobile pour l’instant, version web uniquement."}
                </span>
              </div>

              {/* Phone mock — pas de faux boutons store */}
              <div className="pat5-phone" aria-hidden="true">
                <div className="pat5-phone-screen">
                  <div className="pat5-phone-bar">
                    <i className="fas fa-search" />
                    Rechercher…
                  </div>
                  <div className="pat5-phone-mini">
                    <span className="pat5-phone-mini-avatar" />
                    <span className="pat5-phone-mini-lines">
                      <span className="pat5-phone-mini-row" />
                      <span className="pat5-phone-mini-row pat5-phone-mini-row--sm" />
                    </span>
                  </div>
                  <div className="pat5-phone-mini">
                    <span className="pat5-phone-mini-avatar" />
                    <span className="pat5-phone-mini-lines">
                      <span className="pat5-phone-mini-row" />
                      <span className="pat5-phone-mini-row pat5-phone-mini-row--sm" />
                    </span>
                  </div>
                  <div className="pat5-phone-mini">
                    <span className="pat5-phone-mini-avatar" />
                    <span className="pat5-phone-mini-lines">
                      <span className="pat5-phone-mini-row" />
                      <span className="pat5-phone-mini-row pat5-phone-mini-row--sm" />
                    </span>
                  </div>
                  <span className="pat5-phone-tag">exemple illustratif</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="pat5-section pat5-section--alt" aria-labelledby="pat5-cta-title">
          <div className="pat5-shell">
            <div className="pat5-cta">
              <span className="pat5-kicker pat5-mono">Commencez maintenant</span>
              <h2 id="pat5-cta-title" className="pat5-cta-h2">
                Prêt à trouver votre professionnel ?
              </h2>
              <p className="pat5-cta-sub">
                {'Essayez la recherche, gratuite, en trois langues, sans inscription. La prise de rendez-vous en ligne arrive bientôt.'}
              </p>
              <div className="pat5-cta-actions">
                <a className="pat5-btn pat5-btn--primary" href="#pat5-hero-title">
                  Rechercher des professionnels
                  <i className="fas fa-arrow-right" aria-hidden="true" />
                </a>
                <a className="pat5-btn pat5-btn--ghost" href="#">
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="pat5-footer">
        <div className="pat5-shell">
          <div className="pat5-footer-inner">
            <LogoMark />
            <p className="pat5-footer-meta pat5-mono">
              Variante &middot; Recherche Vive &middot; données illustratives
            </p>
            <nav className="pat5-footer-links" aria-label="Liens du pied de page">
              <a className="pat5-footer-link" href="#">Confidentialité</a>
              <a className="pat5-footer-link" href="#">Conditions</a>
              <Link className="pat5-footer-link" href="/variants">Variantes</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Section Spécialités — chips filtrables (filtre client local)
   ────────────────────────────────────────────────────────────── */

function EspecialidadesSection() {
  const [query, setQuery] = useState<string>('');

  const lista = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = ESPECIALIDADES.filter((e) => e.id !== 'all');
    if (!q) return base;
    return base.filter((e) => e.label.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="pat5-section" aria-labelledby="pat5-esp-title">
      <div className="pat5-shell">
        <div className="pat5-section-head">
          <span className="pat5-kicker pat5-mono">Spécialités</span>
          <h2 id="pat5-esp-title" className="pat5-h2">
            Seize spécialités, à portée d’une recherche.
          </h2>
          <p className="pat5-section-sub">
            {'Saisissez pour filtrer les spécialités disponibles sur la plateforme.'}
          </p>
        </div>

        <div className="pat5-espsearch">
          <i className="fas fa-search" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrer les spécialités…"
            aria-label="Filtrer les spécialités"
          />
        </div>

        <div className="pat5-espgrid">
          {lista.length === 0 ? (
            <p className="pat5-esp-empty">
              {'Aucune spécialité ne correspond, essayez un autre terme.'}
            </p>
          ) : (
            lista.map((e) => (
              <span className="pat5-esp" key={e.id}>
                <i className={`fas ${e.icon}`} aria-hidden="true" />
                {e.label}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
