"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const TABS = ["practitioners", "facilities"] as const;

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

const specialties = [
  { key: "generalPractice", slug: "general-practice", icon: "fas fa-stethoscope" },
  { key: "cardiology", slug: "cardiology", icon: "fas fa-heartbeat" },
  { key: "dermatology", slug: "dermatology", icon: "fas fa-allergies" },
  { key: "pediatrics", slug: "pediatrics", icon: "fas fa-baby" },
  { key: "gynecology", slug: "gynecology", icon: "fas fa-venus" },
  { key: "ophthalmology", slug: "ophthalmology", icon: "fas fa-eye" },
  { key: "orthopedics", slug: "orthopedics", icon: "fas fa-bone" },
  { key: "psychology", slug: "psychology", icon: "fas fa-brain" },
  { key: "dentistry", slug: "dentistry", icon: "fas fa-tooth" },
  { key: "physiotherapy", slug: "physiotherapy", icon: "fas fa-walking" },
  { key: "ent", slug: "ent", icon: "fas fa-deaf" },
  { key: "endocrinology", slug: "endocrinology", icon: "fas fa-pills" },
  { key: "gastroenterology", slug: "gastroenterology", icon: "fas fa-procedures" },
  { key: "neurology", slug: "neurology", icon: "fas fa-head-side-virus" },
  { key: "urology", slug: "urology", icon: "fas fa-male" },
  { key: "rheumatology", slug: "rheumatology", icon: "fas fa-hand-holding-medical" },
] as const;

export default function SolutionsSection() {
  const t = useTranslations("pro.solutions");
  const tSpec = useTranslations("specialties");
  const [activeTab, setActiveTab] = useState<"practitioners" | "facilities">(
    "practitioners"
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const currentIndex = TABS.indexOf(activeTab);
      let newIndex: number | null = null;

      if (e.key === "ArrowRight") {
        newIndex = (currentIndex + 1) % TABS.length;
      } else if (e.key === "ArrowLeft") {
        newIndex = (currentIndex - 1 + TABS.length) % TABS.length;
      }

      if (newIndex !== null) {
        e.preventDefault();
        setActiveTab(TABS[newIndex]);
        tabRefs.current[newIndex]?.focus();
      }
    },
    [activeTab]
  );

  return (
    <section id="solutions" style={{ background: "linear-gradient(135deg, var(--color-dark-1) 0%, var(--color-navy) 100%)", padding: "120px 0" }}>
      <style>{`
        .solutions-grid {
          --bs-gutter-x: var(--spacing-md);
          --bs-gutter-y: var(--spacing-md);
        }
        @media (max-width: 767px) {
          .solutions-grid {
            --bs-gutter-x: var(--spacing-sm);
            --bs-gutter-y: var(--spacing-sm);
          }
        }
      `}</style>
      <div className="container-landing">
        {/* Header */}
        <div className="text-center" style={{ maxWidth: 640, margin: "0 auto 48px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              marginBottom: 16,
              color: "#fff",
              lineHeight: 1.15,
            }}
          >
            {t("title")}
          </h2>
        </div>

        {/* Segmented control tabs */}
        <div
          className="d-flex justify-content-center mb-5"
          role="tablist"
          aria-label={t("title")}
        >
          <div
            style={{
              display: "inline-flex",
              background: "var(--color-dark-2)",
              borderRadius: 999,
              padding: 4,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {TABS.map((tab, idx) => (
              <button
                key={tab}
                ref={(el) => { tabRefs.current[idx] = el; }}
                role="tab"
                id={`tab-${tab}`}
                aria-selected={activeTab === tab}
                aria-controls={`tabpanel-${tab}`}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                onKeyDown={handleTabKeyDown}
                style={{
                  padding: "10px 28px",
                  borderRadius: 999,
                  border: "none",
                  fontSize: 14,
                  fontWeight: activeTab === tab ? 600 : 500,
                  cursor: "pointer",
                  background: activeTab === tab ? "var(--color-light-1)" : "transparent",
                  color: activeTab === tab ? "var(--color-dark-1)" : "rgba(255,255,255,0.6)",
                  transition: "all 0.2s ease",
                  boxShadow: activeTab === tab ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                }}
              >
                {t(tab === "practitioners" ? "tabPractitioners" : "tabFacilities")}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === "practitioners" ? (
          <div
            role="tabpanel"
            id="tabpanel-practitioners"
            aria-labelledby="tab-practitioners"
            tabIndex={0}
            className="row solutions-grid"
          >
            {specialties.map((spec) => (
              <div key={spec.key} className="col-6 col-md-4 col-lg-3">
                <a
                  href={`${PLATFORM_URL}/register?role=professional&specialty=${spec.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "var(--color-dark-2)",
                    borderRadius: 12,
                    padding: "var(--spacing-md) var(--spacing-lg)",
                    border: "1px solid rgba(var(--color-cobalt-rgb), 0.15)",
                    textDecoration: "none",
                    color: "#fff",
                    transition: "all 0.2s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(74,124,199,0.4)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(74,124,199,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "rgba(var(--color-cobalt-rgb), 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={spec.icon}
                      style={{ fontSize: 14, color: "var(--color-pro-accent)" }}
                    />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
                    {tSpec(`items.${spec.key}.title`)}
                  </span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div
            role="tabpanel"
            id="tabpanel-facilities"
            aria-labelledby="tab-facilities"
            tabIndex={0}
            className="text-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 16,
              padding: "60px 20px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <i
              className="fas fa-hospital"
              style={{ fontSize: 40, color: "rgba(255,255,255,0.2)", marginBottom: 16, display: "block" }}
            />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 0 }}>
              {t("facilitiesComingSoon")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
