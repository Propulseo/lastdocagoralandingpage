import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Option = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  visual: ReactNode;
};

export default async function AboutVisualPreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "aboutVisualPreview" });
  const about = await getTranslations({ locale, namespace: "about" });

  const searchVisual = {
    query: t("visual.search.query"),
    specialty: t("visual.search.specialty"),
    city: t("visual.search.city"),
    language: t("visual.search.language"),
    resultCount: t("visual.search.resultCount"),
    verified: t("visual.common.verified"),
    free: t("visual.common.free"),
    multilingual: t("visual.common.multilingual"),
    profileOneName: t("visual.search.profileOneName"),
    profileOneMeta: t("visual.search.profileOneMeta"),
    profileTwoName: t("visual.search.profileTwoName"),
    profileTwoMeta: t("visual.search.profileTwoMeta"),
    mapLabel: t("visual.search.mapLabel"),
    slot: t("visual.search.slot"),
  };

  const mapVisual = {
    coverage: t("visual.map.coverage"),
    lisbon: t("visual.map.lisbon"),
    porto: t("visual.map.porto"),
    cascais: t("visual.map.cascais"),
    braga: t("visual.map.braga"),
    specialties: t("visual.map.specialties"),
    languages: t("visual.common.multilingual"),
    verified: t("visual.common.verified"),
    free: t("visual.common.free"),
  };

  const profileVisual = {
    title: t("visual.profiles.title"),
    verified: t("visual.common.verified"),
    languages: t("visual.common.multilingual"),
    profileOneName: t("visual.profiles.profileOneName"),
    profileOneMeta: t("visual.profiles.profileOneMeta"),
    profileTwoName: t("visual.profiles.profileTwoName"),
    profileTwoMeta: t("visual.profiles.profileTwoMeta"),
    profileThreeName: t("visual.profiles.profileThreeName"),
    profileThreeMeta: t("visual.profiles.profileThreeMeta"),
    compare: t("visual.profiles.compare"),
    filterOne: t("visual.profiles.filterOne"),
    filterTwo: t("visual.profiles.filterTwo"),
    filterThree: t("visual.profiles.filterThree"),
  };

  const options: Option[] = [
    {
      id: "product",
      eyebrow: t("options.product.eyebrow"),
      title: t("options.product.title"),
      body: t("options.product.body"),
      visual: <ProductSearchVisual copy={searchVisual} />,
    },
    {
      id: "map",
      eyebrow: t("options.map.eyebrow"),
      title: t("options.map.title"),
      body: t("options.map.body"),
      visual: <PortugalMapVisual copy={mapVisual} />,
    },
    {
      id: "profiles",
      eyebrow: t("options.profiles.eyebrow"),
      title: t("options.profiles.title"),
      body: t("options.profiles.body"),
      visual: <ProfileStackVisual copy={profileVisual} />,
    },
  ];

  return (
    <main className="abvp-page">
      <style>{`
        .abvp-page {
          --abvp-ink: #172447;
          --abvp-body: #53627D;
          --abvp-line: rgba(var(--color-navy-rgb), 0.12);
          --abvp-card: rgba(255, 255, 255, 0.82);
          --abvp-teal: var(--color-teal);
          --abvp-cobalt: var(--color-cobalt);
          --abvp-mint: #DDF7F4;
          background:
            radial-gradient(46% 38% at 92% 4%, rgba(var(--color-teal-rgb), 0.18), transparent 64%),
            radial-gradient(44% 38% at 0% 42%, rgba(var(--color-cobalt-rgb), 0.10), transparent 66%),
            #F7FAFD;
          color: var(--abvp-ink);
          padding: clamp(46px, 6vw, 88px) 0;
        }
        .abvp-page *, .abvp-page *::before, .abvp-page *::after { box-sizing: border-box; }
        .abvp-shell { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
        .abvp-hero {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(280px, 0.42fr);
          gap: clamp(28px, 5vw, 72px);
          align-items: end;
          margin-bottom: clamp(34px, 5vw, 64px);
        }
        .abvp-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 14px;
          color: var(--color-teal-ink);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: uppercase;
        }
        .abvp-kicker i { color: var(--abvp-teal); }
        .abvp-title {
          margin: 0;
          max-width: 780px;
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(34px, 5.2vw, 62px);
          line-height: 0.98;
          letter-spacing: 0;
          color: var(--abvp-ink);
        }
        .abvp-title em { color: var(--color-teal-ink); font-style: italic; }
        .abvp-lede {
          margin: 0;
          color: var(--abvp-body);
          font-size: clamp(15px, 1.45vw, 18px);
          line-height: 1.65;
        }
        .abvp-option {
          margin-top: clamp(28px, 4vw, 44px);
          padding: clamp(18px, 2.5vw, 28px);
          border: 1px solid var(--abvp-line);
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.66);
          box-shadow: 0 24px 70px -44px rgba(var(--color-navy-rgb), 0.38);
        }
        .abvp-option__grid {
          display: grid;
          grid-template-columns: minmax(300px, 0.96fr) minmax(0, 1.04fr);
          gap: clamp(24px, 4vw, 54px);
          align-items: center;
        }
        .abvp-option:nth-child(even) .abvp-option__grid {
          grid-template-columns: minmax(0, 1.04fr) minmax(300px, 0.96fr);
        }
        .abvp-option:nth-child(even) .abvp-option__copy { order: 2; }
        .abvp-option:nth-child(even) .abvp-visual { order: 1; }
        .abvp-option__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 13px;
          padding: 7px 11px;
          border-radius: 999px;
          background: rgba(var(--color-teal-rgb), 0.10);
          color: var(--color-teal-ink);
          font-size: 12px;
          font-weight: 800;
        }
        .abvp-option__title {
          margin: 0;
          max-width: 560px;
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(27px, 3.4vw, 42px);
          line-height: 1.06;
          letter-spacing: 0;
          color: var(--abvp-ink);
        }
        .abvp-option__body {
          margin: 16px 0 0;
          max-width: 58ch;
          color: var(--abvp-body);
          font-size: 15.5px;
          line-height: 1.72;
        }
        .abvp-option__about {
          margin-top: 22px;
          padding-top: 22px;
          border-top: 1px solid var(--abvp-line);
          color: var(--abvp-body);
          font-size: 14px;
          line-height: 1.65;
        }
        .abvp-option__about strong {
          display: block;
          margin-bottom: 8px;
          color: var(--abvp-ink);
          font-size: 14px;
        }
        .abvp-visual {
          min-height: clamp(420px, 45vw, 540px);
          border-radius: 26px;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,255,255,0.72)),
            radial-gradient(60% 60% at 20% 0%, rgba(var(--color-teal-rgb), 0.18), transparent 70%);
          border: 1px solid rgba(255, 255, 255, 0.76);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.86),
            0 30px 72px -38px rgba(var(--color-navy-rgb), 0.48);
        }
        .abvp-glow {
          position: absolute;
          inset: auto -20% -22% 14%;
          height: 48%;
          background: radial-gradient(circle, rgba(var(--color-teal-rgb), 0.22), transparent 68%);
          pointer-events: none;
        }
        .abvp-window {
          position: absolute;
          inset: 26px;
          border-radius: 22px;
          background: rgba(255,255,255,0.86);
          border: 1px solid rgba(var(--color-navy-rgb), 0.10);
          box-shadow: 0 24px 50px -36px rgba(var(--color-navy-rgb), 0.5);
        }
        .abvp-dots {
          display: flex;
          gap: 6px;
          padding: 17px 18px 0;
        }
        .abvp-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(var(--color-navy-rgb), 0.18);
        }
        .abvp-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-width: 0;
          padding: 8px 11px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid rgba(var(--color-navy-rgb), 0.10);
          color: var(--abvp-ink);
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 10px 22px -18px rgba(var(--color-navy-rgb), 0.55);
        }
        .abvp-chip i { color: var(--abvp-teal); }
        .abvp-chip--dark {
          color: #fff;
          background: linear-gradient(135deg, var(--color-navy), #284579);
          border-color: rgba(255,255,255,0.20);
        }
        .abvp-chip--dark i { color: var(--abvp-teal); }

        .abvp-product .abvp-window { padding: 42px 22px 22px; }
        .abvp-searchbar {
          display: grid;
          grid-template-columns: 1.1fr 0.72fr 0.58fr;
          gap: 9px;
          padding: 10px;
          border-radius: 18px;
          background: #F4F8FB;
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
        }
        .abvp-searchbar__item {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          padding: 12px 12px;
          border-radius: 12px;
          background: #fff;
          color: var(--abvp-ink);
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 10px 18px -17px rgba(var(--color-navy-rgb), 0.55);
        }
        .abvp-searchbar__item i { color: var(--abvp-teal); }
        .abvp-searchbar__item span {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .abvp-results {
          display: grid;
          grid-template-columns: minmax(0, 1.04fr) minmax(145px, 0.76fr);
          gap: 14px;
          margin-top: 16px;
        }
        .abvp-result-list { display: flex; flex-direction: column; gap: 10px; }
        .abvp-result-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: var(--abvp-body);
          font-size: 12px;
          font-weight: 800;
        }
        .abvp-profile {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 10px;
          padding: 12px;
          border-radius: 16px;
          background: #fff;
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
        }
        .abvp-avatar {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: linear-gradient(135deg, var(--color-teal), var(--color-cobalt));
          font-weight: 900;
        }
        .abvp-profile strong {
          display: block;
          color: var(--abvp-ink);
          font-size: 13px;
          line-height: 1.2;
        }
        .abvp-profile small {
          display: block;
          margin-top: 4px;
          color: var(--abvp-body);
          font-size: 11px;
          line-height: 1.25;
        }
        .abvp-mini-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 9px; }
        .abvp-mini-tags span {
          padding: 5px 7px;
          border-radius: 999px;
          background: rgba(var(--color-teal-rgb), 0.10);
          color: var(--color-teal-ink);
          font-size: 10px;
          font-weight: 900;
        }
        .abvp-map-card {
          position: relative;
          min-height: 216px;
          border-radius: 18px;
          background:
            linear-gradient(135deg, rgba(var(--color-navy-rgb), 0.08), rgba(var(--color-teal-rgb), 0.08)),
            repeating-linear-gradient(0deg, transparent 0 22px, rgba(var(--color-navy-rgb), 0.04) 23px),
            repeating-linear-gradient(90deg, transparent 0 22px, rgba(var(--color-navy-rgb), 0.04) 23px);
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
          overflow: hidden;
        }
        .abvp-map-card::before {
          content: "";
          position: absolute;
          width: 92px;
          height: 170px;
          left: 48%;
          top: 18px;
          transform: translateX(-50%) rotate(12deg);
          border-radius: 48% 42% 48% 38%;
          background: rgba(255,255,255,0.72);
          box-shadow: inset 0 0 0 1px rgba(var(--color-navy-rgb), 0.08);
        }
        .abvp-pin {
          position: absolute;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: var(--abvp-teal);
          box-shadow: 0 0 0 7px rgba(var(--color-teal-rgb), 0.16);
        }
        .abvp-pin--one { left: 54%; top: 60%; }
        .abvp-pin--two { left: 48%; top: 28%; }
        .abvp-map-label {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px;
          border-radius: 14px;
          background: rgba(255,255,255,0.78);
          color: var(--abvp-ink);
          font-size: 11px;
          font-weight: 900;
        }

        .abvp-map .abvp-window { padding: 0; background: linear-gradient(145deg, rgba(255,255,255,0.88), rgba(246,251,252,0.72)); }
        .abvp-map-canvas {
          position: absolute;
          inset: 34px;
          border-radius: 24px;
          overflow: hidden;
          background:
            radial-gradient(circle at 30% 34%, rgba(var(--color-teal-rgb), 0.20), transparent 19%),
            radial-gradient(circle at 68% 62%, rgba(var(--color-cobalt-rgb), 0.14), transparent 22%),
            linear-gradient(135deg, rgba(255,255,255,0.80), rgba(255,255,255,0.54));
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
        }
        .abvp-map-shape {
          position: absolute;
          left: 50%;
          top: 49%;
          width: 160px;
          height: 320px;
          transform: translate(-50%, -50%) rotate(9deg);
          border-radius: 46% 44% 52% 39%;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.94), rgba(222,246,244,0.86));
          box-shadow:
            inset 0 0 0 1px rgba(var(--color-navy-rgb), 0.10),
            0 28px 52px -42px rgba(var(--color-navy-rgb), 0.52);
        }
        .abvp-city {
          position: absolute;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(var(--color-navy-rgb), 0.10);
          color: var(--abvp-ink);
          font-size: 11px;
          font-weight: 900;
          box-shadow: 0 16px 28px -24px rgba(var(--color-navy-rgb), 0.55);
        }
        .abvp-city::before {
          content: "";
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--abvp-teal);
          box-shadow: 0 0 0 5px rgba(var(--color-teal-rgb), 0.14);
        }
        .abvp-city--porto { left: 28%; top: 25%; }
        .abvp-city--braga { left: 51%; top: 15%; }
        .abvp-city--lisbon { left: 21%; top: 61%; }
        .abvp-city--cascais { left: 55%; top: 70%; }
        .abvp-map-ribbon {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }
        .abvp-map-ribbon .abvp-chip { justify-content: center; min-width: 0; }

        .abvp-profiles .abvp-window {
          background:
            radial-gradient(70% 70% at 80% 20%, rgba(var(--color-teal-rgb), 0.16), transparent 62%),
            linear-gradient(145deg, #102247, #203C70);
          border-color: rgba(255,255,255,0.13);
        }
        .abvp-profile-stack {
          position: absolute;
          inset: 40px;
        }
        .abvp-stack-card {
          position: absolute;
          left: 0;
          right: 0;
          display: grid;
          grid-template-columns: 52px 1fr auto;
          gap: 12px;
          align-items: center;
          padding: 15px;
          border-radius: 20px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.42);
          box-shadow: 0 24px 44px -34px rgba(0,0,0,0.55);
        }
        .abvp-stack-card:nth-child(1) { top: 52px; transform: rotate(-3deg); }
        .abvp-stack-card:nth-child(2) { top: 144px; transform: translateX(22px) rotate(2deg); }
        .abvp-stack-card:nth-child(3) { top: 236px; transform: translateX(4px) rotate(-1deg); }
        .abvp-stack-card strong {
          display: block;
          color: var(--abvp-ink);
          font-size: 13px;
          line-height: 1.2;
        }
        .abvp-stack-card small {
          display: block;
          margin-top: 4px;
          color: var(--abvp-body);
          font-size: 11px;
        }
        .abvp-stack-meta {
          display: flex;
          flex-direction: column;
          gap: 7px;
          align-items: flex-end;
        }
        .abvp-stack-meta span {
          padding: 5px 7px;
          border-radius: 999px;
          background: rgba(var(--color-teal-rgb), 0.12);
          color: var(--color-teal-ink);
          font-size: 10px;
          font-weight: 900;
        }
        .abvp-profile-topline {
          position: absolute;
          left: 40px;
          right: 40px;
          top: 28px;
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          color: #fff;
        }
        .abvp-profile-topline strong {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 22px;
          font-weight: 600;
        }
        .abvp-profile-topline span {
          color: rgba(255,255,255,0.72);
          font-size: 12px;
          font-weight: 800;
        }
        .abvp-filter-row {
          position: absolute;
          left: 40px;
          right: 40px;
          bottom: 30px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        @media (max-width: 980px) {
          .abvp-hero,
          .abvp-option__grid,
          .abvp-option:nth-child(even) .abvp-option__grid {
            grid-template-columns: 1fr;
          }
          .abvp-option:nth-child(even) .abvp-option__copy,
          .abvp-option:nth-child(even) .abvp-visual { order: initial; }
          .abvp-visual { min-height: 470px; }
        }
        @media (max-width: 620px) {
          .abvp-shell { width: min(100% - 28px, 1180px); }
          .abvp-option { padding: 14px; border-radius: 22px; }
          .abvp-visual { min-height: 520px; border-radius: 20px; }
          .abvp-window { inset: 16px; }
          .abvp-product .abvp-window { padding: 38px 14px 14px; }
          .abvp-searchbar,
          .abvp-results,
          .abvp-map-ribbon { grid-template-columns: 1fr; }
          .abvp-map-card { min-height: 180px; }
          .abvp-map-canvas { inset: 20px; }
          .abvp-city--porto { left: 14%; }
          .abvp-city--braga { left: 46%; }
          .abvp-city--lisbon { left: 12%; }
          .abvp-city--cascais { left: 45%; }
          .abvp-profile-stack { inset: 32px 24px; }
          .abvp-stack-card {
            grid-template-columns: 46px 1fr;
          }
          .abvp-stack-meta { grid-column: 1 / -1; flex-direction: row; align-items: flex-start; }
          .abvp-stack-card:nth-child(1) { top: 72px; }
          .abvp-stack-card:nth-child(2) { top: 190px; transform: translateX(0) rotate(2deg); }
          .abvp-stack-card:nth-child(3) { top: 308px; }
          .abvp-profile-topline,
          .abvp-filter-row { left: 24px; right: 24px; }
        }
      `}</style>

      <div className="abvp-shell">
        <section className="abvp-hero" aria-labelledby="abvp-title">
          <div>
            <p className="abvp-kicker">
              <i className="fas fa-layer-group" aria-hidden="true" />
              {t("eyebrow")}
            </p>
            <h1 className="abvp-title" id="abvp-title">
              {t("title")} <em>{t("titleEmphasis")}</em>
            </h1>
          </div>
          <p className="abvp-lede">{t("lede")}</p>
        </section>

        {options.map((option) => (
          <section className="abvp-option" key={option.id} aria-labelledby={`abvp-${option.id}`}>
            <div className="abvp-option__grid">
              <div className="abvp-option__copy">
                <p className="abvp-option__eyebrow">
                  <i className="fas fa-sparkles" aria-hidden="true" />
                  {option.eyebrow}
                </p>
                <h2 className="abvp-option__title" id={`abvp-${option.id}`}>
                  {option.title}
                </h2>
                <p className="abvp-option__body">{option.body}</p>
                <p className="abvp-option__about">
                  <strong>{about("title")} {about("titleBreak")}</strong>
                  {about("subtitle")}
                </p>
              </div>
              {option.visual}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function ProductSearchVisual({
  copy,
}: {
  copy: {
    query: string;
    specialty: string;
    city: string;
    language: string;
    resultCount: string;
    verified: string;
    free: string;
    multilingual: string;
    profileOneName: string;
    profileOneMeta: string;
    profileTwoName: string;
    profileTwoMeta: string;
    mapLabel: string;
    slot: string;
  };
}) {
  return (
    <div className="abvp-visual abvp-product" aria-hidden="true">
      <span className="abvp-glow" />
      <div className="abvp-window">
        <div className="abvp-dots"><span /><span /><span /></div>
        <div className="abvp-searchbar">
          <div className="abvp-searchbar__item">
            <i className="fas fa-search" />
            <span>{copy.query}</span>
          </div>
          <div className="abvp-searchbar__item">
            <i className="fas fa-location-dot" />
            <span>{copy.city}</span>
          </div>
          <div className="abvp-searchbar__item">
            <i className="fas fa-language" />
            <span>{copy.language}</span>
          </div>
        </div>
        <div className="abvp-results">
          <div className="abvp-result-list">
            <div className="abvp-result-head">
              <span>{copy.resultCount}</span>
              <span>{copy.free}</span>
            </div>
            <ProfileCard
              initials="MS"
              name={copy.profileOneName}
              meta={copy.profileOneMeta}
              tags={[copy.verified, copy.multilingual]}
            />
            <ProfileCard
              initials="AC"
              name={copy.profileTwoName}
              meta={copy.profileTwoMeta}
              tags={[copy.specialty, copy.slot]}
            />
          </div>
          <div className="abvp-map-card">
            <span className="abvp-pin abvp-pin--one" />
            <span className="abvp-pin abvp-pin--two" />
            <div className="abvp-map-label">
              <span>{copy.mapLabel}</span>
              <i className="fas fa-arrow-trend-up" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortugalMapVisual({
  copy,
}: {
  copy: {
    coverage: string;
    lisbon: string;
    porto: string;
    cascais: string;
    braga: string;
    specialties: string;
    languages: string;
    verified: string;
    free: string;
  };
}) {
  return (
    <div className="abvp-visual abvp-map" aria-hidden="true">
      <span className="abvp-glow" />
      <div className="abvp-window">
        <div className="abvp-map-canvas">
          <span className="abvp-map-shape" />
          <span className="abvp-city abvp-city--porto">{copy.porto}</span>
          <span className="abvp-city abvp-city--braga">{copy.braga}</span>
          <span className="abvp-city abvp-city--lisbon">{copy.lisbon}</span>
          <span className="abvp-city abvp-city--cascais">{copy.cascais}</span>
          <div className="abvp-map-ribbon">
            <span className="abvp-chip abvp-chip--dark"><i className="fas fa-map-location-dot" />{copy.coverage}</span>
            <span className="abvp-chip"><i className="fas fa-user-doctor" />{copy.specialties}</span>
            <span className="abvp-chip"><i className="fas fa-shield-heart" />{copy.verified}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileStackVisual({
  copy,
}: {
  copy: {
    title: string;
    verified: string;
    languages: string;
    profileOneName: string;
    profileOneMeta: string;
    profileTwoName: string;
    profileTwoMeta: string;
    profileThreeName: string;
    profileThreeMeta: string;
    compare: string;
    filterOne: string;
    filterTwo: string;
    filterThree: string;
  };
}) {
  return (
    <div className="abvp-visual abvp-profiles" aria-hidden="true">
      <div className="abvp-window">
        <div className="abvp-profile-topline">
          <strong>{copy.title}</strong>
          <span>{copy.compare}</span>
        </div>
        <div className="abvp-profile-stack">
          <StackCard initials="MS" name={copy.profileOneName} meta={copy.profileOneMeta} tags={[copy.verified, copy.languages]} />
          <StackCard initials="RC" name={copy.profileTwoName} meta={copy.profileTwoMeta} tags={[copy.verified, copy.filterOne]} />
          <StackCard initials="AF" name={copy.profileThreeName} meta={copy.profileThreeMeta} tags={[copy.verified, copy.filterTwo]} />
        </div>
        <div className="abvp-filter-row">
          <span className="abvp-chip abvp-chip--dark"><i className="fas fa-filter" />{copy.filterOne}</span>
          <span className="abvp-chip"><i className="fas fa-language" />{copy.filterTwo}</span>
          <span className="abvp-chip"><i className="fas fa-location-dot" />{copy.filterThree}</span>
        </div>
      </div>
    </div>
  );
}

function ProfileCard({
  initials,
  name,
  meta,
  tags,
}: {
  initials: string;
  name: string;
  meta: string;
  tags: string[];
}) {
  return (
    <div className="abvp-profile">
      <span className="abvp-avatar">{initials}</span>
      <div>
        <strong>{name}</strong>
        <small>{meta}</small>
        <div className="abvp-mini-tags">
          {tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </div>
  );
}

function StackCard({
  initials,
  name,
  meta,
  tags,
}: {
  initials: string;
  name: string;
  meta: string;
  tags: string[];
}) {
  return (
    <div className="abvp-stack-card">
      <span className="abvp-avatar">{initials}</span>
      <div>
        <strong>{name}</strong>
        <small>{meta}</small>
      </div>
      <div className="abvp-stack-meta">
        {tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </div>
  );
}
