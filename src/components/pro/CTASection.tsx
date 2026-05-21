"use client";

import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

export default function CTASection() {
  const t = useTranslations("pro.cta");

  return (
    <section
      style={{
        background: "var(--color-light-1)",
        padding: "80px 0 120px",
        textAlign: "center",
      }}
    >
      <div className="container-landing">
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              color: "var(--color-dark-1)",
              marginBottom: 16,
              lineHeight: 1.15,
            }}
          >
            {t("title")}
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-muted)",
              lineHeight: 1.6,
              marginBottom: 40,
            }}
          >
            {t("subtitle")}
          </p>

          {/* Primary CTA */}
          <a
            href={`${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background: "var(--color-navy)",
              color: "var(--color-light-1)",
              padding: "16px 40px",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 16px rgba(var(--color-navy-rgb), 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-cobalt)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(var(--color-navy-rgb), 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-navy)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(var(--color-navy-rgb), 0.3)";
            }}
          >
            {t("ctaGetStarted")}
            <i className="fas fa-arrow-right" style={{ fontSize: 13 }} />
          </a>

          {/* Tertiary link */}
          <div style={{ marginTop: 20 }}>
            <a
              href="mailto:hello@docagora.com"
              style={{
                color: "var(--color-cobalt)",
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              {t("ctaContactUs")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
