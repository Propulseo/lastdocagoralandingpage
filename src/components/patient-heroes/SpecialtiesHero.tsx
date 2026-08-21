"use client";
import { useState, type CSSProperties, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

import { getSpecialtiesCopy } from "@/app/[locale]/(patient)/specialties/_medically/specialtiesCopy";
import { specialtiesHeroCss } from "@/components/patient-heroes/specialtiesHero.styles";
import type { Lang } from "@/components/home/VerifiedRecordCard";
import { SPECIALTIES, searchLoginUrl } from "@/lib/specialties";
import { useTypewriter } from "@/lib/useTypewriter";

const LANGS: Lang[] = ["PT", "FR", "EN", "ES"];

/** Les six spécialités mises en avant viennent de la source unique
 *  (lib/specialties, drapeau `flagship`) — jamais une liste locale. */
const FLAGSHIP = SPECIALTIES.filter((s) => s.flagship);

function TickIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12.5l5 5 11-11" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * SpecialtiesHero — hero « console de recherche » de /specialties (thème clair).
 * Rendu HORS `.med`.
 *
 * C'est LA page recherche du site : sa console reprend le langage complet de
 * celle de la home (placeholder qui se tape, glass, liseré dégradé, sélecteur
 * de langue, CTA teal, réassurance) au lieu de la version appauvrie d'avant.
 * Les exemples qui défilent et la réassurance viennent des traductions
 * `search.*` déjà écrites en PT/FR/EN.
 *
 * La recherche ne simule aucun résultat : elle deep-linke vers la recherche
 * réelle du produit (searchLoginUrl), comme partout ailleurs.
 */
export default function SpecialtiesHero() {
  const ts = useTranslations("search");
  const tspec = useTranslations("specialties");
  const locale = useLocale();
  /* Composant client : la locale vient du contexte next-intl, pas des params
     de route — c'est la même source que les `useTranslations` ci-dessous. */
  const heroCopy = getSpecialtiesCopy(locale).hero;

  const examples = ts.raw("examples") as string[];
  const { text: typed } = useTypewriter(examples);

  const defaultLang: Lang = locale === "fr" ? "FR" : locale === "en" ? "EN" : "PT";
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");
  const [lang, setLang] = useState<Lang>(defaultLang);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    window.location.href = searchLoginUrl({
      q: specialty.trim() || undefined,
      city: city.trim() || undefined,
      lang,
    });
  }

  return (
    <section className="psh" aria-label={heroCopy.eyebrow}>
      <style>{specialtiesHeroCss}</style>

      <div className="psh__inner">
        <span className="psh__eyebrow psh-reveal psh-d1">{heroCopy.eyebrow}</span>
        <h1 className="psh__title psh-reveal psh-d2">
          {heroCopy.titleLead} <span className="psh__em">{heroCopy.titleEmphasis}</span>
        </h1>
        <p className="psh__desc psh-reveal psh-d3">{heroCopy.lead}</p>

        <form className="psh__console psh-reveal psh-d4" onSubmit={handleSubmit} role="search">
          <div className="psh__main">
            <label className="psh__label" htmlFor="psh-q">
              {heroCopy.labelSpecialty}
            </label>
            <div className="psh__inputwrap">
              <i className="fas fa-search psh__icon" aria-hidden="true"></i>
              <input
                id="psh-q"
                type="text"
                className="psh__input"
                placeholder={typed || examples[0] || heroCopy.specialtyPlaceholder}
                aria-label={heroCopy.labelSpecialty}
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="psh__row">
            <div>
              <label className="psh__label" htmlFor="psh-city">
                {heroCopy.labelCity}
              </label>
              <input
                id="psh-city"
                type="text"
                className="psh__input"
                placeholder={heroCopy.cityPlaceholder}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div>
              <span className="psh__label">{heroCopy.labelLang}</span>
              <div className="psh__seg" role="group" aria-label={heroCopy.labelLang}>
                <span
                  className="psh__seg-pill"
                  style={{ "--seg-i": LANGS.indexOf(lang), "--seg-n": LANGS.length } as CSSProperties}
                  aria-hidden="true"
                />
                {LANGS.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`psh__seg-btn${code === lang ? " is-active" : ""}`}
                    aria-pressed={code === lang}
                    onClick={() => setLang(code)}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="psh__cta">
              <span>{heroCopy.cta}</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="psh__trust">
            <span><TickIcon />{ts("trustVerified")}</span>
            <span><TickIcon />{ts("trustLanguages")}</span>
            <span><TickIcon />{ts("trustFree")}</span>
          </div>
        </form>

        {/* Accès immédiat : un clic = la recherche déjà remplie côté produit. */}
        <p className="psh__chips-label psh-reveal psh-d4">{heroCopy.chipsLabel}</p>
        <div className="psh__chips">
          {FLAGSHIP.map((spec, i) => {
            const label = tspec(`items.${spec.key}.title`);
            return (
              <a
                key={spec.key}
                className="psh__chip"
                style={{ "--i": i } as CSSProperties}
                href={searchLoginUrl({ q: label, lang })}
              >
                <i className={spec.icon} aria-hidden="true"></i>
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
