"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/AnimatedSection";

/* ── Inline SVG icons (aria-hidden, teal accent) ── */

function IconVerified() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4l-4.8 2.5.9-5.4L4.2 7.7l5.4-.8z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconLanguages() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const ITEMS = [
  { key: "item1", Icon: IconVerified },
  { key: "item2", Icon: IconLanguages },
  { key: "item3", Icon: IconShield },
] as const;

export default function ReassuranceBand() {
  const t = useTranslations("patientReassurance");

  return (
    <AnimatedSection>
      <section
        className="rab"
        aria-label={t("ariaLabel")}
        style={{
          background: "var(--color-light-2)",
          borderTop: "1px solid var(--border-default)",
          borderBottom: "1px solid var(--border-default)",
          padding: "var(--spacing-xl) 0",
        }}
      >
        <div
          className="rab__inner"
          style={{
            maxWidth: "1200px",
            marginInline: "auto",
            paddingInline: "var(--spacing-md)",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--spacing-md)",
          }}
        >
          {ITEMS.map(({ key, Icon }) => (
            <div
              key={key}
              className="rab__item"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--spacing-sm)",
                background: "var(--color-light-1)",
                borderRadius: "var(--radius-md)",
                padding: "var(--spacing-md)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span
                className="rab__icon"
                style={{
                  flexShrink: 0,
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(103, 203, 199, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-accent-ink)",
                }}
              >
                <Icon />
              </span>
              <div>
                <p
                  className="rab__label"
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--fw-semibold)",
                    fontSize: "var(--fs-base)",
                    color: "var(--text-default)",
                    lineHeight: 1.3,
                  }}
                >
                  {t(`${key}Label`)}
                </p>
                <p
                  className="rab__sub"
                  style={{
                    margin: "4px 0 0",
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--fw-regular)",
                    fontSize: "var(--fs-sm)",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {t(`${key}Sub`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .rab__inner {
              grid-template-columns: 1fr !important;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .rab { transition: none; }
          }
        `}</style>
      </section>
    </AnimatedSection>
  );
}
