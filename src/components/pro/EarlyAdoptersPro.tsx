"use client";

import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

export default function EarlyAdoptersPro() {
  const t = useTranslations("pro");

  const benefits = [
    { titleKey: "bullet1Title", descKey: "bullet1Desc", icon: "fas fa-rocket" },
    { titleKey: "bullet2Title", descKey: "bullet2Desc", icon: "fas fa-euro-sign" },
    { titleKey: "bullet3Title", descKey: "bullet3Desc", icon: "fas fa-headset" },
  ] as const;

  return (
    <section
      style={{
        background: "var(--color-dark-1)",
        padding: "120px 0 80px",
      }}
    >
      <div className="container-landing">
        {/* Header */}
        <div className="text-center" style={{ maxWidth: 640, margin: "0 auto 64px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            {t("earlyAdopters.title")}
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              marginBottom: 0,
            }}
          >
            {t("earlyAdopters.subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4 mb-5">
          {benefits.map((benefit) => (
            <div key={benefit.titleKey} className="col-lg-4 col-md-6">
              <div
                style={{
                  background: "var(--color-dark-2)",
                  borderRadius: 12,
                  padding: 32,
                  height: "100%",
                  border: "1px solid rgba(var(--color-cobalt-rgb), 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.4)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "rgba(var(--color-teal-rgb), 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                  }}
                >
                  <i
                    className={benefit.icon}
                    style={{ fontSize: 22, color: "var(--color-teal)" }}
                  />
                </div>

                <h3
                  style={{
                    fontSize: "clamp(18px, 2vw, 22px)",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 8,
                    lineHeight: 1.3,
                  }}
                >
                  {t(`earlyAdopters.${benefit.titleKey}`)}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.7,
                    marginBottom: 0,
                  }}
                >
                  {t(`earlyAdopters.${benefit.descKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="text-center">
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
            {t("earlyAdopters.cta")}
            <i className="fas fa-arrow-right" style={{ fontSize: 13 }} />
          </a>
        </div>
      </div>
    </section>
  );
}
