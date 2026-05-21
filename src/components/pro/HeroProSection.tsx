"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FormEvent, useState } from "react";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

export default function HeroProSection() {
  const t = useTranslations("pro");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      role: "professional",
      email: email,
      firstName: firstName,
      specialty: specialty,
    });
    window.location.href = `${PLATFORM_URL}/register?${params.toString()}`;
  };

  return (
    <section className="hero-pro">
      <style>{`
        .hero-pro {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, var(--color-dark-1) 0%, var(--color-navy) 100%);
          padding: 140px 0 160px;
          overflow: hidden;
          z-index: 1;
        }
        @media (min-width: 992px) {
          .hero-pro {
            min-height: max(85vh, 720px);
          }
        }
        @media (max-width: 991px) {
          .hero-pro {
            min-height: auto;
            padding: 120px 0 80px;
          }
        }

        /* Ambient glow decorations */
        .hero-pro__glow-1 {
          position: absolute;
          top: -20%;
          right: -10%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(var(--color-cobalt-rgb), 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-pro__glow-2 {
          position: absolute;
          bottom: -15%;
          left: -8%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(var(--color-teal-rgb), 0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Wave transition at bottom */
        .hero-pro__wave {
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          line-height: 0;
          z-index: 2;
        }
        .hero-pro__wave svg {
          width: 100%;
          height: 80px;
          display: block;
        }
        @media (max-width: 768px) {
          .hero-pro__wave svg {
            height: 48px;
          }
        }

        /* Form overrides */
        .hero-pro .form-control {
          border-radius: 8px !important;
          height: auto !important;
          padding: 12px 14px !important;
          border: 1px solid rgba(var(--color-cobalt-rgb), 0.2) !important;
          font-size: 14px !important;
          background: rgba(255,255,255,0.04) !important;
          color: #fff !important;
        }
        .hero-pro .form-control::placeholder {
          color: rgba(255,255,255,0.35) !important;
        }
        .hero-pro .form-control:focus {
          border-color: var(--color-teal) !important;
          box-shadow: 0 0 0 3px rgba(var(--color-teal-rgb), 0.15) !important;
          background: rgba(255,255,255,0.06) !important;
        }
        .hero-pro select.form-control {
          appearance: auto;
          -webkit-appearance: auto;
        }
        .hero-pro select.form-control option {
          background: var(--color-dark-1);
          color: #fff;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-pro__glow-1,
          .hero-pro__glow-2 {
            display: none;
          }
        }
      `}</style>

      {/* Ambient glows */}
      <div className="hero-pro__glow-1" />
      <div className="hero-pro__glow-2" />

      <div className="container-landing" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="row align-items-center">
          {/* Left column — Message */}
          <div className="col-lg-6">
            {/* Trust badges */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              {(["badge1", "badge2", "badge3"] as const).map((key) => (
                <span
                  key={key}
                  style={{
                    display: "inline-block",
                    background: "rgba(var(--color-cobalt-rgb), 0.1)",
                    color: "var(--color-cobalt)",
                    padding: "5px 14px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 0.3,
                  }}
                >
                  {t(`hero.${key}`)}
                </span>
              ))}
            </div>

            {/* H1 */}
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 700,
                color: "var(--color-light-1)",
                lineHeight: 1.05,
                marginBottom: 24,
                fontFamily: "var(--font-body)",
              }}
            >
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "clamp(17px, 1.5vw, 20px)",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.6,
                marginBottom: 40,
                maxWidth: 520,
              }}
            >
              {t("hero.subtitle")}
            </p>

            {/* CTAs */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
              {/* Primary CTA — Teal filled */}
              <a
                href={`${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--color-teal)",
                  color: "var(--color-dark-1)",
                  padding: "16px 32px",
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
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(var(--color-teal-rgb), 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-teal)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(var(--color-teal-rgb), 0.3)";
                }}
              >
                {t("hero.ctaGetStarted")}
                <i className="fas fa-arrow-right" style={{ fontSize: 13 }} />
              </a>

              {/* Tertiary link — anchor to form */}
              <a
                href="#contact-form"
                style={{
                  color: "var(--color-cobalt)",
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                {t("hero.ctaLearnMore")}
              </a>
            </div>
          </div>

          {/* Right column — Form */}
          <div className="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
            <div
              id="contact-form"
              style={{
                background: "var(--color-dark-2)",
                borderRadius: 12,
                padding: 32,
                border: "1px solid rgba(var(--color-cobalt-rgb), 0.25)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
              }}
            >
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 4,
                  color: "#fff",
                }}
              >
                {t("hero.formTitle")}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                {t("hero.formNote")}
              </p>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="hero-email"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: 6,
                      }}
                    >
                      {t("hero.formEmailLabel")}
                    </label>
                    <input
                      id="hero-email"
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-required="true"
                      required
                    />
                  </div>

                  {/* First name */}
                  <div>
                    <label
                      htmlFor="hero-firstName"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: 6,
                      }}
                    >
                      {t("hero.formFirstNameLabel")}
                    </label>
                    <input
                      id="hero-firstName"
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      aria-required="true"
                      required
                    />
                  </div>

                  {/* Specialty */}
                  <div>
                    <label
                      htmlFor="hero-specialty"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: 6,
                      }}
                    >
                      {t("hero.formSpecialtyLabel")}
                    </label>
                    <select
                      id="hero-specialty"
                      className="form-control"
                      style={{ cursor: "pointer" }}
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      aria-required="true"
                      required
                    >
                      <option value="">{t("hero.formSpecialtyLabel")}</option>
                      <option value="general-medicine">{t("hero.formSpecialtyGP")}</option>
                      <option value="specialist">{t("hero.formSpecialtySpecialist")}</option>
                      <option value="other">{t("hero.formSpecialtyOther")}</option>
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "14px 20px",
                      background: "var(--color-teal)",
                      color: "var(--color-dark-1)",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      marginTop: 8,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--color-mint)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--color-teal)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {t("hero.formSubmit")}
                  </button>
                </div>
              </form>

              {/* Trust line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  marginTop: 16,
                }}
              >
                <i
                  className="fas fa-shield-alt"
                  style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}
                />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                  {t("hero.formTrustLine")}
                </span>
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  marginTop: 6,
                  marginBottom: 0,
                  textAlign: "center",
                }}
              >
                <Link
                  href="/privacy-policy"
                  style={{ color: "rgba(255,255,255,0.3)", textDecoration: "underline" }}
                >
                  {t("hero.formPrivacyLink")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG transition to next section */}
      <div className="hero-pro__wave">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,80 L0,48 C240,80 480,16 720,40 C960,64 1200,8 1440,32 L1440,80 Z"
            fill="var(--color-light-1)"
          />
        </svg>
      </div>
    </section>
  );
}
