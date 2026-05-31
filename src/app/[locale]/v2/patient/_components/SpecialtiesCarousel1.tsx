"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SPECIALTIES, SPECIALTY_ICON, searchLoginUrl } from "@/lib/specialties";

/* ──────────────────────────────────────────────────────────────────────────
   SpecialtiesCarousel1, « Slider classique » (patient V2, copy FR).
   Piste horizontale scroll-snap, flèches gauche/droite (boutons ronds),
   puces de pagination, drag/scroll tactile naturel. Plusieurs cartes par vue.
   Données réutilisées : SPECIALTIES / SPECIALTY_ICON / searchLoginUrl + i18n
   namespace « specialties » (subtitle, title, items.*.title, seeAll).
   ────────────────────────────────────────────────────────────────────────── */

export default function SpecialtiesCarousel1() {
  const t = useTranslations("specialties");
  const trackRef = useRef<HTMLUListElement>(null);
  const reducedRef = useRef(false);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  /* Détecte prefers-reduced-motion (défilement instantané plutôt que fluide). */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedRef.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Recalcule le nombre de « pages » selon la largeur visible vs largeur totale. */
  const recompute = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const total = Math.max(
      1,
      Math.ceil(track.scrollWidth / Math.max(1, track.clientWidth)),
    );
    setPages(total);
    const current = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    setPage(Math.min(current, total - 1));
  }, []);

  useEffect(() => {
    recompute();
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const current = Math.round(
        track.scrollLeft / Math.max(1, track.clientWidth),
      );
      setPage((prev) => (prev === current ? prev : current));
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(recompute);
    ro.observe(track);

    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [recompute]);

  const goTo = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: target * track.clientWidth,
      behavior: reducedRef.current ? "auto" : "smooth",
    });
  }, []);

  const goPrev = useCallback(() => {
    goTo(Math.max(0, page - 1));
  }, [goTo, page]);

  const goNext = useCallback(() => {
    goTo(Math.min(pages - 1, page + 1));
  }, [goTo, page, pages]);

  const atStart = page <= 0;
  const atEnd = page >= pages - 1;

  return (
    <section className="vsc1-section" aria-labelledby="vsc1-title">
      <style>{`
        .vsc1-section, .vsc1-section * { box-sizing: border-box; }
        .vsc1-section {
          position: relative;
          overflow: hidden;
          padding-block: clamp(64px, 8vw, 108px);
          background:
            radial-gradient(72% 60% at 90% -10%, rgba(var(--color-teal-rgb), 0.14), transparent 70%),
            radial-gradient(60% 56% at 2% 110%, rgba(var(--color-cobalt-rgb), 0.09), transparent 72%),
            linear-gradient(180deg, var(--color-light-1) 0%, var(--color-light-2) 100%);
          color: var(--color-dark-1);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .vsc1-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1180px;
          margin-inline: auto;
          padding-inline: clamp(16px, 4vw, 40px);
        }

        /* ── En-tête + contrôles ── */
        .vsc1-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: clamp(28px, 3.4vw, 44px);
        }
        .vsc1-head-text { max-width: 56ch; }
        .vsc1-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-mint);
        }
        .vsc1-kicker-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.18);
        }
        .vsc1-title {
          margin: 14px 0 0;
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(1.8rem, 4vw, 2.85rem);
          line-height: 1.06;
          letter-spacing: -0.02em;
          color: var(--color-navy);
        }

        /* ── Boutons de navigation (ronds) ── */
        .vsc1-nav { display: inline-flex; gap: 12px; }
        .vsc1-arrow {
          width: 48px; height: 48px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid rgba(var(--color-navy-rgb), 0.16);
          background: var(--color-light-1);
          color: var(--color-navy);
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 8px 22px -16px rgba(var(--color-navy-rgb), 0.6);
          transition: transform 0.25s ease, border-color 0.25s ease,
            box-shadow 0.25s ease, color 0.25s ease, opacity 0.25s ease;
        }
        .vsc1-arrow:hover:not(:disabled) {
          transform: translateY(-2px);
          color: var(--color-teal);
          border-color: rgba(var(--color-teal-rgb), 0.55);
          box-shadow: 0 16px 30px -18px rgba(var(--color-teal-rgb), 0.85);
        }
        .vsc1-arrow:focus-visible {
          outline: none;
          border-color: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.3);
        }
        .vsc1-arrow:disabled { opacity: 0.4; cursor: default; }

        /* ── Piste défilante ── */
        .vsc1-viewport { position: relative; }
        .vsc1-track {
          list-style: none;
          margin: 0;
          padding: 6px 4px 14px;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: calc((100% - 3 * 22px) / 4);
          gap: 22px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
        }
        .vsc1-track::-webkit-scrollbar { display: none; }

        /* ── Carte spécialité (bento) ── */
        .vsc1-card {
          scroll-snap-align: start;
          position: relative;
          min-height: 168px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 22px 22px 20px;
          border-radius: 18px;
          border: 1px solid rgba(var(--color-navy-rgb), 0.10);
          background: var(--color-light-1);
          color: var(--color-navy);
          text-decoration: none;
          box-shadow: 0 1px 0 rgba(var(--color-navy-rgb), 0.04);
          transition: transform 0.3s ease, border-color 0.3s ease,
            box-shadow 0.3s ease;
        }
        .vsc1-card:hover {
          transform: translateY(-4px);
          border-color: rgba(var(--color-teal-rgb), 0.55);
          box-shadow: 0 22px 44px -26px rgba(var(--color-teal-rgb), 0.85);
        }
        .vsc1-card:focus-visible {
          outline: none;
          border-color: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.3);
        }
        .vsc1-card-icon {
          width: 52px; height: 52px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 14px;
          font-size: 1.35rem;
          color: var(--color-teal);
          background: linear-gradient(
            150deg,
            rgba(var(--color-teal-rgb), 0.16),
            rgba(var(--color-cobalt-rgb), 0.10)
          );
          transition: transform 0.3s ease;
        }
        .vsc1-card:hover .vsc1-card-icon { transform: scale(1.06); }
        .vsc1-card-label {
          margin: auto 0 0;
          font-size: 1.02rem;
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: -0.01em;
          color: var(--color-navy);
        }
        .vsc1-card-go {
          position: absolute;
          right: 18px;
          bottom: 20px;
          font-size: 0.85rem;
          color: var(--color-teal);
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .vsc1-card:hover .vsc1-card-go,
        .vsc1-card:focus-visible .vsc1-card-go {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Puces de pagination ── */
        .vsc1-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
          margin-top: clamp(22px, 2.6vw, 32px);
        }
        .vsc1-dots {
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }
        .vsc1-dot {
          width: 9px; height: 9px;
          padding: 0;
          border: none;
          border-radius: 50%;
          background: rgba(var(--color-navy-rgb), 0.2);
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, width 0.25s ease;
        }
        .vsc1-dot:hover { background: rgba(var(--color-teal-rgb), 0.6); }
        .vsc1-dot:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(var(--color-teal-rgb), 0.35);
        }
        .vsc1-dot.is-active {
          width: 24px;
          border-radius: 50px;
          background: var(--color-teal);
        }

        /* ── CTA final ── */
        .vsc1-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 44px;
          padding: 0 22px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          color: var(--color-dark-1);
          background: linear-gradient(135deg, var(--color-teal), var(--color-mint));
          box-shadow: 0 14px 30px -16px rgba(var(--color-teal-rgb), 0.9);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .vsc1-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 38px -16px rgba(var(--color-teal-rgb), 0.95);
        }
        .vsc1-cta:focus-visible {
          outline: none;
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.4);
        }

        .vsc1-sr {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .vsc1-track { grid-auto-columns: calc((100% - 22px) / 2); }
        }
        @media (max-width: 600px) {
          .vsc1-track { grid-auto-columns: 82%; }
          .vsc1-head { align-items: flex-start; }
        }

        /* ── Respect du mouvement réduit ── */
        @media (prefers-reduced-motion: reduce) {
          .vsc1-track { scroll-behavior: auto; }
          .vsc1-section *,
          .vsc1-section *::before,
          .vsc1-section *::after {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div className="vsc1-shell">
        <div className="vsc1-head">
          <div className="vsc1-head-text">
            <span className="vsc1-kicker">
              <span className="vsc1-kicker-dot" aria-hidden="true" />
              {t("subtitle")}
            </span>
            <h2 className="vsc1-title" id="vsc1-title">
              {t("title")}
            </h2>
          </div>

          <div className="vsc1-nav">
            <button
              type="button"
              className="vsc1-arrow"
              onClick={goPrev}
              disabled={atStart}
              aria-label="Spécialités précédentes"
              aria-controls="vsc1-track"
            >
              <i className="icon-arrow-left" aria-hidden="true" />
              <span className="vsc1-sr">Précédent</span>
            </button>
            <button
              type="button"
              className="vsc1-arrow"
              onClick={goNext}
              disabled={atEnd}
              aria-label="Spécialités suivantes"
              aria-controls="vsc1-track"
            >
              <i className="icon-arrow-right" aria-hidden="true" />
              <span className="vsc1-sr">Suivant</span>
            </button>
          </div>
        </div>

        <div
          className="vsc1-viewport"
          aria-roledescription="carousel"
          aria-label={t("title")}
        >
          <ul className="vsc1-track" id="vsc1-track" ref={trackRef}>
            {SPECIALTIES.map(({ key, slug }) => {
              const label = t(`items.${key}.title`);
              return (
                <li key={key}>
                  <a
                    className="vsc1-card"
                    href={searchLoginUrl({ q: label, specialty: slug })}
                  >
                    <span className="vsc1-card-icon" aria-hidden="true">
                      <i className={SPECIALTY_ICON[key]} />
                    </span>
                    <span className="vsc1-card-label">{label}</span>
                    <i
                      className="icon-arrow-right vsc1-card-go"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="vsc1-foot">
          <div
            className="vsc1-dots"
            role="tablist"
            aria-label="Pagination du carrousel"
          >
            {Array.from({ length: pages }).map((_, i) => (
              <button
                type="button"
                key={`vsc1-page-${i}`}
                className={`vsc1-dot${i === page ? " is-active" : ""}`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === page}
                aria-label={`Aller à la vue ${i + 1} sur ${pages}`}
              />
            ))}
          </div>

          <a className="vsc1-cta" href={searchLoginUrl({})}>
            {t("seeAll")}
            <i className="icon-arrow-right" aria-hidden="true" />
          </a>
        </div>

        <p className="vsc1-sr" aria-live="polite">
          {`Vue ${page + 1} sur ${pages}`}
        </p>
      </div>
    </section>
  );
}
