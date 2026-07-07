"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SPECIALTIES, SPECIALTY_ICON, searchLoginUrl } from "@/lib/specialties";

/** Inline SVG pause icon (two vertical bars). */
function PauseIcon() {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="5" height="16" rx="1.5" />
      <rect x="9" y="0" width="5" height="16" rx="1.5" />
    </svg>
  );
}

/** Inline SVG play icon (right-pointing triangle). */
function PlayIcon() {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="0,0 14,8 0,16" />
    </svg>
  );
}

/** Marquee auto-defilement : 2 rangees (8 + 8) en sens opposes, boucle infinie.
 *  Pause au survol/focus et via bouton play/pause accessible.
 *  Fige en grille si reduced-motion. */
export default function SpecialtiesCarousel2() {
  const t = useTranslations("specialties");
  const [paused, setPaused] = useState(false);

  const firstRow = SPECIALTIES.slice(0, 8);
  const secondRow = SPECIALTIES.slice(8, 16);

  const renderCard = (key: string, slug: string) => {
    const title = t(`items.${key}.title`);
    return (
      <a
        key={key}
        href={searchLoginUrl({ q: title, specialty: slug })}
        className="vsc2-card"
      >
        <span className="vsc2-card-icon" aria-hidden="true">
          <i className={SPECIALTY_ICON[key]}></i>
        </span>
        <span className="vsc2-card-label">{title}</span>
      </a>
    );
  };

  /** Copie visuelle pour la boucle infinie : retiree du flux focus/lecteur d ecran
   *  et masquee en reduced-motion (grille statique sans doublons). */
  const renderDuplicate = (key: string, slug: string) => {
    const title = t(`items.${key}.title`);
    return (
      <a
        key={`dup-${key}`}
        href={searchLoginUrl({ q: title, specialty: slug })}
        className="vsc2-card vsc2-dup"
        tabIndex={-1}
        aria-hidden="true"
      >
        <span className="vsc2-card-icon" aria-hidden="true">
          <i className={SPECIALTY_ICON[key]}></i>
        </span>
        <span className="vsc2-card-label">{title}</span>
      </a>
    );
  };

  return (
    <section className="vsc2-section" aria-labelledby="vsc2-title">
      <style>{`
        .vsc2-section, .vsc2-section * { box-sizing: border-box; }

        .vsc2-section {
          position: relative;
          padding: var(--spacing-section) 0;
          background: var(--color-light-1);
          font-family: var(--font-montserrat), system-ui, sans-serif;
          overflow: hidden;
        }

        .vsc2-inner {
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 48px);
        }

        .vsc2-header {
          max-width: 720px;
          margin: 0 auto var(--spacing-2xl);
          text-align: center;
        }

        .vsc2-eyebrow {
          display: inline-flex;
          align-items: center;
          margin-bottom: var(--spacing-sm);
          color: var(--color-accent-ink);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .vsc2-title {
          margin: 0;
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(30px, 5vw, 46px);
          line-height: 1.1;
          font-weight: 600;
          color: var(--color-navy);
        }

        /* Bouton play/pause — visible et accessible sur tous les devices */
        .vsc2-controls {
          display: flex;
          justify-content: center;
          margin-bottom: var(--spacing-md);
        }

        .vsc2-pause-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: 8px var(--spacing-sm);
          border: 1.5px solid rgba(var(--color-teal-rgb), 0.5);
          border-radius: var(--radius-pill);
          background: rgba(var(--color-teal-rgb), 0.07);
          color: var(--color-accent-ink);
          font-family: var(--font-montserrat), system-ui, sans-serif;
          font-size: var(--fs-sm);
          font-weight: 600;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease,
            transform 0.2s ease;
          /* Assure une zone tactile suffisante (44x44 minimum) */
          min-height: 44px;
          min-width: 44px;
        }

        .vsc2-pause-btn:hover {
          background: rgba(var(--color-teal-rgb), 0.15);
          border-color: var(--color-teal);
          transform: translateY(-1px);
        }

        .vsc2-pause-btn:focus-visible {
          outline: 3px solid var(--color-teal);
          outline-offset: 3px;
        }

        /* Piste defilante */
        .vsc2-marquee {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 9%,
            #000 91%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 9%,
            #000 91%,
            transparent 100%
          );
        }

        .vsc2-row {
          display: flex;
          width: max-content;
          gap: var(--spacing-md);
          will-change: transform;
        }

        .vsc2-row--left {
          animation: vsc2-scroll-left 44s linear infinite;
        }

        .vsc2-row--right {
          animation: vsc2-scroll-right 44s linear infinite;
        }

        /* Pause via etat React (touch-friendly) */
        .vsc2-row--paused {
          animation-play-state: paused !important;
        }

        /* Pause au survol de la piste et au focus clavier d une carte */
        .vsc2-marquee:hover .vsc2-row,
        .vsc2-marquee:focus-within .vsc2-row {
          animation-play-state: paused;
        }

        @keyframes vsc2-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes vsc2-scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        /* Carte */
        .vsc2-card {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 0 0 auto;
          min-width: 244px;
          min-height: 72px;
          padding: var(--spacing-sm) 22px;
          border-radius: var(--radius-lg);
          background: #ffffff;
          border: 1px solid rgba(var(--color-navy-rgb), 0.06);
          box-shadow: var(--shadow-sm);
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .vsc2-card:hover,
        .vsc2-card:focus-visible {
          transform: translateY(-4px);
          border-color: rgba(var(--color-teal-rgb), 0.4);
          box-shadow: var(--shadow-md);
        }

        .vsc2-card:focus-visible {
          outline: 3px solid var(--color-teal);
          outline-offset: 3px;
        }

        .vsc2-card-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: rgba(var(--color-teal-rgb), 0.12);
          color: var(--color-accent-ink);
          font-size: 21px;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .vsc2-card:hover .vsc2-card-icon,
        .vsc2-card:focus-visible .vsc2-card-icon {
          background: var(--color-teal);
          color: #ffffff;
        }

        .vsc2-card-label {
          font-size: var(--fs-base);
          font-weight: 600;
          line-height: 1.25;
          color: var(--color-dark-1);
        }

        /* CTA final */
        .vsc2-cta-wrap {
          display: flex;
          justify-content: center;
          margin-top: var(--spacing-2xl);
        }

        .vsc2-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 52px;
          padding: 15px 28px;
          border-radius: var(--radius-pill);
          background: linear-gradient(135deg, var(--color-accent-ink), #2E8C86);
          color: #ffffff;
          font-size: var(--fs-base);
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 14px 30px -14px rgba(var(--color-teal-rgb), 0.7);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .vsc2-cta:hover,
        .vsc2-cta:focus-visible {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px -14px rgba(var(--color-teal-rgb), 0.85);
        }

        .vsc2-cta:focus-visible {
          outline: 3px solid var(--color-navy);
          outline-offset: 3px;
        }

        .vsc2-cta i {
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .vsc2-section { padding: 72px 0; }
          .vsc2-header { margin-bottom: var(--spacing-xl); }
          .vsc2-card { min-width: 212px; }
        }

        @media (max-width: 375px) {
          .vsc2-inner { padding: 0 var(--spacing-sm); }
          .vsc2-card { min-width: 196px; }
        }

        /* Reduced motion : on fige le defilement et on affiche une grille statique */
        @media (prefers-reduced-motion: reduce) {
          .vsc2-marquee {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: var(--spacing-sm);
            -webkit-mask-image: none;
            mask-image: none;
          }
          .vsc2-row {
            display: contents;
          }
          .vsc2-row--left,
          .vsc2-row--right {
            animation: none;
          }
          /* On masque les duplicatas pour ne pas afficher 32 cartes en grille */
          .vsc2-dup {
            display: none;
          }
          .vsc2-card {
            transition: none;
          }
          .vsc2-card:hover,
          .vsc2-card:focus-visible {
            transform: none;
          }
          /* Le bouton pause est inutile en mode no-motion : on le masque */
          .vsc2-controls {
            display: none;
          }
        }
      `}</style>

      <div className="vsc2-inner">
        <header className="vsc2-header">
          <span className="vsc2-eyebrow">{t("subtitle")}</span>
          <h2 className="vsc2-title" id="vsc2-title">
            {t("title")}
          </h2>
        </header>

        {/* Accessible play/pause toggle — works on touch (click event) */}
        <div className="vsc2-controls">
          <button
            type="button"
            className="vsc2-pause-btn"
            aria-pressed={paused}
            aria-label={paused ? t("playLabel") : t("pauseLabel")}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
            <span>{paused ? t("playLabel") : t("pauseLabel")}</span>
          </button>
        </div>
      </div>

      <div
        className="vsc2-marquee"
        aria-roledescription="carousel"
        aria-label={t("title")}
      >
        <div
          className={`vsc2-row vsc2-row--left${paused ? " vsc2-row--paused" : ""}`}
        >
          {firstRow.map(({ key, slug }) => renderCard(key, slug))}
          {firstRow.map(({ key, slug }) => renderDuplicate(key, slug))}
        </div>

        <div
          className={`vsc2-row vsc2-row--right${paused ? " vsc2-row--paused" : ""}`}
        >
          {secondRow.map(({ key, slug }) => renderCard(key, slug))}
          {secondRow.map(({ key, slug }) => renderDuplicate(key, slug))}
        </div>
      </div>

      <div className="vsc2-inner">
        <div className="vsc2-cta-wrap">
          <a href={searchLoginUrl({})} className="vsc2-cta">
            <i className="fas fa-search" aria-hidden="true"></i>
            <span>{t("seeAll")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
