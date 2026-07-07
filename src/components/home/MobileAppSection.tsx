"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

const REGISTER_URL = `${PLATFORM_URL}/register?role=patient&utm_source=landing&utm_medium=app_section&utm_campaign=early_access`;

function PhoneMockup({ t }: { t: (key: string) => string }) {
  return (
    <div className="ma-phone">
      <div className="ma-phone__notch" />
      <div className="ma-phone__screen">
        <div className="ma-phone__header">
          <span className="ma-phone__logo">DocAgora</span>
        </div>
        <div className="ma-phone__search">
          <i
            className="fas fa-search"
            style={{ fontSize: 11, color: "var(--color-accent)" }}
          />
          <span className="ma-phone__search-text">
            {t("phoneSearch")}
          </span>
        </div>
        <div className="ma-phone__cards">
          {[
            { initials: "MD", name: "Dr. Marie Dupont", specKey: "phoneDoc1Spec", langs: "FR PT EN" },
            { initials: "JS", name: "Dr. João Silva", specKey: "phoneDoc2Spec", langs: "PT EN" },
            { initials: "LB", name: "Dr. Laura Branco", specKey: "phoneDoc3Spec", langs: "PT FR" },
          ].map((doc) => (
            <div key={doc.initials} className="ma-phone__card">
              <div className="ma-phone__avatar">{doc.initials}</div>
              <div className="ma-phone__card-info">
                <strong>{doc.name}</strong>
                <span>
                  {t(doc.specKey)} &middot; {doc.langs}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor" aria-hidden="true">
      <path d="M16.52 12.62c-.03-2.87 2.34-4.25 2.45-4.32-1.33-1.95-3.41-2.22-4.15-2.25-1.77-.18-3.45 1.04-4.34 1.04-.9 0-2.28-1.02-3.75-.99-1.93.03-3.71 1.12-4.71 2.85-2.01 3.49-.51 8.66 1.44 11.49.96 1.39 2.1 2.95 3.6 2.89 1.45-.06 1.99-.93 3.74-.93s2.24.93 3.77.9c1.55-.03 2.53-1.41 3.48-2.81 1.1-1.61 1.55-3.17 1.58-3.25-.03-.01-3.02-1.16-3.05-4.62zM13.7 4.15c.8-.97 1.33-2.31 1.19-3.65-1.15.05-2.54.77-3.37 1.73-.74.86-1.39 2.23-1.21 3.55 1.28.1 2.59-.65 3.39-1.63z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor" aria-hidden="true">
      <path d="M.65.44C.39.72.24 1.15.24 1.72v18.56c0 .57.15 1 .41 1.28L.75 21.66l10.4-10.4v-.24L.75.62.65.44z" />
      <path d="M14.61 14.72l-3.46-3.46v-.24l3.46-3.46.08.04 4.1 2.33c1.17.66 1.17 1.75 0 2.42l-4.1 2.33-.08.04z" />
      <path d="M14.69 14.68L11.15 11.14.65 21.56c.39.41.82.46 1.32.18l12.72-7.06z" />
      <path d="M14.69 7.6L1.97.54C1.47.26 1.04.31.65.72l10.5 10.42 3.54-3.54z" />
    </svg>
  );
}

export default function MobileAppSection() {
  const t = useTranslations("home.mobileApp");
  const prefersReduced = useReducedMotion();

  /**
   * SSR-safety guard: useReducedMotion() returns null on server + first
   * client render, then true/false after hydration. Without this guard the
   * server renders <PhoneMockup> directly while the client re-renders it
   * inside <motion.div>, producing a hydration mismatch warning.
   *
   * Strategy: always render the animated variant on both server and first
   * client paint (mounted=false), then switch to the reduced-motion variant
   * only after the client has confirmed prefers-reduced-motion === true.
   * This keeps server === first-client render, eliminating the mismatch.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const showReduced = mounted && !!prefersReduced;

  return (
    <section className="ma-section">
      <style>{`
        /* ===== SECTION ===== */
        .ma-section {
          position: relative;
          padding: var(--spacing-section) 0;
          background: var(--bg-section);
          overflow: hidden;
        }

        /* ===== BLOBS ===== */
        .ma-blob {
          position: absolute;
          border-radius: 50% 40% 60% 45%;
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }
        .ma-blob--1 {
          width: 320px;
          height: 320px;
          background: rgba(var(--color-teal-rgb), 0.18);
          top: -40px;
          right: 5%;
          animation: maBlobFloat1 12s ease-in-out infinite;
        }
        .ma-blob--2 {
          width: 220px;
          height: 220px;
          background: rgba(var(--color-cobalt-rgb), 0.12);
          bottom: -30px;
          right: 15%;
          border-radius: 45% 55% 40% 60%;
          animation: maBlobFloat2 10s ease-in-out infinite;
        }
        .ma-blob--3 {
          width: 160px;
          height: 160px;
          background: rgba(255, 189, 46, 0.12);
          top: 30%;
          right: 2%;
          border-radius: 60% 40% 50% 45%;
          animation: maBlobFloat3 14s ease-in-out infinite;
        }
        @keyframes maBlobFloat1 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.06) rotate(5deg); }
        }
        @keyframes maBlobFloat2 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.08) rotate(-4deg); }
        }
        @keyframes maBlobFloat3 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(6deg); }
        }

        /* ===== TEXT COLUMN ===== */
        .ma-text {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }
        .ma-title {
          font-family: var(--font-display);
          font-size: var(--fs-2xl);
          font-weight: var(--fw-bold);
          color: var(--text-default);
          line-height: 1.2;
          margin-bottom: var(--spacing-sm);
        }
        .ma-subtitle {
          font-size: var(--fs-md);
          line-height: 1.75;
          color: var(--text-muted);
          margin-bottom: var(--spacing-md);
          max-width: 520px;
        }

        /* ===== STORE BADGE (replaces empty stars) ===== */
        .ma-store-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-xs);
          background: rgba(var(--color-teal-rgb), 0.10);
          border: 1px solid rgba(var(--color-teal-rgb), 0.25);
          border-radius: var(--radius-pill);
          padding: 6px var(--spacing-sm);
          margin-bottom: var(--spacing-md);
          font-size: var(--fs-sm);
          font-weight: var(--fw-semibold);
          color: var(--color-accent-ink);
          letter-spacing: 0.2px;
        }
        .ma-store-badge__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-teal);
          flex-shrink: 0;
        }

        /* ===== STORE BUTTONS ===== */
        .ma-store-buttons {
          display: flex;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
          flex-wrap: wrap;
        }
        .ma-store-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--color-dark-1);
          color: var(--text-on-dark);
          border: none;
          border-radius: var(--radius-md);
          padding: 12px var(--spacing-md);
          text-decoration: none;
          opacity: 0.45;
          cursor: not-allowed;
          pointer-events: auto;
          transition: opacity 0.2s var(--ease-out-soft);
          flex-shrink: 0;
          /* Visually communicate disabled without transform on hover */
        }
        .ma-store-btn:hover {
          opacity: 0.55;
          color: var(--text-on-dark);
          text-decoration: none;
          transform: none;
        }
        .ma-store-btn:focus-visible {
          outline: 2px solid var(--color-cobalt);
          outline-offset: 2px;
        }
        .ma-store-btn__text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .ma-store-btn__small {
          font-size: var(--fs-xs);
          font-weight: var(--fw-regular);
          opacity: 0.7;
        }
        .ma-store-btn__big {
          font-size: var(--fs-base);
          font-weight: var(--fw-semibold);
        }

        /* Tooltip */
        .ma-store-btn::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) scale(0.95);
          background: var(--color-dark-1);
          color: var(--text-on-dark);
          font-size: var(--fs-xs);
          font-weight: var(--fw-medium);
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s, transform 0.2s;
          z-index: 10;
          box-shadow: var(--shadow-sm);
        }
        .ma-store-btn:hover::after {
          opacity: 1;
          transform: translateX(-50%) scale(1);
        }

        /* Coming soon badge on button */
        .ma-coming-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--color-teal);
          color: var(--color-dark-1);
          font-size: 9px;
          font-weight: var(--fw-extrabold);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          line-height: 1.2;
        }

        /* ===== CTA LINK ===== */
        .ma-cta {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--color-link);
          font-size: var(--fs-base);
          font-weight: var(--fw-semibold);
          text-decoration: none;
          transition: gap 0.2s, color 0.2s;
        }
        .ma-cta:hover {
          color: var(--color-link-hover);
          gap: 12px;
          text-decoration: none;
        }

        /* ===== PHONE MOCKUP ===== */
        .ma-phone-wrap {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .ma-phone {
          position: relative;
          width: 260px;
          height: 520px;
          background: var(--color-dark-1);
          border-radius: 36px;
          padding: 12px;
          box-shadow: var(--shadow-lg),
            0 8px 24px rgba(var(--color-dark-1-rgb), 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .ma-phone__notch {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 22px;
          background: #000;
          border-radius: 0 0 14px 14px;
          z-index: 3;
        }
        .ma-phone__notch::after {
          content: '';
          position: absolute;
          top: 7px;
          right: 18px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-dark-1);
        }
        .ma-phone__screen {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 26px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .ma-phone__header {
          background: linear-gradient(135deg, var(--color-teal), var(--color-navy));
          padding: 38px 16px 14px;
          text-align: center;
        }
        .ma-phone__logo {
          color: #fff;
          font-size: 16px;
          font-weight: var(--fw-bold);
          letter-spacing: 0.5px;
        }
        .ma-phone__search {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          margin: 12px 12px 8px;
          padding: 9px 12px;
          background: var(--bg-section);
          border-radius: var(--radius-sm);
          font-size: var(--fs-xs);
          color: var(--text-muted);
        }
        .ma-phone__cards {
          flex: 1;
          padding: 4px 12px 12px;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          overflow: hidden;
        }
        .ma-phone__card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: var(--bg-section);
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-default);
        }
        .ma-phone__avatar {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          background: linear-gradient(135deg, var(--color-teal), var(--color-navy));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: var(--fs-xs);
          font-weight: var(--fw-bold);
          flex-shrink: 0;
        }
        .ma-phone__card-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .ma-phone__card-info strong {
          font-size: 12px;
          color: var(--text-default);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ma-phone__card-info span {
          font-size: var(--fs-xs);
          color: var(--text-muted);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 991px) {
          .ma-section { padding: var(--spacing-xl) 0; }
          .ma-title { font-size: var(--fs-xl); }
          .ma-phone-wrap { margin-bottom: var(--spacing-lg); }
          .ma-blob--1 { width: 220px; height: 220px; }
          .ma-blob--2 { width: 160px; height: 160px; }
          .ma-blob--3 { width: 110px; height: 110px; }
        }
        @media (max-width: 575px) {
          .ma-section { padding: var(--spacing-lg) 0; }
          .ma-title { font-size: var(--fs-xl); }
          .ma-subtitle { font-size: var(--fs-base); }
          .ma-store-buttons { flex-direction: column; gap: 12px; }
          .ma-store-btn { width: 100%; justify-content: center; }
          .ma-phone { width: 220px; height: 440px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ma-blob { animation: none !important; }
          .ma-store-btn,
          .ma-cta { transition: none !important; }
        }
      `}</style>

      {/* Decorative blobs */}
      <div className="ma-blob ma-blob--1" />
      <div className="ma-blob ma-blob--2" />
      <div className="ma-blob ma-blob--3" />

      <div className="container">
        <div className="row align-items-center">
          {/* Phone mockup — shown first on mobile (order-1), second on desktop (order-lg-2) */}
          <div className="col-lg-5 order-1 order-lg-2">
            <div className="ma-phone-wrap">
              {showReduced ? (
                <PhoneMockup t={t} />
              ) : (
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <PhoneMockup t={t} />
                </motion.div>
              )}
            </div>
          </div>

          {/* Text content — shown second on mobile (order-2), first on desktop (order-lg-1) */}
          <div className="col-lg-7 order-2 order-lg-1">
            <div className="ma-text">
              <h2 className="ma-title">{t("title")}</h2>
              <p className="ma-subtitle">{t("subtitle")}</p>

              {/* Store badge — replaces empty 5-star placeholder */}
              <div className="ma-store-badge" aria-label={t("starsLabel")}>
                <span className="ma-store-badge__dot" aria-hidden="true" />
                {t("starsLabel")}
              </div>

              {/* Store buttons */}
              <div className="ma-store-buttons">
                <div
                  className="ma-store-btn"
                  aria-disabled="true"
                  role="button"
                  tabIndex={-1}
                  data-tooltip={t("comingSoonTooltip")}
                >
                  <AppleIcon />
                  <span className="ma-store-btn__text">
                    <span className="ma-store-btn__small">
                      {t("downloadOn")}
                    </span>
                    <span className="ma-store-btn__big">
                      {t("appStoreLabel")}
                    </span>
                  </span>
                  <span className="ma-coming-badge">{t("comingSoon")}</span>
                </div>
                <div
                  className="ma-store-btn"
                  aria-disabled="true"
                  role="button"
                  tabIndex={-1}
                  data-tooltip={t("comingSoonTooltip")}
                >
                  <PlayStoreIcon />
                  <span className="ma-store-btn__text">
                    <span className="ma-store-btn__small">{t("getItOn")}</span>
                    <span className="ma-store-btn__big">
                      {t("googlePlayLabel")}
                    </span>
                  </span>
                  <span className="ma-coming-badge">{t("comingSoon")}</span>
                </div>
              </div>

              {/* CTA */}
              <a href={REGISTER_URL} className="ma-cta">
                <span>{t("cta")}</span>
                <i className="icon-arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
