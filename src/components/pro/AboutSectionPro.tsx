"use client";

import { useTranslations } from "next-intl";

export default function AboutSectionPro() {
  const t = useTranslations("pro");

  const values = ["bullet1Title", "bullet2Title", "bullet3Title"] as const;

  return (
    <section style={{ padding: "120px 0", background: "var(--color-light-1)" }}>
      <div className="container-landing">
        <div className="row align-items-center">
          {/* Left — Illustration placeholder */}
          <div className="col-lg-5 mb-5 mb-lg-0">
            <div
              style={{
                background: "linear-gradient(135deg, rgba(var(--color-cobalt-rgb), 0.06) 0%, rgba(var(--color-teal-rgb), 0.06) 100%)",
                borderRadius: 16,
                padding: "64px 40px",
                border: "1px solid rgba(var(--color-cobalt-rgb), 0.1)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Abstract visual placeholder */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-cobalt), var(--color-teal))",
                  margin: "0 auto 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(var(--color-cobalt-rgb), 0.2)",
                }}
              >
                <i
                  className="fas fa-heartbeat"
                  style={{ fontSize: 32, color: "#fff" }}
                />
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--color-navy)",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                DocAgora
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                Portugal &middot; 2024
              </div>

              {/* Decorative dots */}
              <div style={{ position: "absolute", top: 20, left: 20, width: 8, height: 8, borderRadius: "50%", background: "rgba(var(--color-teal-rgb), 0.2)" }} />
              <div style={{ position: "absolute", bottom: 30, right: 30, width: 12, height: 12, borderRadius: "50%", background: "rgba(var(--color-cobalt-rgb), 0.15)" }} />
              <div style={{ position: "absolute", top: 40, right: 40, width: 6, height: 6, borderRadius: "50%", background: "rgba(var(--color-mint-rgb), 0.25)" }} />
            </div>
          </div>

          {/* Right — Text content */}
          <div className="col-lg-6 offset-lg-1">
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--color-cobalt)",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 12,
              }}
            >
              {t("aboutSection.eyebrow") ?? "Sobre"}
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 700,
                color: "var(--color-dark-1)",
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              {t("aboutSection.title")}
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "var(--text-muted)",
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              {t("aboutSection.desc")}
            </p>
            <p
              style={{
                fontSize: 17,
                color: "var(--text-muted)",
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              {t("aboutSection.bullet3Desc")}
            </p>

            {/* Value bullets */}
            <div className="d-flex flex-column gap-3">
              {values.map((value) => (
                <div
                  key={value}
                  style={{
                    background: "var(--color-light-2)",
                    borderRadius: 10,
                    padding: "16px 22px",
                    border: "1px solid rgba(var(--color-cobalt-rgb), 0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <i
                    className="fas fa-check-circle"
                    style={{
                      color: "var(--color-teal)",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--color-dark-1)",
                    }}
                  >
                    {t(`aboutSection.${value}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
