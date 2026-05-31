"use client";
import { useTranslations } from "next-intl";
import { SPECIALTIES, searchLoginUrl } from "@/lib/specialties";

export default function SpecialtiesBento() {
  const t = useTranslations("specialties");

  return (
    <section className="bento bento--compact da-topo" id="services">
      <div className="container">
        <div className="bento__header">
          <span className="bento__eyebrow">{t("subtitle")}</span>
          <h2 className="bento__heading">{t("title")}</h2>
        </div>
        <div className="bento__grid">
          {SPECIALTIES.map(({ key, icon, slug }) => (
            <a
              key={key}
              id={slug}
              href={searchLoginUrl({ q: t(`items.${key}.title`), specialty: slug })}
              className="bento__tile"
            >
              <span className="bento__tile-icon" aria-hidden="true">
                <i className={icon}></i>
              </span>
              <h3 className="bento__tile-title">{t(`items.${key}.title`)}</h3>
              <i className="icon-arrow-right bento__tile-go" aria-hidden="true"></i>
            </a>
          ))}
          <a href={searchLoginUrl({})} className="bento__tile bento__tile--cta">
            <span className="bento__tile-icon" aria-hidden="true">
              <i className="fas fa-search"></i>
            </span>
            <span className="bento__tile-title">{t("seeAll")}</span>
            <i className="icon-arrow-right bento__tile-go" aria-hidden="true" style={{ opacity: 1, transform: "none" }}></i>
          </a>
        </div>
      </div>
    </section>
  );
}
