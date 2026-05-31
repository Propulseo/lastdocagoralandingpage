"use client";

import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

export default function ImproveSection() {
  const t = useTranslations("pro.improve");

  const blocks = [
    {
      titleKey: "block1Title",
      subtitleKey: "block1Subtitle",
      bullets: ["block1Bullet1", "block1Bullet2"],
      ctaKey: "block1Cta",
      icon: "fas fa-heartbeat",
      accentColor: "var(--color-cobalt)",
      accentBg: "rgba(var(--color-cobalt-rgb), 0.12)",
    },
    {
      titleKey: "block2Title",
      subtitleKey: "block2Subtitle",
      bullets: ["block2Bullet1", "block2Bullet2"],
      ctaKey: "block2Cta",
      icon: "fas fa-hand-holding-medical",
      accentColor: "var(--color-mint)",
      accentBg: "rgba(var(--color-mint-rgb), 0.12)",
    },
    {
      titleKey: "block3Title",
      subtitleKey: "block3Subtitle",
      bullets: ["block3Bullet1", "block3Bullet2"],
      ctaKey: "block3Cta",
      icon: "fas fa-chart-line",
      accentColor: "var(--color-teal)",
      accentBg: "rgba(var(--color-teal-rgb), 0.12)",
    },
  ] as const;

  return (
    <section
      id="solutions"
      className="pro-section pro-s-improve"
      style={{
        background: "var(--color-light-1)",
        padding: "120px 0",
      }}
    >
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
            {t("sectionTitle")}
          </h2>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {blocks.map((block) => (
              <div key={block.titleKey} className="col-lg-4 col-md-6">
                <div
                  style={{
                    background: "var(--color-light-1)",
                    borderRadius: 12,
                    padding: 32,
                    border: "1px solid rgba(var(--color-cobalt-rgb), 0.15)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
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
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                      background: block.accentBg,
                    }}
                  >
                    <i
                      className={block.icon}
                      style={{ fontSize: 22, color: block.accentColor }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "clamp(18px, 2vw, 22px)",
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "var(--color-dark-1)",
                      lineHeight: 1.3,
                    }}
                  >
                    {t(block.titleKey)}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 15,
                      color: "var(--text-muted)",
                      marginBottom: 20,
                      lineHeight: 1.6,
                    }}
                  >
                    {t(block.subtitleKey)}
                  </p>

                  {/* Bullets */}
                  <ul className="list-unstyled" style={{ marginBottom: 24, flex: 1 }}>
                    {block.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          marginBottom: 10,
                          fontSize: 14,
                          color: "var(--color-dark-1)",
                        }}
                      >
                        <i
                          className="fas fa-check-circle"
                          style={{
                            color: "var(--color-cobalt)",
                            marginTop: 3,
                            fontSize: 14,
                            flexShrink: 0,
                          }}
                        />
                        {t(bullet)}
                      </li>
                    ))}
                  </ul>

                  {/* Tertiary CTA */}
                  <a
                    href={`${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`}
                    className="improve-card__cta"
                  >
                    <span>{t(block.ctaKey)}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="improve-card__cta-icon"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
