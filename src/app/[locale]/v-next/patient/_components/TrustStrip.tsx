"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/AnimatedSection";

/** Honest trust signals, rendered as a plain divided strip (no boxed cards —
 *  metrics breathe in negative space). Reuses the `trust.*` i18n keys. */
export default function TrustStrip() {
  const t = useTranslations("trust");

  const items = [
    { icon: "fas fa-stethoscope", value: t("specialtiesValue"), label: t("specialtiesLabel") },
    { icon: "fas fa-globe-europe", value: t("languagesValue"), label: t("languagesLabel") },
    { icon: "fas fa-user-shield", value: t("verifiedValue"), label: t("verifiedLabel") },
    { icon: "fas fa-lock", value: t("gdprValue"), label: t("gdprLabel") },
  ];

  return (
    <section className="vnp-section vnts" aria-label={t("ariaLabel")}>
      <style>{`
        .vnts { padding-block: clamp(40px, 5vw, 64px); }
        .vnts__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--vnp-line);
          border-radius: var(--vnp-radius);
          background: rgba(255,255,255,0.6);
          overflow: hidden;
        }
        .vnts__item {
          display: flex; align-items: center; gap: 16px;
          padding: clamp(20px, 2.2vw, 28px) clamp(18px, 2vw, 28px);
        }
        .vnts__item + .vnts__item { border-left: 1px solid var(--vnp-line); }
        .vnts__icon {
          flex-shrink: 0; width: 46px; height: 46px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; color: var(--vnp-accent);
          background: var(--vnp-accent-soft);
        }
        .vnts__value {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(18px, 1.7vw, 22px); font-weight: 600;
          color: var(--vnp-ink); line-height: 1.1; margin: 0;
        }
        .vnts__label { font-size: 13px; color: var(--vnp-muted); margin: 3px 0 0; line-height: 1.35; }
        @media (max-width: 860px) {
          .vnts__grid { grid-template-columns: repeat(2, 1fr); }
          .vnts__item:nth-child(odd) { border-left: none; }
          .vnts__item:nth-child(n+3) { border-top: 1px solid var(--vnp-line); }
        }
        @media (max-width: 480px) {
          .vnts__grid { grid-template-columns: 1fr; }
          .vnts__item { border-left: none !important; }
          .vnts__item + .vnts__item { border-top: 1px solid var(--vnp-line); }
        }
      `}</style>
      <div className="vnp-shell">
        <AnimatedSection>
          <div className="vnts__grid">
            {items.map((it) => (
              <div className="vnts__item" key={it.value + it.label}>
                <span className="vnts__icon"><i className={it.icon} aria-hidden="true" /></span>
                <div>
                  <p className="vnts__value">{it.value}</p>
                  <p className="vnts__label">{it.label}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
