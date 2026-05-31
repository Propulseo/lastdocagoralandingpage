"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SPECIALTIES, searchLoginUrl } from "@/lib/specialties";

/* ──────────────────────────────────────────────────────────────────────────
   SpecialtiesCarousel3, « Focus / peek » (coverflow léger).
   La carte centrale est mise en avant (plus grande, accent teal, élévation) ;
   les voisines sont entr’aperçues, réduites et atténuées. Navigation flèches
   + clic sur une carte latérale pour la centrer. Aucune dépendance jQuery/Slick.
   Données réutilisées : SPECIALTIES + SPECIALTY_ICON (via SPECIALTIES.icon) +
   searchLoginUrl + i18n namespace « specialties ».
   ────────────────────────────────────────────────────────────────────────── */

const TOTAL = SPECIALTIES.length;

export default function SpecialtiesCarousel3() {
  const t = useTranslations("specialties");
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex(((next % TOTAL) + TOTAL) % TOTAL);
  }, []);

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  /* Pilotage clavier global sur la zone du carrousel. */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(TOTAL - 1);
      }
    },
    [goPrev, goNext, goTo],
  );

  /* Recentre la carte active après navigation clavier ou clic latéral
     (utile sur mobile où le défilement tactile prend le relais). */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(`[data-slide="${index}"]`);
    if (!card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  const active = SPECIALTIES[index];
  const activeTitle = t(`items.${active.key}.title`);
  const activeCta = t(`items.${active.key}.cta`);

  return (
    <section className="vsc3-section" aria-labelledby="vsc3-title">
      <style>{`
        .vsc3-section, .vsc3-section * { box-sizing: border-box; }
        .vsc3-section {
          position: relative;
          overflow: hidden;
          padding-block: clamp(64px, 8vw, 108px);
          background:
            radial-gradient(72% 60% at 50% -10%, rgba(var(--color-teal-rgb), 0.14), transparent 70%),
            radial-gradient(60% 56% at 8% 110%, rgba(var(--color-cobalt-rgb), 0.09), transparent 72%),
            linear-gradient(180deg, var(--color-light-1) 0%, var(--color-light-2) 100%);
          color: var(--color-dark-1);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .vsc3-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.5;
          background-image: radial-gradient(rgba(var(--color-navy-rgb), 0.045) 1px, transparent 1px);
          background-size: 4px 4px;
          z-index: 0;
        }
        .vsc3-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1180px;
          margin-inline: auto;
          padding-inline: clamp(16px, 4vw, 40px);
        }

        /* ── En-tête ── */
        .vsc3-head { max-width: 60ch; margin-inline: auto; text-align: center; margin-bottom: clamp(30px, 4vw, 48px); }
        .vsc3-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-mint);
        }
        .vsc3-kicker-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.18);
        }
        .vsc3-h2 {
          margin: 14px 0 0;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(1.8rem, 4vw, 2.85rem);
          line-height: 1.06;
          letter-spacing: -0.02em;
          color: var(--color-navy);
        }

        /* ── Scène coverflow ── */
        .vsc3-stage {
          position: relative;
          perspective: 1400px;
        }
        .vsc3-stage::before,
        .vsc3-stage::after {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          width: clamp(40px, 12vw, 140px);
          z-index: 3;
          pointer-events: none;
        }
        .vsc3-stage::before {
          left: 0;
          background: linear-gradient(90deg, var(--color-light-1), transparent);
        }
        .vsc3-stage::after {
          right: 0;
          background: linear-gradient(270deg, var(--color-light-2), transparent);
        }

        .vsc3-track {
          display: flex;
          gap: clamp(14px, 2.4vw, 26px);
          align-items: stretch;
          padding-block: clamp(24px, 4vw, 44px);
          padding-inline: 50%;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .vsc3-track::-webkit-scrollbar { display: none; }

        .vsc3-card {
          scroll-snap-align: center;
          position: relative;
          flex: 0 0 clamp(150px, 22vw, 188px);
          min-height: 188px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 26px 18px;
          border-radius: 18px;
          text-decoration: none;
          color: var(--color-navy);
          background: var(--color-light-1);
          border: 1px solid rgba(var(--color-navy-rgb), 0.10);
          box-shadow: 0 4px 14px -10px rgba(var(--color-navy-rgb), 0.3);
          opacity: 0.5;
          transform: scale(0.82);
          filter: saturate(0.85);
          transition:
            transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1),
            opacity 0.45s ease,
            box-shadow 0.45s ease,
            border-color 0.45s ease,
            filter 0.45s ease;
          will-change: transform, opacity;
        }
        .vsc3-card.is-near {
          opacity: 0.78;
          transform: scale(0.9);
        }
        .vsc3-card.is-active {
          opacity: 1;
          transform: scale(1.06);
          filter: none;
          border-color: rgba(var(--color-teal-rgb), 0.6);
          box-shadow:
            0 26px 56px -26px rgba(var(--color-navy-rgb), 0.5),
            0 0 0 4px rgba(var(--color-teal-rgb), 0.14);
          z-index: 2;
        }
        .vsc3-card:hover:not(.is-active) {
          opacity: 0.92;
          transform: scale(0.94);
        }
        .vsc3-card:focus-visible {
          outline: none;
          border-color: var(--color-teal);
          box-shadow:
            0 26px 56px -26px rgba(var(--color-navy-rgb), 0.5),
            0 0 0 4px rgba(var(--color-teal-rgb), 0.32);
        }

        .vsc3-card-icon {
          width: 64px; height: 64px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          font-size: 1.5rem;
          color: var(--color-mint);
          background: rgba(var(--color-teal-rgb), 0.12);
          transition: background 0.45s ease, color 0.45s ease, transform 0.45s ease;
        }
        .vsc3-card.is-active .vsc3-card-icon {
          color: var(--color-light-1);
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-teal));
          transform: scale(1.04);
        }
        .vsc3-card-title {
          margin: 0;
          font-size: 0.98rem;
          font-weight: 700;
          text-align: center;
          line-height: 1.25;
          color: var(--color-navy);
        }
        .vsc3-card.is-active .vsc3-card-title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 1.12rem;
        }
        /* Accroche (cta i18n) visible uniquement sur la carte centrale. */
        .vsc3-card-accroche {
          margin: 0;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          font-size: 0.78rem;
          line-height: 1.45;
          text-align: center;
          color: rgba(var(--color-navy-rgb), 0.72);
          transition: max-height 0.45s ease, opacity 0.45s ease;
        }
        .vsc3-card.is-active .vsc3-card-accroche {
          max-height: 60px;
          opacity: 1;
        }

        /* ── Barre de contrôle ── */
        .vsc3-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-top: clamp(18px, 2.4vw, 28px);
        }
        .vsc3-arrow {
          width: 48px; height: 48px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1rem;
          color: var(--color-navy);
          background: var(--color-light-1);
          border: 1px solid rgba(var(--color-navy-rgb), 0.12);
          box-shadow: 0 8px 22px -14px rgba(var(--color-navy-rgb), 0.4);
          transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }
        .vsc3-arrow:hover {
          transform: translateY(-2px);
          color: var(--color-light-1);
          border-color: var(--color-teal);
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-teal));
        }
        .vsc3-arrow:focus-visible {
          outline: none;
          border-color: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.3);
        }

        /* ── Points de position ── */
        .vsc3-dots {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 320px;
        }
        .vsc3-dot {
          width: 9px; height: 9px;
          padding: 0;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          background: rgba(var(--color-navy-rgb), 0.18);
          transition: transform 0.25s ease, background 0.25s ease, width 0.25s ease;
        }
        .vsc3-dot:hover { background: rgba(var(--color-teal-rgb), 0.5); }
        .vsc3-dot.is-on {
          width: 22px;
          border-radius: 999px;
          background: var(--color-teal);
        }
        .vsc3-dot:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(var(--color-teal-rgb), 0.34);
        }

        .vsc3-status {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }

        /* ── CTA final ── */
        .vsc3-foot {
          margin-top: clamp(28px, 3vw, 42px);
          text-align: center;
        }
        .vsc3-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 24px;
          min-height: 48px;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          color: var(--color-light-1);
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-teal));
          box-shadow: 0 16px 34px -18px rgba(var(--color-cobalt-rgb), 0.7);
          transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
        }
        .vsc3-cta:hover { transform: translateY(-2px); opacity: 0.96; }
        .vsc3-cta:focus-visible {
          outline: none;
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.34);
        }
        .vsc3-cta i { font-size: 0.82rem; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .vsc3-card { flex-basis: clamp(140px, 52vw, 200px); min-height: 176px; }
          .vsc3-stage::before, .vsc3-stage::after { width: 28px; }
        }
        @media (max-width: 375px) {
          .vsc3-card { flex-basis: 66vw; }
          .vsc3-controls { gap: 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vsc3-track { scroll-behavior: auto; }
          .vsc3-card,
          .vsc3-card-icon,
          .vsc3-card-accroche,
          .vsc3-arrow,
          .vsc3-dot {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div className="vsc3-shell">
        <header className="vsc3-head">
          <span className="vsc3-kicker">
            <span className="vsc3-kicker-dot" aria-hidden="true" />
            {t("subtitle")}
          </span>
          <h2 id="vsc3-title" className="vsc3-h2">
            {t("title")}
          </h2>
        </header>

        <div
          className="vsc3-stage"
          role="group"
          aria-roledescription="carrousel"
          aria-label={t("title")}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div className="vsc3-track" ref={trackRef}>
            {SPECIALTIES.map((spec, i) => {
              const title = t(`items.${spec.key}.title`);
              const isActive = i === index;
              const isNear = Math.abs(i - index) === 1;
              const cls = isActive ? " is-active" : isNear ? " is-near" : "";
              return (
                <a
                  key={spec.key}
                  data-slide={i}
                  href={searchLoginUrl({ q: title, specialty: spec.slug })}
                  className={`vsc3-card${cls}`}
                  aria-label={`${title}, ${t(`items.${spec.key}.cta`)}`}
                  aria-current={isActive ? "true" : undefined}
                  tabIndex={isActive ? 0 : -1}
                  onClick={(event) => {
                    if (!isActive) {
                      event.preventDefault();
                      goTo(i);
                    }
                  }}
                >
                  <span className="vsc3-card-icon" aria-hidden="true">
                    <i className={spec.icon} />
                  </span>
                  <h3 className="vsc3-card-title">{title}</h3>
                  <p className="vsc3-card-accroche">{t(`items.${spec.key}.cta`)}</p>
                </a>
              );
            })}
          </div>
        </div>

        <div className="vsc3-controls">
          <button
            type="button"
            className="vsc3-arrow"
            aria-label="Spécialité précédente"
            onClick={goPrev}
          >
            <i className="fas fa-arrow-left" aria-hidden="true" />
          </button>

          <div className="vsc3-dots" role="tablist" aria-label="Sélection de spécialité">
            {SPECIALTIES.map((spec, i) => (
              <button
                key={spec.key}
                type="button"
                role="tab"
                className={`vsc3-dot${i === index ? " is-on" : ""}`}
                aria-selected={i === index}
                aria-label={t(`items.${spec.key}.title`)}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="vsc3-arrow"
            aria-label="Spécialité suivante"
            onClick={goNext}
          >
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </button>
        </div>

        <p className="vsc3-status" aria-live="polite">
          {`${activeTitle}, ${activeCta} (${index + 1} sur ${TOTAL})`}
        </p>

        <div className="vsc3-foot">
          <a className="vsc3-cta" href={searchLoginUrl({})}>
            <i className="fas fa-grip" aria-hidden="true" />
            {t("seeAll")}
          </a>
        </div>
      </div>
    </section>
  );
}
