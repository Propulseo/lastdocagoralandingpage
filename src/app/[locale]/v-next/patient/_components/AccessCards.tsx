"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/AnimatedSection";

/** Access & availability — asymmetric bento (1 primary booking card +
 *  a stacked pair) so it never reads as "3 identical cards". Reuses
 *  the `accessBlock.*` i18n keys. */
export default function AccessCards() {
  const t = useTranslations("accessBlock");

  function scrollToHero() {
    const hero = document.getElementById("vnp-hero");
    if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const bookingRows = [
    { label: t("bookingRow1"), value: t("bookingRow1Value"), on: true },
    { label: t("bookingRow2"), value: t("bookingRow2Value"), on: false },
  ];
  const availRows = [
    { label: t("availableRow1"), value: t("availableRow1Value") },
    { label: t("availableRow2"), value: t("availableRow2Value") },
    { label: t("availableRow3"), value: t("availableRow3Value") },
  ];

  return (
    <section className="vnp-section vnac" aria-label={t("ariaLabel")}>
      <style>{`
        .vnac__grid { display: grid; grid-template-columns: 1.25fr 1fr; gap: 20px; align-items: stretch; }
        .vnac__col { display: grid; gap: 20px; }
        .vnac__card { border-radius: var(--vnp-radius); padding: clamp(24px, 2.6vw, 34px); position: relative; overflow: hidden; }
        .vnac__title { font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: clamp(20px, 2vw, 26px); line-height: 1.12; margin: 0; }
        .vnac__desc { font-size: 14.5px; line-height: 1.6; margin: 12px 0 0; }

        /* Primary: booking (navy → cobalt) */
        .vnac__booking {
          background: linear-gradient(150deg, var(--color-navy), var(--color-cobalt));
          color: #fff; display: flex; flex-direction: column;
        }
        .vnac__booking::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(60% 60% at 100% 0%, rgba(var(--color-teal-rgb), 0.3), transparent 60%); }
        .vnac__booking .vnac__title { color: #fff; }
        .vnac__booking .vnac__desc { color: rgba(255,255,255,0.78); }
        .vnac__rows { position: relative; z-index: 1; margin: 22px 0 0; display: flex; flex-direction: column; gap: 10px; }
        .vnac__row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px 16px; border-radius: 12px; background: rgba(255,255,255,0.1); }
        .vnac__row-l { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.9); }
        .vnac__pill { font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 999px; }
        .vnac__pill.on { background: rgba(var(--color-teal-rgb), 0.95); color: var(--color-dark-1); }
        .vnac__pill.soon { background: rgba(255,255,255,0.18); color: #fff; }
        .vnac__booking-cta {
          position: relative; z-index: 1; margin-top: auto; align-self: flex-start;
          display: inline-flex; align-items: center; gap: 10px;
          margin-top: 24px; padding: 14px 26px; border: 0; border-radius: var(--radius-pill);
          background: #fff; color: var(--color-navy); font-family: inherit; font-size: 15px; font-weight: 700; cursor: pointer;
          transition: transform 0.2s var(--vnp-ease), gap 0.2s var(--vnp-ease), box-shadow 0.25s var(--vnp-ease);
        }
        .vnac__booking-cta:hover { transform: translateY(-2px); gap: 14px; box-shadow: 0 16px 34px -12px rgba(0,0,0,0.4); }

        /* Emergency: neutral, de-emphasized, red 112 */
        .vnac__emergency { background: var(--color-light-3); border: 1px solid var(--vnp-line); }
        .vnac__ebadge { display: inline-flex; align-items: center; gap: 7px; font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #b23b2e; background: rgba(192,57,43,0.1); padding: 5px 12px; border-radius: 999px; margin-bottom: 14px; }
        .vnac__emergency .vnac__title { font-size: clamp(16px, 1.5vw, 18px); color: var(--vnp-muted); }
        .vnac__emergency .vnac__desc { color: var(--vnp-muted); }
        .vnac__enum { font-family: var(--font-fraunces), Georgia, serif; font-weight: 700; font-size: clamp(34px, 4vw, 48px); color: #b23b2e; line-height: 1; margin: 14px 0 0; }

        /* Available: supporting dark */
        .vnac__available { background: var(--color-dark-1); color: #fff; }
        .vnac__available .vnac__title { color: #fff; }
        .vnac__available .vnac__desc { color: rgba(255,255,255,0.6); }
        .vnac__avrows { margin: 18px 0 0; display: flex; flex-direction: column; }
        .vnac__avrow { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 11px 0; font-size: 13.5px; }
        .vnac__avrow + .vnac__avrow { border-top: 1px solid rgba(255,255,255,0.1); }
        .vnac__avrow-l { color: rgba(255,255,255,0.7); }
        .vnac__avrow-v { font-weight: 700; color: var(--color-teal); }

        @media (max-width: 880px) {
          .vnac__grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="vnp-shell">
        <AnimatedSection>
          <div className="vnac__grid">
            {/* Primary booking */}
            <div className="vnac__card vnac__booking">
              <h3 className="vnac__title">{t("bookingTitle")}</h3>
              <p className="vnac__desc">{t("bookingDesc")}</p>
              <div className="vnac__rows">
                {bookingRows.map((r) => (
                  <div className="vnac__row" key={r.label}>
                    <span className="vnac__row-l">{r.label}</span>
                    <span className={`vnac__pill ${r.on ? "on" : "soon"}`}>{r.value}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="vnac__booking-cta" onClick={scrollToHero}>
                {t("bookingCta")}
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </button>
            </div>

            {/* Stacked pair */}
            <div className="vnac__col">
              <div className="vnac__card vnac__emergency">
                <span className="vnac__ebadge"><i className="fas fa-triangle-exclamation" aria-hidden="true" />{t("emergencyBadge")}</span>
                <h3 className="vnac__title">{t("emergencyTitle")}</h3>
                <p className="vnac__enum">{t("emergencyNumber")}</p>
                <p className="vnac__desc">{t("emergencyDesc")}</p>
              </div>
              <div className="vnac__card vnac__available">
                <h3 className="vnac__title">{t("availableTitle")}</h3>
                <p className="vnac__desc">{t("availableDesc")}</p>
                <div className="vnac__avrows">
                  {availRows.map((r) => (
                    <div className="vnac__avrow" key={r.label}>
                      <span className="vnac__avrow-l">{r.label}</span>
                      <span className="vnac__avrow-v">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
