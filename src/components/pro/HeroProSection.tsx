"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

export default function HeroProSection() {
  const t = useTranslations("pro.hero");

  return (
    <section
      id="hero-form"
      className="hero-pro"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #132144 60%, #1a3a5c 100%)",
        padding: "120px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left column -- Text */}
          <div className="col-lg-6">
            <div className="d-flex flex-wrap gap-2 mb-4">
              {["badge1", "badge2", "badge3"].map((key) => (
                <span
                  key={key}
                  style={{
                    display: "inline-block",
                    background: "rgba(33,205,192,0.12)",
                    color: "#21cdc0",
                    padding: "5px 14px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {t(key)}
                </span>
              ))}
            </div>
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 46px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              {t("title")}
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 500,
              }}
            >
              {t("subtitle")}
            </p>
            <div className="d-flex flex-wrap gap-3">
              <a
                href={`${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`}
                className="btn btn__primary btn__rounded"
                style={{ fontSize: 15 }}
              >
                <span>{t("ctaGetStarted")}</span>
              </a>
              <a
                href="#hero-form"
                className="btn btn__secondary btn__rounded"
                style={{
                  fontSize: 15,
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <span>{t("ctaBookDemo")}</span>
              </a>
            </div>
          </div>

          {/* Right column -- Contact form */}
          <div className="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "32px 28px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              }}
            >
              <h5
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 6,
                  color: "#1a1a2e",
                }}
              >
                {t("formTitle")}
              </h5>
              <p
                style={{
                  fontSize: 13,
                  color: "#6b7280",
                  marginBottom: 20,
                }}
              >
                {t("formNote")}
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `${PLATFORM_URL}/register?role=professional&utm_source=landing_pro&utm_medium=form`;
                }}
                className="d-flex flex-column gap-3"
              >
                <select
                  className="form-control"
                  style={{ fontSize: 14, borderRadius: 8, padding: "10px 14px" }}
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
                      style={{ fontSize: 14, borderRadius: 8, padding: "10px 14px" }}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("formLastName")}
                      style={{ fontSize: 14, borderRadius: 8, padding: "10px 14px" }}
                    />
                  </div>
                </div>
                <input
                  type="email"
                  className="form-control"
                  placeholder={t("formEmail")}
                  style={{ fontSize: 14, borderRadius: 8, padding: "10px 14px" }}
                />
                <div className="row g-2">
                  <div className="col-6">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder={t("formPhone")}
                      style={{ fontSize: 14, borderRadius: 8, padding: "10px 14px" }}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("formPostalCode")}
                      style={{ fontSize: 14, borderRadius: 8, padding: "10px 14px" }}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("formSpecialty")}
                  style={{ fontSize: 14, borderRadius: 8, padding: "10px 14px" }}
                />
                <button
                  type="submit"
                  className="btn btn__primary btn__rounded w-100"
                  style={{ fontSize: 15, padding: "12px" }}
                >
                  {t("formSubmit")}
                </button>
              </form>
              <p
                style={{
                  fontSize: 11,
                  color: "#9ca3af",
                  marginTop: 12,
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
    </section>
  );
}
