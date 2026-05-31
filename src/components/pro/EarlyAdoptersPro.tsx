"use client";

import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

const REGISTER_HREF = `${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`;

const MONO = 'ui-monospace, "SF Mono", Menlo, monospace';

export default function EarlyAdoptersPro() {
  const t = useTranslations("pro.earlyAdopters");

  const fields = [
    { code: "01", title: t("bullet1Title"), desc: t("bullet1Desc") },
    { code: "02", title: t("bullet2Title"), desc: t("bullet2Desc") },
    { code: "03", title: t("bullet3Title"), desc: t("bullet3Desc") },
  ];

  return (
    <section className="earlyv1-section pro-section pro-s-early" aria-labelledby="earlyv1-title">
      <style>{`
        .earlyv1-section {
          position: relative;
          overflow: hidden;
          padding: 120px 0;
          background:
            radial-gradient(120% 90% at 12% 0%, rgba(var(--color-cobalt-rgb), 0.55) 0%, rgba(var(--color-cobalt-rgb), 0) 60%),
            radial-gradient(110% 100% at 92% 110%, rgba(var(--color-teal-rgb), 0.32) 0%, rgba(var(--color-teal-rgb), 0) 55%),
            linear-gradient(155deg, var(--color-navy) 0%, var(--color-dark-1) 100%);
        }
        .earlyv1-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent);
          -webkit-mask-image: linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent);
          opacity: 0.7;
        }
        .earlyv1-inner {
          position: relative;
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .earlyv1-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 34px;
          font-family: ${MONO};
          font-size: 12px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: rgba(var(--color-teal-rgb), 0.95);
          opacity: 0;
          animation: earlyv1-fade 0.7s ease forwards 0.05s;
        }
        .earlyv1-eyebrow span {
          height: 1px;
          width: 46px;
          background: linear-gradient(90deg, transparent, rgba(var(--color-teal-rgb), 0.8));
        }
        .earlyv1-eyebrow span:last-child {
          background: linear-gradient(90deg, rgba(var(--color-teal-rgb), 0.8), transparent);
        }

        /* ── Ticket ── */
        .earlyv1-ticket {
          position: relative;
          display: grid;
          grid-template-columns: 168px 1px 1fr;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0)) ,
            var(--color-light-1);
          border-radius: 22px;
          box-shadow:
            0 2px 0 rgba(255,255,255,0.6) inset,
            0 40px 90px -30px rgba(var(--color-dark-2-rgb), 0.75),
            0 0 0 1px rgba(255,255,255,0.08);
          transform-origin: top center;
          opacity: 0;
          animation: earlyv1-tear 0.9s cubic-bezier(0.18, 0.74, 0.2, 1) forwards 0.18s;
        }

        /* LEFT STUB */
        .earlyv1-stub {
          position: relative;
          border-radius: 22px 0 0 22px;
          padding: 30px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background:
            repeating-linear-gradient(135deg, rgba(var(--color-navy-rgb), 0.05) 0 9px, transparent 9px 18px),
            linear-gradient(165deg, var(--color-navy) 0%, var(--color-dark-1) 130%);
          color: var(--color-light-1);
          overflow: hidden;
        }
        .earlyv1-stubmark {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--color-teal);
        }
        .earlyv1-vert {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: ${MONO};
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--color-light-1);
          padding: 6px 0;
        }
        .earlyv1-barcode {
          width: 100%;
          height: 56px;
          border-radius: 4px;
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
          opacity: 0.92;
        }
        .earlyv1-stubid {
          font-family: ${MONO};
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.5);
        }

        /* PERFORATION */
        .earlyv1-perf {
          position: relative;
          background-image: linear-gradient(
            var(--color-navy) 50%,
            transparent 50%
          );
          background-size: 2px 12px;
          background-repeat: repeat-y;
          background-position: center;
          opacity: 0.4;
        }
        .earlyv1-notch {
          position: absolute;
          left: 50%;
          width: 26px;
          height: 26px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: var(--color-navy);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
        }
        .earlyv1-notch.top { top: -13px; }
        .earlyv1-notch.bottom { bottom: -13px; }

        /* RIGHT BODY */
        .earlyv1-body {
          position: relative;
          padding: 44px 48px 46px;
          border-radius: 0 22px 22px 0;
        }
        .earlyv1-route {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
          font-family: ${MONO};
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--color-cobalt);
        }
        .earlyv1-route i { color: var(--color-mint); }
        .earlyv1-title {
          margin: 0 0 14px;
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600;
          font-size: clamp(28px, 3.4vw, 40px);
          line-height: 1.08;
          letter-spacing: -0.01em;
          color: var(--color-dark-1);
          max-width: 22ch;
        }
        .earlyv1-sub {
          margin: 0 0 34px;
          font-family: var(--font-montserrat), system-ui, sans-serif;
          font-size: 15.5px;
          line-height: 1.62;
          color: var(--text-muted);
          max-width: 56ch;
        }

        .earlyv1-fields {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px dashed rgba(var(--color-navy-rgb), 0.22);
          border-bottom: 1px dashed rgba(var(--color-navy-rgb), 0.22);
          margin-bottom: 34px;
        }
        .earlyv1-field {
          padding: 20px 22px 20px 0;
          opacity: 0;
          animation: earlyv1-rise 0.6s ease forwards;
        }
        .earlyv1-field:not(:last-child) {
          border-right: 1px dashed rgba(var(--color-navy-rgb), 0.18);
          padding-right: 24px;
        }
        .earlyv1-field:not(:first-child) { padding-left: 24px; }
        .earlyv1-field:nth-child(1) { animation-delay: 0.5s; }
        .earlyv1-field:nth-child(2) { animation-delay: 0.62s; }
        .earlyv1-field:nth-child(3) { animation-delay: 0.74s; }
        .earlyv1-fcode {
          font-family: ${MONO};
          font-size: 11px;
          color: var(--color-teal);
          letter-spacing: 0.1em;
        }
        .earlyv1-flabel {
          margin: 8px 0 7px;
          font-family: ${MONO};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-navy);
          line-height: 1.3;
        }
        .earlyv1-fdesc {
          margin: 0;
          font-family: var(--font-montserrat), system-ui, sans-serif;
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--text-muted);
        }

        .earlyv1-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .earlyv1-seat {
          font-family: ${MONO};
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(var(--color-navy-rgb), 0.55);
        }
        .earlyv1-seat b { color: var(--color-navy); }
        .earlyv1-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 26px;
          border-radius: 14px;
          font-family: var(--font-montserrat), system-ui, sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--color-light-1);
          text-decoration: none;
          background: linear-gradient(120deg, var(--color-navy), var(--color-cobalt));
          box-shadow: 0 16px 30px -12px rgba(var(--color-navy-rgb), 0.8);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          overflow: hidden;
        }
        .earlyv1-cta::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-18deg);
          transition: left 0.6s ease;
        }
        .earlyv1-cta i {
          transition: transform 0.25s ease;
        }
        .earlyv1-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 22px 40px -12px rgba(var(--color-cobalt-rgb), 0.9);
          background: linear-gradient(120deg, var(--color-cobalt), var(--color-navy));
        }
        .earlyv1-cta:hover::after { left: 130%; }
        .earlyv1-cta:hover i { transform: translateX(5px); }
        .earlyv1-cta:focus-visible {
          outline: 3px solid var(--color-teal);
          outline-offset: 3px;
        }

        @keyframes earlyv1-fade {
          to { opacity: 1; }
        }
        @keyframes earlyv1-tear {
          0%   { opacity: 0; transform: perspective(1400px) rotateX(-9deg) translateY(34px) scale(0.985); }
          100% { opacity: 1; transform: perspective(1400px) rotateX(0deg) translateY(0) scale(1); }
        }
        @keyframes earlyv1-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 767px) {
          .earlyv1-section { padding: 80px 0; }
          .earlyv1-ticket {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1px 1fr;
          }
          .earlyv1-stub {
            flex-direction: row;
            align-items: center;
            border-radius: 22px 22px 0 0;
            padding: 22px 24px;
          }
          .earlyv1-vert {
            writing-mode: horizontal-tb;
            transform: none;
            letter-spacing: 0.3em;
            font-size: 13px;
          }
          .earlyv1-barcode {
            width: 120px;
            height: 40px;
            flex: 0 0 auto;
          }
          .earlyv1-perf {
            background-image: linear-gradient(90deg, var(--color-navy) 50%, transparent 50%);
            background-size: 12px 2px;
            background-repeat: repeat-x;
            background-position: center;
          }
          .earlyv1-notch { top: 50%; transform: translateY(-50%); left: auto; }
          .earlyv1-notch.top { left: -13px; top: 50%; }
          .earlyv1-notch.bottom { right: -13px; bottom: auto; left: auto; }
          .earlyv1-body {
            padding: 32px 24px 34px;
            border-radius: 0 0 22px 22px;
          }
          .earlyv1-title { font-size: 27px; }
          .earlyv1-fields { grid-template-columns: 1fr; }
          .earlyv1-field {
            padding: 18px 0;
            border-right: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .earlyv1-field:not(:last-child) {
            border-bottom: 1px dashed rgba(var(--color-navy-rgb), 0.18);
          }
          .earlyv1-foot { flex-direction: column; align-items: stretch; }
          .earlyv1-cta { justify-content: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .earlyv1-eyebrow,
          .earlyv1-ticket,
          .earlyv1-field {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="earlyv1-inner">
        <p className="earlyv1-eyebrow">
          <span aria-hidden="true" />
          EARLY ACCESS · PORTUGAL
          <span aria-hidden="true" />
        </p>

        <article className="earlyv1-ticket">
          {/* LEFT STUB */}
          <div className="earlyv1-stub">
            <span className="earlyv1-stubmark">DocAgora</span>
            <span className="earlyv1-vert">EARLY ACCESS</span>
            <div className="earlyv1-barcode" aria-hidden="true" />
            <span className="earlyv1-stubid">N&deg; EA-2026</span>
          </div>

          {/* PERFORATION */}
          <div className="earlyv1-perf" aria-hidden="true">
            <span className="earlyv1-notch top" />
            <span className="earlyv1-notch bottom" />
          </div>

          {/* RIGHT BODY */}
          <div className="earlyv1-body">
            <div className="earlyv1-route">
              <span>DocAgora</span>
              <i className="fas fa-arrow-right-long" aria-hidden="true" />
              <span>Portugal</span>
            </div>

            <h2 id="earlyv1-title" className="earlyv1-title">
              {t("title")}
            </h2>
            <p className="earlyv1-sub">{t("subtitle")}</p>

            <div className="earlyv1-fields">
              {fields.map((f) => (
                <div key={f.code} className="earlyv1-field">
                  <span className="earlyv1-fcode">{f.code}</span>
                  <p className="earlyv1-flabel">{f.title}</p>
                  <p className="earlyv1-fdesc">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="earlyv1-foot">
              <span className="earlyv1-seat">
                SEAT <b>00&mdash;01</b> · FOUNDING
              </span>
              <a className="earlyv1-cta" href={REGISTER_HREF}>
                {t("cta")}
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
