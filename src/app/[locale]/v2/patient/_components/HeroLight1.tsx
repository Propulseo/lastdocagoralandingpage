"use client";
import { useMemo, useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTypewriter } from "@/lib/useTypewriter";
import { SPECIALTY_ICON, searchLoginUrl } from "@/lib/specialties";
import VerifiedRecordCard, { type Lang } from "@/components/home/VerifiedRecordCard";

const LANGS: Lang[] = ["PT", "FR", "EN"];

/** Teal lisible sur fond clair (AA), le teal de marque (#67CBC7) est trop pâle
 *  pour du texte sur blanc, on bascule sur teal-ink pour titres/icônes/accents. */
const TEAL_INK = "#1E6E68";

/** Structural meta for the cycling example, index-aligned with the
 *  i18n `search.examples` trilingual query strings (réutilise les clés de Hero). */
const EXAMPLE_META: { specialtyKey: string; cityIdx: number; langs: Lang[] }[] = [
  { specialtyKey: "dermatology", cityIdx: 0, langs: ["PT", "FR"] }, // Lisboa
  { specialtyKey: "generalPractice", cityIdx: 5, langs: ["FR", "EN"] }, // Cascais
  { specialtyKey: "dentistry", cityIdx: 1, langs: ["EN", "PT"] }, // Porto
  { specialtyKey: "pediatrics", cityIdx: 3, langs: ["PT", "EN"] }, // Braga
];

