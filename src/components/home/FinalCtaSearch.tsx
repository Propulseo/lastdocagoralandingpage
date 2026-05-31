"use client";
import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { searchLoginUrl } from "@/lib/specialties";

export default function FinalCtaSearch() {
  const t = useTranslations("final");
  const ts = useTranslations("search");
  const [specialty, setSpecialty] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    window.location.href = searchLoginUrl({ q: specialty || undefined });
  }

  return (
    <section className="da-final da-canvas da-canvas--dark da-divider-top">
      <div className="container">
        <div className="da-final__inner">
          <span className="da-final__eyebrow">{t("eyebrow")}</span>
          <h2 className="da-final__title">{t("title")}</h2>
          <p className="da-final__sub">{t("sub")}</p>

          <form className="da-search" onSubmit={handleSubmit} role="search">
            <div className="da-search__main">
              <label htmlFor="final-specialty" className="da-search__field-label">
                {ts("specialtyLabel")}
              </label>
              <i className="fas fa-search da-search__icon" aria-hidden="true"></i>
              <input
                id="final-specialty"
                type="text"
                className="da-search__input"
                placeholder={ts("finalPlaceholder")}
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="da-search__row">
              <button type="submit" className="da-search__cta">
                <span>{ts("cta")}</span>
                <i className="icon-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
