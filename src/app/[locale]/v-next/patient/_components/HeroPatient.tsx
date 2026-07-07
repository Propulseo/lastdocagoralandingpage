"use client";

import { useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTypewriter } from "@/lib/useTypewriter";
import { SPECIALTY_ICON, searchLoginUrl } from "@/lib/specialties";
import VerifiedRecordCard, { type Lang } from "@/components/home/VerifiedRecordCard";

const LANGS: Lang[] = ["PT", "FR", "EN"];

/** Index-aligned with i18n `search.examples` — drives the living record card. */
const EXAMPLE_META: { specialtyKey: string; cityIdx: number; langs: Lang[] }[] = [
  { specialtyKey: "dermatology", cityIdx: 0, langs: ["PT", "FR"] },
  { specialtyKey: "generalPractice", cityIdx: 5, langs: ["FR", "EN"] },
  { specialtyKey: "dentistry", cityIdx: 1, langs: ["EN", "PT"] },
  { specialtyKey: "pediatrics", cityIdx: 3, langs: ["PT", "EN"] },
];

export default function HeroPatient() {
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
  const [emptyError, setEmptyError] = useState(false);

  const meta = EXAMPLE_META[index % EXAMPLE_META.length];
  const placeholder = typed || examples[0] || "";

  const exampleCard = {
    icon: SPECIALTY_ICON[meta.specialtyKey] ?? "icon-doctor",
    specialty: tspec(`items.${meta.specialtyKey}.title`),
    city: cities[meta.cityIdx] ?? cities[0],
    languages: meta.langs,
  };

  const seeAllHref = searchLoginUrl({
    q: specialty || undefined,
    city: city || undefined,
    lang,
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!specialty.trim()) {
      setEmptyError(true);
      return;
    }
    setEmptyError(false);
    window.location.href = seeAllHref;
  }

  function handleSpecialtyChange(value: string) {
    setSpecialty(value);
    if (emptyError && value.trim()) setEmptyError(false);
  }

  return (
    <section className="vnph" id="vnp-hero" aria-label={t("titleLead")}>
      <style>{`
        .vnph {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          min-height: calc(100svh - var(--vnp-header-h, 122px));
          padding-block: clamp(48px, 7vh, 96px);
          isolation: isolate;
        }
        /* Refined light veil over the brand video (page video sits at z-index 0
           in the route; here we lay a calmer, more editorial wash). */
        .vnph__bg {
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(60% 50% at 8% 4%, rgba(var(--color-teal-rgb), 0.10), transparent 60%),
            radial-gradient(54% 50% at 96% 100%, rgba(var(--color-cobalt-rgb), 0.10), transparent 62%),
            linear-gradient(180deg, rgba(252,254,254,0.72) 0%, rgba(252,254,254,0.80) 60%, rgba(241,245,250,0.92) 100%);
        }
        .vnph__bg video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: -1;
          opacity: 0.5;
        }
        .vnph__inner {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(36px, 5vw, 80px);
          align-items: center;
          width: 100%;
        }
        /* ── Left: copy + console ── */
        .vnph__copy { max-width: 600px; }
        .vnph__eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--vnp-accent);
          padding: 7px 15px; border-radius: var(--radius-pill);
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(var(--color-teal-rgb), 0.4);
          box-shadow: 0 8px 20px -14px rgba(var(--color-navy-rgb), 0.4);
          backdrop-filter: blur(6px);
        }
        .vnph__eyebrow i { font-size: 12px; }
        .vnph__title {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(2.5rem, min(5.2vw, 6.6vh), 4.1rem);
          line-height: 1.05;
          letter-spacing: -0.018em;
          color: var(--color-navy);
          margin: clamp(16px, 2.2vw, 26px) 0 clamp(12px, 1.6vw, 18px);
          text-wrap: balance;
        }
        .vnph__title em {
          font-style: italic;
          color: var(--vnp-accent);
          position: relative;
          white-space: nowrap;
          padding-bottom: 0.04em;
        }
        .vnph__title em::after {
          content: ""; position: absolute;
          left: 1%; right: 1%; bottom: -0.02em; height: 0.1em;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(var(--color-teal-rgb),0), rgba(var(--color-mint-rgb),0.9), rgba(var(--color-teal-rgb),0));
          transform: scaleX(0); transform-origin: left center;
          animation: vnph-underline 0.9s var(--vnp-ease) 0.6s forwards;
        }
        @keyframes vnph-underline { to { transform: scaleX(1); } }
        .vnph__lede {
          font-size: clamp(15px, 1.35vw, 18px);
          line-height: 1.6;
          color: var(--vnp-body);
          max-width: 40em;
          margin: 0 0 clamp(24px, 3vw, 34px);
        }

        /* ── Search console (refined glass) ── */
        .vnph__console {
          padding: clamp(18px, 2.2vw, 26px);
          border-radius: var(--vnp-radius);
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
          backdrop-filter: blur(18px) saturate(1.2);
          -webkit-backdrop-filter: blur(18px) saturate(1.2);
          box-shadow: 0 32px 70px -30px rgba(var(--color-navy-rgb), 0.42),
            inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .vnph__label {
          display: block; font-size: 11.5px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: var(--vnp-muted); margin-bottom: 8px;
        }
        .vnph__main { position: relative; margin-bottom: 14px; }
        .vnph__search-icon {
          position: absolute; left: 18px; top: calc(50% + 13px);
          transform: translateY(-50%); color: var(--vnp-accent);
          font-size: 15px; pointer-events: none;
        }
        .vnph__input {
          width: 100%; height: 56px; padding: 0 18px 0 46px;
          border-radius: 14px; border: 1.5px solid rgba(var(--color-navy-rgb), 0.16);
          background: rgba(255,255,255,0.94); color: var(--color-dark-1);
          font-family: inherit; font-size: 16px;
          transition: border-color 0.25s var(--vnp-ease), box-shadow 0.25s var(--vnp-ease);
        }
        .vnph__input::placeholder { color: rgba(var(--color-navy-rgb), 0.5); }
        .vnph__input:focus {
          outline: none; border-color: var(--vnp-accent); background: #fff;
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.28);
        }
        .vnph__input.has-error {
          border-color: #c0392b; box-shadow: 0 0 0 3px rgba(192,57,43,0.18);
        }
        .vnph__hint { font-size: 13px; font-weight: 600; color: #c0392b; margin: 6px 0 0; }
        .vnph__row {
          display: grid; grid-template-columns: minmax(0, 1.2fr) auto auto;
          gap: 12px; align-items: end;
        }
        .vnph__select {
          width: 100%; height: 50px; padding: 0 14px; border-radius: 12px;
          border: 1.5px solid rgba(var(--color-navy-rgb), 0.16);
          background: rgba(255,255,255,0.94); color: var(--color-dark-1);
          font-family: inherit; font-size: 14.5px; cursor: pointer;
          transition: border-color 0.25s var(--vnp-ease), box-shadow 0.25s var(--vnp-ease);
        }
        .vnph__select:focus { outline: none; border-color: var(--vnp-accent); box-shadow: 0 0 0 3px rgba(var(--color-teal-rgb),0.26); }
        .vnph__seg {
          display: inline-flex; padding: 4px; gap: 2px; height: 50px;
          border-radius: 12px; border: 1.5px solid rgba(var(--color-navy-rgb),0.16);
          background: rgba(255,255,255,0.94);
        }
        .vnph__seg-btn {
          min-width: 44px; padding: 0 12px; border: 0; border-radius: 8px;
          background: transparent; color: var(--vnp-muted);
          font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer;
          transition: background 0.22s var(--vnp-ease), color 0.22s var(--vnp-ease), transform 0.18s var(--vnp-ease);
        }
        .vnph__seg-btn:hover { color: var(--color-navy); transform: scale(1.05); }
        .vnph__seg-btn.is-active {
          background: var(--vnp-accent); color: #fff;
          box-shadow: 0 4px 14px -4px rgba(var(--color-mint-rgb), 0.7);
        }
        .vnph__cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          height: 50px; padding: 0 26px; border: 0; border-radius: 12px;
          background: linear-gradient(135deg, var(--vnp-accent), var(--color-mint));
          color: #fff; font-family: inherit; font-size: 14.5px; font-weight: 700;
          cursor: pointer; white-space: nowrap;
          box-shadow: 0 12px 28px -10px rgba(var(--color-mint-rgb), 0.7);
          transition: transform 0.2s var(--vnp-ease), box-shadow 0.2s var(--vnp-ease), filter 0.2s var(--vnp-ease);
        }
        .vnph__cta:hover { transform: translateY(-2px); filter: brightness(1.04); }
        .vnph__cta:active { transform: translateY(0); }
        .vnph__cta svg { width: 16px; height: 16px; }
        .vnph__trust {
          display: flex; flex-wrap: wrap; gap: 18px;
          margin-top: 16px; padding-top: 14px;
          border-top: 1px solid rgba(var(--color-navy-rgb), 0.12);
        }
        .vnph__trust span {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12.5px; font-weight: 600; color: var(--vnp-body);
        }
        .vnph__trust svg { width: 14px; height: 14px; color: var(--vnp-accent); flex-shrink: 0; }

        /* ── Right: living verified record card on a soft stage ── */
        .vnph__stage {
          position: relative;
          display: flex; justify-content: center;
        }
        .vnph__stage::before {
          content: ""; position: absolute; inset: -8% -6% -8% -6%;
          border-radius: 36px; z-index: -1;
          background: radial-gradient(70% 70% at 50% 30%, rgba(var(--color-teal-rgb),0.16), transparent 70%);
        }
        .vnph__float {
          width: 100%; max-width: 440px;
          animation: vnph-float 6.5s ease-in-out infinite;
        }
        @keyframes vnph-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

        /* Re-skin the shared VerifiedRecordCard to the light elevated palette */
        .vnph__float .da-record {
          background: rgba(255,255,255,0.86) !important;
          border: 1px solid rgba(var(--color-navy-rgb), 0.1) !important;
          backdrop-filter: blur(18px) saturate(1.15);
          box-shadow: 0 40px 90px -34px rgba(var(--color-navy-rgb), 0.46) !important;
          color: var(--color-dark-1) !important;
        }
        .vnph__float .da-record__name { color: var(--color-navy) !important; }
        .vnph__float .da-record__meta,
        .vnph__float .da-record__langs-label { color: var(--vnp-muted) !important; }
        .vnph__float .da-record__verified { color: var(--vnp-accent) !important; }
        .vnph__float .da-record__mono {
          background: rgba(var(--color-teal-rgb), 0.18) !important;
          color: var(--vnp-accent) !important;
        }
        .vnph__float .da-lang-chip.is-match {
          background: rgba(var(--color-teal-rgb), 0.22) !important;
          color: var(--vnp-accent) !important;
          border-color: rgba(var(--color-teal-rgb), 0.45) !important;
        }

        /* Load-in cascade */
        .vnph-rise { opacity: 0; transform: translateY(18px); animation: vnph-rise 0.7s var(--vnp-ease) forwards; }
        .vnph-d1 { animation-delay: 0.05s; }
        .vnph-d2 { animation-delay: 0.15s; }
        .vnph-d3 { animation-delay: 0.25s; }
        .vnph-d4 { animation-delay: 0.36s; }
        .vnph-d5 { animation-delay: 0.48s; }
        @keyframes vnph-rise { to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 980px) {
          .vnph { min-height: auto; }
          .vnph__inner { grid-template-columns: 1fr; gap: 40px; }
          .vnph__stage { display: none; }
          .vnph__copy { max-width: none; }
        }
        @media (max-width: 600px) {
          .vnph__row { grid-template-columns: 1fr; }
          .vnph__cta, .vnph__seg { width: 100%; }
          .vnph__seg { justify-content: space-between; }
          .vnph__seg-btn { flex: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vnph__title em::after, .vnph__float, .vnph-rise {
            opacity: 1 !important; transform: none !important; animation: none !important;
          }
        }
      `}</style>

      <div className="vnph__bg" aria-hidden="true">
        <video autoPlay muted loop playsInline poster="">
          <source src="/assets/video/hero-client-1.webm" type="video/webm" />
          <source src="/assets/video/hero-client-1.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="vnp-shell">
        <div className="vnph__inner">
          {/* LEFT */}
          <div className="vnph__copy">
            <span className="vnph__eyebrow vnph-rise vnph-d1">
              <i className="fas fa-globe-europe" aria-hidden="true" />
              PT &middot; FR &middot; EN
            </span>
            <h1 className="vnph__title vnph-rise vnph-d2">
              {t("titleLead")} <em>{t("titleEmphasis")}</em>
            </h1>
            <p className="vnph__lede vnph-rise vnph-d3">{t("subhead")}</p>

            <form className="vnph__console vnph-rise vnph-d4" onSubmit={handleSubmit} role="search">
              <div className="vnph__main">
                <label htmlFor="vnph-specialty" className="vnph__label">
                  {ts("specialtyLabel")}
                </label>
                <i className="fas fa-search vnph__search-icon" aria-hidden="true" />
                <input
                  id="vnph-specialty"
                  type="text"
                  className={`vnph__input${emptyError ? " has-error" : ""}`}
                  placeholder={placeholder}
                  value={specialty}
                  onChange={(e) => handleSpecialtyChange(e.target.value)}
                  autoComplete="off"
                  aria-invalid={emptyError ? true : undefined}
                  aria-describedby={emptyError ? "vnph-hint" : undefined}
                />
                {emptyError && (
                  <p id="vnph-hint" className="vnph__hint" role="alert">
                    {ts("emptyHint")}
                  </p>
                )}
              </div>
              <div className="vnph__row">
                <div>
                  <label htmlFor="vnph-city" className="vnph__label">{ts("cityLabel")}</label>
                  <select
                    id="vnph-city"
                    className="vnph__select"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">{ts("cityAll")}</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="vnph__label">{ts("languageLabel")}</span>
                  <div className="vnph__seg" role="group" aria-label={ts("languageLabel")}>
                    {LANGS.map((l) => (
                      <button
                        key={l}
                        type="button"
                        className={`vnph__seg-btn${lang === l ? " is-active" : ""}`}
                        aria-pressed={lang === l}
                        onClick={() => setLang(l)}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="vnph__cta">
                  <span>{ts("cta")}</span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="vnph__trust">
                <span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {ts("trustVerified")}
                </span>
                <span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
                    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                  </svg>
                  {ts("trustLanguages")}
                </span>
                <span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 8.5l8 8a2 2 0 002.8 0l4.7-4.7a2 2 0 000-2.8L11 1.5H5A2 2 0 003 3.5v5z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
                    <circle cx="7" cy="6" r="1.1" fill="currentColor" />
                  </svg>
                  {ts("trustFree")}
                </span>
              </div>
            </form>
          </div>

          {/* RIGHT */}
          <div className="vnph__stage vnph-rise vnph-d5" aria-hidden="false">
            <div className="vnph__float">
              <VerifiedRecordCard {...exampleCard} illustrative />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
