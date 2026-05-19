"use client";

import { useTranslations } from "next-intl";

export default function VideoSection() {
  const t = useTranslations("pro.video");

  const cards = [
    { icon: "fas fa-layer-group", titleKey: "card1Title", descKey: "card1Desc" },
    { icon: "fas fa-users", titleKey: "card2Title", descKey: "card2Desc" },
    { icon: "fas fa-brain", titleKey: "card3Title", descKey: "card3Desc" },
    { icon: "fas fa-headset", titleKey: "card4Title", descKey: "card4Desc" },
  ] as const;

  return (
    <section style={{ padding: "80px 0 60px", background: "#fff" }}>
      <div className="container">
        {/* Video placeholder - 16:9 aspect ratio */}
        <div
          className="text-center mb-5"
          style={{
            background: "linear-gradient(135deg, var(--color-dark-2) 0%, var(--color-dark-1) 80%, var(--color-navy) 100%)",
            borderRadius: 20,
            position: "relative",
            overflow: "hidden",
            aspectRatio: "16/9",
            maxHeight: 420,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              border: "2px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            <i className="fas fa-play" style={{ fontSize: 24, color: "#fff", marginLeft: 3 }}></i>
          </div>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", fontWeight: 500, marginBottom: 0 }}>
            {t("placeholder")}
          </p>
        </div>

        {/* Feature cards */}
        <div className="row g-4">
          {cards.map((card) => (
            <div key={card.titleKey} className="col-sm-6 col-lg-3">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "28px 22px",
                  border: "1px solid var(--border-default)",
                  height: "100%",
                  transition: "box-shadow 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(var(--color-cobalt-rgb), 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <i className={card.icon} style={{ fontSize: 20, color: "var(--color-pro-accent)" }}></i>
                </div>
                <h6 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: "var(--color-dark-1)" }}>
                  {t(card.titleKey)}
                </h6>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 0 }}>
                  {t(card.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
