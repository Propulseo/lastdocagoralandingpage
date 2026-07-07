"use client";
import { useTranslations } from "next-intl";

const ITEMS = [
  { icon: "fas fa-stethoscope", value: "specialtiesValue", label: "specialtiesLabel" },
  { icon: "fas fa-globe-europe", value: "languagesValue", label: "languagesLabel" },
  { icon: "fas fa-user-shield", value: "verifiedValue", label: "verifiedLabel" },
  { icon: "fas fa-lock", value: "gdprValue", label: "gdprLabel" },
] as const;

export default function TrustBar() {
  const t = useTranslations("trust");

  return (
    <section className="trust-bar da-topo" aria-label={t("ariaLabel")}>
      <div className="da-shell">
        <div className="trust-bar__grid">
          {ITEMS.map((item) => (
            <div key={item.value} className="trust-bar__item">
              <span className="trust-bar__icon" aria-hidden="true">
                <i className={item.icon}></i>
              </span>
              <div>
                <p className="trust-bar__value">{t(item.value)}</p>
                <p className="trust-bar__label">{t(item.label)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
