"use client";

import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

export default function ImproveSection() {
  const t = useTranslations("pro.improve");

  const blocks = [
    {
      titleKey: "block1Title",
      subtitleKey: "block1Subtitle",
      bullets: ["block1Bullet1", "block1Bullet2"],
      ctaKey: "block1Cta",
      icon: "fas fa-heartbeat",
      gradient: "linear-gradient(135deg, var(--color-teal), var(--color-mint))",
      accentColor: "var(--color-pro-accent)",
    },
    {
      titleKey: "block2Title",
      subtitleKey: "block2Subtitle",
      bullets: ["block2Bullet1", "block2Bullet2"],
      ctaKey: "block2Cta",
      icon: "fas fa-hand-holding-medical",
      gradient: "linear-gradient(135deg, var(--color-cobalt), var(--color-navy))",
      accentColor: "var(--color-pro-accent)",
    },
    {
      titleKey: "block3Title",
      subtitleKey: "block3Subtitle",
      bullets: ["block3Bullet1", "block3Bullet2"],
      ctaKey: "block3Cta",
      icon: "fas fa-chart-line",
      gradient: "linear-gradient(135deg, #6f42c1, #5a32a3)",
      accentColor: "#6f42c1",
    },
  ] as const;

  return (
    <section style={{ padding: "80px 0", background: "var(--bg-section)" }}>
      <div className="container">
        <div className="row g-4">
          {blocks.map((block) => (
            <div key={block.titleKey} className="col-lg-4 col-md-6">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "32px 26px 28px",
                  border: "1px solid var(--border-default)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: block.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <i
                    className={block.icon}
                    style={{ fontSize: 22, color: "#fff" }}
                  ></i>
                </div>
                <h5
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: "var(--color-dark-1)",
                  }}
                >
                  {t(block.titleKey)}
                </h5>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-muted)",
                    marginBottom: 20,
                    lineHeight: 1.6,
                  }}
                >
                  {t(block.subtitleKey)}
                </p>
                <ul
                  className="list-unstyled"
                  style={{ marginBottom: 24, flex: 1 }}
                >
                  {block.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="d-flex align-items-start gap-2 mb-2"
                      style={{ fontSize: 14, color: "#374151" }}
                    >
                      <i
                        className="fas fa-check-circle"
                        style={{
                          color: block.accentColor,
                          marginTop: 3,
                          fontSize: 14,
                          flexShrink: 0,
                        }}
                      ></i>
                      {t(bullet)}
                    </li>
                  ))}
                </ul>
                <a
                  href={`${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`}
                  className="d-inline-flex align-items-center gap-1"
                  style={{
                    color: block.accentColor,
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "gap 0.2s",
                  }}
                >
                  {t(block.ctaKey)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
