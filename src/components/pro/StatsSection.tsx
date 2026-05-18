"use client";

import { useTranslations } from "next-intl";

export default function StatsSection() {
  const t = useTranslations("pro.stats");

  const stats = [
    { valueKey: "stat1Value", labelKey: "stat1Label" },
    { valueKey: "stat2Value", labelKey: "stat2Label" },
    { valueKey: "stat3Value", labelKey: "stat3Label" },
  ];

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0a1628, #132144)",
        padding: "60px 0",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Stats */}
          <div className="col-lg-7">
            <div className="row g-4">
              {stats.map((stat) => (
                <div key={stat.valueKey} className="col-sm-4 text-center">
                  <h3
                    style={{
                      fontSize: "clamp(28px, 3vw, 40px)",
                      fontWeight: 700,
                      color: "#21cdc0",
                      marginBottom: 6,
                    }}
                  >
                    {t(stat.valueKey)}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: 0,
                    }}
                  >
                    {t(stat.labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="col-lg-5 mt-4 mt-lg-0">
            <div
              style={{
                borderLeft: "3px solid #21cdc0",
                paddingLeft: 24,
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.8)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  marginBottom: 12,
                }}
              >
                &ldquo;{t("testimonialQuote")}&rdquo;
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "#21cdc0",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                {t("testimonialName")}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
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
