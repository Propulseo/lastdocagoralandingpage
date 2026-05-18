"use client";

import { useTranslations } from "next-intl";

export default function TestimonialsPro() {
  const t = useTranslations("pro.testimonials");

  const items = ["item1", "item2", "item3", "item4"];

  return (
    <section style={{ padding: "80px 0", background: "#f8fafc" }}>
      <div className="container">
        <h3
          className="text-center"
          style={{
            fontSize: "clamp(24px, 3vw, 34px)",
            fontWeight: 700,
            marginBottom: 48,
          }}
        >
          {t("title")}
        </h3>
        <div className="row g-4">
          {items.map((item) => (
            <div key={item} className="col-md-6 col-lg-3">
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "28px 22px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <i
                  className="fas fa-quote-left"
                  style={{
                    color: "#21cdc0",
                    fontSize: 20,
                    marginBottom: 14,
                  }}
                ></i>
                <p
                  style={{
                    fontSize: 14,
                    color: "#374151",
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: 20,
                  }}
                >
                  {t(`items.${item}.quote`)}
                </p>
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      marginBottom: 2,
                      color: "#1a1a2e",
                    }}
                  >
                    {t(`items.${item}.name`)}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#6b7280",
                      marginBottom: 0,
                    }}
                  >
                    {t(`items.${item}.specialty`)}
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
