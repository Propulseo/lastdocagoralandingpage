"use client";

import { useTranslations } from "next-intl";

/** Closing color-block: the single intentional dark band on the page
 *  (navy gradient, brand-consistent). Reuses `final.*` i18n.
 *  Button scrolls back to the hero search console. */
export default function FinalCta() {
  const t = useTranslations("final");

  function scrollToHero() {
    const hero = document.getElementById("vnp-hero");
    if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="vnp-section vnp-section--ink vnfc" aria-labelledby="vnfc-title">
      <style>{`
        .vnfc { overflow: hidden; }
        .vnfc__inner { position: relative; text-align: center; max-width: 760px; margin-inline: auto; }
        .vnfc::before {
          content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(60% 60% at 50% -10%, rgba(var(--color-teal-rgb), 0.22), transparent 60%),
            radial-gradient(40% 50% at 100% 120%, rgba(var(--color-cobalt-rgb), 0.22), transparent 60%);
        }
        .vnfc__eyebrow {
          position: relative; z-index: 1;
          display: inline-block; font-size: 12px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--color-teal); margin-bottom: 18px;
        }
        .vnfc__title {
          position: relative; z-index: 1;
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; font-size: clamp(30px, 4.2vw, 50px);
          line-height: 1.08; letter-spacing: -0.02em; color: #fff; margin: 0;
          text-wrap: balance;
        }
        .vnfc__sub {
          position: relative; z-index: 1;
          font-size: clamp(16px, 1.4vw, 18px); line-height: 1.6;
          color: rgba(255,255,255,0.78); margin: 18px auto 32px; max-width: 48ch;
        }
        .vnfc__cta {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 34px; border: 0; border-radius: var(--radius-pill);
          background: linear-gradient(135deg, var(--color-teal), var(--color-mint));
          color: var(--color-dark-1); font-family: inherit; font-size: 16px; font-weight: 700;
          cursor: pointer;
          box-shadow: 0 18px 40px -14px rgba(var(--color-teal-rgb), 0.6);
          transition: transform 0.2s var(--vnp-ease), box-shadow 0.25s var(--vnp-ease), gap 0.2s var(--vnp-ease);
        }
        .vnfc__cta:hover { transform: translateY(-2px); gap: 14px; box-shadow: 0 24px 50px -14px rgba(var(--color-teal-rgb), 0.7); }
        .vnfc__cta:active { transform: translateY(0); }
      `}</style>
      <div className="vnp-shell">
        <div className="vnfc__inner">
          <span className="vnfc__eyebrow">{t("eyebrow")}</span>
          <h2 className="vnfc__title" id="vnfc-title">{t("title")}</h2>
          <p className="vnfc__sub">{t("sub")}</p>
          <button type="button" className="vnfc__cta" onClick={scrollToHero} aria-label={t("ctaLabel")}>
            {t("cta")}
            <i className="fas fa-arrow-up" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
