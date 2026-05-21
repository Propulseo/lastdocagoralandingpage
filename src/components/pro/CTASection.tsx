"use client";

import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

export default function CTASection() {
  const t = useTranslations("pro.cta");

  return (
    <section
      style={{
        background: "var(--color-dark-1)",
        padding: "80px 0 120px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(var(--color-teal-rgb),0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-landing" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 16,
              lineHeight: 1.15,
            }}
          >
            {t("title")}
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.6)",
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
              background: "var(--color-teal)",
              color: "var(--color-dark-1)",
              padding: "16px 40px",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 16px rgba(var(--color-teal-rgb), 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-mint)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(var(--color-teal-rgb), 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-teal)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(var(--color-teal-rgb), 0.3)";
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
