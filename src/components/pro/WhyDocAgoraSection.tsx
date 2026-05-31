"use client";

import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

const REGISTER_HREF = `${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`;

const ROWS = [
  { num: "01", titleKey: "card1Title", descKey: "card1Desc" },
  { num: "02", titleKey: "card2Title", descKey: "card2Desc" },
  { num: "03", titleKey: "card3Title", descKey: "card3Desc" },
  { num: "04", titleKey: "card4Title", descKey: "card4Desc" },
] as const;

export default function WhyDocAgoraSection() {
  const t = useTranslations("pro.whyDocAgora");

  return (
    <section className="whyv1-section pro-section pro-s-why" aria-labelledby="whyv1-title">
      <style>{`
        .whyv1-section {
          position: relative;
          background: var(--color-light-1);
          padding: 120px 0;
          overflow: hidden;
          color: var(--color-dark-1);
        }
        /* ultra-subtle vertical hairline rules */
        .whyv1-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(90deg, rgba(var(--color-navy-rgb), 0.05) 1px, transparent 1px);
          background-size: 25% 100%;
          opacity: 0.6;
          z-index: 0;
        }
        .whyv1-inner {
          position: relative;
          z-index: 1;
        }
        .whyv1-grid {
          display: grid;
          grid-template-columns: minmax(280px, 0.85fr) 1.15fr;
          gap: 80px;
          align-items: start;
        }

        /* ---- LEFT sticky column ---- */
        .whyv1-left {
          position: sticky;
          top: 120px;
          align-self: start;
        }
        .whyv1-eyebrow {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-mint);
          margin: 0 0 28px;
          max-width: 30ch;
          line-height: 1.7;
          opacity: 0;
          animation: whyv1-fadeup 0.7s ease forwards;
          animation-delay: 0.05s;
        }
        .whyv1-eyebrow::before {
          content: "";
          display: inline-block;
          width: 32px;
          height: 1px;
          margin-right: 12px;
          vertical-align: middle;
          background: var(--color-teal);
        }
        .whyv1-title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 500;
          font-size: clamp(2.5rem, 4.4vw, 3.75rem);
          line-height: 1.02;
          letter-spacing: -0.015em;
          margin: 0 0 40px;
          color: var(--color-navy);
          opacity: 0;
          animation: whyv1-fadeup 0.8s ease forwards;
          animation-delay: 0.12s;
        }
        .whyv1-title em {
          font-style: italic;
          color: var(--color-cobalt);
        }
        .whyv1-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-dark-1);
          text-decoration: none;
          padding-bottom: 8px;
          border-bottom: 1.5px solid rgba(var(--color-navy-rgb), 0.25);
          transition: color 0.3s ease, border-color 0.3s ease;
          opacity: 0;
          animation: whyv1-fadeup 0.8s ease forwards;
          animation-delay: 0.2s;
        }
        .whyv1-cta:hover {
          color: var(--color-cobalt);
          border-color: var(--color-cobalt);
        }
        .whyv1-cta:focus-visible {
          outline: 2px solid var(--color-cobalt);
          outline-offset: 6px;
          border-radius: 2px;
        }
        .whyv1-arrow {
          display: inline-block;
          font-size: 0.78rem;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .whyv1-cta:hover .whyv1-arrow {
          transform: translateX(8px);
        }

        /* ---- RIGHT numbered list ---- */
        .whyv1-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .whyv1-row {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 36px;
          padding: 42px 0;
          border-top: 1px solid rgba(var(--color-navy-rgb), 0.14);
          opacity: 0;
          animation: whyv1-fadeup 0.75s ease forwards;
        }
        .whyv1-row:last-child {
          border-bottom: 1px solid rgba(var(--color-navy-rgb), 0.14);
        }
        .whyv1-num {
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 400;
          font-size: clamp(2.6rem, 4vw, 3.4rem);
          line-height: 0.9;
          color: rgba(var(--color-navy-rgb), 0.16);
          transition: color 0.4s ease, transform 0.4s ease;
          font-feature-settings: "tnum";
        }
        .whyv1-row:hover .whyv1-num {
          color: var(--color-teal);
          transform: translateY(-2px);
        }
        .whyv1-body {
          padding-top: 6px;
        }
        .whyv1-row-title {
          display: inline;
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 700;
          font-size: clamp(1.15rem, 1.6vw, 1.4rem);
          line-height: 1.3;
          color: var(--color-dark-1);
          margin: 0;
          background-image: linear-gradient(var(--color-teal), var(--color-teal));
          background-repeat: no-repeat;
          background-position: 0 100%;
          background-size: 0% 2px;
          padding-bottom: 4px;
          transition: background-size 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .whyv1-row:hover .whyv1-row-title {
          background-size: 100% 2px;
        }
        .whyv1-row-desc {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.98rem;
          line-height: 1.7;
          color: var(--text-muted);
          margin: 16px 0 0;
          max-width: 52ch;
        }

        @keyframes whyv1-fadeup {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .whyv1-eyebrow,
          .whyv1-title,
          .whyv1-cta,
          .whyv1-row {
            animation: none;
            opacity: 1;
          }
          .whyv1-arrow,
          .whyv1-num,
          .whyv1-row-title {
            transition: none;
          }
        }

        @media (max-width: 991px) {
          .whyv1-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          .whyv1-left {
            position: static;
            top: auto;
          }
          .whyv1-section::before {
            background-size: 50% 100%;
          }
        }

        @media (max-width: 767px) {
          .whyv1-section {
            padding: 80px 0;
          }
          .whyv1-row {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 34px 0;
          }
          .whyv1-num {
            font-size: 2.4rem;
          }
          .whyv1-title {
            margin-bottom: 32px;
          }
          .whyv1-section::before {
            opacity: 0.4;
          }
        }
      `}</style>

      <div className="container-landing whyv1-inner">
        <div className="whyv1-grid">
          <div className="whyv1-left">
            <p className="whyv1-eyebrow">{t("subtitle")}</p>
            <h2 className="whyv1-title" id="whyv1-title">
              {t("title")}
            </h2>
            <a className="whyv1-cta" href={REGISTER_HREF}>
              <span>{t("cta")}</span>
              <span className="whyv1-arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </div>

          <ol className="whyv1-list">
            {ROWS.map((row, index) => (
              <li
                className="whyv1-row"
                key={row.num}
                style={{ animationDelay: `${0.25 + index * 0.12}s` }}
              >
                <span className="whyv1-num" aria-hidden="true">
                  {row.num}
                </span>
                <div className="whyv1-body">
                  <h3 className="whyv1-row-title">{t(row.titleKey)}</h3>
                  <p className="whyv1-row-desc">{t(row.descKey)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
