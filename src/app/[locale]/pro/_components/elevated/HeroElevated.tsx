"use client";

import { useTranslations } from "next-intl";
import HeroBoard from "./HeroBoard";
import { heroElevatedCss } from "./heroElevated.styles";
import { MetricItem, useInView, type HeroMetric } from "./heroMetrics";

/* ============================================================
   HeroElevated — version élevée du hero Pro (dark cobalt).
   Structure conservée depuis Hero3 : section pleine hauteur,
   rangée [texte | panneau], barre de 3 métriques calée en bas.
   Le panneau droit est un BOARD AGENDA illustratif (HeroBoard),
   plus la courbe ROI. Couleurs uniquement via tokens --v2-*.
   Préfixe CSS « hepro- » (CSS dans heroElevated.styles.ts).
   Chiffres ILLUSTRATIFS. i18n : namespace « pro ».
   ============================================================ */

const CTA_HREF = "/contact";

// Figures illustratives (symboles/nombres, non traduisibles).
// Seuls les libellés passent par l'i18n (prose).
const METRIC_SHAPES = [
  { id: "noshow", prefix: "−", to: 40, suffix: "%", decimals: 0 },
  { id: "hours", prefix: "", to: 8, suffix: " h", decimals: 0 },
  { id: "patients", prefix: "+", to: 30, suffix: "%", decimals: 0 },
] as const;

function ArrowIcon() {
  return (
    <svg className="hepro__arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h11M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="hepro__check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.4 8.6l3 3 6.2-7.2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroElevated() {
  const t = useTranslations("pro");
  const { ref: barRef, inView } = useInView<HTMLDivElement>();

  const metrics: HeroMetric[] = METRIC_SHAPES.map((m) => ({
    ...m,
    label: t(`hero.metrics.${m.id}.label`),
  }));

  const badges = [
    { id: "rgpd", label: t("hero.badgeRgpd") },
    { id: "portugal", label: t("hero.badgePortugal") },
    { id: "langs", label: t("hero.badgeLangs") },
  ];

  return (
    <section className="hepro" aria-labelledby="hepro-title">
      <style>{heroElevatedCss}</style>

      <div className="hepro__shell">
        <div className="hepro__top">
          <div className="hepro__intro">
            <span className="hepro__eyebrow hepro-reveal" style={{ animationDelay: "0ms" }}>
              <span className="hepro__eyebrow-dot" aria-hidden="true" />
              {t("hero.eyebrow")}
            </span>
            <h1 className="hepro__title hepro-reveal" id="hepro-title" style={{ animationDelay: "70ms" }}>
              {t("hero.titleLead")}{" "}
              <span className="hepro__accent">{t("hero.titleAccent")}</span>
            </h1>
            <p className="hepro__lead hepro-reveal" style={{ animationDelay: "150ms" }}>
              {t("hero.lead")}
            </p>
            <div className="hepro__cta hepro-reveal" style={{ animationDelay: "230ms" }}>
              <a className="hepro__btn hepro__btn--primary" href={CTA_HREF}>
                {t("hero.ctaPrimary")}
                <ArrowIcon />
              </a>
              <a className="hepro__btn hepro__btn--ghost" href={CTA_HREF}>
                {t("hero.ctaSecondary")}
              </a>
            </div>
            <ul className="hepro__badges hepro-reveal" style={{ animationDelay: "300ms" }}>
              {badges.map((b) => (
                <li className="hepro__badge" key={b.id}>
                  <CheckIcon />
                  {b.label}
                </li>
              ))}
            </ul>

            <div
              ref={barRef}
              className="hepro__bar"
              aria-label={t("hero.metricsAria")}
            >
              {metrics.map((m, i) => (
                <MetricItem key={m.id} metric={m} start={inView} delay={420 + i * 90} />
              ))}
            </div>
          </div>

          <HeroBoard />
        </div>
      </div>
    </section>
  );
}
