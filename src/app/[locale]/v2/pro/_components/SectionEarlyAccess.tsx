"use client";

import { useTranslations } from "next-intl";

import { useRevealInView } from "@/components/shared/useRevealInView";

/* ============================================================
   SectionEarlyAccess, V2 PRO « Billet Early Access »
   Concept « ticket » : STUB gauche (dégradé navy de marque,
   EXCEPTION unique autorisée) + CORPS droit themeable --v2-*.
   THEMEABLE : hors stub, toutes les couleurs passent par les
   tokens --v2-* hérités de .v2p (dark/light/mixte + contrast).
   Préfixe CSS « v2ea- ». Reveal déclenché au scroll (socle : useRevealInView).
   ============================================================ */

const REGISTER_HREF = "/contact";

const EA_FIELD_CODES = ["01", "02", "03"] as const;

export default function SectionEarlyAccess() {
  const t = useTranslations("pro");
  const { ref, revealed } = useRevealInView<HTMLDivElement>();
  return (
    <section
      className="v2ea-section"
      id="v2ea-early"
      aria-labelledby="v2ea-title"
    >
      <style>{`
        .v2ea-section, .v2ea-section * { box-sizing: border-box; }

        .v2ea-section {
          --v2ea-shell: 1200px;
          --v2ea-radius: var(--radius-lg);
          --v2ea-mono: ui-monospace, "SF Mono", Menlo, monospace;
          position: relative;
          padding-block: clamp(var(--spacing-2xl), 10vh, var(--spacing-section-lg));
          background: var(--v2-bg);
          color: var(--v2-text-body);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          line-height: 1.5;
          overflow: hidden;
        }
        .v2ea-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(60% 55% at 12% 0%, var(--v2-mesh-a), transparent 60%),
            radial-gradient(55% 55% at 92% 110%, var(--v2-mesh-b), transparent 55%);
        }

        .v2ea-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: var(--v2ea-shell);
          margin-inline: auto;
          padding-inline: clamp(var(--spacing-sm), 4vw, var(--spacing-md));
        }

        /* ── Eyebrow ── */
        .v2ea-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-md);
          font-family: var(--v2ea-mono);
          font-size: var(--fs-xs);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--v2-eyebrow);
          opacity: 0;
        }
        .v2ea-play .v2ea-eyebrow {
          animation: v2ea-fade 0.7s ease forwards 0.05s;
        }
        .v2ea-eyebrow span {
          height: 1px;
          width: 46px;
          background: linear-gradient(90deg, transparent, var(--v2-accent));
        }
        .v2ea-eyebrow span:last-child {
          background: linear-gradient(90deg, var(--v2-accent), transparent);
        }

        /* ── Ticket ── */
        .v2ea-ticket {
          position: relative;
          display: grid;
          grid-template-columns: 168px 1px 1fr;
          background: var(--v2-surface);
          border: 1px solid var(--v2-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--v2-shadow-lg);
          transform-origin: top center;
          opacity: 0;
          overflow: hidden;
        }
        .v2ea-play .v2ea-ticket {
          animation: v2ea-tear 0.9s cubic-bezier(0.18, 0.74, 0.2, 1) forwards 0.18s;
        }

        /* ── LEFT STUB (exception : dégradé navy de marque) ── */
        .v2ea-stub {
          position: relative;
          border-radius: var(--radius-lg) 0 0 var(--radius-lg);
          padding: var(--spacing-md) var(--spacing-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background:
            repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 9px, transparent 9px 18px),
            linear-gradient(165deg, var(--color-navy) 0%, var(--color-dark-1) 130%);
          color: var(--color-light-1);
          overflow: hidden;
        }
        .v2ea-stubmark {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: var(--fs-base);
          font-weight: var(--fw-semibold);
          letter-spacing: 0.02em;
          color: var(--v2-accent);
        }
        .v2ea-vert {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--v2ea-mono);
          font-size: var(--fs-sm);
          font-weight: var(--fw-bold);
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--color-light-1);
          padding: var(--spacing-xs) 0;
        }
        .v2ea-barcode {
          width: 100%;
          height: 56px;
          border-radius: var(--radius-sm);
          background-image: repeating-linear-gradient(
            90deg,
            var(--color-light-1) 0 2px,
            transparent 2px 4px,
            var(--color-light-1) 4px 9px,
            transparent 9px 12px,
            var(--color-light-1) 12px 13px,
            transparent 13px 17px,
            var(--color-light-1) 17px 22px,
            transparent 22px 24px
          );
          background-size: 24px 100%;
          opacity: 0.9;
        }
        .v2ea-stubid {
          font-family: var(--v2ea-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          color: var(--text-on-dark-muted);
        }

        /* ── PERFORATION ── */
        .v2ea-perf {
          position: relative;
          background-image: linear-gradient(var(--v2-border) 50%, transparent 50%);
          background-size: 2px 12px;
          background-repeat: repeat-y;
          background-position: center;
        }
        .v2ea-notch {
          position: absolute;
          left: 50%;
          width: 26px;
          height: 26px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: var(--v2-bg);
          box-shadow: 0 0 0 1px var(--v2-border);
        }
        .v2ea-notch.top { top: -13px; }
        .v2ea-notch.bottom { bottom: -13px; }

        /* ── RIGHT BODY ── */
        .v2ea-body {
          position: relative;
          padding: var(--spacing-xl) var(--spacing-2xl) calc(var(--spacing-xl) + var(--spacing-xs));
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
        }
        .v2ea-route {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-sm);
          font-family: var(--v2ea-mono);
          font-size: var(--fs-xs);
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--v2-accent-2);
        }
        .v2ea-route__arrow {
          color: var(--v2-accent-text);
          display: inline-flex;
        }
        .v2ea-title {
          margin: 0 0 var(--spacing-xs);
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: var(--fw-semibold);
          font-size: clamp(28px, 3.4vw, 40px);
          line-height: 1.08;
          letter-spacing: -0.01em;
          color: var(--v2-text);
          max-width: 22ch;
          text-transform: none;
        }
        .v2ea-sub {
          margin: 0 0 var(--spacing-md);
          font-size: var(--fs-base);
          line-height: 1.62;
          color: var(--v2-text-body);
          max-width: 56ch;
        }

        .v2ea-fields {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px dashed var(--v2-border);
          border-bottom: 1px dashed var(--v2-border);
          margin-bottom: var(--spacing-md);
        }
        .v2ea-field {
          padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 0;
          opacity: 0;
        }
        .v2ea-play .v2ea-field {
          animation: v2ea-rise 0.6s ease forwards;
        }
        .v2ea-field:not(:last-child) {
          border-right: 1px dashed var(--v2-border);
          padding-right: var(--spacing-md);
        }
        .v2ea-field:not(:first-child) { padding-left: var(--spacing-md); }
        .v2ea-play .v2ea-field:nth-child(1) { animation-delay: 0.5s; }
        .v2ea-play .v2ea-field:nth-child(2) { animation-delay: 0.62s; }
        .v2ea-play .v2ea-field:nth-child(3) { animation-delay: 0.74s; }
        .v2ea-fcode {
          font-family: var(--v2ea-mono);
          font-size: var(--fs-xs);
          color: var(--v2-accent-text);
          letter-spacing: 0.1em;
        }
        .v2ea-flabel {
          margin: var(--spacing-xs) 0 calc(var(--spacing-xs) - 1px);
          font-family: var(--v2ea-mono);
          font-size: var(--fs-xs);
          font-weight: var(--fw-bold);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--v2-text);
          line-height: 1.3;
        }
        .v2ea-fdesc {
          margin: 0;
          font-size: var(--fs-sm);
          line-height: 1.55;
          color: var(--v2-text-muted);
        }

        .v2ea-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
        }
        .v2ea-seat {
          font-family: var(--v2ea-mono);
          font-size: var(--fs-xs);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--v2-text-muted);
        }
        .v2ea-seat b { color: var(--v2-text); }
        .v2ea-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          font-family: var(--font-montserrat), system-ui, sans-serif;
          font-size: var(--fs-base);
          font-weight: var(--fw-semibold);
          letter-spacing: 0.01em;
          color: var(--v2-accent-ink);
          text-decoration: none;
          background: var(--v2-accent);
          box-shadow: var(--v2-shadow);
          transition: transform 0.25s var(--ease-out-soft, ease),
            box-shadow 0.25s var(--ease-out-soft, ease),
            background 0.25s var(--ease-out-soft, ease),
            gap 0.25s var(--ease-out-soft, ease);
          overflow: hidden;
        }
        .v2ea-cta:hover {
          transform: translateY(-2px);
          gap: var(--spacing-sm);
          box-shadow: var(--v2-shadow-lg);
          background: var(--v2-accent-2);
        }
        .v2ea-cta:focus-visible {
          outline: 3px solid var(--v2-accent);
          outline-offset: 3px;
        }
        .v2ea-cta__arrow {
          display: inline-flex;
          transition: transform 0.25s var(--ease-out-soft, ease);
        }
        .v2ea-cta:hover .v2ea-cta__arrow {
          transform: translateX(3px);
        }

        @keyframes v2ea-fade { to { opacity: 1; } }
        @keyframes v2ea-tear {
          0%   { opacity: 0; transform: perspective(1400px) rotateX(-9deg) translateY(34px) scale(0.985); }
          100% { opacity: 1; transform: perspective(1400px) rotateX(0deg) translateY(0) scale(1); }
        }
        @keyframes v2ea-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .v2ea-ticket {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1px 1fr;
          }
          .v2ea-stub {
            flex-direction: row;
            align-items: center;
            border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            padding: var(--spacing-sm) var(--spacing-md);
          }
          .v2ea-vert {
            writing-mode: horizontal-tb;
            transform: none;
            letter-spacing: 0.3em;
            font-size: var(--fs-sm);
          }
          .v2ea-barcode { width: 120px; height: 40px; flex: 0 0 auto; }
          .v2ea-perf {
            background-image: linear-gradient(90deg, var(--v2-border) 50%, transparent 50%);
            background-size: 12px 2px;
            background-repeat: repeat-x;
            background-position: center;
          }
          .v2ea-notch { top: 50%; transform: translateY(-50%); left: auto; }
          .v2ea-notch.top { left: -13px; top: 50%; }
          .v2ea-notch.bottom { right: -13px; bottom: auto; left: auto; }
          .v2ea-body {
            padding: var(--spacing-lg) var(--spacing-md) calc(var(--spacing-lg) + var(--spacing-xs));
            border-radius: 0 0 var(--radius-lg) var(--radius-lg);
          }
          .v2ea-title { font-size: 27px; }
          .v2ea-fields { grid-template-columns: 1fr; }
          .v2ea-field {
            padding: var(--spacing-sm) 0;
            border-right: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .v2ea-field:not(:last-child) {
            border-bottom: 1px dashed var(--v2-border);
          }
          .v2ea-foot { flex-direction: column; align-items: stretch; }
          .v2ea-cta { justify-content: center; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .v2ea-eyebrow,
          .v2ea-ticket,
          .v2ea-field {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        className={`v2ea-shell${revealed ? " v2ea-play" : ""}`}
        ref={ref}
      >
        <p className="v2ea-eyebrow">
          <span aria-hidden="true" />
          EARLY ACCESS · PORTUGAL
          <span aria-hidden="true" />
        </p>

        <article className="v2ea-ticket">
          {/* ── LEFT STUB ── */}
          <div className="v2ea-stub">
            <span className="v2ea-stubmark">DocAgora</span>
            <span className="v2ea-vert">EARLY ACCESS</span>
            <div className="v2ea-barcode" aria-hidden="true" />
            <span className="v2ea-stubid">N° EA-2026</span>
          </div>

          {/* ── PERFORATION ── */}
          <div className="v2ea-perf" aria-hidden="true">
            <span className="v2ea-notch top" />
            <span className="v2ea-notch bottom" />
          </div>

          {/* ── RIGHT BODY ── */}
          <div className="v2ea-body">
            <div className="v2ea-route">
              <span>DocAgora</span>
              <span className="v2ea-route__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    d="M4 12 H19 M13 6 L19 12 L13 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </span>
              <span>{t("earlyAccess.route")}</span>
            </div>

            <h2 id="v2ea-title" className="v2ea-title">
              {t("earlyAccess.title")}
            </h2>
            <p className="v2ea-sub">{t("earlyAccess.sub")}</p>

            <div className="v2ea-fields">
              {EA_FIELD_CODES.map((code) => (
                <div key={code} className="v2ea-field">
                  <span className="v2ea-fcode">{code}</span>
                  <p className="v2ea-flabel">
                    {t(`earlyAccess.fields.${code}.title`)}
                  </p>
                  <p className="v2ea-fdesc">
                    {t(`earlyAccess.fields.${code}.desc`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="v2ea-foot">
              <span className="v2ea-seat">
                SEAT <b>00-01</b> · FOUNDING
              </span>
              <a className="v2ea-cta" href={REGISTER_HREF}>
                {t("earlyAccess.cta")}
                <span className="v2ea-cta__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      d="M4 12 H19 M13 6 L19 12 L13 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
