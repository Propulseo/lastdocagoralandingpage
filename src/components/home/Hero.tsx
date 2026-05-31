"use client";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTypewriter } from "@/lib/useTypewriter";
import { SPECIALTY_ICON, searchLoginUrl } from "@/lib/specialties";
import VerifiedRecordCard, { type Lang } from "./VerifiedRecordCard";

const LANGS: Lang[] = ["PT", "FR", "EN"];

/** Structural meta for the cycling example — index-aligned with the
 *  i18n `search.examples` trilingual query strings. */
const EXAMPLE_META: { specialtyKey: string; cityIdx: number; langs: Lang[] }[] = [
  { specialtyKey: "dermatology", cityIdx: 0, langs: ["PT", "FR"] }, // Lisboa
  { specialtyKey: "generalPractice", cityIdx: 5, langs: ["FR", "EN"] }, // Cascais
  { specialtyKey: "dentistry", cityIdx: 1, langs: ["EN", "PT"] }, // Porto
  { specialtyKey: "pediatrics", cityIdx: 3, langs: ["PT", "EN"] }, // Braga
];

export default function Hero({ fill }: { fill?: ReactNode }) {
  const t = useTranslations("hero");
  const ts = useTranslations("search");
  const tspec = useTranslations("specialties");
  const tc = useTranslations("cities");
  const locale = useLocale();

  const cities = tc.raw("items") as string[];
  const examples = ts.raw("examples") as string[];
  const { text: typed, index } = useTypewriter(examples);

  const defaultLang: Lang = locale === "fr" ? "FR" : locale === "en" ? "EN" : "PT";
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");
  const [lang, setLang] = useState<Lang>(defaultLang);
  const [searched, setSearched] = useState(false);

  const meta = EXAMPLE_META[index % EXAMPLE_META.length];
  const placeholder = typed || examples[0] || "";

  // The "living" example card (pre-search) syncs to the typing cycle.
  const exampleCard = {
    icon: SPECIALTY_ICON[meta.specialtyKey] ?? "icon-doctor",
    specialty: tspec(`items.${meta.specialtyKey}.title`),
    city: cities[meta.cityIdx] ?? cities[0],
    languages: meta.langs,
  };

  // Post-search illustrative results: 2 cards in the chosen city + lang.
  const results = useMemo(() => {
    const cityLabel = city || cities[0];
    const picks = [EXAMPLE_META[0], EXAMPLE_META[2]];
    return picks.map((m) => {
      const langs = m.langs.includes(lang) ? m.langs : [lang, ...m.langs].slice(0, 2);
      return {
        icon: SPECIALTY_ICON[m.specialtyKey] ?? "icon-doctor",
        specialty: tspec(`items.${m.specialtyKey}.title`),
        city: cityLabel,
        languages: langs as Lang[],
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, lang, searched]);

  const seeAllHref = searchLoginUrl({
    q: specialty || undefined,
    city: city || undefined,
    lang,
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSearched(true);
  }

  function renderResults() {
    return (
      <div className="da-hero__results">
        <p className="da-hero__results-head">{ts("resultsHead")}</p>
        {results.map((r, i) => (
          <VerifiedRecordCard key={i} {...r} illustrative />
        ))}
        <a className="da-hero__seeall" href={seeAllHref}>
          <span>{ts("seeAll")}</span>
          <i className="icon-arrow-right"></i>
        </a>
      </div>
    );
  }

  return (
    <section className="da-hero da-canvas da-topo" id="da-hero">
      <div className="da-hero__bg" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata">
          <source src="/assets/video/hero-client-1.mp4" type="video/mp4" />
          <source src="/assets/video/hero-client-1.webm" type="video/webm" />
        </video>
      </div>
      <div className="container">
        <div className="da-hero__inner">
          <div className="row align-items-center">
            {/* LEFT — copy + search console */}
            <div className="col-12 col-lg-7">
              <span className="da-hero__eyebrow">PT · FR · EN</span>
              <h1 className="da-hero__title">
                {t("titleLead")}{" "}
                <span className="da-hero__em">{t("titleEmphasis")}</span>
              </h1>
              <p className="da-hero__subhead">{t("subhead")}</p>

              <form className="da-search" onSubmit={handleSubmit} role="search">
                <div className="da-search__main">
                  <label htmlFor="hero-specialty" className="da-search__field-label">
                    {ts("specialtyLabel")}
                  </label>
                  <i className="fas fa-search da-search__icon" aria-hidden="true"></i>
                  <input
                    id="hero-specialty"
                    type="text"
                    className="da-search__input"
                    placeholder={placeholder}
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="da-search__row">
                  <div className="da-search__city">
                    <label htmlFor="hero-city" className="da-search__field-label">
                      {ts("cityLabel")}
                    </label>
                    <select
                      id="hero-city"
                      className="da-search__select"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">{ts("cityAll")}</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className="da-search__field-label">{ts("languageLabel")}</span>
                    <div
                      className="da-seg"
                      role="group"
                      aria-label={ts("languageLabel")}
                    >
                      {LANGS.map((l) => (
                        <button
                          key={l}
                          type="button"
                          className={`da-seg__btn${lang === l ? " is-active" : ""}`}
                          aria-pressed={lang === l}
                          onClick={() => setLang(l)}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="da-search__cta">
                    <span>{ts("cta")}</span>
                    <i className="icon-arrow-right"></i>
                  </button>
                </div>
                <div className="da-search__trust">
                  <span><i className="fas fa-shield-alt"></i>{ts("trustVerified")}</span>
                  <span><i className="fas fa-globe-europe"></i>{ts("trustLanguages")}</span>
                  <span><i className="fas fa-tag"></i>{ts("trustFree")}</span>
                </div>
              </form>

              {/* Mobile: compact record / results below the console */}
              <div className="d-lg-none">
                {searched ? (
                  renderResults()
                ) : (
                  <>
                    <div className="da-record-chip" aria-hidden="true">
                      <div className="da-record-chip__mono">
                        <i className={exampleCard.icon}></i>
                      </div>
                      <div className="da-record-chip__text">
                        <p className="da-record-chip__title">{exampleCard.specialty}</p>
                        <p className="da-record-chip__sub">
                          {exampleCard.city} · {exampleCard.languages.join(" · ")}
                        </p>
                      </div>
                      <i className="fas fa-check-circle da-record-chip__check"></i>
                    </div>
                    {fill && <div className="mt-4">{fill}</div>}
                  </>
                )}
              </div>
            </div>

            {/* RIGHT — verified record proof / results (desktop) */}
            <div className="col-lg-5 d-none d-lg-block">
              <div className={`da-hero__media${fill ? " da-hero__media--filled" : ""}`}>
                {searched ? (
                  renderResults()
                ) : fill ? (
                  <div className="da-hero__media-stack">
                    <VerifiedRecordCard {...exampleCard} illustrative />
                    {fill}
                  </div>
                ) : (
                  <VerifiedRecordCard {...exampleCard} illustrative />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
