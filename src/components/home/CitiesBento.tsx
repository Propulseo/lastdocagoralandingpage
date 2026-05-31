"use client";
import { useTranslations } from "next-intl";
import { searchLoginUrl } from "@/lib/specialties";

export default function CitiesBento() {
  const t = useTranslations("cities");
  const cities = t.raw("items") as string[];

  return (
    <section className="bento bento--cities">
      <div className="container">
        <div className="bento__header">
          <span className="bento__eyebrow">{t("eyebrow")}</span>
          <h2 className="bento__heading">{t("title")}</h2>
          <p className="bento__sub">{t("desc")}</p>
        </div>
        <div className="bento__grid">
          {cities.map((city) => (
            <a
              key={city}
              href={searchLoginUrl({ city })}
              className="bento__tile"
            >
              <span className="bento__tile-icon" aria-hidden="true">
                <i className="fas fa-city"></i>
              </span>
              <h3 className="bento__tile-title">{city}</h3>
              <span className="bento__tile-arrow">
                {t("cta")} <i className="icon-arrow-right"></i>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
