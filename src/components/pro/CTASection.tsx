"use client";

import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

export default function CTASection() {
  const t = useTranslations("pro.cta");

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #070C16 0%, #0C121E 60%, #244882 100%)",
        padding: "90px 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(103,203,199,0.2), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(103,203,199,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,124,199,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "rgba(103,203,199,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <i
                className="fas fa-rocket"
                style={{ fontSize: 20, color: "var(--color-accent)" }}
              ></i>
            </div>
            <h3
              style={{
                fontSize: "clamp(24px, 3vw, 38px)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 16,
                lineHeight: 1.3,
              }}
            >
              {t("title")}
            </h3>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {t("subtitle")}
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <a
                href={`${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--color-accent)",
                  color: "#fff",
                  padding: "14px 32px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 16px rgba(var(--color-teal-rgb), 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(var(--color-teal-rgb), 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(var(--color-teal-rgb), 0.3)";
                }}
              >
                {t("ctaGetStarted")}
                <i className="fas fa-arrow-right" style={{ fontSize: 13 }}></i>
              </a>
              <a
                href="#contact-form"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  padding: "14px 32px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.15)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {t("ctaBookDemo")}
              </a>
            </div>
            {/* Trust line — reduce friction */}
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.4)",
                marginTop: 20,
                marginBottom: 0,
              }}
            >
              {t("trustLine")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
