"use client";
import { useMemo, useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTypewriter } from "@/lib/useTypewriter";
import { SPECIALTY_ICON, searchLoginUrl } from "@/lib/specialties";
import VerifiedRecordCard, { type Lang } from "@/components/home/VerifiedRecordCard";

const LANGS: Lang[] = ["PT", "FR", "EN"];

/** Méta structurelle du cycle d’exemples, aligné par index avec les
 *  chaînes trilingues `search.examples` (réutilise les clés de Hero.tsx). */
const EXAMPLE_META: { specialtyKey: string; cityIdx: number; langs: Lang[] }[] = [
  { specialtyKey: "dermatology", cityIdx: 0, langs: ["PT", "FR"] }, // Lisboa
  { specialtyKey: "generalPractice", cityIdx: 5, langs: ["FR", "EN"] }, // Cascais
  { specialtyKey: "dentistry", cityIdx: 1, langs: ["EN", "PT"] }, // Porto
  { specialtyKey: "pediatrics", cityIdx: 3, langs: ["PT", "EN"] }, // Braga
];

export default function HeroLight2() {
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
    <section className="vphl2-hero" id="vphl2-hero-patient" aria-label={t("titleLead")}>
      <style>{`
        .vphl2-hero, .vphl2-hero * { box-sizing: border-box; }
        .vphl2-hero {
          position: relative;
          background: transparent;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          color: var(--color-dark-1);
          /* Plein écran à l’arrivée : hauteur visible moins le header sticky. */
          min-height: calc(100svh - var(--v2pat-header-h, 56px));
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(32px, 5vh, 72px) clamp(20px, 5vw, 64px);
          overflow: hidden;
          isolation: isolate;
        }
        /* ── Voile clair full-bleed « blanc doux » (z-index 0, contenu au-dessus) ──
           Blanc fort à ~0,84 + touche de dégradé teal/cobalt très pâle en haut :
           la vidéo géométrique reste en filigrane discret. */
        .vphl2-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(120% 80% at 12% -10%, rgba(var(--color-teal-rgb), 0.10), transparent 55%),
            radial-gradient(110% 90% at 95% 0%, rgba(var(--color-cobalt-rgb), 0.08), transparent 60%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.84) 45%, rgba(255, 255, 255, 0.90) 100%);
        }
        .vphl2-hero__inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1240px;
          margin-inline: auto;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }

        /* ── Colonne gauche : copy + console ── */
        .vphl2-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(11px, 1.1vw, 12.5px);
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #1E6E68;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid rgba(30, 110, 104, 0.30);
          background: rgba(var(--color-teal-rgb), 0.14);
        }
        .vphl2-hero__eyebrow::before {
          content: "";
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #1E6E68;
          box-shadow: 0 0 0 4px rgba(30, 110, 104, 0.16);
        }
        .vphl2-hero__title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          /* Borné aussi par la hauteur pour scaler sans déborder en plein écran. */
          font-size: clamp(2.55rem, min(5.6vw, 7.4vh), 4.4rem);
          line-height: 1.04;
          letter-spacing: -0.015em;
          margin: clamp(18px, 2.4vw, 30px) 0 clamp(14px, 1.8vw, 22px);
          color: var(--color-navy);
          text-wrap: balance;
        }
        .vphl2-hero__em {
          color: #1E6E68;
          font-style: italic;
          position: relative;
          white-space: nowrap;
        }
        .vphl2-hero__em::after {
          content: "";
          position: absolute;
          left: 2%; right: 2%;
          bottom: 0.04em;
          height: 0.12em;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(30, 110, 104, 0), rgba(30, 110, 104, 0.55), rgba(30, 110, 104, 0));
          transform: scaleX(0);
          transform-origin: left center;
          animation: vphl2-underline 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.65s forwards;
        }
        @keyframes vphl2-underline { to { transform: scaleX(1); } }
        .vphl2-hero__subhead {
          font-size: clamp(15px, 1.45vw, 18px);
          line-height: 1.6;
          color: rgba(var(--color-navy-rgb), 0.78);
          max-width: 36em;
          margin: 0 0 clamp(26px, 3vw, 38px);
        }

        /* ── Console de recherche (glass clair) ── */
        .vphl2-search {
          position: relative;
          padding: clamp(18px, 2.2vw, 26px);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(var(--color-navy-rgb), 0.12);
          backdrop-filter: blur(16px) saturate(1.15);
          -webkit-backdrop-filter: blur(16px) saturate(1.15);
          box-shadow:
            0 30px 70px -28px rgba(var(--color-navy-rgb), 0.30),
            0 2px 8px -4px rgba(var(--color-navy-rgb), 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.85);
        }
        .vphl2-search__field-label {
          display: block;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(var(--color-navy-rgb), 0.62);
          margin-bottom: 8px;
        }
        .vphl2-search__main {
          position: relative;
          margin-bottom: 16px;
        }
        .vphl2-search__icon {
          position: absolute;
          left: 18px;
          top: calc(50% + 13px);
          transform: translateY(-50%);
          color: #1E6E68;
          font-size: 15px;
          pointer-events: none;
        }
        .vphl2-search__input {
          width: 100%;
          height: 56px;
          padding: 0 18px 0 46px;
          border-radius: 14px;
          border: 1.5px solid rgba(var(--color-navy-rgb), 0.16);
          background: rgba(255, 255, 255, 0.92);
          color: var(--color-dark-1);
          font-family: inherit;
          font-size: 16px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .vphl2-search__input::placeholder { color: rgba(var(--color-navy-rgb), 0.5); }
        .vphl2-search__input:focus {
          outline: none;
          border-color: #1E6E68;
          background: #fff;
          box-shadow:
            0 0 0 4px rgba(var(--color-teal-rgb), 0.30),
            0 0 24px rgba(var(--color-teal-rgb), 0.28);
        }
        .vphl2-search__row {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) auto auto;
          gap: 14px;
          align-items: end;
        }
        .vphl2-search__select {
          width: 100%;
          height: 50px;
          padding: 0 14px;
          border-radius: 12px;
          border: 1.5px solid rgba(var(--color-navy-rgb), 0.16);
          background: rgba(255, 255, 255, 0.92);
          color: var(--color-dark-1);
          font-family: inherit;
          font-size: 14.5px;
          cursor: pointer;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .vphl2-search__select option { color: var(--color-dark-1); }
        .vphl2-search__select:focus {
          outline: none;
          border-color: #1E6E68;
          box-shadow: 0 0 0 3px rgba(var(--color-teal-rgb), 0.28);
        }
        .vphl2-seg {
          display: inline-flex;
          padding: 4px;
          gap: 2px;
          border-radius: 12px;
          border: 1.5px solid rgba(var(--color-navy-rgb), 0.16);
          background: rgba(var(--color-navy-rgb), 0.04);
          height: 50px;
        }
        .vphl2-seg__btn {
          min-width: 44px;
          padding: 0 12px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: rgba(var(--color-navy-rgb), 0.66);
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.22s ease, color 0.22s ease, transform 0.18s ease;
        }
        .vphl2-seg__btn:hover { color: var(--color-navy); }
        .vphl2-seg__btn.is-active {
          background: #1E6E68;
          color: #fff;
          box-shadow: 0 4px 14px -4px rgba(30, 110, 104, 0.55);
        }
        .vphl2-search__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          height: 50px;
          padding: 0 26px;
          border: 0;
          border-radius: 12px;
          background: linear-gradient(135deg, #1E6E68, var(--color-mint));
          color: #fff;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 700;
          letter-spacing: 0.01em;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 12px 28px -10px rgba(30, 110, 104, 0.55);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .vphl2-search__cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
          box-shadow: 0 16px 34px -10px rgba(30, 110, 104, 0.65);
        }
        .vphl2-search__cta svg { width: 16px; height: 16px; }
        .vphl2-search__trust {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid rgba(var(--color-navy-rgb), 0.12);
        }
        .vphl2-search__trust span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(var(--color-navy-rgb), 0.78);
        }
        .vphl2-search__trust svg { width: 14px; height: 14px; color: #1E6E68; flex-shrink: 0; }

        /* ── Colonne droite : carte / résultats ── */
        .vphl2-hero__media {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .vphl2-hero__float {
          width: 100%;
          max-width: clamp(360px, 32vw, 420px);
          animation: vphl2-levitate 6.5s ease-in-out infinite;
        }
        @keyframes vphl2-levitate {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .vphl2-hero__media .da-record {
          background: rgba(255, 255, 255, 0.86) !important;
          border: 1px solid rgba(var(--color-navy-rgb), 0.12) !important;
          backdrop-filter: blur(18px) saturate(1.1);
          -webkit-backdrop-filter: blur(18px) saturate(1.1);
          box-shadow: 0 36px 80px -30px rgba(var(--color-navy-rgb), 0.35) !important;
          color: var(--color-dark-1) !important;
        }
        .vphl2-hero__media .da-record__name { color: var(--color-navy) !important; }
        .vphl2-hero__media .da-record__meta,
        .vphl2-hero__media .da-record__langs-label { color: rgba(var(--color-navy-rgb), 0.66) !important; }
        .vphl2-hero__media .da-record__verified { color: #1E6E68 !important; }
        .vphl2-hero__media .da-record__mono {
          background: rgba(var(--color-teal-rgb), 0.16) !important;
          color: #1E6E68 !important;
        }
        .vphl2-hero__media .da-lang-chip {
          background: rgba(var(--color-navy-rgb), 0.06) !important;
          color: rgba(var(--color-navy-rgb), 0.62) !important;
          border-color: rgba(var(--color-navy-rgb), 0.14) !important;
        }
        .vphl2-hero__media .da-lang-chip.is-match {
          background: rgba(var(--color-teal-rgb), 0.20) !important;
          color: #1E6E68 !important;
          border-color: rgba(30, 110, 104, 0.40) !important;
        }
        .vphl2-hero__media .da-record__badge {
          background: rgba(var(--color-navy-rgb), 0.10) !important;
          color: rgba(var(--color-navy-rgb), 0.80) !important;
        }

        .vphl2-results {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .vphl2-results__head {
          font-size: 13px;
          font-weight: 700;
          color: rgba(var(--color-navy-rgb), 0.82);
          margin: 0 2px;
        }
        .vphl2-seeall {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          padding: 10px 4px;
          color: #1E6E68;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: gap 0.2s ease, color 0.2s ease;
        }
        .vphl2-seeall:hover { gap: 13px; color: var(--color-mint); }
        .vphl2-seeall svg { width: 15px; height: 15px; }

        /* Carte compacte mobile (avant recherche) */
        .vphl2-chip { display: none; }
        .vphl2-mobile { display: none; }

        /* ── Reveal en cascade au chargement ── */
        .vphl2-reveal {
          opacity: 0;
          transform: translateY(18px);
          animation: vphl2-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .vphl2-d1 { animation-delay: 0.05s; }
        .vphl2-d2 { animation-delay: 0.16s; }
        .vphl2-d3 { animation-delay: 0.27s; }
        .vphl2-d4 { animation-delay: 0.38s; }
        .vphl2-d5 { animation-delay: 0.5s; }
        @keyframes vphl2-rise { to { opacity: 1; transform: translateY(0); } }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          /* Empilement console + carte : on relâche la pleine hauteur pour
             éviter un grand vide / un débordement, empilement naturel. */
          .vphl2-hero {
            min-height: auto;
            justify-content: flex-start;
            padding: clamp(40px, 7vw, 72px) clamp(20px, 5vw, 64px);
          }
          .vphl2-hero__inner { grid-template-columns: 1fr; gap: 36px; }
          .vphl2-hero__media { display: none; }
          .vphl2-mobile { display: block; margin-top: 28px; }
          .vphl2-mobile .vphl2-results { max-width: 100%; }
          .vphl2-chip {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 16px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.78);
            border: 1px solid rgba(var(--color-navy-rgb), 0.12);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            box-shadow: 0 12px 28px -16px rgba(var(--color-navy-rgb), 0.28);
          }
          .vphl2-chip__mono {
            display: flex; align-items: center; justify-content: center;
            width: 44px; height: 44px; flex-shrink: 0;
            border-radius: 12px;
            background: rgba(var(--color-teal-rgb), 0.16);
            color: #1E6E68;
            font-size: 20px;
          }
          .vphl2-chip__title { margin: 0; font-size: 14.5px; font-weight: 600; color: var(--color-navy); }
          .vphl2-chip__sub { margin: 2px 0 0; font-size: 12.5px; color: rgba(var(--color-navy-rgb), 0.62); }
          .vphl2-chip__check { margin-left: auto; color: #1E6E68; font-size: 18px; }
        }
        @media (max-width: 600px) {
          .vphl2-search__row { grid-template-columns: 1fr; }
          .vphl2-search__cta { width: 100%; }
          .vphl2-seg { width: 100%; justify-content: space-between; }
          .vphl2-seg__btn { flex: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vphl2-hero__em::after,
          .vphl2-hero__float,
          .vphl2-reveal {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div className="vphl2-hero__inner">
        {/* GAUCHE, copy + console de recherche */}
        <div>
          <span className="vphl2-hero__eyebrow vphl2-reveal vphl2-d1">PT · FR · EN</span>
          <h1 className="vphl2-hero__title vphl2-reveal vphl2-d2">
            {t("titleLead")}{" "}
            <span className="vphl2-hero__em">{t("titleEmphasis")}</span>
          </h1>
          <p className="vphl2-hero__subhead vphl2-reveal vphl2-d3">{t("subhead")}</p>

          <form
            className="vphl2-search vphl2-reveal vphl2-d4"
            onSubmit={handleSubmit}
            role="search"
          >
            <div className="vphl2-search__main">
              <label htmlFor="vphl2-specialty" className="vphl2-search__field-label">
                {ts("specialtyLabel")}
              </label>
              <i className="fas fa-search vphl2-search__icon" aria-hidden="true"></i>
              <input
                id="vphl2-specialty"
                type="text"
                className="vphl2-search__input"
                placeholder={placeholder}
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="vphl2-search__row">
              <div>
                <label htmlFor="vphl2-city" className="vphl2-search__field-label">
                  {ts("cityLabel")}
                </label>
                <select
                  id="vphl2-city"
                  className="vphl2-search__select"
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
                <span className="vphl2-search__field-label">{ts("languageLabel")}</span>
                <div className="vphl2-seg" role="group" aria-label={ts("languageLabel")}>
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`vphl2-seg__btn${lang === l ? " is-active" : ""}`}
                      aria-pressed={lang === l}
                      onClick={() => setLang(l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="vphl2-search__cta">
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
            <div className="vphl2-search__trust">
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
          <div className="vphl2-mobile">
            {searched ? (
              <div className="vphl2-results">
                <p className="vphl2-results__head">{ts("resultsHead")}</p>
                {results.map((r, i) => (
                  <VerifiedRecordCard key={`m-${r.specialty}-${i}`} {...r} illustrative />
                ))}
                <a className="vphl2-seeall" href={seeAllHref}>
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
              <div className="vphl2-chip" aria-hidden="true">
                <div className="vphl2-chip__mono">
                  <i className={exampleCard.icon}></i>
                </div>
                <div>
                  <p className="vphl2-chip__title">{exampleCard.specialty}</p>
                  <p className="vphl2-chip__sub">
                    {exampleCard.city} · {exampleCard.languages.join(" · ")}
                  </p>
                </div>
                <i className="fas fa-check-circle vphl2-chip__check"></i>
              </div>
            )}
          </div>
        </div>

        {/* DROITE, carte profil vérifié / résultats (desktop) */}
        <div className="vphl2-hero__media vphl2-reveal vphl2-d5" aria-label={ts("resultsHead")}>
          {searched ? (
            <div className="vphl2-results">
              <p className="vphl2-results__head">{ts("resultsHead")}</p>
              {results.map((r, i) => (
                <VerifiedRecordCard key={`${r.specialty}-${i}`} {...r} illustrative />
              ))}
              <a className="vphl2-seeall" href={seeAllHref}>
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
            <div className="vphl2-hero__float">
              <VerifiedRecordCard {...exampleCard} illustrative />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
