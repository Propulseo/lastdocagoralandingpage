"use client";

import { useTranslations } from "next-intl";

export default function ImproveSection() {
  const t = useTranslations("pro.improve");

  const blocks = [
    {
      titleKey: "block1Title",
      subtitleKey: "block1Subtitle",
      bullets: ["block1Bullet1", "block1Bullet2"],
      ctaKey: "block1Cta",
      icon: "fas fa-heartbeat",
      gradient: "linear-gradient(135deg, #21cdc0, #17a89e)",
    },
    {
      titleKey: "block2Title",
      subtitleKey: "block2Subtitle",
      bullets: ["block2Bullet1", "block2Bullet2"],
      ctaKey: "block2Cta",
      icon: "fas fa-hand-holding-medical",
      gradient: "linear-gradient(135deg, #0d6efd, #0a58ca)",
    },
    {
      titleKey: "block3Title",
      subtitleKey: "block3Subtitle",
      bullets: ["block3Bullet1", "block3Bullet2"],
      ctaKey: "block3Cta",
      icon: "fas fa-chart-line",
      gradient: "linear-gradient(135deg, #6f42c1, #5a32a3)",
    },
  ];

  return (
    <section style={{ padding: "80px 0" }}>
      <div className="container">
        <div className="row g-4">
          {blocks.map((block) => (
            <div key={block.titleKey} className="col-lg-4">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "32px 26px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
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
                  }}
                >
                  {t(block.titleKey)}
                </h5>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    marginBottom: 20,
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
                          color: "#21cdc0",
                          marginTop: 3,
                          fontSize: 14,
                        }}
                      ></i>
                      {t(bullet)}
                    </li>
                  ))}
                </ul>
                <a
                  href="#hero-form"
                  style={{
                    color: "#0d6efd",
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
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
