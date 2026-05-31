"use client";

import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

const REGISTER_HREF = `${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`;
const CONTACT_HREF = "mailto:hello@docagora.com";

export default function CTASection() {
  const t = useTranslations("pro.cta");

  // Split the marquee trust line into a repeatable token strip.
  const trustLine = t("trustLine");

  return (
    <section className="ctav1-section pro-section pro-s-cta" aria-labelledby="ctav1-title">
      <style>{`
        .ctav1-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(120% 90% at 12% -10%, rgba(var(--color-teal-rgb), 0.10), transparent 55%),
            radial-gradient(90% 70% at 100% 0%, rgba(var(--color-cobalt-rgb), 0.07), transparent 50%),
            #08070b;
          color: #f4f3ef;
          padding: clamp(96px, 11vw, 140px) 0 clamp(72px, 8vw, 104px);
          isolation: isolate;
        }

        /* Faint blueprint grid + grain overlay */
        .ctav1-section::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background-image:
            linear-gradient(rgba(244, 243, 239, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244, 243, 239, 0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(120% 120% at 50% 0%, #000 30%, transparent 90%);
          -webkit-mask-image: radial-gradient(120% 120% at 50% 0%, #000 30%, transparent 90%);
          pointer-events: none;
        }
        .ctav1-section::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.5;
          mix-blend-mode: overlay;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
        }

        .ctav1-inner {
          position: relative;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 56px);
        }

        .ctav1-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin: 0 0 clamp(28px, 4vw, 44px);
          opacity: 0;
          animation: ctav1-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
        }
        .ctav1-eyebrow span:first-child {
          width: 40px;
          height: 1px;
          background: var(--color-teal);
          display: inline-block;
        }

        .ctav1-title {
          margin: 0;
          font-family: var(--font-montserrat), system-ui, sans-serif;
          font-weight: 800;
          font-size: clamp(44px, 9.2vw, 110px);
          line-height: 0.92;
          letter-spacing: -0.025em;
          text-wrap: balance;
          max-width: 16ch;
          color: #f7f6f2;
        }
        .ctav1-title .ctav1-line {
          display: block;
          overflow: hidden;
        }
        .ctav1-title .ctav1-line > span {
          display: block;
          transform: translateY(110%);
          clip-path: inset(0 0 100% 0);
          animation: ctav1-reveal 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .ctav1-title .ctav1-l1 > span { animation-delay: 0.12s; }
        .ctav1-title .ctav1-l2 > span { animation-delay: 0.24s; }
        .ctav1-title em {
          font-family: var(--font-fraunces), Georgia, serif;
          font-style: italic;
          font-weight: 600;
          color: var(--color-teal);
          letter-spacing: -0.01em;
        }

        .ctav1-subtitle {
          margin: clamp(28px, 4vw, 40px) 0 0;
          max-width: 46ch;
          font-family: var(--font-montserrat), system-ui, sans-serif;
          font-size: clamp(15px, 1.5vw, 18px);
          line-height: 1.6;
          color: rgba(244, 243, 239, 0.62);
          opacity: 0;
          animation: ctav1-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
        }

        .ctav1-actions {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: clamp(28px, 5vw, 64px);
          margin-top: clamp(48px, 6vw, 72px);
          opacity: 0;
          animation: ctav1-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.62s forwards;
        }

        /* Primary: oversized text CTA with travelling arrow + animated underline */
        .ctav1-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.55em;
          font-family: var(--font-montserrat), system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(22px, 3vw, 34px);
          letter-spacing: -0.015em;
          color: #f7f6f2;
          text-decoration: none;
          padding-bottom: 6px;
        }
        .ctav1-primary::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 100%;
          background: var(--color-teal);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ctav1-primary:hover::after,
        .ctav1-primary:focus-visible::after {
          transform: scaleX(1);
        }
        .ctav1-arrow {
          display: inline-block;
          color: var(--color-teal);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .ctav1-primary:hover .ctav1-arrow,
        .ctav1-primary:focus-visible .ctav1-arrow {
          transform: translateX(0.4em);
        }
        .ctav1-primary:focus-visible {
          outline: 2px solid var(--color-teal);
          outline-offset: 6px;
          border-radius: 2px;
        }

        /* Secondary: quiet mailto link */
        .ctav1-secondary {
          position: relative;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(244, 243, 239, 0.5);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .ctav1-secondary::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right center;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ctav1-secondary:hover,
        .ctav1-secondary:focus-visible {
          color: #f4f3ef;
        }
        .ctav1-secondary:hover::after,
        .ctav1-secondary:focus-visible::after {
          transform: scaleX(1);
          transform-origin: left center;
        }
        .ctav1-secondary:focus-visible {
          outline: 2px solid var(--color-teal);
          outline-offset: 4px;
        }

        /* Trust marquee strip */
        .ctav1-marquee {
          position: relative;
          margin-top: clamp(64px, 8vw, 104px);
          padding-top: clamp(28px, 3vw, 40px);
          border-top: 1px solid rgba(244, 243, 239, 0.1);
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          opacity: 0;
          animation: ctav1-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.78s forwards;
        }
        .ctav1-track {
          display: inline-flex;
          align-items: center;
          gap: 0;
          white-space: nowrap;
          will-change: transform;
          animation: ctav1-scroll 28s linear infinite;
        }
        .ctav1-marquee:hover .ctav1-track {
          animation-play-state: paused;
        }
        .ctav1-token {
          display: inline-flex;
          align-items: center;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(244, 243, 239, 0.42);
        }
        .ctav1-token i {
          color: var(--color-teal);
          margin: 0 clamp(24px, 3vw, 44px);
          font-size: 7px;
          opacity: 0.85;
        }

        @keyframes ctav1-reveal {
          to {
            transform: translateY(0);
            clip-path: inset(0 0 0 0);
          }
        }
        @keyframes ctav1-rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ctav1-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 767px) {
          .ctav1-title { max-width: 100%; }
          .ctav1-actions { gap: 28px; }
          .ctav1-token i { margin: 0 22px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ctav1-eyebrow,
          .ctav1-subtitle,
          .ctav1-actions,
          .ctav1-marquee,
          .ctav1-title .ctav1-line > span {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
          }
          .ctav1-track { animation: none !important; }
        }
      `}</style>

      <div className="ctav1-inner">
        <p className="ctav1-eyebrow">
          <span aria-hidden="true" />
          <span>DocAgora · Portugal</span>
        </p>

        <h2 id="ctav1-title" className="ctav1-title">
          <span className="ctav1-line ctav1-l1">
            <span>{t("title")}</span>
          </span>
          <span className="ctav1-line ctav1-l2">
            <em>Portugal</em>
          </span>
        </h2>

        <p className="ctav1-subtitle">{t("subtitle")}</p>

        <div className="ctav1-actions">
          <a className="ctav1-primary" href={REGISTER_HREF}>
            <span>{t("ctaGetStarted")}</span>
            <i className="fas fa-arrow-right ctav1-arrow" aria-hidden="true" />
          </a>
          <a className="ctav1-secondary" href={CONTACT_HREF}>
            {t("ctaContactUs")}
          </a>
        </div>

        <div className="ctav1-marquee" aria-hidden="true">
          <div className="ctav1-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span className="ctav1-token" key={`ctav1-tok-${i}`}>
                {trustLine}
                <i className="fas fa-circle" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
        <p
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            whiteSpace: "nowrap",
          }}
        >
          {trustLine}
        </p>
      </div>
    </section>
  );
}
