"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

export default function HeroProSection() {
  const t = useTranslations("pro.hero");

  return (
    <section
      className="hero-pro"
      style={{
        background: "linear-gradient(135deg, #070C16 0%, #0C121E 60%, #244882 100%)",
        paddingTop: 160,
        paddingBottom: 80,
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(103,203,199,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,124,199,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row align-items-start">
          {/* Left column */}
          <div className="col-lg-6" style={{ paddingTop: 20 }}>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {(["badge1", "badge2", "badge3"] as const).map((key) => (
                <span
                  key={key}
                  style={{
                    display: "inline-block",
                    background: "rgba(103,203,199,0.12)",
                    color: "var(--color-accent)",
                    padding: "6px 16px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 0.3,
                  }}
                >
                  {t(key)}
                </span>
              ))}
            </div>
            <h1
              style={{
                fontSize: "clamp(30px, 4vw, 48px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              {t("title")}
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              {t("subtitle")}
            </p>
            <div className="d-flex flex-wrap gap-3">
              <a
                href={`${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--color-accent)",
                  color: "#fff",
                  padding: "14px 28px",
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
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  padding: "14px 28px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "all 0.3s",
                }}
                className="d-lg-none"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
              >
                {t("ctaLearnMore")}
                <i className="fas fa-chevron-down" style={{ fontSize: 11 }}></i>
              </a>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
            <div
              id="contact-form"
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "32px 28px 24px",
                boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
              }}
            >
              <h5
                style={{
                  fontSize: 19,
                  fontWeight: 700,
                  marginBottom: 4,
                  color: "var(--color-dark-1)",
                }}
              >
                {t("formTitle")}
              </h5>
              <p
                style={{
                  fontSize: 13,
                  color: "#6b7280",
                  marginBottom: 20,
                  lineHeight: 1.6,
                }}
              >
                {t("formNote")}
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `${PLATFORM_URL}/register?role=professional&utm_source=landing_pro&utm_medium=form`;
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <select
                    className="form-control"
                    style={{ color: "#6b7280", cursor: "pointer" }}
                  >
                    <option>{t("formSubjectLabel")}</option>
                    <option>{t("formSubjectOption1")}</option>
                    <option>{t("formSubjectOption2")}</option>
                    <option>{t("formSubjectOption3")}</option>
                  </select>
                  <div className="row g-2">
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("formFirstName")}
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("formLastName")}
                      />
                    </div>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder={t("formEmail")}
                  />
                  <div className="row g-2">
                    <div className="col-6">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder={t("formPhone")}
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t("formPostalCode")}
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("formSpecialty")}
                  />
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "13px 20px",
                      background: "var(--color-accent)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s",
                      marginTop: 4,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--color-accent-hover)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(var(--color-teal-rgb), 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--color-accent)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {t("formSubmit")}
                  </button>
                </div>
              </form>
              {/* Trust indicators */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  marginTop: 16,
                  marginBottom: 4,
                }}
              >
                <i className="fas fa-shield-alt" style={{ fontSize: 12, color: "var(--color-accent)" }}></i>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>
                  {t("formTrustLine")}
                </span>
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "#9ca3af",
                  marginTop: 4,
                  marginBottom: 0,
                  textAlign: "center",
                }}
              >
                <Link
                  href="/privacy-policy"
                  style={{ color: "#9ca3af", textDecoration: "underline" }}
                >
                  {t("formPrivacyLink")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Override template form-control pill shape inside this section */}
      <style>{`
        .hero-pro .form-control {
          border-radius: 8px !important;
          height: auto !important;
          padding: 10px 14px !important;
          border: 1px solid #e2e8f0 !important;
          font-size: 14px !important;
        }
        .hero-pro .form-control:focus {
          border-color: #67CBC7 !important;
          box-shadow: 0 0 0 3px rgba(103,203,199,0.1) !important;
        }
        .hero-pro select.form-control {
          appearance: auto;
          -webkit-appearance: auto;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}
