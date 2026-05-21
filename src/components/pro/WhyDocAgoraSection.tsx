"use client";

import { useTranslations } from "next-intl";

export default function WhyDocAgoraSection() {
  const t = useTranslations("pro");

  const differentiators = [
    { titleKey: "card1Title", descKey: "card1Desc", icon: "fas fa-map-marker-alt", color: "var(--color-cobalt)" },
    { titleKey: "card2Title", descKey: "card2Desc", icon: "fas fa-language", color: "var(--color-teal)" },
    { titleKey: "card3Title", descKey: "card3Desc", icon: "fas fa-tag", color: "var(--color-mint)" },
    { titleKey: "card4Title", descKey: "card4Desc", icon: "fas fa-bolt", color: "var(--color-cobalt)" },
  ] as const;

  return (
    <section
      style={{
        background: "var(--color-light-2)",
        padding: "120px 0",
      }}
    >
      <style>{`
        .row.why-grid {
          --bs-gutter-x: var(--spacing-lg) !important;
          --bs-gutter-y: var(--spacing-lg) !important;
        }
        .why-card { padding: var(--spacing-xl); }
        @media (max-width: 767px) {
          .row.why-grid {
            --bs-gutter-x: var(--spacing-md) !important;
            --bs-gutter-y: var(--spacing-md) !important;
          }
          .why-card { padding: var(--spacing-lg); }
        }
      `}</style>
      <div className="container-landing">
        {/* Section header */}
        <div className="text-center" style={{ maxWidth: 640, margin: "0 auto 64px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              color: "var(--color-dark-1)",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            {t("whyDocAgora.title")}
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-muted)",
              lineHeight: 1.6,
              marginBottom: 0,
            }}
          >
            {t("whyDocAgora.subtitle")}
          </p>
        </div>

        {/* 2x2 grid */}
        <div className="row why-grid">
          {differentiators.map((diff) => (
            <div key={diff.titleKey} className="col-lg-6 col-md-6">
              <div
                className="why-card"
                style={{
                  background: "var(--color-light-1)",
                  borderRadius: 12,
                  height: "100%",
                  border: "1px solid rgba(var(--color-cobalt-rgb), 0.15)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 24,
                  transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  boxShadow: "0 2px 8px rgba(36, 72, 130, 0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(36, 72, 130, 0.1)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(36, 72, 130, 0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: diff.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className={diff.icon}
                    style={{ fontSize: 20, color: "#fff" }}
                  />
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: "clamp(18px, 2vw, 22px)",
                      fontWeight: 600,
                      color: "var(--color-dark-1)",
                      marginBottom: 16,
                      lineHeight: 1.3,
                    }}
                  >
                    {t(`whyDocAgora.${diff.titleKey}`)}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      color: "var(--text-muted)",
                      lineHeight: 1.7,
                      marginBottom: 0,
                    }}
                  >
                    {t(`whyDocAgora.${diff.descKey}`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
