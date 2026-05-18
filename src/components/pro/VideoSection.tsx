"use client";

import { useTranslations } from "next-intl";

export default function VideoSection() {
  const t = useTranslations("pro.video");

  const cards = [
    { icon: "fas fa-layer-group", titleKey: "card1Title", descKey: "card1Desc" },
    { icon: "fas fa-users", titleKey: "card2Title", descKey: "card2Desc" },
    { icon: "fas fa-brain", titleKey: "card3Title", descKey: "card3Desc" },
    { icon: "fas fa-headset", titleKey: "card4Title", descKey: "card4Desc" },
  ];

  return (
    <section style={{ padding: "80px 0 60px" }}>
      <div className="container">
        {/* Video placeholder */}
        <div
          className="text-center mb-5"
          style={{
            background: "linear-gradient(135deg, #f0f9ff, #e8f4fd)",
            borderRadius: 20,
            padding: "80px 20px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#21cdc0",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <i className="fas fa-play" style={{ fontSize: 28, color: "#fff", marginLeft: 4 }}></i>
          </div>
          <p style={{ fontSize: 16, color: "#6b7280", fontWeight: 500 }}>
            {t("placeholder")}
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {cards.map((card) => (
            <div key={card.titleKey} className="col-sm-6 col-lg-3">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "28px 22px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(33,205,192,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <i className={card.icon} style={{ fontSize: 20, color: "#21cdc0" }}></i>
                </div>
                <h6 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                  {t(card.titleKey)}
                </h6>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 0 }}>
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