export default function HeroLight1() {
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
    <section className="vphl1-hero" id="vphl1-hero-patient" aria-label={t("titleLead")}>
      <style>{`
        .vphl1-hero, .vphl1-hero * { box-sizing: border-box; }
        .vphl1-hero {
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
        }
        /* ── Voile clair MODÉRÉ full-bleed ──
           Blanc à ~0.60 + un léger mesh teal/cobalt très pâle : la vidéo
           géométrique reste NETTEMENT perceptible derrière (page = z-index 0). */
        .vphl1-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(70% 55% at 12% 8%, rgba(var(--color-teal-rgb), 0.10), transparent 60%),
            radial-gradient(60% 55% at 92% 96%, rgba(var(--color-cobalt-rgb), 0.10), transparent 62%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.62) 55%, rgba(255, 255, 255, 0.60) 100%);
        }
        .vphl1-hero__inner {
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
        .vphl1-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(11px, 1.1vw, 12.5px);
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${TEAL_INK};
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid rgba(var(--color-teal-rgb), 0.45);
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 6px 18px -10px rgba(var(--color-navy-rgb), 0.35);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .vphl1-hero__eyebrow::before {
          content: "";
          width: 7px; height: 7px;
          border-radius: 50%;
          background: ${TEAL_INK};
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.22);
        }
        .vphl1-hero__title {
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
        .vphl1-hero__em {
          color: ${TEAL_INK};
          font-style: italic;
          position: relative;
          white-space: nowrap;
        }
        .vphl1-hero__em::after {
          content: "";
          position: absolute;
          left: 2%; right: 2%;
          bottom: 0.04em;
          height: 0.12em;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(var(--color-teal-rgb), 0), rgba(var(--color-mint-rgb), 0.9), rgba(var(--color-teal-rgb), 0));
          transform: scaleX(0);
          transform-origin: left center;
          animation: vphl1-underline 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.65s forwards;
        }
        @keyframes vphl1-underline { to { transform: scaleX(1); } }
        .vphl1-hero__subhead {
          font-size: clamp(15px, 1.45vw, 18px);
          line-height: 1.6;
          color: rgba(var(--color-navy-rgb), 0.86);
          max-width: 36em;
          margin: 0 0 clamp(26px, 3vw, 38px);
        }

        /* ── Console de recherche (glass CLAIR) ── */
        .vphl1-search {
          position: relative;
          padding: clamp(18px, 2.2vw, 26px);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(var(--color-navy-rgb), 0.12);
          backdrop-filter: blur(16px) saturate(1.2);
          -webkit-backdrop-filter: blur(16px) saturate(1.2);
          box-shadow:
            0 30px 70px -28px rgba(var(--color-navy-rgb), 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        .vphl1-search__field-label {
          display: block;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(var(--color-navy-rgb), 0.66);
          margin-bottom: 8px;
        }
        .vphl1-search__main {
          position: relative;
          margin-bottom: 16px;
        }
        .vphl1-search__icon {
          position: absolute;
          left: 18px;
          top: calc(50% + 13px);
          transform: translateY(-50%);
          color: ${TEAL_INK};
          font-size: 15px;
          pointer-events: none;
        }
        .vphl1-search__input {
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
        .vphl1-search__input::placeholder { color: rgba(var(--color-navy-rgb), 0.5); }
        .vphl1-search__input:focus {
          outline: none;
          border-color: ${TEAL_INK};
          background: #fff;
          box-shadow:
            0 0 0 4px rgba(var(--color-teal-rgb), 0.32),
            0 0 26px rgba(var(--color-teal-rgb), 0.28);
        }
        .vphl1-search__row {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) auto auto;
          gap: 14px;
          align-items: end;
        }
        .vphl1-search__select {
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
        .vphl1-search__select option { color: var(--color-dark-1); }
        .vphl1-search__select:focus {
          outline: none;
          border-color: ${TEAL_INK};
          box-shadow: 0 0 0 3px rgba(var(--color-teal-rgb), 0.3);
        }
        .vphl1-seg {
          display: inline-flex;
          padding: 4px;
          gap: 2px;
          border-radius: 12px;
          border: 1.5px solid rgba(var(--color-navy-rgb), 0.16);
          background: rgba(255, 255, 255, 0.92);
          height: 50px;
        }
        .vphl1-seg__btn {
          min-width: 44px;
          padding: 0 12px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: rgba(var(--color-navy-rgb), 0.62);
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.22s ease, color 0.22s ease, transform 0.18s ease;
        }
        .vphl1-seg__btn:hover { color: var(--color-navy); }
        .vphl1-seg__btn.is-active {
          background: ${TEAL_INK};
          color: #fff;
          box-shadow: 0 4px 14px -4px rgba(var(--color-mint-rgb), 0.7);
        }
        .vphl1-search__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          height: 50px;
          padding: 0 26px;
          border: 0;
          border-radius: 12px;
          background: linear-gradient(135deg, ${TEAL_INK}, var(--color-mint));
          color: #fff;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 700;
          letter-spacing: 0.01em;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 12px 28px -10px rgba(var(--color-mint-rgb), 0.7);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .vphl1-search__cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
          box-shadow: 0 16px 34px -10px rgba(var(--color-mint-rgb), 0.8);
        }
        .vphl1-search__cta svg { width: 16px; height: 16px; }
        .vphl1-search__trust {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid rgba(var(--color-navy-rgb), 0.12);
        }
        .vphl1-search__trust span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(var(--color-navy-rgb), 0.78);
        }
        .vphl1-search__trust svg { width: 14px; height: 14px; color: ${TEAL_INK}; flex-shrink: 0; }

        /* ── Colonne droite : carte / résultats ── */
        .vphl1-hero__media {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .vphl1-hero__float {
          width: 100%;
          max-width: clamp(360px, 32vw, 420px);
          animation: vphl1-levitate 6.5s ease-in-out infinite;
        }
        @keyframes vphl1-levitate {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        /* VerifiedRecordCard en CLAIR */
        .vphl1-hero__media .da-record {
          background: rgba(255, 255, 255, 0.82) !important;
          border: 1px solid rgba(var(--color-navy-rgb), 0.12) !important;
          backdrop-filter: blur(18px) saturate(1.15);
          -webkit-backdrop-filter: blur(18px) saturate(1.15);
          box-shadow: 0 36px 80px -30px rgba(var(--color-navy-rgb), 0.45) !important;
          color: var(--color-dark-1) !important;
        }
        .vphl1-hero__media .da-record__name { color: var(--color-navy) !important; }
        .vphl1-hero__media .da-record__meta,
        .vphl1-hero__media .da-record__langs-label { color: rgba(var(--color-navy-rgb), 0.66) !important; }
        .vphl1-hero__media .da-record__verified { color: ${TEAL_INK} !important; }
        .vphl1-hero__media .da-record__mono {
          background: rgba(var(--color-teal-rgb), 0.18) !important;
          color: ${TEAL_INK} !important;
        }
        .vphl1-hero__media .da-lang-chip {
          background: rgba(var(--color-navy-rgb), 0.06) !important;
          color: rgba(var(--color-navy-rgb), 0.6) !important;
          border-color: rgba(var(--color-navy-rgb), 0.14) !important;
        }
        .vphl1-hero__media .da-lang-chip.is-match {
          background: rgba(var(--color-teal-rgb), 0.22) !important;
          color: ${TEAL_INK} !important;
          border-color: rgba(var(--color-teal-rgb), 0.45) !important;
        }
        .vphl1-hero__media .da-record__badge {
          background: rgba(var(--color-navy-rgb), 0.1) !important;
          color: rgba(var(--color-navy-rgb), 0.82) !important;
        }

        .vphl1-results {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .vphl1-results__head {
          font-size: 13px;
          font-weight: 600;
          color: rgba(var(--color-navy-rgb), 0.82);
          margin: 0 2px;
        }
        .vphl1-seeall {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          padding: 10px 4px;
          color: ${TEAL_INK};
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: gap 0.2s ease, color 0.2s ease;
        }
        .vphl1-seeall:hover { gap: 13px; color: var(--color-navy); }
        .vphl1-seeall svg { width: 15px; height: 15px; }

        /* Carte compacte mobile (avant recherche) */
        .vphl1-chip { display: none; }
        .vphl1-mobile { display: none; }

        /* ── Reveal en cascade au chargement ── */
        .vphl1-reveal {
          opacity: 0;
          transform: translateY(18px);
          animation: vphl1-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .vphl1-d1 { animation-delay: 0.05s; }
        .vphl1-d2 { animation-delay: 0.16s; }
        .vphl1-d3 { animation-delay: 0.27s; }
        .vphl1-d4 { animation-delay: 0.38s; }
        .vphl1-d5 { animation-delay: 0.5s; }
        @keyframes vphl1-rise { to { opacity: 1; transform: translateY(0); } }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          /* Empilement console + carte : on relâche la pleine hauteur pour
             éviter un grand vide / un débordement, empilement naturel. */
          .vphl1-hero {
            min-height: auto;
            justify-content: flex-start;
            padding: clamp(40px, 7vw, 72px) clamp(20px, 5vw, 64px);
          }
          .vphl1-hero__inner { grid-template-columns: 1fr; gap: 36px; }
          .vphl1-hero__media { display: none; }
          .vphl1-mobile { display: block; margin-top: 28px; }
          .vphl1-mobile .vphl1-results { max-width: 100%; }
          .vphl1-chip {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 16px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(var(--color-navy-rgb), 0.12);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            box-shadow: 0 18px 40px -24px rgba(var(--color-navy-rgb), 0.4);
          }
          .vphl1-chip__mono {
            display: flex; align-items: center; justify-content: center;
            width: 44px; height: 44px; flex-shrink: 0;
            border-radius: 12px;
            background: rgba(var(--color-teal-rgb), 0.18);
            color: ${TEAL_INK};
            font-size: 20px;
          }
          .vphl1-chip__title { margin: 0; font-size: 14.5px; font-weight: 700; color: var(--color-navy); }
          .vphl1-chip__sub { margin: 2px 0 0; font-size: 12.5px; color: rgba(var(--color-navy-rgb), 0.62); }
          .vphl1-chip__check { margin-left: auto; color: ${TEAL_INK}; font-size: 18px; }
        }
        @media (max-width: 600px) {
          .vphl1-search__row { grid-template-columns: 1fr; }
          .vphl1-search__cta { width: 100%; }
          .vphl1-seg { width: 100%; justify-content: space-between; }
          .vphl1-seg__btn { flex: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vphl1-hero__em::after,
          .vphl1-hero__float,
          .vphl1-reveal {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div className="vphl1-hero__inner">
        {/* GAUCHE, copy + console de recherche */}
        <div>
          <span className="vphl1-hero__eyebrow vphl1-reveal vphl1-d1">PT · FR · EN</span>
          <h1 className="vphl1-hero__title vphl1-reveal vphl1-d2">
            {t("titleLead")}{" "}
            <span className="vphl1-hero__em">{t("titleEmphasis")}</span>
          </h1>
          <p className="vphl1-hero__subhead vphl1-reveal vphl1-d3">{t("subhead")}</p>

          <form
            className="vphl1-search vphl1-reveal vphl1-d4"
            onSubmit={handleSubmit}
            role="search"
          >
            <div className="vphl1-search__main">
              <label htmlFor="vphl1-specialty" className="vphl1-search__field-label">
                {ts("specialtyLabel")}
              </label>
              <i className="fas fa-search vphl1-search__icon" aria-hidden="true"></i>
              <input
                id="vphl1-specialty"
                type="text"
                className="vphl1-search__input"
                placeholder={placeholder}
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="vphl1-search__row">
              <div>
                <label htmlFor="vphl1-city" className="vphl1-search__field-label">
                  {ts("cityLabel")}
                </label>
                <select
                  id="vphl1-city"
                  className="vphl1-search__select"
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
                <span className="vphl1-search__field-label">{ts("languageLabel")}</span>
                <div className="vphl1-seg" role="group" aria-label={ts("languageLabel")}>
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`vphl1-seg__btn${lang === l ? " is-active" : ""}`}
                      aria-pressed={lang === l}
                      onClick={() => setLang(l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="vphl1-search__cta">
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
            <div className="vphl1-search__trust">
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
          <div className="vphl1-mobile">
            {searched ? (
              <div className="vphl1-results">
                <p className="vphl1-results__head">{ts("resultsHead")}</p>
                {results.map((r, i) => (
                  <VerifiedRecordCard key={`m-${r.specialty}-${i}`} {...r} illustrative />
                ))}
                <a className="vphl1-seeall" href={seeAllHref}>
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
              <div className="vphl1-chip" aria-hidden="true">
                <div className="vphl1-chip__mono">
                  <i className={exampleCard.icon}></i>
                </div>
                <div>
                  <p className="vphl1-chip__title">{exampleCard.specialty}</p>
                  <p className="vphl1-chip__sub">
                    {exampleCard.city} · {exampleCard.languages.join(" · ")}
                  </p>
                </div>
                <i className="fas fa-check-circle vphl1-chip__check"></i>
              </div>
            )}
          </div>
        </div>

        {/* DROITE, carte profil vérifié / résultats (desktop) */}
        <div className="vphl1-hero__media vphl1-reveal vphl1-d5" aria-label={ts("resultsHead")}>
          {searched ? (
            <div className="vphl1-results">
              <p className="vphl1-results__head">{ts("resultsHead")}</p>
              {results.map((r, i) => (
                <VerifiedRecordCard key={`${r.specialty}-${i}`} {...r} illustrative />
              ))}
              <a className="vphl1-seeall" href={seeAllHref}>
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
            <div className="vphl1-hero__float">
              <VerifiedRecordCard {...exampleCard} illustrative />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
