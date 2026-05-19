"use client";

import { useTranslations } from "next-intl";

export default function StatsSection() {
  const t = useTranslations("pro.stats");

  const stats = [
    { valueKey: "stat1Value", labelKey: "stat1Label" },
    { valueKey: "stat2Value", labelKey: "stat2Label" },
    { valueKey: "stat3Value", labelKey: "stat3Label" },
  ] as const;

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #070C16, #0C121E)",
        padding: "70px 0",
        position: "relative",
      }}
    >
      {/* Top subtle divider */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(103,203,199,0.2), transparent)",
      }} />

      <div className="container">
        <div className="row align-items-center">
          {/* Stats */}
          <div className="col-lg-7">
            <div className="row g-4">
              {stats.map((stat, i) => (
                <div key={stat.valueKey} className="col-4 text-center">
                  <h3
                    style={{
                      fontSize: "clamp(26px, 3vw, 42px)",
                      fontWeight: 700,
                      color: "var(--color-accent)",
                      marginBottom: 8,
                      lineHeight: 1,
                    }}
                  >
                    {t(stat.valueKey)}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(12px, 1.2vw, 14px)",
                      color: "rgba(255,255,255,0.55)",
                      marginBottom: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {t(stat.labelKey)}
                  </p>
                  {/* Divider between stats on desktop */}
                  {i < stats.length - 1 && (
                    <div style={{
                      position: "absolute",
                      right: 0,
                      top: "15%",
                      height: "70%",
                      width: 1,
                      background: "rgba(255,255,255,0.08)",
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          {/* Temporary testimonial — to be replaced with real verified testimonial */}
          <div className="col-lg-4 offset-lg-1 mt-4 mt-lg-0">
            <div
              style={{
                borderLeft: "3px solid var(--color-accent)",
                paddingLeft: 24,
              }}
            >
              <i className="fas fa-quote-left" style={{ color: "rgba(103,203,199,0.3)", fontSize: 24, marginBottom: 12, display: "block" }}></i>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.75)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {t("testimonialQuote")}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--color-accent)",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                {t("testimonialName")}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 0,
                }}
              >
                {t("testimonialSpecialty")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
