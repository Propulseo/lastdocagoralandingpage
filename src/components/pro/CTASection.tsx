"use client";

import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

export default function CTASection() {
  const t = useTranslations("pro.cta");

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0a1628, #132144)",
        padding: "80px 0",
        textAlign: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h3
              style={{
                fontSize: "clamp(24px, 3vw, 38px)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 16,
              }}
            >
              {t("title")}
            </h3>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {t("subtitle")}
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <a
                href={`${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`}
                className="btn btn__primary btn__rounded"
                style={{ fontSize: 15 }}
              >
                <span>{t("ctaGetStarted")}</span>
              </a>
              <a
                href="#hero-form"
                className="btn btn__secondary btn__rounded"
                style={{
                  fontSize: 15,
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <span>{t("ctaBookDemo")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
