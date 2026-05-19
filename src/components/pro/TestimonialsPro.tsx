"use client";

import { useTranslations } from "next-intl";

export default function TestimonialsPro() {
  const t = useTranslations("pro.testimonials");

  const items = ["item1", "item2", "item3", "item4"] as const;

  return (
    <section style={{ padding: "80px 0", background: "#fff" }}>
      <div className="container">
        <h3
          className="text-center"
          style={{
            fontSize: "clamp(24px, 3vw, 34px)",
            fontWeight: 700,
            marginBottom: 12,
            color: "var(--color-dark-1)",
          }}
        >
          {t("title")}
        </h3>
        <div
          className="text-center mb-5"
          style={{
            width: 48,
            height: 3,
            background: "var(--color-accent)",
            borderRadius: 2,
            margin: "0 auto",
            marginTop: 16,
          }}
        />
        <div className="row g-4">
          {/* Temporary testimonials — to be replaced */}
          {items.map((item) => (
            <div key={item} className="col-md-6 col-lg-3">
              <div
                style={{
                  background: "#F8FAFD",
                  borderRadius: 14,
                  padding: "28px 22px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #f0f0f5",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <i
                  className="fas fa-quote-left"
                  style={{
                    color: "var(--color-accent)",
                    fontSize: 18,
                    marginBottom: 14,
                    opacity: 0.6,
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
                <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 14 }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      marginBottom: 2,
                      color: "var(--color-dark-1)",
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
