"use client";
import { useTranslations } from "next-intl";

export default function FinalCtaSearch() {
  const t = useTranslations("final");

  return (
    <section className="da-final da-final--card">
      <div className="da-shell">
        <div className="da-final__inner">
          <span className="da-final__eyebrow">{t("eyebrow")}</span>
          <h2 className="da-final__title">{t("title")}</h2>
          <p className="da-final__sub">{t("sub")}</p>

          <a
            href="#vnp-hero"
            className="da-final__cta"
            aria-label={t("ctaLabel")}
          >
            <span>{t("cta")}</span>
            <i className="icon-arrow-right da-final__cta-arrow" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
