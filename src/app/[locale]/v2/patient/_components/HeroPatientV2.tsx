"use client";
import { useMemo, useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTypewriter } from "@/lib/useTypewriter";
import { SPECIALTY_ICON, searchLoginUrl } from "@/lib/specialties";
import VerifiedRecordCard, { type Lang } from "@/components/home/VerifiedRecordCard";

const LANGS: Lang[] = ["PT", "FR", "EN"];

/** Structural meta for the cycling example, index-aligned with the
 *  i18n `search.examples` trilingual query strings (réutilise les clés de Hero.tsx). */
const EXAMPLE_META: { specialtyKey: string; cityIdx: number; langs: Lang[] }[] = [
  { specialtyKey: "dermatology", cityIdx: 0, langs: ["PT", "FR"] }, // Lisboa
  { specialtyKey: "generalPractice", cityIdx: 5, langs: ["FR", "EN"] }, // Cascais
  { specialtyKey: "dentistry", cityIdx: 1, langs: ["EN", "PT"] }, // Porto
  { specialtyKey: "pediatrics", cityIdx: 3, langs: ["PT", "EN"] }, // Braga
];

export default function HeroPatientV2() {
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

  // Carte « vivante » (avant recherche) synchronisée sur le cycle de frappe.
  const exampleCard = {
    icon: SPECIALTY_ICON[meta.specialtyKey] ?? "icon-doctor",
    specialty: tspec(`items.${meta.specialtyKey}.title`),
    city: cities[meta.cityIdx] ?? cities[0],
    languages: meta.langs,
  };

  // Résultats illustratifs après recherche : 2 cartes dans la ville + langue choisies.
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

  return (
    <section className="vph-hero" id="vph-hero-patient" aria-label={t("titleLead")}>
      <style>{`
        .vph-hero, .vph-hero * { box-sizing: border-box; }
        .vph-hero {
          position: relative;
          background: transparent;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          color: #fff;
          /* Plein écran à l’arrivée : hauteur visible moins le header sticky. */
          min-height: calc(100svh - var(--v2pat-header-h, 56px));
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(32px, 5vh, 72px) clamp(20px, 5vw, 64px);
          overflow: hidden;
        }
        .vph-hero__inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1240px;
          margin-inline: auto;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }

        /* ── Colonne gauche : copy + console ── */
        .vph-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(11px, 1.1vw, 12.5px);
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-teal);
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid rgba(var(--color-teal-rgb), 0.4);
          background: rgba(var(--color-teal-rgb), 0.1);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .vph-hero__eyebrow::before {
          content: "";
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.22);
        }
        .vph-hero__title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          /* Borné aussi par la hauteur pour scaler sans déborder en plein écran. */
          font-size: clamp(2.55rem, min(5.6vw, 7.4vh), 4.4rem);
          line-height: 1.04;
          letter-spacing: -0.015em;
          margin: clamp(18px, 2.4vw, 30px) 0 clamp(14px, 1.8vw, 22px);
          color: #fff;
          text-wrap: balance;
        }
        .vph-hero__em {
          color: var(--color-teal);
          font-style: italic;
          position: relative;
          white-space: nowrap;
        }
        .vph-hero__em::after {
          content: "";
          position: absolute;
          left: 2%; right: 2%;
          bottom: 0.04em;
          height: 0.12em;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(var(--color-teal-rgb), 0), rgba(var(--color-teal-rgb), 0.65), rgba(var(--color-teal-rgb), 0));
          transform: scaleX(0);
          transform-origin: left center;
          animation: vph-underline 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.65s forwards;
        }
        @keyframes vph-underline { to { transform: scaleX(1); } }
        .vph-hero__subhead {
          font-size: clamp(15px, 1.45vw, 18px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.82);
          max-width: 36em;
          margin: 0 0 clamp(26px, 3vw, 38px);
        }

        /* ── Console de recherche (glass sombre) ── */
        .vph-search {
          position: relative;
          padding: clamp(18px, 2.2vw, 26px);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(16px) saturate(1.15);
          -webkit-backdrop-filter: blur(16px) saturate(1.15);
          box-shadow:
            0 30px 70px -28px rgba(var(--color-dark-2-rgb), 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }
        .vph-search__field-label {
          display: block;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.62);
          margin-bottom: 8px;
        }
        .vph-search__main {
          position: relative;
          margin-bottom: 16px;
        }
        .vph-search__icon {
          position: absolute;
          left: 18px;
          top: calc(50% + 13px);
          transform: translateY(-50%);
          color: var(--color-teal);
          font-size: 15px;
          pointer-events: none;
        }
        .vph-search__input {
          width: 100%;
          height: 56px;
          padding: 0 18px 0 46px;
          border-radius: 14px;
          border: 1.5px solid rgba(255, 255, 255, 0.16);
          background: rgba(var(--color-dark-2-rgb), 0.42);
          color: #fff;
          font-family: inherit;
          font-size: 16px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .vph-search__input::placeholder { color: rgba(255, 255, 255, 0.5); }
        .vph-search__input:focus {
          outline: none;
          border-color: var(--color-teal);
          background: rgba(var(--color-dark-2-rgb), 0.55);
          box-shadow:
            0 0 0 4px rgba(var(--color-teal-rgb), 0.28),
            0 0 28px rgba(var(--color-teal-rgb), 0.32);
        }
        .vph-search__row {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) auto auto;
          gap: 14px;
          align-items: end;
        }
        .vph-search__select {
          width: 100%;
          height: 50px;
          padding: 0 14px;
          border-radius: 12px;
          border: 1.5px solid rgba(255, 255, 255, 0.16);
          background: rgba(var(--color-dark-2-rgb), 0.42);
          color: #fff;
          font-family: inherit;
          font-size: 14.5px;
          cursor: pointer;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .vph-search__select option { color: var(--color-dark-1); }
        .vph-search__select:focus {
          outline: none;
          border-color: var(--color-teal);
          box-shadow: 0 0 0 3px rgba(var(--color-teal-rgb), 0.25);
        }
        .vph-seg {
          display: inline-flex;
          padding: 4px;
          gap: 2px;
          border-radius: 12px;
          border: 1.5px solid rgba(255, 255, 255, 0.16);
          background: rgba(var(--color-dark-2-rgb), 0.42);
          height: 50px;
        }
        .vph-seg__btn {
          min-width: 44px;
          padding: 0 12px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: rgba(255, 255, 255, 0.62);
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.22s ease, color 0.22s ease, transform 0.18s ease;
        }
        .vph-seg__btn:hover { color: #fff; }
        .vph-seg__btn.is-active {
          background: var(--color-teal);
          color: var(--color-dark-1);
          box-shadow: 0 4px 14px -4px rgba(var(--color-teal-rgb), 0.6);
        }
        .vph-search__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          height: 50px;
          padding: 0 26px;
          border: 0;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--color-teal), var(--color-mint));
          color: var(--color-dark-1);
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 700;
          letter-spacing: 0.01em;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 12px 28px -10px rgba(var(--color-teal-rgb), 0.65);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .vph-search__cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.04);
          box-shadow: 0 16px 34px -10px rgba(var(--color-teal-rgb), 0.75);
        }
        .vph-search__cta svg { width: 16px; height: 16px; }
        .vph-search__trust {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .vph-search__trust span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.72);
        }
        .vph-search__trust svg { width: 14px; height: 14px; color: var(--color-teal); flex-shrink: 0; }

        /* ── Colonne droite : carte / résultats ── */
        .vph-hero__media {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .vph-hero__float {
          width: 100%;
          max-width: clamp(360px, 32vw, 420px);
          animation: vph-levitate 6.5s ease-in-out infinite;
        }
        @keyframes vph-levitate {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .vph-hero__media .da-record {
          background: rgba(255, 255, 255, 0.07) !important;
          border: 1px solid rgba(255, 255, 255, 0.16) !important;
          backdrop-filter: blur(18px) saturate(1.1);
          -webkit-backdrop-filter: blur(18px) saturate(1.1);
          box-shadow: 0 36px 80px -30px rgba(var(--color-dark-2-rgb), 0.75) !important;
          color: #fff !important;
        }
        .vph-hero__media .da-record__name { color: #fff !important; }
        .vph-hero__media .da-record__meta,
        .vph-hero__media .da-record__langs-label { color: rgba(255, 255, 255, 0.66) !important; }
        .vph-hero__media .da-record__verified { color: var(--color-teal) !important; }
        .vph-hero__media .da-record__mono {
          background: rgba(var(--color-teal-rgb), 0.16) !important;
          color: var(--color-teal) !important;
        }
        .vph-hero__media .da-lang-chip {
          background: rgba(255, 255, 255, 0.08) !important;
          color: rgba(255, 255, 255, 0.6) !important;
          border-color: rgba(255, 255, 255, 0.14) !important;
        }
        .vph-hero__media .da-lang-chip.is-match {
          background: rgba(var(--color-teal-rgb), 0.2) !important;
          color: var(--color-teal) !important;
          border-color: rgba(var(--color-teal-rgb), 0.4) !important;
        }
        .vph-hero__media .da-record__badge {
          background: rgba(255, 255, 255, 0.12) !important;
          color: rgba(255, 255, 255, 0.8) !important;
        }

        .vph-results {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .vph-results__head {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.78);
          margin: 0 2px;
        }
        .vph-seeall {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          padding: 10px 4px;
          color: var(--color-teal);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: gap 0.2s ease, color 0.2s ease;
        }
        .vph-seeall:hover { gap: 13px; color: var(--color-mint); }
        .vph-seeall svg { width: 15px; height: 15px; }

        /* Carte compacte mobile (avant recherche) */
        .vph-chip { display: none; }
        .vph-mobile { display: none; }

        /* ── Reveal en cascade au chargement ── */
        .vph-reveal {
          opacity: 0;
          transform: translateY(18px);
          animation: vph-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .vph-d1 { animation-delay: 0.05s; }
        .vph-d2 { animation-delay: 0.16s; }
        .vph-d3 { animation-delay: 0.27s; }
        .vph-d4 { animation-delay: 0.38s; }
        .vph-d5 { animation-delay: 0.5s; }
        @keyframes vph-rise { to { opacity: 1; transform: translateY(0); } }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          /* Empilement console + carte : on relâche la pleine hauteur pour
             éviter un grand vide / un débordement, empilement naturel. */
          .vph-hero {
            min-height: auto;
            justify-content: flex-start;
            padding: clamp(40px, 7vw, 72px) clamp(20px, 5vw, 64px);
          }
          .vph-hero__inner { grid-template-columns: 1fr; gap: 36px; }
          .vph-hero__media { display: none; }
          .vph-mobile { display: block; margin-top: 28px; }
          .vph-mobile .vph-results { max-width: 100%; }
          .vph-chip {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 16px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.14);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
          .vph-chip__mono {
            display: flex; align-items: center; justify-content: center;
            width: 44px; height: 44px; flex-shrink: 0;
            border-radius: 12px;
            background: rgba(var(--color-teal-rgb), 0.16);
            color: var(--color-teal);
            font-size: 20px;
          }
          .vph-chip__title { margin: 0; font-size: 14.5px; font-weight: 600; color: #fff; }
          .vph-chip__sub { margin: 2px 0 0; font-size: 12.5px; color: rgba(255, 255, 255, 0.62); }
          .vph-chip__check { margin-left: auto; color: var(--color-teal); font-size: 18px; }
        }
        @media (max-width: 600px) {
          .vph-search__row { grid-template-columns: 1fr; }
          .vph-search__cta { width: 100%; }
          .vph-seg { width: 100%; justify-content: space-between; }
          .vph-seg__btn { flex: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vph-hero__em::after,
          .vph-hero__float,
          .vph-reveal {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div className="vph-hero__inner">
        {/* GAUCHE, copy + console de recherche */}
        <div>
          <span className="vph-hero__eyebrow vph-reveal vph-d1">PT · FR · EN</span>
          <h1 className="vph-hero__title vph-reveal vph-d2">
            {t("titleLead")}{" "}
            <span className="vph-hero__em">{t("titleEmphasis")}</span>
          </h1>
          <p className="vph-hero__subhead vph-reveal vph-d3">{t("subhead")}</p>

          <form
            className="vph-search vph-reveal vph-d4"
            onSubmit={handleSubmit}
            role="search"
          >
            <div className="vph-search__main">
              <label htmlFor="vph-specialty" className="vph-search__field-label">
                {ts("specialtyLabel")}
              </label>
              <i className="fas fa-search vph-search__icon" aria-hidden="true"></i>
              <input
                id="vph-specialty"
                type="text"
                className="vph-search__input"
                placeholder={placeholder}
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="vph-search__row">
              <div>
                <label htmlFor="vph-city" className="vph-search__field-label">
                  {ts("cityLabel")}
                </label>
                <select
                  id="vph-city"
                  className="vph-search__select"
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
                <span className="vph-search__field-label">{ts("languageLabel")}</span>
                <div className="vph-seg" role="group" aria-label={ts("languageLabel")}>
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`vph-seg__btn${lang === l ? " is-active" : ""}`}
                      aria-pressed={lang === l}
                      onClick={() => setLang(l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="vph-search__cta">
                <span>{ts("cta")}</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="vph-search__trust">
              <span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {ts("trustVerified")}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
                  <path
                    d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
                {ts("trustLanguages")}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M20 12l-8 8-8.5-8.5A4.6 4.6 0 0110 5l2 2 2-2a4.6 4.6 0 016.5 6.5L20 12z"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    opacity="0"
                  />
                  <path
                    d="M3 8.5l8 8a2 2 0 002.8 0l4.7-4.7a2 2 0 000-2.8L11 1.5H5A2 2 0 003 3.5v5z"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinejoin="round"
                  />
                  <circle cx="7" cy="6" r="1.1" fill="currentColor" />
                </svg>
                {ts("trustFree")}
              </span>
            </div>
          </form>

          {/* Mobile : carte compacte ou résultats sous la console */}
          <div className="vph-mobile">
            {searched ? (
              <div className="vph-results">
                <p className="vph-results__head">{ts("resultsHead")}</p>
                {results.map((r, i) => (
                  <VerifiedRecordCard key={`m-${r.specialty}-${i}`} {...r} illustrative />
                ))}
                <a className="vph-seeall" href={seeAllHref}>
                  <span>{ts("seeAll")}</span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth={2.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            ) : (
              <div className="vph-chip" aria-hidden="true">
                <div className="vph-chip__mono">
                  <i className={exampleCard.icon}></i>
                </div>
                <div>
                  <p className="vph-chip__title">{exampleCard.specialty}</p>
                  <p className="vph-chip__sub">
                    {exampleCard.city} · {exampleCard.languages.join(" · ")}
                  </p>
                </div>
                <i className="fas fa-check-circle vph-chip__check"></i>
              </div>
            )}
          </div>
        </div>

        {/* DROITE, carte profil vérifié / résultats (desktop) */}
        <div className="vph-hero__media vph-reveal vph-d5" aria-label={ts("resultsHead")}>
          {searched ? (
            <div className="vph-results">
              <p className="vph-results__head">{ts("resultsHead")}</p>
              {results.map((r, i) => (
                <VerifiedRecordCard key={`${r.specialty}-${i}`} {...r} illustrative />
              ))}
              <a className="vph-seeall" href={seeAllHref}>
                <span>{ts("seeAll")}</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ) : (
            <div className="vph-hero__float">
              <VerifiedRecordCard {...exampleCard} illustrative />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
