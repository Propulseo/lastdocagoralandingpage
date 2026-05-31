"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const STEP_KEYS = ["step1", "step2", "step3", "step4"] as const;

export default function HowItWorks() {
  const t = useTranslations("process");

  return (
    <section className="how how--dark da-canvas da-canvas--dark da-divider-top" id="how">
      <div className="container">
        <div className="how__header">
          <span className="how__eyebrow">
            <i className="icon-arrow-right"></i>
            {t("subtitle")}
          </span>
          <h2 className="how__title">{t("title")}</h2>
          <p className="how__desc">{t("desc")}</p>
        </div>

        <div className="how__grid">
          {STEP_KEYS.map((key) => (
            <div key={key} className="how__step">
              <div className="how__step-num">{t(`steps.${key}.number`)}</div>
              <h3 className="how__step-title">{t(`steps.${key}.title`)}</h3>
              <p className="how__step-desc">{t(`steps.${key}.desc`)}</p>
            </div>
          ))}
        </div>

        <div className="how__cta">
          <p className="how__cta-text">{t("ctaDesc")}</p>
          <Link href="/specialties" className="btn btn__primary btn__rounded">
            <span>{t("ctaButton")}</span>
            <i className="icon-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
