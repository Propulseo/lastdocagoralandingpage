"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/shared/AnimatedSection";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

interface ProPlaceholderPageProps {
  titleKey: string;
  subtitleKey: string;
  descKey: string;
}

export default function ProPlaceholderPage({
  titleKey,
  subtitleKey,
  descKey,
}: ProPlaceholderPageProps) {
  const t = useTranslations("pro.placeholder");

  return (
    <AnimatedSection>
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 20px 80px",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, var(--color-navy), var(--color-cobalt))",
                  color: "#fff",
                  padding: "6px 20px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 24,
                }}
              >
                {t("comingSoon")}
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                {t(titleKey)}
              </h2>
              <p
                style={{
                  fontSize: 18,
                  color: "var(--color-pro-accent)",
                  fontWeight: 500,
                  marginBottom: 20,
                }}
              >
                {t(subtitleKey)}
              </p>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginBottom: 40,
                  maxWidth: 560,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {t(descKey)}
              </p>
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
                <a
                  href={`${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`}
                  className="btn btn__primary btn__rounded"
                >
                  <span>{t("getStarted")}</span>
                </a>
                <Link
                  href="/pro"
                  style={{
                    color: "var(--color-pro-accent)",
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {t("backToHome")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
